/**
 * @file js common function
 * @author lie
 */
(function (w) {
    w.$$ = {
        Global: {

        },
        Const: {

        },
        Helper: {
            cookie: {
                get: function (sKey) {
                    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
                },
                set: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
                    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
                        return false;
                    }
                    var sExpires = "";
                    if (vEnd) {
                        switch (vEnd.constructor) {
                            case Number:
                                sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                                break;
                            case String:
                                sExpires = "; expires=" + vEnd;
                                break;
                            case Date:
                                sExpires = "; expires=" + vEnd.toUTCString();
                                break;
                        }
                    }
                    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
                    return true;
                },
                del: function (sKey, sPath, sDomain) {
                    if (!sKey || !this.hasCookie(sKey)) {
                        return false;
                    }
                    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
                    return true;
                },
                isHas: function (sKey) {
                    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
                },
                getKeys: function () {
                    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
                    for (var nIdx = 0; nIdx < aKeys.length; nIdx++) {
                        aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
                    }
                    return aKeys;
                }
            },
            session: {
                get: function (key) {
                    return sessionStorage[key];
                },
                set: function (key, val) {
                    sessionStorage[key] = val;
                }
            },
            local: {
                get: function (key) {
                    return localStorage[key];
                },
                set: function (key, val) {
                    localStorage[key] = val;
                }
            },
            array: {
                deepEmpty: function (arr) {
                    arr.length = 0;
                },
                empty: function (arr) {
                    arr = [];
                },
                distinct: function (arr) {
                    var o = {};
                    if (Array.isArray(arr) && arr.length > 0) {
                        for (var i = 0, l = arr.length; i < l; i++) {
                            o[arr[i]] = arr[i];
                        }
                        return Object.keys(o);
                    }
                    return [];
                }
            },
            extend: function () {
                var index = 0, isDeep = false, obj, copy, destination, source, i;

                if ($$.Verify.isBoolean(arguments[0])) {
                    index = 1
                    isDeep = arguments[0]
                }
                for (i = arguments.length - 1; i > index; i--) {
                    destination = arguments[i - 1]
                    source = arguments[i]
                    if ($$.Verify.isObject(source) || $$.Verify.isArray(source)) {
                        for (var property in source) {
                            obj = source[property];
                            if (isDeep && ($$.Verify.isObject(obj) || $$.Verify.isArray(obj))) {
                                copy = $$.Verify.isObject(obj) ? {} : []
                                var extended = this.extend(isDeep, copy, obj)
                                destination[property] = extended;
                            } else {
                                destination[property] = source[property];
                            }
                        }
                    } else {
                        destination = source;
                    }
                }
                return destination
            },
            detectDevice: function () {
                var ua = navigator.userAgent.toLowerCase();
                if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                    return "wx";
                } else if (/iphone|ipad|ipod/.test(ua)) {
                    return "ios";
                } else if (/android/.test(ua)) {
                    return "android";
                }
            },
            getVisibleScreen: function () {
                var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
                    w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                return {
                    'screenWidth': w,
                    'screenHeight': h
                };
            },
            getScrollDistance: function () {
                var y = window.pagYoffset || document.documentElement.scrollTop || document.body.scrollTop,
                    x = window.pagXoffset || document.documentElement.scrollLeft || document.body.scrollLeft;
                return {
                    'scrollX': x,
                    'scrollY': y
                };
            }
        },
        Page: {
            goto: function (url) {
                location.href = url;
            },
            getQueryString: function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) {
                    return unescape(r[2]);
                } else {
                    return null;
                }
            },
            getDomain: function () {
                var ares = w.document.domain.split(':')[0].split('.');
                ares.shift();
                ares.unshift('');
                return ares.join('.')
            }
        },
        Msg: {

        },
        Verify: {
            isArray: function (val) {
                return Object.prototype.toString.call(val) === "[object Array]";
            },
            isObject: function (val) {
                return Object.prototype.toString.call(val) === "[object Object]";
            },
            isBoolean: function (val) {
                return Object.prototype.toString.call(val) === "[object Boolean]";
            },
            checkTel: function (telNum) {
                return /^1[3|4|5|7|8]{1}[0-9]{9}$/.test(telNum);
            },
            checkNum: function (num) {
                return /^[0-9]*$/.test(num);
            },
        },
        Events: {

        },
        Record: {
            /**
             * function description
             * @param datatype description
             * @param datatype description
             * @return datatype description
             */
            log: function (msg) {
                console.log(msg);
            },
            warn: function (msg) {
                console.warn(msg);
            },
            error: function (msg) {
                console.error(msg);
            },
            dir: function (obj) {
                console.dir(obj);
            },
            /**
             * 计时
             * @param {number} 计时开始:1／计时结束:0
             * @param {string} 计时标识
             */
            time: function (type, id) {
                if (type) {
                    console.time(id);
                } else {
                    console.timeEnd(id);
                }
            }
        },
        File: {
            getFileExtension: function (filename) {
                return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
            }
        },
        Dao: null
    };
})(window);
