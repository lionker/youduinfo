function getBaseType(e) {
    return Object.prototype.toString.apply(e).slice(8, -1)
}
function eachObj(e, t) {
    for (var n in e) t(e[n], n, e)
}
function getKeys(e, t) {
    var n = [];
    return eachObj(e,
    function(e, t) {
        n.push(t)
    }),
    n.sort(t)
}
function extend(e, t) {
    return eachObj(t,
    function(t, n) {
        e[n] = t
    }),
    e
}
function getPosition(e) {
    var t = 0,
    n = 0;
    if (!e.tagName) return console.warn("element must be a HTML element object"),
    {
        x: null,
        y: null
    };
    for (; e !== document.body;) t += e.offsetLeft,
    n += e.offsetTop,
    e = e.offsetParent;
    return {
        x: t,
        y: n
    }
} !
function(t) {
    function s(t) {
        this.ele = t,
        this.record = [],
        this.index = 0,
        this.dir = 1,
        this.status = !1
    }
    s.prototype = {
        _toggleClass: function(t, s) {
            var i = this;
            classArr = t.split(" "),
            classArr.forEach(function(t) {
                i.ele.classList.toggle(t)
            }),
            s && setTimeout(s, 10)
        },
        _transfromClass: function(t, s) {
            var i = this;
            this.ele.addEventListener("transitionend",
            function t(e) {
                i.ele === e.target && (s(), i.ele.removeEventListener("transitionend", t))
            }),
            this._toggleClass(t)
        },
        _animationClass: function(t, s) {
            var i = this;
            this.ele.addEventListener("animationend",
            function t(e) {
                i.ele === e.target && (s(), i.ele.removeEventListener("animationend", t))
            }),
            this._toggleClass(t)
        },
        _toggle: function() {
            var t = this.record[this.index];
            if (this.index === this.record.length || -1 === this.index) return this.end && this.end(),
            this.index = this.dir > 0 ? this.index - 1 : 0,
            this.dir *= -1,
            void(this.status = !1);
            switch (t.type) {
            case "class":
                this._toggleClass(t.className, this._toggle.bind(this));
                break;
            case "transfrom":
                this._transfromClass(t.className, this._toggle.bind(this));
                break;
            case "animation":
                this._animationClass(t.className, this._toggle.bind(this))
            }
            this.index += this.dir
        },
        base: function(t) {
            return this.record.push({
                className: t || "js-open",
                type: "class"
            }),
            this
        },
        transfrom: function(t) {
            return this.record.push({
                className: t,
                type: "transfrom"
            }),
            this
        },
        animation: function(t) {
            return this.record.push({
                className: t,
                type: "animation"
            }),
            this
        },
        toggle: function() {
            this.status || (0 !== this.index && this.index !== this.record.length - 1 || (this.status = !0), this._toggle())
        },
        lastStart: function() {
            var t = this;
            return this.status = !1,
            this.index = this.record.length - 1,
            this.dir = -1,
            this.record.forEach(function(s) {
                t.ele.classList.add(s.className)
            }),
            this
        },
        end: function(t) {
            return this.end = t,
            this
        }
    },
    t.Pack = s
} (window); !
function(t) {
    function i(t) {
        var i = t.time,
        e = t.now,
        n = t.aims,
        r = t.spendTime,
        o = e + 60 * (n - e) / (i - r);
        return n - e > 0 ? o >= n ? n: o: o <= n ? n: o
    }
    function e() {
        this.record = [],
        this.timeoutMap = {},
        this.listeners = {
            start: [],
            frame: [],
            end: []
        },
        this.frames = 0,
        this._init()
    }
    e.prototype = {
        _init: function() {
            return this.index = 0,
            this.nowIndex = 0,
            this.timer = null,
            this.time = 0,
            this.startTime = null,
            this.record.forEach(function(t) {
                eachObj(t,
                function(i, e) {~e.indexOf("_") || (t[e].now = t[e].from)
                })
            }),
            this
        },
        _getSpendTime: function() {
            var t, i = this.time,
            e = this.nowIndex;
            return t = this.record.reduce(function(t, i, n) {
                return n < e && (t += i._time),
                t
            },
            0),
            i - t
        },
        _request: function(t) {
            var i = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
            return this.timer = i(t),
            this
        },
        _cancel: function() {
            return (window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame)(this.timer),
            this
        },
        _algorithm: function(t) {
            var e = t.type || "linear",
            n = t.time || 1e3,
            r = t.now,
            o = t.aims || 0,
            s = t.spendTime || 0;
            switch (e) {
            case "linear":
                return i({
                    time:
                    n,
                    now: r,
                    aims: o,
                    spendTime: s
                })
            }
        },
        _emit: function(t, i) {
            return this.listeners[t] && this.listeners[t].forEach(function(t) {
                t(i)
            }),
            this
        },
        on: function(t, i) {
            return~getKeys(this.listeners).indexOf(t) && i && this.listeners[t].push(i),
            this
        },
        from: function(t) {
            t = t || {};
            var i = this.record[this.index] || {};
            return eachObj(t,
            function(t, e) {
                i[e] = {
                    from: t,
                    now: t,
                    to: 0
                }
            }),
            this.record[this.index] = i,
            this
        },
        to: function(t) {
            t = t || {};
            var i = this.record[this.index] || {};
            return eachObj(t,
            function(t, e) {
                i[e] = extend(i[e] || {
                    from: 0,
                    now: 0
                },
                {
                    to: t
                })
            }),
            this.record[this.index] = i,
            this
        },
        transition: function(t) {
            var i, e;
            "string" == typeof t ? e = t: (i = t.type || "linear", e = t.time || 1e3);
            var n = this.record[this.index] || {};
            return extend(n, {
                _time: e,
                _type: i
            }),
            this.record[this.index] = n,
            this
        },
        next: function() {
            return this.index = this.record.length,
            this
        },
        timeout: function(t) {
            if (t && "number" == typeof t) {
                var i = 0 === this.record.length ? -1 : this.index;
                this.timeoutMap[i] = null != this.timeoutMap[i] ? this.timeoutMap[i] + t: t
            }
            return this
        },
        start: function() {
            var t = this.record,
            i = this;
            return this.next()._emit("start")._request(function e() {
                var n = t[i.nowIndex],
                r = {};
                if (!i.startTime && i.timeoutMap[ - 1]) return i.startTime = (new Date).getTime(),
                i.pause(),
                void setTimeout(function() {
                    i._request(e)
                },
                i.timeoutMap[ - 1]);
                if (i.time === n._time) {
                    var o = i.timeoutMap[i.nowIndex];
                    if (i.time = 0, i.nowIndex++, o) return i.pause(),
                    void setTimeout(function() {
                        i._request(e)
                    },
                    o);
                    n = t[i.nowIndex]
                }
                if (i.nowIndex === t.length) return void i._emit("end").close();
                eachObj(n,
                function(t, e) {
                    if (!~e.indexOf("_")) {
                        var o = i._algorithm({
                            type: n._type,
                            time: n._time,
                            now: t.now,
                            aims: t.to,
                            spendTime: i.time
                        });
                        r[e] = o,
                        n[e].now = o,
                        o === t.to && (i.time = n._time)
                    }
                }),
                i.time != n._time && (i.time += 60),
                i._emit("frame", r),
                i.frames++,
                i._request(e)
            })
        },
        pause: function() {
            return this._cancel()
        },
        close: function() {
            return this._cancel()._init()
        }
    },
    t.Amt = e
} (window);
window.addEventListener("load",
function() { !
    function() {
        var e = document.getElementById("page");
        document.getElementById("page-loading").classList.add("js-hidden"),
        e.classList.remove("js-hidden")
    } ()
});
window.addEventListener("load",
function() { !
    function() {
        function e() {
            var e = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
            t.classList[e > 30 ? "add": "remove"]("page__header--small")
        }
        var t = document.getElementById("page-header");
        t && document.addEventListener("scroll", e)
    } (),
    function() {
        var e = document.querySelector("button.page__menu-btn"),
        t = document.querySelector("nav.page__nav");
        if (e && t) {
            var a = new Pack(t);
            a.base("js-open").transfrom("page__nav--open"),
            e.addEventListener("click",
            function() {
                a.toggle()
            })
        }
    } (),
    function() {
        var e = document.getElementById("page-header");
        if (e) {
            var t = e.querySelector(".info__title");
            desc = e.querySelector(".info__desc"),
            t && new Pack(t).base("js-ease-out-leave-active").base("js-ease-out-leave").transfrom("js-ease-out-enter-active").end(function() { ["js-ease-out-enter", "js-ease-out-enter-active", "js-ease-out-leave", "js-ease-out-leave-active"].forEach(function(e) {
                    desc.classList.remove(e)
                })
            }).toggle(),
            desc && new Pack(desc).base("js-ease-out-leave-active").base("js-ease-out-leave").transfrom("js-ease-out-enter-active").end(function() { ["js-ease-out-enter", "js-ease-out-enter-active", "js-ease-out-leave", "js-ease-out-leave-active"].forEach(function(e) {
                    desc.classList.remove(e)
                })
            }).toggle()
        }
    } ()
});
window.addEventListener("load",
function() { !
    function() {
        function t() {
            var t = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop,
            e = n.classList.contains("back-top--hidden") && n.classList.contains("js-hidden"); (t > 350 && e || t < 350 && !e) && o.toggle()
        }
        var n = document.getElementById("back-top"),
        o = new Pack(n);
        n && (o.transfrom("back-top--hidden").base("js-hidden").lastStart(), t(), document.addEventListener("scroll", t), n.addEventListener("click",
        function() { (new Amt).from({
                top: window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop
            }).to({
                top: 0
            }).transition(1e3).on("frame",
            function(t) {
                window.scrollTo(0, t.top)
            }).start()
        }))
    } ()
});
window.addEventListener("load",
function() {
    function e(e) {
        function n() {
            o(t),
            t = i(e.bind(null,
            function() {
                document.removeEventListener("scroll", n)
            }))
        }
        var t = null,
        i = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame,
        o = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
        document.addEventListener("scroll", n),
        n()
    }
    window._skappPostAnimation = function() {
        document.querySelectorAll("article.page__mini-article").forEach(function(n) {
            if (!n.parentElement.parentElement.classList.contains("js-hidden")) {
                var t = getPosition(n),
                i = new Pack(n);
                i.base("js-ease-out-leave-active").base("js-ease-out-leave").transfrom("js-ease-out-enter-active").end(function() { ["js-ease-out-enter", "js-ease-out-enter-active", "js-ease-out-leave", "js-ease-out-leave-active"].forEach(function(e) {
                        n.classList.remove(e)
                    })
                }),
                e(function(e) {
                    t.y - window.scrollY - document.documentElement.clientHeight < 50 && (e(), i.toggle())
                })
            }
        })
    },
    window._skappPostAnimation()
});