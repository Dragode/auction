function SellerSessionAdapter(datas, viewList) {
    this.oData = datas;
    this.mData = datas;

    this.setData = function (data) {
        this.oData = data;
        this.mData = data;
        this.notifyDataSetChanged(!0);
    };
    this.getData = function () {
        return this.oData;
    };
    this.getMData = function () {
        return this.mData;
    };
    this.getCount = function () {
        return this.mData.length;
    };
    this.setListView = function (listView) {
        listView2 = listView
    };
    this.setPageNumber = function (pageNumber) {
        pagepmptom = pageNumber
    };

    this.renderView = function (viewCell, index) {
        var data = this.mData[index];
        if (null != data && void 0 != data) {
            var cell = null;
            if ("title" == data.type) {
                cell = getCellOfTitle(data.date);
                $(viewCell).empty().append(cell);
                return void(viewCell.tag = index);
            } else {
                cell = getCellByTemplateTom("listCellTemplate", data);
            }


            if (null != viewCell) {
                $(viewCell).empty().append(cell);
            } else {
                cell = getCellByTemplate("", null, null);
                viewCell = cell;
                $(viewCell).empty().append(cell);
            }

            var viewCellElement = $(viewCell),
                viewCellClass = viewCellElement.attr("class");
            if ("cell" == viewCellClass && viewCellElement.on($().conditionUtil.hasTouch(),
                    function (event) {
                        var params = {};
                        params.pageNum = pagepmptom;
                        void 0 == params.pageNum && (params.pageNum = 1);
                        var fftitleView = $("#fftitle")[0],
                            fftitleViewFirstChild = $(fftitleView).children();
                        fftitleViewText = fftitleViewFirstChild.text();
                        params.datetitle = fftitleViewText;
                        listView2.recoverLater(params);
                        window.location.href = "/goodsDetail.html?goodsId=" + data.id;
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
    };

    this.addList = function (dataToAppend) {
        this.oData = this.oData.concat(dataToAppend),
            this.mData = this.oData
    };
    this.viewList = viewList;
    this.viewList.cell.viewType = "cell";
    this.viewList.tip.viewType = "tip";
    this.viewList.banner.viewType = "banner";
    this.viewList.desc.viewType = "desc";
    this.getViewType = function (index) {
        var data = this.mData[index];
        if (void 0 != data.showtype && "tip" == data.showtype) {
            return this.viewList.tip.viewType
        } else if (void 0 != data.showtype && "banner" == data.showtype) {
            return this.viewList.banner.viewType
        }else if (void 0 != data.showtype && "desc" == data.showtype) {
            return this.viewList.desc.viewType
        } else {
            return this.viewList.cell.viewType
        }
    }
}

function getCellByTemplateTom(templateId, params) {
    var templateResult = template.render(templateId, {item: params});
    return $(templateResult)[0]
}

function getCellOfTitle(a) {
    return '<section class="celltitle">' + a + "</section>"
}

var listView2 = null,
    pagepmptom = 1;