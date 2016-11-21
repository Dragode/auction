/**
 * String工具类
 * @property
 *      empty
 * @function
 *      length,
 *      isBlank,
 *      isNotBlank,
 *      equals,
 *      equalsIgnoreCase,
 *      indexOf,
 *      lastIndexOf,
 *      contains,
 *      subStr,
 *      subString,
 *      left,
 *      right,
 *      split,
 *      replace,
 *      startsWith,
 *      endsWith,
 *      _hasnullorundifined，判断是否存在null或undefine，都不存在，返回0；有一个存在，返回-1；都存在，返回1
 */
var StringUtil = {
    empty: "",
    length: function (string) {
        return void 0 == string || null == string || "" == string ? 0 : string.length
    },
    isBlank: function (string) {
        return void 0 == string || null == string ? !0 : 0 == string.length ? !0 : "" == string.trim() ? !0 : !1
    },
    isNotBlank: function (string) {
        return !this.isBlank(string)
    },
    equals: function (string1, string2) {
        var c = this._hasnullorundifined(string1, string2);
        return 0 != c ? 1 == c ? !0 : !1 : null != string1 && null != string2 && void 0 != string1 && void 0 != string2 ? string1 == string2 ? !0 : !1 : void 0
    },
    equalsIgnoreCase: function (string1, string2) {
        var c = this._hasnullorundifined(string1, string2);
        if (0 != c)return 1 == c ? !0 : !1;
        var d = string1.toLowerCase(), e = string2.toLowerCase();
        return this.equals(d, e)
    },
    indexOf: function (string, indexString) {
        return 0 != this._hasnullorundifined(string, indexString) || "" == string && "" != indexString ? -1 : "" == indexString ? 0 : "" != string && "" != indexString ? string.indexOf(indexString) : void 0
    },
    lastIndexOf: function (string, indexString) {
        return 0 != this._hasnullorundifined(string, indexString) || "" == string && "" != indexString ? -1 : "" == indexString ? 0 : "" != string && "" != indexString ? string.lastIndexOf(indexString) : void 0
    },
    contains: function (string, targetString) {
        if (null == string || void 0 == string || "" == string)return !1;
        var c = string.indexOf(targetString);
        return c > -1 ? !0 : !1
    },
    subStr: function (string, startIndex, endIndex) {
        if (null == string || void 0 == string)return null;
        if ("" == string)return "";
        if (0 == endIndex)return "";
        var d = this.length(string);
        return void 0 == endIndex && (endIndex = d), string.substr(startIndex, endIndex)
    },
    subString: function (string, startIndex, endIndex) {
        if (null == string || void 0 == string)return null;
        if ("" == string)return "";
        if (void 0 == endIndex && (endIndex = string.length), 0 >= endIndex - startIndex)return "";
        var d = endIndex - startIndex;
        return this.subStr(string, startIndex, d)
    },
    left: function (string, index) {
        if (null == string || void 0 == string)return null;
        if (0 >= index || "" == string)return "";
        var c = this.length(string);
        return index > c && (index = c), this.subString(string, 0, index)
    },
    right: function (string, index) {
        if (null == string || void 0 == string)return null;
        if (0 >= index || "" == string)return "";
        var c = 0, d = this.length(string);
        return index > d ? index = d : c = d - index, this.subStr(string, c, index)
    },
    split: function (string, splitString, ifTrim) {
        if (null == string && void 0 == string)return null;
        if ("" == string)return [];
        (void 0 == splitString || null == splitString) && (splitString = " ");
        var d = string.split(splitString);
        if (ifTrim) {
            var e = d.escape("");
            return e
        }
        return d
    },
    replace: function (string, toReplace, replaceTo) {
        return null == string && void 0 == string ? null : "" == string || null == replaceTo || void 0 == replaceTo ? string : void 0 == toReplace || null == toReplace || "" == toReplace ? string : this.contains(replaceTo, toReplace) ? string : string.replaceAll(toReplace, replaceTo)
    },
    startsWith: function (string, targetString) {
        return null == string && null == targetString || "" == string && "" == targetString ? !0 : null == string || void 0 == string || "" == string ? !1 : string.startWith(targetString)
    },
    endsWith: function (string, targetString) {
        return null == string && null == targetString || "" == string && "" == targetString ? !0 : null == string || void 0 == string || "" == string ? !1 : string.endWith(targetString)
    },
    /**
     * 判断是否存在null或undefine
     * @param string1
     * @param string2
     * @returns {number} 都不存在，返回0；有一个存在，返回-1；都存在，返回1
     * @private
     */
    _hasnullorundifined: function (string1, string2) {
        return null != string1 && void 0 != string1 || null != string2 && void 0 != string2 ? (null != string1 && void 0 != string1 || null == string2 || void 0 == string2) && (null != string2 && void 0 != string2 || null == string1 || void 0 == string1) ? 0 : -1 : 1
    }
};