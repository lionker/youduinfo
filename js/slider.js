$(function(n, e, t, i) {
    Slider = function(e, t) {
        "use strict";
        function i() {
            var n = e.children().first();
            "slide" == t.mode ? n.width(C) : n.children().css({
                position: "absolute",
                left: 0,
                top: 0
            }).first().siblings().hide()
        }
        function c() {
            s = setInterval(function() {
                o(a)
            },
            t.time)
        }
        function o(n) {
            var e;
            e = n == w - 1 ? 0 : n + 1,
            r(e, t.mode)
        }
        function r(n, e) {
            g.stop(!0, !0),
            b.stop(!0, !0),
            "slide" == e ?
            function() {
                if (n > a) g.animate({
                    left: "-=" + Math.abs(n - a) * y + "px"
                },
                v);
                else {
                    if (! (n < a)) return;
                    g.animate({
                        left: "+=" + Math.abs(n - a) * y + "px"
                    },
                    v)
                }
            } () : function() {
                g.children(":visible").index() != n && g.children().fadeOut(v).eq(n).fadeIn(v)
            } ();
            try {
                x.children("." + h).removeClass(h),
                x.children().eq(n).addClass(h)
            } catch(n) {}
            a = n,
            t.exchangeEnd && "function" == typeof t.exchangeEnd && t.exchangeEnd.call(this, a)
        }
        function l() {
            clearInterval(s)
        }
        function f() {
            l(),
            o(0 == a ? w - 2 : a - 2),
            m && c()
        }
        function u() {
            l(),
            o(a == w - 1 ? -1 : a),
            m && c()
        }
        function d() {
            l(),
            o(0 == a ? 0 : a - 1),
            m && c()
        }
        if (e) {
            var s, t = t || {},
            a = 0,
            h = t.activeControllerCls,
            v = t.delay,
            m = t.auto,
            x = t.controller,
            p = t.event,
            g = e.children().first(),
            b = g.children(),
            w = b.length,
            y = e.width(),
            C = y * b.length;
            return function() {
                var e = x.children();
                i(),
                "hover" == p ? e.mouseover(function() {
                    l(),
                    r(n(this).index(), t.mode)
                }).mouseout(function() {
                    m && c()
                }) : e.click(function() {
                    l(),
                    r(n(this).index(), t.mode),
                    m && c()
                }),
                m && c()
            } (),
            {
                prev: function() {
                    f()
                },
                next: function() {
                    u()
                },
                current: function() {
                    d()
                }
            }
        }
    }
} (jQuery, window, document));