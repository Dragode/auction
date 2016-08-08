define("http", function (a, b, c) {
    function d(a) {
        if (a && a.ret)for (var b = 0; b < a.ret.length; b++) {
            var c = a.ret[b];
            if (c.indexOf("FAIL_SYS_SESSION_EXPIRED") > -1) {
                var d = window.location.href, e = "m";
                return d.indexOf("waptest.taobao.com") > 0 ? e = "waptest" : d.indexOf("wapa.taobao.com") > 0 && (e = "wapa"), d = "//login." + e + ".taobao.com/login.htm?tpl_redirect_url=" + encodeURIComponent(d), window.location.href = d, !0
            }
        }
    }

    function e(a) {
        var b, c = {};
        c.time = 1e3, a && a.ret ? (b = a.ret[0].split("::")[1], -1 !== b.indexOf("HSF") && (b = "系统繁忙，请稍后再试")) : b = "网络错误，请稍后再试", $().toastUtil.show(b, c)
    }

    b.request = function (a, b, c) {
        a.loading && $().toastUtil.showLoading(), lib.mtop.request(a, function (c) {
            a.loading && $().toastUtil.dismissLoading(), d(c) !== !0 && b && b(c)
        }, function (b) {
            a.loading && $().toastUtil.dismissLoading(), d(b) !== !0 && ((null == a.showErrorAuto || 1 == a.showErrorAuto) && e(b), c && c(b))
        })
    }
});