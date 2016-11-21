function SellerSessionAdapter(datas, viewList) {
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
            var a = this.mData.length;
            return a
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
                if ("title" == data.type) {
                    cell = getCellOfTitle(data.date);
                    $(viewCell).empty().append(cell);
                    return void(viewCell.tag = index);
                }else if ("banner" == data.showtype){
                    cell = getCellByTemplateTom("bannerTemplate", data);
                }else {
                    cell = getCellByTemplateTom("listCellTemplate", data);
                }


                if (null != viewCell) {
                    $(viewCell).empty().append(cell);
                } else {
                    cell = getCellByTemplate("", null, null);
                    viewCell = cell;
                    $(viewCell).empty().append(cell);
                }

                var viewCopy = $(viewCell),
                    viewClass = viewCopy.attr("class");
                if ("cell" == viewClass && viewCopy.on($().conditionUtil.hasTouch(),
                        function (event) {
                            var params = {};
                            params.pageNum = pagepmptom,
                            void 0 == params.pageNum && (params.pageNum = 1);
                            var fftitleView = $("#fftitle")[0],
                                fftitleViewFirstChild = $(fftitleView).children(),
                                fftitleViewText = fftitleViewFirstChild.text();
                            params.datetitle = fftitleViewText,
                                listView2.recoverLater(params),
                                //TODO 跳到自己页面
                                window.location.href = "/auctionDetail.html?sessionId=" + 1 + "&userId=" + getUrlParam("userId");//TODO 动态数据
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
            this.oData = this.oData.concat(dataToAppend),
                this.mData = this.oData
        },
        this.viewList = viewList,
        this.viewList.cell.viewType = "cell",
        this.viewList.tip.viewType = "tip",
        this.viewList.banner.viewType = "banner",
        this.getViewType = function (index) {
            var data = this.mData[index];
            if (void 0 != data.showtype && "tip" == data.showtype) {
                return this.viewList.tip.viewType
            } else if (void 0 != data.showtype && "banner" == data.showtype){
                return this.viewList.banner.viewType
            }else {
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

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}

function convertODataToMData(a, b) {
    if (null == a || 0 == a.length)return null;
    var c = new Array, d = 0, e = null, f = new Date;
    null != b && (f = $().dateUtil.parse(b)), f.addDays(1);
    var g = $().dateUtil.format(f, "yyyyMMdd");
    f.addDays(1);
    for (var h = $().dateUtil.format(f, "yyyyMMdd"); d < a.length; d++) {
        var i = a[d], j = i.startTime, k = $().dateUtil.format($().dateUtil.parse(j), "yyyyMMdd"), l = $().dateUtil.format($().dateUtil.parse(j), "MM月dd日");
        if (null == e || e != k) {
            var m = new Object;
            m.type = "title", k == g ? m.date = "明天" : k == h ? m.date = "后天" : m.date = l, c.push(m), e = k
        }
        i.type = "odata", c.push(i)
    }
    return c
}

var listView2 = null,
    pagepmptom = 1;