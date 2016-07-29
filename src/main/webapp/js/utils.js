!function ($, window) {
    function getVideoIdReg(a, b) {
        var c = new RegExp(a);
        return b.match(c)
    }

    $.fn.util = function () {
    }, $.fn.toastUtil = {
        show: function (a, b) {
            b || (b = {});
            var c = b.left ? b.left : 0, d = b.top ? b.left : 0, e = b.time ? b.time : 3e3, f = '<div id="util_toastMessage"><span class="content"></span></div>', g = $("#util_toastMessage");
            0 == g.size() && (g = $(f).appendTo($("body"))), g.find("span").html(a), g.show(), c || (c = window.scrollX + $(window).width() / 2 - g.find("span").width() / 2), d || (d = window.scrollY + $(window).height() / 3 - g.find("span").height() / 2), g.css({
                top: d,
                left: c
            }), setTimeout(function () {
                g.hide()
            }, e)
        }, showMsg: function (a, b) {
            this.show(a, b)
        }, showMtopRetErrorMsg: function (a, b) {
            if (a.length > 0) {
                var c = a[0], d = c.indexOf("::");
                if (d > 0) {
                    if (c = c.substring(d + 2, c.length), c && c.indexOf("HSF") >= 0)return void $().toastUtil.showError("系统繁忙，请稍候重试", b);
                    this.showError(c, b)
                }
            }
        }, showError: function (a, b) {
            a ? this.show(a, b) : this.show("系统错误！", b)
        }, showLoading: function () {
            var a = function () {
                var a, b, c = $("body").find("#loadingCore"), d = $("body").find("#loading");
                0 == c.length && ($("body").append('<section id="loading" style="position: static;"><div id="loadingCore"></div></section>'), c = $("#loadingCore"), d = $("loading"), d.css("position", "absolute"), d.css({
                    top: "0px",
                    left: "0px"
                }), d.css("height", "100%"), d.css("width", "100%"), d.css("z-index", "99999"), c.css("position", "absolute"), c.css("height", "12px"), c.css("width", "30px"), c.css("background", "url(//assets.alicdn.com/mw/base/styles/component/more/images/loading.gif)"), c.css("background-repeat", "no-repeat"), c.css("background-position", "center"), c.css("background-size", "cover"), c.css("z-index", "99999")), a || (a = window.scrollX + $(window).width() / 2 - 15), b || (b = window.scrollY + $(window).height() / 2 - 6), c.css({
                    top: b,
                    left: a
                }), c.css("display", "-webkit-box"), d.css("display", "-webkit-box")
            };
            a()
        }, dismissLoading: function () {
            var a = $("#loading");
            a.css("display", "none")
        }
    }, $.fn.dialogUtil = {
        geTemplate: function () {
            return '<div id="util_dialog_bg"><ul>   <li><span>title</span></li>   <li>content</li>   <li>       <div><span>取消</span></div>       <div><span>确定</span></div>   </li></ul></div>'
        }, show: function (a, b) {
            b || (b = {});
            var c = b.left ? b.left : 0, d = b.top ? b.left : 0, e = b.width ? b.width : null, f = b.height ? b.height : null, g = b.title, h = b.cancelText ? b.cancelText : "取消", i = b.confirmText ? b.confirmText : "确定", j = b.onCancel ? b.onCancel : function () {
            }, k = b.onConfirm ? b.onConfirm : function () {
            }, l = $("#util_dialog_bg");
            0 == l.size() && (l = $(this.geTemplate()).appendTo($("body")));
            var m = l.find("ul");
            m.find("li:nth-child(2)").html(a), g ? m.find("li:nth-child(1)").show() : m.find("li:nth-child(1)").hide(), l.show(), c || (c = window.scrollX + $(window).width() / 2 - m.width() / 2), d || (d = window.scrollY + $(window).height() / 2 - m.height() / 2), m.css({
                top: d,
                left: c,
                width: e,
                height: f
            }), m.find("li:nth-child(3) div:nth-child(1) span").html(h), m.find("li:nth-child(3) div:nth-child(2) span").html(i), m.find("li:nth-child(3) div").off("click"), m.find("li:nth-child(3) div").on("click", function () {
                l.hide()
            }), m.find("li:nth-child(3) div:nth-child(1)").on("click", j), m.find("li:nth-child(3) div:nth-child(2)").on("click", k)
        }, hide: function () {
            var a = $("#util_dialog_bg");
            a.hide()
        }
    }, $.fn.moneyUtil = {
        format: function (a) {
            return "string" != typeof a && "number" != typeof a ? "" : "￥" + a
        }, formatComma: function (a) {
            if (a = this.parseFloat(a), "number" == typeof a && (a = a.toString()), "string" != typeof a)return "";
            var b = -1 != a.indexOf(".") ? !0 : !1, c = "";
            if (b) {
                var d = a.split(".");
                a = d[0], c = d[1]
            }
            for (var e = "", f = a.length; f >= 0; f -= 3) {
                if ("" != e && (e = "," + e), 3 >= f) {
                    e = a.substring(0, f) + e;
                    break
                }
                e = a.substring(f - 3, f) + e
            }
            return b && (e += "." + c), e
        }, parseFloat: function (a) {
            return a ? "number" == typeof a || a instanceof Number ? a : "string" == typeof a || a instanceof String ? parseFloat($().stringUtil.replaceAll($().stringUtil.replaceAll(a.toString(), ",", ""), " ", "")) : void 0 : 0
        }, formatMoney: function (a) {
            return a = parseInt(a), a >= 1e10 ? "￥" + a / 1e10 + "亿" : a >= 1e6 ? "￥" + a / 1e6 + "万" : "￥" + a / 100
        }, formatMoneyBid: function (a) {
            return "￥" + $.fn.moneyUtil.formatComma(parseInt(a) / 100)
        }, formatPrice: function (a, b) {
            var c = 1e4, d = 1e8, e = "", f = !1;
            if (a >= d ? (a /= d, e = "亿", f = !0) : a >= c && (a /= c, e = "万", f = !0), null != b && 1 == b && (f = !1), (a + "").length > 6 || 1 == f) {
                a += "";
                var g = a.indexOf(".");
                g >= 0 && a.length - g >= 3 && (a = a.substr(0, g + 3)), a = 100 * a / 100
            }
            return a + e
        }
    }, $.fn.dateUtil = {
        LIST_TIME_FORMAT: "MM月dd日 hh:mm", getTime: function (a) {
            return this.parse(a).getTime()
        }, format: function (a, b) {
            null == b && (b = "yyyy-MM-dd hh:mm:ss");
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
            var b = a.split(/[^0-9]/), c = null;
            return 3 == b.length ? c = new Date(b[0], b[1] - 1, b[2]) : b.length >= 6 && (c = new Date(b[0], b[1] - 1, b[2], b[3], b[4], b[5])), c
        }, compare: function (a, b) {
            "string" == typeof a && (a = $().dateUtil.getTime(a)), "string" == typeof b && (b = $().dateUtil.getTime(b));
            var c = a - b;
            return c > 0 ? 1 : 0 > c ? -1 : 0
        }, getTwoDigital: function (a) {
            return 10 > a ? "0" + a : a
        }, formatCountDown: function (a) {
            var b = "";
            return b = parseInt(a % 60 * 10) / 10 + "秒" + b, a = Math.floor(a / 60), 0 == a ? b : (b = a % 60 + "分" + b, a = Math.floor(a / 60), 0 == a ? b : (b = a % 24 + "小时" + b, a = Math.floor(a / 24), 0 == a ? b : b = a + "天" + b))
        }, startCountdown: function (a, b, c) {
            function d(a, b) {
                this.viewId = a, this.time = 1e3 * b, this.lastTime = (new Date).getTime(), this.callBack = c
            }

            d.prototype.setTime = function (a) {
                this.time = 1e3 * a
            }, d.prototype.start = function () {
                var a = this, b = setInterval(function () {
                    a.time -= (new Date).getTime() - a.lastTime, a.lastTime = (new Date).getTime(), a.time < 0 && (a.time = 0), $(a.viewId).html($().dateUtil.formatCountDown(a.time / 1e3)), a.time <= 0 && (window.clearInterval(b), a.callBack && a.callBack())
                }, 200)
            };
            var e = new d(a, b, c);
            return e.start(), e
        }, expireAndJump: function (a, b) {
            var c = (new Date).getTime() >= this.getTime(a);
            c && (window.location.href = b)
        }
    }, $.fn.urlUtil = {
        parseUrlRegexp: /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/,
        parseUrlVSm: function (a) {
            return null == a || void 0 == a ? [] : this.parseUrlRegexp.exec(a)
        },
        getUrlHash: function (a) {
            var b = this.parseUrlVSm(a);
            return null != b && void 0 != b && b.length > 0 ? b[7] : void 0
        },
        getParameter: function (a, b) {
            var a = a, b = b;
            1 == arguments.length && (b = a, a = window.location.href), 2 != arguments.length || a || (a = window.location.href);
            var c = "", d = "";
            try {
                d = decodeURI(a)
            } catch (e) {
                d = a
            }
            d.indexOf("#") > -1 && (d = d.substr(0, d.indexOf("#")));
            var f = !1, g = b + "=", h = g.length;
            if (d.indexOf("?") > -1)for (var i = d.substr(d.indexOf("?") + 1), j = i.split("&"), k = 0; k < j.length; k++)if (j[k].substr(0, h) == g) {
                var l = j[k].split("=");
                c = l[1], f = !0;
                break
            }
            return 0 == f ? null : c
        },
        addParameter: function (a, b, c) {
            var d = "", e = "", f = "", g = a;
            if (a.indexOf("#") > -1 && (f = g.substr(g.indexOf("#") + 1), g = g.substr(0, g.indexOf("#"))), g.indexOf("?") > -1 ? (d = g.substr(0, g.indexOf("?")), e = g.substr(g.indexOf("?") + 1)) : d = g, $().stringUtil.isEmpty(e))e = b + "=" + c; else {
                for (var h = e.split("&"), i = !1, j = 0; j < h.length; j++)if (h[j].substr(0, (b + "=").length) == b + "=") {
                    h[j] = b + "=" + c, i = !0;
                    break
                }
                i || h.push(b + "=" + c), e = h.join("&")
            }
            return $().stringUtil.isEmpty(f) ? d + "?" + e : d + "?" + e + "#" + f
        },
        renderURI: function (a, b, c, d, e) {
        },
        renderDomain: function (a, b, c, d) {
        },
        renderServer: function (a, b, c, d) {
        },
        removeParameter: function (a, b) {
            var c = a.split("?");
            if (c.length >= 2) {
                for (var d = encodeURIComponent(b) + "=", e = c[1].split(/[&;]/g), f = e.length; f-- > 0;)-1 !== e[f].lastIndexOf(d, 0) && e.splice(f, 1);
                return a = c[0] + "?" + e.join("&")
            }
            return a
        },
        removeSchema: function (a) {
            return a ? a.replace(/^(http:|https:)/, "") : a
        },
        isRelativeUrl: function (a) {
            return a && 0 != a.indexOf("http://") && 0 != a.indexOf("https://") && 0 != a.indexOf("//")
        }
    }, $.fn.pageUtil = {
        openWindow: function (a, b, c) {
            a && (a = this.getUrl(a), c || (a = $().urlUtil.addParameter(a, "ttid", $().config.TTID)), b = !1, b ? $().conditionUtil.isWindVane() ? window.WindVane.call("Base", "openWindow", {url: a}, null, function () {
                window.open(a)
            }) : window.open(a) : document.location.href = a)
        }, open: function (a, b) {
            this.openWindow(a, !1, b)
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
            if ($().urlUtil.isRelativeUrl(a)) {
                var c = decodeURI(window.location.href);
                c = c.replace(/\?.*/g, "").replace(/\/|\/\//g, "/").replace(":/", ":");
                var d = c.split("/");
                d.length > 0 && d.pop();
                var e = a.replace(/(\/)|(\.\/)|(\/\/)/g, "/").split("/");
                b(e);
                for (var f, g = 0; g < d.length; g++)0 == g ? f = d[g] : g == d.length - 1 ? f += d[g] : f = f + d[g] + "/";
                a = f.replace(":", "://")
            }
            return a = $().urlUtil.addParameter(a, "for", "paimaiApp"), a = $().urlUtil.removeSchema(a)
        }
    }, $.fn.pageLoader = {
        loadTemplate: function (a) {
            var b;
            b = $("undefined" != typeof a.id && null != a.id ? "#" + a.id : "<div></div>"), b.load(a.url, null, a.success), $("body").append(b)
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
        }, preventXss: function (a) {
            return String(a).replace(/&(?!#?[a-zA-Z0-9]+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;")
        }
    }, $.fn.historyUtil = {
        load: function () {
            var a;
            if (sessionStorage.history) {
                if (a = $().jsonUtil.toObject(sessionStorage.history), a.index < a.length - 1)return;
                if (a.index == a.length - 1 && window.location.href == a.location.href)return;
                a.list.push(window.location), a.location = window.location, a.length++, a.index++;
                try {
                    sessionStorage.history = $().jsonUtil.toString(a)
                } catch (b) {
                }
            } else {
                a = {length: 1, list: new Array, location: window.location, index: 0}, a.list.push(window.location);
                try {
                    sessionStorage.history = $().jsonUtil.toString(a)
                } catch (b) {
                }
            }
        }, back: function () {
            if (sessionStorage.history) {
                var a = $().jsonUtil.toObject(sessionStorage.history);
                if (a.length) {
                    a.index--, a.location = a.list[a.index];
                    try {
                        sessionStorage.history = $().jsonUtil.toString(a)
                    } catch (b) {
                    }
                }
            }
            window.history.back()
        }, forward: function () {
            if (sessionStorage.history) {
                var a = $().jsonUtil.toObject(sessionStorage.history);
                if (a.index < a.length - 1) {
                    a.index++, a.location = a.list[a.index];
                    try {
                        sessionStorage.history = $().jsonUtil.toString(a)
                    } catch (b) {
                    }
                }
            }
            window.history.forward()
        }, length: function () {
            if (sessionStorage.history) {
                var a = $().jsonUtil.toObject(sessionStorage.history);
                return a.length
            }
            return 0
        }, index: function () {
            if (sessionStorage.history) {
                var a = $().jsonUtil.toObject(sessionStorage.history);
                return a.index
            }
            return 0
        }
    }, $.fn.jsonUtil = {
        toObject: function (string) {
            return eval("(" + string + ")")
        }, toString: function (a, b) {
            if (1 == arguments.length)return b = new Array, this.toString(a, b), b.join("");
            if (void 0 == a || null == a)return void b.push("null");
            if ("number" == typeof a || "boolean" == typeof a)return void b.push(a);
            if ("string" == typeof a)return b.push("'"), b.push(a), void b.push("'");
            if ("function" == typeof a)return void b.push("null");
            if (a instanceof Array) {
                b.push("[");
                var c = !0;
                for (var d in a)c ? c = !1 : b.push(","), this.toString(a[d], b);
                return void b.push("]")
            }
            if ("object" == typeof a) {
                b.push("{");
                var c = !0;
                for (var d in a)c ? c = !1 : b.push(","), b.push(d), b.push(":"), this.toString(a[d], b);
                b.push("}")
            }
        }
    }, $.fn.headerUtil = {
        init: function (a, b, c, d, e) {
            $().conditionUtil.isInTaobaoClient(function () {
                $("#titleNav").hide(), e && e()
            }, function () {
                $("#titleNav").show(), d && d()
            });
            var f = $("header #back"), g = $("header #forward"), h = $("header #titleBar");
            b ? f.on("click", b) : f.on("click", function () {
                $().pageUtil.back()
            }), f.on("click", function () {
                try {
                    var a = $().configAplus.getBackCode(location.pathname);
                    $().stringUtil.isEmpty(a) && (a = "/tbauctionh.10.0"), $().shanksLog.easyClick(a)
                } catch (b) {
                    console.log(b.stack)
                }
            }), document.referrer && 0 == document.referrer.indexOf($().config.BASE_DOMAIN) || f.css("background", "initial"), c ? g.on($().conditionUtil.hasTouch(), c) : "undefined" == typeof arguments[5] && g.css("background", "initial"), $("head title").html() && h.html($("head title").html())
        }, show: function () {
            $().conditionUtil.isInTaobaoClient(function () {
                $("#titleNav").hide()
            }, function () {
                $("#titleNav").show()
            })
        }, hide: function () {
            $("#titleNav").hide()
        }
    }, $.fn.loginUtil = {
        jump: function () {
            var a = $().config.LOGIN_URL();
            window.location.href = a
        }, jumpwithreturn: function () {
            lib.login.goLogin({hideType: "reload"})
        }
    }, $.fn.wordUtil = {
        wordBreak: function (a, b, c) {
            if (null == a || a.length <= b)return a;
            for (var d, e = 0, f = 0, g = 0; g < a.length && 2 * b >= e; g++)d = a.charAt(g), /[\u4e00-\u9fa5]|[A-Z]|[，。！‘’；【】、《》]/.test(d) ? e += 2 : e++, ++f;
            return e > 2 * b && f--, a.length === f ? a : (c || (c = "..."), a.substr(0, f) + c)
        }
    }, $.fn.cookieUtil = {
        getCookie: function (a) {
            return document.cookie.length > 0 && (c_start = document.cookie.indexOf(a + "="), -1 != c_start) ? (c_start = c_start + a.length + 1, c_end = document.cookie.indexOf(";", c_start), -1 == c_end && (c_end = document.cookie.length), unescape(document.cookie.substring(c_start, c_end))) : ""
        }
    }, $.fn.validatUtil = {
        isTelephone: function (a) {
            return "string" == typeof a ? /^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/.test(a.trim()) : !1
        }, isMobile: function (a) {
            return "string" == typeof a ? /(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/.test(a.trim()) : !1
        }, isNumber: function (a) {
            return "number" == typeof a ? !0 : "string" == typeof a ? /(\d$)/.test(a.trim()) : !1
        }
    }, $.fn.shanksLog = {
        buttonClick: function (a) {
            try {
                var b = "//wgo.mmstat.com/tbauctionh";
                a.hasOwnProperty("gmkey") && (a.gmkey = encodeURIComponent(a.gmkey)), a.hasOwnProperty("gokey") && (a.gokey = encodeURIComponent(a.gokey)), a.cache = this.getCache(), (/((h5\.m)|(wapp\.wapa))\.taobao\.com/g.test(decodeURI(window.location.href)) || a.test) && $.ajax({
                    type: "GET",
                    url: b,
                    dataType: "jsonp",
                    data: a
                })
            } catch (c) {
            }
        }, easyClick: function (a) {
            try {
                var b = "//wgo.mmstat.com" + a + "?cache=" + this.getCache();
                if (/m\.taobao\.com/g.test(decodeURI(window.location.href)) || arguments[1]) {
                    var c = new Image;
                    c.src = b
                }
            } catch (d) {
            }
        }, getCache: function () {
            return Math.floor(4311412349 * Math.random()).toString(16)
        }
    }, $.fn.conditionUtil = {
        isInTaobaoClient: function (a, b) {
            var c = $().urlUtil.getParameter("from_where");
            if ("1" == sessionStorage.inTaobao || "1" == c) {
                try {
                    sessionStorage.inTaobao = "1"
                } catch (d) {
                }
                a()
            } else if ("-1" == sessionStorage.inTaobao || "-1" == c) {
                try {
                    sessionStorage.inTaobao = "-1"
                } catch (d) {
                }
                b && b()
            } else if (window.navigator && window.navigator.userAgent.match(/WindVane/i)) {
                try {
                    sessionStorage.inTaobao = "1"
                } catch (d) {
                }
                a()
            } else {
                try {
                    sessionStorage.inTaobao = "-1"
                } catch (d) {
                }
                b && b()
            }
        }, isWindVane: function () {
            return window.navigator.userAgent.match(/WindVane/i) && window.WindVane
        }, hasTouch: function () {
            var a = "ontouchend" in document ? !0 : !1;
            return a ? "tap" : "click"
        }, getWindowHeight: function () {
            var a = sessionStorage.windowHeight, b = document.body.scrollHeight, c = $(window).height();
            if (a) {
                var d = b > c ? b : c;
                a = a > d ? a : d
            } else a = b > c ? b : c;
            try {
                sessionStorage.windowHeight = a
            } catch (e) {
            }
            return a
        }, getListviewHeight: function (a) {
            var b = this.getWindowHeight(), c = $().urlUtil.getParameter("from");
            if ("paimai_app" == c) {
                var d = 0;
                return $(".none_list").each(function () {
                    d += $(this).height()
                }), b - d
            }
            return b - a
        }, isSupportStorage: function () {
            try {
                return sessionStorage.testTraceless = !1, !0
            } catch (a) {
                return !1
            }
        }, isAndroidShoutao: function () {
            return $.deviceUtil.isAndroid() && this.isShoutao()
        }, isIosShoutao: function () {
            return $.deviceUtil.isIphone() && this.isShoutao()
        }, isShoutao: function () {
            return /AliApp\(TB\//i.test(window.navigator.userAgent)
        }
    }, $.fn.lazyLoadUtil = {
        loadImage: function (a, b) {
            "undefined" == typeof b && (b = window);
            var c;
            c = "string" == typeof a ? $(a) : a, "function" == typeof HTMLElement.prototype.getBoundingClientRect ? $.each(c, function (a, b) {
                var c = b.getBoundingClientRect(), d = $(b), e = $(d.find("img"));
                window.innerHeight > c.top && c.bottom > 0 ? $.each(e, function (a, b) {
                    var c = $(b);
                    c.attr("src", c.attr("lazyLoad"))
                }) : (c.bottom < 0 || c.top > window.innerHeight) && $.each(e, function (a, b) {
                    var c = $(b);
                    c.attr("src", "//gtms01.alicdn.com/tps/i1/T1EoDnFkNeXXcI6BY_-280-280.png")
                })
            }) : b.initLazy || ($.each($(c.find("img")), function (a, b) {
                var c = $(b);
                c.attr("src", c.attr("lazyLoad"))
            }), b.initLazy = !0)
        }
    }, $.fn.packageUtil = {
        defined: function (a) {
            if ($().stringUtil.isEmpty(a))return window;
            var b = a.split("."), c = window;
            for (var d in b)c[b[d]] || (c[b[d]] = {}), c = c[b[d]];
            return c
        }
    }, $.fn.visible = function () {
        return this.each(function () {
            "hidden" == this.style.visibility && (this.style.visibility = null)
        })
    }, $.fn.invisible = function () {
        return this.each(function () {
            (!this.style.visibility || "visible" == this.style.visibility) && (this.style.visibility = "hidden")
        })
    }, $.fn.swipupanddown = function (a, b, c) {
        function d(a) {
            a.preventDefault();
            var b = a.touches[0];
            g = b.pageY, console.log("touch start :distiance:" + i)
        }

        function e(a) {
            a.preventDefault();
            var b = a.touches[0];
            i += b.pageY - g, console.log("move distiance:" + i)
        }

        function f(a) {
            a.preventDefault(), i > 100 && null != c && (c(), console.log("down :distiance:" + i)), -100 > i && null != b && (b(), console.log("up :distiance:" + i)), i = 0
        }

        var g, h = document.getElementById(a), i = 0;
        h.addEventListener("touchstart", d, !1), h.addEventListener("touchmove", e, !1), h.addEventListener("touchend", f, !1)
    }, $.getRandomArray = function (a, b) {
        if (!a || !$.isArray(a) || a.length <= b)return a;
        var c = a.length, d = [], e = Math.floor(Math.random() * c);
        d = a.slice(e, e + b);
        for (var f = d.length; b > f;)d[f] = a[--e], f = d.length;
        return d
    }, $.isArray = function (a) {
        return "[object Array]" === toString.apply(a)
    }, $.scrollUtil = {
        events: {scrollStart: !0, scrollEnd: !0, scrollDown: !0, scrollUp: !0},
        handlers: {},
        on: function (a, b) {
            return this.events[a] ? (this.handlers[a] = b, this) : void console.error("scrollUtil on error,event is wrong,name=" + a)
        },
        listener: function () {
            function a(a) {
                c = a.touches[0].pageX, d = a.touches[0].pageY, f.handlers.scrollStart && f.handlers.scrollStart(a)
            }

            function b(a) {
                var b = a.touches[0].pageX, g = a.touches[0].pageY;
                Math.abs(g - d) > Math.abs(b - c) && Math.abs(g - d) > e && (d > g ? f.handlers.scrollDown && f.handlers.scrollDown(a) : f.handlers.scrollUp && f.handlers.scrollUp(a))
            }

            var c = 0, d = 0, e = 1, f = this;
            $("body").off("touchmove", b).on("touchmove", b), $("body").off("onTouchstart", a).on("touchstart", a);
            var g, h = 0;
            $(window).on("scroll", function () {
                function a() {
                    setTimeout(function () {
                        (new Date).getTime() - g > 100 ? (f.handlers.scrollEnd && f.handlers.scrollEnd(), h = 0) : a()
                    }, 200)
                }

                g = (new Date).getTime(), 0 == h && (a(), h = 1)
            })
        }
    }, $.fn.iscrollUtil = {
        getClicker: function () {
            var a = navigator.userAgent, b = a.match(/Android [\d+.]{3,5}/), c = !0;
            return null != b && (c = parseFloat(b[0].replace("Android ", "")) < 4.4 ? !1 : !0), c
        }, getDefaultOption: function () {
            var a = {hScroll: !1, vScrollbar: !1, mouseWheel: !0};
            return a.click = this.getClicker(), a
        }
    }, $.deviceUtil = {
        isIphone: function () {
            return /iPhone|iPad|iPod/i.test(window.navigator.userAgent)
        }, isAndroid: function () {
            return /Android/i.test(window.navigator.userAgent)
        }, isAndroidExceptMeizu: function () {
            return this.isAndroid() && 0 == this.isMeiZu()
        }, isMeiZu: function () {
            return /MEIZU MX/i.test(window.navigator.userAgent)
        }, currentVersion: function () {
            var a = /WindVane\/(\d+\.{1}\d+\.{1}\d+)/i.exec(window.navigator.userAgent);
            return null != a && void 0 != a && a.length > 1 ? a[1] : void 0
        }, windVaneVersionGreaterEqualThan: function (a) {
            var b = this.currentVersion();
            if (null == a || void 0 == a || null == b || void 0 == b)return !1;
            var c = b.split("."), d = a.split(".");
            if (0 == d.length || 0 == c.length)return !1;
            for (var e = 0; e < d.length; e++)if (c[e] != d[e])return c[e] > d[e];
            return !0
        }
    }, $.fn.videoUtil = {
        getPicUrl: function (a) {
            var b = "//snapshot.video.taobao.com/snapshots/video/" + a + "?time=0";
            return b
        }, getVideoId: function (a) {
            var b = getVideoIdReg(/[0-9]+.swf/gim, a);
            if (null != b && b.length > 0) {
                var c = b[0], d = getVideoIdReg(/[0-9]+/gim, c);
                return d
            }
            return null
        }, getM3u8URL: function (a) {
            var b = $().stringUtil.replaceAll(a, /.swf/gim, ".m3u8");
            return b
        }, TYPE_IPhone: 3, TYPE_IPAD: 2, TYPE_Android: 5, TYPE_OTHER: -1, setEdeviceType: function (a, b) {
            var c = $().stringUtil.replaceAll(a, /e\/[0-9]{1}/gim, "e/" + b);
            return c
        }
    }, $.fn.devicePlatform = {
        multiDevice: function (a, b, c) {
            var d = navigator.userAgent;
            d.indexOf("iPhone") > -1 || d.indexOf("iPad") > -1 ? a() : d.indexOf("Android") > -1 ? b() : c()
        }
    }, $.fn.menustorageutil = {
        getZPMenuKey: function () {
            var a = new Date, b = a.format("yyyyMMdd_");
            return b += "auction_menu_key"
        }, getSfMenuKey: function () {
            var a = new Date, b = a.format("yyyyMMdd_");
            return b += "gov_menu_key"
        }, getSFPlaceMenuKey: function () {
            var a = new Date, b = a.format("yyyyMMdd_");
            return b += "gov_place_menu_key"
        }, getHomeMenuKey: function () {
            var a = new Date, b = a.format("yyyymmdd_");
            return b += "all_menu_key"
        }, storage: function (a, b) {
            if (null != b && void 0 != b) {
                var c = JSON.stringify(b);
                localStorage.setItem(a, c)
            }
        }, getStorage: function (a) {
            var b = localStorage.getItem(a);
            return null == b || void 0 == b || "" == b ? null : JSON.parse(b)
        }
    }, $.fn.wuxianTimeCondition = {
        dayAndNight: function (a, b) {
            var c = parseInt(DateUtil.format(DateUtil.now(), "hhmm"));
            c > 2e3 || 1e3 > c ? b() : a()
        }
    }, $.fn.shanksDom = {
        contains: function (a, b) {
            for (var c = b.parentNode; null != c;) {
                if (c == a)return !0;
                c = c.parentNode
            }
            return !1
        }
    };
    var regex4cdnUrl = /_((\d{1,7}x\d{1,7}((Q|q)\d{2})*)|((Q|q)\d{2}))\.((jpg)|(png)|(gif))/g,
        highMap = {
        "110x110": "220x220",
        "90x90": "180x180",
        "310x310": "600x600",
        "320x320": "640x640"
    }, isTraceless, isSupportWebP;
    $.fn.imageUtil = {
        getUrl: function (a, b, c) {
            if (a) {
                if (a = a.replace(regex4cdnUrl, ""),
                    a.indexOf("?") > 0 && (a = a.substring(0, a.indexOf("?"))),
                    location.host.match(/(m\.taobao\.com)|(wapa\.taobao\.com)/g) && (a = a.replace(/http:\/\/[a-z|A-Z|\.]+(\/)/g, "//img.taobaocdn.com/")),
                    a = $().urlUtil.removeSchema(a),
                    "undefined" !== window.devicePixelRatio && window.devicePixelRatio < 2)
                    return $.fn.imageUtil.supportWebp(a + "_" + b + "x" + c + "q75s150.jpg");
                var d = highMap[b + "x" + c];
                return d && (a = a + "_" + d + "q75s150.jpg"), $.fn.imageUtil.supportWebp(a)
            }
            return null
        }, supportWebp: function (a) {
            if ($().conditionUtil.isIosShoutao())return a;
            if (void 0 === isTraceless)try {
                localStorage.testTraceless = !0, isTraceless = !1
            } catch (b) {
                isTraceless = !0
            }
            if (isTraceless === !0) {
                if (void 0 === isSupportWebP) {
                    isSupportWebP = !1;
                    var c = new Image;
                    c.onload = function () {
                        isSupportWebP = c.height > 0 && c.width > 0
                    }, c.onerror = function () {
                        isSupportWebP = !1
                    }, c.src = "//gtms02.alicdn.com/tps/i2/TB17lhGFVXXXXX3XpXXaCx9JFXX-1-1.png_.webp"
                }
                (isSupportWebP === !0 || "true" === isSupportWebP) && (a += "_.webp")
            } else {
                if (void 0 === localStorage.supportWebP) {
                    localStorage.supportWebP = !1;
                    var c = new Image;
                    c.onload = function () {
                        localStorage.supportWebP = c.height > 0 && c.width > 0
                    }, c.onerror = function () {
                        localStorage.supportWebP = !1
                    }, c.src = "//gtms02.alicdn.com/tps/i2/TB17lhGFVXXXXX3XpXXaCx9JFXX-1-1.png_.webp"
                }
                (localStorage.supportWebP === !0 || "true" === localStorage.supportWebP) && (a += "_.webp")
            }
            return a
        }, getHighQUrl: function (a, b) {
            return null == b || void 0 == b ? a : window.CrossImage ? window.CrossImage.adjustImgUrl(a, b.finalW, b.finalH, {
                quality: b.quality,
                ignoreHeight: b.ignoreHeight ? b.ignoreHeight : !0,
                ignoreWidth: b.ignoreWidth ? b.ignoreWidth : !0
            }) : b ? this.getUrl(a, b.width, b.height) : a
        }
    }, $.fn.RetUtil = {
        convertMsg: function (a) {
            var b = a.split(":");
            if (null != b && 3 == b.length) {
                var c = b[2] + "", d = c.indexOf("HSF");
                return d >= 0 || c.indexOf("hsf") ? "系统繁忙,请稍后再试" : b[2]
            }
            return "系统繁忙,请稍后再试"
        }
    }, $.fn.SpmUtil = {
        getSpm: function () {
            var a = $("head>meta[name=data-spm]").attr("content"), b = $("body").attr("data-spm"), c = a + "." + b;
            return c
        }, spm: function (a) {
            return a ? a + "spm=" + $.fn.SpmUtil.getSpm() : "spm=" + $.fn.SpmUtil.getSpm()
        }
    }, $.fn.DetailUtil = {
        getDetailUrl: function () {
            var a = window.location.hostname;
            return -1 !== a.indexOf("paimai.m.taobao.com") ? "//h5.m.taobao.com/paimai/detail/detailV2.html" : -1 != a.indexOf("paimai.wapa.taobao.com") ? "//h5.wapa.taobao.com/paimai/detail/detailV2.html" : -1 != a.indexOf("paimai.waptest.taobao.com") ? "//h5.waptest.taobao.com/paimai/detail/detailV2.html" : "//" + a + "/paimai/detail/detailV2.html"
        }
    }, $.NoticeDescFormatUtil = {
        renderAndFormat: function (a, b, c) {
            if (null != a && 0 != c.size()) {
                var d = a;
                d = this.clearOriginCss(a), c.find(b).html(d), c.find(b + "table").size() > 0 && (d = this.formatTable(a, b, c))
            }
        }, clearOriginCss: function (a) {
            return a = a.replace(/div/gim, "p"), a = a.replace(/<span\s*.*?>/gim, ""), a = a.replace(/<\/span\s*.*?>/gim, ""), a = a.replace(/<font\s*.*?>/gim, ""), a = a.replace(/<\/font\s*.*?>/gim, ""), a = a.replace(/<u\s*.*?>/gim, ""), a = a.replace(/<\/u\s*.*?>/gim, ""), a = a.replace(/style+(\s)*=(\s*)["|\'].*?["|\']+/gim, "")
        }, formatTable: function (a, b, c) {
            function d(a) {
                var b = 0;
                return $(a).find("tr:nth-child(1) td").each(function () {
                    $(this).attr("colspan") ? b += $(this).attr("colspan") : b++
                }), b
            }

            c.find(descCntSelector + " table").forEach(function (a) {
                var b = $(a).attr("background");
                if (b) {
                    $(a).attr("background", b + "_620x10000.jpg");
                    var c = $(a).height() + 20;
                    $(a).css("background-size", "100% " + c + "px"), $(a).css("background-repeat", "no-repeat")
                }
                var e = d(a), f = Math.floor(100 / e);
                $(a).find("tr").forEach(function (a) {
                    var b = $(a).find("td");
                    b.forEach(function (a) {
                        var b = $(a).attr("colspan");
                        b = $().stringUtil.isNotEmpty(b) ? parseInt(b) : 1, $(a).css("width", f * b + "%")
                    })
                })
            })
        }
    }, $.fn.platformUtil = {
        isPaimaiIos: function () {
            var a = window.navigator.userAgent;
            return a && a.indexOf("paimai_ios") >= 0
        }, isPaimaiAndorid: function () {
            var a = window.navigator.userAgent;
            return a && a.indexOf("tbauction_android") >= 0
        }, ifPaimaiApp: function () {
            var a = window.navigator.userAgent;
            return a && (a.indexOf("tbauction_android") >= 0 || a.indexOf("paimai_ios") >= 0)
        }
    }, $.fn.ShareUtil = {
        share: function (a, b) {
            void 0 != a && void 0 != b && (document.addEventListener("TBNaviBar.moreItem.clicked", function (c) {
                window.setTimeout(function () {
                    0 == c.param.index && (a.text = a.title, b.shareMe && b.shareMe(a))
                }, 100)
            }, !1), b.moreNavItems && b.moreNavItems("share"))
        }
    }
}(Zepto, window), String.prototype.StartWith = function (a) {
    return null == a || "" == a || 0 == this.length || a.length > this.length ? !1 : this.substr(0, a.length) == a ? !0 : !1
};