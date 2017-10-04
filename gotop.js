; (function (window, document, $) {
    "use strict";

    var defaults = {
        width:40,
        height: 40,
        bkColor: "red",
        bottom: 60,
        css:"gotop"
    }

    function Gotop(options) {
        this.options = $.Helper.extend(defaults, options || {});
        this.init();
    }

    Gotop.prototype = {
        constructor: Gotop,
        init: function () {
            this.renderHtml();
            this.bindEvent();
        },
        renderHtml: function () {
            var ele = document.createElement("a");

            ele.href = "javascript:;";
            ele.title = "回到顶部";
            ele.style.borderRadius = this.options.width / 2 + "px";
            ele.style.width = this.options.width + "px";
            ele.style.height = this.options.height + "px";
            ele.style.backgroundColor = this.options.bkColor;
            ele.style.position = "fixed";
            ele.style.right = 0;
            ele.style.bottom = this.options.bottom + "px";
            ele.className = this.options.css;
            document.body.appendChild(ele);
            this.$ele = ele;
        },
        bindEvent: function () {
            var btn = this.$ele,
                timer = null,
                isTop = true,
                clientHeight = document.documentElement.clientHeight || document.body.clientHeight;

            window.onscroll = function () {
                var osTop = document.documentElement.scrollTop || document.body.scrollTop;

                if (osTop >= clientHeight) {
                    btn.style.display = 'block';
                } else {
                    btn.style.display = 'none';
                }
                if (!isTop) {
                    clearInterval(timer);
                }
                isTop = false;
            };
            btn.onclick = function () {
                timer = setInterval(function () {
                    var osTop = document.documentElement.scrollTop || document.body.scrollTop,
                        isSpeed = Math.floor(-osTop / 6);

                    document.documentElement.scrollTop = document.body.scrollTop = osTop + isSpeed;
                    isTop = true;
                    if (osTop === 0) {
                        clearInterval(timer);
                    }
                }, 30);
            };
        },
        destroy: function () {
        }
    }

    $.gotop = function (options) {
        options = $.Helper.extend(defaults, options || {});
        return new Gotop(options);
    };
})(window, document, $$);