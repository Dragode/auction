!function (Zepto, window) {
    define(function (require, exports, module) {
        function f() {
            listView = new JsListView({
                width: "100%",
                height: height + "px"
            }, Zepto("#container")[0]);
            listView.bottomListener = function () {
                specialDaoModel.hasNext() && (++pageNum, (specialDaoModel.getNextList(bannerTemplate, starItem)))
            };
            if (void 0 == listAdapter || null == listAdapter) {
                var listTemplate = Zepto(Zepto("#listTemplate").html())[0],
                    noMoreTail = listViewHelperModel.noMoreBottomDiv(),
                    descTemplate = Zepto(Zepto("#descTemplate").html())[0],
                    bannerTemplate = Zepto(Zepto("#bannerTemplate").html())[0],
                    starItem = Zepto(Zepto("#star-item").html())[0];
                listAdapter = new BaseAdaptor([], {
                    CONVER: starItem,
                    LIST: listTemplate,
                    TAIL: noMoreTail,
                    DESC: descTemplate,
                    BANNER: bannerTemplate
                }).extend({
                    that: this,
                    saveContext: function (context) {
                        var pageInfo = {};
                        pageInfo.pagesize = pageSize;
                        pageInfo.pageNum = pageNum;
                        pageInfo.hasNext = specialDaoModel.hasNext();
                        listView.recoverLater(pageInfo);
                    },
                    prepareForReuse: function (a, b) {
                        a.tag && pyTimer.remove("cell_" + a.tag)
                    },
                    willRenderView: function (b, index) {
                        var data = this.getData()[index];
                        if (data.isLessThanThirtyMinutes) {
                            var now = (new Date).getTime(),
                                serverTime = Zepto().dateUtil.parse(data.serverTime).getTime(),
                                endTime = Zepto().dateUtil.parse(data.endTime).getTime();
                            now - data.clientTime >= endTime - serverTime
                            && (data.isLessThanThirtyMinutes = !1, data.status = "Finish")
                        }
                    },
                    loadDesc: function (data) {
                        if (void 0 != desc)
                            return data.desc = desc, void this.notifyDataSetChanged(!0);
                        var specialdetailDao = require("specialdetailDao"),
                            albumId = data.albumId;
                        specialdetailDao.init();
                        if (null != albumId && specialdetailDao.setAlbumId(albumId)) {
                            Zepto().toastUtil.showLoading();
                        }
                        var _this = this;
                        specialdetailDao.getAlbum(function (response) {
                            Zepto().toastUtil.dismissLoading();
                            desc = response.data;
                            data.desc = response.data;
                            _this.notifyDataSetChanged(!0)
                        }, function (response) {
                        })
                    },
                    afterRenderView: function (c, d) {
                        var e = Zepto(c),
                            f = this.getData()[d],
                            h = this.getViewType(d),
                            _this = this;
                        //TODO Zepto.fn.imageUtil.getUrl(f.pic, 310, 310)
                        if ("BANNER" == h && e.find("img").forEach(function (b) {
                                Zepto(b).attr("src", Zepto.fn.imageUtil.getUrl(f.pic, 310, 310))
                            }), "DESC" == h) {
                            if ("" === f.alarmTip) {
                                var l = e.find(".alarmWrap");
                                l.css("width", "15px"), l.css("visibility", "hidden")
                            }
                            e.on(Zepto().conditionUtil.hasTouch(), function (d) {
                                var e = Zepto(d.target).attr("class");
                                if (("alarmWrap" === e || "alarmIcon" === e || "alarmTip" === e) && "" !== f.alarmTip) {
                                    if (f.alarmLoading === !0)return;
                                    return f.alarmLoading = !0, void("true" === f.alarmStatus ? httpModel.request({
                                        api: "mtop.taobao.paimai.notification.unSub",
                                        v: "1.0",
                                        ecode: 1,
                                        data: {outerId: f.albumId, type: "3"},
                                        loading: !0
                                    }, function (a) {
                                        f.alarmLoading = !1, f.alarmStatus = "false", j(f, m(), f.startTimeLong, f.endTimeLong, "false"), k(f.albumId), _this.notifyDataSetChanged(!0)
                                    }, function () {
                                        f.alarmLoading = !1
                                    }) : httpModel.request({
                                        api: "mtop.taobao.paimai.notification.subV3",
                                        v: "1.0",
                                        ecode: 1,
                                        data: {outerId: f.albumId, type: "3"},
                                        loading: !0
                                    }, function (d) {
                                        f.alarmLoading = !1, f.alarmStatus = "true", j(f, m(), f.startTimeLong, f.endTimeLong, "true"), k(f.albumId, !0), _this.notifyDataSetChanged(!0);
                                        try {
                                            if (!localStorage.getItem("isFirstDoAlarm") && (localStorage.setItem("isFirstDoAlarm", "true"), window.confirm("您还未设置默认提醒方式，是否去设置？"))) {
                                                if (_this.saveContext(c), window.g_SPM)var e = g_SPM.spm(this) || "";
                                                Zepto.fn.pageUtil.open("../alarm/alarmSetting.html?spm=" + e)
                                            }
                                        } catch (g) {
                                        }
                                    }, function () {
                                        f.alarmLoading = !1
                                    }))
                                }
                            })
                        }
                        if ("LIST" == h) {
                            if (f.isLessThanThirtyMinutes) {
                                var n = Zepto().dateUtil.parse(f.serverTime).getTime(), o = Zepto().dateUtil.parse(f.endTime).getTime(), q = Zepto().dateUtil.parse(f.startTime).getTime(), r = f.clientTime, s = e.find("#courtdown"), u = {
                                    startTime: q,
                                    endTime: o,
                                    serverTime: n,
                                    clientTime: r,
                                    callback: function (a) {
                                        return "FINISH" == a ? (f.isLessThanThirtyMinutes = !1, f.status = "FINISH", e.find("[class=text]").html("已结束"), e.find("[class=status]").css("background", "#878787"), e.find("[class=status]").css("background", "#ffffff"), void(f.status = "Finish")) : void("WAIT" != a && s.html(a))
                                    }
                                };
                                pyTimer.set("cell_" + d, u), pyTimer.count() <= 0 && pyTimer.start()
                            }
                            e.on(Zepto().conditionUtil.hasTouch(), function (a) {
                                if (_this.saveContext(c), window.g_SPM) {
                                    g_SPM.spm(this) || ""
                                }
                            }), e.find("img").first().attr("src", Zepto.fn.imageUtil.getUrl(f.pic, 110, 110))
                        }
                        "TAIL" == h && e.css("background-color", "#efefef"), "CONVER" == h && e.find("img").forEach(function (b, c) {
                            Zepto(b).attr("src", Zepto.fn.imageUtil.getUrl(f.data[c].pic, 180, 180))
                        }), g()
                    }
                });
                listView.setAdaptor(listAdapter)
            }
            specialDaoModel.setPageNum(1);
            specialDaoModel.setPageSize(pageSize);
            specialDaoModel.getList(l, n);
        }

        function g() {
            Zepto("#jump_to_dating").data("huichangId", venueId), Zepto("#jump_to_dating").data("albumId", r)
        }

        function j(a, b, c, d, e) {
            a.alarmIcon = "", a.alarmTip = "", c > b ? "true" === e ? (a.alarmIcon = "&#xe601;", a.alarmTip = "已提醒") : (a.alarmIcon = "&#xe600;", a.alarmTip = "开拍提醒") : d > b + 18e5 && ("true" === e ? (a.alarmIcon = "&#xe601;", a.alarmTip = "已提醒") : (a.alarmIcon = "&#xe600;", a.alarmTip = "结束前提醒"))
        }

        function k(a, b) {
            try {
                b ? delete sessionStorage.alarmCellNeedDelId : sessionStorage.setItem("alarmCellNeedDelId", a)
            } catch (c) {
            }
        }

        function l(response) {
            var items = [],
                d = {},
                e = {};
            if (void 0 != response
                && null != response
                && response != []
                && response.data.hasOwnProperty("items")
                && response.data.items.length > 0) {
                var status = response.data.status;
                if (venueId = response.data.venueId, isTBP = response.data.isTBP, "true" == isTBP) {
                    Zepto("#topTip").hide();
                    Zepto("#topTipTBP").show();
                    Zepto("#container").addClass("tbp");
                    var g = "toBeBidDesc",
                        h = "即将开始";
                    "Wait" == status || ("Ended" == status ? (g = "finishedDesc", h = "已结束") : ("CountDown" == status || "Started" == status) && (g = "biddingDesc", h = "正在进行")), Zepto("#topTipTBP").children().first().addClass(g), Zepto("#topTipTBP").children().first().html(h)
                } else if (Zepto("#container").removeClass("tbp"), "CountDown" == status) {
                    Zepto("#topTip").attr("class", "sale_countdown");
                    Zepto("#topTip").find("[class=desc]").html("&nbsp;即将结束");
                    Zepto("#topTip").find("[class=time]").html(response.data.lefttime);
                    var serverTimeFormatted = Zepto().dateUtil.parse(response.data.serverTime).getTime(),
                        endTimeFormatted = Zepto().dateUtil.parse(response.data.endTime).getTime(),
                        startTimeFormatted = Zepto().dateUtil.parse(response.data.startTime).getTime(),
                        topTipDom = Zepto("#topTip").find("[class=time]"),
                        n = {
                            startTime: startTimeFormatted,
                            endTime: endTimeFormatted,
                            serverTime: serverTimeFormatted,
                            clientTime: (new Date).getTime(),
                            callback: function (b) {
                                return "FINISH" === b ? (Zepto("#topTip").attr("class", "sale_ended"), Zepto("#topTip").find("[class=desc]").html("已结束"), void Zepto("#topTip").find("[class=time]").html("")) : void("WAIT" !== b && topTipDom.html(b))
                            }
                        };
                    pyTimer.set("top_tip", n);
                    pyTimer.start();
                } else
                    "Started" == status ?
                        (Zepto("#topTip").attr("class", "sale_started"), Zepto("#topTip").find("[class=desc]").html("结束"), Zepto("#topTip").find("[class=time]").html(Zepto().dateUtil.format(Zepto().dateUtil.parse(response.data.endTime), u)))
                        :
                        "Ended" == status ?
                            (Zepto("#topTip").attr("class", "sale_ended"), Zepto("#topTip").find("[class=desc]").html("已结束"))
                            :
                        "Wait" == status && (Zepto("#topTip").attr("class", "sale_wait"), Zepto("#topTip").find("[class=desc]").html("开始"), Zepto("#topTip").find("[class=time]").html(Zepto().dateUtil.format(Zepto().dateUtil.parse(response.data.startTime), u)));
                items = response.data.items;
                for (var index in items) {
                    var item = items[index];
                    item.startTimeShow = Zepto().dateUtil.format(Zepto().dateUtil.parseTime(item.startTime), u);
                    item.endTimeShow = Zepto().dateUtil.format(Zepto().dateUtil.parseTime(item.endTime), u);
                    item.isTBP = isTBP
                }
                if (1 == pageNum) {
                    if ("true" == isTBP && response.data.coverAuctions) {
                        var r = {itemType: "CONVER", data: response.data.coverAuctions};
                        items.unshift(r)
                    }
                    d.albumId = response.data.albumId, d.title = response.data.title, d.sellerNick = response.data.sellerNick, d.itemType = "DESC", d.alarmStatus = response.data.alarmStatus, d.startTimeLong = response.data.startTimeLong, d.endTimeLong = response.data.endTimeLong, d.isTBP = isTBP, d.index = response.data.index > 9 ? "" + response.data.index : "0" + response.data.index;
                    var s = response.data.startViewTime;
                    if (null != s)try {
                        var z = Zepto().dateUtil.parseTime(s);
                        d.startTimeShow = "开始时间 " + Zepto().dateUtil.format(z, "yyyy年MM月dd日 hh:mm")
                    } catch (A) {
                        console.log("date formatter time:" + A)
                    }
                    var i = Zepto.fn.dateUtil.getTime(response.data.serverTime);
                    if(void 0 == F){
                        F = {};
                    }
                    F.serverTime = i;
                    F.clientTime = (new Date).getTime();
                    j(d, i, response.data.startTimeLong, response.data.endTimeLong, response.data.alarmStatus);
                    items.unshift(d);
                    e.itemType = "BANNER";
                    e.pic = response.data.picUrl;
                    C.image = response.data.picUrl;
                    C.title = response.data.title;
                    items.unshift(e)
                }
                if (0 == specialDaoModel.hasNext()) {
                    var B = {title: "没有数据了", itemType: "TAIL"};
                    items.push(B)
                }
            }
            if (listView.needRecover() === !0) {
                var G = listView.recoverTag();
                pageSize = G.pagesize, pageNum = G.pageNum, specialDaoModel.setHasNext(G.hasNext), listAdapter.setData(listView.recoverData())
            } else listAdapter.addList(items)
        }

        function m() {
            var a = (new Date).getTime() - F.clientTime;
            return F.serverTime + a
        }

        function n(b) {
            var c = {};
            if (c.time = 1500, b && b.ret && b.ret.length > 0) {
                var d = b.ret[0], e = d.indexOf("::");
                if (e > 0)return d = d.substring(e + 2, d.length), d && d.indexOf("HSF") >= 0 ? (Zepto().toastUtil.showError("系统繁忙，请稍候重试", c), void console.log(d)) : void Zepto().toastUtil.showError(d, c)
            }
            Zepto().toastUtil.showError()
        }

        function o() {
            document.addEventListener("TBNaviBar.moreItem.clicked", function (a) {
                window.setTimeout(function () {
                    0 == a.param.index && (C.text = C.title, WindVaneHelper.shareMe(C))
                }, 100)
            }, !1), WindVaneHelper.moreNavItems("share")
        }

        var httpModel,
            specialDaoModel,
            r,
            listViewHelperModel,
            pyTimer,
            u = Zepto().dateUtil.LIST_TIME_FORMAT,
            pageSize = 40,
            pageNum = 1,
            listView = void 0,
            listAdapter = null,
            z = null,
            height = 0,
            desc = void 0,
            C = {},
            isTBP = "false",
            venueId = "";
        exports.init = function () {
            httpModel = require("http"),
                specialDaoModel = require("specialDao"),
                specialDaoModel.init(pageSize),
                listViewHelperModel = require("listViewHelper"),
                r = Zepto().urlUtil.getParameter("albumId"),
            null != r && specialDaoModel.setAlbumId(r),
                pyTimer = new PyTimer,
            window.GlobalMenu && window.GlobalMenu.initMenu(null, 0),
                height = Zepto.fn.conditionUtil.getWindowHeight();
            Zepto("#back").css("background", "");
            var heightInNoticeList = sessionStorage.getItem("heightInNoticeList");
            if (null != heightInNoticeList && void 0 != heightInNoticeList && "" != heightInNoticeList && "0px" != heightInNoticeList) {
                z = heightInNoticeList;
                try {
                    height = parseInt(z)
                } catch (e) {
                    console.log("error to split height:" + z)
                }
            }
            null != z && void 0 != z && "" != z && "0px" != z && sessionStorage.setItem("heightInNoticeList", z), f(), Zepto().datingUtil.init("jump_to_dating")
        };
        exports.init();
        var F = {},
            G = Zepto().paramUtil.get("key");
        G && Zepto(".J_UrlBanner").each(function (b, c) {
            var d = Zepto(c);
            d.attr("data-url-param") === G && (d.show(), setTimeout(function () {
                Zepto("#app-download-banner").hide()
            }, 200))
        })
    })
}(Zepto, window);