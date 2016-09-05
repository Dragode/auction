!function (Zepto, window) {
    define(function (require, exports, module) {
        function init() {
            window.location, window.location.href;
            Zepto("#container").css("width", windowWidth + "px");
            listView = new JsListView({
                    width: "100%",
                    height: windowHeight + "px"
                }, Zepto("#container")[0]
            );
            sessionDetailAdapter = new SessionDetailListAdapter([], {
                    banner: createSection("banner"),
                    desc: createSection("item_desc_container"),
                    goods: createSection("cell")
                }
            );
            window.sessionDetailAdapter = sessionDetailAdapter;
            listView.setAdaptor(sessionDetailAdapter);
            sessionDetailAdapter.setListView(listView);
            listView.topListener = function () {
            };
            listView.bottomListener = function () {
                console.log("bottom");
            };
            getAndRender();
        }

        function createSection(divClass) {
            var div = document.createElement("section");
            div.setAttribute("class", divClass);
            return div;
        }

        function handleResponse(response) {
            var itemToShow = [];
            var banner = {
                src: response.session.bannerUrl,
                showType: "banner"
            };
            itemToShow.push(banner);
            var desc = {
                title: response.session.title,
                alarmIcon: "&#xe600;",
                alarmTip: "开拍提醒",
                showType: "desc"
            };
            itemToShow.push(desc);
            for (var i = 0; i < response.items.length; i++) {
                var goods = response.items[i];
                itemToShow.push(goods);
            }
            return itemToShow;
        }

        function getAndRender() {
            $.getJSON('/getSessionDetail/' + getUrlParam("sessionId"), function (response) {
                //TODO 处理异常情况
                Zepto().toastUtil.dismissLoading();
                /*renderSessionDesc(response.session);*/
                renderToolTip(response.session);
                var itemsToShow = handleResponse(response);
                sessionDetailAdapter.addList(itemsToShow);
                sessionDetailAdapter.notifyDataSetChanged();
                Zepto().toastUtil.dismissLoading();

                Zepto("#alarmWrap").on($().conditionUtil.hasTouch(), function (event) {
                    $.getJSON('/remindWhenAuctionBegin?sessionId=' + getUrlParam("sessionId")+"&userId="+getUrlParam("userId"), function (response) {
                        //TODO 处理异常情况
                        alert("设置成功");
                    });
                });
            });
        }

        function renderToolTip(session) {
            var now = new Date();
            var startTime = Zepto().dateUtil.parse(session.startTime, "yyyy-MM-dd hh:mm:ss");
            var endTime = Zepto().dateUtil.parse(session.endTime, "yyyy-MM-dd hh:mm:ss");
            if (now.getTime() > endTime.getTime()) {
                Zepto("#topTip").empty().append("<section class=‘desc’>已结束</section>");
                Zepto("#topTip").attr("class", "sale_ended");
            } else if (now.getTime() >= startTime.getTime()) {
                Zepto("#topTip").empty().append("<section id='time' class='time'>" + Zepto().dateUtil.format(endTime) + "</section> <section class='desc'>结束</section>");
                Zepto("#topTip").attr("class", "sale_countdown");
            } else {
                Zepto("#topTip").empty().append("<section id='time' class='time'>" + Zepto().dateUtil.format(startTime) + "</section> <section class='desc'>开始</section>");
                Zepto("#topTip").attr("class", "sale_wait");
            }
        }

        function getUrlParam(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数
            if (r != null) return unescape(r[2]);
            return null; //返回参数值
        }

        exports.initialize = init;
        var listView = null,
            windowHeight = Zepto(window).height(),
            sessionDetailAdapter = null,
            windowWidth = (window.location, Zepto(window).width())
            ;
    })
}(Zepto, window);