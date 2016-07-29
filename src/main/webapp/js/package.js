var config = function (version, configParam) {
    "use strict";
    var config = configParam ? configParam : {},
        d = {}, hostName = window.location.hostname;
    //调试模式或非本地请求 || -1 != hostName.indexOf("localhost")
    return config.debug === !0  ?
        (d.base = config.base || "../../js", d.comboExcludes = /.*/) :
        d.base = -1 != hostName.indexOf("m.taobao.com") || -1 != hostName.indexOf("wapa.taobao.com") ?
        "//g.alicdn.com/tb/auctionh5/" + version : "//g-assets.daily.taobao.net/tb/auctionh5/" + version,
        d.alias = {
            zepto: "//g.alicdn.com/mtb/zepto/1.0.4/zepto.js",
            mtop: "//g.alicdn.com/g/mtb/lib-mtop/0.5.12/mtop-login.js",
            login: "//g.alicdn.com/mtb/lib-login/1.1.2/login.js",
            api: "//g.alicdn.com/mtb/lib-windvane/1.2.4/api.js",
            bridge: "//g.alicdn.com/mtb/lib-windvane/1.2.4/bridge.js",
            JsListView: "//g.alicdn.com/tb/h5coin/0.1.1/js/common/JsListView.js",
            ListView: "//g.alicdn.com/tb/h5coin/0.1.1/js/common/ListView.js",
            JsScrollView: "//g.alicdn.com/tb/h5coin/0.0.8/js/common/JsScrollView.js",
            touch: "//g.alicdn.com/tb/h5coin/0.0.87/js/common/paimai/touch.js",
            "lib-mtop/mtop": "//g.alicdn.com/g/mtb/lib-mtop/0.5.12/mtop-login.js",
            "lib-login/login": "//g.alicdn.com/mtb/lib-login/1.1.2/login.js",
            "/lib-encode/base64utf8": "//g.alicdn.com/g/mtb/lib-encode/0.0.1/base64utf8.js",
            "lib-windvane/api": "//g.alicdn.com/mtb/lib-windvane/1.2.4??/bridge.js,/api.js"
        }, d
};