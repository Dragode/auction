/**
 *扩展原生Date的函数
 * @function
 *      Date.format,
 *      Date.addYears
 *      Date.addMonths
 *      Date.addDays
 *      Date.addHours
 *      Date.addMinutes
 *      Date.addSeconds
 *      Date.addWeeks
 *      Date.isLeapYear
 */
Date.prototype.format || (Date.prototype.format = function (pattern) {
    var FORMATER_LONG_NORMAL = "yyyy-MM-dd hh:mm:ss";
    (null == pattern || void 0 == pattern || "" == pattern) && (pattern = FORMATER_LONG_NORMAL);
    var patternMap = {
        "y+": this.getFullYear() + "",
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds()
    };
    for (var eachPattern in patternMap) {
        var date = patternMap[eachPattern].toString();
        if (new RegExp("(" + eachPattern + ")").test(pattern)) {
            var e = 1 == RegExp.$1.length ? date : ("00" + date).substr(date.length);
            RegExp.$1.length > 2 && "y+" == eachPattern && (e = date), pattern = pattern.replace(RegExp.$1, e)
        }
    }
    return pattern
});

Date.prototype.addYears || (Date.prototype.addYears = function (years) {
    var b = this.getFullYear();
    this.setFullYear(b + years)
});

Date.prototype.addMonths || (Date.prototype.addMonths = function (months) {
    this.setMonth(this.getMonth() + months)
});

Date.prototype.addDays || (Date.prototype.addDays = function (days) {
    this.setDate(this.getDate() + days)
});

Date.prototype.addHours || (Date.prototype.addHours = function (hours) {
    this.setHours(this.getHours() + hours)
});

Date.prototype.addMinutes || (Date.prototype.addMinutes = function (minutes) {
    this.setMinutes(this.getMinutes() + minutes)
});

Date.prototype.addSeconds || (Date.prototype.addSeconds = function (seconds) {
    this.setSeconds(this.getSeconds() + seconds)
});

Date.prototype.addWeeks || (Date.prototype.addWeeks = function (weeks) {
    this.setDate(this.getDate() + 7 * weeks)
});

Date.prototype.isLeapYear || (Date.prototype.isLeapYear = function () {
    var fullYear = this.getFullYear();
    return fullYear % 100 != 0 && fullYear % 4 == 0 || fullYear % 400 == 0
});