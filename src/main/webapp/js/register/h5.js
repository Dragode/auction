var Zepto = function () {
    function a(a) {
        return null == a ? String(a) : U[V.call(a)] || "object"
    }

    function b(b) {
        return "function" == a(b)
    }

    function c(a) {
        return null != a && a == a.window
    }

    function d(a) {
        return null != a && a.nodeType == a.DOCUMENT_NODE
    }

    function e(b) {
        return "object" == a(b)
    }

    function f(a) {
        return e(a) && !c(a) && Object.getPrototypeOf(a) == Object.prototype
    }

    function g(a) {
        return "number" == typeof a.length
    }

    function h(a) {
        return D.call(a, function (a) {
            return null != a
        })
    }

    function i(a) {
        return a.length > 0 ? x.fn.concat.apply([], a) : a
    }

    function j(a) {
        return a.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
    }

    function k(a) {
        return a in G ? G[a] : G[a] = new RegExp("(^|\\s)" + a + "(\\s|$)")
    }

    function l(a, b) {
        return "number" != typeof b || H[j(a)] ? b : b + "px"
    }

    function m(a) {
        var b, c;
        return F[a] || (b = E.createElement(a), E.body.appendChild(b), c = getComputedStyle(b, "").getPropertyValue("display"), b.parentNode.removeChild(b), "none" == c && (c = "block"), F[a] = c), F[a]
    }

    function n(a) {
        return "children" in a ? C.call(a.children) : x.map(a.childNodes, function (a) {
                return 1 == a.nodeType ? a : void 0
            })
    }

    function o(a, b, c) {
        for (w in b)c && (f(b[w]) || Z(b[w])) ? (f(b[w]) && !f(a[w]) && (a[w] = {}), Z(b[w]) && !Z(a[w]) && (a[w] = []), o(a[w], b[w], c)) : b[w] !== v && (a[w] = b[w])
    }

    function p(a, b) {
        return null == b ? x(a) : x(a).filter(b)
    }

    function q(a, c, d, e) {
        return b(c) ? c.call(a, d, e) : c
    }

    function r(a, b, c) {
        null == c ? a.removeAttribute(b) : a.setAttribute(b, c)
    }

    function s(a, b) {
        var c = a.className || "", d = c && c.baseVal !== v;
        return b === v ? d ? c.baseVal : c : void(d ? c.baseVal = b : a.className = b)
    }

    function t(a) {
        try {
            return a ? "true" == a || ("false" == a ? !1 : "null" == a ? null : +a + "" == a ? +a : /^[\[\{]/.test(a) ? x.parseJSON(a) : a) : a
        } catch (b) {
            return a
        }
    }

    function u(a, b) {
        b(a);
        for (var c = 0, d = a.childNodes.length; d > c; c++)u(a.childNodes[c], b)
    }

    var v, w, x, y, z, A, B = [], C = B.slice, D = B.filter, E = window.document, F = {}, G = {}, H = {
        "column-count": 1,
        columns: 1,
        "font-weight": 1,
        "line-height": 1,
        opacity: 1,
        "z-index": 1,
        zoom: 1
    }, I = /^\s*<(\w+|!)[^>]*>/, J = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, K = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, L = /^(?:body|html)$/i, M = /([A-Z])/g, N = ["val", "css", "html", "text", "data", "width", "height", "offset"], O = ["after", "prepend", "before", "append"], P = E.createElement("table"), Q = E.createElement("tr"), R = {
        tr: E.createElement("tbody"),
        tbody: P,
        thead: P,
        tfoot: P,
        td: Q,
        th: Q,
        "*": E.createElement("div")
    }, S = /complete|loaded|interactive/, T = /^[\w-]*$/, U = {}, V = U.toString, W = {}, X = E.createElement("div"), Y = {
        tabindex: "tabIndex",
        readonly: "readOnly",
        "for": "htmlFor",
        "class": "className",
        maxlength: "maxLength",
        cellspacing: "cellSpacing",
        cellpadding: "cellPadding",
        rowspan: "rowSpan",
        colspan: "colSpan",
        usemap: "useMap",
        frameborder: "frameBorder",
        contenteditable: "contentEditable"
    }, Z = Array.isArray || function (a) {
            return a instanceof Array
        };
    return W.matches = function (a, b) {
        if (!b || !a || 1 !== a.nodeType)return !1;
        var c = a.webkitMatchesSelector || a.mozMatchesSelector || a.oMatchesSelector || a.matchesSelector;
        if (c)return c.call(a, b);
        var d, e = a.parentNode, f = !e;
        return f && (e = X).appendChild(a), d = ~W.qsa(e, b).indexOf(a), f && X.removeChild(a), d
    }, z = function (a) {
        return a.replace(/-+(.)?/g, function (a, b) {
            return b ? b.toUpperCase() : ""
        })
    }, A = function (a) {
        return D.call(a, function (b, c) {
            return a.indexOf(b) == c
        })
    }, W.fragment = function (a, b, c) {
        var d, e, g;
        return J.test(a) && (d = x(E.createElement(RegExp.$1))), d || (a.replace && (a = a.replace(K, "<$1></$2>")), b === v && (b = I.test(a) && RegExp.$1), b in R || (b = "*"), g = R[b], g.innerHTML = "" + a, d = x.each(C.call(g.childNodes), function () {
            g.removeChild(this)
        })), f(c) && (e = x(d), x.each(c, function (a, b) {
            N.indexOf(a) > -1 ? e[a](b) : e.attr(a, b)
        })), d
    }, W.Z = function (a, b) {
        return a = a || [], a.__proto__ = x.fn, a.selector = b || "", a
    }, W.isZ = function (a) {
        return a instanceof W.Z
    }, W.init = function (a, c) {
        var d;
        if (!a)return W.Z();
        if ("string" == typeof a)if (a = a.trim(), "<" == a[0] && I.test(a)) d = W.fragment(a, RegExp.$1, c), a = null; else {
            if (c !== v)return x(c).find(a);
            d = W.qsa(E, a)
        } else {
            if (b(a))return x(E).ready(a);
            if (W.isZ(a))return a;
            if (Z(a)) d = h(a); else if (e(a)) d = [a], a = null; else if (I.test(a)) d = W.fragment(a.trim(), RegExp.$1, c), a = null; else {
                if (c !== v)return x(c).find(a);
                d = W.qsa(E, a)
            }
        }
        return W.Z(d, a)
    }, x = function (a, b) {
        return W.init(a, b)
    }, x.extend = function (a) {
        var b, c = C.call(arguments, 1);
        return "boolean" == typeof a && (b = a, a = c.shift()), c.forEach(function (c) {
            o(a, c, b)
        }), a
    }, W.qsa = function (a, b) {
        var c, e = "#" == b[0], f = !e && "." == b[0], g = e || f ? b.slice(1) : b, h = T.test(g);
        return d(a) && h && e ? (c = a.getElementById(g)) ? [c] : [] : 1 !== a.nodeType && 9 !== a.nodeType ? [] : C.call(h && !e ? f ? a.getElementsByClassName(g) : a.getElementsByTagName(b) : a.querySelectorAll(b))
    }, x.contains = E.documentElement.contains ? function (a, b) {
            return a !== b && a.contains(b)
        } : function (a, b) {
            for (; b && (b = b.parentNode);)if (b === a)return !0;
            return !1
        }, x.type = a, x.isFunction = b, x.isWindow = c, x.isArray = Z, x.isPlainObject = f, x.isEmptyObject = function (a) {
        var b;
        for (b in a)return !1;
        return !0
    }, x.inArray = function (a, b, c) {
        return B.indexOf.call(b, a, c)
    }, x.camelCase = z, x.trim = function (a) {
        return null == a ? "" : String.prototype.trim.call(a)
    }, x.uuid = 0, x.support = {}, x.expr = {}, x.map = function (a, b) {
        var c, d, e, f = [];
        if (g(a))for (d = 0; d < a.length; d++)c = b(a[d], d), null != c && f.push(c); else for (e in a)c = b(a[e], e), null != c && f.push(c);
        return i(f)
    }, x.each = function (a, b) {
        var c, d;
        if (g(a)) {
            for (c = 0; c < a.length; c++)if (b.call(a[c], c, a[c]) === !1)return a
        } else for (d in a)if (b.call(a[d], d, a[d]) === !1)return a;
        return a
    }, x.grep = function (a, b) {
        return D.call(a, b)
    }, window.JSON && (x.parseJSON = JSON.parse), x.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (a, b) {
        U["[object " + b + "]"] = b.toLowerCase()
    }), x.fn = {
        forEach: B.forEach,
        reduce: B.reduce,
        push: B.push,
        sort: B.sort,
        indexOf: B.indexOf,
        concat: B.concat,
        map: function (a) {
            return x(x.map(this, function (b, c) {
                return a.call(b, c, b)
            }))
        },
        slice: function () {
            return x(C.apply(this, arguments))
        },
        ready: function (a) {
            return S.test(E.readyState) && E.body ? a(x) : E.addEventListener("DOMContentLoaded", function () {
                    a(x)
                }, !1), this
        },
        get: function (a) {
            return a === v ? C.call(this) : this[a >= 0 ? a : a + this.length]
        },
        toArray: function () {
            return this.get()
        },
        size: function () {
            return this.length
        },
        remove: function () {
            return this.each(function () {
                null != this.parentNode && this.parentNode.removeChild(this)
            })
        },
        each: function (a) {
            return B.every.call(this, function (b, c) {
                return a.call(b, c, b) !== !1
            }), this
        },
        filter: function (a) {
            return b(a) ? this.not(this.not(a)) : x(D.call(this, function (b) {
                    return W.matches(b, a)
                }))
        },
        add: function (a, b) {
            return x(A(this.concat(x(a, b))))
        },
        is: function (a) {
            return this.length > 0 && W.matches(this[0], a)
        },
        not: function (a) {
            var c = [];
            if (b(a) && a.call !== v) this.each(function (b) {
                a.call(this, b) || c.push(this)
            }); else {
                var d = "string" == typeof a ? this.filter(a) : g(a) && b(a.item) ? C.call(a) : x(a);
                this.forEach(function (a) {
                    d.indexOf(a) < 0 && c.push(a)
                })
            }
            return x(c)
        },
        has: function (a) {
            return this.filter(function () {
                return e(a) ? x.contains(this, a) : x(this).find(a).size()
            })
        },
        eq: function (a) {
            return -1 === a ? this.slice(a) : this.slice(a, +a + 1)
        },
        first: function () {
            var a = this[0];
            return a && !e(a) ? a : x(a)
        },
        last: function () {
            var a = this[this.length - 1];
            return a && !e(a) ? a : x(a)
        },
        find: function (a) {
            var b, c = this;
            return b = a ? "object" == typeof a ? x(a).filter(function () {
                        var a = this;
                        return B.some.call(c, function (b) {
                            return x.contains(b, a)
                        })
                    }) : 1 == this.length ? x(W.qsa(this[0], a)) : this.map(function () {
                            return W.qsa(this, a)
                        }) : x()
        },
        closest: function (a, b) {
            var c = this[0], e = !1;
            for ("object" == typeof a && (e = x(a)); c && !(e ? e.indexOf(c) >= 0 : W.matches(c, a));)c = c !== b && !d(c) && c.parentNode;
            return x(c)
        },
        parents: function (a) {
            for (var b = [], c = this; c.length > 0;)c = x.map(c, function (a) {
                return (a = a.parentNode) && !d(a) && b.indexOf(a) < 0 ? (b.push(a), a) : void 0
            });
            return p(b, a)
        },
        parent: function (a) {
            return p(A(this.pluck("parentNode")), a)
        },
        children: function (a) {
            return p(this.map(function () {
                return n(this)
            }), a)
        },
        contents: function () {
            return this.map(function () {
                return C.call(this.childNodes)
            })
        },
        siblings: function (a) {
            return p(this.map(function (a, b) {
                return D.call(n(b.parentNode), function (a) {
                    return a !== b
                })
            }), a)
        },
        empty: function () {
            return this.each(function () {
                this.innerHTML = ""
            })
        },
        pluck: function (a) {
            return x.map(this, function (b) {
                return b[a]
            })
        },
        show: function () {
            return this.each(function () {
                "none" == this.style.display && (this.style.display = ""), "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = m(this.nodeName))
            })
        },
        replaceWith: function (a) {
            return this.before(a).remove()
        },
        wrap: function (a) {
            var c = b(a);
            if (this[0] && !c)var d = x(a).get(0), e = d.parentNode || this.length > 1;
            return this.each(function (b) {
                x(this).wrapAll(c ? a.call(this, b) : e ? d.cloneNode(!0) : d)
            })
        },
        wrapAll: function (a) {
            if (this[0]) {
                x(this[0]).before(a = x(a));
                for (var b; (b = a.children()).length;)a = b.first();
                x(a).append(this)
            }
            return this
        },
        wrapInner: function (a) {
            var c = b(a);
            return this.each(function (b) {
                var d = x(this), e = d.contents(), f = c ? a.call(this, b) : a;
                e.length ? e.wrapAll(f) : d.append(f)
            })
        },
        unwrap: function () {
            return this.parent().each(function () {
                x(this).replaceWith(x(this).children())
            }), this
        },
        clone: function () {
            return this.map(function () {
                return this.cloneNode(!0)
            })
        },
        hide: function () {
            return this.css("display", "none")
        },
        toggle: function (a) {
            return this.each(function () {
                var b = x(this);
                (a === v ? "none" == b.css("display") : a) ? b.show() : b.hide()
            })
        },
        prev: function (a) {
            return x(this.pluck("previousElementSibling")).filter(a || "*")
        },
        next: function (a) {
            return x(this.pluck("nextElementSibling")).filter(a || "*")
        },
        html: function (a) {
            return 0 in arguments ? this.each(function (b) {
                    var c = this.innerHTML;
                    x(this).empty().append(q(this, a, b, c))
                }) : 0 in this ? this[0].innerHTML : null
        },
        text: function (a) {
            return 0 in arguments ? this.each(function (b) {
                    var c = q(this, a, b, this.textContent);
                    this.textContent = null == c ? "" : "" + c
                }) : 0 in this ? this[0].textContent : null
        },
        attr: function (a, b) {
            var c;
            return "string" != typeof a || 1 in arguments ? this.each(function (c) {
                    if (1 === this.nodeType)if (e(a))for (w in a)r(this, w, a[w]); else r(this, a, q(this, b, c, this.getAttribute(a)))
                }) : this.length && 1 === this[0].nodeType ? !(c = this[0].getAttribute(a)) && a in this[0] ? this[0][a] : c : v
        },
        removeAttr: function (a) {
            return this.each(function () {
                1 === this.nodeType && a.split(" ").forEach(function (a) {
                    r(this, a)
                }, this)
            })
        },
        prop: function (a, b) {
            return a = Y[a] || a, 1 in arguments ? this.each(function (c) {
                    this[a] = q(this, b, c, this[a])
                }) : this[0] && this[0][a]
        },
        data: function (a, b) {
            var c = "data-" + a.replace(M, "-$1").toLowerCase(), d = 1 in arguments ? this.attr(c, b) : this.attr(c);
            return null !== d ? t(d) : v
        },
        val: function (a) {
            return 0 in arguments ? this.each(function (b) {
                    this.value = q(this, a, b, this.value)
                }) : this[0] && (this[0].multiple ? x(this[0]).find("option").filter(function () {
                        return this.selected
                    }).pluck("value") : this[0].value)
        },
        offset: function (a) {
            if (a)return this.each(function (b) {
                var c = x(this), d = q(this, a, b, c.offset()), e = c.offsetParent().offset(), f = {
                    top: d.top - e.top,
                    left: d.left - e.left
                };
                "static" == c.css("position") && (f.position = "relative"), c.css(f)
            });
            if (!this.length)return null;
            var b = this[0].getBoundingClientRect();
            return {
                left: b.left + window.pageXOffset,
                top: b.top + window.pageYOffset,
                width: Math.round(b.width),
                height: Math.round(b.height)
            }
        },
        css: function (b, c) {
            if (arguments.length < 2) {
                var d, e = this[0];
                if (!e)return;
                if (d = getComputedStyle(e, ""), "string" == typeof b)return e.style[z(b)] || d.getPropertyValue(b);
                if (Z(b)) {
                    var f = {};
                    return x.each(b, function (a, b) {
                        f[b] = e.style[z(b)] || d.getPropertyValue(b)
                    }), f
                }
            }
            var g = "";
            if ("string" == a(b)) c || 0 === c ? g = j(b) + ":" + l(b, c) : this.each(function () {
                    this.style.removeProperty(j(b))
                }); else for (w in b)b[w] || 0 === b[w] ? g += j(w) + ":" + l(w, b[w]) + ";" : this.each(function () {
                    this.style.removeProperty(j(w))
                });
            return this.each(function () {
                this.style.cssText += ";" + g
            })
        },
        index: function (a) {
            return a ? this.indexOf(x(a)[0]) : this.parent().children().indexOf(this[0])
        },
        hasClass: function (a) {
            return a ? B.some.call(this, function (a) {
                    return this.test(s(a))
                }, k(a)) : !1
        },
        addClass: function (a) {
            return a ? this.each(function (b) {
                    if ("className" in this) {
                        y = [];
                        var c = s(this), d = q(this, a, b, c);
                        d.split(/\s+/g).forEach(function (a) {
                            x(this).hasClass(a) || y.push(a)
                        }, this), y.length && s(this, c + (c ? " " : "") + y.join(" "))
                    }
                }) : this
        },
        removeClass: function (a) {
            return this.each(function (b) {
                if ("className" in this) {
                    if (a === v)return s(this, "");
                    y = s(this), q(this, a, b, y).split(/\s+/g).forEach(function (a) {
                        y = y.replace(k(a), " ")
                    }), s(this, y.trim())
                }
            })
        },
        toggleClass: function (a, b) {
            return a ? this.each(function (c) {
                    var d = x(this), e = q(this, a, c, s(this));
                    e.split(/\s+/g).forEach(function (a) {
                        (b === v ? !d.hasClass(a) : b) ? d.addClass(a) : d.removeClass(a)
                    })
                }) : this
        },
        scrollTop: function (a) {
            if (this.length) {
                var b = "scrollTop" in this[0];
                return a === v ? b ? this[0].scrollTop : this[0].pageYOffset : this.each(b ? function () {
                            this.scrollTop = a
                        } : function () {
                            this.scrollTo(this.scrollX, a)
                        })
            }
        },
        scrollLeft: function (a) {
            if (this.length) {
                var b = "scrollLeft" in this[0];
                return a === v ? b ? this[0].scrollLeft : this[0].pageXOffset : this.each(b ? function () {
                            this.scrollLeft = a
                        } : function () {
                            this.scrollTo(a, this.scrollY)
                        })
            }
        },
        position: function () {
            if (this.length) {
                var a = this[0], b = this.offsetParent(), c = this.offset(), d = L.test(b[0].nodeName) ? {
                        top: 0,
                        left: 0
                    } : b.offset();
                return c.top -= parseFloat(x(a).css("margin-top")) || 0, c.left -= parseFloat(x(a).css("margin-left")) || 0, d.top += parseFloat(x(b[0]).css("border-top-width")) || 0, d.left += parseFloat(x(b[0]).css("border-left-width")) || 0, {
                    top: c.top - d.top,
                    left: c.left - d.left
                }
            }
        },
        offsetParent: function () {
            return this.map(function () {
                for (var a = this.offsetParent || E.body; a && !L.test(a.nodeName) && "static" == x(a).css("position");)a = a.offsetParent;
                return a
            })
        }
    }, x.fn.detach = x.fn.remove, ["width", "height"].forEach(function (a) {
        var b = a.replace(/./, function (a) {
            return a[0].toUpperCase()
        });
        x.fn[a] = function (e) {
            var f, g = this[0];
            return e === v ? c(g) ? g["inner" + b] : d(g) ? g.documentElement["scroll" + b] : (f = this.offset()) && f[a] : this.each(function (b) {
                    g = x(this), g.css(a, q(this, e, b, g[a]()))
                })
        }
    }), O.forEach(function (b, c) {
        var d = c % 2;
        x.fn[b] = function () {
            var b, e, f = x.map(arguments, function (c) {
                return b = a(c), "object" == b || "array" == b || null == c ? c : W.fragment(c)
            }), g = this.length > 1;
            return f.length < 1 ? this : this.each(function (a, b) {
                    e = d ? b : b.parentNode, b = 0 == c ? b.nextSibling : 1 == c ? b.firstChild : 2 == c ? b : null;
                    var h = x.contains(E.documentElement, e);
                    f.forEach(function (a) {
                        if (g) a = a.cloneNode(!0); else if (!e)return x(a).remove();
                        e.insertBefore(a, b), h && u(a, function (a) {
                            null == a.nodeName || "SCRIPT" !== a.nodeName.toUpperCase() || a.type && "text/javascript" !== a.type || a.src || window.eval.call(window, a.innerHTML)
                        })
                    })
                })
        }, x.fn[d ? b + "To" : "insert" + (c ? "Before" : "After")] = function (a) {
            return x(a)[b](this), this
        }
    }), W.Z.prototype = x.fn, W.uniq = A, W.deserializeValue = t, x.zepto = W, x
}();
window.Zepto = Zepto, void 0 === window.$ && (window.$ = Zepto), function (a) {
    function b(a) {
        return a._zid || (a._zid = m++)
    }

    function c(a, c, f, g) {
        if (c = d(c), c.ns)var h = e(c.ns);
        return (q[b(a)] || []).filter(function (a) {
            return !(!a || c.e && a.e != c.e || c.ns && !h.test(a.ns) || f && b(a.fn) !== b(f) || g && a.sel != g)
        })
    }

    function d(a) {
        var b = ("" + a).split(".");
        return {e: b[0], ns: b.slice(1).sort().join(" ")}
    }

    function e(a) {
        return new RegExp("(?:^| )" + a.replace(" ", " .* ?") + "(?: |$)")
    }

    function f(a, b) {
        return a.del && !s && a.e in t || !!b
    }

    function g(a) {
        return u[a] || s && t[a] || a
    }

    function h(c, e, h, i, k, m, n) {
        var o = b(c), p = q[o] || (q[o] = []);
        e.split(/\s/).forEach(function (b) {
            if ("ready" == b)return a(document).ready(h);
            var e = d(b);
            e.fn = h, e.sel = k, e.e in u && (h = function (b) {
                var c = b.relatedTarget;
                return !c || c !== this && !a.contains(this, c) ? e.fn.apply(this, arguments) : void 0
            }), e.del = m;
            var o = m || h;
            e.proxy = function (a) {
                if (a = j(a), !a.isImmediatePropagationStopped()) {
                    a.data = i;
                    var b = o.apply(c, a._args == l ? [a] : [a].concat(a._args));
                    return b === !1 && (a.preventDefault(), a.stopPropagation()), b
                }
            }, e.i = p.length, p.push(e), "addEventListener" in c && c.addEventListener(g(e.e), e.proxy, f(e, n))
        })
    }

    function i(a, d, e, h, i) {
        var j = b(a);
        (d || "").split(/\s/).forEach(function (b) {
            c(a, b, e, h).forEach(function (b) {
                delete q[j][b.i], "removeEventListener" in a && a.removeEventListener(g(b.e), b.proxy, f(b, i))
            })
        })
    }

    function j(b, c) {
        return (c || !b.isDefaultPrevented) && (c || (c = b), a.each(y, function (a, d) {
            var e = c[a];
            b[a] = function () {
                return this[d] = v, e && e.apply(c, arguments)
            }, b[d] = w
        }), (c.defaultPrevented !== l ? c.defaultPrevented : "returnValue" in c ? c.returnValue === !1 : c.getPreventDefault && c.getPreventDefault()) && (b.isDefaultPrevented = v)), b
    }

    function k(a) {
        var b, c = {originalEvent: a};
        for (b in a)x.test(b) || a[b] === l || (c[b] = a[b]);
        return j(c, a)
    }

    var l, m = 1, n = Array.prototype.slice, o = a.isFunction, p = function (a) {
        return "string" == typeof a
    }, q = {}, r = {}, s = "onfocusin" in window, t = {
        focus: "focusin",
        blur: "focusout"
    }, u = {mouseenter: "mouseover", mouseleave: "mouseout"};
    r.click = r.mousedown = r.mouseup = r.mousemove = "MouseEvents", a.event = {
        add: h,
        remove: i
    }, a.proxy = function (c, d) {
        var e = 2 in arguments && n.call(arguments, 2);
        if (o(c)) {
            var f = function () {
                return c.apply(d, e ? e.concat(n.call(arguments)) : arguments)
            };
            return f._zid = b(c), f
        }
        if (p(d))return e ? (e.unshift(c[d], c), a.proxy.apply(null, e)) : a.proxy(c[d], c);
        throw new TypeError("expected function")
    }, a.fn.bind = function (a, b, c) {
        return this.on(a, b, c)
    }, a.fn.unbind = function (a, b) {
        return this.off(a, b)
    }, a.fn.one = function (a, b, c, d) {
        return this.on(a, b, c, d, 1)
    };
    var v = function () {
        return !0
    }, w = function () {
        return !1
    }, x = /^([A-Z]|returnValue$|layer[XY]$)/, y = {
        preventDefault: "isDefaultPrevented",
        stopImmediatePropagation: "isImmediatePropagationStopped",
        stopPropagation: "isPropagationStopped"
    };
    a.fn.delegate = function (a, b, c) {
        return this.on(b, a, c)
    }, a.fn.undelegate = function (a, b, c) {
        return this.off(b, a, c)
    }, a.fn.live = function (b, c) {
        return a(document.body).delegate(this.selector, b, c), this
    }, a.fn.die = function (b, c) {
        return a(document.body).undelegate(this.selector, b, c), this
    }, a.fn.on = function (b, c, d, e, f) {
        var g, j, m = this;
        return b && !p(b) ? (a.each(b, function (a, b) {
                m.on(a, c, d, b, f)
            }), m) : (p(c) || o(e) || e === !1 || (e = d, d = c, c = l), (o(d) || d === !1) && (e = d, d = l), e === !1 && (e = w), m.each(function (l, m) {
                f && (g = function (a) {
                    return i(m, a.type, e), e.apply(this, arguments)
                }), c && (j = function (b) {
                    var d, f = a(b.target).closest(c, m).get(0);
                    return f && f !== m ? (d = a.extend(k(b), {
                            currentTarget: f,
                            liveFired: m
                        }), (g || e).apply(f, [d].concat(n.call(arguments, 1)))) : void 0
                }), h(m, b, e, d, c, j || g)
            }))
    }, a.fn.off = function (b, c, d) {
        var e = this;
        return b && !p(b) ? (a.each(b, function (a, b) {
                e.off(a, c, b)
            }), e) : (p(c) || o(d) || d === !1 || (d = c, c = l), d === !1 && (d = w), e.each(function () {
                i(this, b, d, c)
            }))
    }, a.fn.trigger = function (b, c) {
        return b = p(b) || a.isPlainObject(b) ? a.Event(b) : j(b), b._args = c, this.each(function () {
            b.type in t && "function" == typeof this[b.type] ? this[b.type]() : "dispatchEvent" in this ? this.dispatchEvent(b) : a(this).triggerHandler(b, c)
        })
    }, a.fn.triggerHandler = function (b, d) {
        var e, f;
        return this.each(function (g, h) {
            e = k(p(b) ? a.Event(b) : b), e._args = d, e.target = h, a.each(c(h, b.type || b), function (a, b) {
                return f = b.proxy(e), e.isImmediatePropagationStopped() ? !1 : void 0
            })
        }), f
    }, "focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function (b) {
        a.fn[b] = function (a) {
            return 0 in arguments ? this.bind(b, a) : this.trigger(b)
        }
    }), a.Event = function (a, b) {
        p(a) || (b = a, a = b.type);
        var c = document.createEvent(r[a] || "Events"), d = !0;
        if (b)for (var e in b)"bubbles" == e ? d = !!b[e] : c[e] = b[e];
        return c.initEvent(a, d, !0), j(c)
    }
}(Zepto), function (a) {
    function b(b, c, d) {
        var e = a.Event(c);
        return a(b).trigger(e, d), !e.isDefaultPrevented()
    }

    function c(a, c, d, e) {
        return a.global ? b(c || s, d, e) : void 0
    }

    function d(b) {
        b.global && 0 === a.active++ && c(b, null, "ajaxStart")
    }

    function e(b) {
        b.global && !--a.active && c(b, null, "ajaxStop")
    }

    function f(a, b) {
        var d = b.context;
        return b.beforeSend.call(d, a, b) === !1 || c(b, d, "ajaxBeforeSend", [a, b]) === !1 ? !1 : void c(b, d, "ajaxSend", [a, b])
    }

    function g(a, b, d, e) {
        var f = d.context, g = "success";
        d.success.call(f, a, g, b), e && e.resolveWith(f, [a, g, b]), c(d, f, "ajaxSuccess", [b, d, a]), i(g, b, d)
    }

    function h(a, b, d, e, f) {
        var g = e.context;
        e.error.call(g, d, b, a), f && f.rejectWith(g, [d, b, a]), c(e, g, "ajaxError", [d, e, a || b]), i(b, d, e)
    }

    function i(a, b, d) {
        var f = d.context;
        d.complete.call(f, b, a), c(d, f, "ajaxComplete", [b, d]), e(d)
    }

    function j() {
    }

    function k(a) {
        return a && (a = a.split(";", 2)[0]), a && (a == x ? "html" : a == w ? "json" : u.test(a) ? "script" : v.test(a) && "xml") || "text"
    }

    function l(a, b) {
        return "" == b ? a : (a + "&" + b).replace(/[&?]{1,2}/, "?")
    }

    function m(b) {
        b.processData && b.data && "string" != a.type(b.data) && (b.data = a.param(b.data, b.traditional)), !b.data || b.type && "GET" != b.type.toUpperCase() || (b.url = l(b.url, b.data), b.data = void 0)
    }

    function n(b, c, d, e) {
        return a.isFunction(c) && (e = d, d = c, c = void 0), a.isFunction(d) || (e = d, d = void 0), {
            url: b,
            data: c,
            success: d,
            dataType: e
        }
    }

    function o(b, c, d, e) {
        var f, g = a.isArray(c), h = a.isPlainObject(c);
        a.each(c, function (c, i) {
            f = a.type(i), e && (c = d ? e : e + "[" + (h || "object" == f || "array" == f ? c : "") + "]"), !e && g ? b.add(i.name, i.value) : "array" == f || !d && "object" == f ? o(b, i, d, c) : b.add(c, i)
        })
    }

    var p, q, r = 0, s = window.document, t = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, u = /^(?:text|application)\/javascript/i, v = /^(?:text|application)\/xml/i, w = "application/json", x = "text/html", y = /^\s*$/, z = s.createElement("a");
    z.href = window.location.href, a.active = 0, a.ajaxJSONP = function (b, c) {
        if (!("type" in b))return a.ajax(b);
        var d, e, i = b.jsonpCallback, j = (a.isFunction(i) ? i() : i) || "jsonp" + ++r, k = s.createElement("script"), l = window[j], m = function (b) {
            a(k).triggerHandler("error", b || "abort")
        }, n = {abort: m};
        return c && c.promise(n), a(k).on("load error", function (f, i) {
            clearTimeout(e), a(k).off().remove(), "error" != f.type && d ? g(d[0], n, b, c) : h(null, i || "error", n, b, c), window[j] = l, d && a.isFunction(l) && l(d[0]), l = d = void 0
        }), f(n, b) === !1 ? (m("abort"), n) : (window[j] = function () {
                d = arguments
            }, k.src = b.url.replace(/\?(.+)=\?/, "?$1=" + j), s.head.appendChild(k), b.timeout > 0 && (e = setTimeout(function () {
                m("timeout")
            }, b.timeout)), n)
    }, a.ajaxSettings = {
        type: "GET",
        beforeSend: j,
        success: j,
        error: j,
        complete: j,
        context: null,
        global: !0,
        xhr: function () {
            return new window.XMLHttpRequest
        },
        accepts: {
            script: "text/javascript, application/javascript, application/x-javascript",
            json: w,
            xml: "application/xml, text/xml",
            html: x,
            text: "text/plain"
        },
        crossDomain: !1,
        timeout: 0,
        processData: !0,
        cache: !0
    }, a.ajax = function (b) {
        var c, e = a.extend({}, b || {}), i = a.Deferred && a.Deferred();
        for (p in a.ajaxSettings)void 0 === e[p] && (e[p] = a.ajaxSettings[p]);
        d(e), e.crossDomain || (c = s.createElement("a"), c.href = e.url, c.href = c.href, e.crossDomain = z.protocol + "//" + z.host != c.protocol + "//" + c.host), e.url || (e.url = window.location.toString()), m(e);
        var n = e.dataType, o = /\?.+=\?/.test(e.url);
        if (o && (n = "jsonp"), e.cache !== !1 && (b && b.cache === !0 || "script" != n && "jsonp" != n) || (e.url = l(e.url, "_=" + Date.now())), "jsonp" == n)return o || (e.url = l(e.url, e.jsonp ? e.jsonp + "=?" : e.jsonp === !1 ? "" : "callback=?")), a.ajaxJSONP(e, i);
        var r, t = e.accepts[n], u = {}, v = function (a, b) {
            u[a.toLowerCase()] = [a, b]
        }, w = /^([\w-]+:)\/\//.test(e.url) ? RegExp.$1 : window.location.protocol, x = e.xhr(), A = x.setRequestHeader;
        if (i && i.promise(x), e.crossDomain || v("X-Requested-With", "XMLHttpRequest"), v("Accept", t || "*/*"), (t = e.mimeType || t) && (t.indexOf(",") > -1 && (t = t.split(",", 2)[0]), x.overrideMimeType && x.overrideMimeType(t)), (e.contentType || e.contentType !== !1 && e.data && "GET" != e.type.toUpperCase()) && v("Content-Type", e.contentType || "application/x-www-form-urlencoded"), e.headers)for (q in e.headers)v(q, e.headers[q]);
        if (x.setRequestHeader = v, x.onreadystatechange = function () {
                if (4 == x.readyState) {
                    x.onreadystatechange = j, clearTimeout(r);
                    var b, c = !1;
                    if (x.status >= 200 && x.status < 300 || 304 == x.status || 0 == x.status && "file:" == w) {
                        n = n || k(e.mimeType || x.getResponseHeader("content-type")), b = x.responseText;
                        try {
                            "script" == n ? (1, eval)(b) : "xml" == n ? b = x.responseXML : "json" == n && (b = y.test(b) ? null : a.parseJSON(b))
                        } catch (d) {
                            c = d
                        }
                        c ? h(c, "parsererror", x, e, i) : g(b, x, e, i)
                    } else h(x.statusText || null, x.status ? "error" : "abort", x, e, i)
                }
            }, f(x, e) === !1)return x.abort(), h(null, "abort", x, e, i), x;
        if (e.xhrFields)for (q in e.xhrFields)x[q] = e.xhrFields[q];
        var B = "async" in e ? e.async : !0;
        x.open(e.type, e.url, B, e.username, e.password);
        for (q in u)A.apply(x, u[q]);
        return e.timeout > 0 && (r = setTimeout(function () {
            x.onreadystatechange = j, x.abort(), h(null, "timeout", x, e, i)
        }, e.timeout)), x.send(e.data ? e.data : null), x
    }, a.get = function () {
        return a.ajax(n.apply(null, arguments))
    }, a.post = function () {
        var b = n.apply(null, arguments);
        return b.type = "POST", a.ajax(b)
    }, a.getJSON = function () {
        var b = n.apply(null, arguments);
        return b.dataType = "json", a.ajax(b)
    }, a.fn.load = function (b, c, d) {
        if (!this.length)return this;
        var e, f = this, g = b.split(/\s/), h = n(b, c, d), i = h.success;
        return g.length > 1 && (h.url = g[0], e = g[1]), h.success = function (b) {
            f.html(e ? a("<div>").html(b.replace(t, "")).find(e) : b), i && i.apply(f, arguments)
        }, a.ajax(h), this
    };
    var A = encodeURIComponent;
    a.param = function (b, c) {
        var d = [];
        return d.add = function (b, c) {
            a.isFunction(c) && (c = c()), null == c && (c = ""), this.push(A(b) + "=" + A(c))
        }, o(d, b, c), d.join("&").replace(/%20/g, "+")
    }
}(Zepto), function (a) {
    a.fn.serializeArray = function () {
        var b, c, d = [], e = function (a) {
            return a.forEach ? a.forEach(e) : void d.push({name: b, value: a})
        };
        return this[0] && a.each(this[0].elements, function (d, f) {
            c = f.type, b = f.name, b && "fieldset" != f.nodeName.toLowerCase() && !f.disabled && "submit" != c && "reset" != c && "button" != c && "file" != c && ("radio" != c && "checkbox" != c || f.checked) && e(a(f).val())
        }), d
    }, a.fn.serialize = function () {
        var a = [];
        return this.serializeArray().forEach(function (b) {
            a.push(encodeURIComponent(b.name) + "=" + encodeURIComponent(b.value))
        }), a.join("&")
    }, a.fn.submit = function (b) {
        if (0 in arguments) this.bind("submit", b); else if (this.length) {
            var c = a.Event("submit");
            this.eq(0).trigger(c), c.isDefaultPrevented() || this.get(0).submit()
        }
        return this
    }
}(Zepto), function (a) {
    "__proto__" in {} || a.extend(a.zepto, {
        Z: function (b, c) {
            return b = b || [], a.extend(b, a.fn), b.selector = c || "", b.__Z = !0, b
        }, isZ: function (b) {
            return "array" === a.type(b) && "__Z" in b
        }
    });
    try {
        getComputedStyle(void 0)
    } catch (b) {
        var c = getComputedStyle;
        window.getComputedStyle = function (a) {
            try {
                return c(a)
            } catch (b) {
                return null
            }
        }
    }
}(Zepto), function (a, b) {
    function c(a) {
        return a.replace(/([a-z])([A-Z])/, "$1-$2").toLowerCase()
    }

    function d(a) {
        return e ? e + a : a.toLowerCase()
    }

    var e, f, g, h, i, j, k, l, m, n, o = "", p = {
        Webkit: "webkit",
        Moz: "",
        O: "o"
    }, q = document.createElement("div"), r = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i, s = {};
    a.each(p, function (a, c) {
        return q.style[a + "TransitionProperty"] !== b ? (o = "-" + a.toLowerCase() + "-", e = c, !1) : void 0
    }), f = o + "transform", s[g = o + "transition-property"] = s[h = o + "transition-duration"] = s[j = o + "transition-delay"] = s[i = o + "transition-timing-function"] = s[k = o + "animation-name"] = s[l = o + "animation-duration"] = s[n = o + "animation-delay"] = s[m = o + "animation-timing-function"] = "", a.fx = {
        off: e === b && q.style.transitionProperty === b,
        speeds: {_default: 400, fast: 200, slow: 600},
        cssPrefix: o,
        transitionEnd: d("TransitionEnd"),
        animationEnd: d("AnimationEnd")
    }, a.fn.animate = function (c, d, e, f, g) {
        return a.isFunction(d) && (f = d, e = b, d = b), a.isFunction(e) && (f = e, e = b), a.isPlainObject(d) && (e = d.easing, f = d.complete, g = d.delay, d = d.duration), d && (d = ("number" == typeof d ? d : a.fx.speeds[d] || a.fx.speeds._default) / 1e3), g && (g = parseFloat(g) / 1e3), this.anim(c, d, e, f, g)
    }, a.fn.anim = function (d, e, o, p, q) {
        var t, u, v, w = {}, x = "", y = this, z = a.fx.transitionEnd, A = !1;
        if (e === b && (e = a.fx.speeds._default / 1e3), q === b && (q = 0), a.fx.off && (e = 0), "string" == typeof d) w[k] = d, w[l] = e + "s", w[n] = q + "s", w[m] = o || "linear", z = a.fx.animationEnd; else {
            u = [];
            for (t in d)r.test(t) ? x += t + "(" + d[t] + ") " : (w[t] = d[t], u.push(c(t)));
            x && (w[f] = x, u.push(f)), e > 0 && "object" == typeof d && (w[g] = u.join(", "), w[h] = e + "s", w[j] = q + "s", w[i] = o || "linear")
        }
        return v = function (b) {
            if ("undefined" != typeof b) {
                if (b.target !== b.currentTarget)return;
                a(b.target).unbind(z, v)
            } else a(this).unbind(z, v);
            A = !0, a(this).css(s), p && p.call(this)
        }, e > 0 && (this.bind(z, v), setTimeout(function () {
            A || v.call(y)
        }, 1e3 * (e + q) + 25)), this.size() && this.get(0).clientLeft, this.css(w), 0 >= e && setTimeout(function () {
            y.each(function () {
                v.call(this)
            })
        }, 0), this
    }, q = null
}(Zepto), function () {
    document.addEventListener("DOMContentLoaded", function () {
        var a = document.querySelectorAll(".am-search");
        a && Array.prototype.forEach.call(a, function (a) {
            function b(a, b) {
                a.value.length > 0 ? b.removeAttribute("disabled") : b.setAttribute("disabled", "disabled")
            }

            var c, d = a.querySelector(".am-search-button"), e = a.querySelector(".am-search-button .am-button"), f = a.querySelector("input.am-search-value"), g = a.querySelector(".am-icon-clear");
            e && f && (b(f, e), f.addEventListener("focus", function () {
                b(f, e), d.style.display = "block"
            }, !1), f.addEventListener("blur", function () {
                c = setTimeout(function () {
                    d.style.display = "none"
                }, 400)
            }, !1), g.addEventListener("click", function () {
                clearTimeout(c)
            }, !1), f.addEventListener("input", function () {
                b(f, e)
            }, !1))
        })
    }, !1)
}(), function () {
    document.addEventListener("DOMContentLoaded", function () {
        var a = document.querySelectorAll(".am-input-autoclear");
        a && Array.prototype.forEach.call(a, function (a) {
            var b = a.querySelector(".am-icon-clear"), c = a.querySelector('input[type="text"],input[type="password"],input[type="number"],input[type="tel"],input[type="email"],input[type="url"],input[type="search"]'), d = document.querySelectorAll(".am-button-submit")[0];
            b && c && (b.addEventListener("touchstart", function () {
                c.value = "", c.focus(), b.style.visibility = "hidden", d.setAttribute("disabled", "disabled")
            }, !1), b.addEventListener("click", function () {
                c.value = "", c.focus(), b.style.visibility = "hidden", d.setAttribute("disabled", "disabled")
            }, !1), c.addEventListener("focus", function () {
                b.style.visibility = c.value.length > 0 ? "visible" : "hidden"
            }, !1), c.addEventListener("input", function () {
                b.style.visibility = c.value.length > 0 ? "visible" : "hidden"
            }, !1), c.addEventListener("blur", function () {
                setTimeout(function () {
                    b.style.visibility = "hidden"
                }, 200)
            }, !1))
        })
    }, !1)
}(), function () {
    document.addEventListener("DOMContentLoaded", function () {
        var a = document.querySelectorAll(".am-textarea-autoheight");
        a && Array.prototype.forEach.call(a, function (a) {
            var b = a.currentStyle || document.defaultView.getComputedStyle(a, null), c = Math.ceil(b.height.slice(0, -2)), d = a.clientHeight;
            a.style.resize = "none", a.addEventListener("input", function () {
                var b = Math.floor((a.scrollHeight - d + c) / c);
                a.setAttribute("rows", b)
            }, !1)
        })
    }, !1)
}(), function () {
    document.addEventListener("DOMContentLoaded", function () {
        function a() {
            var a = !0;
            return Array.prototype.forEach.call(c, function (b) {
                a = a && !!b.value
            }), a
        }

        function b() {
            d && (a() ? d.removeAttribute("disabled") : d.setAttribute("disabled", "disabled"))
        }

        var c = document.querySelectorAll(".am-input-required"), d = document.querySelectorAll(".am-button-submit")[0];
        b(), Array.prototype.forEach.call(c, function (a) {
            a.addEventListener("input", b), a.addEventListener("focus", b), a.addEventListener("blur", b)
        })
    })
}(), function (a) {
    var b = {count: 60, countTemplate: "{count}", autoStart: !1, template: "重新获取"};
    a.fn.buttonCount = function (c) {
        var d, e = this, c = a.extend(b, c || {}), f = function () {
            return !e.attr("disabled")
        }, g = function () {
            e.bind("click", function () {
                h()
            })
        }, h = function () {
            if (f()) {
                var b;
                if (k(), i(), c.hook) {
                    var d = c.hook;
                    (b = d.url) && a.ajax({
                        url: b, data: d.data, dataType: "json", success: function (a) {
                            e.trigger("ajaxSuccess", a)
                        }, error: function (a) {
                            e.trigger("ajaxError", a)
                        }
                    })
                }
            }
        }, i = function () {
            function a() {
                d ? e.html(c.countTemplate.replace(/{count}/g, d)) : j(), d--
            }

            d = c.count, e.timer && clearInterval(e.timer), e.timer = setInterval(a, 1e3), a(), e.trigger("start")
        }, j = function () {
            e.timer && (clearInterval(e.timer), delete e.timer, e.html(c.template), l(), e.trigger("stop"))
        }, k = function () {
            f() && (e.attr("disabled", "disabled"), e.trigger("disable"))
        }, l = function () {
            f() || (e.removeAttr("disabled"), a(e).trigger("enable"))
        };
        return e.init = function () {
            g(), c.autoStart && h()
        }, e.stop = j, e.start = h, e.init(), e
    }
}(Zepto), function (a) {
    a.toast = function (b, c) {
        var d = a('<div class="am-toast"><div class="am-toast-text">' + b + "</div></div>").appendTo(document.body), e = 3e3;
        b.length > 15 && (e = 5e3), setTimeout(function () {
            d.animate({opacity: 0}, 200, "ease-out", function () {
                d.remove(), c && c()
            })
        }, e)
    }, a.errorAlert = a.toast, a.loadingTip = function () {
        var b = a('<div class="am-toast"><div class="am-toast-text"><span class="am-icon-loading"></span> 登录中</div></div>');
        return {
            show: function () {
                b.appendTo(document.body)
            }, hide: function () {
                b.remove()
            }
        }
    }(), a(function () {
        if (a(".am-toast").length > 0) {
            var b = a(".am-toast");
            setTimeout(function () {
                b.animate({opacity: 0}, 200, "ease-out", function () {
                    b.remove()
                })
            }, 3e3)
        }
    })
}(Zepto), function (a) {
    function b(a, b) {
        return '<div class="km-dialog-' + a + '">' + (b || "") + "</div>"
    }

    function c(b) {
        this.options = a.extend({}, d, b), this._init(b)
    }

    var d = {
        autoShow: !1,
        type: "alert",
        closeBtn: !0,
        width: 300 * (window.dpr || 1),
        height: "auto",
        title: null,
        content: null,
        isCallNative: !1,
        eventType: "click",
        position: null,
        buttons: null,
        mask: !0,
        elStyle: null,
        elCls: null
    };
    a.extend(c.prototype, {
        _Events: [], _showByNative: function () {
            var b = this, c = b.options.type || "alert";
            switch (c) {
                case"confirm":
                    var d = {
                        message: b.options.content,
                        okbutton: b.options.buttons[1].name,
                        canclebutton: b.options.buttons[0].name,
                        _index: 10086
                    };
                    window.WindVane.call("WVUIDialog", "confirm", d, b.success, function (a) {
                        b._showByJs()
                    }), b._hasBind || (document.addEventListener("wv.dialog", a.proxy(b.WVdialogHandler, b), !1),
                        b._hasBind = !0);
                    break;
                default:
                    var d = {message: b.options.content, okbutton: b.options.buttons[0].name};
                    window.WindVane.call("WVUIDialog", "alert", d, b.success, function (a) {
                        b._showByJs()
                    })
            }
        }, WVdialogHandler: function (a) {
            var b = this;
            window.setTimeout(function () {
                a.param.type == b.options.buttons[1].name ? b.options.buttons[1].event() : b.options.buttons[0].event()
            }, 1)
        }, success: function (a) {
        }, _init: function () {
            var c = this, d = c.options;
            if (c.options.trigger && (c._triggerHandler = a(c.options.trigger).on(d.eventType, function (a) {
                    a.preventDefault(), c.triggerElement = a.target, c.show()
                })), !this.isCallNative()) {
                var e = '<div class="km-dialog km-dialog-ios7 km-dialog-' + d.type + (d.elCls ? " " + d.elCls : "") + '" style="visibility:hidden">';
                d.title && (e += b("title", d.title)), e += b("content", d.content || ""), d.buttons && (e += '<div class="km-dialog-buttons">', d.buttons.forEach(function (a, b) {
                    e += '<span class="km-dialog-btn" data-idx=' + d.type + b + ">" + a.name + "</span>", c._Events[d.type + b] = a.event
                }), e += "</div>"), e += "</div>", c.container = a(e).appendTo("body").css(a.extend({
                    width: d.width,
                    height: d.height
                }, d.elStyle || {})).on(d.eventType, ".km-dialog-btn", function (a) {
                    var b = a.currentTarget || a.target, d = b.getAttribute("data-idx");
                    c._Events[d] && c._Events[d].call(c, a), c.hide(), a.preventDefault()
                })[0], this.options.autoShow && this.show(), c._resizeHandle = a(window).on("resize", function () {
                    c.refresh()
                }), c.refresh()
            }
        }, showMask: function () {
            var b = a(".km-dialog-mask"), c = this;
            b.length ? b.show() : a('<div class="km-dialog-mask"></div>').appendTo("body").on(this.options.eventType, function (a) {
                    c.hide.call(c), a.preventDefault()
                })
        }, hideMask: function () {
            a(".km-dialog-mask").remove()
        }, isCallNative: function () {
            return this.options.isCallNative && navigator.userAgent.match(/WindVane/) && "dialog" !== this.options.type
        }, show: function () {
            this.isCallNative() ? this._showByNative() : this._showByJs()
        }, _showByJs: function () {
            this.options.mask && this.showMask.call(this), a(this.container).css("visibility", "visible"), this.options.afterShow && this.options.afterShow()
        }, hide: function () {
            this.options.mask && this.hideMask(), a(".km-dialog").css("visibility", "hidden"), this.options.afterHide && this.options.afterHide()
        }, destroy: function () {
            if (a(this.container).off(this.options.eventType), a(this.container).remove(), a(window).off({resize: this._resizeHandle}), document.removeEventListener("wv.dialog", this.WVdialogHandler, !1), this.options.trigger) {
                var b = {};
                b[eventType] = this._triggerHandler, a(this.options.trigger).off(b)
            }
        }, title: function (c) {
            var d = this.container, e = a(".km-dialog-title", d);
            if (e.length > 0) e.html(c); else var e = a(b("title", c)).prependTo(d);
            this.refresh()
        }, content: function (b) {
            this.options.content = b, this.isCallNative() || (a(".km-dialog-content", this.container).html(b), this.refresh())
        }, refresh: function () {
            this.options.position ? a(this.container).css(this.options.position) : a(this.container).css({
                    "margin-left": "-" + this.options.width / 2 + "px",
                    "margin-top": "-" + ("auto" !== this.options.height ? this.options.height : a(this.container).offset().height) / 2 + "px"
                })
        }, getContainer: function () {
            return this.container
        }
    }), a.fn.dialog = function (a) {
        return a.trigger = this, new c(a)
    }
}(Zepto), function (a) {
    function b(b) {
        this.config = a.extend({}, c, b), this.params = {
            title: this.config.title,
            _index: 101224,
            buttons: this.config.buttons
        }, this.callNative = this.isCallNative(), this._init(this.config)
    }

    var c = {
        trigger: "",
        triggerEventType: "click",
        actionSheetID: "J_ActionSheet",
        title: "",
        buttons: ["确定"],
        isCallNative: !1,
        onShow: function () {
        },
        onHide: function () {
        },
        onCancel: function () {
        },
        onItemClick: function () {
        }
    };
    a.extend(b.prototype, {
        isCallNative: function () {
            return this.config.isCallNative && navigator.userAgent.match(/WindVane/)
        }, _init: function (b) {
            var c = this;
            b.trigger && a(b.trigger).on(this.config.triggerEventType, function (a) {
                a.preventDefault(), c.show()
            }), this.callNative ? document.addEventListener("wv.actionsheet", b.onItemClick, !1) : (this._initContainer(c.params), this.el = a("#" + this.config.actionSheetID), this._bindEvent(b))
        }, _initContainer: function (b) {
            function c(a) {
                d += "<div class='sheet_button' ><span>" + a + "</span></div>"
            }

            for (var d = "", e = 0; e < b.buttons.length; e++)c(b.buttons[e]);
            var f = '<div id="' + this.config.actionSheetID + "\" class='km-actionsheet'><div class='sheet_back'></div><div class='sheet_con'><div id=\"J_ActionSheetPos\" class='sheet_pos'>";
            this.config.title && (f += "<div class='sheet_title'><span>" + b.title + "</span></div>"), f += d + "<div class='sheet_no'><span>取消</span></div></div></div></div>", a("body").append(f)
        }, _bindEvent: function (b) {
            var c = this.el, d = this;
            this._cancelHandler = function () {
                d.cancel()
            }, c.find(".sheet_no").on(d.config.triggerEventType, this._cancelHandler), this._itemClickHandler = function (b) {
                var c = "sheet_button";
                if (a(b.target.parentNode).hasClass(c) || a(b.target).hasClass(c)) {
                    var e = {param: {type: b.target.innerText}};
                    d.hide(d.config.onItemClick && d.config.onItemClick.call(d, e))
                }
            }, c.on(this.config.triggerEventType, this._itemClickHandler)
        }, show: function () {
            var a = this;
            this.callNative ? window.WindVane.call("WVUIActionSheet", "show", a.params, this.config.onShow, this.config.onShow) : (a.el.addClass("km-actionsheet-show"), setTimeout(function () {
                    a.el.addClass("km-actionsheet-anim"), a.config.onShow && a.config.onShow.apply(a)
                }, 10))
        }, _addAnim: function (b) {
            a("#J_ActionSheetPos").on("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", b)
        }, _removeAnim: function (b) {
            a("#J_ActionSheetPos").off("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", b)
        }, hide: function (a) {
            var b = this, c = function (c) {
                b.el.removeClass("km-actionsheet-show"), b.config.onHide && b.config.onHide.apply(b), a && a.apply(b), b._removeAnim(this.caller)
            };
            b._addAnim(c), b.el.removeClass("km-actionsheet-anim")
        }, cancel: function () {
            this.hide(this.config.onCancel)
        }, destroy: function () {
            var a = this.el;
            a.find(".sheet_no").off(self.config.triggerEventType, this._cancelHandler), a.off(this.config.triggerEventType, this._itemClickHandler), a.remove(), document.removeEventListener("wv.actionsheet", this.config.onItemClick, !1)
        }
    }), a.actionsheet = function (a) {
        return new b(a)
    }
}(Zepto);