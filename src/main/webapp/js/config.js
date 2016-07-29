!function (Zepto, window) {
    Zepto.fn.config = {
        GROUP: "RELEASE",
        TTID: "1219@paimai_h5_1.0",
        MPP_APP_ID: "1009",
        DEBUG: !0
    };

    try {
        -1 != window.location.host.indexOf("local") || -1 != window.location.host.indexOf("127.0.0.1") ?
            Zepto().config.GROUP = "DEV"
            :
            -1 != window.location.host.indexOf("waptest.taobao.com") ?
                Zepto().config.GROUP = "DAILY"
                :
                -1 != window.location.host.indexOf("wapa.taobao.com") && (Zepto().config.GROUP = "PRE")
    } catch (c) {
        console.log(c.stack)
    }
    Zepto().config.configEntity = function (b, c, d, e) {
        return 3 === arguments.length && (e = d, d = c, c = b),
            "DEV" == Zepto().config.GROUP ?
                b
                :
                "DAILY" == Zepto().config.GROUP ?
                    c
                    :
                    "PRE" == Zepto().config.GROUP ?
                        d
                        :
                        e
    },
    Zepto().config.TAOBAO_HOST = Zepto().config.configEntity("waptest.taobao.com", "wapa.taobao.com", "m.taobao.com"),
    Zepto().config.ALIPAY_HOST = Zepto().config.configEntity("wap.stable.alipay.net", "m.alipay.com", "m.alipay.com"),
    Zepto().config.LOGIN_URL = function (b) {
        return "//login." + Zepto().config.TAOBAO_HOST + "/login.htm?tpl_redirect_url=" + b + "&ttid=" + Zepto().config.TTID
    },
    Zepto().config.MTOP_APP_KEY = Zepto().config.configEntity("4272", "21696909", "21696909"),
    Zepto().config.BASE_DOMAIN = Zepto().config.configEntity("//h5.waptest.taobao.com/paimai/", "//h5.wapa.taobao.com/paimai/", "//h5.m.taobao.com/paimai/"),
    Zepto().config.ASSETS_VERSION = Zepto().config.configEntity(window.ASSETS_VERSION_DAILY ? window.ASSETS_VERSION_DAILY : "2.1.3", window.ASSETS_VERSION_RELEASE ? window.ASSETS_VERSION_RELEASE : "2.1.3", window.ASSETS_VERSION_RELEASE ? window.ASSETS_VERSION_RELEASE : "2.1.3"),
    Zepto().config.ASSETS_BASE = Zepto().config.configEntity("//local.waptest.taobao.com/paimai/assets/", "//g-assets.daily.taobao.net/tb/paimai/" + Zepto().config.ASSETS_VERSION + "/assets/", "//g.alicdn.com/tb/paimai/" + Zepto().config.ASSETS_VERSION + "/assets/", "//g.alicdn.com/tb/paimai/" + Zepto().config.ASSETS_VERSION + "/assets/"),
    "undefined" != typeof ejs && (ejs.open = "{{", ejs.close = "}}"),
    function () {
        "undefined" != typeof window.lib && "undefined" != typeof window.lib.config && (window.lib.config.defaultAppKey = Zepto().config.MTOP_APP_KEY)
    }(),
    Zepto.fn.configAplus = {
        BACK_CODE_MAPING: {
            "/paimai/treasure/treasureMain.html": "/tbauctionh.7.1",
            "/paimai/treasure/treasureSession.html": "/tbauctionh.8.1",
            "/paimai/auction/auctions.html": "/tbauctionh.3.1",
            "/paimai/detail.html": "/tbauctionh.9.1",
            "/paimai/treasure/auctionAgreement_property.html": "/tbauctionh.6.1",
            "/paimai/treasure/buyerIdentity.html": "/tbauctionh.6.6",
            "/paimai/treasure/identityConfirm.html": "/tbauctionh.6.8"
        },
        getBackCode: function (a) {
            return this.BACK_CODE_MAPING[a]
        }
    };
    var d = ["/paimai/v2/home/index.html", "/paimai/v2/special/special.html", "/paimai/detail/detailV2.html"];
    !function () {
        var a, c = location.pathname;
        d.indexOf(c) < 0 && window.navigator.userAgent.match(/WindVane/i) && document.addEventListener("TBNaviBar.moreItem.clicked", function (d) {
            window.setTimeout(function () {
                a = "/paimai/v2/pmp/pmplist.html" == c ?
                    "//gtms03.alicdn.com/tps/i3/TB1wTCFGFXXXXcUXXXXmqjTHFXX-57-57.png"
                    :
                    "//gtms02.alicdn.com/tps/i2/TB1yfaFGFXXXXcXXXXXmqjTHFXX-57-57.png";
                var d = {image: a, url: location.href, title: document.title, text: "淘宝拍卖会"};
                window.WindVane && window.WindVane.api && window.WindVane.api.base.showShareMenu(function (a) {},function (a) {},d),
                document.addEventListener("wvBackClickEvent", function (a) {})
            }, 100)
        }, !1)
    }()
}(Zepto, window);