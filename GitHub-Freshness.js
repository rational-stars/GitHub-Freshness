// ==UserScript==
// @name         GitHub Freshness
// @namespace    http://tampermonkey.net/
// @version      1.1.6
// @description  通过颜色高亮的方式，帮助你快速判断一个 GitHub 仓库是否在更新。
// @description:en  Highlights GitHub repositories by freshness so you can quickly spot active projects.
// @author       向前 https://docs.rational-stars.top/ https://github.com/rational-stars/GitHub-Freshness https://home.rational-stars.top/
// @license      MIT
// @icon         https://raw.githubusercontent.com/rational-stars/picgo/refs/heads/main/avatar.jpg
// @match        https://github.com/*/*
// @match        https://github.com/search?*
// @match        https://github.com/*/*/tree/*
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @require      https://cdn.jsdelivr.net/npm/sweetalert2@11
// @require      https://cdn.jsdelivr.net/npm/@simonwep/pickr@1.9.1/dist/pickr.min.js
// @require      https://cdn.jsdelivr.net/npm/luxon@3.4.3/build/global/luxon.min.js
// @resource     pickrCSS https://cdn.jsdelivr.net/npm/@simonwep/pickr@1.9.1/dist/themes/monolith.min.css
// @updateURL    https://raw.githubusercontent.com/rational-stars/GitHub-Freshness/main/GitHub-Freshness.js
// @downloadURL  https://raw.githubusercontent.com/rational-stars/GitHub-Freshness/main/GitHub-Freshness.js
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @grant        GM_getResourceText
// ==/UserScript==

