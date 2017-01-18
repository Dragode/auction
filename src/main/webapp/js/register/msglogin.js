(function ($) {
    var defaultCfg = {
        count: 60,
        countTemplate: '{count}',
        autoStart: false,
        template: '重新获取'
    };

    $.fn.buttonCount = function (cfg) {
        var self = this,
            count,
            cfg = $.extend(defaultCfg, cfg || {});

        var isEnabled = function () {
                return !self.attr("disabled");
            },
            _bindEvent = function () {
                self.bind('click', function () {
                    handerClick();
                })
            },
            handerClick = function () {
                if (isEnabled()) {
                    var value = $('#phoneNumber').val();
                    if (value == '') {
                        return;
                    }
                    _disable();
                    _start();
                    $.ajax({
                        url: cfg.hook.url,
                        data: {
                            telephone: value,
                        },
                        type: "post",
                        dataType: 'json',
                        success: function (d) {
                            self.trigger("ajaxSuccess", d);
                        },
                        error: function (d) {
                            self.trigger("ajaxError", d);
                        }
                    })
                }
            },
            _start = function () {
                count = cfg.count;
                self.timer && clearInterval(self.timer);
                self.timer = setInterval(clock, 1e3);
                clock();
                self.trigger("start");

                function clock() {
                    if (!count) {
                        stop();
                    } else {
                        self.html(cfg.countTemplate.replace(/{count}/g, count));
                    }
                    count--;
                }
            },
            stop = function () {
                if (self.timer) {
                    clearInterval(self.timer);
                    delete self.timer;
                    self.html(cfg.template);
                    _enable();
                    self.trigger("stop");
                }
            },
            _disable = function () {
                if (isEnabled()) {
                    self.attr('disabled', 'disabled');
                    self.trigger("disable");
                }
            },

            _enable = function () {
                if (!isEnabled()) {
                    self.removeAttr('disabled');
                    $(self).trigger("enable");
                }
            };

        self.init = function () {
            _bindEvent();
            if (cfg.autoStart) {
                handerClick();
            }
        };
        self.stop = stop;
        self.start = handerClick;

        self.init();

        return self;
    };

})(Zepto);


$(function () {
    if ($('#error-msg').length > 0) {
        var dialog = $.fn.dialog({
            buttons: [
                {
                    name: '确定',
                    event: function () {
                        //点击确定跳转
                        location.href = '#';
                    }
                }
            ],
            mask: true
        });

        dialog.content($('#error-msg').html());
        dialog.show();
    }

    var btnCount = $('#getCheckcode').buttonCount({
        count: '60',
        countTemplate: '在 {count} 秒后重发',
        template: '重新获取',
        autoStart: false,
        hook: {
            url: './sms/sendVerificationCodeSms'
        }
    }).bind('ajaxSuccess', function (e, data) {
        if (!data.success) {
            $.errorAlert(data.message, function () {
            });
            btnCount.stop();
            $('#checkcodeWarp').hide();
        }
    });

    var submitBtn = $("#btn-submit").bind('click', function () {
        var msgCheckCode = $('#msgCheckCode').val();
        $.ajax({
            url: './sms/validateCheckCode',
            data: {
                msgCheckCode: msgCheckCode
            },
            type: "post",
            dataType: 'json',
            success: function (response) {
                function getUrlParam(name) {
                    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
                    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
                    if (r != null) return unescape(r[2]);
                    return null; //返回参数值
                }

                if (response && response.success) {
                    var fromPage = getUrlParam("from");
                    if ("goods" == fromPage) {
                        window.location.href = "/goods.html?goodsId=" + getUrlParam("goodsId");
                    }
                } else {
                    var dialog = $.fn.dialog({
                        buttons: [
                            {
                                name: '确定',
                                event: function () {
                                    dialog.hide();
                                }
                            }
                        ],
                        mask: true
                    });
                    dialog.content("验证码输入错误，请重新输入！");
                    dialog.show();
                }

            },
            error: function (response) {
                var dialog = $.fn.dialog({
                    buttons: [
                        {
                            name: '确定',
                            event: function () {
                                dialog.hide();
                            }
                        }
                    ],
                    mask: true
                });
                dialog.content("服务器错误！");
                dialog.show();
            }
        })
    });

});