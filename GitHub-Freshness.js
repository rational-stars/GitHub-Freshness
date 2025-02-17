// ==UserScript==
// @name         GitHub Freshness
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  通过颜色高亮的方式，帮助你快速判断一个 GitHub 仓库是否在更新。
// @author       向前  https://home.rational-stars.top/
// @license      MIT
// @icon         https://raw.githubusercontent.com/rational-stars/picgo/refs/heads/main/avatar.jpg
// @match        https://github.com/*/*
// @match        https://github.com/*/*?*
// @match        https://github.com/search?*
// @match        https://github.com/*/*/tree/*/*
// @exclude      https://github.com/*/*/*/*  /* 继续排除更深层级的路径 */
// @exclude      https://github.com/*/*/*/*?*
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @require      https://cdn.jsdelivr.net/npm/sweetalert2@11
// @require      https://cdn.jsdelivr.net/npm/@simonwep/pickr@1.9.1/dist/pickr.min.js
// @require      https://cdn.jsdelivr.net/npm/luxon@3.4.3/build/global/luxon.min.js
// @updateURL    https://raw.githubusercontent.com/rational-stars/GitHub-Freshness/main/GitHub-Freshness.js
// @downloadURL  https://raw.githubusercontent.com/rational-stars/GitHub-Freshness/main/GitHub-Freshness.js
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// ==/UserScript==

