function SessionDetailListAdapter(datas, viewList) {
    this.oData = datas,
        this.mData = datas,
        this.today = null,

        this.setTip = function (tip) {
            showtip = tip
        },
        this.getTip = function () {
            return showtip
        },
        this.setToday = function (today) {
            this.today = today
        },
        this.setData = function (data) {
            this.oData = data,
                this.mData = data,
                this.notifyDataSetChanged(!0)
        },
        this.getData = function () {
            return this.oData
        },
        this.getMData = function () {
            return this.mData
        },
        this.getCount = function () {
            var count = this.mData.length;
            return count
        },
        this.setListView = function (listView) {
            listView2 = listView
        },
        this.setPageNumber = function (pageNumber) {
            pagepmptom = pageNumber
        },

        this.renderView = function (viewCell, index) {
            var data = this.mData[index];
            if (null != data && void 0 != data) {
                var cell = null;
                if("banner" == data.showType){
                    cell = getCellByTemplateTom("bannerTemplate", data);
                }else if("desc" == data.showType){
                    cell = getCellByTemplateTom("descTemplate", data);
                }else{
                    cell = getCellByTemplateTom("listCellTemplate", data);
                }
                //TODO hanle this exception
                /*if (null == viewCell)  {
                    cell = getCellByTemplate("", null, null);//TODO 函数名称不存在
                    viewCell = cell;
                }*/
                $(viewCell).empty().append(cell);

                var viewCopy = $(viewCell),
                    viewClass = viewCopy.attr("class");
                if ("cell" == viewClass
                        && "desc" != data.showType
                    && viewCopy.on($().conditionUtil.hasTouch(),
                        function (event) {
                            var params = {};
                            params.pageNum = pagepmptom,
                            void 0 == params.pageNum && (params.pageNum = 1);
                            var fftitleView = $("#fftitle")[0],
                                fftitleViewFirstChild = $(fftitleView).children(),
                                fftitleViewText = fftitleViewFirstChild.text();
                            params.datetitle = fftitleViewText,
                                listView2.recoverLater(params),
                                window.location.href = "/goods.html?goodsId="+data.id;
                        }),
                    null != data && null != data && "tip" == data.showtype) {
                    var tipsShow = '<section class="tipsshow" >没有更多数据了</section>';
                    null != viewCell ?
                        $(viewCell).empty().append(tipsShow)
                        :
                        (cell = getCellByTemplate("", null, null),
                            viewCell = cell,
                            $(viewCell).empty().append(tipsShow))
                }
            }
            viewCell.tag = index
        },

        this.addList = function (dataToAppend) {
            this.oData = this.oData.concat(dataToAppend);
            this.mData = this.oData;
        };
        this.viewList = viewList;
        this.viewList.banner.viewType = "banner";
        this.viewList.desc.viewType = "desc";
        this.viewList.goods.viewType = "goods";
        this.getViewType = function (index) {
            var data = this.mData[index];
            if (void 0 != data.showtype && "banner" == data.showType) {
                return this.viewList.banner.viewType
            } else if(void 0 != data.showtype && "desc" == data.showType) {
                return this.viewList.desc.viewType;
            }else {
                return this.viewList.goods.viewType;
            }
        }
}

function getCellByTemplateTom(templateId, params) {
    var templateResult = template.render(templateId, {item: params});
    return $(templateResult)[0]
}

var listView2 = null,
    pagepmptom = 1;