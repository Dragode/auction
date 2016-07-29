!function (a, b) {
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
        return d ? (setTimeout(function () {
            q(a, b)
        }, 1), void 0) : (a.onload = a.onerror = a.onreadystatechange = function () {
            W.test(a.readyState) && (a.onload = a.onerror = a.onreadystatechange = null, c || v.debug || T.removeChild(a), a = null, b())
        }, void 0)
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
        }, G = /[^?#]*\//, H = /\/\.\//g, I = /\/[^/]+\/\.\.\//, J = /^([^/:]+)(\/.+)$/, K = /{([^{]+)}/g, L = /^\/\/.|:\//, M = /^.*?\/\/.*?\//, N = document, O = location, P = e(O.href), Q = N.getElementsByTagName("script"), R = N.getElementById("seajsnode") || Q[Q.length - 1], S = e(n(R) || P), T = N.getElementsByTagName("head")[0] || N.documentElement, U = T.getElementsByTagName("base")[0], V = /\.css(?:\?|$)/i, W = /^(?:loaded|complete|undefined)$/, X = 1 * navigator.userAgent.replace(/.*AppleWebKit\/(\d+)\..*/, "$1") < 536, Y = /"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g, Z = /\\\\/g, $ = u.cache = {}, _ = {}, ab = {}, bb = {}, cb = t.STATUS = {
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
            if (!(a.status >= cb.LOADING)) {
                a.status = cb.LOADING;
                var b = a.resolve();
                F("load", b);
                for (var c, d = a._remain = b.length, e = 0; d > e; e++)c = t.get(b[e]), c.status < cb.LOADED ? c._waitings[a.uri] = (c._waitings[a.uri] || 0) + 1 : a._remain--;
                if (0 === a._remain)return a.onload(), void 0;
                var f = {};
                for (e = 0; d > e; e++)c = $[b[e]], c.status < cb.FETCHING ? c.fetch(f) : c.status === cb.SAVED && c.load();
                for (var g in f)f.hasOwnProperty(g) && f[g]()
            }
        }, t.prototype.onload = function () {
            var a = this;
            a.status = cb.LOADED, a.callback && a.callback();
            var b, c, d = a._waitings;
            for (b in d)d.hasOwnProperty(b) && (c = $[b], c._remain -= d[b], 0 === c._remain && c.onload());
            delete a._waitings, delete a._remain
        }, t.prototype.fetch = function (a) {
            function b() {
                o(f.requestUri, f.onRequest, f.charset)
            }

            function c() {
                delete _[g], ab[g] = !0, E && (t.save(e, E), E = null);
                var a, b = bb[g];
                for (delete bb[g]; a = b.shift();)a.load()
            }

            var d = this, e = d.uri;
            d.status = cb.FETCHING;
            var f = {uri: e};
            F("fetch", f);
            var g = f.requestUri || e;
            return !g || ab[g] ? (d.load(), void 0) : _[g] ? (bb[g].push(d), void 0) : (_[g] = !0, bb[g] = [d], F("request", f = {
                uri: e,
                requestUri: g,
                onRequest: c,
                charset: v.charset
            }), f.requested || (a ? a[f.requestUri] = b : b()), void 0)
        }, t.prototype.exec = function () {
            function a(b) {
                return t.get(a.resolve(b)).exec()
            }

            var c = this;
            if (c.status >= cb.EXECUTING)return c.exports;
            c.status = cb.EXECUTING;
            var e = c.uri;
            a.resolve = function (a) {
                return t.resolve(a, e)
            }, a.async = function (b, c) {
                return t.use(b, c, e + "_async_" + d()), a
            };
            var f = c.factory, g = z(f) ? f(a, c.exports = {}, c) : f;
            return g === b && (g = c.exports), null !== g || V.test(e) || F("error", c), delete c.factory, c.exports = g, c.status = cb.EXECUTED, F("exec", c), g
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
            c.status < cb.SAVED && (c.id = b.id || a, c.dependencies = b.deps || [], c.factory = b.factory, c.status = cb.SAVED)
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
        }, t.define.cmd = {}, a.define = t.define, u.Module = t, v.fetchedList = ab, v.cid = d, u.resolve = m, u.require = function (a) {
            return ($[t.resolve(a)] || {}).exports
        };
        var db = /^(.+?\/)(\?\?)?(seajs\/)+/;
        v.base = (S.match(db) || ["", S])[1], v.dir = S, v.cwd = P, v.charset = "utf-8", v.preload = function () {
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
}(this);