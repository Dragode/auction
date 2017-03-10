!function (zepto, window) {
    define(function (require, exports, module) {
        function init() {
            //window.location, window.location.href;
            zepto("#fframe_container").css("width", windowWidth + "px");
            listView = new JsListView({
                    width: "100%",
                    height: windowHeight + "px"
                }, zepto("#fframe_container")[0]
            );
            sellerSessionAdapter = new SellerSessionAdapter([], {
                    banner: createDiv("banner"),
                    desc: createDiv("item_desc_container"),
                    cell: createDiv("cell"),
                    tip: createDiv("tips")
            });
            window.sellerSessionAdapter = sellerSessionAdapter;
            listView.setAdaptor(sellerSessionAdapter);
            sellerSessionAdapter.setListView(listView);
            listView.topListener = function () {
                //TODO 添加上拉刷新
            };
            listView.bottomListener = function () {
                //TODO 分页添加数据
                //(1 == hasNextPage || "true" == hasNextPage) && (pageNum == pageNum++, getAndRenderItems())
            };
            getAndRenderItems();
        }

        function getAndRenderItems() {
            zepto().toastUtil.showLoading();
                $.getJSON('/goods', function (response) {
                    //TODO 处理异常情况
                    var itemsToShow = handleResponse(response);
                    sellerSessionAdapter.addList(itemsToShow);
                    sellerSessionAdapter.notifyDataSetChanged();
                });

            zepto().toastUtil.dismissLoading();
        }

        /**
         * 处理
         *
         * status 0    needStart    0    goldenColor
         * status 1    needStart    0    redColor
         * status 1    needStart    1    grayColor
         * @param response
         * @returns {Array}
         */
        function handleResponse(response) {
            var itemsToShow = [];
            for (var i = 0; i < response.items.length; i++) {
                var itemToShow = response.items[i];
                var now = new Date();
                var startTime = zepto().dateUtil.parse(itemToShow.startTime, "yyyy-MM-dd hh:mm:ss");
                var endTime = zepto().dateUtil.parse(itemToShow.startTime, "yyyy-MM-dd hh:mm:ss");
                if (now.getTime() >= startTime.getTime()) {
                    itemToShow.needStart = "0";
                    itemToShow.showtext = zepto().dateUtil.format(endTime, "MM月dd日 hh:mm") + " 结束";
                } else {
                    itemToShow.needStart = "1";
                    itemToShow.showtext = zepto().dateUtil.format(startTime, "MM月dd日 hh:mm") + " 开始";
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
            windowWidth = (window.location, zepto(window).width()),
            windowHeight = zepto(window).height(),
            sellerSessionAdapter = null;
            /*pageNum = 1,
            pageSize = 20,
            hasNextPage = !1;*/
            //homePageSession;
    })
}(Zepto, window);