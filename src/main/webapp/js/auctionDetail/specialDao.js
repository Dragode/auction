!function (zepto, window) {
    define("specialDao", function (require, exports, module) {
        function getList(callBack, b) {
            f(callBack, b, i())
        }

        function f(callBack, c, d) {
            zepto().toastUtil.showLoading();
            var mockRespons = {
                "api": "mtop.taobao.paimai.getAlbumInfoByIdV3",
                "v": "1.0",
                "ret": [
                    "SUCCESS::调用成功"
                ],
                "data": {
                    "firstPageNum": "1",
                    "pageNum": "1",
                    "pageSize": "40",
                    "totalCount": "44",
                    "nextPage": "true",
                    "items": [
                        {
                            "id": "535402722149",
                            "title": "收藏品 油润通透 精雕饱满印尼金田黄挂件【仙桃祝寿】雕工精细",
                            "pic": "//img.alicdn.com/bao/uploaded/i4/2738770841/TB24dFKsFXXXXXZXXXXXXXXXXXX_!!0-paimai.jpg",
                            "price": "1000",
                            "bidCnt": "0",
                            "startTime": "2016-08-05 09:00:00",
                            "endTime": "2016-08-05 21:00:00",
                            "playSituation": "oa",
                            "quantity": "1",
                            "delayTimes": "0",
                            "seer": "99",
                            "startTimeLong": "1470358800000",
                            "endTimeLong": "1470402000000",
                            "status": "0",
                            "tbpType": "0",
                            "index": "0",
                            "bypass": "false",
                            "foregiftPayMode": "0"
                        },
                        {
                            "id": "535956180632",
                            "title": "细腻油滑 色泽鲜艳 正宗印尼金冻石雕件【富贵荣归】造型逼真",
                            "pic": "//img.alicdn.com/bao/uploaded/i1/2738770841/TB2dSKwtXXXXXcdXXXXXXXXXXXX_!!0-paimai.jpg",
                            "price": "1000",
                            "bidCnt": "0",
                            "startTime": "2016-08-05 09:00:00",
                            "endTime": "2016-08-05 21:00:00",
                            "playSituation": "oa",
                            "quantity": "1",
                            "delayTimes": "0",
                            "seer": "7",
                            "startTimeLong": "1470358800000",
                            "endTimeLong": "1470402000000",
                            "status": "0",
                            "tbpType": "0",
                            "index": "0",
                            "bypass": "false",
                            "foregiftPayMode": "0"
                        },
                        {
                            "id": "534872478216",
                            "title": "晶莹剔透印尼金冻石貔貅把玩件线条简约洗练【福财貔貅】寓意好",
                            "pic": "//img.alicdn.com/bao/uploaded/i2/2738770841/TB2KDJuspXXXXXFXpXXXXXXXXXX_!!0-paimai.jpg",
                            "price": "1000",
                            "bidCnt": "0",
                            "startTime": "2016-08-05 09:00:00",
                            "endTime": "2016-08-05 21:00:00",
                            "playSituation": "oa",
                            "quantity": "1",
                            "delayTimes": "0",
                            "seer": "5",
                            "startTimeLong": "1470358800000",
                            "endTimeLong": "1470402000000",
                            "status": "0",
                            "tbpType": "0",
                            "index": "0",
                            "bypass": "false",
                            "foregiftPayMode": "0"
                        },
                        {
                            "id": "535954484299",
                            "title": "圆润华美 色泽诱人 精品印尼金冻石把玩件【太平有象】雕工精细",
                            "pic": "//img.alicdn.com/bao/uploaded/i4/2738770841/TB2NNCxtXXXXXbGXXXXXXXXXXXX_!!0-paimai.jpg",
                            "price": "1000",
                            "bidCnt": "0",
                            "startTime": "2016-08-05 09:00:00",
                            "endTime": "2016-08-05 21:00:00",
                            "playSituation": "oa",
                            "quantity": "1",
                            "delayTimes": "0",
                            "seer": "10",
                            "startTimeLong": "1470358800000",
                            "endTimeLong": "1470402000000",
                            "status": "0",
                            "tbpType": "0",
                            "index": "0",
                            "bypass": "false",
                            "foregiftPayMode": "0"
                        },
                        {
                            "id": "535966437645",
                            "title": "纯天然印尼金冻石 油润通透带皮摆件【长眉罗汉】雕工细腻生动",
                            "pic": "//img.alicdn.com/bao/uploaded/i1/2738770841/TB29BPbtXXXXXcCXXXXXXXXXXXX_!!0-paimai.jpg",
                            "price": "2500",
                            "bidCnt": "0",
                            "startTime": "2016-08-05 09:00:00",
                            "endTime": "2016-08-05 21:00:00",
                            "playSituation": "oa",
                            "quantity": "1",
                            "delayTimes": "0",
                            "seer": "5",
                            "startTimeLong": "1470358800000",
                            "endTimeLong": "1470402000000",
                            "status": "0",
                            "tbpType": "0",
                            "index": "0",
                            "bypass": "false",
                            "foregiftPayMode": "0"
                        },
                        {
                            "id": "536005500271",
                            "title": "晶莹滋润 质地温润凝结 装饰品正品天然印尼金冻石【福寿绵长】",
                            "pic": "//img.alicdn.com/bao/uploaded/i1/2738770841/TB29ZjhtXXXXXcQXXXXXXXXXXXX_!!0-paimai.jpg",
                            "price": "2500",
                            "bidCnt": "0",
                            "startTime": "2016-08-05 09:00:00",
                            "endTime": "2016-08-05 21:00:00",
                            "playSituation": "oa",
                            "quantity": "1",
                            "delayTimes": "0",
                            "seer": "5",
                            "startTimeLong": "1470358800000",
                            "endTimeLong": "1470402000000",
                            "status": "0",
                            "tbpType": "0",
                            "index": "0",
                            "bypass": "false",
                            "foregiftPayMode": "0"
                        }
                    ],
                    "serverTimeLong": "1470146978",
                    "albumId": "72990705",
                    "title": "莆田雕刻之印尼金田黄第十一期",
                    "startTime": "2016-08-05 09:00:00",
                    "endTime": "2016-08-05 21:00:00",
                    "sellerNick": "莆田市雕刻商会",
                    "picUrl": "//img.alicdn.com/bao/uploaded/i4/2738770841/TB2TyFytFXXXXcbXpXXXXXXXXXX_!!0-paimai.jpg",
                    "startTimeLong": "1470358800000",
                    "endTimeLong": "1470402000000",
                    "alarmStatus": "false",
                    "albumType": "0",
                    "foregiftPayMode": "0",
                    "index": "0",
                    "venueId": "0",
                    "applyCnt": "0",
                    "serverTime": "2016-08-02 22:09:38"
                }
            };
            zepto().toastUtil.dismissLoading();
            hasNext = mockRespons.data && "true" == mockRespons.data.nextPage;
            callBack(handleResponse(mockRespons));
            //TODO handel error
            //zepto().toastUtil.dismissLoading(), callBack && callBack.ret && "FAIL_SYS_SESSION_EXPIRED::SESSION失效" == callBack.ret[0] ? zepto().loginUtil.jumpwithreturn() : c ? c(callBack) : zepto().toastUtil.showError()
        }

        function validateResponse(a) {
            return a.data && a.data.items instanceof Array && a.data.items.length > 0
        }

        function i() {
            var a = "{";
            return void 0 != albumId && (a += '"albumId":' + albumId + ","), a += '"pageNum":' + pageNum + ",", a += '"pageSize":' + pageSize, a += "}"
        }

        function handleResponse(response) {
            var endTime = response.data.endTime,
                serverTime = response.data.serverTime,
                startTime = response.data.startTime,
                now = (new Date).getTime(),
                venueId = null == response.data.venueId || "" == response.data.venueId ? "" : response.data.venueId;
            u = k(response), response.data.status = n(startTime, endTime, serverTime, response);
            var items = response.data.items;
            for (var index in items) {
                var item = items[index];
                item.serverTime = response.data.serverTime,
                    item.status = n(item.startTime, item.endTime, item.serverTime),
                isNaN(item.price) || (item.price = formatePrice(parseFloat(item.price))),
                    item.isLessThanThirtyMinutes = m(item),
                item.isLessThanThirtyMinutes && (item.lefttime = l(item)),
                    item.onlookersNum = void 0 == item.onlookersNum ? 0 : item.onlookersNum,
                    item.clientTime = now,
                    item.venueId = venueId,
                    null != item.bidCnt && parseInt(item.bidCnt) > 0 ? item.bided = !0 : item.bided = !1
            }
            return response.data.items = items, response.data.isTBP = u, response
        }

        function k(a) {
            var b = a.data.albumType;
            return null != b && "1" == b ? "true" : "false"
        }

        function l(b) {
            if (void 0 == b.serverTime || void 0 == b.endTime)return "";
            var c = parseInt(zepto().dateUtil.getTime(b.serverTime) / 1e3), d = 0;
            if ("WAIT" == b.bidStatus) {
                var e = parseInt(zepto().dateUtil.getTime(b.startTime) / 1e3);
                d = e - c
            } else if ("START" == b.bidStatus) {
                var f = parseInt(zepto().dateUtil.getTime(b.endTime) / 1e3);
                d = f - c
            }
            return 0 > d && (d = 0), o(d)
        }

        function m(b) {
            if (void 0 == b.serverTime || void 0 == b.endTime)return !1;
            var c = parseInt(zepto().dateUtil.getTime(b.endTime) / 1e3), d = parseInt(zepto().dateUtil.getTime(b.serverTime) / 1e3), e = c - d, f = !1;
            return e > 0 && 1800 >= e && (f = !0), f
        }

        function n(b, c, d, e) {
            c = parseInt(zepto().dateUtil.getTime(c) / 1e3), d = parseInt(zepto().dateUtil.getTime(d) / 1e3), b = parseInt(zepto().dateUtil.getTime(b) / 1e3);
            var f = "Wait";
            if (d >= b && c > d) {
                var g = c - d;
                1800 >= g ? (f = e ? "CountDown" : "Started", e && (e.data.lefttime = g)) : f = "Started"
            } else d >= c ? f = "Ended" : b > d && (f = "Wait");
            return f
        }

        function o(a) {
            var b = "";
            return b = parseInt(a % 60 * 10) / 10 + " 秒 " + b, a = Math.floor(a / 60), b = a % 60 + " 分 " + b
        }

        function formatePrice(price) {
            var b = 1e4,
                c = 1e8,
                d = "";
            return price >= c ? (price /= c, d = "亿") : price >= b && (price /= b, d = "万"), (price + "").length > 7 && (price += "", price = price.substr(0, price.indexOf(".") + 3), price = 100 * price / 100), price + d
        }

        var albumId = void 0,
            pageNum = 1,
            pageSize = 40,
            hasNext = !1,
            u = !1;
        exports.init = function (pagesize) {
            if (1 === arguments.length && "undefined" != typeof pagesize) {
                pageSize = pagesize
            }
        };
        exports.setAlbumId = function (id) {
            albumId = id
        };
        exports.getAlbumId = function () {
            return albumId
        };
        exports.getPageNum = function () {
            return pageNum
        };
        exports.setPageNum = function (pagenum) {
            pageNum = pagenum
        };
        exports.getPageSize = function () {
            return pageSize
        };
        exports.setPageSize = function (pagesize) {
            pageSize = pagesize
        };
        exports.hasNext = function () {
            return hasNext
        };
        exports.setHasNext = function (hasnext) {
            hasNext = hasnext
        };
        exports.getNextList = function (a, b) {
            exports.setPageNum(++pageNum);
            getList(a, b)
        };
        exports.getList = function (a, b) {
            getList(a, b)
        }
    })
}(Zepto, window);