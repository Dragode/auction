!function (win, undef) {
    function compareVersion(a, b) {
        a = a.toString().split("."), b = b.toString().split(".");
        for (var c = 0; c < a.length || c < b.length; c++) {
            var d = parseInt(a[c], 10), e = parseInt(b[c], 10);
            if (window.isNaN(d) && (d = 0), window.isNaN(e) && (e = 0), e > d)return -1;
            if (d > e)return 1
        }
        return 0
    }

    function callback(a, b) {
        isAndroid && compareVersion(osVersion, "2.4.0") < 0 ? setTimeout(function () {
            a && a(b.value || b)
        }, 1) : a && a(b.value || b)
    }

    var doc = win.document, ua = win.navigator.userAgent, isIOS = /iPhone|iPad|iPod/i.test(ua), isAndroid = /Android/i.test(ua), isWindVane = /WindVane/i.test(ua), osVersion = ua.match(/(?:OS|Android)[\/\s](\d+[._]\d+(?:[._]\d+)?)/i), wvVersion = ua.match(/WindVane[\/\s](\d+[._]\d+[._]\d+)/), hasOwnProperty = Object.prototype.hasOwnProperty, WindVane = win.WindVane || (win.WindVane = {}), WindVane_Native = win.WindVane_Native, callbackMap = {}, inc = 1, iframePool = [], iframeLimit = 3, LOCAL_PROTOCOL = "hybrid", WV_PROTOCOL = "wv_hybrid", IFRAME_PREFIX = "iframe_", SUCCESS_PREFIX = "suc_", FAILURE_PREFIX = "err_", PARAM_PREFIX = "param_";
    osVersion = osVersion ? (osVersion[1] || "0.0.0").replace(/\_/g, ".") : "0.0.0", wvVersion = wvVersion ? (wvVersion[1] || "0.0.0").replace(/\_/g, ".") : "0.0.0";
    var WV_Core = {
        call: function (a, b, c, d, e, f) {
            var g;
            g = f > 0 ? setTimeout(function () {
                WV_Core.onFailure(g, {ret: "TIMEOUT"})
            }, f) : WV_Private.getSid(), WV_Private.registerCall(g, d, e), isAndroid ? compareVersion(wvVersion, "2.7.0") >= 0 ? WV_Private.callMethodByPrompt(a, b, WV_Private.buildParam(c), g + "") : WindVane_Native && WindVane_Native.callMethod && WindVane_Native.callMethod(a, b, WV_Private.buildParam(c), g + "") : isIOS && WV_Private.callMethodByIframe(a, b, WV_Private.buildParam(c), g + "")
        }, fireEvent: function (a, b) {
            var c = doc.createEvent("HTMLEvents");
            c.initEvent(a, !1, !0), c.param = WV_Private.parseParam(b), doc.dispatchEvent(c)
        }, getParam: function (a) {
            return WV_Private.params[PARAM_PREFIX + a] || ""
        }, onSuccess: function (a, b) {
            clearTimeout(a);
            var c = WV_Private.unregisterCall(a).success, d = WV_Private.parseParam(b);
            callback(c, d), WV_Private.onComplete(a)
        }, onFailure: function (a, b) {
            clearTimeout(a);
            var c = WV_Private.unregisterCall(a).failure, d = WV_Private.parseParam(b);
            callback(c, d), WV_Private.onComplete(a)
        }
    }, WV_Private = {
        params: {}, buildParam: function (a) {
            return a && "object" == typeof a ? JSON.stringify(a) : a || ""
        }, parseParam: function (str) {
            if (str && "string" == typeof str)try {
                obj = JSON.parse(str)
            } catch (e) {
                obj = eval("(" + str + ")")
            } else obj = str || {};
            return obj
        }, getSid: function () {
            return Math.floor(Math.random() * (1 << 50)) + "" + inc++
        }, registerCall: function (a, b, c) {
            b && (callbackMap[SUCCESS_PREFIX + a] = b), c && (callbackMap[FAILURE_PREFIX + a] = c)
        }, unregisterCall: function (a) {
            var b = SUCCESS_PREFIX + a, c = FAILURE_PREFIX + a, d = {success: callbackMap[b], failure: callbackMap[c]};
            return delete callbackMap[b], delete callbackMap[c], d
        }, useIframe: function (a, b) {
            var c = IFRAME_PREFIX + a, d = iframePool.pop();
            d || (d = doc.createElement("iframe"), d.setAttribute("frameborder", "0"), d.style.cssText = "width:0;height:0;border:0;display:none;"), d.setAttribute("id", c), d.setAttribute("src", b), d.parentNode || setTimeout(function () {
                doc.body.appendChild(d)
            }, 5)
        }, retrieveIframe: function (a) {
            var b = IFRAME_PREFIX + a, c = doc.querySelector("#" + b);
            iframePool.length >= iframeLimit ? doc.body.removeChild(c) : iframePool.push(c)
        }, callMethodByIframe: function (a, b, c, d) {
            var e = LOCAL_PROTOCOL + "://" + a + ":" + d + "/" + b + "?" + c;
            this.params[PARAM_PREFIX + d] = c, this.useIframe(d, e)
        }, callMethodByPrompt: function (a, b, c, d) {
            var e = LOCAL_PROTOCOL + "://" + a + ":" + d + "/" + b + "?" + c, f = WV_PROTOCOL + ":";
            this.params[PARAM_PREFIX + d] = c, window.prompt(e, f)
        }, onComplete: function (a) {
            isIOS && this.retrieveIframe(a), delete this.params[PARAM_PREFIX + a]
        }
    };
    for (var key in WV_Core)hasOwnProperty.call(WindVane, key) || (WindVane[key] = WV_Core[key])
}(window);
!function (a, b) {
    function c(a) {
        return function (b) {
            a && a(b)
        }
    }

    function d(a) {
        return function (b) {
            a && a(b)
        }
    }

    function e(a, b) {
        for (var c = 0; c < a.length; c++)if (b === a[c])return c;
        return -1
    }

    if (b) {
        var f = a.document;
        if (b.api = {}, b.api.base = function () {
                return {
                    isWindVaneEnvironment: function () {
                        return a.navigator.userAgent.match(/WindVane/i) ? !0 : !1
                    }, isWindVaneSDK: function (a, e) {
                        b.call("Base", "isWindVaneSDK", "", c(a), d(e), 500)
                    }, plusUT: function (a, e, f) {
                        b.call("Base", "plusUT", JSON.stringify(f), c(a), d(e))
                    }, showShareMenu: function (a, e, f) {
                        b.call("TBSharedModule", "showSharedMenu", JSON.stringify(f), c(a), d(e))
                    }, getDeviceInfo: function (a, e) {
                        b.call("TBDeviceInfo", "getInfo", "", c(a), d(e))
                    }
                }
            }(), b.api.shake = function () {
                var g, h = [];
                return f.addEventListener("motion.shake", function (b) {
                    h.forEach(function (c) {
                        a.clearTimeout(g), c(b)
                    })
                }, !1), {
                    startWatch: function (f, i, j) {
                        if (0 === h.length) {
                            var k = {on: !0};
                            b.call("WVMotion", "listeningShake", k, c(), d(i))
                        }
                        e(h, f) < 0 && h.push(f), j && j.timeout && 0 < j.timeout && (a.clearTimeout(g), g = a.setTimeout(i, j.timeout))
                    }, stopWatch: function (a, f, g) {
                        if (g) {
                            var i;
                            (i = e(h, g)) >= 0 && h.splice(i, 1)
                        } else h = [];
                        if (0 === h.length) {
                            var j = {on: !1};
                            b.call("WVMotion", "listeningShake", j, c(a), d(f))
                        }
                    }
                }
            }(), b.api.geolocation = function () {
                var e;
                return {
                    get: function (a, c, e) {
                        b.call("WVLocation", "getLocation", JSON.stringify(e), function (b) {
                            if (b && !b.coords && b.lat && b.lon) {
                                var c = {coords: {longitude: b.lon, latitude: b.lat}};
                                a(c)
                            } else a(b)
                        }, d(c))
                    }, search: function (a, e, f) {
                        b.call("WVLocation", "searchLocation", JSON.stringify(f), c(a), d(e))
                    }, watch: function (b, c, d) {
                        var f = 500;
                        d && d.frequence && f < d.frequence && (f = d.frequence), a.clearInterval(e);
                        var g, h = this, i = !0, j = !1;
                        return e = a.setInterval(function () {
                            (i || j) && h.get(function (a) {
                                j = !0, i = !1, g && g.coords.longitude == a.coords.longitude && g.coords.latitude == a.coords.latitude || (g = a, b(a))
                            }, function (a) {
                                c(a)
                            }, d)
                        }, f)
                    }, clear: function (b) {
                        a.clearInterval(b)
                    }
                }
            }(), b.api.cookies = function () {
                return {
                    read: function (a, e) {
                        var f = {url: a};
                        b.call("WVCookie", "readCookies", f, c(e), d())
                    }, write: function (a, e, f, g) {
                        3 === arguments.length && "function" == typeof arguments[2] && (g = arguments[2], f = {});
                        var h = {name: a, value: e};
                        for (var i in f)h[i] = f[i];
                        b.call("WVCookie", "writeCookies", h, c(g), d())
                    }
                }
            }(), b.api.weburl = function () {
                return {
                    intercept: function (a, e, f) {
                        var g = {url: f};
                        b.call("WVWebUrl", "intercept", g, c(a), d(e))
                    }
                }
            }(), b.api.server = function () {
                return {
                    send: function (a, e, f) {
                        b.call("WVServer", "send", JSON.stringify(f), c(a), d(e))
                    }
                }
            }(), b.api.blow = function () {
                function a(a) {
                    c && c(a.param)
                }

                var c, e = !1;
                return {
                    listenBlow: function (g, h, i) {
                        c = i, e || b.call("WVMotion", "listenBlow", "", function (b) {
                            e = !0, g && g(b), f.addEventListener("motion.blow", a, !1)
                        }, d(h))
                    }, stopListenBlow: function (c, g) {
                        e && b.call("WVMotion", "stopListenBlow", "", function (b) {
                            e = !1, c && c(b), f.removeEventListener("motion.blow", a)
                        }, d(g))
                    }
                }
            }(), b.api.camera = function () {
                return {
                    takePhoto: function (a, e, f) {
                        b.call("WVCamera", "takePhoto", f, c(a), d(e))
                    }, confirmUploadPhoto: function (a, e, f) {
                        b.call("WVCamera", "confirmUploadPhoto", f, c(a), d(e))
                    }
                }
            }(), b.api.base.isWindVaneEnvironment()) {
            var g = a.navigator.geolocation;
            g.getCurrentPosition = function (a, c, d) {
                b.api.geolocation.get(a, c, d)
            }, g.watchPosition = function (a, c, d) {
                return b.api.geolocation.watch(a, c, d)
            }, g.clearWatch = function (a) {
                b.api.geolocation.clear(a)
            }, g.searchPosition = function (a, c, d) {
                b.api.geolocation.search(a, c, d)
            }
        }
    }
}(window, window.WindVane);