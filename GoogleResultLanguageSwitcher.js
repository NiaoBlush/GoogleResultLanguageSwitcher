// ==UserScript==
// @name         临时更改谷歌搜索结果中英文
// @name         Google Result Language Switcher
// @version      1.0
// @description  将google结果切换为中文结果, 不改变Google界面语言
// @author       NiaoBlush
// @grant        none
// @include       https://www.google.com/search?*
// ==/UserScript==

(function () {
    'use strict';
    const urlParams = new URLSearchParams(window.location.search);
    const currentLang = urlParams.get("lr") || "en";
    const btnId = "btn-language-switcher";

    let parent = document.getElementsByTagName("g-header-menu")[1].parentElement;
    let className = parent.lastElementChild.className;

    let button = document.createElement("a");
    button.innerText = currentLang === 'en' ? "lang_zh-CN" : "en";
    button.className = className;
    button.id = btnId;
    button.onclick = () => reload();

    parent.appendChild(button);

    /**
     * 重载页面
     */
    function reload() {
        document.getElementById(btnId).innerText = "reloading";
        if (currentLang === 'lang_zh-CN') {
            urlParams.delete("lr");
        } else {
            urlParams.append("lr", "lang_zh-CN")
        }
        const newUrl = `${location.origin}${location.pathname}?${urlParams.toString()}`;
        location.href = newUrl;
    }

})();


