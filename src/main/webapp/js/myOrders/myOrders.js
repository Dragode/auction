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
            myOrdersAdapter = new MyOrderListAdapter([], {
                    order: createSection("cell")
                }
            );
            window.myOrdersAdapter = myOrdersAdapter;
            listView.setAdaptor(myOrdersAdapter);
            myOrdersAdapter.setListView(listView);
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
            $.getJSON('/order', function (response) {
                //TODO 处理异常情况
                Zepto().toastUtil.showLoading();
                var itemsToShow = handleResponse(response);
                myOrdersAdapter.addList(itemsToShow);
                myOrdersAdapter.notifyDataSetChanged();
                Zepto().toastUtil.dismissLoading();
            });
        }

        function handleResponse(response) {
            var itemToShow = [];
            for (var i = 0; i < response.items.length; i++) {
                var item = {};
                var order = response.items[i];
                if("WAIT_FOR_PAY"==order.orderStatus){
                    item.status = "待支付";
                }else if("PAY_SUCCESS"==order.orderStatus){
                    item.status = "已付款待发货";
                }else if("DILIVERED"==order.orderStatus){
                    item.status = "已发货";
                }else{
                    item.status = "已结束";
                }
                $.ajax({
                    type:'get',
                    url:'/goods/'+order.goodsId,
                    async:false,
                    success:function(response){
                        item.bannerUrl = response.bannerUrl;
                        item.title = response.title;
                    }
                });
                itemToShow.push(item);
            }
            return itemToShow;
        }

        exports.initialize = init;
        var listView = null,
            windowHeight = Zepto(window).height(),
            myOrdersAdapter = null,
            windowWidth = (window.location, Zepto(window).width())
            ;
    })
}(Zepto, window);