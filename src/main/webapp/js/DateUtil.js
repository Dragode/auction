/**
 * Date工具类
 * @function
 *      now,
 *      parseDate 将时间字符串转换成Date对象,
 *      addYears,addMonths,addWeeks,addDays,addHours,addMinutes,addSeconds,addMilliseconds,
 *      format,
 *      isLeapYear,
 *      compare 比较时间，第一个时间比较早，则返回1；相同，则返回0；第一个时间比较晚，则返回-1
 */
var DateUtil = {

    FORMATER_LONG_NORMAL: "yyyy-MM-dd hh:mm:ss",
    FORMATER_LONG_NORMAL2: "yyyy/MM/dd hh:mm:ss",
    FORMATER_LONG_CN_ALL: "yyyy年MM月dd日 hh时mm分ss秒",
    FORMATER_SHORT_1: "yyyy-MM-dd",
    FORMATER_SHORT_2: "yyyy/MM/dd",
    FORMATER_SHORT_CN: "yyyy年MM月dd日",
    FORMATER_NUMBER_TYPE: "yyyyMMddhhmmss",

    now: function () {
        return new Date
    },

    /**
     * 将时间字符串转换成Date对象
     * @param dateString 时间字符串，例:20140501
     * @param datePattern 时间格式，例:yyyyMMdd
     * @returns {Date} dateString对应的Date对象
     */
    parseDate: function (dateString, datePattern) {
        if ((null == datePattern || void 0 == datePattern || "" == datePattern) && (datePattern = "yyyy-MM-dd hh:mm:ss"), dateString.length != datePattern.length)
            return this.now();
        var datePatternMap = {"y+": "", "M+": "", "d+": "", "h+": "", "m+": "", "s+": ""},
            result = this.now();
        for (var datePattern in datePatternMap)
            if (new RegExp("(" + datePattern + ")").test(datePattern)) {
                var patternExtract = RegExp.$1,
                    index = StringUtil.indexOf(datePattern, patternExtract),
                    dateExtract = StringUtil.subStr(dateString, index, patternExtract.length);
                datePatternMap[datePattern] = dateExtract
            }
        for (var eachDatePattern in datePatternMap)
            switch (datePatternMap[eachDatePattern], eachDatePattern) {
                case"y+":
                    result.setFullYear(datePatternMap[eachDatePattern]);
                    break;
                case"M+":
                    result.setMonth(datePatternMap[eachDatePattern] - 1);
                    break;
                case"d+":
                    result.setDate(datePatternMap[eachDatePattern]);
                    break;
                case"h+":
                    result.setHours(datePatternMap[eachDatePattern]);
                    break;
                case"m+":
                    result.setMinutes(datePatternMap[eachDatePattern]);
                    break;
                case"s+":
                    result.setSeconds(datePatternMap[eachDatePattern])
            }
        return result
    },

    addYears: function (date, years) {
        if (null != date && void 0 != date && "object" == typeof date) {
            var fullYear = date.getFullYear();
            date.setFullYear(fullYear + years)
        }
    },
    addMonths: function (date, months) {
        return null == date || void 0 == date || "object" != typeof date ? null : void date.setMonth(date.getMonth() + months)
    },
    addWeeks: function (date, weeks) {
        if (null == date || void 0 == date || "object" != typeof date)return null;
        var days = 7 * weeks;
        this.addDays(date, days)
    },
    addDays: function (date, days) {
        return null == date || void 0 == date || "object" != typeof date ? null : void date.setDate(date.getDate() + days)
    },
    addHours: function (date, hours) {
        return null == date || void 0 == date || "object" != typeof date ? null : void date.setHours(date.getHours() + hours)
    },
    addMinutes: function (date, minutes) {
        return null == date || void 0 == date || "object" != typeof date ? null : void date.setMinutes(date.getMinutes() + minutes)
    },
    addSeconds: function (date, seconds) {
        return null == date || void 0 == date || "object" != typeof date ? null : void date.setSeconds(date.getSeconds() + seconds)
    },
    addMilliseconds: function (date, milliseconds) {
        return null == date || void 0 == date || "object" != typeof date ? null : void date.setMilliseconds(date.getMilliseconds() + milliseconds)
    },
    format: function (date, pattern) {
        return "object" != typeof date && (date = this.now()), date.format(pattern)
    },
    isLeapYear: function (date) {
        if (null == date || void 0 == date || "object" != typeof date)return !1;
        var year = date.getFullYear();
        return year % 100 != 0 && year % 4 == 0 || year % 400 == 0
    },

    /**
     * 比较时间
     * @param date1
     * @param date2
     * @returns {number} 第一个时间比较早，则返回1；相同，则返回0；第一个时间比较晚，则返回-1
     */
    compare: function (date1, date2) {
        var numericDate1 = DateUtil.format(date1, this.FORMATER_NUMBER_TYPE),
            numericDate2 = DateUtil.format(date2, this.FORMATER_NUMBER_TYPE),
            intDate1 = numericDate1.toInt(),
            intDate2 = numericDate2.toInt(),
            differ = intDate1 - intDate2;
        return differ > 0 ? 1 : 0 > differ ? -1 : 0
    }
};