// ==UserScript==
// @name            临时更改谷歌搜索结果中英文
// @name            Google Result Language Switcher
// @namespace       https://github.com/NiaoBlush/GoogleResultLanguageSwitcher
// @version         1.1
// @description     将google结果切换为中文结果, 不改变Google界面语言
// @author          NiaoBlush
// @license         MIT
// @grant           none
// @include         https://www.google.com/search?*
// ==/UserScript==

(function () {
    'use strict';
    const urlParams = new URLSearchParams(window.location.search);
    const currentLang = urlParams.get("lr") || "en";
    const btnId = "btn-language-switcher";

    let parent = document.getElementById("hdtb-tls").parentElement;
    let className = parent.lastElementChild.className;

    let button = document.createElement("a");
    button.innerHTML = currentLang === 'en' ? "<font color=#5f6368>简体中文结果</font>" : "<font color=#5f6368>结果不限语言</font>";
    button.className = className;
    button.id = btnId;
    button.onclick = () => reload();

    parent.appendChild(button);

    /**
     * 重载页面
     */
    function reload() {
        document.getElementById(btnId).innerHTML = "<font color=#5f6368>正在重新加载</font>";
        if (currentLang === 'lang_zh-CN') {
            urlParams.delete("lr");
        } else {
            urlParams.append("lr", "lang_zh-CN")
        }
        const newUrl = `${location.origin}${location.pathname}?${urlParams.toString()}`;
        location.href = newUrl;
    }

})();


