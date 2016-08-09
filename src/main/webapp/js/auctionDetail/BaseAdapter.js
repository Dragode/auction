function BaseAdaptor(a, b) {
    this.viewList = b || {}, this.viewList.defaultItemType = "LIST", this.kData = a || [], this.kShowTip = !1, this.getViewType = function (a) {
        var b = this.kData[a];
        return b.hasOwnProperty("itemType") ? b.itemType : this.viewList.defaultItemType
    }, this.renderView = function (a, b) {
        this.prepareForReuse(a, b);
        var c = $(this.viewList[this.getViewType(b)]).html();
        this.willRenderView(a, b);
        var d = ejs.render(c, {item: this.kData[b]});
        $(a).empty().append(d), a.tag = b, this.afterRenderView(a, b)
    }, this.extend = function (a) {
        return $.extend(!0, this, a)
    }, this.saveContext = function (a) {
    }, this.notifyDataSetChanged = function (a) {
    }, this.prepareForReuse = function (a, b) {
        $(a).empty()
    }, this.afterRenderView = function (a, b) {
        var c = $(a), d = this;
        d.saveContext && c.on($().conditionUtil.hasTouch(), function (b) {
            d.saveContext(a)
        }), c.find("img").forEach(function (a) {
            $(a).attr("src", $().urlUtil.removeSchema($(a).data("src")))
        })
    }, this.willRenderView = function (a, b) {
    }, this.getCount = function () {
        return this.kData ? this.kData.length : 0
    }, this.getData = function () {
        return this.kData
    }, this.getTemplates = function () {
        return this.viewList
    }, this.setData = function (a) {
        this.kData = a, this.notifyDataSetChanged(!0)
    }, this.addList = function (a) {
        this.kData = this.kData.concat(a), this.notifyDataSetChanged()
    }, this.setTip = function (a) {
        this.kShowTip = a
    }, this.getTip = function () {
        return this.kShowTip
    }
}