!function () {
    "use strict";
    if (window.devicePixelRatio && devicePixelRatio >= 2) {
        var htmlRoot = document.documentElement,
            divDom = document.createElement("div"),
            bodyDom = document.createElement("body"),
            htmlFirstChild = htmlRoot.firstElementChild || htmlRoot.firstChild;
        divDom.style.border = ".5px solid transparent",
            bodyDom.appendChild(divDom),
            htmlRoot.insertBefore(bodyDom, htmlFirstChild),
        1 == divDom.offsetHeight && document.querySelector("html").classList.add("hairlines"),
            htmlRoot.removeChild(bodyDom)
    }
}();