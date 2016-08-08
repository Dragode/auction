!function (zepto, window) {
    define("specialdetailDao", function (require, exports, module) {

        function getAlbum(successCallBack, failCallBack) {
            f(successCallBack, failCallBack, {albumId: albumId})
        }

        function f(successCallBack, failCallBack, requestParams) {
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
            void successCallBack(mockRespons);
        }

        var albumId = void 0;
        exports.init = function (id) {
            if (1 === arguments.length && "undefined" != typeof albumId) {
                albumId = id
            }
        };
        exports.setAlbumId = function (id) {
            albumId = id
        };
        exports.getAlbumId = function () {
            return albumId
        };
        exports.getAlbum = function (successCallBack, failCallBack) {
            getAlbum(successCallBack, failCallBack)
        }
    })
}(Zepto, window);