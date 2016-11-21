var template = function (a, b) {
    return template["object" == typeof b ? "render" : "compile"].apply(template, arguments)
};

!function (templateObj, window) {
    "use strict";
    templateObj.version = "2.0.1";
    templateObj.openTag = "<%";
    templateObj.closeTag = "%>";
    templateObj.isEscape = !0;
    templateObj.isCompress = !1;
    templateObj.parser = null;
    templateObj.render = function (templateId, params) {
        var result = loadTemplate(templateId);
        return void 0 === result ?
            error({id: templateId, name: "Render Error", message: "No Template"}) : result(params)
    };
    templateObj.compile = function (b, d) {
        function g(c) {
            try {
                return new k(c) + ""
            } catch (f) {
                return i ? (f.id = b || d, f.name = "Render Error", f.source = d, error(f)) : templateObj.compile(b, d, !0)(c)
            }
        }

        var h = arguments,
            i = h[2],
            j = "anonymous";
        "string" != typeof d && (i = h[1], d = h[0], b = j);
        try {
            var k = f(d, i)
        } catch (l) {
            return l.id = b || d, l.name = "Syntax Error", error(l)
        }
        return g.prototype = k.prototype, g.toString = function () {
            return k.toString()
        }, b !== j && (templates[b] = g), g
    };
    templateObj.helper = function (b, c) {
        templateObj.prototype[b] = c
    };
    templateObj.onerror = function (errorInfo) {
        var errorString = "[template]:\n" + errorInfo.id + "\n\n[name]:\n" + errorInfo.name;
        errorInfo.message && (errorString += "\n\n[message]:\n" + errorInfo.message), errorInfo.line && (errorString += "\n\n[line]:\n" + errorInfo.line, errorString += "\n\n[source]:\n" + errorInfo.source.split(/\n/)[errorInfo.line - 1].replace(/^[\s\t]+/, "")), errorInfo.temp && (errorString += "\n\n[temp]:\n" + errorInfo.temp), window.console && console.error(errorString)
    };
    var templates = {},
        loadTemplate = function (templateId) {
            var templateLoaded = templates[templateId];
            if (void 0 === templateLoaded && "document" in window) {
                var templateElement = document.getElementById(templateId);
                if (templateElement) {
                    var templateText = templateElement.value || templateElement.innerHTML;
                    return templateObj.compile(templateId, templateText.replace(/^\s*|\s*$/g, ""))
                }
            } else if (templates.hasOwnProperty(templateId)) {
                return templateLoaded
            }
        },
        error = function (errorInfo) {
            function c() {
                return c + ""
            }

            return templateObj.onerror(errorInfo), c.toString = function () {
                return "{Template Error}"
            }, c
        },
        f = function () {
            templateObj.prototype = {
                $render: templateObj.render,
                $escape: function (string) {
                    return "string" == typeof string ? string.replace(/&(?![\w#]+;)|[<>"']/g, function (a) {
                        return {"<": "&#60;", ">": "&#62;", '"': "&#34;", "'": "&#39;", "&": "&#38;"}[a]
                    }) : string
                },
                $string: function (a) {
                    return "string" == typeof a || "number" == typeof a ? a : "function" == typeof a ? a() : ""
                }
            };
            var b = Array.prototype.forEach || function (a, b) {
                        for (var c = this.length >>> 0, d = 0; c > d; d++)d in this && a.call(b, this[d], d, this)
                    },
                c = function (a, c) {
                    b.call(a, c)
                },
                d = "break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",
                e = /\/\*(?:.|\n)*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|'[^']*'|"[^"]*"|[\s\t\n]*\.[\s\t\n]*[$\w\.]+/g,
                f = /[^\w$]+/g,
                g = new RegExp(["\\b" + d.replace(/,/g, "\\b|\\b") + "\\b"].join("|"), "g"),
                h = /\b\d[^,]*/g,
                i = /^,+|,+$/g,
                j = function (a) {
                    return a = a.replace(e, "").replace(f, ",").replace(g, "").replace(h, "").replace(i, ""), a = a ? a.split(/,+/) : []
                };
            return function (b, d) {
                function e(b) {
                    return o += b.split(/\n/).length - 1, templateObj.isCompress && (b = b.replace(/[\n\r\t\s]+/g, " ")), b = b.replace(/('|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n"), b = u[1] + "'" + b + "'" + u[2], b + "\n"
                }

                function f(b) {
                    var c = o;
                    if (l ? b = l(b) : d && (b = b.replace(/\n/g, function () {
                            return o++, "$line=" + o + ";"
                        })), 0 === b.indexOf("=")) {
                        var e = 0 !== b.indexOf("==");
                        if (b = b.replace(/^=*|[\s;]*$/g, ""), e && templateObj.isEscape) {
                            var f = b.replace(/\s*\([^\)]+\)/, "");
                            q.hasOwnProperty(f) || /^(include|print)$/.test(f) || (b = "$escape($string(" + b + "))")
                        } else b = "$string(" + b + ")";
                        b = u[1] + b + u[2]
                    }
                    return d && (b = "$line=" + c + ";" + b), g(b), b + "\n"
                }

                function g(a) {
                    a = j(a), c(a, function (a) {
                        p.hasOwnProperty(a) || (h(a), p[a] = !0)
                    })
                }

                function h(a) {
                    var b;
                    "print" === a ? b = w : "include" === a ? (r.$render = q.$render, b = x) : (b = "$data." + a, q.hasOwnProperty(a) && (r[a] = q[a], b = 0 === a.indexOf("$") ? "$helpers." + a : b + "===undefined?$helpers." + a + ":" + b)), s += a + "=" + b + ","
                }

                var i = templateObj.openTag, k = templateObj.closeTag, l = templateObj.parser, m = b, n = "", o = 1, p = {
                    $data: !0,
                    $helpers: !0,
                    $out: !0,
                    $line: !0
                }, q = templateObj.prototype, r = {}, s = "var $helpers=this," + (d ? "$line=0," : ""), t = "".trim, u = t ? ["$out='';", "$out+=", ";", "$out"] : ["$out=[];", "$out.push(", ");", "$out.join('')"], v = t ? "if(content!==undefined){$out+=content;return content}" : "$out.push(content);", w = "function(content){" + v + "}", x = "function(id,data){if(data===undefined){data=$data}var content=$helpers.$render(id,data);" + v + "}";
                c(m.split(i), function (a, b) {
                    a = a.split(k);
                    var c = a[0], d = a[1];
                    1 === a.length ? n += e(c) : (n += f(c), d && (n += e(d)))
                }), m = n, d && (m = "try{" + m + "}catch(e){e.line=$line;throw e}"), m = "'use strict';" + s + u[0] + m + "return new String(" + u[3] + ")";
                try {
                    var y = new Function("$data", m);
                    return y.prototype = r, y
                } catch (z) {
                    throw z.temp = "function anonymous($data) {" + m + "}", z
                }
            }
        }()
}(template, this);

if ("function" == typeof define) {
    define(function (require, exports, module) {
        module.exports = template
    });
} else {
    if ("undefined" != typeof exports) {
        module.exports = template
    }
}