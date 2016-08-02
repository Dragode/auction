define("listViewHelper", function (a, b, c) {
    b.noMoreBottomDiv = function () {
        var div = $("<div></div>");
        return div.css("width", "100%"),
            div.css("height", "40px"),
            div.css("text-align", "center"),
            div.css("line-height", "42px"),
            div.css("font-size", "15px"),
            div.css("padding-bottom", "8px"),
            div.css("color", "#8d8d8d"),
            div.html("没有更多"),
            div[0]
    },
    b._tailTemplateNoTop = function () {
        var a = b.noMoreBottomDiv();
        return $(a).css("line-height", ""), a
    }
});