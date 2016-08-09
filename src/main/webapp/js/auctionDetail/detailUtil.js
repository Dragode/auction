function getParams() {
    var a = location.search, b = {};
    if (-1 != a.indexOf("?")) {
        var c = a.substr(1);
        strs = c.split("&");
        for (var d = 0; d < strs.length; d++)b[strs[d].split("=")[0]] = strs[d].split("=")[1]
    }
    return b
}
var params = getParams();
$.fn.paramUtil = {
    get: function (a) {
        return params[a] || ""
    }, params: params
}, $.fn.storageUtil = {
    supportStorage: function () {
        try {
            return localStorage.setItem("test", "1"), localStorage.removeItem("test"), !0
        } catch (a) {
            return !1
        }
    }
}, $.fn.stringUtil = {
    isEmpty: function (a) {
        return a && (a = a.toString(), a = a.trim(), a.length > 0) ? !1 : !0
    }, isNotEmpty: function (a) {
        return a ? (a = a.toString(), a = a.trim(), a.length > 0) : !1
    }, lengthInRange: function (a, b, c) {
        return a ? (a = a.toString(), a = a.trim(), a.length >= b && a.length <= c) : !1
    }, toString: function (a) {
        return a ? a.toString() : ""
    }, valueOf: function (a) {
        return a ? "string" == typeof a || "number" == typeof a || "boolean" == typeof a ? "" + a : a instanceof Object ? a.toString() : void 0 : ""
    }, replaceAll: function (a, b, c) {
        if (a && ("string" == typeof a || a instanceof String)) {
            var d = a.split(b);
            return d.join(c)
        }
    }, toObjArrayFromMutationStr: function (a, b, c) {
        function d(a, b) {
            return {key: a, value: b}
        }

        if (void 0 == a || null == a || 0 == a.length)return a;
        var e = a.split(b), f = [];
        return e.forEach(function (a, b) {
            var e = a.split(c);
            2 == e.length && f.push(d(e[0], e[1]))
        }), f
    }
}, $.fn.dateUtil = {
    getTime: function (a) {
        return this.parse(a).getTime()
    }, parseTime: function (a) {
        if ("number" == typeof a)return new Date(a);
        var b = a.split(/[^0-9]/);
        return 6 == b.length ? new Date(b[0], b[1] - 1, b[2], b[3], b[4], b[5]) : 3 == b.length ? new Date(b[0], b[1] - 1, b[2]) : void 0
    }, format: function (a, b) {
        null == b && (b = "yyyy-MM-dd hh:mm:ss");
        var c;
        if (void 0 == a)return "拍品未发布";
        var c = {
            "M+": a.getMonth() + 1,
            "d+": a.getDate(),
            "h+": a.getHours(),
            "m+": a.getMinutes(),
            "s+": a.getSeconds(),
            "q+": Math.floor((a.getMonth() + 3) / 3),
            S: a.getMilliseconds()
        };
        /(y+)/.test(b) && (b = b.replace(RegExp.$1, (a.getFullYear() + "").substr(4 - RegExp.$1.length)));
        for (var d in c)new RegExp("(" + d + ")").test(b) && (b = b.replace(RegExp.$1, 1 == RegExp.$1.length ? c[d] : ("00" + c[d]).substr(("" + c[d]).length)));
        return b
    }, parse: function (a) {
        if (void 0 == a)return a;
        var b = a.split(/[^0-9]/), c = null;
        return 3 == b.length ? c = new Date(b[0], b[1] - 1, b[2]) : b.length >= 6 && (c = new Date(b[0], b[1] - 1, b[2], b[3], b[4], b[5])), c
    }, compare: function (a, b) {
        "string" == typeof a && (a = $().dateUtil.getTime(a)), "string" == typeof b && (b = $().dateUtil.getTime(b));
        var c = a - b;
        return c > 0 ? 1 : 0 > c ? -1 : 0
    }, getTwoDigital: function (a) {
        return 10 > a ? "0" + a : a
    }, formatCountDown: function (a) {
        var b = "", c = parseInt(a % 60 * 10), d = Math.floor(c / 10), e = c % 10;
        return b = d + "<s>秒</s><b>" + e + "</b>" + b, a = Math.floor(a / 60), 0 == a ? b : (b = a % 60 + "<s>分</s>" + b, a = Math.floor(a / 60), 0 == a ? b : (b = a % 24 + "小时" + b, a = Math.floor(a / 24), 0 == a ? b : b = a + "天" + b))
    }, formatCountDownShort: function (a) {
        var b = "", c = parseInt(a % 60 * 10), d = Math.floor(c / 10);
        return b = d, a = Math.floor(a / 60), 0 == a ? b : (b = a % 60 + ":" + b, a = Math.floor(a / 60), 0 == a ? b : b)
    }, startCountdown: function (a, b, c, d, e) {
        function f(a, b) {
            this.viewId = a, this.time = 1e3 * b, this.lastTime = (new Date).getTime(), this.callBack = c, null != d && 1 == d && (this.formaterShort = !0), null != e && "" != e && (this.otherview = e)
        }

        f.prototype.setTime = function (a) {
            this.time = 1e3 * a
        }, f.prototype.start = function () {
            var a = this, b = setInterval(function () {
                a.time -= (new Date).getTime() - a.lastTime, a.lastTime = (new Date).getTime(), a.time < 0 && (a.time = 0), null != a.formaterShort && 1 == a.formaterShort ? $(a.viewId).html($().dateUtil.formatCountDownShort(a.time / 1e3)) : $(a.viewId).html($().dateUtil.formatCountDown(a.time / 1e3)), null != a.otherview && (null != a.formaterShort && 1 == a.formaterShort ? $(a.otherview).html($().dateUtil.formatCountDownShort(a.time / 1e3)) : $(a.otherview).html($().dateUtil.formatCountDown(a.time / 1e3))), a.time <= 0 && (window.clearInterval(b), a.callBack && a.callBack())
            }, 200)
        };
        var g = new f(a, b, c);
        return g.start(), g
    }, getTimeDesc: function (a) {
        if (void 0 != a) {
            var b, c = new Date;
            -1 != a.indexOf("/") && (a += "/" + (new Date).getFullYear()), b = new Date(a);
            var d = c.getTime() - b.getTime();
            return d < two_min ? "刚刚" : d <= five_min ? Math.floor(d / one_min) + "分钟" : this.format(b, "hh:mm:ss")
        }
    }
};
var Mai_Dian_Map = {
    BMBZJ_1_N: "/tbauctionh.100.1",
    BMBZJ_1_SP: "/tbauctionh.110.1",
    BMBZJ_2: "/tbauctionh.900.1",
    XYQR_1_SP: "/tbauctionh.110.2",
    XYQR_2: "/tbauctionh.900.2",
    SFQR_1_SP: "/tbauctionh.110.4",
    SFQR_2: "/tbauctionh.900.4",
    ZFBZJ_1_N: "/tbauctionh.100.2",
    ZFBZJ_1_SP: "/tbauctionh.110.6",
    ZFBZJ_2: "/tbauctionh.900.6"
}, Chck_Sum_Map = {
    "/tbauctionh.110.6": "H46926364",
    "/tbauctionh.110.4": "H46926362",
    "/tbauctionh.110.2": "H46926360",
    "/tbauctionh.110.1": "H46926338",
    "/tbauctionh.100.2": "H46926360",
    "/tbauctionh.100.1": "H46926338",
    "/tbauctionh.900.6": "H46926364",
    "/tbauctionh.900.4": "H46926362",
    "/tbauctionh.900.2": "H46926360",
    "/tbauctionh.900.1": "H46926338"
};
$.fn.paimaiLogUtil = {
    getMaidianCode: function (a, b, c) {
        var d = a + "_" + b;
        return "1" == b && (d += !c || "_a_" != c && "_p_" != c ? "_N" : "_SP"), Mai_Dian_Map[d]
    }, getChkSum: function (a) {
        return Chck_Sum_Map[a]
    }, click: function (a, b, c) {
        var d = this.getMaidianCode(a, b, c);
        d && (d = d.trim(), window.goldlog && goldlog.record && goldlog.record(d, "", "", this.getChkSum(d)))
    }
}, $.fn.detailpageUtil = {
    openWindow: function (a, b, c) {
        a && (a = this.getUrl(a), c || (a = $().urlUtil.addParameter(a, "ttid", $().config.TTID)), a = $().urlUtil.addSchema(a), b = !1, b ? $().conditionUtil.isWindVane() ? window.WindVane.call("Base", "openWindow", {url: a}, null, function () {
            window.open(a)
        }) : window.open(a) : document.location.href = a)
    }, open: function (a, b) {
        this.openWindow(a, !1, b)
    }, openWithSpm: function (a, b) {
        a && (a = this.getUrl(a), a = $().urlUtil.addParameter(a, "ttid", $().config.TTID), window.g_SPM && $(b) && $(b).size() > 0 && (a = $().urlUtil.addParameter(a, "spm", g_SPM.spm($(b)[0]))), 0 !== a.indexOf("http") && 0 !== a.indexOf("https") && (a = location.protocol + a), a = $().urlUtil.addSchema(a), $().conditionUtil.isWindVane() && $.deviceUtil.isIphone() ? window.WindVane.call("Base", "openWindow", {url: a}, null, function () {
            document.location.href = a
        }) : document.location.href = a)
    }, back: function () {
        window.history.back()
    }, forward: function () {
        window.history.forward()
    }, refresh: function () {
        document.location.reload()
    }, getUrl: function (a) {
        function b(a) {
            if (a.length > 0) {
                var c = a[0];
                "." == c ? d.pop() : "" == c || d.push(c), a.shift(0), b(a)
            }
        }

        if (!a)return a;
        if (-1 == a.indexOf("http://") && -1 == a.indexOf("https://") && -1 == a.indexOf("//")) {
            var c = decodeURI(window.location.href);
            c = c.replace(/\?.*/g, "").replace(/\/|\/\//g, "/").replace(":/", ":");
            var d = c.split("/");
            d.length > 0 && d.pop();
            var e = a.replace(/(\/)|(\.\/)|(\/\/)/g, "/").split("/");
            b(e);
            for (var f, g = 0; g < d.length; g++)0 == g ? f = d[g] : g == d.length - 1 ? f += d[g] : f = f + d[g] + "/";
            a = f.replace(":", "://")
        }
        return a
    }
};