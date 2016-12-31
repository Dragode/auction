var toastUtil = {
    show: function (a, b) {
        b || (b = {});
        var c = b.left ? b.left : 0, d = b.top ? b.left : 0, e = b.time ? b.time : 3e3, f = '<div id="util_toastMessage"><span class="content"></span></div>', g = $("#util_toastMessage");
        0 == g.size() && (g = $(f).appendTo($("body"))), g.find("span").html(a), g.show(), c || (c = window.scrollX + $(window).width() / 2 - g.find("span").width() / 2), d || (d = window.scrollY + $(window).height() / 3 - g.find("span").height() / 2), g.css({
            top: d,
            left: c
        }), setTimeout(function () {
            g.hide()
        }, e)
    },

    showMsg: function (a, b) {
        this.show(a, b)
    },

    showMtopRetErrorMsg: function (a, b) {
        if (a.length > 0) {
            var c = a[0], d = c.indexOf("::");
            if (d > 0) {
                if (c = c.substring(d + 2, c.length), c && c.indexOf("HSF") >= 0)return void $().toastUtil.showError("系统繁忙，请稍候重试", b);
                this.showError(c, b)
            }
        }
    },

    showError: function (a, b) {
        a ? this.show(a, b) : this.show("系统错误！", b)
    },

    showLoading: function () {
        var show = function () {
            var left,
                top,
                loadingCore = $("body").find("#loadingCore"),
                loading = $("body").find("#loading");

            if (0 == loadingCore.length) {
                $("body").append('<section id="loading" style="position: static;"><div id="loadingCore"></div></section>');
                loadingCore = $("#loadingCore");
                loading = $("#loading");
                loading.css("position", "absolute");
                loading.css({
                    top: "0px",
                    left: "0px"
                });
                loading.css("height", "100%");
                loading.css("width", "100%");
                loading.css("z-index", "99999");
                loadingCore.css("position", "absolute");
                loadingCore.css("height", "12px");
                loadingCore.css("width", "30px");
                loadingCore.css("background", "url(//assets.alicdn.com/mw/base/styles/component/more/images/loading.gif)");
                loadingCore.css("background-repeat", "no-repeat");
                loadingCore.css("background-position", "center");
                loadingCore.css("background-size", "cover");
                loadingCore.css("z-index", "99999");

            }


            left = window.scrollX + $(window).width() / 2 - 15;
            top = window.scrollY + $(window).height() / 2 - 6;

            loadingCore.css({
                top: top,
                left: left
            });
            loadingCore.css("display", "-webkit-box");
            loading.css("display", "-webkit-box");
        };
        show()
    },

    dismissLoading: function () {
        var loadingElement = $("#loading");
        loadingElement.css("display", "none")
    }
};