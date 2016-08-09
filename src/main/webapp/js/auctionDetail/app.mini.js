function Adaptor(a, b) {
    var c = this;
    this.mData = a, this.getCount = function () {
        return c.mData.length
    }, this.getData = function () {
        return c.mData
    }, this.setData = function (a) {
        c.mData = a, c.notifyDataSetChanged(!0)
    }, this.addAll = function (a) {
        for (var b = 0; b < a.length; b++)c.mData.push(a[b]);
        c.notifyDataSetChanged()
    }, this.add = function (a) {
        c.mData.push(a), c.notifyDataSetChanged()
    }, this.renderView = function (a, b) {
    }, this.viewList = b;
    for (var d in this.viewList)this.viewList[d].viewType = d;
    this.getViewType = function (a) {
        return ""
    }
}
function JsListView(a, b) {
    "use strict";
    function c(a) {
        var b = u.adaptor.getViewType(a);
        if ("undefined" == typeof w[b])return void 0;
        var c = w[b].pop();
        return c && (c.style.display = ""), c
    }

    function d(a) {
        var b = a.viewType;
        a.style.display = "none", "undefined" == typeof w[b] && (w[b] = []), w[b].push(a)
    }

    function e() {
        if (B === !1)return {top: 0, firstPosition: 0};
        B = !1;
        var a = sessionStorage[A + "top"];
        if (void 0 !== a) {
            sessionStorage[A + "indexList"] && (u.indexList = JSON.parse(sessionStorage[A + "indexList"]));
            var b = sessionStorage[A + "firstPosition"];
            return delete sessionStorage[A + "top"], delete sessionStorage[A + "firstPosition"], {
                top: parseInt(a),
                firstPosition: parseInt(b)
            }
        }
        return {top: 0, firstPosition: 0}
    }

    function f(a) {
        var b = u.adaptor.viewList[a].cloneNode(!0);
        return b.viewType = a, b
    }

    function g(a, b) {
        return "undefined" == typeof a ? b : a
    }

    function h(a) {
        return a.offsetTop + a.offsetHeight
    }

    function i(a) {
        return a[a.length - 1]
    }

    function j() {
        var a = i(x), b = H;
        for (a && (b = h(a)), z++; I + J > b && z <= u.adaptor.getCount() - 1;) {
            var d;
            d = c(z), "undefined" == typeof d && (d = f(u.adaptor.getViewType(z)), t.appendChild(d)), x.push(d), d.style.position = "absolute", d.style.top = b + "px", u.adaptor.renderView(d, z), a = i(x), b = h(a), z++
        }
        z--, z > u.adaptor.getCount() - 1 && (z = u.adaptor.getCount() - 1);
        var e = b - I;
        if (0 > e)for (var g = 0; g < x.length; g++)x[g].style.top = -e + x[g].offsetTop + "px";
        return a
    }

    function k() {
        var a = x[0], b = I;
        for (a && (b = a.offsetTop), y--; b > H - J && y >= 0;) {
            var d = c(y);
            "undefined" == typeof d && (d = f(u.adaptor.getViewType(y)), t.appendChild(d)), x.unshift(d), d.style.position = "absolute", u.adaptor.renderView(d, y), d.style.top = b - d.offsetHeight + "px", a = x[0], b = a.offsetTop, y--
        }
        y++, 0 > y && (y = 0);
        var e = b - H;
        if (e > 0)for (var g = 0; g < x.length; g++)x[g].style.top = -e + x[g].offsetTop + "px";
        return a
    }

    function l(a) {
        if (0 != x.length) {
            var b, c = !1, e = !1, f = -1e-10 == a;
            if (a > 0) {
                var g = x[0];
                if (0 == y) {
                    if (g.offsetTop === H)return;
                    g.offsetTop + a > H && (c = !F, a = H - g.offsetTop)
                }
                for (var l = x.length - 1; l >= 0; l--)b = x[l], b.style.top = b.offsetTop + a + "px", b.offsetTop > I + J && (d(x.pop()), z--);
                k(), j()
            } else if (0 > a) {
                var m = i(x);
                if (z === u.adaptor.getCount() - 1) {
                    if (h(m) === I)return;
                    h(m) + a < I && (e = !G, a = I - h(m))
                }
                for (var l = 0; l < x.length; l++)b = x[l], b.style.top = b.offsetTop + a + "px", h(b) < H - J && (d(x.shift()), l--, y++);
                j(), k()
            }
            c === !0 ? (F = !0, u.topListener && u.topListener()) : e === !0 && (G = !0, u.bottomListener && u.bottomListener()), a > 0 ? (u.direction = "down", !f && u.downListener && u.downListener(a, y, z)) : -1e-10 > a && (u.direction = "up", !f && u.upListener && u.upListener(a, y, z)), u.onScroll && u.onScroll(x, y, z)
        }
    }

    function m(a) {
        var b = a.touches[0], c = parseInt(b.pageY - D), d = parseInt(b.pageX - C);
        if ("up" == u.direction && 0 > c || "down" == u.direction && c > 0 ? u.touchDistance = b.pageY - E : (E = b.pageY, u.touchDistance = 0), !(window.navigator.userAgent.match(/iphone os 7/gi) && d > 0 && Math.abs(c / d) < .5)) {
            if (M.distance = c, q(c, !1))return void(M.distance < 0 && a.preventDefault());
            $(a.target).closest(".horizontal-scroll").length && Math.abs(d) > Math.abs(c) ? c = 0 : a.preventDefault(), D = b.pageY, C = b.pageX, M._touchMove(c), l(c)
        }
    }

    function n(a) {
        if (!q(M.distance, !0)) {
            if (M.upTime < M.moveTime) {
                var b = M.upTime;
                M.upTime = M.moveTime, M.moveTime = b
            }
            if (M.velocity = M.distance / (M.upTime - M.moveTime), Math.abs(M.velocity) > M.velocityMinBase) {
                M.accelerated = M.velocity > 0 ? -M.flingAccelerated : M.flingAccelerated;
                var c = M.velocity + M.accelerated * (Date.now() - M.upTime) * M.timeFade;
                M.velocity = c * M.velocity <= 0 ? 0 : c
            }
            return M.velocity = M.velocity / M.velocityFactor, Math.abs(M.velocity) < M.velocityMinBase ? void(u.flingEndHandler && u.flingEndHandler(x, u.direction)) : void(M.distance && 0 !== M.velocity && (M.velocity > M.velocityMaxBase ? M.velocity = M.velocityMaxBase : M.velocity < -M.velocityMaxBase && (M.velocity = -M.velocityMaxBase), M.currentVelocity = M.velocity, M.startTime = M.upTime, M.startPosition = 0, M.accelerated = M.velocity > 0 ? -M.flingAccelerated : M.flingAccelerated, M.animation = K(o)))
        }
    }

    function o(a) {
        M.endTime = Date.now();
        var b = M.endTime - M.startTime;
        if (M.currentVelocity * M.velocity > 0) {
            M.currentVelocity = M.velocity + M.accelerated * b;
            var c = 1.5 * (M.velocity + M.currentVelocity) * b;
            M.distance = parseInt(c - M.startPosition), M.velocity > 0 ? M.distance = M.distance > 0 ? M.distance : 0 : M.velocity < 0 && (M.distance = M.distance < 0 ? M.distance : 0), M.startPosition = c, p(M.distance) || r(M.distance) ? s() : Math.abs(M.currentVelocity) < .2 && u.flingEndHandler ? u.flingEndHandler(x, u.direction) : (l(M.distance), M.animation = K(o))
        } else s()
    }

    function p(a) {
        if (0 === x.length)return !0;
        var b = i(x);
        return z === u.adaptor.getCount() - 1 && h(b) === I ? !0 : !1
    }

    function q(a, b) {
        return a > 0 && r(0) ? (b === !0 && F === !1 && u.topListener && u.topListener(), !0) : 0 > a & p(0) ? (b === !0 && G === !1 && u.bottomListener && u.bottomListener(), !0) : !1
    }

    function r(a) {
        if (0 === x.length)return !0;
        var b = x[0];
        return 0 == y && b.offsetTop === H ? !0 : !1
    }

    function s() {
        null != M.animation && (L(M.animation), M.animation = null)
    }

    var t = document.createElement("section");
    t.setAttribute("id", g(a.id, "list-") + Math.floor(43114 * Math.random())), t.style.position = g(a.position, "relative"), t.style.height = g(a.height, "100px"), t.style.width = g(a.width, "100px"), t.style.overflow = "hidden", b.appendChild(t);
    var u = this, v = t.offsetHeight, w = {}, x = [], y = 0, z = 0;
    this.refreshView = function (a) {
        if ("undefined" != typeof a)a >= y && z >= a && u.adaptor.renderView(x[a - y], a); else for (var b = 0; b < x.length; b++)u.adaptor.renderView(x[b], y + b)
    }, this.setAdaptor = function (a) {
        function b(b) {
            var d, g = a.getCount();
            if (b) {
                var h = b.top;
                y = b.firstPosition
            } else {
                var i = e(), h = i.top;
                y = i.firstPosition
            }
            for (var j = y; v > h && g > j;)d = c(j) || f(a.getViewType(j)), a.renderView(d, j), t.appendChild(d), d.style.position = "absolute", d.style.top = h + "px", h += d.offsetHeight, x.push(d), j++;
            z = y + x.length - 1
        }

        u.adaptor = a, a.notifyDataSetChanged = function (a) {
            (0 === x.length || a === !0) && (x = [], w = {}, t.innerHTML = "", b()), l(-1e-10)
        }, u._initListView = b, b()
    }, this.setSelection = function (a, b) {
        s();
        for (var c = 0; c < x.length; c++)x[c].style.top = I + "px", d(x[c]);
        x = [], u._initListView({top: b || 0, firstPosition: a})
    };
    var A = window.location.pathname.replace(/\//gi, "$").replace(".", "$");
    this.recoverLater = function (a) {
        try {
            sessionStorage.testSupportStorage = !1
        } catch (b) {
            return
        }
        var c = u.adaptor.getData();
        c = JSON.stringify(c), sessionStorage[A] = "true", sessionStorage[A + "data"] = c, sessionStorage[A + "top"] = void 0 === x[0] ? 0 : x[0].offsetTop, sessionStorage[A + "firstPosition"] = y, u.indexList && (sessionStorage[A + "indexList"] = JSON.stringify(u.indexList)), void 0 !== a && (sessionStorage[A + "tag"] = JSON.stringify(a))
    }, this.recoverData = function () {
        var a = JSON.parse(sessionStorage[A + "data"]);
        return delete sessionStorage[A + "data"], a
    }, this.recoverTag = function () {
        var a = JSON.parse(sessionStorage[A + "tag"]);
        return delete sessionStorage[A + "tag"], a
    };
    var B = !1;
    this.needRecover = function () {
        try {
            sessionStorage.testSupportStorage = !1
        } catch (a) {
            return !1
        }
        var b = sessionStorage[A];
        return void 0 === b ? !1 : (B = !0, delete sessionStorage[A], !0)
    }, this.setHeight = function (b) {
        a.height = b + "px", t.style.height = g(a.height, "100px"), H = 0, I = H + t.offsetHeight, u.adaptor.notifyDataSetChanged()
    }, this.getFirstPosition = function () {
        return y
    }, this.getLastPosition = function () {
        return z
    }, this.getChildSequence = function () {
        return x
    }, this.css = function (a, b) {
        return "undefined" == typeof b ? t[a] : t.style[a] = b
    }, this.move = function (a, b) {
        function c() {
            var b = h / g;
            if (!(b > 1)) {
                var f = d(b) * a, i = f - e;
                l(i), e = f, h++, K(c)
            }
        }

        var d = getCubicBezierByName("ease"), e = 0, f = 1e3 / 60, g = b / f, h = 0;
        K(c)
    };
    var C, D, E, F = !1, G = !1;
    t.addEventListener("touchstart", function (a) {
        var b = a.touches[0];
        D = b.pageY, E = D, C = b.pageX, null != M.animation && a.stopPropagation(), s(), M._touchStart(), F = !1, G = !1
    }, !0), t.addEventListener("touchmove", m, !1);
    var H = 0, I = H + t.offsetHeight, J = 0;
    this.isFull = function () {
        var a = i(x), b = h(a);
        return b >= I
    }, t.addEventListener("touchend", n, !1);
    var K = function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (a) {
                return setTimeout(a, 1e3 / 60)
            }
    }(), L = function () {
        return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.cancelRequestAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout
    }(), M = {
        velocity: 0,
        moveTime: 0,
        upTime: 6e4,
        timeFade: null !== window.navigator.userAgent.match(/iphone/gi) ? 1 : 2,
        distance: 0,
        accelerated: 0,
        startTime: 0,
        endTime: 0,
        startPosition: 0,
        animation: null,
        currentVelocity: 0,
        count: 0,
        velocityMaxBase: null !== window.navigator.userAgent.match(/iphone/gi) ? 2 : 1.8,
        velocityMinBase: (null !== window.navigator.userAgent.match(/iphone/gi), .2),
        flingAccelerated: (null !== window.navigator.userAgent.match(/iphone/gi), .001),
        velocityFactor: null !== window.navigator.userAgent.match(/iphone/gi) ? 5.5 : 2,
        _touchMove: function (a) {
            M.distance = a, 0 === M.count ? (M.moveTime = Date.now(), M.count++) : (M.upTime = Date.now(), M.count = 0)
        },
        _touchStart: function () {
            M.count = 0, M.moveTime = Date.now(), M.count++
        }
    }
}
function Flow(a, b, c, d, e, f) {
    var g;
    d.indexList instanceof Array || (d.indexList = [0]), g = d.indexList;
    var h = -1;
    d.onScroll = function (d, i, j) {
        var k = i + 1;
        if (!(k > j)) {
            if (c.getViewType(k) === e) {
                var l = d[1];
                f ? l.offsetHeight : 0;
                l.offsetTop > 0 && l.offsetTop < b.offsetHeight ? b.style.top = l.offsetTop - b.offsetHeight + "px" : b.style.top = "0px", $(b).hide()
            } else if (c.getViewType(i) === e) {
                for (-1 === g.indexOf(i) && g.push(i); g.indexOf(i) < g.length - 1;)g.pop();
                f || (b.style.top = "0px")
            } else $(b).show(), "0px" !== b.style.top && (b.style.top = "0px");
            for (; i < g[g.length - 1];)g.pop();
            for (; i >= 0;) {
                if (c.getViewType(i) === e) {
                    if (!(i > g[g.length - 1]))break;
                    g.push(i)
                }
                i--
            }
            var m = g[g.length - 1];
            m !== h && a && a(m), h = m
        }
    }
}
function cubicBezierFunction(a, b, c, d) {
    function e(a) {
        return (3 * k * a + 2 * l) * a + m
    }

    function f(a) {
        return ((k * a + l) * a + m) * a
    }

    function g(a) {
        return ((n * a + o) * a + p) * a
    }

    function h(a) {
        for (var b, c, d = a, g = 0; 8 > g; g++) {
            if (c = f(d) - a, Math.abs(c) < j)return d;
            if (b = e(d), Math.abs(b) < j)break;
            d -= c / b
        }
        var h = 1, i = 0;
        for (d = a; h > i;) {
            if (c = f(d) - a, Math.abs(c) < j)return d;
            c > 0 ? h = d : i = d, d = (h + i) / 2
        }
        return d
    }

    function i(a) {
        return g(h(a))
    }

    var j = 1e-6, k = 3 * a - 3 * c + 1, l = 3 * c - 6 * a, m = 3 * a, n = 3 * b - 3 * d + 1, o = 3 * d - 6 * b, p = 3 * b;
    return i
}
function getCubicBezierByName(a) {
    var b = {
        linear: [0, 0, 1, 1],
        ease: [.25, .1, .25, 1],
        easeIn: [.42, 0, 1, 1],
        easeOut: [0, 0, .58, 1],
        easeInOut: [.42, 0, .58, 1]
    }, c = b[a];
    return cubicBezierFunction(c[0], c[1], c[2], c[3])
}
function BaseAdaptor(a, b) {
    this.viewList = b || {}, this.viewList.defaultItemType = "LIST", this.kData = a || [], this.kShowTip = !1, this.getViewType = function (a) {
        var b = this.kData[a];
        return b.hasOwnProperty("itemType") ? b.itemType : this.viewList.defaultItemType
    }, this.renderView = function (a, b) {
        this.prepareForReuse(a, b);
        var c = $(this.viewList[this.getViewType(b)]).html();
        this.willRenderView(a, b);
        var d = ejs.render(c, {item: this.kData[b]});
        $(a).empty().append(d), a.tag = b, this.afterRenderView(a, b)
    }, this.extend = function (a) {
        return $.extend(!0, this, a)
    }, this.saveContext = function (a) {
    }, this.notifyDataSetChanged = function (a) {
    }, this.prepareForReuse = function (a, b) {
        $(a).empty()
    }, this.afterRenderView = function (a, b) {
        var c = $(a), d = this;
        d.saveContext && c.on($().conditionUtil.hasTouch(), function (b) {
            d.saveContext(a)
        }), c.find("img").forEach(function (a) {
            $(a).attr("src", $().urlUtil.removeSchema($(a).data("src")))
        })
    }, this.willRenderView = function (a, b) {
    }, this.getCount = function () {
        return this.kData ? this.kData.length : 0
    }, this.getData = function () {
        return this.kData
    }, this.getTemplates = function () {
        return this.viewList
    }, this.setData = function (a) {
        this.kData = a, this.notifyDataSetChanged(!0)
    }, this.addList = function (a) {
        this.kData = this.kData.concat(a), this.notifyDataSetChanged()
    }, this.setTip = function (a) {
        this.kShowTip = a
    }, this.getTip = function () {
        return this.kShowTip
    }
}
function AuctionTimer(a) {
    "use strict";
    function b() {
        var c = e + ((new Date).getTime() - f);
        if (c > h) {
            if (d = g - c, d > 100 && n > d) {
                var i = Math.floor(d % 1e3 / 100), j = parseInt(d / 1e3 % 60), o = parseInt(d / 1e3 / 60 % 60);
                10 > o && (o = "0" + o), 10 > j && (j = "0" + j);
                var p = o + "分" + j + "秒" + i;
                m && m(p)
            } else d > -5e3 && 100 > d && m && m("00分00秒0", "end");
            !k && l && l(), k = !0
        }
        setTimeout(function () {
            1 === TimerHelper.runningTimer[a] && b()
        }, 100)
    }

    function c(a, b) {
        b && b(TimerHelper._showTime(a))
    }

    var d, e, f, g, h, i = !1, j = a;
    j || (j = "tag_0"), TimerHelper._tagTimer(j);
    var k, l, m, n = 18e5;
    this._init = function (a, c, d, j, l) {
        e = a, f = c, g = d, h = j, k = !1, m = l, i === !1 && (i = !0, b())
    }, this._startTime = function (a, b) {
        c(a, b)
    }, this._endTime = function (a, b) {
        c(a, b)
    }, this._switchOffTimer = function () {
        d = 0
    }, this._setStart = function (a) {
        l = a
    }
}
!function ($, window) {
    function getVideoIdReg(a, b) {
        var c = new RegExp(a);
        return b.match(c)
    }

    function getEscapeReg() {
        var a = EMPTY;
        for (var b in htmlEntities) {
            var c = htmlEntities[b];
            a += c + "|"
        }
        return a = a.slice(0, -1), escapeHtmlReg = new RegExp(a, "g")
    }

    var commonStringUtil = window.Utils.String;
    $.fn.ems = function (a, b) {
        lib.mtop.request({api: "mtop.taobao.auction.ems", v: "1.0", data: {name: a}, ecode: 0}, function (a) {
            var c = a.data, d = a.ret[0];
            b(/SUCCESS/.test(d) ? c.data : !1)
        })
    }, $.fn.elementUtil = {
        getEmptyElement: function (a) {
            var b = {id: Utils.Date.now().getTime(), style: {width: "100%"}};
            a = $.extend({}, b, a);
            var c = "<" + a.type + " configData></" + a.type + ">", d = " ";
            for (var e in a)d += a[e].toString() + " ";
            return $(c.replace("configData", d))[0]
        }
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
                    if (c = c.substring(d + 2, c.length), c && c.indexOf("HSF") >= 0)return void $().toastUtil.showError("系统繁忙，请稍候重试或去电脑操作", b);
                    this.showError(c, b)
                }
            }
        }, showError: function (a, b) {
            a ? this.show(a, b) : this.show("操作失败或网络异常，请稍后再试或去电脑操作", b)
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
    }, $.fn.dialog = {
        geTemplate: function () {
            return '<div id="util_dialog_bg"><div class="dialog-wrapper"><div class="dialog-header"></div><div class="dialog-content"></div><div class="dialog-close J_DialogClose">X</div></div></div>'
        }, show: function (a) {
            if (!a)return !1;
            var b = this, c = a.header || "弹出层", d = a.content || "", e = $("#util_dialog_bg");
            0 == e.size() && (e = $(this.geTemplate()).appendTo($("body")));
            var f = e.find(".dialog-wrapper");
            f.find(".dialog-header").html(c), f.find(".dialog-content").html(d), f.show();
            var g = $(window).width() / 2 - f.width() / 2, h = $(window).height() / 2 - f.height() / 2;
            f.css({top: h, left: g}), f.show("fast"), f.find(".J_SureBtn").on("click", function (a) {
                e.hide("fast")
            }), f.find(".J_DialogClose").on("click", function (a) {
                b.hide()
            })
        }, hide: function () {
            var a = $("#util_dialog_bg");
            a.hide()
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
            var b = -1 != a.indexOf("-") ? !0 : !1;
            1 == b && (a = Utils.String.replace(a, "-", ""));
            var c = -1 != a.indexOf(".") ? !0 : !1, d = "";
            if (c) {
                var e = a.split(".");
                a = e[0], d = e[1]
            }
            for (var f = "", g = a.length; g >= 0; g -= 3) {
                if ("" != f && (f = "," + f), 3 >= g) {
                    f = a.substring(0, g) + f;
                    break
                }
                f = a.substring(g - 3, g) + f
            }
            return c && (f += "." + d), 1 == b && (f = "-" + f), f
        }, parseFloat: function (a) {
            return a ? "number" == typeof a || a instanceof Number ? a : "string" == typeof a || a instanceof String ? parseFloat(Utils.String.replaceAll(Utils.String.replaceAll(a.toString(), ",", ""), " ", "")) : void 0 : 0
        }, multiply: function (a, b) {
            var c = 0, d = a.toString(), e = b.toString();
            try {
                c += d.split(".")[1].length, c += e.split(".")[1].length
            } catch (f) {
            }
            return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c)
        }, divide: function (a, b) {
            var c = 0, d = 0;
            try {
                c = a.toString().split(".")[1].length, d = b.toString().split(".")[1].length
            } catch (e) {
            }
            var f = Number(a.toString().replace(".", "")), g = Number(b.toString().replace(".", ""));
            return f / g * Math.pow(10, d - c)
        }, formatMoney: function (a) {
            return a = parseInt(a), a >= 1e10 ? "￥" + a / 1e10 + "亿" : a >= 1e6 ? "￥" + a / 1e6 + "万" : "￥" + a / 100
        }, getMoneyWithUnit: function (a) {
            var b = [];
            return a = parseInt(a), b = a >= 1e10 ? [a / 1e10, "亿"] : a >= 1e6 ? [a / 1e6, "万"] : [a / 100]
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
    }, $.fn.dateUtilApp = {
        LIST_TIME_FORMAT: "MM月dd日 hh:mm", getTwoDigital: function (a) {
            return 10 > a ? "0" + a : a
        }, getTime: function (a) {
            return a && this.parse(a).getTime() || ""
        }, parse: function (a) {
            if (void 0 == a)return a;
            var b = a.split(/[^0-9]/), c = null;
            return 3 == b.length ? c = new Date(b[0], b[1] - 1, b[2]) : b.length >= 6 && (c = new Date(b[0], b[1] - 1, b[2], b[3], b[4], b[5])), c
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
    },
        $.fn.urlUtil = {
        parseUrlRegexp: /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/,
        parseUrlVSm: function (a) {
            return null == a || void 0 == a ? [] : this.parseUrlRegexp.exec(a)
        },
        formatPicUrl: function (a) {
            if (!a)return a;
            if (-1 != a.indexOf("daily"))a = a.replace("http://", "//").replace(/img\d{2}/, "img"); else {
                var b = "gw.alicdn.com", c = a.match(/(.+\.(?:alicdn|taobaocdn|taobao|mmcdn)\.com)(.*)/);
                c && c[1] != b && (a = "//" + b + c[2])
            }
            return a
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
            if (a.indexOf("#") > -1 && (f = g.substr(g.indexOf("#") + 1), g = g.substr(0, g.indexOf("#"))), g.indexOf("?") > -1 ? (d = g.substr(0, g.indexOf("?")), e = g.substr(g.indexOf("?") + 1)) : d = g, Utils.String.isBlank(e))e = b + "=" + c; else {
                for (var h = e.split("&"), i = !1, j = 0; j < h.length; j++)if (h[j].substr(0, (b + "=").length) == b + "=") {
                    h[j] = b + "=" + c, i = !0;
                    break
                }
                i || h.push(b + "=" + c), e = h.join("&")
            }
            return commonStringUtil.isBlank(f) ? d + "?" + e : d + "?" + e + "#" + f
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
        addSchema: function (a) {
            return a && 0 === a.indexOf("//") ? location.protocol + a : a
        },
        isRelativeUrl: function (a) {
            return a && 0 != a.indexOf("http://") && 0 != a.indexOf("https://") && 0 != a.indexOf("//")
        },
        hostRep: /(\/\/)(.*?)(\/)/,
        getHostName: function (a) {
            if (commonStringUtil.isBlank(a))return void 0;
            if (a = a.trim(), this.isRelativeUrl(a))return void 0;
            var b = this.hostRep.exec(a);
            return b && b[2]
        }
    }, $.fn.pageUtil = {
        openWindow: function (a, b, c) {
            a && (a = this.getUrl(a), c || (a = $().urlUtil.addParameter(a, "ttid", $().config.TTID)), a = $().urlUtil.addSchema(a), b = !1, b ? $().conditionUtil.isWindVane() ? window.WindVane.call("Base", "openWindow", {url: a}, null, function () {
                window.open(a)
            }) : window.open(a) : document.location.href = a)
        }, openWithSpm: function (a, b, c) {
            a && (a = this.getUrl(a), a = $().urlUtil.addParameter(a, "ttid", $().config.TTID), window.g_SPM && $(b) && $(b).size() > 0 && (a = $().urlUtil.addParameter(a, "spm", g_SPM.spm($(b)[0]))), a = $().urlUtil.addSchema(a), $().conditionUtil.isWindVane() && $.deviceUtil.isIphone() ? (c && (a = encodeURI(a)), window.WindVane.call("Base", "openWindow", {url: a}, null, function () {
                document.location.href = a
            })) : document.location.href = a)
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
        }, open: function (a, b) {
            this.openWindow(a, !1, b)
        }, back: function () {
            window.history.back()
        }, backInWindVane: function () {
            var a = this;
            return $().conditionUtil.isWindVane() ? void window.WindVane.call("WebAppInterface", "pop", {}, function () {
            }, function () {
                a.back()
            }) : void a.back()
        }, forward: function () {
            window.history.forward()
        }, refresh: function () {
            document.location.reload()
        }
    }, $.fn.pageLoader = {
        loadTemplate: function (a) {
            var b;
            b = $("undefined" != typeof a.id && null != a.id ? "#" + a.id : "<div></div>"), b.load(a.url, null, a.success), $("body").append(b)
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
                    commonStringUtil.isBlank(a) && (a = "/tbauctionh.10.0"), $().shanksLog.easyClick(a)
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
        }, goldlog: function (a, b) {
            var c = Math.floor(268435456 * Math.random()).toString(16), d = new Image, e = "_img_" + Math.random(), f = "//wgo.mmstat.com";
            return d.onload = d.onerror = function () {
                window[e] = null
            }, window[e] = d, d.src = f + a + "?cache=" + c + "&gmkey=&gokey=" + encodeURIComponent(b) + "&logtype=2"
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
                    c.attr("src", $().imageUtil.restrainDnsAndRemoveSchema("http://gtms01.alicdn.com/tps/i1/T1EoDnFkNeXXcI6BY_-280-280.png"))
                })
            }) : b.initLazy || ($.each($(c.find("img")), function (a, b) {
                var c = $(b);
                c.attr("src", c.attr("lazyLoad"))
            }), b.initLazy = !0)
        }
    }, $.fn.packageUtil = {
        defined: function (a) {
            if (commonStringUtil.isBlank(a))return window;
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
        events: {scrollStart: !0, scrollEnd: !0, scrollDown: !0, scrollUp: !0}, handlers: {}, on: function (a, b) {
            return this.events[a] ? (this.handlers[a] = b, this) : void console.error("scrollUtil on error,event is wrong,name=" + a)
        }, listener: function () {
            function a(a) {
                c = a.touches[0].pageX,
                    d = a.touches[0].pageY, f.handlers.scrollStart && f.handlers.scrollStart(a)
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
        }, getDeviceWidth: function () {
            var a = null;
            return null != window.screen && (a = window.screen.availWidth), null != window.innerWidth && (a = window.innerWidth), this.isAndroid() && null != document.body && (a = document.body.clientWidth), a
        }
    }, $.fn.videoUtil = {
        getPicUrl: function (a) {
            return $().urlUtil.removeSchema("http://snapshot.video.taobao.com/snapshots/video/" + a + "?time=0")
        }, getVideoId: function (a) {
            var b = getVideoIdReg(/[0-9]+.swf/gim, a);
            if (null != b && b.length > 0) {
                var c = b[0], d = getVideoIdReg(/[0-9]+/gim, c);
                return d
            }
            return null
        }, getM3u8URL: function (a) {
            var b = commonStringUtil.replaceAll(a, /.swf/gim, ".m3u8");
            return b
        }, getMp4Url: function (a) {
            var b = $().stringUtil.replaceAll(a, /.swf/gim, ".mp4");
            return b
        }, TYPE_IPhone: 3, TYPE_IPAD: 2, TYPE_Android: 5, TYPE_OTHER: -1, setEdeviceType: function (a, b) {
            var c = commonStringUtil.replaceAll(a, /e\/[0-9]{1}/gim, "e/" + b);
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
    var regex4cdnUrl = /_((\d{1,7}x\d{1,7}((Q|q)\d{2})*)|((Q|q)\d{2}))\.((jpg)|(png)|(gif))/g, highMap = {
        "110x110": "220x220",
        "90x90": "180x180",
        "310x310": "600x600",
        "320x320": "640x640"
    }, isTraceless, isSupportWebP, restrainDnsRep = /img.taobaocdn.com|gtms0[1-4].alicdn.com|img[1-4].tbcdn.cn|img0[1-8].taobaocdn.com|gw.alicdn.com|gw[1-3].alicdn.com/, restrainTo = "gw.alicdn.com";
    $.fn.imageUtil = {
        restrainDnsAndRemoveSchema: function (a) {
            var b = $().urlUtil.getHostName(a);
            return b && restrainDnsRep.test(b.trim()) && (a = a.replace($().urlUtil.hostRep, "$1" + restrainTo + "$3")), a = $().urlUtil.removeSchema(a)
        }, getUrl: function (a, b, c) {
            if (a) {
                if (a = a.replace(regex4cdnUrl, ""), a.indexOf("?") > 0 && (a = a.substring(0, a.indexOf("?"))), a = this.restrainDnsAndRemoveSchema(a), "undefined" !== window.devicePixelRatio && window.devicePixelRatio < 2)return $.fn.imageUtil.supportWebp(a + "_" + b + "x" + c + "q75s150.jpg");
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
                    }, c.src = this.restrainDnsAndRemoveSchema("http://gtms02.alicdn.com/tps/i2/TB17lhGFVXXXXX3XpXXaCx9JFXX-1-1.png_.webp")
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
                    }, c.src = this.restrainDnsAndRemoveSchema("http://gtms02.alicdn.com/tps/i2/TB17lhGFVXXXXX3XpXXaCx9JFXX-1-1.png_.webp")
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
    }, $.fn.MtopResMsgUtil = {
        showErrorMsg: function (a) {
            return a && "object" == typeof a && (a = a.toString()), a && !a.startWith("SUCCESS") ? ($().toastUtil.show(this.convertMsg(a)), !0) : !1
        }, convertMsg: function (a) {
            var b = a.split(":");
            if (null != b && 3 == b.length) {
                var c = b[2] + "", d = c.indexOf("HSF");
                return d >= 0 || c.indexOf("hsf") ? "系统繁忙,请稍后再试" : b[2]
            }
            return "系统繁忙,请稍后再试"
        }
    }, $.fn.SpmUtil = {
        getSpm: function () {
            var a = $("head>meta[name=data-spm]").attr("content"), b = $("body").attr("data-spm");
            if (void 0 != a && void 0 != b)var c = a + "." + b; else var c = $("head>meta[name=spm-id]").attr("content");
            return c
        }, spm: function (a) {
            return a ? a + "spm=" + $.fn.SpmUtil.getSpm() : "spm=" + $.fn.SpmUtil.getSpm()
        }
    }, $.fn.DetailUtil = {
        getDetailUrl: function () {
            var a = window.location.hostname;
            return -1 !== a.indexOf("paimai.m.taobao.com") ? $().urlUtil.removeSchema("http://h5.m.taobao.com/paimai/detail/detailV2.html") : -1 != a.indexOf("paimai.wapa.taobao.com") ? $().urlUtil.removeSchema("http://h5.wapa.taobao.com/paimai/detail/detailV2.html") : -1 != a.indexOf("paimai.waptest.taobao.com") ? $().urlUtil.removeSchema("http://h5.waptest.taobao.com/paimai/detail/detailV2.html") : $().urlUtil.removeSchema("http://" + a + "/paimai/detail/detailV2.html")
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
                        b = commonStringUtil.isNotBlank(b) ? parseInt(b) : 1, $(a).css("width", f * b + "%")
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
            return this.isPaimaiIos() || this.isPaimaiAndorid()
        }
    }, $.fn.ShareUtil = {
        share: function (a, b) {
            void 0 != a && void 0 != b && (document.addEventListener("TBNaviBar.moreItem.clicked", function (c) {
                window.setTimeout(function () {
                    0 == c.param.index && (a.text = a.title, b.shareMe && b.shareMe(a))
                }, 100)
            }, !1), b.moreNavItems && b.moreNavItems("share"))
        }
    },
        $.fn.datingUtil = {
        init: function (a) {
            var b = $().conditionUtil.hasTouch();
            $("body").append(this.generateHtml()), $("body").append(this.generateBackgroundAll()), $("body").on(b, "#" + a, function () {
                var b = window.navigator.userAgent, c = $("#" + a).data("huichangId"), d = $("#" + a).data("albumId");
                null == c && (c = ""), null == d && (d = "");
                var e = "auction://paimai/onlive?hallId=" + c + "&albumId=" + d, f = "auction://paimai?webpage=" + encodeURIComponent(e);
                $().config.BASE_DOMAIN + "v2/app/jump2app.html?appUrl=" + encodeURIComponent(f);
                if (b && (b.indexOf("paimai_ios") >= 0 || b.indexOf("tbauction_android") >= 0)) {
                    var g = $("#iOSSwitch"), h = $("#androidSwitch"), i = g.data("switch"), j = h.data("switch"), k = g.data("jurl"), l = h.data("jurl");
                    b.indexOf("paimai_ios") >= 0 && null != g && null != i && "off" == i && null != k ? document.location.href = k : b.indexOf("tbauction_android") >= 0 && null != h && null != j && "off" == j && null != l ? document.location.href = l : document.location.href = e
                } else {
                    var m = "http://" + location.hostname + "/paimai/onlive.html?albumId=" + d;
                    document.location.href = m
                }
            }), $("#target_close").on(b, function () {
                $("#dating_background_overlay").hide(), $("#JumpingPopupDating").hide()
            })
        }, generateHtml: function () {
            var a = '<section id="JumpingPopupDating" class="JumpingPopupDatingClass" style=" display: none; "> ';
            return a += '<section id="jumpingicon"> <img class="jumpingiconImg" src="', a += $().imageUtil.restrainDnsAndRemoveSchema("http://gtms03.alicdn.com/tps/i3/TB1Sh_rHpXXXXcAXVXX289R_VXX-240-240.png"), a += '"><section id="target_close"> <img class="closeImageTBP" src="', a += $().imageUtil.restrainDnsAndRemoveSchema("http://gtms01.alicdn.com/tps/i1/TB1OPvGHpXXXXaUXVXXfdWQ4pXX-116-108.png"), a += '"/></section></section>', a += '<section id="titleClasssJumping"> <section class="titleJumpering">使用本功能需安装</section> <section class="jumpingOtherTitle">闲鱼拍卖官方APP</section> </section>', a += '<section id="detailClasssJumping"> <ul class="detailClasssJumpingClass"><li class="lijumping">身临其境拍卖现场</li><li class="lijumping">创新玩法实时互动</li><li class="lijumping">足不出户拍遍全球</li><li class="lijumping">手机出价快人一步</li></ul> </section>', a += ' <section id="buttonJumpingAction"> <section id="buttonJumpingActionReal" class="buttonJumpingActionClass">立即进入</section> </section>', a += "</section>"
        }, generateBackgroundAll: function () {
            return '<div id="dating_background_overlay" class="md-overlaydating" style="display: none;"></div>'
        }
    }, $.fn.itemType = {
        TYPE_PMP: 1,
        TYPE_TBP: 99,
        TYPE_JUDICIAL: 2,
        TYPE_ASSETS: 5
    }, $.fn.shareUtil = {
        addShare: function (a) {
            if (window.WindVane && window.WindVane.isAvailable) {
                document.addEventListener("TBNaviBar.moreItem.clicked", function (b) {
                    window.setTimeout(function () {
                        document.addEventListener("wvShareClickEvent", function (a) {
                        });
                        var b = {title: a.title, text: a.text, image: a.image, url: a.url};
                        window.WindVane.call("TBSharedModule", "showSharedMenu", b, function (a) {
                        }, function (a) {
                        })
                    }, 100)
                }, !1);
                var b = {items: [{icon: "share", fromNative: "true", iconFont: "true", text: "分享"}]};
                window.WindVane.call("WebAppInterface", "setNaviBarMoreItem", b, function (a) {
                }, function (a) {
                })
            }
        }
    };
    var EMPTY = "", htmlEntities = {
        "&amp;": "&",
        "&gt;": ">",
        "&lt;": "<",
        "&#x60;": "`",
        "&#x2F;": "/",
        "&quot;": '"',
        "&#x27;": "'"
    }, reverseEntities = {}, escapeHtmlReg, possibleEscapeHtmlReg = /[&<>"'`]/;
    !function () {
        for (var a in htmlEntities)reverseEntities[htmlEntities[a]] = a
    }(), escapeHtmlReg = getEscapeReg(), $.fn.escapeHtml = function (a) {
        return a || 0 === a ? (a = "" + a, possibleEscapeHtmlReg.test(a) ? (a + "").replace(escapeHtmlReg, function (a) {
            return reverseEntities[a]
        }) : a) : ""
    }, $.fn.isPM = function (a) {
        return /(paimai|sf|zc\-paimai)\.taobao\.(com|net)$/.test(a)
    }
}(Zepto, window), String.prototype.StartWith = function (a) {
    return null == a || "" == a || 0 == this.length || a.length > this.length ? !1 : this.substr(0, a.length) == a ? !0 : !1
}, function (a) {
    a.ListViewHelper = {
        _tailTemplate: function () {
            var a = $("<div></div>");
            return a.css("width", "100%"), a.css("height", "40px"), a.css("text-align", "center"), a.css("line-height", "42px"), a.css("font-size", "15px"), a.css("padding-bottom", "8px"), a.css("color", "#8d8d8d"), a.html("没有更多"), a[0]
        }, _tailTemplateNoTop: function () {
            var a = exports._tailTemplate();
            return $(a).css("line-height", ""), a
        }
    }
}(window), function (a, b) {
    function c(a) {
        this.className = "common.page.Bundle", this.length = 0, "object" == typeof a ? (this.id = a.id, this.map = a.map ? a.map : {}) : "string" == typeof a ? (this.id = a, this.map = {}) : console.log("Bundle construction must be arguments"), this.id && this.map || console.log("Bundle construction error,id and map must be not null")
    }

    function d() {
        this.id = location.origin + location.pathname, this.controllers = {}
    }

    c.prototype.put = function (a, b) {
        this.map[a] = b, this.length++
    }, c.prototype.get = function (a) {
        return this.map[a]
    }, c.prototype.del = function (a) {
        this.map[a] = null, this.length--
    }, c.prototype.toSerialize = function () {
        try {
            this.length > 0 && (localStorage[this.id] = JSON.stringify(this))
        } catch (a) {
            console.log(a.stack)
        }
    };
    var e = {};
    e.getBundle = function (a) {
        var b = e.createBundleFromCache(a);
        return b || (b = new c(a)), b
    }, e.createBundleFromCache = function (a) {
        try {
            var b = localStorage[a];
            if (!b && b.length <= 0)return null;
            var d = JSON.parse(b);
            return d && "common.page.Bundle" == d.className ? new c(d) : (console.log("json parse result is not Bundle Json"), null)
        } catch (e) {
            return console.log(e.stack), null
        }
    }, d.prototype.setId = function (a) {
        a && (this.id = a)
    }, d.prototype.getId = function () {
        return this.id
    }, d.prototype.onCreate = function (b) {
        if (b) {
            var c = e.getBundle(this.id);
            a().ready(function () {
                b(c)
            })
        }
    }, d.prototype.onCreated = function (a) {
        a && a instanceof c && a.toSerialize()
    }, d.prototype.controller = function (b, c, d) {
        var e = b, f = c, g = d;
        if (2 != arguments.length && 3 != arguments.length)return void console.error("Page.controller() arguments.length is wrong, length=" + arguments.length);
        2 == arguments.length && (g = f, f = e);
        var h = {};
        if ("object" == typeof g)a.extend(h, g); else if ("function" == typeof g)try {
            g(h)
        } catch (i) {
            console.error("controller call service error,_module=" + g + ",errorStack=" + i.stack)
        }
        var j = f;
        this.controllers[j] || (this.controllers[j] = a(f).html());
        try {
            a(e).html(ejs.render(this.controllers[j], h)), a(e).visible()
        } catch (i) {
            a(e).hide(), console.error("controller ejs render error,tpl=" + this.controllers[j] + ",errorStack=" + i.stack)
        }
        return {
            call: function (a) {
                if (a)try {
                    a(h)
                } catch (b) {
                    console.error("controller call error,container=" + e + ",tpl=" + f + ",errorStack=" + b.stack)
                }
            }
        }
    }, d.prototype.renderHtml = function (b, c) {
        return ejs.render(a(b).html(), c)
    }, d.prototype.renderToTplAndShow = function (b, c) {
        var d = a(b), e = ejs.render(d.html(), c);
        d.html(e).css("visibility", "visible")
    }, a.page = new d
}(Zepto, window);
var TimerHelper = {
    runningTimer: {}, _tagTimer: function (a) {
        TimerHelper.runningTimer[a] = 1
    }, _stopTimerByTag: function (a) {
        delete TimerHelper.runningTimer[a]
    }, _showTime: function (a) {
        var b = new Date(a), c = b.getMonth() + 1 + "月" + b.getDate() + "日&nbsp;" + TimerHelper._format(b.getHours()) + ":" + TimerHelper._format(b.getMinutes());
        return c
    }, _format: function (a) {
        return 10 > a && (a = "0" + a), a
    }, _stopTimer: function () {
        TimerHelper.runningTimer = {}
    }
};
!function (a, b) {
    function c(b) {
        return a.page.renderHtml(o.imgDivTpl, d(b))
    }

    function d(a) {
        if (void 0 != a && null != a) {
            var b = a.lineNum, c = a.imgList, d = [];
            return f(c, b, d), a.imgList = c.map(function (a, b) {
                var e = g(a);
                return e = h(c, e, b, d)
            }), a.height = m(d), a
        }
    }

    function e(b) {
        a.extend(o, b), o.widthPercentage = o.deviceWidth / o.standardWidth, o.realSpace = Math.ceil(o.space * o.widthPercentage), o.realSpace = o.realSpace < 1 ? 1 : o.realSpace
    }

    function f(a, b, c) {
        for (var d = 0; b > d; d++)c.push([i(a, b, d), 0])
    }

    function g(a) {
        return void 0 == a ? a : (a.realWidth = j(a), a.realHeight = k(a), a.space = o.realSpace, a)
    }

    function h(a, b, c, d) {
        var e = 0, f = b.realHeight + o.realSpace;
        if (0 != c && c == a.length - 1 && l(d))return b.left = a[c - 1].left + j(a[c - 1]) + o.realSpace, b.top = a[c - 1].top, b;
        for (var g = 1; g < d.length; g++)d[g][1] < d[e][1] && (e = g);
        return b.left = d[e][0], b.top = d[e][1], d[e][1] = d[e][1] + f, b
    }

    function i(a, b, c) {
        if (null != a && void 0 != a) {
            var d = a.length;
            if (0 >= c || b > d)return 0;
            if (b == d)return c * (j(a[0]) + o.realSpace);
            for (var e = 0, f = 0; c > f; f++)e += j(a[f]) + o.realSpace;
            return e
        }
    }

    function j(a) {
        return Math.ceil(a.width * o.widthPercentage)
    }

    function k(a) {
        return Math.ceil(a.height * o.widthPercentage)
    }

    function l(a) {
        for (var b = a[0][1], c = 1; c < a.length; c++)if (Math.abs(b - a[c][1]) > o.realSpace)return !1;
        return !0
    }

    function m(a) {
        for (var b = a[0][1], c = 1; c < a.length; c++)b < a[c][1] && (b = a[c][1]);
        return b
    }

    var n = {}, o = {
        standardWidth: 1280,
        space: 8,
        deviceWidth: a.deviceUtil.getDeviceWidth(),
        imgDivTpl: "#tmsBlockTpl"
    };
    n.init = function (b, d, f) {
        if (b = "string" == typeof b ? a(b) : b, void 0 != b && void 0 != d && 0 != d.length) {
            e(f);
            try {
                for (var g = {}, h = 0; h < d.length; h++)g = d[h], b.append(c(g));
                b.find("img").each(function (b) {
                    a(b).attr("src", a().urlUtil.removeSchema(a(this).data("src")))
                })
            } catch (i) {
                console.log(i)
            }
        }
    }, n.getWFObjForListView = function (a, b) {
        if (void 0 != a && 0 != a.length) {
            e(b);
            for (var c = [], f = 0; f < a.length; f++) {
                var g = d(a[f]);
                c.push({itemType: "TMS", imgList: g.imgList, height: g.height})
            }
            return c
        }
    }, b.WaterFall = n
}(Zepto, window), function (a) {
    function b(a) {
        if (void 0 != a && null != a) {
            for (var b = [], d = 0; d < a.length; d++)b.push(c.option.navItemMap[a[d]]);
            window.WindVane && window.WindVane.call("WebAppInterface", "setNaviBarMoreItem", {items: b}, function (a) {
            }, function (a) {
            })
        }
    }

    var c = {};
    c.option = {
        location: {enableHighAcuracy: !0, address: !0},
        navItemMap: {
            share: {icon: "share", fromNative: "true", iconFont: "true", text: "分享"},
            toHome: {icon: "screen", fromNative: "true", iconFont: "true", text: "添加到主屏幕"}
        }
    }, c.getLocalCity = function (a) {
        window.navigator.geolocation.getCurrentPosition(function (b) {
            b.address && a(b.address.city.slice(0, 2))
        }, function (b) {
            2 == b.code, a(null)
        }, c.option.location)
    }, c.moreNavItems = function (a) {
        if (void 0 != a && null != a) {
            var c = [];
            "string" == typeof a ? c.push(a) : "object" == typeof a && a instanceof Array && (c = a), b(c)
        }
    }, c.toHome = function (a) {
        if (1 == $().conditionUtil.isWindVane()) {
            if ($.deviceUtil.isIphone()) {
                var b = a.url.replace("http", "taobao");
                a.guideUrl = $().config.BASE_DOMAIN + "v2/shortcut/shortcut.html?url=" + encodeURI(b) + "&title=" + decodeURI(a.title) + "&iconUrl=" + encodeURI(a.icon), a.guideUrl = encodeURI(a.guideUrl)
            }
            a.buttonText = "添加主屏幕", 0 == $.deviceUtil.isMeiZu() && window.WindVane.call("WebAppInterface", "setShortcutToDesktop", a, function (a) {
            }, function (a) {
            })
        }
    }, c.getWindvaneVersion = function (a) {
        window.WindVane && window.WindVane.api && window.WindVane.api.base.isWindVaneSDK(function (b) {
            a(b)
        }, function (b) {
            a()
        })
    }, c.shareMe = function (a) {
        null != a && void 0 != a && (void 0 == a.url || null == a.url ? a.url = location.href : !0, void 0 == a.text || null == a.text ? a.text = $("title").html() : !0, void 0 == a.title || null == a.title ? a.title = $("title").html() : !0, window.WindVane && window.WindVane.call("TBSharedModule", "showSharedMenu", a, function (a) {
        }, function (a) {
        }), document.addEventListener("wvBackClickEvent", function (a) {
        }))
    }, a.WindVaneHelper = c
}(window), function (a, b) {
    var c = "marketingmobile/pmweb";
    b.initConfig = function (a, b) {
        d(b), e(a, b), f(b)
    };
    var d = function (a) {
        var c = "";
        a && a.debug ? c = "dev" : -1 != b.location.host.indexOf("waptest.taobao.com") ? c = "daily" : -1 != b.location.host.indexOf("wapa.taobao.com") ? c = "pre" : -1 != b.location.host.indexOf("m.taobao.com") && (c = "release"), b.env = c
    }, e = function (a, d) {
        var e = function (a, b) {
            return {page: a, assets: b}
        }, f = {
            dev: e("//local.waptest.taobao.com/paimai/v2/html/", "//local.wapa.taobao.com/dev/"),
            daily: e("//h5.waptest.taobao.com/paimai/v2/", "//g-assets.daily.taobao.net/" + c + "/"),
            pre: e("//h5.wapa.taobao.com/paimai/v2/", "//g-assets.daily.taobao.net/" + c + "/"),
            release: e("//h5.m.taobao.com/paimai/v2/", "//g.alicdn.com/" + c + "/")
        }, g = function () {
            var a = f[b.env];
            return a ? a.page : b.location.host
        }, h = function () {
            var c = f[b.env];
            return c ? c.assets + a + "/" : b.location.host
        };
        b.pageDomain = d && d.debug && d.pageDomain ? d.pageDomain : g(), b.assetsDomain = d && d.debug && d.assetsDomain ? d.assetsDomain : h()
    }, f = function (a) {
        var c = {base: b.assetsDomain};
        a && a.debug && (c.comboExcludes = /.*/), seajs && seajs.config(c)
    };
    a.fn.config = {GROUP: "RELEASE", TTID: "1219@paimai_h5_1.0", MPP_APP_ID: "1009", DEBUG: !0};
    try {
        -1 != b.location.host.indexOf("local") || -1 != b.location.host.indexOf("127.0.0.1") ? a().config.GROUP = "DEV" : -1 != b.location.host.indexOf("waptest.taobao.com") ? a().config.GROUP = "DAILY" : -1 != b.location.host.indexOf("wapa.taobao.com") && (a().config.GROUP = "PRE")
    } catch (g) {
        console.log(g.stack)
    }
    a().config.configEntity = function (b, c, d, e) {
        return 3 === arguments.length && (e = d, d = c, c = b), "DEV" == a().config.GROUP ? b : "DAILY" == a().config.GROUP ? c : "PRE" == a().config.GROUP ? d : e
    }, a().config.TAOBAO_HOST = a().config.configEntity("waptest.taobao.com", "wapa.taobao.com", "m.taobao.com"), a().config.ALIPAY_HOST = a().config.configEntity("wap.stable.alipay.net", "m.alipay.com", "m.alipay.com"), a().config.LOGIN_URL = function (b) {
        return "//login." + a().config.TAOBAO_HOST + "/login.htm?tpl_redirect_url=" + b + "&ttid=" + a().config.TTID
    }, a().config.MTOP_APP_KEY = a().config.configEntity("4272", "21696909", "21696909"), a().config.BASE_DOMAIN = a().config.configEntity("//h5.waptest.taobao.com/paimai/", "//h5.wapa.taobao.com/paimai/", "//h5.m.taobao.com/paimai/"), a().config.ASSETS_VERSION = a().config.configEntity(b.ASSETS_VERSION_DAILY ? b.ASSETS_VERSION_DAILY : "2.1.3", b.ASSETS_VERSION_RELEASE ? b.ASSETS_VERSION_RELEASE : "2.1.3", b.ASSETS_VERSION_RELEASE ? b.ASSETS_VERSION_RELEASE : "2.1.3"), a().config.ASSETS_BASE = a().config.configEntity("//local.waptest.taobao.com/paimai/assets/", "//g-assets.daily.taobao.net/tb/paimai/" + a().config.ASSETS_VERSION + "/assets/", "//g.alicdn.com/tb/paimai/" + a().config.ASSETS_VERSION + "/assets/", "//g.alicdn.com/tb/paimai/" + a().config.ASSETS_VERSION + "/assets/"), "undefined" != typeof ejs && (ejs.open = "{{", ejs.close = "}}"), function () {
        "undefined" != typeof b.lib && "undefined" != typeof b.lib.config && (b.lib.config.defaultAppKey = a().config.MTOP_APP_KEY)
    }(), a.fn.configAplus = {
        BACK_CODE_MAPING: {
            "/paimai/treasure/treasureMain.html": "/tbauctionh.7.1",
            "/paimai/treasure/treasureSession.html": "/tbauctionh.8.1",
            "/paimai/auction/auctions.html": "/tbauctionh.3.1",
            "/paimai/detail.html": "/tbauctionh.9.1",
            "/paimai/treasure/auctionAgreement_property.html": "/tbauctionh.6.1",
            "/paimai/treasure/buyerIdentity.html": "/tbauctionh.6.6",
            "/paimai/treasure/identityConfirm.html": "/tbauctionh.6.8"
        }, getBackCode: function (a) {
            return this.BACK_CODE_MAPING[a]
        }
    };
    var h = ["/paimai/v2/home/index.html", "/paimai/v2/special/special.html", "/paimai/detail/detailV2.html"];
    !function () {
        var a, c = location.pathname;
        h.indexOf(c) < 0 && b.navigator.userAgent.match(/WindVane/i) && document.addEventListener("TBNaviBar.moreItem.clicked", function (d) {
            b.setTimeout(function () {
                a = "/paimai/v2/pmp/pmplist.html" == c ? "//gw.alicdn.com/tps/i3/TB1wTCFGFXXXXcUXXXXmqjTHFXX-57-57.png" : "//gw.alicdn.com/tps/i2/TB1yfaFGFXXXXcXXXXXmqjTHFXX-57-57.png";
                var d = {image: a, url: location.href, title: document.title, text: "闲鱼拍卖"};
                b.WindVane && b.WindVane.api && b.WindVane.api.base.showShareMenu(function (a) {
                }, function (a) {
                }, d), document.addEventListener("wvBackClickEvent", function (a) {
                })
            }, 100)
        }, !1)
    }()
}(Zepto, window), function (a, b) {
    function c(b) {
        var c = a("body");
        c.append('<section id="menu"></section>'), 1 != b && c.append('<section id="my-menu" style="opacity: 0"></section>'), 2 != b && c.append('<section id="alarm-menu"  style="opacity: 0"></section>'), 3 != b && c.append('<section id="index-menu" style="opacity: 0"></section>')
    }

    function d() {
        return a().platformUtil.ifPaimaiApp()
    }

    var e = {};
    e.initMenu = function (b, e) {
        var f = 0;
        if (!d()) {
            f = null == e ? 0 : e, c(f);
            var g = a("#menu"), h = a("#my-menu"), i = a("#alarm-menu"), j = a("#index-menu");
            if (/iphone|ipod|ipad/i.test(window.navigator.userAgent)) {
                var k = window.innerWidth, l = k - 12 - 44, m = (window.innerHeight, function (a) {
                    a.css("right", "auto"), a.css("left", l);
                    var b = a.css("-webkit-transition");
                    b && (b = b.replace("right", "left"), a.css("-webkit-transition", b))
                });
                m(g), m(h), m(i), m(j)
            }
            var n = null, o = null, p = null;
            null == f || 0 == f ? (n = h, o = i, p = j) : 1 == f ? (n = i, o = j) : 2 == f ? (n = h, o = j) : 3 == f ? (n = h, o = i) : (n = h, o = i, p = j), a(document).on(a.fn.conditionUtil.hasTouch(), "#menu", function (a) {
                if (/iphone|ipod|ipad/i.test(window.navigator.userAgent)) {
                    var b = window.innerWidth - 12 - 44;
                    n.css("left") === b + "px" ? (n.css("left", b - 56).css("opacity", "1"), o.css("left", b - 112).css("opacity", "1"), 0 == f && p.css("left", b - 168).css("opacity", "1")) : (n.css("left", b), o.css("left", b), 0 == f && p.css("left", b), setTimeout(function () {
                        n.css("opacity", "0"), o.css("opacity", "0"), 0 == f && p.css("opacity", "0")
                    }, 200))
                } else"12px" === n.css("right") ? (n.css("right", "68px").css("opacity", "1"), o.css("right", "124px").css("opacity", "1"), 0 == f && p.css("right", "180px").css("opacity", "1")) : (n.css("right", "12px"), o.css("right", "12px"), 0 == f && p.css("right", "12px"), setTimeout(function () {
                    n.css("opacity", "0"), o.css("opacity", "0"), 0 == f && p.css("opacity", "0")
                }, 200))
            }), a(document).on(a.fn.conditionUtil.hasTouch(), "#my-menu", function (c) {
                null != b && b(), a.fn.pageUtil.openWithSpm(window.pageDomain + "auction/auctionHome.html", "#my-menu")
            }), a(document).on(a.fn.conditionUtil.hasTouch(), "#alarm-menu", function (c) {
                null != b && b(), a.fn.pageUtil.openWithSpm(window.pageDomain + "alarm/alarmList.html", "#alarm-menu")
            }), a(document).on(a.fn.conditionUtil.hasTouch(), "#index-menu", function (c) {
                null != b && b(), a.fn.pageUtil.openWithSpm(window.pageDomain + "home/index.html", "#index-menu")
            })
        }
    }, b.GlobalMenu = e
}(Zepto, window), function (a, b) {
    var c = function () {
        a(document).on(a().conditionUtil.hasTouch(), ".clickAndJump", function (b) {
            var c = a(b.currentTarget), d = c.data("goldlog");
            d && a.fn.shanksLog.easyClick(d);
            var e = c.data("link");
            e && (a().urlUtil.isRelativeUrl(e) && (e = a().config.BASE_DOMAIN + e), e = a().urlUtil.addParameter(e, "spm", a().SpmUtil.getSpm()), e = a().urlUtil.addSchema(e), a().pageUtil.openWindow(e))
        })
    }, d = function () {
        a(document).on(a().conditionUtil.hasTouch(), ".clickAndOpenWindow", function (b) {
            var c = a(b.currentTarget), d = c.data("goldlog");
            d && a.fn.shanksLog.easyClick(d);
            var e = c.data("link"), f = "object" == typeof g_SPM ? g_SPM.spm(b.currentTarget) : a().SpmUtil.getSpm();
            if (e) {
                a().urlUtil.isRelativeUrl(e) && (e = a().config.BASE_DOMAIN + e), e = a().urlUtil.addParameter(e, "spm", f), e = a().urlUtil.addSchema(e);
                var g = {url: e};
                a().conditionUtil.isWindVane() && /iPhone|iPad|iPod/i.test(window.navigator.userAgent) ? window.WindVane.call("Base", "openWindow", g, function (a) {
                }, function (a) {
                    location.href = g.url
                }) : location.href = g.url
            }
        })
    };
    c(), d()
}(Zepto, window), function (a, b) {
    function c() {
        var b = a().urlUtil.getParameter("itemId") || a().urlUtil.getParameter("item_id") || a().urlUtil.getParameter("id");
        if (!b)try {
            var c = JSON.parse(localStorage.paimai_itemDo);
            b = c.itemId
        } catch (d) {
        }
        return b
    }

    function d(a, b) {
        var d = "";
        for (var e in b)b.hasOwnProperty(e) && (d += e + "=" + b[e] + ";");
        return {opCode: a, keyId: c(), userOPTimeStr: new Date, keyWords: d}
    }

    function e(a, b) {
        lib.mtop.request({api: a, v: "1.0", data: b}, function (a) {
        }, function (a) {
        })
    }

    var f = {}, g = {
        sf: "mtop.taobao.GovauctionMTopCommonService.doRecordLog",
        pmp: "mtop.taobao.paimai.doRecordLog"
    }, h = {1: "pmp", 2: "sf", 3: "", 5: "sf", 7: "sf", 99: ""};
    f.record = function (b, c, f) {
        if (!b)return !1;
        if (c = h[c || a().urlUtil.getParameter("type")] || c, !c)return !1;
        var i = g[c];
        if (!i)return !1;
        try {
            return e(i, d(b, f)), !0
        } catch (j) {
            return !1
        }
    }, b.ActionLog = f
}(Zepto, window);