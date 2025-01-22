// ==UserScript==
// @name         GitHub Freshness
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  通过颜色高亮的方式，帮助你快速判断一个 GitHub 仓库是否在更新。
// @author       向前  https://rational-stars.top/
// @match        https://github.com/*
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function () {
    'use strict';

    // === 配置项 ===
    let HIGHLIGHT_COLOR = GM_getValue('highlightColor', '#82de82'); // 小于指定时间范围的背景色
    let GREY_COLOR = GM_getValue('greyColor', '#e3d711'); // 大于指定时间范围的背景色
    let TIME_THRESHOLD_MONTHS = GM_getValue('timeThresholdMonths', 2); // 时间阈值（月）

    let isHighlighting = false;  // 防止重复触发
    let currentURL = location.href;

    // === 创建设置面板 ===
    function createSettingsPanel() {
        const panel = document.createElement('div');
        panel.style.position = 'fixed';
        panel.style.top = '10px';
        panel.style.right = '10px';
        panel.style.padding = '10px';
        panel.style.backgroundColor = '#fff';
        panel.style.border = '1px solid #ccc';
        panel.style.zIndex = '9999';
        panel.style.display = 'none'; // 初始隐藏面板

        panel.innerHTML = `
            <h3>GitHub Freshness 设置</h3>
            <label for="highlightColor">背景色（小于指定时间范围）:</label>
            <input type="color" id="highlightColor" value="${HIGHLIGHT_COLOR}" /><br><br>

            <label for="greyColor">背景色（大于指定时间范围）:</label>
            <input type="color" id="greyColor" value="${GREY_COLOR}" /><br><br>

            <label for="timeThresholdMonths">时间阈值（月）:</label>
            <input type="number" id="timeThresholdMonths" value="${TIME_THRESHOLD_MONTHS}" min="1" /><br><br>

            <button id="saveSettings">保存设置</button>
        `;

        document.body.appendChild(panel);

        // 保存设置
        document.getElementById('saveSettings').addEventListener('click', () => {
            // 获取设置并保存
            HIGHLIGHT_COLOR = document.getElementById('highlightColor').value;
            GREY_COLOR = document.getElementById('greyColor').value;
            TIME_THRESHOLD_MONTHS = parseInt(document.getElementById('timeThresholdMonths').value, 10);

            // 保存到油猴存储
            GM_setValue('highlightColor', HIGHLIGHT_COLOR);
            GM_setValue('greyColor', GREY_COLOR);
            GM_setValue('timeThresholdMonths', TIME_THRESHOLD_MONTHS);

            // 隐藏设置面板
            panel.style.display = 'none';

            // 应用新的设置，立即执行高亮
            highlightDates();
        });
    }

    // === 核心函数 ===
    function highlightDates() {
        if (isHighlighting) return;  // 防止重复执行
        isHighlighting = true;  // 设置标志为正在执行

        const now = new Date();
        const elements = document.querySelectorAll('.sc-aXZVg');
        if (elements.length === 0) {
            console.log('没有找到日期元素');
            isHighlighting = false;
            return;
        }

        elements.forEach(element => {
            const datetime = element.getAttribute('datetime');
            if (datetime) {
                const date = new Date(datetime);
                const timeDiff = now - date;
                const daysDiff = timeDiff / (1000 * 3600 * 24);
                const monthsDiff = daysDiff / 30;

                // 找到最近的祖先 td 元素
                const tdElement = element.closest('td');
                if (tdElement) {
                    element.style.setProperty('color', '#fff', 'important');
                    if (monthsDiff <= TIME_THRESHOLD_MONTHS) {
                        tdElement.style.setProperty('background-color', HIGHLIGHT_COLOR, 'important');
                    } else {
                        tdElement.style.setProperty('background-color', GREY_COLOR, 'important');
                    }
                }
            }
        });

        isHighlighting = false;  // 执行完毕，重置标志
    }

    // === URL 更新后的逻辑 ===
    function onUrlChange() {
        if (currentURL !== location.href) {
            currentURL = location.href;
            console.log('URL 发生变化:', currentURL);

            // 检查 URL 是否符合 https://github.com/*/*/tree/* 格式
            const regex = /^https:\/\/github\.com\/[^/]+\/[^/]+\/tree\/[^/]+/;
            if (regex.test(location.href)) {
                console.log('符合 GitHub 目录树页面格式');

                // 检查 code-tab 是否存在且包含 selected 类名
                const codeTab = document.getElementById('code-tab');
                if (codeTab && codeTab.classList.contains('selected')) {
                    console.log('code-tab 存在并被选中，开始执行高亮代码');
                    setTimeout(() => {
                        highlightDates();
                    }, 1000); // 延迟 1 秒，等待页面加载
                } else {
                    console.log('code-tab 不存在或未被选中，跳过高亮代码');
                }
            } else {
                console.log('不符合 GitHub 目录树页面格式，跳过高亮代码');
            }
        }
    }

    // === 监听 URL 和 DOM 变化 ===
    const observer = new MutationObserver(() => {
        const codeTab = document.getElementById('code-tab');
        if (codeTab && codeTab.classList.contains('selected')) {
            highlightDates();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });

    setInterval(onUrlChange, 1000);

    setTimeout(() => {
        const codeTab = document.getElementById('code-tab');
        if (codeTab && codeTab.classList.contains('selected')) {
            highlightDates();
        }
    }, 1000);

    // === 防止滚动时重复触发 ===
    let isScrolling = false;
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            isScrolling = true;
            setTimeout(() => {
                isScrolling = false;  // 滚动结束后重新允许触发
            }, 100);
        }
    });

    // === 初始化设置面板 ===
    createSettingsPanel();

    // === 使用油猴菜单显示/隐藏设置面板 ===
    GM_registerMenuCommand('⚙️ 设置面板', () => {
        const panel = document.querySelector('div[style*="position: fixed"]');
        if (panel) {
            panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
        }
    });

    // === 页面加载时自动执行高亮 ===
    highlightDates(); // 确保在初始化时执行高亮逻辑
})();