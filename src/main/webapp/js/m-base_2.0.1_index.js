!function (window) {
    function adaptRem() {
        var clientWidth = htmlRoot.clientWidth,
            r = "}";
        !navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)
        && clientWidth > 1024
        && (clientWidth = 640, r = ";max-width:" + clientWidth + "px;margin-right:auto!important;margin-left:auto!important;}"),
            window.rem = clientWidth / 10,
        /ZTE U930_TD/.test(navigator.userAgent)
        && (window.rem = 1.13 * window.rem),
        /Android\s+4\.4\.4;\s+M351\s/.test(navigator.userAgent)
        && (window.rem = window.rem / 1.05),
            styleDom.innerHTML = "html{font-size:" + window.rem + "px!important;}body{font-size:" + 12 * (clientWidth / 320) + "px" + r
    }

    var htmlRoot = document.documentElement,
        styleDom = document.createElement("style");
    htmlRoot.firstElementChild.appendChild(styleDom);
    window.addEventListener("resize", function () {
        adaptRem()
    }, !1);
    window.addEventListener("pageshow", function (e) {
        e.persisted && adaptRem()
    }, !1);
    adaptRem()
}(window);