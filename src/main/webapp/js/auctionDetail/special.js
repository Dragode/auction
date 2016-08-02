!function (zepto, window) {
    define(function (require, exports, module) {
        function f() {
            if (listView = new JsListView({
                    width: "100%",
                    height: A + "px"
                }, zepto("#container")[0]),
                listView.bottomListener = function () {
                    q.hasNext() && (++w, (q.getNextList(bannerTemplate, starItem)))
                },
                void 0 == listAdapter || null == listAdapter) {
                var listTemplate = zepto(zepto("#listTemplate").html())[0],
                    noMoreTail = s.noMoreBottomDiv(),
                    descTemplate = zepto(zepto("#descTemplate").html())[0],
                    bannerTemplate = zepto(zepto("#bannerTemplate").html())[0],
                    starItem = zepto(zepto("#star-item").html())[0];
                listAdapter = new BaseAdaptor([], {CONVER: starItem, LIST: listTemplate, TAIL: noMoreTail, DESC: descTemplate, BANNER: bannerTemplate}).extend({
                    that: this,
                    saveContext: function (a) {
                        var b = {};
                        b.pagesize = v,
                        b.pageNum = w,
                        b.hasNext = q.hasNext(),
                        listView.recoverLater(b)
                    },
                    prepareForReuse: function (a, b) {
                        a.tag && t.remove("cell_" + a.tag)
                    },
                    willRenderView: function (b, c) {
                        var d = this.getData()[c];
                        if (d.isLessThanThirtyMinutes) {
                            var e = (new Date).getTime(),
                                f = zepto().dateUtil.parse(d.serverTime).getTime(),
                                g = zepto().dateUtil.parse(d.endTime).getTime();
                            e - d.clientTime >= g - f && (d.isLessThanThirtyMinutes = !1, d.status = "Finish")
                        }
                    },
                    loadDesc: function (b) {
                        if (void 0 != B)return b.desc = B, void this.notifyDataSetChanged(!0);
                        var specialdetailDao = require("specialdetailDao"),
                            e = b.albumId;
                        specialdetailDao.init(),
                        null != e && specialdetailDao.setAlbumId(e),
                        zepto().toastUtil.showLoading();
                        var f = this;
                        specialdetailDao.getAlbum(function (c) {
                            zepto().toastUtil.dismissLoading(),
                            B = c.data,
                            b.desc = c.data,
                            f.notifyDataSetChanged(!0)
                        }, function (a) {
                        })
                    },
                    afterRenderView: function (c, d) {
                        var e = zepto(c), f = this.getData()[d], h = this.getViewType(d), i = this;
                        if ("BANNER" == h && e.find("img").forEach(function (b) {
                                zepto(b).attr("src", zepto.fn.imageUtil.getUrl(f.pic, 310, 310))
                            }), "DESC" == h) {
                            if ("" === f.alarmTip) {
                                var l = e.find(".alarmWrap");
                                l.css("width", "15px"), l.css("visibility", "hidden")
                            }
                            e.on(zepto().conditionUtil.hasTouch(), function (d) {
                                var e = zepto(d.target).attr("class");
                                if (("alarmWrap" === e || "alarmIcon" === e || "alarmTip" === e) && "" !== f.alarmTip) {
                                    if (f.alarmLoading === !0)return;
                                    return f.alarmLoading = !0, void("true" === f.alarmStatus ? p.request({
                                        api: "mtop.taobao.paimai.notification.unSub",
                                        v: "1.0",
                                        ecode: 1,
                                        data: {outerId: f.albumId, type: "3"},
                                        loading: !0
                                    }, function (a) {
                                        f.alarmLoading = !1, f.alarmStatus = "false", j(f, m(), f.startTimeLong, f.endTimeLong, "false"), k(f.albumId), i.notifyDataSetChanged(!0)
                                    }, function () {
                                        f.alarmLoading = !1
                                    }) : p.request({
                                        api: "mtop.taobao.paimai.notification.subV3",
                                        v: "1.0",
                                        ecode: 1,
                                        data: {outerId: f.albumId, type: "3"},
                                        loading: !0
                                    }, function (d) {
                                        f.alarmLoading = !1, f.alarmStatus = "true", j(f, m(), f.startTimeLong, f.endTimeLong, "true"), k(f.albumId, !0), i.notifyDataSetChanged(!0);
                                        try {
                                            if (!localStorage.getItem("isFirstDoAlarm") && (localStorage.setItem("isFirstDoAlarm", "true"), window.confirm("您还未设置默认提醒方式，是否去设置？"))) {
                                                if (i.saveContext(c), window.g_SPM)var e = g_SPM.spm(this) || "";
                                                zepto.fn.pageUtil.open("../alarm/alarmSetting.html?spm=" + e)
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
                                var n = zepto().dateUtil.parse(f.serverTime).getTime(), o = zepto().dateUtil.parse(f.endTime).getTime(), q = zepto().dateUtil.parse(f.startTime).getTime(), r = f.clientTime, s = e.find("#courtdown"), u = {
                                    startTime: q,
                                    endTime: o,
                                    serverTime: n,
                                    clientTime: r,
                                    callback: function (a) {
                                        return "FINISH" == a ? (f.isLessThanThirtyMinutes = !1, f.status = "FINISH", e.find("[class=text]").html("已结束"), e.find("[class=status]").css("background", "#878787"), e.find("[class=status]").css("background", "#ffffff"), void(f.status = "Finish")) : void("WAIT" != a && s.html(a))
                                    }
                                };
                                t.set("cell_" + d, u), t.count() <= 0 && t.start()
                            }
                            e.on(zepto().conditionUtil.hasTouch(), function (a) {
                                if (i.saveContext(c), window.g_SPM) {
                                    g_SPM.spm(this) || ""
                                }
                            }), e.find("img").first().attr("src", zepto.fn.imageUtil.getUrl(f.pic, 110, 110))
                        }
                        "TAIL" == h && e.css("background-color", "#efefef"), "CONVER" == h && e.find("img").forEach(function (b, c) {
                            zepto(b).attr("src", zepto.fn.imageUtil.getUrl(f.data[c].pic, 180, 180))
                        }), g()
                    }
                }),
                listView.setAdaptor(listAdapter)
            }
            h()
        }

        function g() {
            zepto("#jump_to_dating").data("huichangId", E), zepto("#jump_to_dating").data("albumId", r)
        }

        function h() {
            q.setPageNum(1), q.setPageSize(v), q.getList(l, n)
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

        function l(b) {
            var c = [], d = {}, e = {};
            if (void 0 != b && null != b && b != [] && b.data.hasOwnProperty("items") && b.data.items.length > 0) {
                var f = b.data.status;
                if (E = b.data.venueId, D = b.data.isTBP, "true" == D) {
                    zepto("#topTip").hide(), zepto("#topTipTBP").show(), zepto("#container").addClass("tbp");
                    var g = "toBeBidDesc", h = "即将开始";
                    "Wait" == f || ("Ended" == f ? (g = "finishedDesc", h = "已结束") : ("CountDown" == f || "Started" == f) && (g = "biddingDesc", h = "正在进行")), zepto("#topTipTBP").children().first().addClass(g), zepto("#topTipTBP").children().first().html(h)
                } else if (zepto("#container").removeClass("tbp"), "CountDown" == f) {
                    zepto("#topTip").attr("class", "sale_countdown"), zepto("#topTip").find("[class=desc]").html("&nbsp;即将结束"), zepto("#topTip").find("[class=time]").html(b.data.lefttime);
                    var i = zepto().dateUtil.parse(b.data.serverTime).getTime(), k = zepto().dateUtil.parse(b.data.endTime).getTime(), l = zepto().dateUtil.parse(b.data.startTime).getTime(), m = zepto("#topTip").find("[class=time]"), n = {
                        startTime: l,
                        endTime: k,
                        serverTime: i,
                        clientTime: (new Date).getTime(),
                        callback: function (b) {
                            return "FINISH" === b ? (zepto("#topTip").attr("class", "sale_ended"), zepto("#topTip").find("[class=desc]").html("已结束"), void zepto("#topTip").find("[class=time]").html("")) : void("WAIT" !== b && m.html(b))
                        }
                    };
                    t.set("top_tip", n), t.start()
                } else"Started" == f ? (zepto("#topTip").attr("class", "sale_started"), zepto("#topTip").find("[class=desc]").html("结束"), zepto("#topTip").find("[class=time]").html(zepto().dateUtil.format(zepto().dateUtil.parse(b.data.endTime), u))) : "Ended" == f ? (zepto("#topTip").attr("class", "sale_ended"), zepto("#topTip").find("[class=desc]").html("已结束")) : "Wait" == f && (zepto("#topTip").attr("class", "sale_wait"), zepto("#topTip").find("[class=desc]").html("开始"), zepto("#topTip").find("[class=time]").html(zepto().dateUtil.format(zepto().dateUtil.parse(b.data.startTime), u)));
                c = b.data.items;
                for (var o in c) {
                    var p = c[o];
                    p.startTimeShow = zepto().dateUtil.format(zepto().dateUtil.parseTime(p.startTime), u), p.endTimeShow = zepto().dateUtil.format(zepto().dateUtil.parseTime(p.endTime), u), p.isTBP = D
                }
                if (1 == w) {
                    if ("true" == D && b.data.coverAuctions) {
                        var r = {itemType: "CONVER", data: b.data.coverAuctions};
                        c.unshift(r)
                    }
                    d.albumId = b.data.albumId, d.title = b.data.title, d.sellerNick = b.data.sellerNick, d.itemType = "DESC", d.alarmStatus = b.data.alarmStatus, d.startTimeLong = b.data.startTimeLong, d.endTimeLong = b.data.endTimeLong, d.isTBP = D, d.index = b.data.index > 9 ? "" + b.data.index : "0" + b.data.index;
                    var s = b.data.startViewTime;
                    if (null != s)try {
                        var z = zepto().dateUtil.parseTime(s);
                        d.startTimeShow = "开始时间 " + zepto().dateUtil.format(z, "yyyy年MM月dd日 hh:mm")
                    } catch (A) {
                        console.log("date formatter time:" + A)
                    }
                    var i = zepto.fn.dateUtil.getTime(b.data.serverTime);
                    F.serverTime = i, F.clientTime = (new Date).getTime(), j(d, i, b.data.startTimeLong, b.data.endTimeLong, b.data.alarmStatus), c.unshift(d), e.itemType = "BANNER", e.pic = b.data.picUrl, C.image = b.data.picUrl, C.title = b.data.title, c.unshift(e)
                }
                if (0 == q.hasNext()) {
                    var B = {title: "没有数据了", itemType: "TAIL"};
                    c.push(B)
                }
            }
            if (listView.needRecover() === !0) {
                var G = listView.recoverTag();
                v = G.pagesize, w = G.pageNum, q.setHasNext(G.hasNext), listAdapter.setData(listView.recoverData())
            } else listAdapter.addList(c)
        }

        function m() {
            var a = (new Date).getTime() - F.clientTime;
            return F.serverTime + a
        }

        function n(b) {
            var c = {};
            if (c.time = 1500, b && b.ret && b.ret.length > 0) {
                var d = b.ret[0], e = d.indexOf("::");
                if (e > 0)return d = d.substring(e + 2, d.length), d && d.indexOf("HSF") >= 0 ? (zepto().toastUtil.showError("系统繁忙，请稍候重试", c), void console.log(d)) : void zepto().toastUtil.showError(d, c)
            }
            zepto().toastUtil.showError()
        }

        function o() {
            document.addEventListener("TBNaviBar.moreItem.clicked", function (a) {
                window.setTimeout(function () {
                    0 == a.param.index && (C.text = C.title, WindVaneHelper.shareMe(C))
                }, 100)
            }, !1), WindVaneHelper.moreNavItems("share")
        }

        var p,
            q,
            r,
            s,
            t,
            u = zepto().dateUtil.LIST_TIME_FORMAT,
            v = 40,
            w = 1,
            listView = void 0,
            listAdapter = null,
            z = null,
            A = 0,
            B = void 0,
            C = {},
            D = "false",
            E = "";
        exports.init = function () {
            p = require("http"), q = require("specialDao"), q.init(v), s = require("listViewHelper"), r = zepto().urlUtil.getParameter("albumId"), null != r && q.setAlbumId(r), t = new PyTimer, window.GlobalMenu && window.GlobalMenu.initMenu(null, 0), zepto().conditionUtil.isInTaobaoClient(o), A = zepto.fn.conditionUtil.getWindowHeight(), zepto("#back").css("background", "");
            var d = sessionStorage.getItem("heightInNoticeList");
            if (null != d && void 0 != d && "" != d && "0px" != d) {
                z = d;
                try {
                    A = parseInt(z)
                } catch (e) {
                    console.log("error to split height:" + z)
                }
            }
            null != z && void 0 != z && "" != z && "0px" != z && sessionStorage.setItem("heightInNoticeList", z), f(), zepto().datingUtil.init("jump_to_dating")
        },
        exports.init();
        var F = {}, G = zepto().paramUtil.get("key");
        G && zepto(".J_UrlBanner").each(function (b, c) {
            var d = zepto(c);
            d.attr("data-url-param") === G && (d.show(), setTimeout(function () {
                zepto("#app-download-banner").hide()
            }, 200))
        })
    })
}(Zepto, window);