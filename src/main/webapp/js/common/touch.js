!function (Zepto) {
    function b(a, b, c, d) {
        return Math.abs(a - b) >= Math.abs(c - d) ? a - b > 0 ? "Left" : "Right" : c - d > 0 ? "Up" : "Down"
    }

    function c() {
        k = null, m.last && (m.el.trigger("longTap"), m = {})
    }

    function d() {
        k && clearTimeout(k), k = null
    }

    function e() {
        h && clearTimeout(h), i && clearTimeout(i), j && clearTimeout(j), k && clearTimeout(k), h = i = j = k = null, m = {}
    }

    function f(a) {
        return ("touch" == a.pointerType || a.pointerType == a.MSPOINTER_TYPE_TOUCH) && a.isPrimary
    }

    function g(a, b) {
        return a.type == "pointer" + b || a.type.toLowerCase() == "mspointer" + b
    }

    var h, i, j, k, l, m = {}, n = 750;
    Zepto(document).ready(function () {
        var o, p, q, r, s = 0, t = 0;
        "MSGesture" in window && (l = new MSGesture, l.target = document.body),
        Zepto(document).bind("MSGestureEnd", function (a) {
            var b = a.velocityX > 1 ? "Right" : a.velocityX < -1 ? "Left" : a.velocityY > 1 ? "Down" : a.velocityY < -1 ? "Up" : null;
            b && (m.el.trigger("swipe"), m.el.trigger("swipe" + b))
        }).on("touchstart MSPointerDown pointerdown", function (b) {
            (!(r = g(b, "down")) || f(b)) && (q = r ? b : b.touches[0], b.touches && 1 === b.touches.length && m.x2 && (m.x2 = void 0, m.y2 = void 0), o = Date.now(), p = o - (m.last || o), m.el = Zepto("tagName" in q.target ? q.target : q.target.parentNode), h && clearTimeout(h), m.x1 = q.pageX, m.y1 = q.pageY, p > 0 && 250 >= p && (m.isDoubleTap = !0), m.last = o, k = setTimeout(c, n), l && r && l.addPointer(b.pointerId))
        }).on("touchmove MSPointerMove pointermove", function (a) {
            (!(r = g(a, "move")) || f(a)) && (q = r ? a : a.touches[0], d(), m.x2 = q.pageX, m.y2 = q.pageY, s += Math.abs(m.x1 - m.x2), t += Math.abs(m.y1 - m.y2))
        }).on("touchend MSPointerUp pointerup", function (c) {
            (!(r = g(c, "up")) || f(c)) && (d(), m.x2 && Math.abs(m.x1 - m.x2) > 30 || m.y2 && Math.abs(m.y1 - m.y2) > 30 ? j = setTimeout(function () {
                m.el.trigger("swipe"), m.el.trigger("swipe" + b(m.x1, m.x2, m.y1, m.y2)), m = {}
            }, 0) : "last" in m && (30 > s && 30 > t ? i = setTimeout(function () {
                var b = Zepto.Event("tap");
                b.cancelTouch = e, m.el.trigger(b), m.isDoubleTap ? (m.el && m.el.trigger("doubleTap"), m = {}) : h = setTimeout(function () {
                    h = null, m.el && m.el.trigger("singleTap"), m = {}
                }, 250)
            }, 0) : m = {}), s = t = 0)
        }).on("touchcancel MSPointerCancel pointercancel", e),
        Zepto(window).on("scroll", e)
    }),
    ["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"].forEach(function (b) {
        Zepto.fn[b] = function (a) {
            return this.on(b, a)
        }
    })
}(Zepto);