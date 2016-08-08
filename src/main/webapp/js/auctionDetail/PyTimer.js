function PyKeyStore() {
    var a = this, b = new Object;
    this.set = function (a, c) {
        b[a] = c
    }, this.get = function (a) {
        return b.hasOwnProperty(a) ? b[a] : null
    }, this.hasKey = function (a) {
        return b.hasOwnProperty(a)
    }, this.remove = function (c) {
        a.hasKey(c) && delete b[c]
    }, this.foreach = function (a) {
        for (var c in b)a && a(c, b[c])
    }, this.removeAll = function () {
        a.foreach(function (b, c) {
            a.remove(b)
        })
    }, this.count = function () {
        var a = 0;
        for (var c in b)a++;
        return a
    }
}
function PyTimer() {
    var a, b = 100, c = new PyKeyStore, d = 18e5, e = this;
    this.set = function (a, b) {
        c.set(a, b)
    }, this.get = function (a) {
        return c.get(a)
    }, this.count = function () {
        return c.count()
    }, this.remove = function (a) {
        c.remove(a)
    }, this.start = function () {
        e.stop(), a = setTimeout(this.process, b)
    }, this.stop = function () {
        a && clearTimeout(a)
    }, this.processTime = function (a) {
        if (!a)return "FINISH";
        var b = a.serverTime + ((new Date).getTime() - a.clientTime), c = a.endTime - b;
        if (b > a.startTime && c > 100 && d > c) {
            var e = Math.floor(c % 1e3 / 100), f = parseInt(c / 1e3 % 60), g = parseInt(c / 1e3 / 60 % 60);
            10 > g && (g = "0" + g), 10 > f && (f = "0" + f);
            var h = g + "分" + f + "秒" + e;
            return h
        }
        return b > a.startTime && c > d ? "WAIT" : "FINISH"
    }, this.process = function () {
        c.foreach(function (a, b) {
            var c = e.processTime(b);
            b.now = c
        }), c.foreach(function (a, b) {
            b && b.callback && b.callback(b.now), "FINISH" == b.now && c.remove(a)
        }), a && clearTimeout(a), c && c.count() > 0 && (a = setTimeout(e.process, b))
    }
}