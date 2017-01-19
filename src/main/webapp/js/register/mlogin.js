define("m-dialog", [], function (a) {
    function b(a, b) {
        return '<div class="km-dialog-' + a + '">' + (b || "") + "</div>"
    }

    function c(a) {
        this.options = $.extend({}, d, a), this._init(a)
    }

    var d = {
        autoShow: !1,
        type: "alert",
        closeBtn: !0,
        width: 300 * (window.dpr || 1),
        height: "auto",
        title: null,
        content: null,
        isCallNative: !1,
        eventType: "click",
        position: null,
        buttons: null,
        mask: !0,
        elStyle: null,
        elCls: null
    };
    return $.extend(c.prototype, {
        _Events: [], _showByNative: function () {
            var a = this, b = a.options.type || "alert";
            switch (b) {
                case"confirm":
                    var c = {
                        message: a.options.content,
                        okbutton: a.options.buttons[1].name,
                        canclebutton: a.options.buttons[0].name,
                        _index: 10086
                    };
                    window.WindVane.call("WVUIDialog", "confirm", c, a.success, function (b) {
                        a._showByJs()
                    }), a._hasBind || (document.addEventListener("wv.dialog", $.proxy(a.WVdialogHandler, a), !1), a._hasBind = !0);
                    break;
                default:
                    var c = {message: a.options.content, okbutton: a.options.buttons[0].name};
                    window.WindVane.call("WVUIDialog", "alert", c, a.success, function (b) {
                        a._showByJs()
                    })
            }
        }, WVdialogHandler: function (a) {
            var b = this;
            window.setTimeout(function () {
                a.param.type == b.options.buttons[1].name ? b.options.buttons[1].event() : b.options.buttons[0].event()
            }, 1)
        }, success: function (a) {
        }, _init: function () {
            var a = this, c = a.options;
            if (a.options.trigger && (a._triggerHandler = $(a.options.trigger).on(c.eventType, function (b) {
                    b.preventDefault(), a.triggerElement = b.target, a.show()
                })), !this.isCallNative()) {
                var d = '<div class="km-dialog km-dialog-ios7 km-dialog-' + c.type + (c.elCls ? " " + c.elCls : "") + '" style="visibility:hidden">';
                c.title && (d += b("title", c.title)), d += b("content", c.content || ""), c.buttons && (d += '<div class="km-dialog-buttons">', c.buttons.forEach(function (b, e) {
                    d += '<span class="km-dialog-btn" data-idx=' + c.type + e + ">" + b.name + "</span>", a._Events[c.type + e] = b.event
                }), d += "</div>"), d += "</div>", a.container = $(d).appendTo("body").css($.extend({
                    width: c.width,
                    height: c.height
                }, c.elStyle || {})).on(c.eventType, ".km-dialog-btn", function (b) {
                    var c = b.currentTarget || b.target, d = c.getAttribute("data-idx");
                    a._Events[d] && a._Events[d].call(a, b), a.hide(), b.preventDefault()
                })[0], this.options.autoShow && this.show(), a._resizeHandle = $(window).on("resize", function () {
                    a.refresh()
                }), a.refresh()
            }
        }, showMask: function () {
            var a = $(".km-dialog-mask"), b = this;
            a.length ? a.show() : $('<div class="km-dialog-mask"></div>').appendTo("body").on(this.options.eventType, function (a) {
                    b.hide.call(b), a.preventDefault()
                })
        }, hideMask: function () {
            $(".km-dialog-mask").remove()
        }, isCallNative: function () {
            return this.options.isCallNative && navigator.userAgent.match(/WindVane/) && "dialog" !== this.options.type
        }, show: function () {
            this.isCallNative() ? this._showByNative() : this._showByJs()
        }, _showByJs: function () {
            this.options.mask && this.showMask.call(this), $(this.container).css("visibility", "visible"), this.options.afterShow && this.options.afterShow()
        }, hide: function () {
            this.options.mask && this.hideMask(), $(".km-dialog").css("visibility", "hidden"), this.options.afterHide && this.options.afterHide()
        }, destroy: function () {
            if ($(this.container).off(this.options.eventType), $(this.container).remove(), $(window).off({resize: this._resizeHandle}), document.removeEventListener("wv.dialog", this.WVdialogHandler, !1), this.options.trigger) {
                var a = {};
                a[eventType] = this._triggerHandler, $(this.options.trigger).off(a)
            }
        }, title: function (a) {
            var c = this.container, d = $(".km-dialog-title", c);
            if (d.length > 0) d.html(a); else var d = $(b("title", a)).prependTo(c);
            this.refresh()
        }, content: function (a) {
            this.options.content = a, this.isCallNative() || ($(".km-dialog-content", this.container).html(a), this.refresh())
        }, refresh: function () {
            this.options.position ? $(this.container).css(this.options.position) : $(this.container).css({
                    "margin-left": "-" + this.options.width / 2 + "px",
                    "margin-top": "-" + ("auto" !== this.options.height ? this.options.height : $(this.container).offset().height) / 2 + "px"
                })
        }, getContainer: function () {
            return this.container
        }
    }), $.fn.dialog = function (a) {
        return a.trigger = this, new c(a)
    }, c
}), define("mLogin", [], function (a) {
    function b(a) {
        this.cfg = $.extend({}, d, a), this._init()
    }

    var c = a("m-dialog"), d = {
        usrName: $("#username"),
        passWord: $("#password"),
        passWord2: $("#password2"),
        errorContent: $("#loginError"),
        submitBtn: $("#submit-btn"),
        loginForm: $("#loginForm")
    }, e = new c({
        buttons: [{
            name: "\u786e\u5b9a", event: function () {
                e.hide()
            }
        }], mask: !0
    });
    return $.extend(b.prototype, {
        _init: function () {
            this.handerError(), this._initSubBtn(), this._initInputClear(), this._bindEvent()
        }, _bindEvent: function () {
            var a = this;
            this.cfg.submitBtn.on("click", function (b) {
                b.preventDefault(), a.loginCheck() && (a.passwordRSA(), a.submitForm())
            }), $("#imgCheckcode").length > 0 && a._initImgCheckCode()
        }, _initSubBtn: function () {
            function a() {
                var a = !0;
                return $.each(c, function (b, c) {
                    a = a && !!c.value
                }), a
            }

            function b() {
                a() ? d.removeAttr("disabled") : d.attr("disabled", "disabled")
            }

            var c = $(".input-required"), d = this.cfg.submitBtn;
            b(), $.each(c, function (a, c) {
                var c = $(c);
                c.on("input", b), c.on("focus", b), c.on("blur", b)
            })
        }, _initInputClear: function () {
            var a = $(".autoClear"), b = this;
            $.each(a, function (a, c) {
                var d = $(c).find(".icon-clear"), e = $(c).find('input[type="text"],input[type="password"],input[type="number"],input[type="tel"],input[type="email"],input[type="url"],input[type="search"]'), f = b.cfg.submitBtn;
                d && e && (d.on("touchstart", function (a) {
                    a.preventDefault(), e.val(""), e[0].focus(), d[0].style.visibility = "hidden", f.attr("disabled", "disabled")
                }, !1), d.on("click", function (a) {
                    a.preventDefault(), e.val(""), e[0].focus(), d[0].style.visibility = "hidden", f.attr("disabled", "disabled")
                }, !1), e.on("focus", function (a) {
                    a.preventDefault(), d[0].style.visibility = e.val().length > 0 ? "visible" : "hidden"
                }, !1), e.on("input", function (a) {
                    a.preventDefault(), d[0].style.visibility = e.val().length > 0 ? "visible" : "hidden"
                }, !1), e.on("blur", function (a) {
                    a.preventDefault(), setTimeout(function () {
                        d[0].style.visibility = "hidden"
                    }, 200)
                }, !1))
            })
        }, _initImgCheckCode: function () {
            $(".checkcode-img").click(function (a) {
                a.preventDefault();
                var b = $(this).attr("src"), c = (new Date).getTime();
                $(this).attr("src", b + "&t=" + c)
            })
        }, passwordRSA: function () {
            var a = $("#J_Exponent").val(), b = $("#J_Module").val();
            if ("" == a || "" == b) $("#J_Timestamp").removeAttr("name"), this.cfg.passWord2.removeAttr("name"); else {
                var c = new RSAKey;
                c.setPublic(b, a);
                var d = c.encrypt(this.cfg.passWord.val());
                this.cfg.passWord.removeAttr("name"), this.cfg.passWord2.val(d)
            }
        }, submitForm: function () {
            this.cfg.loginForm[0].submit()
        }, loginCheck: function () {
            var a = this.cfg.usrName.val(), b = this.cfg.passWord.val();
            return "" == $.trim(a) ? (this.showError("\u8bf7\u8f93\u5165\u8d26\u6237\u540d\uff01"), !1) : "" == $.trim(b) ? (this.showError("\u8bf7\u8f93\u5165\u5bc6\u7801"), !1) : !0
        }, handerError: function () {
            this.cfg.errorContent.length > 0 && (e.content(this.cfg.errorContent.html()), e.show())
        }, showError: function (a) {
            e.content(a), e.show()
        }
    }), b
}), $(function () {
    $.use("mLogin", function (a) {
        new a
    })
});