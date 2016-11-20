/**
 *扩展原生String的函数
 * @function
 *      String.startWith,
 *      String.endWith
 *      String.trim
 *      String.leftTrim
 *      String.rightTrim
 *      String.trims
 *      String.toInt
 *      String.toFloat
 *      String.replaceAll
 *      String.isInt
 *      String.isFloat
 */

String.prototype.startWith || (String.prototype.startWith = function (targetString) {
    return void 0 == targetString || null == targetString ? !1 : "" == targetString ? !1 : 0 == this.length || targetString.length > this.length ? !1 : this.substr(0, targetString.length) == targetString ? !0 : !1
});

String.prototype.endWith || (String.prototype.endWith = function (targetString) {
    return void 0 == targetString || null == targetString || "" == targetString || 0 == this.length || targetString.length > this.length ? !1 : this.substr(this.length - targetString.length, this.length) == targetString ? !0 : !1
});

void 0 == String.prototype.trim && (String.prototype.trim = function () {
    return this.trims()
});

String.prototype.leftTrim || (String.prototype.leftTrim = function () {
    return this.replace(/(^\s*)/g, "")
});

String.prototype.rightTrim || (String.prototype.rightTrim = function () {
    return this.replace(/(\s*$)/g, "")
});

String.prototype.trims || (String.prototype.trims = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "")
});

String.prototype.toInt || (String.prototype.toInt = function () {
    if ("" == this)return void 0;
    if (!this.isInt())return void 0;
    try {
        return parseInt(this)
    } catch (a) {
        return void 0
    }
});

String.prototype.toFloat || (String.prototype.toFloat = function () {
    if ("" == this)return void 0;
    if (!this.isFloat())return void 0;
    try {
        return parseFloat(this)
    } catch (a) {
        return void 0
    }
});

String.prototype.replaceAll || (String.prototype.replaceAll = function (toReplace, replaceTo) {
    for (var result = new String(this); -1 != result.indexOf(toReplace);)result = result.replace(toReplace, replaceTo);
    return result
});

String.prototype.isInt || (String.prototype.isInt = function () {
    return "" == this || "" == this.trims() ? !1 : this.match("^[0-9]*$") ? !0 : !1
});

String.prototype.isFloat || (String.prototype.isFloat = function () {
    return "" == this || "" == this.trims() ? !1 : this.match("^[0-9.]*$") ? !0 : !1
});