;(function () {
    // 引入 Luxon
    const DateTime = luxon.DateTime
    // 解析日期（指定格式和时区）
    ;('use strict')
    // 引入 Pickr CSS
    GM_addStyle(
      `@import url('https://cdn.jsdelivr.net/npm/@simonwep/pickr/dist/themes/monolith.min.css');`
    )
    GM_addStyle(`
          .swal2-popup.swal2-modal.swal2-show{
          color: #FFF;
          border-radius: 20px;
          background: #31b96c;
          box-shadow:  8px 8px 16px #217e49,
          -8px -8px 16px #41f48f;
          #swal2-title a{
          display: inline-block;
          height: 40px;
          margin-right: 10px;
          border-radius: 10px;
          overflow: hidden;
          color: #fff;
          }
          #swal2-title {
          display: flex !important;
          justify-content: center;
          align-items: center;
          }
          .row-box select {
          border:unset;
          border-radius: .15em;
          }
          .row-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 25px;
          }
          .row-box .swal2-input {
          height: 40px;
          }
          .row-box label {
          margin-right: 10px;
          }
          .row-box main {
          display: flex;
          align-items: center;
          }
          .row-box main input{
          width: 70px;
          border: unset;
          box-shadow: unset;
          text-align: right;
          margin:0;
          }
      `)
    const PanelDom = `
              <div class="row-box">
                  <label for="rpcPort">主题设置:</label>
                  <main>
                      <select tabindex="-1" id="THEME-select" class="swal2-input">
                          <option value="light">light</option>
                          <option value="dark">dark</option>
                      </select>
                  </main>
              </div>
              <div class="row-box">
                  <div>
                      <label id="BGC-label">背景颜色:</label>
                      <input type="checkbox" id="BGC-enabled">
                  </div>
                  <main>
                      <span id="BGC-highlight-color-value">
                          <div id="BGC-highlight-color-pickr"></div>
                      </span>
                      <span id="BGC-grey-color-value">
                          <div id="BGC-grey-color-pickr"></div>
                      </span>
                  </main>
              </div>

              <div class="row-box">
                  <label id="TIME_BOUNDARY-label" for="rpcPort">时间阈值:</label>
                  <main>
                      <input id="TIME_BOUNDARY-number" type="text" class="swal2-input" value="" maxlength="3" pattern="\d{1,3}">
                      <select tabindex="-1" id="TIME_BOUNDARY-select" class="swal2-input">
                          <option value="day">日</option>
                          <option value="week">周</option>
                          <option value="month">月</option>
                          <option value="year">年</option>
                      </select>
                  </main>
              </div>


              <div class="row-box">
                  <div>
                      <label id="FONT-label">字体颜色:</label>
                      <input type="checkbox" id="FONT-enabled">
                  </div>
                  <main>
                      <span id="FONT-highlight-color-value">
                          <div id="FONT-highlight-color-pickr"></div>
                      </span>
                      <span id="FONT-grey-color-value">
                          <div id="FONT-grey-color-pickr"></div>
                      </span>
                  </main>
              </div>

              <div class="row-box">
                  <div>
                      <label id="DIR-label">文件夹颜色:</label>
                      <input type="checkbox" id="DIR-enabled">
                  </div>
                  <main>
                      <span id="DIR-highlight-color-value">
                          <div id="DIR-highlight-color-pickr"></div>
                      </span>
                      <span id="DIR-grey-color-value">
                          <div id="DIR-grey-color-pickr"></div>
                      </span>
                  </main>
              </div>
              <div class="row-box">
                  <div>
                      <label id="TIME_FORMAT-label">时间格式化:</label>
                      <input type="checkbox" id="TIME_FORMAT-enabled">
                  </div>
              </div>
              <div class="row-box">
                  <div>
                      <label id="AWESOME-label" style="text-decoration: line-through;">awesome-xxx项目待开发:</label>
                      <input type="checkbox" id="AWESOME-enabled">
                  </div>
              </div>

              <div class="row-box">
                  <label for="rpcPort">当前主题:</label>
                  <main>
                      <select tabindex="-1" id="CURRENT_THEME-select" class="swal2-input">
                          <option value="auto">auto</option>
                          <option value="light">light</option>
                          <option value="dark">dark</option>
                      </select>
                  </main>
              </div>

          `
    // === 配置项 ===
    let default_THEME = {
      BGC: {
        highlightColor: 'rgba(15, 172, 83, 1)', // 高亮颜色（示例：金色）
        greyColor: 'rgba(245, 245, 245, 0.24)', // 灰色（示例：深灰）
        isEnabled: true, // 是否启用背景色
      },
      TIME_BOUNDARY: {
        number: 30, // 时间阈值（示例：30）
        select: 'day', // 可能的值: "day", "week", "month", "year"
      },
      FONT: {
        highlightColor: 'rgba(252, 252, 252, 1)', // 文字高亮颜色（示例：橙红色）
        greyColor: 'rgba(0, 0, 0, 1)', // 灰色（示例：标准灰）
        isEnabled: true, // 是否启用字体颜色
      },
      DIR: {
        highlightColor: 'rgba(15, 172, 83, 1)', // 目录高亮颜色（示例：道奇蓝）
        greyColor: 'rgba(154, 154, 154, 1)', // 灰色（示例：暗灰）
        isEnabled: true, // 是否启用文件夹颜色
      },
      AWESOME: {
        // awesome-xxx 项目待开发
        highlightColor: '#1E90FF', // 目录高亮颜色（示例：道奇蓝）
        greyColor: '#696969', // 灰色（示例：暗灰）
        isEnabled: true, // 是否启用文件夹颜色
      },
      TIME_FORMAT: {
        isEnabled: true, // 是否启用时间格式
      },
    }
    let CURRENT_THEME = GM_getValue('CURRENT_THEME', 'light')
    let THEME_TYPE = getThemeType()
    function getThemeType() {
      let themeType = CURRENT_THEME
      if (CURRENT_THEME === 'auto') {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          console.log('系统切换到深色模式 🌙')
          themeType = 'dark'
        } else {
          console.log('系统切换到浅色模式 ☀️')
          themeType = 'light'
        }
      }
      return themeType
    }

    const config_JSON = JSON.parse(
      GM_getValue('config_JSON', JSON.stringify({ light: default_THEME }))
    )
    let THEME = config_JSON[THEME_TYPE] // 当前主题

    const configPickr = {
      theme: 'monolith', // 使用经典主题
      components: {
        preview: true,
        opacity: true,
        hue: true,
        interaction: {
          rgba: true,
          // hex: true,
          // hsla: true,
          // hsva: true,
          // cmyk: true,
          input: true,
          clear: true,
          save: true,
        },
      },
    }
    function initPickr(el_default) {
      const pickr = Pickr.create({ ...configPickr, ...el_default })
      watchPickr(pickr)
    }
    function watchPickr(pickrName, el) {
      pickrName.on('save', (color, instance) => {
        pickrName.hide()
      })
    }

    function successSwal() {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: '设置已保存',
        showConfirmButton: false,
        timer: 800,
      })
    }
    const preConfirm = () => {
      // 遍历默认主题配置，更新设置
      const updated_THEME = getUpdatedThemeConfig(default_THEME)
      CURRENT_THEME = $('#CURRENT_THEME-select').val()
      // 保存到油猴存储
      GM_setValue(
        'config_JSON',
        JSON.stringify({
          ...config_JSON,
          [$('#THEME-select').val()]: updated_THEME,
        })
      )
      GM_setValue('CURRENT_THEME', CURRENT_THEME)
      THEME = updated_THEME // 更新当前主题
      console.log('向前🇨🇳 ====> preConfirm ====> updated_THEME:', updated_THEME)
      highlightDates(updated_THEME)
      // successSwal()
    }
    function initSettings(theme) {
      initPickr({
        el: '#BGC-highlight-color-pickr',
        default: theme.BGC.highlightColor,
      })
      initPickr({ el: '#BGC-grey-color-pickr', default: theme.BGC.greyColor })
      initPickr({
        el: '#FONT-highlight-color-pickr',
        default: theme.FONT.highlightColor,
      })
      initPickr({ el: '#FONT-grey-color-pickr', default: theme.FONT.greyColor })
      initPickr({
        el: '#DIR-highlight-color-pickr',
        default: theme.DIR.highlightColor,
      })
      initPickr({ el: '#DIR-grey-color-pickr', default: theme.DIR.greyColor })
      $('#THEME-select').val(getThemeType())
      $('#CURRENT_THEME-select').val(CURRENT_THEME)
      handelData(theme)
    }
    function getUpdatedThemeConfig() {
      // 创建一个新的对象，用于存储更新后的主题配置
      let updatedTheme = {}

      // 遍历默认主题配置，更新需要的键值
      for (const [themeKey, themeVal] of Object.entries(default_THEME)) {
        updatedTheme[themeKey] = {} // 创建每个主题键名的嵌套对象

        for (let [key, val] of Object.entries(themeVal)) {
          switch (key) {
            case 'highlightColor':
              // 获取高亮颜色（示例：金色、道奇蓝等）
              val = $(`#${themeKey}-highlight-color-value .pcr-button`).css(
                '--pcr-color'
              )
              break
            case 'greyColor':
              // 获取灰色调（示例：深灰、标准灰、暗灰等）
              val = $(`#${themeKey}-grey-color-value .pcr-button`).css(
                '--pcr-color'
              )
              break
            case 'isEnabled':
              // 判断该主题项是否启用
              val = $(`#${themeKey}-enabled`).prop('checked')
              break
            case 'number':
              // 获取时间阈值（示例：30）
              val = $(`#${themeKey}-number`).val()
              break
            case 'select':
              // 获取时间单位（可能的值："day", "week", "month"）
              val = $(`#${themeKey}-select`).val()
              break
            default:
              // 其他未定义的情况
              break
          }

          // 更新当前键名对应的值
          updatedTheme[themeKey][key] = val
        }
      }

      return updatedTheme
    }
    function handelData(theme) {
      for (const [themeKey, themeVal] of Object.entries(theme)) {
        for (const [key, val] of Object.entries(themeVal)) {
          switch (key) {
            case 'highlightColor':
              $(`#${themeKey}-highlight-color-value .pcr-button`).css(
                '--pcr-color',
                val
              )
              break
            case 'greyColor':
              $(`#${themeKey}-grey-color-value .pcr-button`).css(
                '--pcr-color',
                val
              )
              break
            case 'isEnabled':
              $(`#${themeKey}-enabled`).prop('checked', val) // 选中
              break
            case 'number':
              $(`#${themeKey}-number`).val(val)
              break
            case 'select':
              $(`#${themeKey}-select`).val(val)
              break
            default:
              break
          }
        }
      }
    }
    // === 创建设置面板 ===
    function createSettingsPanel() {
      Swal.fire({
        title: `<a target="_blank" tabindex="-1" id="swal2-title-div" href="https://home.rational-stars.top/"><img src="https://raw.githubusercontent.com/rational-stars/picgo/refs/heads/main/avatar.jpg" alt="向前" width="40"></a><a tabindex="-1" target="_blank" href="https://github.com/rational-stars/GitHub-Freshness">GitHub Freshness 设置</a>`,
        html: PanelDom,
        focusConfirm: false,
        preConfirm,
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonText: '保存设置',
      })

      initSettings(THEME)

      $('#THEME-select').on('change', function () {
        let selectedTheme = $(this).val() // 获取选中的值
        let theme = config_JSON[selectedTheme]
        console.log('主题设置变更:', selectedTheme)
        handelData(theme)
      })
    }

    function handelTime(time, time_boundary, type = 'ISO8601') {
      const { number, select } = time_boundary
      let days = 0
      // 根据 select 计算相应的天数
      switch (select) {
        case 'day':
          days = number
          break
        case 'week':
          days = number * 7
          break
        case 'month':
          days = number * 30
          break
        case 'year':
          days = number * 365
          break
        default:
          console.warn('无效的时间单位:', select)
          return false // 遇到无效单位直接返回 false
      }

      const now = new Date() // 当前时间
      const targetDate = new Date(now) // 复制当前时间
      targetDate.setDate(now.getDate() - days) // 计算指定时间范围的起点
      let inputDate = new Date(time) // 传入的时间转换为 Date 对象
      if (type === 'UTC') {
        // 解析日期（指定格式和时区）
        const dt = DateTime.fromFormat(time, "yyyy年M月d日 'GMT'Z HH:mm", {
          zone: 'UTC',
        }).setZone('Asia/Shanghai')
        const formattedDate = dt.toJSDate()
        inputDate = new Date(formattedDate)
      }
      return inputDate >= targetDate // 判断输入时间是否在 time_boundary 以内
    }

    // === 核心函数 ===
    function highlightDatesSearchPage(theme = THEME) {
      const elements = $('.Text__StyledText-sc-17v1xeu-0.hWqAbU')
      if (elements.length === 0) {
        console.log('没有找到日期元素')
        return
      }
      // return
      elements.each(function () {
        const title = $(this).attr('title')
        console.log('向前🇨🇳 ====> $(this):', $(this))
        if (title) {
          console.log('向前🇨🇳 ====> title:', title)

          const timeResult = handelTime(title, theme.TIME_BOUNDARY, 'UTC')
          let themeType = getThemeType()
          console.log('向前🇨🇳 ====> themeType:', themeType)
          const BGC_element = $(this).closest(
            `.Box-sc-g0xbh4-0 .${themeType === 'dark' ? 'iwUbcA' : 'flszRz'}`
          )
          console.log('向前🇨🇳 ====> BGC_element:', BGC_element)
          // 背景色
          if (BGC_element.length && theme.BGC.isEnabled) {
            if (timeResult) {
              BGC_element.css('background-color', theme.BGC.highlightColor)
            } else {
              BGC_element.css('background-color', theme.BGC.greyColor)
            }
          }
          // 字体颜色
          if (theme.FONT.isEnabled) {
            if (timeResult) {
              $(this).css('color', theme.FONT.highlightColor)
            } else {
              $(this).css('color', theme.FONT.greyColor)
            }
          }
          // 时间格式化
          if (theme.TIME_FORMAT.isEnabled) {
            // 解析日期（指定格式和时区）
            const dt = DateTime.fromFormat(title, "yyyy年M月d日 'GMT'Z HH:mm", {
              zone: 'UTC',
            }).setZone('Asia/Shanghai')

            // 格式化成 YYYY-MM-DD
            const formattedDate = dt.toFormat('yyyy-MM-dd')
            $(this).text(formattedDate)
          }
        }
      })
    }
    function highlightDates(theme = THEME) {
      const matchUrl = isMatchedUrl()
      if (!matchUrl) return
      if (matchUrl === 'matchSearchPage') return highlightDatesSearchPage(theme)
      const elements = $('.sc-aXZVg')
      if (elements.length === 0) {
        console.log('没有找到日期元素')
        return
      }
      // return
      elements.each(function () {
        const datetime = $(this).attr('datetime')
        if (datetime) {
          const timeResult = handelTime(datetime, theme.TIME_BOUNDARY)
          const trElement = $(this).closest('tr')
          // 背景颜色和字体
          const BGC_element = $(this).closest('td')
          console.log('向前🇨🇳 ====> BGC_element:', BGC_element)
          // 在 tr 元素中查找 SVG 元素
          const DIR_element = trElement.find('.icon-directory')

          // 背景色
          if (BGC_element.length && theme.BGC.isEnabled) {
            if (timeResult) {
              BGC_element[0].style.setProperty(
                'background-color',
                theme.BGC.highlightColor,
                'important'
              )
            } else {
              BGC_element[0].style.setProperty(
                'background-color',
                theme.BGC.greyColor,
                'important'
              )
            }
          }

          // 文件夹颜色
          if (DIR_element.length && theme.DIR.isEnabled) {
            if (timeResult) {
              DIR_element.attr('fill', theme.DIR.highlightColor)
            } else {
              DIR_element.attr('fill', theme.DIR.greyColor)
            }
          }
          // 时间格式化
          if (theme.TIME_FORMAT.isEnabled && $(this).css('display') !== 'none') {
            $(this).css('display', 'none')
            const formattedDate = formatDate(datetime)
            $(this).before(`<span>${formattedDate}</span>`)
          } else {
            $(this).parent().find('span').remove()
            $(this).css('display', 'block')
          }
          // 字体颜色
          if (theme.FONT.isEnabled) {
            if (timeResult) {
              $(this).parent().css('color', theme.FONT.highlightColor)
            } else {
              $(this).parent().css('color', theme.FONT.greyColor)
            }
          }
        }
      })
    }
    function formatDate(isoDateString) {
      // 将 ISO 字符串转换为 Date 对象
      const date = new Date(isoDateString)

      // 提取年、月、日
      const year = date.getFullYear() // 获取年份
      const month = String(date.getMonth() + 1).padStart(2, '0') // 获取月份（补零）
      const day = String(date.getDate()).padStart(2, '0') // 获取日期（补零）

      // 拼接为年月日格式
      return `${year}-${month}-${day}`
    }
    function isMatchedUrl() {
      const currentUrl = window.location.href

      // 判断是否符合 @match 的 URL 模式
      const matchRepoPage =
        /^https:\/\/github\.com\/[^/]+\/[^/]+(?:\?.*)?$|^https:\/\/github\.com\/[^/]+\/[^/]+\/tree\/.+$/.test(
          currentUrl
        )
      // 判断是否符合 @match 的 URL 模式
      const matchSearchPage = /^https:\/\/github\.com\/search\?.*$/.test(
        currentUrl
      )
      // 如果当前是仓库页面，返回变量名
      if (matchRepoPage) return 'matchRepoPage'

      // 如果当前是搜索页面，返回变量名
      if (matchSearchPage) return 'matchSearchPage'

      // 如果没有匹配，返回 null 或空字符串
      return null
    }

    function runScript() {
      if (!isMatchedUrl()) return // 确保 URL 匹配，避免在不需要的页面运行
      setTimeout(() => {
        highlightDates()
      }, 500)
      console.log('✅ 脚本运行在:', window.location.href)
    }

    // **监听 GitHub PJAX 跳转**
    document.addEventListener('pjax:end', runScript)

    // **监听前进/后退**
    window.addEventListener('popstate', () => setTimeout(runScript, 300))

    // **拦截 pushState & replaceState**
    ;(function (history) {
      const originalPushState = history.pushState
      const originalReplaceState = history.replaceState
      function newHistoryMethod(method) {
        return function () {
          const result = method.apply(this, arguments)
          setTimeout(runScript, 50)
          return result
        }
      }

      history.pushState = newHistoryMethod(originalPushState)
      history.replaceState = newHistoryMethod(originalReplaceState)
    })(window.history)

    // === 初始化设置面板 ===
    // createSettingsPanel()

    // === 使用油猴菜单显示/隐藏设置面板 ===
    GM_registerMenuCommand('⚙️ 设置面板', createSettingsPanel)
    // 监听主题变化
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (e.matches) {
          THEME = config_JSON['dark']
          console.log('系统切换到深色模式 🌙')
          highlightDates(THEME)
        } else {
          THEME = config_JSON['light']
          console.log('系统切换到浅色模式 ☀️')
          highlightDates(THEME)
        }
      })
  })()
