function AuctionTimer(a){"use strict";function b(){var c=e+((new Date).getTime()-f);if(c>h){if(d=g-c,d>100&&n>d){var i=Math.floor(d%1e3/100),j=parseInt(d/1e3%60),o=parseInt(d/1e3/60%60);10>o&&(o="0"+o),10>j&&(j="0"+j);var p=o+"分"+j+"秒"+i;m&&m(p)}else d>-5e3&&100>d&&m&&m("00分00秒0","end");!k&&l&&l(),k=!0}setTimeout(function(){1===TimerHelper.runningTimer[a]&&b()},100)}function c(a,b){b&&b(TimerHelper._showTime(a))}var d,e,f,g,h,i=!1,j=a;j||(j="tag_0"),TimerHelper._tagTimer(j);var k,l,m,n=18e5;this._init=function(a,c,d,j,l){e=a,f=c,g=d,h=j,k=!1,m=l,i===!1&&(i=!0,b())},this._startTime=function(a,b){c(a,b)},this._endTime=function(a,b){c(a,b)},this._switchOffTimer=function(){d=0},this._setStart=function(a){l=a}}var TimerHelper={runningTimer:{},_tagTimer:function(a){TimerHelper.runningTimer[a]=1},_stopTimerByTag:function(a){delete TimerHelper.runningTimer[a]},_showTime:function(a){var b=new Date(a),c=b.getMonth()+1+"月"+b.getDate()+"日&nbsp;"+TimerHelper._format(b.getHours())+":"+TimerHelper._format(b.getMinutes());return c},_format:function(a){return 10>a&&(a="0"+a),a},_stopTimer:function(){TimerHelper.runningTimer={}}};