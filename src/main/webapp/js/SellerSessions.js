!function (Zepto, window) {
    define(function (require, exports, module) {
        function init() {
            window.location, window.location.href;
            Zepto("#fframe_container").css("width", windowWidth + "px");
            listView = new JsListView({
                    width: "100%",
                    height: windowHeight + "px"
                }, Zepto("#fframe_container")[0]
            );
            sellerSessionAdapter = new SellerSessionAdapter([], {
                    child1: createDiv("cell"),
                    child2: createDiv("tips")
                }
            );
            window.sellerSessionAdapter = sellerSessionAdapter;
            listView.setAdaptor(sellerSessionAdapter);
            sellerSessionAdapter.setListView(listView);
            listView.topListener = function () {
            };
            listView.bottomListener = function () {
                (1 == nextPage || "true" == nextPage) && (pageNum == pageNum++, getAndRenderItems())
            };
            getAndRenderItems();
        }

        function getAndRenderItems() {
            $.getJSON('/getSessions', function (response) {
                //TODO 处理异常情况
                Zepto().toastUtil.dismissLoading();
                var itemsToShow = handleResponse(response);
                sellerSessionAdapter.addList(itemsToShow);
                sellerSessionAdapter.notifyDataSetChanged();
                Zepto().toastUtil.dismissLoading();

            });
        }

        function handleResponse(response) {
            var itemsToShow = [];
            //TODO 为什么Zepto().each不行
            for (var i = 0; i < response.items.length; i++) {
                var itemToShow = response.items[i];
                var now = new Date();
                var startTime = Zepto().dateUtil.parse(itemToShow.startTime, "yyyy-MM-dd hh:mm:ss");
                var endTime = Zepto().dateUtil.parse(itemToShow.startTime, "yyyy-MM-dd hh:mm:ss");
                if (now.getTime() >= startTime.getTime()) {
                    itemToShow.needStart = "0";
                    itemToShow.showtext = Zepto().dateUtil.format(endTime, "MM月dd日 hh:mm") + " 结束";
                } else {
                    itemToShow.needStart = "1";
                    itemToShow.showtext = Zepto().dateUtil.format(startTime, "MM月dd日 hh:mm") + " 开始";
                }
                itemToShow.showtype = "data";
                itemsToShow.push(itemToShow);
            }
            return itemsToShow;
        }


        function createDiv(divClass) {
            var div = document.createElement("div");
            div.setAttribute("class", divClass);
            return div;
        }

        exports.initialize = init;
        var listView = null,
            windowHeight = Zepto(window).height(),
            sellerSessionAdapter = null,
            windowWidth = (window.location, Zepto(window).width()),
            pageNum = 1,
            pageSize = 20,
            nextPage = !1
    })
}(Zepto, window);