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
        if ("undefined" == typeof viewMap[viewType]) {
            return void 0;
        }
        var lastView = viewMap[viewType].pop();
        if (lastView) {
            lastView.style.display = "";
        }
        return lastView;
    }

    function addView(view) {
        var viewType = view.viewType;
        view.style.display = "none";
        if ("undefined" == typeof viewMap[viewType]) {
            viewMap[viewType] = [];
        }
        viewMap[viewType].push(view);
    }

    function getPositionInfo() {
        if (hasDataToRecover === !1) {
            return {top: 0, firstPosition: 0};
        }
        hasDataToRecover = !1;
        var top = sessionStorage[id + "top"];
        if (void 0 !== top) {
            var firstPosition = sessionStorage[id + "firstPosition"];
            delete sessionStorage[id + "top"];
            delete sessionStorage[id + "firstPosition"];
            return {top: parseInt(top), firstPosition: parseInt(firstPosition)};
        } else {
            return {top: 0, firstPosition: 0};
        }
    }

    function getViewByViewType(viewType) {
        var views = _this.adaptor.viewList[viewType].cloneNode(!0);
        views.viewType = viewType;
        return views;
    }

    function resolveValueOfDefault(value, defaultValue) {
        return "undefined" == typeof value ? defaultValue : value
    }

    function h(a) {
        return a.offsetTop + a.offsetHeight
    }

    function pop(array) {
        return array[array.length - 1]
    }

    function j() {
        var lastView = pop(viewDatas),
            b = F;
        for (lastView && (b = h(lastView)), y++; G + H > b && y <= _this.adaptor.getCount() - 1;) {
            var d;
            d = getView(y),
            "undefined" == typeof d && (d = getViewByViewType(_this.adaptor.getViewType(y)), listViewContainer.appendChild(d)),
                viewDatas.push(d),
                d.style.position = "absolute",
                d.style.top = b + "px",
                _this.adaptor.renderView(d, y),
                lastView = pop(viewDatas),
                b = h(lastView),
                y++
        }
        y--,
        y > _this.adaptor.getCount() - 1 && (y = _this.adaptor.getCount() - 1);
        var e = b - G;
        if (0 > e)
            for (var g = 0; g < viewDatas.length; g++)
                viewDatas[g].style.top = -e + viewDatas[g].offsetTop + "px";
        return lastView
    }

    function k() {
        var firstView = viewDatas[0], b = G;
        for (firstView && (b = firstView.offsetTop), firstPosition--; b > F - H && firstPosition >= 0;) {
            var view = getView(firstPosition);
            "undefined" == typeof view && (view = getViewByViewType(_this.adaptor.getViewType(firstPosition)), listViewContainer.appendChild(view)), viewDatas.unshift(view), view.style.position = "absolute", _this.adaptor.renderView(view, firstPosition), view.style.top = b - view.offsetHeight + "px", firstView = viewDatas[0], b = firstView.offsetTop, firstPosition--
        }
        firstPosition++, 0 > firstPosition && (firstPosition = 0);
        var e = b - F;
        if (e > 0)for (var g = 0; g < viewDatas.length; g++)viewDatas[g].style.top = -e + viewDatas[g].offsetTop + "px";
        return firstView
    }

    function l(yMoveDistance) {
        if (0 != viewDatas.length) {
            var view,
                triggerTopListener = !1,
                triggerBottoemListener = !1;
            if (yMoveDistance > 0) {
                var firstView = viewDatas[0];
                if (0 == firstPosition) {
                    if (firstView.offsetTop === F) {
                        return;
                    }
                    if (firstView.offsetTop + yMoveDistance > F) {
                        triggerTopListener = !NotTriggerTopListener, yMoveDistance = F - firstView.offsetTop
                    }
                }
                for (var i = viewDatas.length - 1; i >= 0; i--) {
                    view = viewDatas[i];
                    view.style.top = view.offsetTop + yMoveDistance + "px";
                    if (view.offsetTop > G + H) {
                        addView(viewDatas.pop());
                        y--;
                    }
                }
                k();
                j();
            } else if (0 > yMoveDistance) {
                var lastView = pop(viewDatas);
                if (y === _this.adaptor.getCount() - 1) {
                    if (h(lastView) === G) {
                        return;
                    }
                    if (h(lastView) + yMoveDistance < G) {
                        triggerBottoemListener = !NotTriggerBottoemListener, yMoveDistance = G - h(lastView)
                    }
                }
                for (var g = 0; g < viewDatas.length; g++) {
                    view = viewDatas[g];
                    view.style.top = view.offsetTop + yMoveDistance + "px";
                    if (h(view) < F - H) {
                        addView(viewDatas.shift());
                        g--;
                        firstPosition++;
                    }
                }
                j();
                k();
            }
            triggerTopListener === !0 ?
                (NotTriggerTopListener = !0, _this.topListener && _this.topListener())
                :
            triggerBottoemListener === !0 && (NotTriggerBottoemListener = !0, _this.bottomListener && _this.bottomListener()), yMoveDistance > 0 ? _this.downListener && _this.downListener(yMoveDistance, firstPosition, y) : -1e-10 > yMoveDistance && _this.upListener && _this.upListener(yMoveDistance, firstPosition, y), _this.onScroll && _this.onScroll(viewDatas, firstPosition, y)
        }
    }

    function n() {
        touchData.endTime = Date.now();
        var touchTime = touchData.endTime - touchData.startTime;
        if (touchData.currentVelocity * touchData.velocity > 0) {
            touchData.currentVelocity = touchData.velocity + touchData.accelerated * touchTime;
            var b = .5 * (touchData.velocity + touchData.currentVelocity) * touchTime;
            touchData.distance = parseInt(b - touchData.startPosition),
                touchData.velocity > 0 ? touchData.distance = touchData.distance > 0 ? touchData.distance : 0 : touchData.velocity < 0 && (touchData.distance = touchData.distance < 0 ? touchData.distance : 0),
                touchData.startPosition = b,
                atListViewBottom(touchData.distance) || atListViewTop(touchData.distance) ? cancelAnimationFrame() : (l(touchData.distance), touchData.animation = requestAnimationFrame(n))
        } else
            cancelAnimationFrame()
    }

    function cancelAnimationFrameAndRest() {
        null != touchData.animation && (cancelAnimationFrame(touchData.animation), touchData.animation = null)
    }

    //初始化
    var listViewContainer = document.createElement("section");
    listViewContainer.setAttribute("id", resolveValueOfDefault(listViewConfig.id, "list-") + Math.floor(43114 * Math.random()));
    listViewContainer.style.position = resolveValueOfDefault(listViewConfig.position, "relative");
    listViewContainer.style.height = resolveValueOfDefault(listViewConfig.height, "100px");
    listViewContainer.style.width = resolveValueOfDefault(listViewConfig.width, "100px");
    listViewContainer.style.overflow = "hidden";
    parentContainer.appendChild(listViewContainer);

    var _this = this,
        offsetHeight = listViewContainer.offsetHeight,
        viewMap = {},
        viewDatas = [],
        firstPosition = 0,
        y = 0;//bottom?

    /**
     * 刷新
     * @param position 要刷新的位置
     */
    this.refreshView = function (position) {
        if ("undefined" != typeof position) {
            if (position >= firstPosition && y >= position) {
                _this.adaptor.renderView(viewDatas[position - firstPosition], position);
            } else {
                for (var i = 0; i < viewDatas.length; i++) {
                    _this.adaptor.renderView(viewDatas[i], firstPosition + i)
                }
            }
        }
    };

    /**
     * 设置Adapter
     * @param adapterToSet
     */
    this.setAdaptor = function (adapterToSet) {
        function initListView(positionInfo) {
            var view,
                count = adapterToSet.getCount();
            if (positionInfo) {
                var top = positionInfo.top;
                firstPosition = positionInfo.firstPosition;
            } else {
                var positionInfo = getPositionInfo(),
                    top = positionInfo.top;
                firstPosition = positionInfo.firstPosition
            }
            for (var index = firstPosition; top < offsetHeight && index < count;) {
                if (view = getView(index)
                        || getViewByViewType(adapterToSet.getViewType(index))) {
                    adapterToSet.renderView(view, index);
                    listViewContainer.appendChild(view);
                    view.style.position = "absolute";
                    view.style.top = top + "px";
                    top += view.offsetHeight;
                    viewDatas.push(view);
                    index++;
                }
            }
            y = firstPosition + viewDatas.length - 1
        }

        _this.adaptor = adapterToSet;
        adapterToSet.notifyDataSetChanged = function (ifReset) {
            if (0 === viewDatas.length || ifReset === !0) {
                viewDatas = [];
                viewMap = {};
                listViewContainer.innerHTML = "";
                initListView();
            }
            l(-1e-10);
        };
        _this._initListView = initListView;
        initListView();
    };

    this.setSelection = function (firstPosition) {
        cancelAnimationFrameAndRest();
        for (var i = 0; i < viewDatas.length; i++) {
            viewDatas[i].style.top = G + "px";
            addView(viewDatas[i]);
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
        return "undefined" == typeof value ? listViewContainer[property] : listViewContainer.style[property] = value;
    };

    var touchPageX,
        touchPageY,
        NotTriggerTopListener = !1,
        NotTriggerBottoemListener = !1;

    listViewContainer.addEventListener("touchstart", function (event) {
        var touch = event.touches[0];
        touchPageY = touch.pageY;
        touchPageX = touch.pageX;
        if (null != touchData.animation) {
            event.stopPropagation();
            cancelAnimationFrameAndRest();
            touchData._touchStart();
            NotTriggerTopListener = !1;
            NotTriggerBottoemListener = !1;
        }
    }, !0);

    /**
     * 判断是否达到ListView顶部或底部
     * @param distance touch Y方向的位移
     * @param triggerEvent 是否出发顶部、底部事件
     * @returns {boolean}
     */
    function ifReachTopOrBottom(distance, triggerEvent) {
        if (distance > 0 && atListViewTop(0)) {
            if (triggerEvent === !0 && NotTriggerTopListener === !1) {
                _this.topListener && _this.topListener();
            }
            return !0;
        } else if (0 > distance && atListViewBottom(0)) {
            if (triggerEvent === !0 && NotTriggerBottoemListener === !1) {
                _this.bottomListener && _this.bottomListener();
            }
            return !0;
        } else {
            return !1;
        }
    }

    /**
     * 判断是否到达ListView顶部
     * @returns {boolean}
     */
    function atListViewTop() {
        if (0 === viewDatas.length) {
            return !0;
        }
        var firstView = viewDatas[0];
        return 0 == firstPosition && firstView.offsetTop === F ? !0 : !1
    }

    /**
     * 判断是否到达ListView底部
     * @returns {boolean}
     */
    function atListViewBottom() {
        if (0 === viewDatas.length) {
            return !0;
        }
        var lastView = pop(viewDatas);
        return y === _this.adaptor.getCount() - 1 && h(lastView) === G ? !0 : !1
    }

    listViewContainer.addEventListener("touchmove", function (event) {
        var touch = event.touches[0],
            yMoveDistance = parseInt(touch.pageY - touchPageY),
            xMoveDistance = parseInt(touch.pageX - touchPageX);
        if (!(window.navigator.userAgent.match(/iphone os 7/gi) && xMoveDistance > 0 && Math.abs(yMoveDistance / xMoveDistance) < .5)) {
            if (touchData.distance = yMoveDistance, ifReachTopOrBottom(yMoveDistance, !1)) {
                return void(touchData.distance < 0 && event.preventDefault());
            }
            event.preventDefault();
            touchPageY = touch.pageY;
            touchPageX = touch.pageX;
            touchData._touchMove(yMoveDistance);
            l(yMoveDistance)
        }
    }, !1);

    var F = 0,
        G = F + listViewContainer.offsetHeight,
        H = 0;
    listViewContainer.addEventListener("touchend", function () {
        if (!ifReachTopOrBottom(touchData.distance, !0)) {
            if (touchData.upTime < touchData.moveTime) {
                var upTime = touchData.upTime;
                touchData.upTime = touchData.moveTime;
                touchData.moveTime = upTime
            }
            if (touchData.velocity = touchData.distance / (touchData.upTime - touchData.moveTime), Math.abs(touchData.velocity) > touchData.velocityMinBase) {
                touchData.accelerated = touchData.velocity > 0 ? -touchData.flingAccelerated : touchData.flingAccelerated;
                var b = touchData.velocity + touchData.accelerated * (Date.now() - touchData.upTime) * touchData.timeFade;
                touchData.velocity = b * touchData.velocity <= 0 ? 0 : b
            }
            touchData.velocity = touchData.velocity / touchData.velocityFactor,
            Math.abs(touchData.velocity) < touchData.velocityMinBase || touchData.distance
            && 0 !== touchData.velocity
            && (touchData.velocity > touchData.velocityMaxBase ?
                touchData.velocity = touchData.velocityMaxBase
                :
            touchData.velocity < -touchData.velocityMaxBase
            && (touchData.velocity = -touchData.velocityMaxBase),
                touchData.currentVelocity = touchData.velocity,
                touchData.startTime = touchData.upTime,
                touchData.startPosition = 0,
                touchData.accelerated = touchData.velocity > 0 ? -touchData.flingAccelerated : touchData.flingAccelerated,
                touchData.animation = requestAnimationFrame(n))
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

    var touchData = {
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
        _touchStart: function () {
            touchData.count = 0;
            touchData.moveTime = Date.now();
            touchData.count++;
        },
        _touchMove: function (yMoveDistance) {
            touchData.distance = yMoveDistance,
                0 === touchData.count ?
                    (touchData.moveTime = Date.now(), touchData.count++)
                    :
                    (touchData.upTime = Date.now(), touchData.count = 0)
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