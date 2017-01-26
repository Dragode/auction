function MyOrderListAdapter(datas, viewList) {
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
                var cell = getCellByTemplateTom("listCellTemplate", data);
                $(viewCell).empty().append(cell);
            }
            viewCell.tag = index
        },

        this.addList = function (dataToAppend) {
            this.oData = this.oData.concat(dataToAppend);
            this.mData = this.oData;
        };
    this.viewList = viewList;
    this.viewList.order.viewType = "order";
    this.getViewType = function (index) {
        return this.viewList.order.viewType;
    }
}

function getCellByTemplateTom(templateId, params) {
    var templateResult = template.render(templateId, {item: params});
    return $(templateResult)[0]
}

var listView2 = null,
    pagepmptom = 1;