; (function () {
  // 引入 Luxon
  const DateTime = luxon.DateTime
    // 解析日期（指定格式和时区）
    ; ('use strict')
  // 引入 Pickr CSS。GitHub CSP 会拦截 style 内的 @import，需通过 @resource 内联。
  const pickrCSS = GM_getResourceText('pickrCSS')
  if (pickrCSS) GM_addStyle(pickrCSS)
  GM_addStyle(`
          .swal2-popup.swal2-modal.swal2-show{
          color: #FFF;
          border-radius: 20px;
          background: #31b96c;
          box-shadow:  8px 8px 16px #217e49,
          -8px -8px 16px #41f48f;
          }
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
          .github-freshness-secret-input{
          -webkit-text-security: disc;
          text-security: disc;
          }
      `)
  let CURRENT_LANGUAGE = GM_getValue('CURRENT_LANGUAGE', 'auto')
  function getLocale() {
    if (CURRENT_LANGUAGE === 'zh' || CURRENT_LANGUAGE === 'en') return CURRENT_LANGUAGE

    const pageLang = document.documentElement.lang || navigator.language || ''
    return pageLang.toLowerCase().startsWith('zh') ? 'zh' : 'en'
  }
  const messages = {
    zh: {
      settings: 'GitHub 新鲜度设置',
      themeSettings: '主题设置:',
      timeBoundary: '时间阈值:',
      day: '日',
      week: '周',
      month: '月',
      year: '年',
      backgroundColor: '背景颜色:',
      fontColor: '字体颜色:',
      directoryColor: '文件夹颜色:',
      timeFormat: '时间格式化:',
      fileSort: '文件排序:',
      sortAsc: '时间正序',
      sortDesc: '时间倒序',
      currentTheme: '当前主题:',
      currentLanguage: '当前语言:',
      auto: '自动',
      chinese: '中文',
      english: '英文',
      awesomeToken: 'AWESOME token: ',
      settingsHint: '当复选框切换到未勾选状态时，部分设置不会立即生效需重新刷新页面。AWESOME谨慎开启详细说明请看',
      docs: '文档',
      cancel: '取消',
      saveSettings: '保存设置',
      settingsSaved: '设置已保存',
      rateLimit: '检测到 AWESOME API 速率限制超出！',
      details: '查看详情',
      menuSettings: '⚙️ 设置面板',
      starMessage: '如果您觉得 GitHub-Freshness 好用，点击下方 GitHub 链接给个 star 吧。非常感谢你！！！',
    },
    en: {
      settings: 'GitHub Freshness Settings',
      themeSettings: 'Theme:',
      timeBoundary: 'Time threshold:',
      day: 'Day',
      week: 'Week',
      month: 'Month',
      year: 'Year',
      backgroundColor: 'Background color:',
      fontColor: 'Font color:',
      directoryColor: 'Folder color:',
      timeFormat: 'Date formatting:',
      fileSort: 'File sorting:',
      sortAsc: 'Oldest first',
      sortDesc: 'Newest first',
      currentTheme: 'Current theme:',
      currentLanguage: 'Current language:',
      auto: 'Auto',
      chinese: 'Chinese',
      english: 'English',
      awesomeToken: 'AWESOME token: ',
      settingsHint: 'Some settings require refreshing the page after being disabled. Read the AWESOME details in the',
      docs: 'docs',
      cancel: 'Cancel',
      saveSettings: 'Save settings',
      settingsSaved: 'Settings saved',
      rateLimit: 'AWESOME API rate limit exceeded!',
      details: 'Details',
      menuSettings: '⚙️ Settings',
      starMessage: 'If GitHub-Freshness helps you, please give it a star from the GitHub link below. Thank you!',
    },
  }
  function t(key) {
    const locale = getLocale()
    return messages[locale][key] || messages.zh[key] || key
  }
  function getPanelDom() {
    return `
              <div class="row-box">
                  <label for="rpcPort">${t('themeSettings')}</label>
                  <main>
                      <select tabindex="-1" id="THEME-select" class="swal2-input">
                          <option value="light">light</option>
                          <option value="dark">dark</option>
                      </select>
                  </main>
              </div>
              <div class="row-box">
                  <label id="TIME_BOUNDARY-label" for="rpcPort">${t('timeBoundary')}</label>
                  <main>
                      <input id="TIME_BOUNDARY-number" type="number" class="swal2-input" value="" maxlength="3" pattern="\d{1,3}">
                      <select tabindex="-1" id="TIME_BOUNDARY-select" class="swal2-input">
                          <option value="day">${t('day')}</option>
                          <option value="week">${t('week')}</option>
                          <option value="month">${t('month')}</option>
                          <option value="year">${t('year')}</option>
                      </select>
                  </main>
              </div>
              <div class="row-box">
                  <div>
                      <label id="BGC-label">${t('backgroundColor')}</label>
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
                      <label id="FONT-label">${t('fontColor')}</label>
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
                      <label id="DIR-label">${t('directoryColor')}</label>
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
                      <label id="TIME_FORMAT-label">${t('timeFormat')}</label>
                      <input type="checkbox" id="TIME_FORMAT-enabled">
                  </div>
              </div>
              <div class="row-box">
                   <div>
                      <label id="SORT-label">${t('fileSort')}</label>
                      <input type="checkbox" id="SORT-enabled">
                  </div>
                  <main>
                      <select tabindex="-1" id="SORT-select" class="swal2-input">
                          <option value="asc">${t('sortAsc')}</option>
                          <option value="desc">${t('sortDesc')}</option>
                      </select>
                  </main>
              </div>

              <div class="row-box">
                  <label for="rpcPort">${t('currentTheme')}</label>
                  <main>
                      <select tabindex="-1" id="CURRENT_THEME-select" class="swal2-input">
                          <option value="auto">auto</option>
                          <option value="light">light</option>
                          <option value="dark">dark</option>
                      </select>
                  </main>
              </div>

              <div class="row-box">
                  <label for="LANGUAGE-select">${t('currentLanguage')}</label>
                  <main>
                      <select tabindex="-1" id="LANGUAGE-select" class="swal2-input">
                          <option value="auto">${t('auto')}</option>
                          <option value="zh">${t('chinese')}</option>
                          <option value="en">${t('english')}</option>
                      </select>
                  </main>
              </div>

              <div class="row-box">
                  <div>
                      <label id="AWESOME-label"><a target="_blank" href="https://github.com/settings/tokens">${t('awesomeToken')}</a></label>
                      <input type="checkbox" id="AWESOME-enabled">
                  </div>
                  <main>
                      <input id="AWESOME_TOKEN" type="text" class="swal2-input github-freshness-secret-input" value="" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" data-lpignore="true" data-1p-ignore="true">
                  </main>
              </div>
            <p>${t('settingsHint')} <a target="_blank" href="https://docs.rational-stars.top/diy-settings/awesome-xxx.html">${t('docs')}</a></p>

          `
  }
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
      isEnabled: false, // AWESOME项目是否启用
    },
    TIME_FORMAT: {
      isEnabled: true, // 是否启用时间格式化
    },
  }
  let CURRENT_THEME = GM_getValue('CURRENT_THEME', 'light')
  let AWESOME_TOKEN = GM_getValue('AWESOME_TOKEN', '')
  let THEME_TYPE = getThemeType()
  const config_JSON = normalizeConfig(
    JSON.parse(GM_getValue('config_JSON', JSON.stringify({ light: default_THEME })))
  )
  let THEME = getThemeConfig(THEME_TYPE) // 当前主题
  const DEBUG = GM_getValue('DEBUG', false)
  const PROCESSED_ATTR = 'data-github-freshness'
  const AWESOME_OBSERVED_ATTR = 'data-github-freshness-awesome-observed'
  const AWESOME_PROCESSED_ATTR = 'data-github-freshness-awesome-processed'
  const awesomeRepoCache = new Map()
  let awesomeRateLimitWarned = false

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
    showStarMessage()
    return themeType
  }
  function debugLog(...args) {
    if (DEBUG) console.log(...args)
  }
  function showStarMessage() {
    const logKey = 'github-freshness-star-log'
    if (sessionStorage.getItem(logKey)) return
    sessionStorage.setItem(logKey, 'true')
    window.console.log("%c✅ " + t('starMessage') + "\n[https://github.com/rational-stars/GitHub-Freshness]", "color:green")
  }
  function cloneTheme(theme = default_THEME) {
    return JSON.parse(JSON.stringify(theme))
  }
  function normalizeTheme(theme = {}) {
    const normalizedTheme = cloneTheme(default_THEME)
    for (const [themeKey, themeVal] of Object.entries(theme || {})) {
      normalizedTheme[themeKey] = {
        ...(normalizedTheme[themeKey] || {}),
        ...(themeVal || {}),
      }
    }
    return normalizedTheme
  }
  function normalizeConfig(config = {}) {
    const light = normalizeTheme(config.light || default_THEME)
    const dark = normalizeTheme(config.dark || config.light || default_THEME)
    return { ...config, light, dark }
  }
  function getThemeConfig(themeType = THEME_TYPE) {
    return normalizeTheme(config_JSON[themeType] || config_JSON.light || default_THEME)
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
    CURRENT_LANGUAGE = $('#LANGUAGE-select').val()
    const previousAwesomeToken = AWESOME_TOKEN
    AWESOME_TOKEN = $('#AWESOME_TOKEN').val()
    if (AWESOME_TOKEN !== previousAwesomeToken) {
      awesomeRepoCache.clear()
      awesomeRateLimitWarned = false
    }
    // 保存到油猴存储
    GM_setValue(
      'config_JSON',
      JSON.stringify({
        ...config_JSON,
        [$('#THEME-select').val()]: updated_THEME,
      })
    )
    GM_setValue('CURRENT_THEME', CURRENT_THEME)
    GM_setValue('CURRENT_LANGUAGE', CURRENT_LANGUAGE)
    GM_setValue('AWESOME_TOKEN', AWESOME_TOKEN)
    THEME = updated_THEME // 更新当前主题
    GitHub_Freshness(updated_THEME)
    Swal.fire({
      position: 'top-center',
      background: '#4ab96f',
      icon: 'success',
      title: t('settingsSaved'),
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
    $('#LANGUAGE-select').val(CURRENT_LANGUAGE)
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
      title: `<a target="_blank" tabindex="-1" id="swal2-title-div" href="https://home.rational-stars.top/"><img src="https://raw.githubusercontent.com/rational-stars/picgo/refs/heads/main/avatar.jpg" alt="GitHub Freshness" width="40"></a><a tabindex="-1" target="_blank" href="https://github.com/rational-stars/GitHub-Freshness">${t('settings')}</a>`,
      html: getPanelDom(),
      focusConfirm: false,
      preConfirm,
      heightAuto: false,
      showCancelButton: true,
      cancelButtonText: t('cancel'),
      confirmButtonText: t('saveSettings'),
    })

    initSettings(THEME)

    $('#THEME-select').on('change', function () {
      let selectedTheme = $(this).val() // 获取选中的值
      let theme = getThemeConfig(selectedTheme)
      debugLog('主题设置变更:', selectedTheme)
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
    } else if (TIME_FORMAT.isEnabled === false) {
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
  function isValidDate(date) {
    return date instanceof Date && !Number.isNaN(date.getTime())
  }
  function parseGitHubNumericDate(time) {
    const normalizedTime = String(time || '').trim()
    const match = normalizedTime.match(
      /^(\d{4})[年/-](\d{1,2})[月/-](\d{1,2})日?(?:\s+GMT([+-])(\d{1,2})(?::?(\d{2}))?)?\s+(\d{1,2}):(\d{2})(?:\s+GMT([+-])(\d{1,2})(?::?(\d{2}))?)?$/
    )
    if (!match) return null

    const [
      ,
      year,
      month,
      day,
      prefixSign,
      prefixOffsetHour,
      prefixOffsetMinute = '0',
      hour,
      minute,
      suffixSign,
      suffixOffsetHour,
      suffixOffsetMinute = '0',
    ] = match
    const sign = prefixSign || suffixSign || '+'
    const offsetHour = prefixOffsetHour || suffixOffsetHour || '0'
    const offsetMinute = prefixOffsetMinute || suffixOffsetMinute || '0'
    const offsetMinutes =
      (Number(offsetHour) * 60 + Number(offsetMinute)) * (sign === '+' ? 1 : -1)
    const utcTime =
      Date.UTC(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute)) -
      offsetMinutes * 60 * 1000

    return new Date(utcTime)
  }
  function parseGitHubDateTitle(time) {
    const numericDate = parseGitHubNumericDate(time)
    if (numericDate) return numericDate

    const nativeTimestamp = Date.parse(time)
    if (!Number.isNaN(nativeTimestamp)) return new Date(nativeTimestamp)

    return null
  }
  function parseTime(time, type = 'ISO8601') {
    if (type === 'UTC') {
      const dt = DateTime.fromFormat(time, "yyyy年M月d日 'GMT'Z HH:mm", {
        zone: 'UTC',
      }).setZone('Asia/Shanghai')
      if (dt.isValid) return dt.toJSDate()

      const githubDate = parseGitHubDateTitle(time)
      if (githubDate) return githubDate
    }
    return new Date(time)
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
    let inputDate = parseTime(time, type) // 传入的时间转换为 Date 对象
    if (!isValidDate(inputDate)) return false
    return inputDate >= targetDate // 判断输入时间是否在 time_boundary 以内
  }
  const reservedGitHubPaths = new Set([
    'about',
    'apps',
    'blog',
    'collections',
    'contact',
    'customer-stories',
    'dashboard',
    'enterprise',
    'events',
    'explore',
    'features',
    'issues',
    'login',
    'marketplace',
    'new',
    'notifications',
    'orgs',
    'pricing',
    'pulls',
    'search',
    'settings',
    'signup',
    'sponsors',
    'topics',
    'trending',
  ])
  function getGitHubRepoInfo(href) {
    try {
      const url = new URL(href, window.location.origin)
      if (url.origin !== 'https://github.com') return null

      const [owner, repo, extraPath] = url.pathname.split('/').filter(Boolean)
      if (!owner || !repo || extraPath || reservedGitHubPaths.has(owner.toLowerCase())) {
        return null
      }

      return { owner, repo }
    } catch (err) {
      debugLog('无效的 GitHub 链接:', href)
      return null
    }
  }
  function isValidHref(href) {
    return !!getGitHubRepoInfo(href);
  }
  function toAPIUrl(href) {
    const repoInfo = getGitHubRepoInfo(href)
    if (!repoInfo) return null

    return 'https://api.github.com/repos/' + repoInfo.owner + '/' + repoInfo.repo;
  }
  function requestAwesomeRepo(apiHref) {
    if (!awesomeRepoCache.has(apiHref)) {
      awesomeRepoCache.set(
        apiHref,
        $.ajax({
          url: apiHref,
          method: 'GET',
          headers: AWESOME_TOKEN ? { 'Authorization': `token ${AWESOME_TOKEN}` } : {},
        })
      )
    }
    return awesomeRepoCache.get(apiHref)
  }
  function showAwesomeRateLimitWarning() {
    if (awesomeRateLimitWarned) return
    awesomeRateLimitWarned = true
    Swal.fire({
      position: 'top-center',
      icon: 'warning',
      title: t('rateLimit'),
      confirmButtonText: t('details'),
      showConfirmButton: true,
      background: '#4ab96f',
      preConfirm: () => {
        window.open("https://home.rational-stars.top/", "_blank")
      }
    })
  }
  // === 核心函数 ===
  function GitHub_FreshnessSearchPage(theme = THEME) {
    const elements = getSearchDateElements()
    if (elements.length === 0) return debugLog('没有找到日期元素')
    elements.each(function () {
      const title = $(this).attr('title')
      if (title) {
        const timeResult = handelTime(title, theme.TIME_BOUNDARY, 'UTC')
        const BGC_element = getSearchResultElement($(this))
        BGC_element.attr(PROCESSED_ATTR, 'true')
        // 背景色
        setElementBGC(BGC_element, theme.BGC, timeResult)
        // 字体颜色
        setElementFONT($(this), theme.FONT, timeResult)
        // 时间格式化
        if (theme.TIME_FORMAT.isEnabled) {
          const formattedDate = formatDate(title, 'UTC')
          $(this).text(formattedDate)
        }
      }
    })
  }
  function getSearchDateElements() {
    const oldElements = $('.Text__StyledText-sc-17v1xeu-0.hWqAbU')
    if (oldElements.length) return oldElements

    return $('[data-testid="results-list"] [title]').filter(function () {
      const title = $(this).attr('title') || ''
      const hasNestedDateTitle = $(this)
        .children('[title]')
        .toArray()
        .some((el) => $(el).attr('title') === title)
      const looksLikeDateTitle = /\b\d{4}\b/.test(title) && /(GMT[+-]|\d{1,2}:\d{2}|T\d{2}:\d{2})/.test(title)
      return looksLikeDateTitle && isValidDate(parseTime(title, 'UTC')) && !hasNestedDateTitle
    })
  }
  function getSearchResultElement(el) {
    const resultRow = el.closest('[class*="Repositories-module__resultRow"]')
    if (resultRow.length) return resultRow

    const resultsList = el.closest('[data-testid="results-list"]')
    return resultsList.children('div').has(el).first()
  }
  function GitHub_FreshnessAwesome(theme = THEME) {
    // 选择符合条件的 <a> 标签
    let elementsToObserve = [];
    $('.markdown-body a[href], article.markdown-body a[href], .Box-sc-g0xbh4-0.csrIcr a').each(function () {
      let href = $(this).attr('href');
      // 只处理符合 href 条件的 <a> 标签
      if (isValidHref(href) && this.getAttribute(AWESOME_OBSERVED_ATTR) !== 'true') {
        this.setAttribute(AWESOME_OBSERVED_ATTR, 'true')
        elementsToObserve.push(this); // 存储符合条件的元素
      }
    });

    // 使用 IntersectionObserver 监听元素是否进入/离开视口
    const observer = new IntersectionObserver(function (entries, observer) {
      entries.forEach(el => {
        if (!el.isIntersecting) return

        const target = el.target
        const href = $(el.target).attr('href');
        const apiHref = toAPIUrl(href)
        if (target.getAttribute(AWESOME_PROCESSED_ATTR) !== 'true' && apiHref) {
          requestAwesomeRepo(apiHref)
            .done(function (data) {
              const stars = data.stargazers_count; // 获取星标数
              const time = data.updated_at; // 获取星标数
              const timeResult = handelTime(time, theme.TIME_BOUNDARY);
              // 添加标签
              if (theme.AWESOME.isEnabled && target.getAttribute(AWESOME_PROCESSED_ATTR) !== 'true') {
                $(target).after(`<span class="github-freshness-awesome-meta" style="padding: 8px">★${stars} 📅${formatDate(time)}</span>`);
                target.setAttribute(AWESOME_PROCESSED_ATTR, 'true')
              }
              setElementBGC($(target), theme.BGC, timeResult)
              // 字体颜色
              setElementFONT($(target), theme.FONT, timeResult)
              $(target).css('padding', '0 12px')
            })
            .fail(function (err) {
              if (err.status === 403) {
                showAwesomeRateLimitWarning()
              }
            });

        } else {
          debugLog('AWESOME 链接已处理或无效:', href);
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
    const elements = $('tr.react-directory-row relative-time[datetime], .sc-aXZVg[datetime]')
    if (elements.length === 0) return debugLog('没有找到日期元素');
    debugLog("向前🇨🇳 ====> GitHub_Freshness ====> elements:", elements.length)

    let trRows = []
    elements.each(function () {
      const datetime = $(this).attr('datetime')
      if (datetime) {
        const timeResult = handelTime(datetime, theme.TIME_BOUNDARY)
        const trElement = $(this).closest('tr.react-directory-row')
        if (!trElement.length) return
        trElement.attr(PROCESSED_ATTR, 'true')
        trRows.push(trElement[0])
        // 背景颜色和字体
        const BGC_element = $(this).closest('td')
        // 在 tr 元素中查找 SVG 元素
        const DIR_element = trElement.find('.icon-directory')
        const FILE_element = trElement.find('.color-fg-muted')
        // 背景色
        setElementBGC(BGC_element, theme.BGC, timeResult)
        // 文件夹颜色和文件图标
        setElementDIR(DIR_element, theme.DIR, timeResult)
        setElementDIR(FILE_element, theme.DIR, timeResult)
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
      const tbody = $('table[aria-labelledby="folders-and-files"] tbody, .Box-sc-g0xbh4-0.fdROMU tbody').first()
      if (tbody.length) tbody.append(trRows);
    }

    const repoTitle = $('#repo-title-component a, [itemprop="name"] a, strong[itemprop="name"] a')
      .first()
      .text()
      .toLowerCase()
    if (theme.AWESOME.isEnabled && repoTitle.includes('awesome')) {
      GitHub_FreshnessAwesome()
    }
  }
  function formatDate(dateString, type = 'ISO8601') {
    if (type === 'UTC') {
      const parsedDate = parseTime(dateString, type)
      if (!isValidDate(parsedDate)) return dateString
      return DateTime.fromJSDate(parsedDate).setZone('Asia/Shanghai').toFormat('yyyy-MM-dd');
    }
    return DateTime.fromISO(dateString).toFormat('yyyy-MM-dd');
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

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  const runScript = debounce(() => {
    if (!isMatchedUrl()) return;
    GitHub_Freshness();  // 页面内容加载完成后执行
  }, 350);  // 设置合适的延迟，避免频繁执行
// 页面加载完成后执行
window.addEventListener('load', () => {
  debugLog("页面加载完成 => 执行 runScript");
  runScript();  // 页面加载完成后执行 GitHub_Freshness
});

// 监听页面是否从不可见切换到可见
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    debugLog("页面切换到前台 => 执行 runScript");
    runScript();  // 页面切换到前台时执行
  }
});

// 监听 pjax:end 事件，确保页面内容完全加载
document.addEventListener('pjax:end', () => {
  debugLog('GitHub PJAX 跳转，页面内容已加载');
  runScript();  // 页面内容加载完成后执行 GitHub_Freshness
});

// 重写 history.pushState 和 history.replaceState 来处理 URL 变化
(function (history) {
  const pushState = history.pushState;
  const replaceState = history.replaceState;

  // 监听 pushState 事件，确保 URL 变化时执行
  history.pushState = function (state, title, url) {
    pushState.apply(history, arguments);  // 调用原始的 pushState
    debugLog('pushState 触发，URL 变化：', url);
    setTimeout(runScript, 350);  // 页面内容加载完成后执行 runScript
  };

  // 监听 replaceState 事件，确保 URL 变化时执行
  history.replaceState = function (state, title, url) {
    replaceState.apply(history, arguments);  // 调用原始的 replaceState
    debugLog('replaceState 触发，URL 变化：', url);
    setTimeout(runScript, 350);  // 页面内容加载完成后执行 runScript
  };

  // 监听浏览器的前进/后退按钮 (popstate)
  window.addEventListener('popstate', () => {
    debugLog('popstate 触发，URL 变化：', window.location.href);
    setTimeout(runScript, 500);  // 页面内容加载完成后执行 runScript
  });
})(window.history);
  // === 初始化设置面板 ===
  // createSettingsPanel()

  // === 使用油猴菜单显示/隐藏设置面板 ===
  GM_registerMenuCommand(t('menuSettings'), createSettingsPanel)
  // 监听主题变化
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
      if (e.matches) {
        THEME = getThemeConfig('dark')
        // console.log('系统切换到深色模式 🌙')
        GitHub_Freshness(THEME)
      } else {
        THEME = getThemeConfig('light')
        // console.log('系统切换到浅色模式 ☀️')
        GitHub_Freshness(THEME)
      }
    })
})()
