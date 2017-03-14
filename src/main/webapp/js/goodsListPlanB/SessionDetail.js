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

        function getAndRender() {
            $.getJSON('/goods', function (response) {
                //TODO 处理异常情况
                Zepto().toastUtil.showLoading();
                var itemsToShow = handleResponse(response);
                sessionDetailAdapter.addList(itemsToShow);
                sessionDetailAdapter.notifyDataSetChanged();
                Zepto().toastUtil.dismissLoading();
            });
        }

        function handleResponse(response) {
            var itemToShow = [];
            var firstGoods = response.items[0];
            var banner = {
                src: firstGoods.auctionPic,
                showType: "banner"
            };
            itemToShow.push(banner);
            var desc = {
                title: firstGoods.title,
                showType: "desc"
            };
            itemToShow.push(desc);
            for (var i = 0; i < response.items.length; i++) {
                var goods = response.items[i];
                itemToShow.push(goods);
            }
            return itemToShow;
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