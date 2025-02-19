// ==UserScript==
// @name         GitHub Freshness
// @namespace    http://tampermonkey.net/
// @version      1.1.1
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

; (function () {
  // 引入 Luxon
  const DateTime = luxon.DateTime
    // 解析日期（指定格式和时区）
    ; ('use strict')
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
          margin: 25px;
          align-items: center;
          justify-content: space-between;
          }
          .row-box .swal2-input {
          height: 40px;
          }
          .row-box label {
          margin-right: 10px;
          }
          .row-box main input{
          background: rgba(15, 172, 83, 1);
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
                  <label id="TIME_BOUNDARY-label" for="rpcPort">时间阈值:</label>
                  <main>
                      <input id="TIME_BOUNDARY-number" type="number" class="swal2-input" value="" maxlength="3" pattern="\d{1,3}">
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
                      <label id="SORT-label">文件排序:</label>
                      <input type="checkbox" id="SORT-enabled">
                  </div>
                  <main>
                      <select tabindex="-1" id="SORT-select" class="swal2-input">
                          <option value="asc">时间正序</option>
                          <option value="desc">时间倒序</option>
                      </select>
                  </main>
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

              <div class="row-box">
                  <div>
                      <label id="AWESOME-label">AWESOME项目:</label>
                      <input type="checkbox" id="AWESOME-enabled">
                  </div>
                  <main>
                      <input id="AWESOME_TOKEN" type="password" class="swal2-input" value="">
                  </main>                  
              </div>
            <p>当复选框切换到未勾选状态时，部分设置不会立即生效需重新刷新页面。AWESOME谨慎开启详细说明请看 <a target="_blank" href="https://rational-stars.top/archives/GitHub-Freshness"> 文档ℹ️</><p/>

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
    SORT: {
      select: 'desc', // 排序方式（可能的值："asc", "desc"）
      isEnabled: true, // 是否启用排序
    },
    AWESOME: {
      isEnabled: true, // AWESOME项目是否启用
    },
    TIME_FORMAT: {
      isEnabled: true, // 是否启用时间格式化
    },
  }
  let CURRENT_THEME = GM_getValue('CURRENT_THEME', 'light')
  let AWESOME_TOKEN = GM_getValue('AWESOME_TOKEN', '')
  let THEME_TYPE = getThemeType()
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
  function getThemeType() {
    let themeType = CURRENT_THEME
    if (CURRENT_THEME === 'auto') {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // console.log('当前系统是深色模式 🌙')
        themeType = 'dark'
      } else {
        // console.log('当前系统是浅色模式 ☀️')
        themeType = 'light'
      }
    }
    window.console.log("%c✅向前：" + "如果您觉得GitHub-Freshness好用，点击下方 github链接 给个 star 吧。非常感谢你！！！\n[https://github.com/rational-stars/GitHub-Freshness]", "color:green")
    return themeType
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
  const preConfirm = () => {
    // 遍历默认主题配置，更新设置
    const updated_THEME = getUpdatedThemeConfig(default_THEME)
    CURRENT_THEME = $('#CURRENT_THEME-select').val()
    AWESOME_TOKEN = $('#AWESOME_TOKEN').val()
    // 保存到油猴存储
    GM_setValue(
      'config_JSON',
      JSON.stringify({
        ...config_JSON,
        [$('#THEME-select').val()]: updated_THEME,
      })
    )
    GM_setValue('CURRENT_THEME', CURRENT_THEME)
    GM_setValue('AWESOME_TOKEN', AWESOME_TOKEN)
    THEME = updated_THEME // 更新当前主题
    GitHub_Freshness(updated_THEME)
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: '设置已保存',
      showConfirmButton: false,
      timer: 800,
    })
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
    $('#AWESOME_TOKEN').val(AWESOME_TOKEN)
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
  function setElementBGC(el, BGC, timeResult) {
    // el是元素 BGC是 theme BGC配置对象
    if (el.length && BGC.isEnabled) {
      if (timeResult) {
        el[0].style.setProperty('background-color', BGC.highlightColor, 'important')
      } else {
        el[0].style.setProperty('background-color', BGC.greyColor, 'important')
      }
    }
  }
  function setElementDIR(el, DIR, timeResult) {
    if (el.length && DIR.isEnabled) {
      if (timeResult) {
        el.attr('fill', DIR.highlightColor)
      } else {
        el.attr('fill', DIR.greyColor)
      }
    }
  }
  function setElementTIME_FORMAT(el, TIME_FORMAT, datetime) {
    if (TIME_FORMAT.isEnabled && el.css('display') !== 'none') {
      el.css('display', 'none')
      const formattedDate = formatDate(datetime)
      el.before(`<span>${formattedDate}</span>`)
    } else {
      el.parent().find('span').remove()
      el.css('display', 'block')
    }
  }
  // 设置字体颜色
  function setElementFONT(el, FONT, timeResult) {
    // el是元素 FONT是 theme FONT配置对象
    if (FONT.isEnabled) {
      if (timeResult) {
        el.css('color', FONT.highlightColor)
      } else {
        el.css('color', FONT.greyColor)
      }
    }
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
  // 检查 href 是否符合 https://github.com/*/* 但不是 https://github.com/*/*/ 格式
  const pattern = /^https:\/\/github\.com\/[^\/]+\/[^\/]+\/?$/;
  function isValidHref(href) {
    return pattern.test(href);
  }
  function toAPIUrl(href) {
    // 使用正则表达式从 href 中提取 owner 和 repo
    const githubPattern = /^https:\/\/github\.com\/([^\/]+)\/([^\/]+)/;
    const match = href.match(githubPattern);
    // 如果匹配成功，则生成 API URL
    if (match) {
      let owner = match[1];  // GitHub 仓库所有者
      let repo = match[2];    // GitHub 仓库名称

      // 返回转换后的 GitHub API URL
      return 'https://api.github.com/repos/' + owner + '/' + repo;
    } else {
      console.log("无效的 GitHub 链接:", href);
      return null;
    }
  }
  // === 核心函数 ===
  function GitHub_FreshnessSearchPage(theme = THEME) {
    const elements = $('.Text__StyledText-sc-17v1xeu-0.hWqAbU')
    if (elements.length === 0) return //console.log('没有找到日期元素')
    elements.each(function () {
      const title = $(this).attr('title')
      if (title) {
        const timeResult = handelTime(title, theme.TIME_BOUNDARY, 'UTC')
        let themeType = getThemeType()
        console.log('向前🇨🇳 ====> themeType:', themeType)
        const BGC_element = $(this).closest(
          `.Box-sc-g0xbh4-0 .${themeType === 'dark' ? 'iwUbcA' : 'flszRz'}`
        )
        // 背景色
        setElementBGC(BGC_element, theme.BGC, timeResult)
        // 字体颜色
        setElementFONT($(this), theme.FONT, timeResult)
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
  function GitHub_FreshnessAwesome(theme = THEME) {
    // 选择符合条件的 <a> 标签
    let elementsToObserve = [];
    $('.Box-sc-g0xbh4-0.csrIcr a').each(function () {
      let href = $(this).attr('href');
      // 只处理符合 href 条件的 <a> 标签
      if (isValidHref(href)) {
        elementsToObserve.push(this); // 存储符合条件的元素
      }
    });

    // 使用 IntersectionObserver 监听元素是否进入/离开视口
    const observer = new IntersectionObserver(function (entries, observer) {
      entries.forEach(el => {
        const href = $(el.target).attr('href');
        const apiHref = toAPIUrl(href)
        if (el.isIntersecting && el.target.getAttribute('request') !== 'true' && apiHref) {
          $.ajax({
            url: apiHref, // API 地址
            method: 'GET', // 请求方式
            headers: {
              'Authorization': `token ${AWESOME_TOKEN}` || ''  // 替换为你的个人访问令牌
            },
            success: function (data) {
              const stars = data.stargazers_count; // 获取星标数
              const time = data.updated_at; // 获取星标数
              const timeResult = handelTime(time, theme.TIME_BOUNDARY);
              // 添加标签
              if (theme.AWESOME.isEnabled && el.target.getAttribute('request') !== 'true') {
                $(el.target).after(`<span class="stars" style="padding: 8px">★${stars}</span><span class="updated-at">📅${formatDate(time)}</span>`);
                el.target.setAttribute('request', 'true')
              }
              setElementBGC(el, theme.BGC, timeResult)
              // 字体颜色
              setElementFONT(el, theme.FONT, timeResult)
              $(el.target).css('padding', '0 12px')
            },
            error: function (err) {
              if (err.status === 403) {
                Swal.fire({
                  position: 'top-center',
                  icon: 'success',
                  title: '检测到AWESOME API 速率限制超出！',
                  confirmButtonText: '查看详情',
                  showConfirmButton: true,
                  background: '#4ab96f',
                  preConfirm: () => {
                    window.open("https://home.rational-stars.top/", "_blank")
                  }
                })
              }
            }
          });

        } else {
          // console.log('元素离开视口:', href);
        }
      });
    }, { threshold: 0.5 }); // 当元素至少 50% 进入视口时触发回调
    // 开始监听所有符合条件的元素
    elementsToObserve.forEach(function (el) {
      observer.observe(el);
    });

  }
  function GitHub_Freshness(theme = THEME) {
    const matchUrl = isMatchedUrl()
    if (!matchUrl) return
    if (matchUrl === 'matchSearchPage') return GitHub_FreshnessSearchPage(theme)
    const elements = $('.sc-aXZVg')
    if (elements.length === 0) return console.log('没有找到日期元素')
    let trRows = []
    elements.each(function () {
      const datetime = $(this).attr('datetime')
      if (datetime) {
        const timeResult = handelTime(datetime, theme.TIME_BOUNDARY)
        const trElement = $(this).closest('tr.react-directory-row')
        trRows.push(trElement[0])
        // 背景颜色和字体
        const BGC_element = $(this).closest('td')
        // 在 tr 元素中查找 SVG 元素
        const DIR_element = trElement.find('.icon-directory')
        // 背景色
        setElementBGC(BGC_element, theme.BGC, timeResult)
        // 文件夹颜色
        setElementDIR(DIR_element, theme.TIME_FORMAT, timeResult)
        // 时间格式化
        setElementTIME_FORMAT($(this), theme.TIME_FORMAT, datetime)
        // 字体颜色
        setElementFONT($(this).parent(), theme.FONT, timeResult)
      }
    })
    // 文件排序
    if (theme.SORT.isEnabled) {
      // 将 tr 元素按日期排序
      trRows.sort((a, b) => {
        // 获取 datetime 属性
        let dateA = new Date(a.querySelector('relative-time').getAttribute('datetime'));
        let dateB = new Date(b.querySelector('relative-time').getAttribute('datetime'));
        // 根据 isAscending 变量控制排序顺序
        return theme.SORT.select === 'asc' ? dateA - dateB : dateB - dateA;
      });
      $('.Box-sc-g0xbh4-0.fdROMU tbody').append(trRows);
    }

    if (theme.AWESOME.isEnabled && $('#repo-title-component a').text().toLowerCase().includes('awesome')) {
      GitHub_FreshnessAwesome()
    }
  }
  function formatDate(isoDateString) {
    return DateTime.fromISO(isoDateString).toFormat('yyyy-MM-dd');
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
      GitHub_Freshness()
    }, 900)
  }

  // **监听 GitHub PJAX 跳转**
  document.addEventListener('pjax:end', runScript)

  // **监听前进/后退**
  window.addEventListener('popstate', () => setTimeout(runScript, 300))

    // **拦截 pushState & replaceState**
    ; (function (history) {
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
        // console.log('系统切换到深色模式 🌙')
        GitHub_Freshness(THEME)
      } else {
        THEME = config_JSON['light']
        // console.log('系统切换到浅色模式 ☀️')
        GitHub_Freshness(THEME)
      }
    })
})()
