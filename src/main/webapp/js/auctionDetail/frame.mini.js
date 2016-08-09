Date.prototype.format || (Date.prototype.format = function (a) {
    (null == a || void 0 == a || "" == a) && (a = DateUtil.FORMATER_LONG_NORMAL);
    var b = {
        "y+": this.getFullYear() + "",
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds()
    };
    for (var c in b) {
        var d = b[c].toString();
        if (new RegExp("(" + c + ")").test(a)) {
            var e = 1 == RegExp.$1.length ? d : ("00" + d).substr(d.length);
            RegExp.$1.length > 2 && "y+" == c && (e = d), a = a.replace(RegExp.$1, e)
        }
    }
    return a
}), Date.prototype.addYears || (Date.prototype.addYears = function (a) {
    var b = this.getFullYear();
    this.setFullYear(b + a)
}), Date.prototype.addMonths || (Date.prototype.addMonths = function (a) {
    this.setMonth(this.getMonth() + a)
}), Date.prototype.addDays || (Date.prototype.addDays = function (a) {
    this.setDate(this.getDate() + a)
}), Date.prototype.addHours || (Date.prototype.addHours = function (a) {
    this.setHours(this.getHours() + a)
}), Date.prototype.addMinutes || (Date.prototype.addMinutes = function (a) {
    this.setMinutes(this.getMinutes() + a)
}), Date.prototype.addSeconds || (Date.prototype.addSeconds = function (a) {
    this.setSeconds(this.getSeconds() + a)
}), Date.prototype.addWeeks || (Date.prototype.addWeeks = function (a) {
    this.setDate(this.getDate() + 7 * a)
}), Date.prototype.isLeapYear || (Date.prototype.isLeapYear = function () {
    var a = this.getFullYear();
    return a % 100 != 0 && a % 4 == 0 || a % 400 == 0
}), String.prototype.startWith || (String.prototype.startWith = function (a) {
    return void 0 == a || null == a ? !1 : "" == a ? !1 : 0 == this.length || a.length > this.length ? !1 : this.substr(0, a.length) == a ? !0 : !1
}), String.prototype.endWith || (String.prototype.endWith = function (a) {
    return void 0 == a || null == a || "" == a || 0 == this.length || a.length > this.length ? !1 : this.substr(this.length - a.length, this.length) == a ? !0 : !1
}), void 0 == String.prototype.trim && (String.prototype.trim = function () {
    return this.trims()
}), String.prototype.leftTrim || (String.prototype.leftTrim = function () {
    return this.replace(/(^\s*)/g, "")
}), String.prototype.rightTrim || (String.prototype.rightTrim = function () {
    return this.replace(/(\s*$)/g, "")
}), String.prototype.trims || (String.prototype.trims = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "")
}), String.prototype.toInt || (String.prototype.toInt = function () {
    if ("" == this)return void 0;
    if (!this.isInt())return void 0;
    try {
        return parseInt(this)
    } catch (a) {
        return void 0
    }
}), String.prototype.toFloat || (String.prototype.toFloat = function () {
    if ("" == this)return void 0;
    if (!this.isFloat())return void 0;
    try {
        return parseFloat(this)
    } catch (a) {
        return void 0
    }
}), String.prototype.replaceAll || (String.prototype.replaceAll = function (a, b) {
    for (var c = new String(this); -1 != c.indexOf(a);)c = c.replace(a, b);
    return c
}), String.prototype.isInt || (String.prototype.isInt = function () {
    return "" == this || "" == this.trims() ? !1 : this.match("^[0-9]*$") ? !0 : !1
}), String.prototype.isFloat || (String.prototype.isFloat = function () {
    return "" == this || "" == this.trims() ? !1 : this.match("^[0-9.]*$") ? !0 : !1
}), function (a, b) {
    function c(a) {
        return function (b) {
            return Object.prototype.toString.call(b) === "[object " + a + "]"
        }
    }

    function d() {
        return A++
    }

    function e(a) {
        return a.match(G)[0]
    }

    function f(a) {
        for (a = a.replace(H, "/"); a.match(I);)a = a.replace(I, "/");
        return a
    }

    function g(a) {
        var b = a.length - 1, c = a.charAt(b);
        return "#" === c ? a.substring(0, b) : ".js" === a.substring(b - 2) || a.indexOf("?") > 0 || ".css" === a.substring(b - 3) || "/" === c ? a : a + ".js"
    }

    function h(a) {
        var b = v.alias;
        return b && x(b[a]) ? b[a] : a
    }

    function i(a) {
        var b, c = v.paths;
        return c && (b = a.match(J)) && x(c[b[1]]) && (a = c[b[1]] + b[2]), a
    }

    function j(a) {
        var b = v.vars;
        return b && a.indexOf("{") > -1 && (a = a.replace(K, function (a, c) {
            return x(b[c]) ? b[c] : a
        })), a
    }

    function k(a) {
        var b = v.map, c = a;
        if (b)for (var d = 0, e = b.length; e > d; d++) {
            var f = b[d];
            if (c = z(f) ? f(a) || a : a.replace(f[0], f[1]), c !== a)break
        }
        return c
    }

    function l(a, b) {
        var c, d = a.charAt(0);
        if (L.test(a))c = a; else if ("." === d)c = f((b ? e(b) : v.cwd) + a); else if ("/" === d) {
            var g = v.cwd.match(M);
            c = g ? g[0] + a.substring(1) : a
        } else c = v.base + a;
        return c
    }

    function m(a, b) {
        if (!a)return "";
        a = h(a), a = i(a), a = j(a), a = g(a);
        var c = l(a, b);
        return c = k(c)
    }

    function n(a) {
        return a.hasAttribute ? a.src : a.getAttribute("src", 4)
    }

    function o(a, b, c) {
        var d = V.test(a), e = N.createElement(d ? "link" : "script");
        if (c) {
            var f = z(c) ? c(a) : c;
            f && (e.charset = f)
        }
        p(e, b, d), d ? (e.rel = "stylesheet", e.href = a) : (e.async = !0, e.src = a), C = e, U ? T.insertBefore(e, U) : T.appendChild(e), C = null
    }

    function p(a, b, c) {
        var d = c && (X || !("onload" in a));
        return d ? void setTimeout(function () {
            q(a, b)
        }, 1) : void(a.onload = a.onerror = a.onreadystatechange = function () {
            W.test(a.readyState) && (a.onload = a.onerror = a.onreadystatechange = null, c || v.debug || T.removeChild(a), a = null, b())
        })
    }

    function q(a, b) {
        var c, d = a.sheet;
        if (X)d && (c = !0); else if (d)try {
            d.cssRules && (c = !0)
        } catch (e) {
            "NS_ERROR_DOM_SECURITY_ERR" === e.name && (c = !0)
        }
        setTimeout(function () {
            c ? b() : q(a, b)
        }, 20)
    }

    function r() {
        if (C)return C;
        if (D && "interactive" === D.readyState)return D;
        for (var a = T.getElementsByTagName("script"), b = a.length - 1; b >= 0; b--) {
            var c = a[b];
            if ("interactive" === c.readyState)return D = c
        }
    }

    function s(a) {
        var b = [];
        return a.replace(Z, "").replace(Y, function (a, c, d) {
            d && b.push(d)
        }), b
    }

    function t(a, b) {
        this.uri = a, this.dependencies = b || [], this.exports = null, this.status = 0, this._waitings = {}, this._remain = 0
    }

    if (!a.seajs) {
        var u = a.seajs = {version: "2.1.1"}, v = u.data = {}, w = c("Object"), x = c("String"), y = Array.isArray || c("Array"), z = c("Function"), A = 0, B = v.events = {};
        u.on = function (a, b) {
            var c = B[a] || (B[a] = []);
            return c.push(b), u
        }, u.off = function (a, b) {
            if (!a && !b)return B = v.events = {}, u;
            var c = B[a];
            if (c)if (b)for (var d = c.length - 1; d >= 0; d--)c[d] === b && c.splice(d, 1); else delete B[a];
            return u
        };
        var C, D, E, F = u.emit = function (a, b) {
            var c, d = B[a];
            if (d)for (d = d.slice(); c = d.shift();)c(b);
            return u
        }, G = /[^?#]*\//, H = /\/\.\//g, I = /\/[^\/]+\/\.\.\//, J = /^([^\/:]+)(\/.+)$/, K = /{([^{]+)}/g, L = /^\/\/.|:\//, M = /^.*?\/\/.*?\//, N = document, O = location, P = e(O.href), Q = N.getElementsByTagName("script"), R = N.getElementById("seajsnode") || Q[Q.length - 1], S = e(n(R) || P), T = N.getElementsByTagName("head")[0] || N.documentElement, U = T.getElementsByTagName("base")[0], V = /\.css(?:\?|$)/i, W = /^(?:loaded|complete|undefined)$/, X = 1 * navigator.userAgent.replace(/.*AppleWebKit\/(\d+)\..*/, "$1") < 536, Y = /"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g, Z = /\\\\/g, $ = u.cache = {}, _ = {}, aa = {}, ba = {}, ca = t.STATUS = {
            FETCHING: 1,
            SAVED: 2,
            LOADING: 3,
            LOADED: 4,
            EXECUTING: 5,
            EXECUTED: 6
        };
        t.prototype.resolve = function () {
            for (var a = this, b = a.dependencies, c = [], d = 0, e = b.length; e > d; d++)c[d] = t.resolve(b[d], a.uri);
            return c
        }, t.prototype.load = function () {
            var a = this;
            if (!(a.status >= ca.LOADING)) {
                a.status = ca.LOADING;
                var b = a.resolve();
                F("load", b);
                for (var c, d = a._remain = b.length, e = 0; d > e; e++)c = t.get(b[e]), c.status < ca.LOADED ? c._waitings[a.uri] = (c._waitings[a.uri] || 0) + 1 : a._remain--;
                if (0 === a._remain)return void a.onload();
                var f = {};
                for (e = 0; d > e; e++)c = $[b[e]], c.status < ca.FETCHING ? c.fetch(f) : c.status === ca.SAVED && c.load();
                for (var g in f)f.hasOwnProperty(g) && f[g]()
            }
        }, t.prototype.onload = function () {
            var a = this;
            a.status = ca.LOADED, a.callback && a.callback();
            var b, c, d = a._waitings;
            for (b in d)d.hasOwnProperty(b) && (c = $[b], c._remain -= d[b], 0 === c._remain && c.onload());
            delete a._waitings, delete a._remain
        }, t.prototype.fetch = function (a) {
            function b() {
                o(f.requestUri, f.onRequest, f.charset)
            }

            function c() {
                delete _[g], aa[g] = !0, E && (t.save(e, E), E = null);
                var a, b = ba[g];
                for (delete ba[g]; a = b.shift();)a.load()
            }

            var d = this, e = d.uri;
            d.status = ca.FETCHING;
            var f = {uri: e};
            F("fetch", f);
            var g = f.requestUri || e;
            return !g || aa[g] ? void d.load() : _[g] ? void ba[g].push(d) : (_[g] = !0, ba[g] = [d], F("request", f = {
                uri: e,
                requestUri: g,
                onRequest: c,
                charset: v.charset
            }), void(f.requested || (a ? a[f.requestUri] = b : b())))
        }, t.prototype.exec = function () {
            function a(b) {
                return t.get(a.resolve(b)).exec()
            }

            var c = this;
            if (c.status >= ca.EXECUTING)return c.exports;
            c.status = ca.EXECUTING;
            var e = c.uri;
            a.resolve = function (a) {
                return t.resolve(a, e)
            }, a.async = function (b, c) {
                return t.use(b, c, e + "_async_" + d()), a
            };
            var f = c.factory, g = z(f) ? f(a, c.exports = {}, c) : f;
            return g === b && (g = c.exports), null !== g || V.test(e) || F("error", c), delete c.factory, c.exports = g, c.status = ca.EXECUTED, F("exec", c), g
        }, t.resolve = function (a, b) {
            var c = {id: a, refUri: b};
            return F("resolve", c), c.uri || m(c.id, b)
        }, t.define = function (a, c, d) {
            var e = arguments.length;
            1 === e ? (d = a, a = b) : 2 === e && (d = c, y(a) ? (c = a, a = b) : c = b), !y(c) && z(d) && (c = s(d.toString()));
            var f = {id: a, uri: t.resolve(a), deps: c, factory: d};
            if (!f.uri && N.attachEvent) {
                var g = r();
                g && (f.uri = g.src)
            }
            F("define", f), f.uri ? t.save(f.uri, f) : E = f
        }, t.save = function (a, b) {
            var c = t.get(a);
            c.status < ca.SAVED && (c.id = b.id || a, c.dependencies = b.deps || [], c.factory = b.factory, c.status = ca.SAVED)
        }, t.get = function (a, b) {
            return $[a] || ($[a] = new t(a, b))
        }, t.use = function (b, c, d) {
            var e = t.get(d, y(b) ? b : [b]);
            e.callback = function () {
                for (var b = [], d = e.resolve(), f = 0, g = d.length; g > f; f++)b[f] = $[d[f]].exec();
                c && c.apply(a, b), delete e.callback
            }, e.load()
        }, t.preload = function (a) {
            var b = v.preload, c = b.length;
            c ? t.use(b, function () {
                b.splice(0, c), t.preload(a)
            }, v.cwd + "_preload_" + d()) : a()
        }, u.use = function (a, b) {
            return t.preload(function () {
                t.use(a, b, v.cwd + "_use_" + d())
            }), u
        }, t.define.cmd = {}, a.define = t.define, u.Module = t, v.fetchedList = aa, v.cid = d, u.resolve = m, u.require = function (a) {
            return ($[t.resolve(a)] || {}).exports
        };
        var da = /^(.+?\/)(\?\?)?(seajs\/)+/;
        v.base = (S.match(da) || ["", S])[1], v.dir = S, v.cwd = P, v.charset = "utf-8", v.preload = function () {
            var a = [], b = O.search.replace(/(seajs-\w+)(&|$)/g, "$1=1$2");
            return b += " " + N.cookie, b.replace(/(seajs-\w+)=1/g, function (b, c) {
                a.push(c)
            }), a
        }(), u.config = function (a) {
            for (var b in a) {
                var c = a[b], d = v[b];
                if (d && w(d))for (var e in c)d[e] = c[e]; else y(d) ? c = d.concat(c) : "base" === b && ("/" === c.slice(-1) || (c += "/"), c = l(c)), v[b] = c
            }
            return F("config", a), u
        }
    }
}(this), function (a) {
    function b(a) {
        var b = a.length;
        if (!(2 > b)) {
            r.comboSyntax && (t = r.comboSyntax), r.comboMaxLength && (u = r.comboMaxLength), o = r.comboExcludes;
            for (var c = [], e = 0; b > e; e++) {
                var f = a[e];
                if (!s[f]) {
                    var g = p.get(f);
                    g.status < q && !m(f) && !n(f) && c.push(f)
                }
            }
            c.length > 1 && h(d(c))
        }
    }

    function c(a) {
        a.requestUri = s[a.uri] || a.uri
    }

    function d(a) {
        return f(e(a))
    }

    function e(a) {
        for (var b = {__KEYS: []}, c = 0, d = a.length; d > c; c++)for (var e = a[c].replace("://", "__").split("/"), f = b, g = 0, h = e.length; h > g; g++) {
            var i = e[g];
            f[i] || (f[i] = {__KEYS: []}, f.__KEYS.push(i)), f = f[i]
        }
        return b
    }

    function f(a) {
        for (var b = [], c = a.__KEYS, d = 0, e = c.length; e > d; d++) {
            for (var f = c[d], h = f, i = a[f], j = i.__KEYS; 1 === j.length;)h += "/" + j[0], i = i[j[0]], j = i.__KEYS;
            j.length && b.push([h.replace("__", "://"), g(i)])
        }
        return b
    }

    function g(a) {
        for (var b = [], c = a.__KEYS, d = 0, e = c.length; e > d; d++) {
            var f = c[d], h = g(a[f]), i = h.length;
            if (i)for (var j = 0; i > j; j++)b.push(f + "/" + h[j]); else b.push(f)
        }
        return b
    }

    function h(a) {
        for (var b = 0, c = a.length; c > b; b++)for (var d = a[b], e = d[0] + "/", f = k(d[1]), g = 0, h = f.length; h > g; g++)i(e, f[g]);
        return s
    }

    function i(a, b) {
        var c = a + t[0] + b.join(t[1]), d = c.length > u;
        if (b.length > 1 && d) {
            var e = j(b, u - (a + t[0]).length);
            i(a, e[0]), i(a, e[1])
        } else {
            if (d)throw new Error("The combo url is too long: " + c);
            for (var f = 0, g = b.length; g > f; f++)s[a + b[f]] = c
        }
    }

    function j(a, b) {
        for (var c = t[1], d = a[0], e = 1, f = a.length; f > e; e++)if (d += c + a[e], d.length > b)return [a.splice(0, e), a]
    }

    function k(a) {
        for (var b = [], c = {}, d = 0, e = a.length; e > d; d++) {
            var f = a[d], g = l(f);
            g && (c[g] || (c[g] = [])).push(f)
        }
        for (var h in c)c.hasOwnProperty(h) && b.push(c[h]);
        return b
    }

    function l(a) {
        var b = a.lastIndexOf(".");
        return b >= 0 ? a.substring(b) : ""
    }

    function m(a) {
        return o ? o.test ? o.test(a) : o(a) : void 0
    }

    function n(a) {
        var b = r.comboSyntax || ["??", ","], c = b[0], d = b[1];
        return c && a.indexOf(c) > 0 || d && a.indexOf(d) > 0
    }

    var o, p = a.Module, q = p.STATUS.FETCHING, r = a.data, s = r.comboHash = {}, t = ["??", ","], u = 2e3;
    if (a.on("load", b), a.on("fetch", c), r.test) {
        var v = a.test || (a.test = {});
        v.uris2paths = d, v.paths2hash = h
    }
}(seajs), ejs = function () {
    function a(b) {
        if ("fs" == b)return {};
        if ("path" == b)return {};
        var c = a.resolve(b), d = a.modules[c];
        if (!d)throw new Error('failed to require "' + b + '"');
        return d.exports || (d.exports = {}, d.call(d.exports, d, d.exports, a.relative(c))), d.exports
    }

    return a.modules = {}, a.resolve = function (b) {
        var c = b, d = b + ".js", e = b + "/index.js";
        return a.modules[d] && d || a.modules[e] && e || c
    }, a.register = function (b, c) {
        a.modules[b] = c
    }, a.relative = function (b) {
        return function (c) {
            if ("." != c.substr(0, 1))return a(c);
            var d = b.split("/"), e = c.split("/");
            d.pop();
            for (var f = 0; f < e.length; f++) {
                var g = e[f];
                ".." == g ? d.pop() : "." != g && d.push(g)
            }
            return a(d.join("/"))
        }
    }, a.register("ejs.js", function (a, b, c) {
        function d(a) {
            return a.substr(1).split("|").reduce(function (a, b) {
                var c = b.split(":"), d = c.shift(), e = c.join(":") || "";
                return e && (e = ", " + e), "filters." + d + "(" + a + e + ")"
            })
        }

        function e(a, b, c, d) {
            var e = b.split("\n"), f = Math.max(d - 3, 0), g = Math.min(e.length, d + 3), h = e.slice(f, g).map(function (a, b) {
                var c = b + f + 1;
                return (c == d ? " >> " : "    ") + c + "| " + a
            }).join("\n");
            throw a.path = c, a.message = (c || "ejs") + ":" + d + "\n" + h + "\n\n" + a.message, a
        }

        function f(a, b) {
            var c = k(i(b), a), d = j(a);
            return d || (c += ".ejs"), c
        }

        var g = c("./utils"), h = c("path"), i = h.dirname, j = h.extname, k = h.join, l = c("fs"), m = l.readFileSync, n = b.filters = c("./filters"), o = {};
        b.clearCache = function () {
            o = {}
        };
        var p = (b.parse = function (a, c) {
            var c = c || {}, e = c.open || b.open || "<%", g = c.close || b.close || "%>", h = c.filename, i = c.compileDebug !== !1, j = "";
            j += "var buf = [];", !1 !== c._with && (j += "\nwith (locals || {}) { (function(){ "), j += "\n buf.push('";
            for (var k = 1, l = !1, n = 0, o = a.length; o > n; ++n) {
                var p = a[n];
                if (a.slice(n, e.length + n) == e) {
                    n += e.length;
                    var q, r, s = (i ? "__stack.lineno=" : "") + k;
                    switch (a[n]) {
                        case"=":
                            q = "', escape((" + s + ", ", r = ")), '", ++n;
                            break;
                        case"-":
                            q = "', (" + s + ", ", r = "), '", ++n;
                            break;
                        default:
                            q = "');" + s + ";", r = "; buf.push('"
                    }
                    var t = a.indexOf(g, n), u = a.substring(n, t), v = n, w = null, x = 0;
                    if ("-" == u[u.length - 1] && (u = u.substring(0, u.length - 2), l = !0), 0 == u.trim().indexOf("include")) {
                        var y = u.trim().slice(7).trim();
                        if (!h)throw new Error("filename option is required for includes");
                        var z = f(y, h);
                        w = m(z, "utf8"), w = b.parse(w, {
                            filename: z,
                            _with: !1,
                            open: e,
                            close: g,
                            compileDebug: i
                        }), j += "' + (function(){" + w + "})() + '", u = ""
                    }
                    for (; ~(x = u.indexOf("\n", x));)x++, k++;
                    ":" == u.substr(0, 1) && (u = d(u)), u && (u.lastIndexOf("//") > u.lastIndexOf("\n") && (u += "\n"), j += q, j += u, j += r), n += t - v + g.length - 1
                } else"\\" == p ? j += "\\\\" : "'" == p ? j += "\\'" : "\r" == p || ("\n" == p ? l ? l = !1 : (j += "\\n", k++) : j += p)
            }
            return j += !1 !== c._with ? "'); })();\n} \nreturn buf.join('');" : "');\nreturn buf.join('');"
        }, b.compile = function (a, c) {
            c = c || {};
            var d = c.escape || g.escape, f = JSON.stringify(a), h = c.compileDebug !== !1, i = c.client, j = c.filename ? JSON.stringify(c.filename) : "undefined";
            a = h ? ["var __stack = { lineno: 1, input: " + f + ", filename: " + j + " };", e.toString(), "try {", b.parse(a, c), "} catch (err) {", "  rethrow(err, __stack.input, __stack.filename, __stack.lineno);", "}"].join("\n") : b.parse(a, c), c.debug && console.log(a), i && (a = "escape = escape || " + d.toString() + ";\n" + a);
            try {
                var k = new Function("locals, filters, escape, rethrow", a)
            } catch (l) {
                throw"SyntaxError" == l.name && (l.message += c.filename ? " in " + j : " while compiling ejs"), l
            }
            return i ? k : function (a) {
                return k.call(this, a, n, d, e)
            }
        });
        b.render = function (a, b) {
            var c, b = b || {};
            if (b.cache) {
                if (!b.filename)throw new Error('"cache" option requires "filename".');
                c = o[b.filename] || (o[b.filename] = p(a, b))
            } else c = p(a, b);
            return b.__proto__ = b.locals, c.call(b.scope, b)
        }, b.renderFile = function (a, c, d) {
            var e = a + ":string";
            "function" == typeof c && (d = c, c = {}), c.filename = a;
            var f;
            try {
                f = c.cache ? o[e] || (o[e] = m(a, "utf8")) : m(a, "utf8")
            } catch (g) {
                return void d(g)
            }
            d(null, b.render(f, c))
        }, b.__express = b.renderFile, c.extensions ? c.extensions[".ejs"] = function (a, b) {
            b = b || a.filename;
            var c = {filename: b, client: !0}, d = l.readFileSync(b).toString(), e = p(d, c);
            a._compile("module.exports = " + e.toString() + ";", b)
        } : c.registerExtension && c.registerExtension(".ejs", function (a) {
            return p(a, {})
        })
    }), a.register("filters.js", function (a, b, c) {
        b.first = function (a) {
            return a[0]
        }, b.last = function (a) {
            return a[a.length - 1]
        }, b.capitalize = function (a) {
            return a = String(a), a[0].toUpperCase() + a.substr(1, a.length)
        }, b.downcase = function (a) {
            return String(a).toLowerCase()
        }, b.upcase = function (a) {
            return String(a).toUpperCase()
        }, b.sort = function (a) {
            return Object.create(a).sort()
        }, b.sort_by = function (a, b) {
            return Object.create(a).sort(function (a, c) {
                return a = a[b], c = c[b], a > c ? 1 : c > a ? -1 : 0
            })
        }, b.size = b.length = function (a) {
            return a.length
        }, b.plus = function (a, b) {
            return Number(a) + Number(b)
        }, b.minus = function (a, b) {
            return Number(a) - Number(b)
        }, b.times = function (a, b) {
            return Number(a) * Number(b)
        }, b.divided_by = function (a, b) {
            return Number(a) / Number(b)
        }, b.join = function (a, b) {
            return a.join(b || ", ")
        }, b.truncate = function (a, b, c) {
            return a = String(a), a.length > b && (a = a.slice(0, b), c && (a += c)), a
        }, b.truncate_words = function (a, b) {
            var a = String(a), c = a.split(/ +/);
            return c.slice(0, b).join(" ")
        }, b.replace = function (a, b, c) {
            return String(a).replace(b, c || "")
        }, b.prepend = function (a, b) {
            return Array.isArray(a) ? [b].concat(a) : b + a
        }, b.append = function (a, b) {
            return Array.isArray(a) ? a.concat(b) : a + b
        }, b.map = function (a, b) {
            return a.map(function (a) {
                return a[b]
            })
        }, b.reverse = function (a) {
            return Array.isArray(a) ? a.reverse() : String(a).split("").reverse().join("")
        }, b.get = function (a, b) {
            return a[b]
        }, b.json = function (a) {
            return JSON.stringify(a)
        }
    }), a.register("utils.js", function (a, b, c) {
        b.escape = function (a) {
            return String(a).replace(/&(?!#?[a-zA-Z0-9]+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;")
        }
    }), a("ejs")
}(), !function (a) {
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
    a(document).ready(function () {
        var o, p, q, r, s = 0, t = 0;
        "MSGesture" in window && (l = new MSGesture, l.target = document.body), a(document).bind("MSGestureEnd", function (a) {
            var b = a.velocityX > 1 ? "Right" : a.velocityX < -1 ? "Left" : a.velocityY > 1 ? "Down" : a.velocityY < -1 ? "Up" : null;
            b && (m.el.trigger("swipe"), m.el.trigger("swipe" + b))
        }).on("touchstart MSPointerDown pointerdown", function (b) {
            (!(r = g(b, "down")) || f(b)) && (q = r ? b : b.touches[0], b.touches && 1 === b.touches.length && m.x2 && (m.x2 = void 0, m.y2 = void 0), o = Date.now(), p = o - (m.last || o), m.el = a("tagName" in q.target ? q.target : q.target.parentNode), h && clearTimeout(h), m.x1 = q.pageX, m.y1 = q.pageY, p > 0 && 250 >= p && (m.isDoubleTap = !0), m.last = o, k = setTimeout(c, n), l && r && l.addPointer(b.pointerId))
        }).on("touchmove MSPointerMove pointermove", function (a) {
            (!(r = g(a, "move")) || f(a)) && (q = r ? a : a.touches[0], d(), m.x2 = q.pageX, m.y2 = q.pageY, s += Math.abs(m.x1 - m.x2), t += Math.abs(m.y1 - m.y2))
        }).on("touchend MSPointerUp pointerup", function (c) {
            (!(r = g(c, "up")) || f(c)) && (d(), m.x2 && Math.abs(m.x1 - m.x2) > 30 || m.y2 && Math.abs(m.y1 - m.y2) > 30 ? j = setTimeout(function () {
                m.el.trigger("swipe"), m.el.trigger("swipe" + b(m.x1, m.x2, m.y1, m.y2)), m = {}
            }, 0) : "last" in m && (30 > s && 30 > t ? i = setTimeout(function () {
                var b = a.Event("tap");
                b.cancelTouch = e, m.el.trigger(b), m.isDoubleTap ? (m.el && m.el.trigger("doubleTap"), m = {}) : h = setTimeout(function () {
                    h = null, m.el && m.el.trigger("singleTap"), m = {}
                }, 250)
            }, 0) : m = {}), s = t = 0)
        }).on("touchcancel MSPointerCancel pointercancel", e), a(window).on("scroll", e)
    }), ["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"].forEach(function (b) {
        a.fn[b] = function (a) {
            return this.on(b, a)
        }
    })
}(Zepto);
var Utils = {};
Utils.String = {
    empty: "", length: function (a) {
        return a ? a.length : 0
    }, isBlank: function (a) {
        return 0 == this.length(a) || 0 == this.length(a.trims())
    }, isNotBlank: function (a) {
        return !this.isBlank(a)
    }, equals: function (a, b) {
        return a == b
    }, equalsIgnoreCase: function (a, b) {
        var c = this._hasnullorundifined(a, b);
        if (0 != c)return 1 == c ? !0 : !1;
        var d = a.toLowerCase(), e = b.toLowerCase();
        return this.equals(d, e)
    }, indexOf: function (a, b) {
        return 0 != this._hasnullorundifined(a, b) || "" == a && "" != b ? -1 : "" == b ? 0 : "" != a && "" != b ? a.indexOf(b) : void 0
    }, lastIndexOf: function (a, b) {
        return 0 != this._hasnullorundifined(a, b) || "" == a && "" != b ? -1 : "" == b ? 0 : "" != a && "" != b ? a.lastIndexOf(b) : void 0
    }, contains: function (a, b) {
        if (null == a || void 0 == a || "" == a)return !1;
        var c = a.indexOf(b);
        return c > -1 ? !0 : !1
    }, subStr: function (a, b, c) {
        if (null == a || void 0 == a)return null;
        if ("" == a)return "";
        if (0 == c)return "";
        var d = this.length(a);
        return void 0 == c && (c = d), a.substr(b, c)
    }, subString: function (a, b, c) {
        if (null == a || void 0 == a)return null;
        if ("" == a)return "";
        if (void 0 == c && (c = a.length), 0 >= c - b)return "";
        var d = c - b;
        return this.subStr(a, b, d)
    }, left: function (a, b) {
        if (null == a || void 0 == a)return null;
        if (0 >= b || "" == a)return "";
        var c = this.length(a);
        return b > c && (b = c), this.subString(a, 0, b)
    }, right: function (a, b) {
        if (null == a || void 0 == a)return null;
        if (0 >= b || "" == a)return "";
        var c = 0, d = this.length(a);
        return b > d ? b = d : c = d - b, this.subStr(a, c, b)
    }, split: function (a, b, c) {
        if (null == a && void 0 == a)return null;
        if ("" == a)return [];
        (void 0 == b || null == b) && (b = " ");
        var d = a.split(b);
        if (c) {
            var e = d.escape("");
            return e
        }
        return d
    }, replace: function (a, b, c) {
        return null == a && void 0 == a ? null : "" == a || null == c || void 0 == c ? a : void 0 == b || null == b || "" == b ? a : this.contains(c, b) ? a : a.replaceAll(b, c)
    }, startsWith: function (a, b) {
        return null == a && null == b || "" == a && "" == b ? !0 : null == a || void 0 == a || "" == a ? !1 : a.startWith(b)
    }, endsWith: function (a, b) {
        return null == a && null == b || "" == a && "" == b ? !0 : null == a || void 0 == a || "" == a ? !1 : a.endWith(b)
    }, onlyNullOrUndefined: function () {
        if (0 == arguments.length)return !0;
        for (var a = 0; a < arguments.length; a++)if (null != arguments[a] && void 0 != arguments[a])return !1;
        return !0
    }, _hasnullorundifined: function (a, b) {
        return null != a && void 0 != a || null != b && void 0 != b ? (null != a && void 0 != a || null == b || void 0 == b) && (null != b && void 0 != b || null == a || void 0 == a) ? 0 : -1 : 1
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
}, Utils.Date = {
    formater_long_normal1: "yyyy-MM-dd hh:mm:ss",
    formater_long_normal2: "yyyy/MM/dd hh:mm:ss",
    formater_long_cn_all: "yyyy年MM月dd日 hh时mm分ss秒",
    formater_short1: "yyyy-MM-dd",
    formater_short2: "yyyy/MM/dd",
    formater_shortcn: "yyyy年MM月dd日",
    formater_number_type: "yyyyMMddhhmmss",
    formater_long_normal3: "MM月dd日 hh:mm",
    now: function () {
        return new Date
    },
    parse: function (a, b) {
        if ((null == b || void 0 == b || "" == b) && (b = this.formater_long_normal1), a.length != b.length)return this.now();
        var c = {"y+": "", "M+": "", "d+": "", "h+": "", "m+": "", "s+": ""}, d = new Date(0);
        for (var e in c)if (new RegExp("(" + e + ")").test(b)) {
            var f = RegExp.$1, g = Utils.String.indexOf(b, f), h = Utils.String.subStr(a, g, f.length);
            c[e] = h
        }
        for (var i in c) {
            var j = parseInt(c[i], 10);
            switch (i) {
                case"y+":
                    d.setFullYear(j);
                    break;
                case"M+":
                    d.setMonth(j - 1);
                    break;
                case"d+":
                    d.setDate(j);
                    break;
                case"h+":
                    d.setHours(j);
                    break;
                case"m+":
                    d.setMinutes(j);
                    break;
                case"s+":
                    d.setSeconds(j)
            }
        }
        return d
    },
    addYears: function (a, b) {
        if (null != a && void 0 != a && "object" == typeof a) {
            var c = a.getFullYear();
            a.setFullYear(c + b)
        }
    },
    addMonths: function (a, b) {
        return null == a || void 0 == a || "object" != typeof a ? null : void a.setMonth(a.getMonth() + b)
    },
    addWeeks: function (a, b) {
        if (null == a || void 0 == a || "object" != typeof a)return null;
        var c = 7 * b;
        this.addDays(a, c)
    },
    addDays: function (a, b) {
        return null == a || void 0 == a || "object" != typeof a ? null : void a.setDate(a.getDate() + b)
    },
    addHours: function (a, b) {
        return null == a || void 0 == a || "object" != typeof a ? null : void a.setHours(a.getHours() + b)
    },
    addMinutes: function (a, b) {
        return null == a || void 0 == a || "object" != typeof a ? null : void a.setMinutes(a.getMinutes() + b)
    },
    addSeconds: function (a, b) {
        return null == a || void 0 == a || "object" != typeof a ? null : void a.setSeconds(a.getSeconds() + b)
    },
    addMilliseconds: function (a, b) {
        return null == a || void 0 == a || "object" != typeof a ? null : void a.setMilliseconds(a.getMilliseconds() + b)
    },
    getDateDesc: function (a) {
        var b = Utils.Date.parse(a);
        if (a && "Invalid Date" !== b.toString()) {
            var c = new Date, d = Utils.Date.format(c, "yyyy/MM/dd"), e = new Date(d), f = new Date(d), g = new Date(d), h = new Date(d);
            return Utils.Date.addDays(f, 1), Utils.Date.addDays(g, 2), Utils.Date.addDays(h, 3), b.getTime() >= e.getTime() && b.getTime() < f.getTime() ? "今日" : b.getTime() >= f.getTime() && b.getTime() < g.getTime() ? "明日" : b.getTime() >= g.getTime() && b.getTime() < h.getTime() ? "后日" : Utils.Date.format(b, "MM月dd日")
        }
    },
    isLeapYear: function (a) {
        if (null == a || void 0 == a || "object" != typeof a)return !1;
        var b = a.getFullYear();
        return b % 100 != 0 && b % 4 == 0 || b % 400 == 0
    },
    format: function (a, b) {
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
    },
    compare: function (a, b) {
        var c = this.format(a, this.formater_number_type), d = this.format(b, this.formater_number_type), e = c.toInt(), f = d.toInt(), g = e - f;
        return g > 0 ? 1 : 0 > g ? -1 : 0
    },
    getTime: function (a) {
        return this.parse(a).getTime()
    },
    completeDate: function (a, b) {
        if (void 0 == a || null == a || null == b)return a;
        var c = a.getMonth() + 1;
        c = c > 10 ? c : "0" + c;
        var d = a.getDate();
        d = d > 10 ? d : "0" + d;
        var e = a.getFullYear() + "-" + c + "-" + d + " " + b.trim() + ":00";
        return this.parse(e)
    }
};