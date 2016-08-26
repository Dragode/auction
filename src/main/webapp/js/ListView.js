function Adaptor(mData, viewList) {
    var _this = this;
    this.mData = mData;
    this.getCount = function () {
        return _this.mData.length
    };
    this.getData = function () {
        return _this.mData
    };
    this.setData = function (data) {
        _this.mData = data;
        _this.notifyDataSetChanged(!0)
    };
    this.addAll = function (datas) {
        $.each(datas, function (a, data) {
            _this.mData.push(data)
        });
        _this.notifyDataSetChanged()
    };
    this.add = function (data) {
        _this.mData.push(data);
        _this.notifyDataSetChanged()
    };
    this.renderView = function () {
    };
    this.viewList = viewList;
    for (var view in this.viewList) {
        this.viewList[view].viewType = view;
    }
    this.getViewType = function () {
        return ""
    }
}

function JsListView(listViewConfig, parentContainer) {
    "use strict";
    function getView(index) {
        var viewType = _this.adaptor.getViewType(index);
        if ("undefined" == typeof v[viewType])
            return void 0;
        var lastView = v[viewType].pop();
        return lastView && (lastView.style.display = ""), lastView
    }

    function d(a) {
        var b = a.viewType;
        a.style.display = "none",
        "undefined" == typeof v[b] && (v[b] = []),
            v[b].push(a)
    }

    function getPositionInfo() {
        if (hasDataToRecover === !1)
            return {top: 0, firstPosition: 0};
        hasDataToRecover = !1;
        var top = sessionStorage[id + "top"];
        if (void 0 !== top) {
            var firstPosition = sessionStorage[id + "firstPosition"];
            return delete sessionStorage[id + "top"],
                delete sessionStorage[id + "firstPosition"],
            {top: parseInt(top), firstPosition: parseInt(firstPosition)}
        } else {
            return {top: 0, firstPosition: 0}
        }
    }

    function f(a) {
        var b = _this.adaptor.viewList[a].cloneNode(!0);
        return b.viewType = a, b
    }

    function resolveValueOfDefault(value, defaultValue) {
        return "undefined" == typeof value ? defaultValue : value
    }

    function h(a) {
        return a.offsetTop + a.offsetHeight
    }

    function i(a) {
        return a[a.length - 1]
    }

    function j() {
        var a = i(viewDatas), b = F;
        for (a && (b = h(a)), y++; G + H > b && y <= _this.adaptor.getCount() - 1;) {
            var d;
            d = getView(y), "undefined" == typeof d && (d = f(_this.adaptor.getViewType(y)), listViewContainer.appendChild(d)), viewDatas.push(d), d.style.position = "absolute", d.style.top = b + "px", _this.adaptor.renderView(d, y), a = i(viewDatas), b = h(a), y++
        }
        y--, y > _this.adaptor.getCount() - 1 && (y = _this.adaptor.getCount() - 1);
        var e = b - G;
        if (0 > e)for (var g = 0; g < viewDatas.length; g++)viewDatas[g].style.top = -e + viewDatas[g].offsetTop + "px";
        return a
    }

    function k() {
        var a = viewDatas[0], b = G;
        for (a && (b = a.offsetTop), firstPosition--; b > F - H && firstPosition >= 0;) {
            var d = getView(firstPosition);
            "undefined" == typeof d && (d = f(_this.adaptor.getViewType(firstPosition)), listViewContainer.appendChild(d)), viewDatas.unshift(d), d.style.position = "absolute", _this.adaptor.renderView(d, firstPosition), d.style.top = b - d.offsetHeight + "px", a = viewDatas[0], b = a.offsetTop, firstPosition--
        }
        firstPosition++, 0 > firstPosition && (firstPosition = 0);
        var e = b - F;
        if (e > 0)for (var g = 0; g < viewDatas.length; g++)viewDatas[g].style.top = -e + viewDatas[g].offsetTop + "px";
        return a
    }

    function l(a) {
        if (0 != viewDatas.length) {
            var b,
                c = !1,
                e = !1;
            if (a > 0) {
                var f = viewDatas[0];
                if (0 == firstPosition) {
                    if (f.offsetTop === F)
                        return;
                    f.offsetTop + a > F && (c = !D, a = F - f.offsetTop)
                }
                for (var g = viewDatas.length - 1; g >= 0; g--)
                    b = viewDatas[g],
                        b.style.top = b.offsetTop + a + "px",
                    b.offsetTop > G + H && (d(viewDatas.pop()), y--);
                k(), j()
            } else if (0 > a) {
                var l = i(viewDatas);
                if (y === _this.adaptor.getCount() - 1) {
                    if (h(l) === G)return;
                    h(l) + a < G && (e = !E, a = G - h(l))
                }
                for (var g = 0; g < viewDatas.length; g++)
                    b = viewDatas[g],
                        b.style.top = b.offsetTop + a + "px",
                    h(b) < F - H && (d(viewDatas.shift()), g--, firstPosition++);
                j(),
                    k()
            }
            c === !0 ?
                (D = !0, _this.topListener && _this.topListener())
                :
            e === !0 && (E = !0, _this.bottomListener && _this.bottomListener()), a > 0 ? _this.downListener && _this.downListener(a, firstPosition, y) : -1e-10 > a && _this.upListener && _this.upListener(a, firstPosition, y), _this.onScroll && _this.onScroll(viewDatas, firstPosition, y)
        }
    }

    function handleTouchMoveEvent(a) {
        var b = a.touches[0], c = parseInt(b.pageY - C), d = parseInt(b.pageX - B);
        if (!(window.navigator.userAgent.match(/iphone os 7/gi) && d > 0 && Math.abs(c / d) < .5)) {
            if (config.distance = c, p(c, !1))return void(config.distance < 0 && a.preventDefault());
            a.preventDefault(), C = b.pageY, B = b.pageX, config._touchMove(c), l(c)
        }
    }

    function n() {
        config.endTime = Date.now();
        var a = config.endTime - config.startTime;
        if (config.currentVelocity * config.velocity > 0) {
            config.currentVelocity = config.velocity + config.accelerated * a;
            var b = .5 * (config.velocity + config.currentVelocity) * a;
            config.distance = parseInt(b - config.startPosition), config.velocity > 0 ? config.distance = config.distance > 0 ? config.distance : 0 : config.velocity < 0 && (config.distance = config.distance < 0 ? config.distance : 0), config.startPosition = b, o(config.distance) || q(config.distance) ? cancelAnimationFrame() : (l(config.distance), config.animation = requestAnimationFrame(n))
        } else cancelAnimationFrame()
    }

    function o() {
        if (0 === viewDatas.length)return !0;
        var a = i(viewDatas);
        return y === _this.adaptor.getCount() - 1 && h(a) === G ? !0 : !1
    }

    function p(a, b) {
        return a > 0 && q(0) ? (b === !0 && D === !1 && _this.topListener && _this.topListener(), !0) : 0 > a & o(0) ? (b === !0 && E === !1 && _this.bottomListener && _this.bottomListener(), !0) : !1
    }

    function q() {
        if (0 === viewDatas.length)return !0;
        var a = viewDatas[0];
        return 0 == firstPosition && a.offsetTop === F ? !0 : !1
    }

    function cancelAnimationFrameAndRest() {
        null != config.animation && (cancelAnimationFrame(config.animation), config.animation = null)
    }

    //初始化
    var listViewContainer = document.createElement("section");
    listViewContainer.setAttribute("id", resolveValueOfDefault(listViewConfig.id, "list-") + Math.floor(43114 * Math.random())),
        listViewContainer.style.position = resolveValueOfDefault(listViewConfig.position, "relative");
    listViewContainer.style.height = resolveValueOfDefault(listViewConfig.height, "100px");
    listViewContainer.style.width = resolveValueOfDefault(listViewConfig.width, "100px");
    listViewContainer.style.overflow = "hidden";
    parentContainer.appendChild(listViewContainer);

    var _this = this,
        offsetHeight = listViewContainer.offsetHeight,
        v = {},
        viewDatas = [],
        firstPosition = 0,
        y = 0;

    this.refreshView = function (a) {
        if ("undefined" != typeof a)
            a >= firstPosition && y >= a && _this.adaptor.renderView(viewDatas[a - firstPosition], a);
        else
            for (var b = 0; b < viewDatas.length; b++)
                _this.adaptor.renderView(viewDatas[b], firstPosition + b)
    };

    this.setAdaptor = function (adapterToSet) {
        function initListView(position) {
            var view,
                count = adapterToSet.getCount();
            if (position) {
                var h = position.top;
                firstPosition = position.firstPosition
            } else {
                var positionInfo = getPositionInfo(),
                    top = positionInfo.top;
                firstPosition = positionInfo.firstPosition
            }
            for (var index = firstPosition; offsetHeight > top && count > index;) {
                if (view = getView(index)
                        || f(adapterToSet.getViewType(index))) {
                    adapterToSet.renderView(view, index),
                        listViewContainer.appendChild(view),
                        view.style.position = "absolute",
                        view.style.top = top + "px",
                        top += view.offsetHeight,
                        viewDatas.push(view),
                        index++;
                }
            }
            y = firstPosition + viewDatas.length - 1
        }

        _this.adaptor = adapterToSet;
        adapterToSet.notifyDataSetChanged = function (ifReset) {
            if (0 === viewDatas.length || ifReset === !0) {
                viewDatas = [];
                v = {};
                listViewContainer.innerHTML = "";
                initListView();
            }
            l(-1e-10)
        };
        _this._initListView = initListView;
        initListView();
    };

    this.setSelection = function (firstPosition) {
        cancelAnimationFrameAndRest();
        for (var i = 0; i < viewDatas.length; i++) {
            viewDatas[i].style.top = G + "px";
            d(viewDatas[i]);
        }
        viewDatas = [];
        _this._initListView({top: 0, firstPosition: firstPosition})
    };

    var id = window.location.pathname.replace(/\//gi, "$").replace(".", "$");
    this.recoverLater = function (tag) {
        try {
            sessionStorage.testSupportStorage = !1
        } catch (exception) {
            return
        }
        var data = _this.adaptor.getData();
        data = JSON.stringify(data),
            sessionStorage[id] = "true",
            sessionStorage[id + "data"] = data,
            sessionStorage[id + "top"] = void 0 === viewDatas[0] ?
                0
                :
                viewDatas[0].offsetTop,
            sessionStorage[id + "firstPosition"] = firstPosition,
        void 0 !== tag && (sessionStorage[id + "tag"] = JSON.stringify(tag))
    };
    this.recoverData = function () {
        var data = JSON.parse(sessionStorage[id + "data"]);
        return delete sessionStorage[id + "data"], data
    };
    this.recoverTag = function () {
        var tag = JSON.parse(sessionStorage[id + "tag"]);
        return delete sessionStorage[id + "tag"], tag
    };
    var hasDataToRecover = !1;
    this.needRecover = function () {
        try {
            sessionStorage.testSupportStorage = !1
        } catch (exception) {
            return !1
        }
        var data = sessionStorage[id];
        return void 0 === data ? !1 : (hasDataToRecover = !0, delete sessionStorage[id], !0)
    };
    this.setHeight = function (height) {
        listViewConfig.height = height + "px";
        listViewContainer.style.height = resolveValueOfDefault(listViewConfig.height, "100px");
        F = 0;
        G = F + listViewContainer.offsetHeight;
        _this.adaptor.notifyDataSetChanged();
    };
    this.css = function (property, value) {
        return "undefined" == typeof value ?
            listViewContainer[property]
            :
            listViewContainer.style[property] = value
    };

    var B,
        C,
        D = !1,
        E = !1;
    listViewContainer.addEventListener("touchstart", function (event) {
        var b = event.touches[0];
        C = b.pageY,
            B = b.pageX,
        null != config.animation && event.stopPropagation(),
            cancelAnimationFrameAndRest(),
            config._touchStart(),
            D = !1,
            E = !1
    }, !0);
    listViewContainer.addEventListener("touchmove", handleTouchMoveEvent, !1);
    var F = 0,
        G = F + listViewContainer.offsetHeight,
        H = 0;
    listViewContainer.addEventListener("touchend", function () {
        if (!p(config.distance, !0)) {
            if (config.upTime < config.moveTime) {
                var a = config.upTime;
                config.upTime = config.moveTime, config.moveTime = a
            }
            if (config.velocity = config.distance / (config.upTime - config.moveTime), Math.abs(config.velocity) > config.velocityMinBase) {
                config.accelerated = config.velocity > 0 ? -config.flingAccelerated : config.flingAccelerated;
                var b = config.velocity + config.accelerated * (Date.now() - config.upTime) * config.timeFade;
                config.velocity = b * config.velocity <= 0 ? 0 : b
            }
            config.velocity = config.velocity / config.velocityFactor, Math.abs(config.velocity) < config.velocityMinBase || config.distance && 0 !== config.velocity && (config.velocity > config.velocityMaxBase ? config.velocity = config.velocityMaxBase : config.velocity < -config.velocityMaxBase && (config.velocity = -config.velocityMaxBase), config.currentVelocity = config.velocity, config.startTime = config.upTime, config.startPosition = 0, config.accelerated = config.velocity > 0 ? -config.flingAccelerated : config.flingAccelerated, config.animation = requestAnimationFrame(n))
        }
    }, !1);
    var requestAnimationFrame = function () {
        return window.requestAnimationFrame
            || window.webkitRequestAnimationFrame
            || window.mozRequestAnimationFrame
            || window.oRequestAnimationFrame
            || window.msRequestAnimationFrame
            || function (code) {
                return setTimeout(code, 1e3 / 60)
            }
    }();

    var cancelAnimationFrame = function () {
        return window.cancelAnimationFrame
            || window.webkitCancelAnimationFrame
            || window.cancelRequestAnimationFrame
            || window.webkitCancelRequestAnimationFrame
            || window.mozCancelRequestAnimationFrame
            || window.oCancelRequestAnimationFrame
            || window.msCancelRequestAnimationFrame
            || clearTimeout
    }();

    var config = {
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
        velocityMinBase: null !== window.navigator.userAgent.match(/iphone/gi) ? .2 : .2,
        flingAccelerated: null !== window.navigator.userAgent.match(/iphone/gi) ? .001 : .001,
        velocityFactor: null !== window.navigator.userAgent.match(/iphone/gi) ? 1.5 : 1.5,
        _touchMove: function (a) {
            config.distance = a,
                0 === config.count ?
                    (config.moveTime = Date.now(), config.count++)
                    :
                    (config.upTime = Date.now(), config.count = 0)
        },
        _touchStart: function () {
            config.count = 0,
                config.moveTime = Date.now(),
                config.count++
        }
    }
}

function Flow(a, b, c, d, e) {
    var f = [0];
    d.onScroll = function (d, g, h) {
        var i = g + 1;
        if (!(i > h)) {
            if (c.getViewType(i) === e) {
                var j = d[1];
                b.style.top = j.offsetTop > 0 && j.offsetTop < b.offsetHeight ? j.offsetTop - b.offsetHeight + "px" : "0px"
            } else if (c.getViewType(g) === e) {
                for (-1 === f.indexOf(g) && f.push(g); f.indexOf(g) < f.length - 1;)f.pop();
                b.style.top = "0px"
            }
            for (; g < f[f.length - 1];)f.pop();
            a && a(f[f.length - 1])
        }
    }
}