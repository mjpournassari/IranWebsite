(function (f) {
    f.html5 = {};
    f.html5.version = "6.7.4071"
})(jwplayer);
(function (f) {
    var g = document;
    f.parseDimension = function (a) {
        if ("string" == typeof a) {
            if ("" === a) return 0;
            if (!(-1 < a.lastIndexOf("%"))) return parseInt(a.replace("px", ""), 10)
        }
        return a
    };
    f.timeFormat = function (a) {
        if (0 < a) {
            var c = Math.floor(a / 3600),
                d = Math.floor((a - 3600 * c) / 60);
            a = Math.floor(a % 60);
            return (c ? c + ":" : "") + (10 > d ? "0" : "") + d + ":" + (10 > a ? "0" : "") + a
        }
        return "00:00"
    };
    f.bounds = function (a) {
        var c = {
            left: 0,
            right: 0,
            width: 0,
            height: 0,
            top: 0,
            bottom: 0
        };
        if (!a || !g.body.contains(a)) return c;
        if (a.getBoundingClientRect) {
            a = a.getBoundingClientRect(a);
            var d = window.pageYOffset,
                b = window.pageXOffset;
            if (!a.width && !a.height && !a.left && !a.top) return c;
            c.left = a.left + b;
            c.right = a.right + b;
            c.top = a.top + d;
            c.bottom = a.bottom + d;
            c.width = a.right - a.left;
            c.height = a.bottom - a.top
        } else {
            c.width = a.offsetWidth | 0;
            c.height = a.offsetHeight | 0;
            do c.left += a.offsetLeft | 0, c.top += a.offsetTop | 0; while (a = a.offsetParent);
            c.right = c.left + c.width;
            c.bottom = c.top + c.height
        }
        return c
    };
    f.empty = function (a) {
        if (a)
            for (; 0 < a.childElementCount; ) a.removeChild(a.children[0])
    }
})(jwplayer.utils);
(function (f) {
    function g() {
        var a = document.createElement("style");
        a.type = "text/css";
        document.getElementsByTagName("head")[0].appendChild(a);
        return a
    }

    function a(a) {
        if (w) d[a].innerHTML = c(a);
        else {
            var b = d[a].sheet,
                e = m[a];
            if (b) {
                var g = b.cssRules;
                f.exists(e) && e < g.length && g[e].selectorText == a ? b.deleteRule(e) : m[a] = g.length;
                b.insertRule(c(a), m[a])
            }
        }
    }

    function c(a) {
        var b = a + "{\n";
        h(e[a], function (a, e) {
            b += "  " + a + ": " + e + ";\n"
        });
        return b += "}\n"
    }
    var d = {}, b, e = {}, k = 0,
        l = f.exists,
        h = f.foreach,
        m = {}, w = !1,
        n = f.css = function (c,
            j, m) {
            if (!d[c])
                if (w) d[c] = g();
                else {
                    if (!b || 5E4 < b.sheet.cssRules.length) b = g();
                    d[c] = b
                }
            l(m) || (m = !1);
            e[c] || (e[c] = {});
            h(j, function (a, b) {
                a: 
                {
                    var d = b;
                    if ("undefined" === typeof d) b = void 0;
                    else {
                        var j = m ? " !important" : "";
                        if (isNaN(d)) b = d.match(/png|gif|jpe?g/i) && 0 > d.indexOf("url") ? "url(" + d + ")" : d + j;
                        else switch (a) {
                            case "z-index":
                            case "opacity":
                                b = d + j;
                                break a;
                            default:
                                b = a.match(/color/i) ? "#" + f.pad(d.toString(16).replace(/^0x/i, ""), 6) + j : 0 === d ? 0 + j : Math.ceil(d) + "px" + j
                        }
                    }
                }
                l(e[c][a]) && !l(b) ? delete e[c][a] : l(b) && (e[c][a] = b)
            });
            0 < k || a(c)
        };
    n.block = function () {
        k++
    };
    n.unblock = function () {
        k = Math.max(k - 1, 0);
        0 == k && h(d, function (b) {
            a(b)
        })
    };
    f.clearCss = function (b) {
        h(e, function (a) {
            0 <= a.indexOf(b) && delete e[a]
        });
        h(d, function (c) {
            0 <= c.indexOf(b) && a(c)
        })
    };
    f.transform = function (a, b) {
        var c = "-transform",
            d;
        b = b ? b : "";
        "string" == typeof a ? (d = {}, d["-webkit" + c] = b, d["-ms" + c] = b, d["-moz" + c] = b, d["-o" + c] = b, f.css(a, d)) : (c = "Transform", d = a.style, d["webkit" + c] = b, d["Moz" + c] = b, d["ms" + c] = b, d["O" + c] = b)
    };
    f.dragStyle = function (a, b) {
        f.css(a, {
            "-webkit-user-select": b,
            "-moz-user-select": b,
            "-ms-user-select": b,
            "-webkit-user-drag": b,
            "user-select": b,
            "user-drag": b
        })
    };
    f.transitionStyle = function (a, b) {
        navigator.userAgent.match(/5\.\d(\.\d)? safari/i) || f.css(a, {
            "-webkit-transition": b,
            transition: b
        })
    };
    f.rotate = function (a, b) {
        f.transform(a, "rotate(" + b + "deg)")
    };
    n(".jwplayer " + " div span a img ul li video".split(" ").join(",.jwplayer ") + ", .jwclick", {
        margin: 0,
        padding: 0,
        border: 0,
        color: "#000000",
        "font-size": "100%",
        font: "inherit",
        "vertical-align": "baseline",
        "background-color": "transparent",
        "text-align": "left",
        direction: "ltr",
        "-webkit-tap-highlight-color": "rgba(255, 255, 255, 0)"
    });
    n(".jwplayer ul", {
        "list-style": "none"
    })
})(jwplayer.utils);
(function (f) {
    f.scale = function (a, c, d, b, e) {
        var g = f.exists;
        g(c) || (c = 1);
        g(d) || (d = 1);
        g(b) || (b = 0);
        g(e) || (e = 0);
        f.transform(a, 1 == c && 1 == d && 0 == b && 0 == e ? "" : "scale(" + c + "," + d + ") translate(" + b + "px," + e + "px)")
    };
    f.stretch = function (a, c, d, b, e, k) {
        if (c && (a || (a = g.UNIFORM), d && b && e && k)) {
            var l = d / e,
                h = b / k,
                m = "video" == c.tagName.toLowerCase(),
                w = !1,
                n;
            m && f.transform(c);
            n = "jw" + a.toLowerCase();
            switch (a.toLowerCase()) {
                case g.FILL:
                    l > h ? (e *= l, k *= l) : (e *= h, k *= h);
                case g.NONE:
                    l = h = 1;
                case g.EXACTFIT:
                    w = !0;
                    break;
                default:
                    l > h ? 0.95 < e * h / d ? (w = !0, n =
                    "jwexactfit") : (e *= h, k *= h) : 0.95 < k * l / b ? (w = !0, n = "jwexactfit") : (e *= l, k *= l), w && (h = Math.ceil(100 * b / k) / 100, l = Math.ceil(100 * d / e) / 100)
            }
            m ? w ? (c.style.width = e + "px", c.style.height = k + "px", f.scale(c, l, h, (d - e) / 2 / l, (b - k) / 2 / h)) : (c.style.width = "", c.style.height = "") : (c.className = c.className.replace(/\s*jw(none|exactfit|uniform|fill)/g, ""), c.className += " " + n)
        }
    };
    var g = f.stretching = {
        NONE: "none",
        FILL: "fill",
        UNIFORM: "uniform",
        EXACTFIT: "exactfit"
    }
})(jwplayer.utils);
(function (f) {
    f.dfxp = function (g, a) {
        var c, d, b = jwplayer.utils.seconds;
        this.load = function (b) {
            d = b;
            try {
                c.open("GET", b, !0), c.send(null)
            } catch (g) {
                a("Error loading DFXP File: " + b)
            }
        };
        c = new XMLHttpRequest;
        c.onreadystatechange = function () {
            if (4 === c.readyState)
                if (200 === c.status) {
                    for (var e = c.responseText, k = [{
                        begin: 0,
                        text: ""
                    }], e = e.replace(/^\s+/, "").replace(/\s+$/, ""), l = e.split("\x3c/p\x3e"), h = e.split("\x3c/tt:p\x3e"), m = [], e = 0; e < l.length; e++) 0 <= l[e].indexOf("\x3cp") && (l[e] = l[e].substr(l[e].indexOf("\x3cp") + 2).replace(/^\s+/,
                        "").replace(/\s+$/, ""), m.push(l[e]));
                    for (e = 0; e < h.length; e++) 0 <= h[e].indexOf("\x3ctt:p") && (h[e] = h[e].substr(h[e].indexOf("\x3ctt:p") + 5).replace(/^\s+/, "").replace(/\s+$/, ""), m.push(h[e]));
                    l = m;
                    for (e = 0; e < l.length; e++) {
                        h = l[e];
                        m = {};
                        try {
                            var w = h.indexOf('begin\x3d"'),
                                h = h.substr(w + 7),
                                w = h.indexOf('" end\x3d"');
                            m.begin = b(h.substr(0, w));
                            h = h.substr(w + 7);
                            w = h.indexOf('"');
                            m.end = b(h.substr(0, w));
                            w = h.indexOf('"\x3e');
                            h = h.substr(w + 2);
                            m.text = h
                        } catch (n) { }
                        h = m;
                        h.text && (k.push(h), h.end && (k.push({
                            begin: h.end,
                            text: ""
                        }),
                            delete h.end))
                    }
                    1 < k.length ? g(k) : a("Invalid DFXP file: " + d)
                } else k = c.status, 0 == k ? a("Crossdomain loading denied: " + d) : 404 == k ? a("DFXP File not found: " + d) : a("Error " + k + " loading DFXP file: " + d)
        }
    }
})(jwplayer.parsers);
(function (f) {
    f.srt = function (g, a, c) {
        function d(b) {
            0 == b ? a("Crossdomain loading denied: " + k) : 404 == b ? a("SRT File not found: " + k) : a("Error " + b + " loading SRT file: " + k)
        }

        function b(b) {
            var d = c ? [] : [{
                begin: 0,
                text: ""
            }];
            b = l.trim(b);
            var e = b.split("\r\n\r\n");
            1 == e.length && (e = b.split("\n\n"));
            for (b = 0; b < e.length; b++)
                if ("WEBVTT" != e[b]) {
                    var f, j = e[b];
                    f = {};
                    var r = j.split("\r\n");
                    1 == r.length && (r = j.split("\n"));
                    try {
                        j = 1;
                        0 < r[0].indexOf(" --\x3e ") && (j = 0);
                        var p = r[j].indexOf(" --\x3e ");
                        0 < p && (f.begin = h(r[j].substr(0, p)), f.end =
                            h(r[j].substr(p + 5)));
                        if (r[j + 1]) {
                            f.text = r[j + 1];
                            for (j += 2; j < r.length; j++) f.text += "\x3cbr/\x3e" + r[j]
                        }
                    } catch (B) { }
                    f.text && (d.push(f), f.end && !c && (d.push({
                        begin: f.end,
                        text: ""
                    }), delete f.end))
                }
            1 < d.length ? g(d) : a("Invalid SRT file: " + k)
        }
        var e, k, l = jwplayer.utils,
            h = l.seconds;
        this.load = function (c) {
            k = c;
            try {
                var g;
                g = c && 0 <= c.indexOf("://") && c.split("/")[2] != window.location.href.split("/")[2] ? !0 : !1;
                g && l.exists(window.XDomainRequest) && (e = new XDomainRequest, e.onload = function () {
                    b(e.responseText)
                }, e.onerror = function () {
                    d(e.status)
                });
                e.open("GET", c, !0);
                e.send(null)
            } catch (h) {
                a("Error loading SRT File: " + c)
            }
        };
        e = new XMLHttpRequest;
        e.onreadystatechange = function () {
            4 === e.readyState && (200 === e.status ? b(e.responseText) : d(e.status))
        }
    }
})(jwplayer.parsers);
(function (f) {
    var g = jwplayer.utils,
        a = jwplayer.events,
        c = a.state,
        d = jwplayer.parsers,
        b = g.css,
        e = "playing",
        k = document;
    f.captions = function (b, h) {
        function m(a) {
            console.log("CAPTIONS(" + a + ")")
        }

        function f(a) {
            (F = a.fullscreen) ? (n(), setTimeout(n, 500)) : p(!0)
        }

        function n() {
            var a = q.offsetHeight,
                b = q.offsetWidth;
            0 != a && 0 != b && u.resize(b, Math.round(0.94 * a))
        }

        function z(a) {
            a = a.responseXML.firstChild;
            "xml" == d.localName(a) && (a = a.nextSibling);
            for (; a.nodeType == a.COMMENT_NODE; ) a = a.nextSibling;
            ("tt" == d.localName(a) ? new jwplayer.parsers.dfxp(r,
                m) : new jwplayer.parsers.srt(r, m)).load(D)
        }

        function j() {
            (new jwplayer.parsers.srt(r, m)).load(D)
        }

        function r(a) {
            u.populate(a);
            t < x.length && (x[t].data = a);
            p(!1)
        }

        function p(a) {
            x.length ? E == e && 0 < C ? (u.show(), F ? f({
                fullscreen: !0
            }) : (B(), a && setTimeout(B, 500))) : u.hide() : u.hide()
        }

        function B() {
            u.resize()
        }

        function A(a) {
            0 < a ? (t = a - 1, C = a) : C = 0;
            t >= x.length || (x[t].data ? u.populate(x[t].data) : (D = a = x[t].file, g.ajax(a, z, j)), p(!1))
        }

        function I() {
            var a = [];
            a.push({
                label: "Off"
            });
            for (var b = 0; b < x.length; b++) a.push({
                label: x[b].label
            });
            return a
        }
        var q, s = {
            back: !0,
            color: "#FFFFFF",
            fontSize: 15,
            fontFamily: "Arial,sans-serif"
        }, y = {
            fontStyle: "normal",
            fontWeight: "normal",
            textDecoration: "none"
        }, u, E, t, x = [],
            C = 0,
            F = !1,
            D, L = new a.eventdispatcher;
        g.extend(this, L);
        this.element = function () {
            return q
        };
        this.getCaptionsList = function () {
            return I()
        };
        this.getCurrentCaptions = function () {
            return C
        };
        this.setCurrentCaptions = function (b) {
            if (0 <= b && C != b && b <= x.length) {
                A(b);
                b = I();
                g.saveCookie("captionLabel", b[C].label);
                var c = a.JWPLAYER_CAPTIONS_CHANGED;
                L.sendEvent(c, {
                    type: c,
                    tracks: b,
                    track: C
                })
            }
        };
        q = k.createElement("div");
        q.id = b.id + "_caption";
        q.className = "jwcaptions";
        b.jwAddEventListener(a.JWPLAYER_PLAYER_STATE, function (a) {
            switch (a.newstate) {
                case c.IDLE:
                    E = "idle";
                    p(!1);
                    break;
                case c.PLAYING:
                    E = e, p(!1)
            }
        });
        b.jwAddEventListener(a.JWPLAYER_PLAYLIST_ITEM, function () {
            t = 0;
            x = [];
            u.update(0);
            for (var c = b.jwGetPlaylist()[b.jwGetPlaylistIndex()].tracks, d = [], e = 0, j = "", h = 0, j = "", e = 0; e < c.length; e++) j = c[e].kind.toLowerCase(), ("captions" == j || "subtitles" == j) && d.push(c[e]);
            for (e = C = 0; e < d.length; e++)
                if (j =
                    d[e].file) d[e].label || (d[e].label = e.toString()), x.push(d[e]);
            for (e = 0; e < x.length; e++)
                if (x[e]["default"]) {
                    h = e + 1;
                    break
                }
            if (j = g.getCookies().captionLabel) {
                c = I();
                for (e = 0; e < c.length; e++)
                    if (j == c[e].label) {
                        h = e;
                        break
                    }
            }
            A(h);
            p(!1);
            c = a.JWPLAYER_CAPTIONS_LIST;
            d = I();
            L.sendEvent(c, {
                type: c,
                tracks: d,
                track: C
            })
        });
        b.jwAddEventListener(a.JWPLAYER_MEDIA_ERROR, m);
        b.jwAddEventListener(a.JWPLAYER_ERROR, m);
        b.jwAddEventListener(a.JWPLAYER_READY, function () {
            g.foreach(s, function (a, b) {
                h && void 0 != h[a.toLowerCase()] ? "color" == a ? y.color =
                    "#" + String(h.color).substr(-6) : y[a] = h[a.toLowerCase()] : y[a] = b
            });
            u = new jwplayer.html5.captions.renderer(y, q);
            p(!1)
        });
        b.jwAddEventListener(a.JWPLAYER_MEDIA_TIME, function (a) {
            u.update(a.position)
        });
        b.jwAddEventListener(a.JWPLAYER_FULLSCREEN, f);
        b.jwAddEventListener(a.JWPLAYER_RESIZE, function () {
            p(!1)
        })
    };
    b(".jwcaptions", {
        position: "absolute",
        cursor: "pointer",
        width: "100%",
        height: "100%",
        overflow: "hidden"
    })
})(jwplayer.html5);
(function (f) {
    var g = jwplayer.utils.foreach;
    f.captions.renderer = function (a, c) {
        function d(a) {
            k(h, {
                visibility: "hidden"
            });
            m.innerHTML = a;
            z = "" == a ? "hidden" : "visible";
            setTimeout(b, 20)
        }

        function b() {
            var b = h.clientWidth,
                c = Math.round(a.fontSize * Math.pow(b / 400, 0.6)),
                d = Math.round(1.4 * c);
            k(m, {
                maxWidth: b + "px",
                fontSize: c + "px",
                lineHeight: d + "px",
                visibility: z
            })
        }

        function e() {
            for (var a = -1, b = 0; b < l.length; b++)
                if (l[b].begin <= n && (b == l.length - 1 || l[b + 1].begin >= n)) {
                    a = b;
                    break
                } -1 == a ? d("") : a != f && (f = a, d(l[b].text))
        }

        function k(a, b) {
            g(b,
                function (b, c) {
                    a.style[b] = c
                })
        }
        var l, h, m, f, n, z = "visible",
            j;
        this.hide = function () {
            k(h, {
                display: "none"
            });
            j && (clearInterval(j), j = null)
        };
        this.populate = function (a) {
            f = -1;
            l = a;
            e()
        };
        this.resize = function () {
            b()
        };
        h = document.createElement("div");
        m = document.createElement("span");
        h.appendChild(m);
        c.appendChild(h);
        k(h, {
            display: "block",
            height: "auto",
            position: "absolute",
            bottom: "20px",
            textAlign: "center",
            width: "100%"
        });
        k(m, {
            color: "#" + a.color.substr(-6),
            display: "inline-block",
            fontFamily: a.fontFamily,
            fontStyle: a.fontStyle,
            fontWeight: a.fontWeight,
            height: "auto",
            margin: "auto",
            position: "relative",
            textAlign: "center",
            textDecoration: a.textDecoration,
            wordWrap: "break-word",
            width: "auto"
        });
        a.back ? k(m, {
            background: "#000"
        }) : k(m, {
            textShadow: "-2px 0px 1px #000,2px 0px 1px #000,0px -2px 1px #000,0px 2px 1px #000,-1px 1px 1px #000,1px 1px 1px #000,1px -1px 1px #000,1px 1px 1px #000"
        });
        this.show = function () {
            k(h, {
                display: "block"
            });
            j || (j = setInterval(b, 250));
            b()
        };
        this.update = function (a) {
            n = a;
            l && e()
        }
    }
})(jwplayer.html5);
(function (f) {
    var g = f.html5,
        a = f.utils,
        c = f.events,
        d = c.state,
        b = a.css,
        e = a.transitionStyle,
        k = a.isMobile(),
        l = a.isAndroid(4) && !a.isChrome(),
        h = "button",
        m = "text",
        w = "slider",
        n = "none",
        z = "100%",
        j = {
            display: n
        }, r = {
            display: "block"
        }, p = {
            display: q
        }, B = !1,
        A = !0,
        I = null,
        q = void 0,
        s = window,
        y = document;
    g.controlbar = function (e, E) {
        function t(a, b, c) {
            return {
                name: a,
                type: b,
                className: c
            }
        }

        function x(b) {
            var c = B,
                d;
            b.duration == Number.POSITIVE_INFINITY || !b.duration && a.isSafari() && !k ? $.setText(M.jwGetPlaylist()[M.jwGetPlaylistIndex()].title ||
                "Live broadcast") : (H.elapsed && (d = a.timeFormat(b.position), H.elapsed.innerHTML = d, c = d.length != a.timeFormat(Ja).length), H.duration && (d = a.timeFormat(b.duration), H.duration.innerHTML = d, c = c || d.length != a.timeFormat(ra).length), 0 < b.duration ? (ha(b.position / b.duration), c = c || b.duration != ra) : ha(0), ra = b.duration, Ja = b.position, $.setText());
            c && Fa()
        }

        function C() {
            var a = M.jwGetMute();
            P("mute", a);
            aa(a ? 0 : Ta)
        }

        function F() {
            Ta = M.jwGetVolume() / 100;
            aa(Ta)
        }

        function D() {
            b(v(".jwhd"), j);
            b(v(".jwcc"), j);
            ea();
            Fa()
        }

        function L(a) {
            Ka =
                a.currentQuality;
            H.hd && (H.hd.querySelector("button").className = 2 == ia.length && 0 == Ka ? "off" : "");
            sa && 0 <= Ka && sa.setActive(a.currentQuality)
        }

        function Q(a) {
            ja && (La = a.track, H.cc && (H.cc.querySelector("button").className = 2 == ja.length && 0 == La ? "off" : ""), ta && 0 <= La && ta.setActive(a.track))
        }

        function J() {
            S = a.extend({}, da, U.getComponentSettings("controlbar"), E);
            Aa = V("background").height;
            b("#" + ma, {
                height: Aa,
                bottom: va ? 0 : S.margin
            });
            b(v(".jwtext"), {
                font: S.fontsize + "px/" + V("background").height + "px " + S.font,
                color: S.fontcolor,
                "font-weight": S.fontweight
            });
            b(v(".jwoverlay"), {
                bottom: Aa
            });
            0 < S.maxwidth && b(v(), {
                "max-width": va ? q : S.maxwidth
            })
        }

        function v(a) {
            return "#" + ma + (a ? " " + a : "")
        }

        function R() {
            return y.createElement("span")
        }

        function N(c, d, e, g, j) {
            var h = R(),
                k = V(c);
            g = g ? " left center" : " center";
            var m = Y(k);
            h.className = "jw" + c;
            h.innerHTML = "\x26nbsp;";
            if (k && "" != k.src) return e = e ? {
                background: "url('" + k.src + "') repeat-x " + g,
                "background-size": m,
                height: j ? k.height : q
            } : {
                background: "url('" + k.src + "') no-repeat" + g,
                "background-size": m,
                width: k.width,
                height: j ? k.height : q
            }, h.skin = k, b(v((j ? ".jwvertical " : "") + ".jw" + c), a.extend(e, d)), H[c] = h
        }

        function O(a, c, d, e) {
            c && c.src && (b(a, {
                width: c.width,
                background: "url(" + c.src + ") no-repeat center",
                "background-size": Y(c)
            }), d.src && !k && b(a + ":hover," + a + ".off:hover", {
                background: "url(" + d.src + ") no-repeat center",
                "background-size": Y(d)
            }), e && e.src && b(a + ".off", {
                background: "url(" + e.src + ") no-repeat center",
                "background-size": Y(e)
            }))
        }

        function X(a) {
            return function (b) {
                pb[a] && (pb[a](), k && Ma.sendEvent(c.JWPLAYER_USER_ACTION));
                b.preventDefault && b.preventDefault()
            }
        }

        function ba(b) {
            a.foreach(Wa, function (a, c) {
                a != b && ("cc" == a && (clearTimeout(Ba), Ba = q), "hd" == a && (clearTimeout(Ca), Ca = q), c.hide())
            })
        }

        function Z() {
            va || (na.show(), ba("volume"))
        }

        function P(b, c) {
            a.exists(c) || (c = !Xa[b]);
            H[b] && (H[b].className = "jw" + b + (c ? " jwtoggle jwtoggling" : " jwtoggling"), setTimeout(function () {
                H[b].className = H[b].className.replace(" jwtoggling", "")
            }, 100));
            Xa[b] = c
        }

        function Y(a) {
            return a ? parseInt(a.width) + "px " + parseInt(a.height) + "px" : "0 0"
        }

        function ka() {
            ia &&
                2 < ia.length && (db && (clearTimeout(db), db = q), sa.show(), ba("hd"))
        }

        function fa() {
            ja && 2 < ja.length && (eb && (clearTimeout(eb), eb = q), ta.show(), ba("cc"))
        }

        function ga(a) {
            0 <= a && a < ia.length && (M.jwSetCurrentQuality(a), clearTimeout(Ca), Ca = q, sa.hide())
        }

        function la(a) {
            0 <= a && a < ja.length && (M.jwSetCurrentCaptions(a), clearTimeout(Ba), Ba = q, ta.hide())
        }

        function fb() {
            2 == ja.length && la((La + 1) % 2)
        }

        function gb() {
            2 == ia.length && ga((Ka + 1) % 2)
        }

        function Ga(a) {
            a.preventDefault();
            y.onselectstart = function () {
                return B
            }
        }

        function nb() {
            H.timeRail.className =
                "jwrail";
            M.jwGetState() != d.IDLE && (M.jwSeekDrag(A), oa = "time", Na(), Ma.sendEvent(c.JWPLAYER_USER_ACTION))
        }

        function Ya(b) {
            if (oa) {
                var d = (new Date).getTime();
                50 < d - hb && (G(b), hb = d);
                var e = H[oa].getElementsByClassName("jwrail")[0],
                    e = a.bounds(e),
                    e = b.x / e.width;
                100 < e && (e = 100);
                b.type == a.touchEvents.DRAG_END ? (M.jwSeekDrag(B), H.timeRail.className = "jwrail jwsmooth", oa = I, Za.time(e), W()) : (ha(e), 500 < d - ib && (ib = d, Za.time(e)));
                Ma.sendEvent(c.JWPLAYER_USER_ACTION)
            }
        }

        function wa(b) {
            var e = H.time.getElementsByClassName("jwrail")[0],
                e = a.bounds(e);
            b = b.x / e.width;
            100 < b && (b = 100);
            M.jwGetState() != d.IDLE && (Za.time(b), Ma.sendEvent(c.JWPLAYER_USER_ACTION))
        }

        function jb(a) {
            return function (b) {
                0 == b.button && (H[a + "Rail"].className = "jwrail", "time" == a ? M.jwGetState() != d.IDLE && (M.jwSeekDrag(A), oa = a) : oa = a)
            }
        }

        function Oa(b) {
            var c = (new Date).getTime();
            50 < c - hb && (G(b), hb = c);
            if (oa && 0 == b.button) {
                var d = H[oa].getElementsByClassName("jwrail")[0],
                    e = a.bounds(d),
                    d = oa,
                    e = H[d].vertical ? (e.bottom - b.pageY) / e.height : (b.pageX - e.left) / e.width;
                "mouseup" == b.type ? ("time" ==
                    d && M.jwSeekDrag(B), H[d + "Rail"].className = "jwrail jwsmooth", oa = I, Za[d.replace("H", "")](e)) : ("time" == oa ? ha(e) : aa(e), 500 < c - ib && (ib = c, Za[oa.replace("H", "")](e)));
                return !1
            }
        }

        function Na() {
            pa && (ra && !va && !k) && (xa(pa), pa.show())
        }

        function W() {
            pa && pa.hide()
        }

        function G(b) {
            if ((Ha = a.bounds(kb)) && 0 != Ha.width) {
                var c = pa.element();
                b = b.pageX ? b.pageX - Ha.left - s.pageXOffset : b.x;
                0 <= b && b <= Ha.width && (c.style.left = Math.round(b) + "px", T(ra * b / Ha.width), ua = a.bounds(K))
            }
        }

        function T(b) {
            lb.innerHTML = Ua ? Ua.text : a.timeFormat(b);
            $a.updateTimeline(b);
            pa.setContents(ab);
            ua = a.bounds(K);
            xa(pa)
        }

        function za() {
            a.foreach(bb, function (a, b) {
                b.element.style.left = 100 * b.position / ra + "%"
            })
        }

        function ya() {
            eb = setTimeout(ta.hide, 500)
        }

        function mb() {
            db = setTimeout(sa.hide, 500)
        }

        function Pa(a, c, e, d) {
            if (!k) {
                var g = a.element();
                c.appendChild(g);
                c.addEventListener("mousemove", e, B);
                d ? c.addEventListener("mouseout", d, B) : c.addEventListener("mouseout", a.hide, B);
                b("#" + g.id, {
                    left: "50%"
                })
            }
        }

        function qa(d, e, g, j) {
            if (k) {
                var h = d.element();
                e.appendChild(h);
                (new a.touch(e)).addEventListener(a.touchEvents.TAP,
                    function () {
                        var a = g;
                        "cc" == j ? (2 == ja.length && (a = fb), Ba ? (clearTimeout(Ba), Ba = q, d.hide()) : (Ba = setTimeout(function () {
                            d.hide();
                            Ba = q
                        }, 4E3), a()), Ma.sendEvent(c.JWPLAYER_USER_ACTION)) : "hd" == j && (2 == ia.length && (a = gb), Ca ? (clearTimeout(Ca), Ca = q, d.hide()) : (Ca = setTimeout(function () {
                            d.hide();
                            Ca = q
                        }, 4E3), a()), Ma.sendEvent(c.JWPLAYER_USER_ACTION))
                    });
                b("#" + h.id, {
                    left: "50%"
                })
            }
        }

        function Qa(c) {
            var d = R();
            d.className = "jwgroup jw" + c;
            Ra[c] = d;
            if (Ia[c]) {
                var d = Ia[c],
                    e = Ra[c];
                if (d && 0 < d.elements.length)
                    for (var u = 0; u < d.elements.length; u++) {
                        var f;
                        a: 
                        {
                            f = d.elements[u];
                            var D = c;
                            switch (f.type) {
                                case m:
                                    D = void 0;
                                    f = f.name;
                                    var D = {}, p = V(("alt" == f ? "elapsed" : f) + "Background");
                                    if (p.src) {
                                        var r = R();
                                        r.id = ma + "_" + f;
                                        r.className = "elapsed" == f || "duration" == f ? "jwtext jw" + f + " jwhidden" : "jwtext jw" + f;
                                        D.background = "url(" + p.src + ") repeat-x center";
                                        D["background-size"] = Y(V("background"));
                                        b(v(".jw" + f), D);
                                        "alt" != f ? r.innerHTML = "00:00" : r.innerHTML = "";
                                        D = H[f] = r
                                    } else D = null;
                                    f = D;
                                    break a;
                                case h:
                                    if ("blank" != f.name) {
                                        f = f.name;
                                        p = D;
                                        if (!V(f + "Button").src || k && ("mute" == f || 0 == f.indexOf("volume")) ||
                                        l && /hd|cc/.test(f)) f = I;
                                        else {
                                            var D = R(),
                                            r = R(),
                                            s = void 0,
                                            s = ca,
                                            t = N(s.name);
                                            t || (t = R(), t.className = "jwblankDivider");
                                            s.className && (t.className += " " + s.className);
                                            s = t;
                                            t = y.createElement("button");
                                            D.style += " display:inline-block";
                                            D.className = "jw" + f + " jwbuttoncontainer";
                                            "left" == p ? (D.appendChild(r), D.appendChild(s)) : (D.appendChild(s), D.appendChild(r));
                                            k ? "hd" != f && "cc" != f && (new a.touch(t)).addEventListener(a.touchEvents.TAP, X(f)) : t.addEventListener("click", X(f), B);
                                            t.innerHTML = "\x26nbsp;";
                                            r.appendChild(t);
                                            p = V(f +
                                            "Button");
                                            r = V(f + "ButtonOver");
                                            s = V(f + "ButtonOff");
                                            O(v(".jw" + f + " button"), p, r, s);
                                            (p = vb[f]) && O(v(".jw" + f + ".jwtoggle button"), V(p + "Button"), V(p + "ButtonOver"));
                                            f = H[f] = D
                                        }
                                        break a
                                    }
                                    break;
                                case w:
                                    D = void 0;
                                    s = f.name;
                                    if (k && 0 == s.indexOf("volume")) D = void 0;
                                    else {
                                        f = R();
                                        var r = "volume" == s,
                                        E = s + ("time" == s ? "Slider" : "") + "Cap",
                                        p = r ? "Top" : "Left",
                                        D = r ? "Bottom" : "Right",
                                        t = N(E + p, I, B, B, r),
                                        Q = N(E + D, I, B, B, r),
                                        x;
                                        x = s;
                                        var J = r,
                                        la = p,
                                        A = D,
                                        C = R(),
                                        L = ["Rail", "Buffer", "Progress"],
                                        F = void 0;
                                        C.className = "jwrail jwsmooth";
                                        for (var ga = 0; ga < L.length; ga++) {
                                            var ka =
                                            "time" == x ? "Slider" : "",
                                            G = x + ka + L[ga],
                                            K = N(G, I, !J, 0 == x.indexOf("volume"), J),
                                            M = N(G + "Cap" + la, I, B, B, J),
                                            ba = N(G + "Cap" + A, I, B, B, J),
                                            Z = V(G + "Cap" + la),
                                            P = V(G + "Cap" + A);
                                            if (K) {
                                                var S = R();
                                                S.className = "jwrailgroup " + L[ga];
                                                M && S.appendChild(M);
                                                S.appendChild(K);
                                                ba && (S.appendChild(ba), ba.className += " jwcap" + (J ? "Bottom" : "Right"));
                                                b(v(".jwrailgroup." + L[ga]), {
                                                    "min-width": J ? q : Z.width + P.width
                                                });
                                                S.capSize = J ? Z.height + P.height : Z.width + P.width;
                                                b(v("." + K.className), {
                                                    left: J ? q : Z.width,
                                                    right: J ? q : P.width,
                                                    top: J ? Z.height : q,
                                                    bottom: J ? P.height : q,
                                                    height: J ? "auto" : q
                                                });
                                                2 == ga && (F = S);
                                                2 == ga && !J ? (K = R(), K.className = "jwprogressOverflow", K.appendChild(S), H[G] = K, C.appendChild(K)) : (H[G] = S, C.appendChild(S))
                                            }
                                        }
                                        if (la = N(x + ka + "Thumb", I, B, B, J)) b(v("." + la.className), {
                                            opacity: "time" == x ? 0 : 1,
                                            "margin-top": J ? la.skin.height / -2 : q
                                        }), la.className += " jwthumb", (J && F ? F : C).appendChild(la);
                                        k ? (J = new a.touch(C), J.addEventListener(a.touchEvents.DRAG_START, nb), J.addEventListener(a.touchEvents.DRAG, Ya), J.addEventListener(a.touchEvents.DRAG_END, Ya), J.addEventListener(a.touchEvents.TAP,
                                        wa)) : (F = x, "volume" == F && !J && (F += "H"), C.addEventListener("mousedown", jb(F), B));
                                        "time" == x && !k && (C.addEventListener("mousemove", Na, B), C.addEventListener("mouseout", W, B));
                                        x = H[x + "Rail"] = C;
                                        C = V(E + p);
                                        E = V(E + p);
                                        V(s + "SliderRail");
                                        f.className = "jwslider jw" + s;
                                        t && f.appendChild(t);
                                        f.appendChild(x);
                                        Q && (r && (Q.className += " jwcapBottom"), f.appendChild(Q));
                                        b(v(".jw" + s + " .jwrail"), {
                                            left: r ? q : C.width,
                                            right: r ? q : E.width,
                                            top: r ? C.height : q,
                                            bottom: r ? E.height : q,
                                            width: r ? z : q,
                                            height: r ? "auto" : q
                                        });
                                        H[s] = f;
                                        f.vertical = r;
                                        "time" == s ? (pa =
                                        new g.overlay(ma + "_timetooltip", U), $a = new g.thumbs(ma + "_thumb"), lb = y.createElement("div"), lb.className = "jwoverlaytext", ab = y.createElement("div"), D = $a.element(), ab.appendChild(D), ab.appendChild(lb), pa.setContents(ab), kb = x, T(0), D = pa.element(), x.appendChild(D), H.timeSliderRail || b(v(".jwtime"), j), H.timeSliderThumb && b(v(".jwtimeSliderThumb"), {
                                            "margin-left": V("timeSliderThumb").width / -2
                                        }), D = V("timeSliderCue"), p = {
                                            "z-index": 1
                                        }, D && D.src ? N("timeSliderCue") : p.display = n, b(v(".jwtimeSliderCue"), p), Sa(0), ha(0),
                                        ha(0), Sa(0)) : 0 == s.indexOf("volume") && (s = f, t = "volume" + (r ? "" : "H"), Q = r ? "vertical" : "horizontal", b(v(".jw" + t + ".jw" + Q), {
                                            width: V(t + "Rail", r).width + (r ? 0 : V(t + "Cap" + p).width + V(t + "RailCap" + p).width + V(t + "RailCap" + D).width + V(t + "Cap" + D).width),
                                            height: r ? V(t + "Cap" + p).height + V(t + "Rail").height + V(t + "RailCap" + p).height + V(t + "RailCap" + D).height + V(t + "Cap" + D).height : q
                                        }), s.className += " jw" + Q);
                                        D = f
                                    }
                                    f = D;
                                    break a
                            }
                            f = void 0
                        }
                        f && ("volume" == d.elements[u].name && f.vertical ? (na = new g.overlay(ma + "_volumeOverlay", U), na.setContents(f)) :
                            e.appendChild(f))
                    }
            }
        }

        function ea() {
            1 < M.jwGetPlaylist().length && (!y.querySelector("#" + M.id + " .jwplaylist") || M.jwGetFullscreen()) ? (b(v(".jwnext"), p), b(v(".jwprev"), p)) : (b(v(".jwnext"), j), b(v(".jwprev"), j))
        }

        function xa(b) {
            ua || (ua = a.bounds(K));
            b.offsetX(0);
            var c = a.bounds(b.element());
            c.right > ua.right ? b.offsetX(ua.right - c.right) : c.left < ua.left && b.offsetX(ua.left - c.left)
        }

        function Sa(a) {
            a = Math.min(Math.max(0, a), 1);
            H.timeSliderBuffer && (H.timeSliderBuffer.style.width = 100 * a + "%", H.timeSliderBuffer.style.opacity =
                0 < a ? 1 : 0)
        }

        function Da(a, b) {
            if (H[a]) {
                var c = H[a].vertical,
                    d = a + ("time" == a ? "Slider" : ""),
                    e = 100 * Math.min(Math.max(0, b), 1) + "%",
                    g = H[d + "Progress"],
                    d = H[d + "Thumb"];
                g && (c ? (g.style.height = e, g.style.bottom = 0) : g.style.width = e, g.style.opacity = 0 < b || oa ? 1 : 0);
                d && (c ? d.style.top = 0 : d.style.left = e)
            }
        }

        function aa(a) {
            Da("volume", a);
            Da("volumeH", a)
        }

        function ha(a) {
            Da("time", a)
        }

        function V(a) {
            var b = "controlbar",
                c = a;
            0 == a.indexOf("volume") && (0 == a.indexOf("volumeH") ? c = a.replace("volumeH", "volume") : b = "tooltip");
            return (a = U.getSkinElement(b,
                c)) ? a : {
                    width: 0,
                    height: 0,
                    src: "",
                    image: q,
                    ready: B
                }
        }

        function cb(b) {
            if ("array" == !a.typeOf(b)) return Ea("Invalid data");
            a.foreach(b, function (a, b) {
                var c = b.begin,
                    d = b.text;
                if (0 <= c) {
                    var e = N("timeSliderCue"),
                        g = K.querySelector(".jwtimeSliderRail"),
                        j = {
                            position: c,
                            text: d,
                            element: e
                        };
                    e && g && (g.appendChild(e), e.addEventListener("mouseover", function () {
                        Ua = j
                    }, !1), e.addEventListener("mouseout", function () {
                        Ua = I
                    }, !1));
                    bb.push(j)
                }
                za()
            })
        }

        function Ea(b) {
            a.log("Cues failed to load: " + b)
        }
        var M, U, ca = t("divider", "divider"),
            da = {
                margin: 8,
                maxwidth: 800,
                font: "Arial,sans-serif",
                fontsize: 11,
                fontcolor: 15658734,
                fontweight: "bold",
                layout: {
                    left: {
                        position: "left",
                        elements: [t("play", h), t("prev", h), t("next", h), t("elapsed", m)]
                    },
                    center: {
                        position: "center",
                        elements: [t("time", w), t("alt", m)]
                    },
                    right: {
                        position: "right",
                        elements: [t("duration", m), t("hd", h), t("cc", h), t("mute", h), t("volume", w), t("volumeH", w), t("fullscreen", h)]
                    }
                }
            }, S, Ia, H, Aa, K, ma, ra, Ja, ia, Ka, ja, La, Ta, na, ua, kb, Ha, pa, ab, $a, lb, db, Ca, sa, eb, Ba, ta, qb, Va, va = B,
            ob = B,
            oa = B,
            ib = 0,
            rb = -1,
            hb = 0,
            bb = [],
            Ua, Ma = new c.eventdispatcher,
            vb = {
                play: "pause",
                mute: "unmute",
                fullscreen: "normalscreen"
            }, Xa = {
                play: B,
                mute: B,
                fullscreen: B
            }, pb = {
                play: function () {
                    Xa.play ? M.jwPause() : M.jwPlay()
                },
                mute: function () {
                    M.jwSetMute(!Xa.mute);
                    C({
                        mute: Xa.mute
                    })
                },
                fullscreen: function () {
                    M.jwSetFullscreen()
                },
                next: function () {
                    M.jwPlaylistNext()
                },
                prev: function () {
                    M.jwPlaylistPrev()
                },
                hd: gb,
                cc: fb
            }, Za = {
                time: function (a) {
                    M.jwSeek(Ua ? Ua.position : a * ra)
                },
                volume: function (a) {
                    aa(a);
                    0.1 > a && (a = 0);
                    0.9 < a && (a = 1);
                    M.jwSetVolume(100 * a)
                }
            }, Wa = {}, $ = this;
        a.extend($, Ma);
        $.setText = function (a) {
            b(v(".jwelapsed"),
                a ? j : r);
            b(v(".jwduration"), a ? j : r);
            b(v(".jwtime"), a ? j : r);
            b(v(".jwalt"), a ? r : j);
            H.timeSliderRail || b(v(".jwtime"), j);
            var c = K.querySelector(".jwalt");
            c && (c.innerHTML = a || "");
            Fa()
        };
        var Ra = {}, Fa = function () {
            clearTimeout(qb);
            qb = setTimeout($.redraw, 0)
        };
        $.redraw = function (c) {
            c && $.visible && $.show(A);
            J();
            c = V("capLeft");
            var d = V("capRight");
            b(v(".jwgroup.jwcenter"), {
                left: Math.round(a.parseDimension(Ra.left.offsetWidth) + c.width),
                right: Math.round(a.parseDimension(Ra.right.offsetWidth) + d.width)
            });
            c = !va && K.parentNode.clientWidth >
                S.maxwidth;
            d = va ? 0 : S.margin;
            b(v(), {
                left: c ? "50%" : d,
                right: c ? q : d,
                "margin-left": c ? K.clientWidth / -2 : q,
                width: c ? z : q
            });
            c = top !== self && a.isIE();
            b(v(".jwfullscreen"), {
                display: va || ob || c ? n : q
            });
            b(v(".jwvolumeH"), {
                display: va ? "block" : n
            });
            b(v(".jwhd"), {
                display: !va && ia && 1 < ia.length && sa ? q : n
            });
            b(v(".jwcc"), {
                display: !va && ja && 1 < ja.length && ta ? q : n
            });
            ua = a.bounds(K);
            a.foreach(Wa, function (a, b) {
                xa(b)
            });
            za()
        };
        $.audioMode = function (a) {
            a != va && (va = a, Fa())
        };
        $.hideFullscreen = function (a) {
            a != ob && (ob = a, Fa())
        };
        $.element = function () {
            return K
        };
        $.margin = function () {
            return parseInt(S.margin)
        };
        $.height = function () {
            return Aa
        };
        $.show = function (c) {
            if (!$.visible || c) clearTimeout(Va), Va = q, $.visible = !0, K.style.display = "inline-block", Fa(), C(), K && K.querySelector(".jwalt") && (320 <= a.bounds(K.parentNode).width && !K.querySelector(".jwalt").innerHTML ? b(v(".jwhidden"), p) : b(v(".jwhidden"), j)), Va = setTimeout(function () {
                K.style.opacity = 1
            }, 10)
        };
        $.showTemp = function () {
            this.visible || (K.style.opacity = 0, K.style.display = "inline-block")
        };
        $.hideTemp = function () {
            this.visible ||
                (K.style.display = n)
        };
        $.hide = function () {
            $.visible && ($.visible = !1, K.style.opacity = 0, clearTimeout(Va), Va = q, Va = setTimeout(function () {
                K.style.display = n
            }, 250))
        };
        H = {};
        M = e;
        ma = M.id + "_controlbar";
        ra = Ja = 0;
        K = R();
        K.id = ma;
        K.className = "jwcontrolbar";
        U = M.skin;
        var wb = setInterval(function () {
            var b = y.getElementById(ma),
                c = a.bounds(b).width;
            b != K ? clearInterval(wb) : 0 < c && ($.visible && c != rb) && (rb = c, $.show(A))
        }, 200);
        Ia = U.getComponentLayout("controlbar");
        Ia || (Ia = da.layout);
        a.clearCss("#" + ma);
        J();
        var sb = N("capLeft"),
            tb = N("capRight"),
            ub = N("background", {
                position: "absolute",
                left: V("capLeft").width,
                right: V("capRight").width,
                "background-repeat": "repeat-x"
            }, A);
        ub && K.appendChild(ub);
        sb && K.appendChild(sb);
        Qa("left");
        Qa("center");
        Qa("right");
        K.appendChild(Ra.left);
        K.appendChild(Ra.center);
        K.appendChild(Ra.right);
        H.hd && (sa = new g.menu("hd", ma + "_hd", U, ga), k ? qa(sa, H.hd, ka, "hd") : Pa(sa, H.hd, ka, mb), Wa.hd = sa);
        H.cc && (ta = new g.menu("cc", ma + "_cc", U, la), k ? qa(ta, H.cc, fa, "cc") : Pa(ta, H.cc, fa, ya), Wa.cc = ta);
        H.mute && (H.volume && H.volume.vertical) && (na =
            new g.overlay(ma + "_volumeoverlay", U), na.setContents(H.volume), Pa(na, H.mute, Z), Wa.volume = na);
        b(v(".jwright"), {
            right: V("capRight").width
        });
        tb && K.appendChild(tb);
        M.jwAddEventListener(c.JWPLAYER_MEDIA_TIME, x);
        M.jwAddEventListener(c.JWPLAYER_PLAYER_STATE, function (a) {
            switch (a.newstate) {
                case d.BUFFERING:
                case d.PLAYING:
                    b(v(".jwtimeSliderThumb"), {
                        opacity: 1
                    });
                    P("play", A);
                    break;
                case d.PAUSED:
                    oa || P("play", B);
                    break;
                case d.IDLE:
                    P("play", B), b(v(".jwtimeSliderThumb"), {
                        opacity: 0
                    }), H.timeRail && (H.timeRail.className =
                    "jwrail", setTimeout(function () {
                        H.timeRail.className += " jwsmooth"
                    }, 100)), Sa(0), x({
                        position: 0,
                        duration: 0
                    })
            }
        });
        M.jwAddEventListener(c.JWPLAYER_PLAYLIST_ITEM, function (b) {
            b = M.jwGetPlaylist()[b.index].tracks;
            var c = B,
                d = K.querySelector(".jwtimeSliderRail");
            a.foreach(bb, function (a, b) {
                d.removeChild(b.element)
            });
            bb = [];
            if ("array" == a.typeOf(b) && !k)
                for (var e = 0; e < b.length; e++)
                    if (!c && (b[e].file && b[e].kind && "thumbnails" == b[e].kind.toLowerCase()) && ($a.load(b[e].file), c = A), b[e].file && b[e].kind && "chapters" == b[e].kind.toLowerCase()) {
                        var g =
                            b[e].file;
                        g ? (new f.parsers.srt(cb, Ea, !0)).load(g) : bb = []
                    }
            c || $a.load()
        });
        M.jwAddEventListener(c.JWPLAYER_MEDIA_MUTE, C);
        M.jwAddEventListener(c.JWPLAYER_MEDIA_VOLUME, F);
        M.jwAddEventListener(c.JWPLAYER_MEDIA_BUFFER, function (a) {
            Sa(a.bufferPercent / 100)
        });
        M.jwAddEventListener(c.JWPLAYER_FULLSCREEN, function (a) {
            P("fullscreen", a.fullscreen);
            ea()
        });
        M.jwAddEventListener(c.JWPLAYER_PLAYLIST_LOADED, D);
        M.jwAddEventListener(c.JWPLAYER_MEDIA_LEVELS, function (a) {
            if ((ia = a.levels) && 1 < ia.length && sa) {
                b(v(".jwhd"), p);
                sa.clearOptions();
                for (var c = 0; c < ia.length; c++) sa.addOption(ia[c].label, c);
                L(a)
            } else b(v(".jwhd"), j);
            Fa()
        });
        M.jwAddEventListener(c.JWPLAYER_MEDIA_LEVEL_CHANGED, L);
        M.jwAddEventListener(c.JWPLAYER_CAPTIONS_LIST, function (a) {
            if ((ja = a.tracks) && 1 < ja.length && ta) {
                b(v(".jwcc"), p);
                ta.clearOptions();
                for (var c = 0; c < ja.length; c++) ta.addOption(ja[c].label, c);
                Q(a)
            } else b(v(".jwcc"), j);
            Fa()
        });
        M.jwAddEventListener(c.JWPLAYER_CAPTIONS_CHANGED, Q);
        k || (K.addEventListener("mouseover", function () {
            s.addEventListener("mousemove", Oa, B);
            s.addEventListener("mouseup",
                Oa, B);
            s.addEventListener("mousedown", Ga, B)
        }, !1), K.addEventListener("mouseout", function () {
            s.removeEventListener("mousemove", Oa);
            s.removeEventListener("mouseup", Oa);
            s.removeEventListener("mousedown", Ga);
            y.onselectstart = null
        }, !1));
        setTimeout(function () {
            F();
            C()
        }, 0);
        D();
        $.visible = !1
    };
    b(".jwcontrolbar", {
        position: "absolute",
        opacity: 0,
        display: n
    });
    b(".jwcontrolbar span", {
        height: z
    });
    a.dragStyle(".jwcontrolbar span", n);
    b(".jwcontrolbar .jwgroup", {
        display: "inline"
    });
    b(".jwcontrolbar span, .jwcontrolbar .jwgroup button,.jwcontrolbar .jwleft", {
        position: "relative",
        "float": "left"
    });
    b(".jwcontrolbar .jwright", {
        position: "absolute"
    });
    b(".jwcontrolbar .jwcenter", {
        position: "absolute"
    });
    b(".jwcontrolbar buttoncontainer,.jwcontrolbar button", {
        display: "inline-block",
        height: z,
        border: n,
        cursor: "pointer"
    });
    b(".jwcontrolbar .jwcapRight,.jwcontrolbar .jwtimeSliderCapRight,.jwcontrolbar .jwvolumeCapRight", {
        right: 0,
        position: "absolute"
    });
    b(".jwcontrolbar .jwcapBottom", {
        bottom: 0,
        position: "absolute"
    });
    b(".jwcontrolbar .jwtime", {
        position: "absolute",
        height: z,
        width: z,
        left: 0
    });
    b(".jwcontrolbar .jwthumb", {
        position: "absolute",
        height: z,
        cursor: "pointer"
    });
    b(".jwcontrolbar .jwrail", {
        position: "absolute",
        cursor: "pointer"
    });
    b(".jwcontrolbar .jwrailgroup", {
        position: "absolute",
        width: z
    });
    b(".jwcontrolbar .jwrailgroup span", {
        position: "absolute"
    });
    b(".jwcontrolbar .jwdivider+.jwdivider", {
        display: n
    });
    b(".jwcontrolbar .jwtext", {
        padding: "0 5px",
        "text-align": "center"
    });
    b(".jwcontrolbar .jwalt", {
        display: n,
        overflow: "hidden"
    });
    b(".jwcontrolbar .jwalt", {
        position: "absolute",
        left: 0,
        right: 0,
        "text-align": "left"
    }, A);
    b(".jwcontrolbar .jwoverlaytext", {
        padding: 3,
        "text-align": "center"
    });
    b(".jwcontrolbar .jwvertical *", {
        display: "block"
    });
    b(".jwcontrolbar .jwvertical .jwvolumeProgress", {
        height: "auto"
    }, A);
    b(".jwcontrolbar .jwprogressOverflow", {
        position: "absolute",
        overflow: "hidden"
    });
    b(".jwcontrolbar .jwduration .jwhidden", {});
    e(".jwcontrolbar", "opacity .25s, background .25s, visibility .25s");
    e(".jwcontrolbar button", "opacity .25s, background .25s, visibility .25s");
    e(".jwcontrolbar .jwtime .jwsmooth span",
        "opacity .25s, background .25s, visibility .25s, width .25s linear, left .05s linear");
    e(".jwcontrolbar .jwtoggling", n)
})(jwplayer);
(function (f) {
    var g = f.utils,
        a = f.events,
        c = a.state,
        d = f.playlist,
        b = !0,
        e = !1;
    f.html5.controller = function (k, l) {
        function h() {
            return k.getVideo()
        }

        function m(a) {
            s.sendEvent(a.type, a)
        }

        function w(c) {
            z(b);
            switch (g.typeOf(c)) {
                case "string":
                    var e = new d.loader;
                    e.addEventListener(a.JWPLAYER_PLAYLIST_LOADED, function (a) {
                        w(a.playlist)
                    });
                    e.addEventListener(a.JWPLAYER_ERROR, function (a) {
                        w([]);
                        a.message = "Could not load playlist: " + a.message;
                        m(a)
                    });
                    e.load(c);
                    break;
                case "object":
                case "array":
                    q.setPlaylist(new f.playlist(c));
                    break;
                case "number":
                    q.setItem(c)
            }
        }

        function n(d) {
            g.exists(d) || (d = b);
            if (!d) return j();
            try {
                0 <= u && (w(u), u = -1);
                if (!E && (E = b, s.sendEvent(a.JWPLAYER_MEDIA_BEFOREPLAY), E = e, C)) {
                    C = e;
                    t = null;
                    return
                }
                if (q.state == c.IDLE) {
                    if (0 == q.playlist.length) return e;
                    h().load(q.playlist[q.item])
                } else q.state == c.PAUSED && h().play();
                return b
            } catch (f) {
                s.sendEvent(a.JWPLAYER_ERROR, f), t = null
            }
            return e
        }

        function z(d) {
            t = null;
            try {
                return q.state != c.IDLE ? h().stop() : d || (x = b), E && (C = b), b
            } catch (g) {
                s.sendEvent(a.JWPLAYER_ERROR, g)
            }
            return e
        }

        function j(d) {
            t =
                null;
            g.exists(d) || (d = b);
            if (!d) return n();
            try {
                switch (q.state) {
                    case c.PLAYING:
                    case c.BUFFERING:
                        h().pause();
                        break;
                    default:
                        E && (C = b)
                }
                return b
            } catch (j) {
                s.sendEvent(a.JWPLAYER_ERROR, j)
            }
            return e
        }

        function r(a) {
            w(a);
            n()
        }

        function p() {
            r(q.item + 1)
        }

        function B() {
            q.state == c.IDLE && (x ? x = e : (t = B, q.repeat ? p() : q.item == q.playlist.length - 1 ? (u = 0, z(b), setTimeout(function () {
                s.sendEvent(a.JWPLAYER_PLAYLIST_COMPLETE)
            }, 0)) : p()))
        }

        function A(a) {
            return function () {
                y ? I(a, arguments) : F.push({
                    method: a,
                    arguments: arguments
                })
            }
        }

        function I(a,
            b) {
            var c = [],
                d;
            for (d = 0; d < b.length; d++) c.push(b[d]);
            a.apply(this, c)
        }
        var q = k,
            s = new a.eventdispatcher(q.id, q.config.debug),
            y = e,
            u = -1,
            E, t, x = e,
            C, F = [];
        g.extend(this, s);
        this.play = A(n);
        this.pause = A(j);
        this.seek = A(function (a) {
            q.state != c.PLAYING && n(b);
            h().seek(a)
        });
        this.stop = function () {
            x = b;
            A(z)()
        };
        this.load = A(w);
        this.next = A(p);
        this.prev = A(function () {
            r(q.item - 1)
        });
        this.item = A(r);
        this.setVolume = A(q.setVolume);
        this.setMute = A(q.setMute);
        this.setFullscreen = A(function (a) {
            l.fullscreen(a)
        });
        this.detachMedia = function () {
            try {
                return q.getVideo().detachMedia()
            } catch (a) {
                return null
            }
        };
        this.attachMedia = function (a) {
            try {
                q.getVideo().attachMedia(a), "function" == typeof t && t()
            } catch (b) {
                return null
            }
        };
        this.setCurrentQuality = A(function (a) {
            h().setCurrentQuality(a)
        });
        this.getCurrentQuality = function () {
            return h() ? h().getCurrentQuality() : -1
        };
        this.getQualityLevels = function () {
            return h() ? h().getQualityLevels() : null
        };
        this.setCurrentCaptions = A(function (a) {
            l.setCurrentCaptions(a)
        });
        this.getCurrentCaptions = function () {
            return l.getCurrentCaptions()
        };
        this.getCaptionsList = function () {
            return l.getCaptionsList()
        };
        this.checkBeforePlay = function () {
            return E
        };
        this.playerReady = function (a) {
            if (!y) {
                l.completeSetup();
                s.sendEvent(a.type, a);
                f.utils.exists(window.jwplayer.playerReady) && f.playerReady(a);
                q.addGlobalListener(m);
                l.addGlobalListener(m);
                s.sendEvent(f.events.JWPLAYER_PLAYLIST_LOADED, {
                    playlist: f(q.id).getPlaylist()
                });
                s.sendEvent(f.events.JWPLAYER_PLAYLIST_ITEM, {
                    index: q.item
                });
                w();
                q.autostart && !g.isMobile() && n();
                for (y = b; 0 < F.length; ) a = F.shift(), I(a.method, a.arguments)
            }
        };
        q.addEventListener(a.JWPLAYER_MEDIA_BUFFER_FULL,
            function () {
                h().play()
            });
        q.addEventListener(a.JWPLAYER_MEDIA_COMPLETE, function () {
            setTimeout(B, 25)
        });
        q.addEventListener(a.JWPLAYER_MEDIA_ERROR, function (b) {
            b = g.extend({}, b);
            b.type = a.JWPLAYER_ERROR;
            s.sendEvent(b.type, b)
        })
    }
})(jwplayer);
(function (f) {
    f.html5.defaultskin = function () {
        this.text = '\x3c?xml version\x3d"1.0" ?\x3e\x3cskin author\x3d"LongTail Video" name\x3d"Six" target\x3d"6.0" version\x3d"2.0"\x3e\x3ccomponents\x3e\x3ccomponent name\x3d"controlbar"\x3e\x3csettings\x3e\x3csetting name\x3d"margin" value\x3d"8"/\x3e\x3csetting name\x3d"fontcolor" value\x3d"eeeeee"/\x3e\x3csetting name\x3d"fontsize" value\x3d"11"/\x3e\x3csetting name\x3d"fontweight" value\x3d"bold"/\x3e\x3csetting name\x3d"maxwidth" value\x3d"800"/\x3e\x3c/settings\x3e\x3celements\x3e\x3celement name\x3d"background" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAaCAAAAABTb2kNAAAAGElEQVQIHWNJYXnE8pXlHwH4Hy7/m+UrAIRMGWv8AcuMAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"capLeft" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAaCAQAAADV5l4gAAAAXUlEQVQYV2NiYEj2T7mf8j/lP1O8/98NHxUeMTxiYPo74RPDM4avQMj0R+Edwz8wZPrD8B3G/AtlgEXpySTC4v9QiFPBHzjzwS+4uQW/gL77DYRMPzf+Dfj5AOR5AOEMhGrZiW/LAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"capRight" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAaCAQAAADV5l4gAAAAYUlEQVQYV2NJ+c/AwPDgf8HcjSyPgCx+Be4N8QEsX4HMrwziDFwTWP4xgMAbBikFKPMnwx8GKJOB4S+C+YeuTJwW/8cU/YdF7T8E8xfDvwcsv8GSfxkYC8CeZ3jAWPB3IwAFQj9cfrWVAwAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"divider" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAaCAYAAACdM43SAAAAEklEQVR42mP4//8/AwgzDHcGAFd5m2W1AHjxAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"playButton" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAYAAAB75n/uAAAAdUlEQVR42u2TsQ3AIAwE2YARMkJGyCiMwiiMwgjUFMAIjOC8lMJdiIjd+aSrr3i9MwzjHXoYMOgFmAIvvQCT4aEXYNLvEK2ZMEKvFODQVqC1Rl/sve8Faq20cMIIvUYgQR5ZMJDh6RixQIF8NMHAgMEZhrHNDU+1T3s3o0CaAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"playButtonOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAYAAAB75n/uAAABhUlEQVR42uXVzUoCYRTGcXNGR3HSDPtASyIhrIjaFJlBRBRUdAUGQQurdVfSrl2LuhEvYxR1IYroRhCEWU1/4R2Yxcz4MUlQB34bGc6D58y8r+/vl2EYczNpKvitzN9/orEEGUEoQhAyJDNs2gAJCiKIYVGIQUUIAWvQNM2jWMEGtoRNpJBAFOGJgsRDAahYRRbHuMAVznGEHaSxZBNkvyPLQhXEkUEew+riE88o4AYn2BVBCcxDgWz+G6fxhLGMPdzBWh184RUPuEUOWaSwgBBkpwAZESRxiALsqoV3EXSPSxwgLUIUc1xOAWvI4RFupeENRVxjH0moCMBvF6BiHXkUMap0lPCCM2QQh2LuwingFE8Ytwa4wTYSCEEaGVCtVo1x1Gq1CQPEiDRNM9yUy2W92WyWdF13HJHrkt2aNxoNbTAYuC555Gtq17her7f6/f7HmK+p+4dmbcysO71ez8OHZnNUDBtXKpVuu932clTM/rCb/XHt/cL5/SvT+6XvKcz3r+sbpPMfjCOvfIMAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"pauseButton" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAYAAAB75n/uAAAAN0lEQVR42u3NoQ0AMAwDwe6/YYBncWlUyQFBBX+SickfADM/0k+AQCbJffHfqir3hZ/ADwEAowtQ1mmQzb8rQgAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"pauseButtonOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAYAAAB75n/uAAABdUlEQVR42t2WzWrCQBSFq1FSaSjaFi1iF6UFtdBdF6WhC0Hoym3BlSAu+wbddSF9xfyTJ7k9gRMJuY2Oi2w88BG5zLlHZiYzOTttiUijyP768Y2bxCKVv0nD+B/T2AY2OAcdPnOKNZtjrdx/KMCi6QJ0wTW44fOKFGtdjrXzEJPml2AA7sEEPIExeCRj1iYcM6CnOoTz2AYOuAVT8Arm4APMwDuZsTbnmCk9Dns0qxbVBj3wAFzR+iRlufT02IOLrqenA/rgGSxE64uUtaCnzx7WfwEtLtYQvIClaH2Tspb0DNmjtS9gxHldidYPKWtFz+hQgAPuwBtYi9aWlLXOPPQ6JgEu2IjWLylrQ89xAVEUSRzHkiSJpGm6C8jqBVSA8RR5nie+70sQBHmjbUZWL6CmyHiRVQAXWQfoRTbapiqA21QH6G1q9KJl5jwkDMPdi6YCzF40fVSoAB4VKqDiqKj1sKv9uK71wqn9yqzt0q/vs+Wk9QeSkdKwXIKzCgAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"prevButton" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAcCAYAAABsxO8nAAAAfUlEQVR42u2MwQnAIAxFu4EjOIIjOFJH6EiCF8fw7BQZwf5AegkU2tje8uGR5Afe5vH8mTHGZG5+EXSzSPoMCEyzCPd+9SYRZgCFb7MIJNB5XxURT7OotTYFkql5Jqq1TiGBzrvinUj2AMqSSHXHikj3GZBVpH8R9M3j+Tgn8lcGnlSSd08AAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"prevButtonOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAcCAYAAABsxO8nAAABhUlEQVR42uXUz0oCURTH8VKz/BNFmZJ/iMAoEmohlRRI7Yp2Qa0igyJc9Qot2vUGbnwB3yJXPYKaCi5m62LQzSymr3KE09hAi1nVgQ93hnv4wZ259878o7Jte/YXfADPcAvwIeDgFwHMKYFJoDPILw0hREQYCyKMKBZlDCEIvzMkiAhWEEdCxlURRwoZJBGTwOA4SC0nLJMb2MGujFlsIYc8DrCPrIRHZtR3mccSMtI0qTMUcYoLXKGMTxxiE8t6WSHEsI2iCirhDg94RgVDmTtHDmvjILWsBPZwqYJe8Io3vEPXDfJY10ERJGXiWjVXUYMBZ5VQQMoZlMIRblVzHSZ+qkccI62DokijgHvVbMGtnnCCjGtQu922R7rdriXPU3SQ69IajYY9MhgM6p1Ox5R3zbE0l4+tmquWZdV6vZ7hDNIf2/X3T5r17zcM40MH6d/vuiGleWpD9vv9SrPZHDLn2JAuR0QFTR0R0zTLrVbr2xHx7NB6do14drF5dtV6c/n/7foCpva8IJ04vWUAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"nextButton" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAcCAYAAABsxO8nAAAAdklEQVR42u3OwQnAIAyF4WzgCB3BERypI3QkwYtjeHaKjGBfIeClFmvaWx58KAg/ks329WqtBbbBW7vMhhowBH2o2/WhLoJTh0QBrw4JfhXKObcBlnMulFJqNwp4uS+HIjjCNKGDZKshhkCYJlRge/ot2Ww/7gSJGQaejWvrvwAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"nextButtonOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAcCAYAAABsxO8nAAABjElEQVR42uXUPUvDQBwGcNvUatOK4kuKfUEERVGwg/iCguimuAk6iQqKOPkVHLr5DVz8An4LO/kR2jQtZMjaIbRLhvOpPOHOJMahnfQPP5IcyXO5S+5G/ngJIRKUpMRvwiEyIAWjPl5rlApIhgJ5YxoykIMJHnUYJx2ylGFHWjAozQdnoQBlKIIBM2RAnsdpBqa/hbHRgCWowBZswjoss30V1nhcYKe6P0w/aAoWYRua8ABncAKHcABHQlaFbz0JY/589YPm2Psxb+zBCzzCLVzBtWAxeIVvlQHND5rnUC5ArXd4hio8Ke2nsAF5OTwEcWJ32WuwHHiDV6XtnB0XIKsGlWAP7iCqXKgp15ewA8VgUBn24R5+Kk85v+EISpCLDLIsS0Rpt9sez+OC5NDq9boIarVabrfbrfE6bmhysoMhtm07nud9TTbb4iZbfn41xHGcD/Xzsz3u88sfsn9jo9HodTqd0A/JoLgfUi4R0zSbrutGLhEGxS2RwRftMLeRwTe2oW21g2/+/6c+AdO5vCABA1zBAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"elapsedBackground" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAaCAYAAACdM43SAAAAEklEQVR42mP4//8/AwgzDHcGAFd5m2W1AHjxAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"timeSliderCapLeft" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAcCAYAAABCgc61AAAAD0lEQVQoFWNgGAWjYGgCAAK8AAEb3eOQAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"timeSliderCapRight" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAcCAYAAABCgc61AAAAD0lEQVQoFWNgGAWjYGgCAAK8AAEb3eOQAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"timeSliderCue" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAcCAYAAABGdB6IAAAAI0lEQVR42mP4//8/AzJmGG4CaWlph0EYRSA1NfXIsPQtMgYAAy5KnsvyDbIAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"timeSliderRail" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAcCAYAAABGdB6IAAAALElEQVQY02NkQAOMg1aAmZn5P4oALy8vqoCYmBiqgIKCAqqAmpoaxQJDJsQA+54Krz/ExkoAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"timeSliderRailCapLeft" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAcCAYAAABGdB6IAAAAWklEQVR42tWLsQlAIQwFBcVKGyEGK61cJ/tXGeVptPjwN/DgQnIQ9xYxRgkhqPceLqUkW5g5Z7g91BYiQq31BDAzxhjmDb13zDnN+/IP0lr7glFKkX3oCc+wAHpnIpi5hlqoAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"timeSliderRailCapRight" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAcCAYAAABGdB6IAAAAVklEQVR42tXJMQ4AIQhEURKMFZZCrLDyOty/4ijsYuJWewEn+c0buGeIGKUUr7XahtZaENHJgJmj9x7vkTnMOSMTkY2w1opMVX/BPxhjJNgBFxGDq/YAy/oipxG/oRoAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"timeSliderBuffer" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAcCAYAAABGdB6IAAAAE0lEQVQYV2NgGErgPxoeKIGhAQB1/x/hLROY4wAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"timeSliderBufferCapLeft" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAcCAYAAABGdB6IAAAAJ0lEQVQYlWNgGGrAH4jvA/F/GOc/EobLwAX+ExTA0IJhKIa1QwMAAIX5GqOIS3lSAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"timeSliderBufferCapRight" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAcCAYAAABGdB6IAAAAJ0lEQVQY02NgGErgPxDfB2J/ZAEY9kcXuI8u8J+gwH2chqJYOzQAALXhGqOFxXzUAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"timeSliderProgress" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAcCAYAAABGdB6IAAAALUlEQVQYV2NgGCqA8T8QIAuwoPEZWD58+IAq8Pr1a1IF3r59iyrw9+9fhqEJABv9F+gP7YohAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"timeSliderProgressCapLeft" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAcCAYAAABGdB6IAAAASklEQVR42tXDQQ0AIAwDwDqcPhLQgAlM8JqDORilnyVY4JLDX0iaOgWZaeccVkSEKyv23nxjrcU35pyurBhjWO+dFZDWmqkr8Y0Lr65i67XRzKcAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"timeSliderProgressCapRight" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAcCAYAAABGdB6IAAAAS0lEQVQY09XDQQ0AIRAEwXa4+iYBDZjABC8c4ADmHheStUAlBc/wb9oOAM45vvfewVrL6WSM4Zzeu3Naa04npRTftdZAkiVNScFTPhkFYuvY2zeUAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"timeSliderThumb" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAcCAYAAABYvS47AAAAwElEQVR42tWTPQrCQBCF84OsYJCIYEQrsZAU6QKx9xheyG4L6zTZs3iInGZ9Tx4iAWHaDHwwvPlgyWY2mVvFGNNf/gmZyEUm0q+kwQI4sBROWf6R2ShcgRJsRanM0UnUrEEFTuBC1FeaOYoF2IMaXMGNqK81KyhuwDmEcB/H8RVV7JlxRofiDjTe+0eclLKGDsUDaPu+91NRWUuH4hF0wzA8p6Kyjo5ZNB9t/hjz9Zgv3PwLzUthXjPT4hqewrzqDfMnQ2tu8Pr1AAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"durationBackground" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAaCAYAAACdM43SAAAAEklEQVR42mP4//8/AwgzDHcGAFd5m2W1AHjxAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"hdButton" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAcCAMAAACu5JSlAAAAZlBMVEUAAACysrLZ2dkmJiYuLi4xMTE3Nzc8PDxAQEBJSUlRUVFSUlJaWlpdXV1jY2NpaWlsbGx0dHR3d3d4eHh9fX2KioqPj4+SkpKVlZWXl5ehoaGpqamsrKyysrK3t7fCwsLNzc3Z2dkN+/dcAAAAA3RSTlMAf3+Sa81KAAAAh0lEQVQoU+3J0RpCQBCA0dW/i02KpEIzzPu/ZJc+7CM4t8e5k3PuYgmX9VNttv2W2iww9gDhe/iK3mZYHhRVIBwe+l9PYQWjzbB/BYB6gdl096ra4WP0PD/kqh25qq4vIjfuIvBuuMrkaURk8yUvGUAiefSU0/5hkJZSPECcZP8J62epztzpDzcuFrDsGN7pAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"hdButtonOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAcCAYAAACZOmSXAAACFUlEQVR42u2WsWoCQRCGE42I5AikkSBaGSwsAiIpQi4BK0vF+qwEjb1gaWMlaGfvA5xYWvgCNraChY0+gU+wmR3+DcPGC0lQrnHg43bvbv5/d25v764uYYdS6voc/MY0AqLEzYmICt3roJlGiRgRJxLELXD+g8hPQDPGHnIAwjiOpHsiSaSINMj8CeRBIwlNBx7RY8Z3xAORJZ6IZ+KFeCXcP/KK3GdoZbU2POLGPIJyOLiYJ96ICuERDaJJtIiPX9JCTgMaFWjm4eHIBRZHWR6Jd8JXpw8f2o/aS5Y8QSRRnqo6X1ThkTTmN1iRKTwfz87o9/sql8updrutTBSLRT63WCzUZDLhtoCvT6dTW8qDR8o2T2OBNL5leJ4WZBMd+/3+y+RwOKhut8vtUqnE92JgfLSiAY+0NHeIDFZo085gI5gvl0s+GjMKPpoq2IOzogmPzDFzl1eriPV6zSI2eAw8c/TZ1M6RAW33R/PtdqsMo9GIRQqFgqrVagy1+dxwOFSz2YzbrutaOeIckOaBZd9sNgro2bFQp9Mx575m5fu+6vV63K7X63xttVqZwfE1qSXLHrjgZEK5XGah8XjM/fl8bsx1nyuBWcqq6DweiNSSCy7wVZMJMNKm3B8MBkac+zCT8CBgLLFetYBNBjefHLnJBG6vu93OP7Wx1pTba6gfllA/qaH+TIT6GxXaD2Q4v86XoPgE1h55oNE1QD4AAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"hdButtonOff" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAcCAMAAACu5JSlAAAAYFBMVEUAAABZWVlzc3MmJiYpKSkqKiosLCwvLy8yMjI1NTU5OTk8PDw+Pj4/Pz9CQkJERERFRUVHR0dMTExOTk5PT09RUVFVVVVWVlZZWVlaWlpcXFxfX19kZGRpaWlubm5zc3OfG0yNAAAAA3RSTlMAf3+Sa81KAAAAhklEQVQoU+3JQRaCIBRAUeyBkKlZiX1J/fvfZUOPyBK802vMxRhz04Lb/qVWPf6LVtUxRwD3PX1D1BW2Ht843Okh/iJePbOukP8CAO0Gqy7Zp5QGbAiW54c6pYE6pbS/iDQ8RODdcZfJ0onI4T2DjCCBOlj8lD+M0uPFAoRJ8i/Yvyp1ZS5/fAoUStSjBUoAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"ccButton" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAcCAMAAACqEUSYAAAAXVBMVEUAAACysrLZ2dkmJiYuLi4xMTFAQEBHR0dJSUlKSkpRUVFSUlJaWlpdXV1jY2N0dHR9fX1/f3+Pj4+SkpKVlZWXl5ehoaGpqamsrKytra2ysrK3t7fCwsLNzc3Z2dky1qB2AAAAA3RSTlMAf3+Sa81KAAAAe0lEQVR42uXNQRKCMBAAQWCCIgGCGEU3sv9/JpXykCLxB8y1D1OdsEaLmqT6p6M6wKn6FuyWaUQL9zdcW2yuLV49dmTUL2S6gcYsr+IbwgdC7MYj/EoqIoZFHF1PL08QkYNO0MG8wMUw5LoOwCQyG+jWTMuS1iXW1SnbAaDLE32SOX+lAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"ccButtonOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAcCAYAAACdz7SqAAAB8UlEQVR42uWWsWoCQRCGEzUcEhFsQpCzUiwsBBGLoElrp0HbsxI09j6ClaXgW5xYWvgCNhaWFjb6BD7BZmb5HWSXXAw5rnHg43bd3f/fG+f27uE+Qyn1GCa3mMVAnEj8k7jowdwyxKQnwiGSxDNI/Qmsg4YDzbh15/jRwaIM8UJkCRfkbsQFWWhkoOmwh2nqEGnilcgTZaJGvBF1onEjdaypQSMPzbRlzLvBYIl4J9qER/SJATEkvn5hiLl9rG1DqwTtFFId06ZIQ4H4IHwVXvjQLMDDkcJC/svEpwo5oFmGR1JSjD++ptNixGQyUcViUeD+JRaLhapWqzLmeZ46n8+mhAftLKo6cTF1UQB921AEpT2bzdRms5F+q9Vic5lnRB/armmaI+ooBAkI6TvCnYnwaDTitr5ynE4n2YQRA9aGR8o0baAKOXSaRMQOufP1eq2CApqNQNPD4aCY3W4nptS36Ha7emy5XHL/R4JNkd79fq8uVCoVLez7vu5Pp1Pd73Q6qtfrcZuvemy1WskmrzQC0yuFdL1gPB5rERhJez6f80ak32w29QbxHxumdiFZj8z1gu12KwUD9EYwzuYwk43xGsPUfmSswwGTwyLwcJBj8Hg8+mEZklbgMRj9gR/9qy36l3j0nyuRfphF+wl69/ENcVv6gzz3ulwAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"ccButtonOff" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAcCAYAAACdz7SqAAAA7klEQVR42u2RvQqEQAyEfRpBG8GfQhALQWxEK0VFsLax8QH20XM3C0kjB96ujbADgxmi+bKu5+Tk9C6d56m+poes7kLpSRtBm6Yh3/fZyNIbx5HCMJRenud0HIcFVIAyUOq2bWnbNslpmgLO71lBeRBOxCeTwWVZosZT9/Z95yXMofhN1yFiOfmyLPZ3uq4rwdM0MRT54iRJdK/rOuRfvged55nYQRDIHSJXVaVzHMeUZRlqPHWv73teEpn9P7QoCgxhkNR1XWMRyVEUYUG+bzvoMAx8d2wswn3AGcaL4RszqKWNoOpBqPKcnJxeqw8HMtsZ4xog6gAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"muteButton" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAcCAYAAACQ0cTtAAAA30lEQVR42u2UzQmEMBCFtwNLsARLSAkpwVJSwpZgCQEv6skS5iieLCElzL6FJwxCDlllT3nwkb8hXxLQV01Nzc/Z9739l8gBBRE0j94AiBk3oAceJCCPCM2GauY6zh3AsR/vit5AT8zzBbZCoWdNWypQS0YmQM2tekpDkWzbNs1xqRMQwGraMtk8z5rD1k3TJJgLYF2WZfi2oEw2jqPm4HoHhHMOJNCDAxTLnGHIyALXhRLPmnsfOU+dTpkRJooc+/F1N/bpzLjhITxFAp77i1w3440UxALRzQPU1NTk8gF0y3zyjAvd3AAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"muteButtonOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAcCAYAAACQ0cTtAAAC2UlEQVR42u3WPUwTYRzHcWmBFnqKBYpAHVSQoEB8QTQaiMSILhgDiiFxUBMSlUETnYiDg9GJmDA44OCgo8bF18EFibq5MEBpeUsDIaVAm6P02qTUb5N/k5P2oNg46ZN88tz1yT2//p9e77lt/1u6Fo/Hc9L5GwEmmJGrY4bpz0JlcoOAPFhRCAU2FMAi46YtBa4LyEM+LBKwHSUoh1OUYaeM5yUDtxpSAAVFKJZJd6MGh9GEY6jHXjigpAQaBskySQWlcMpE+3FQJj+DDtxBN9pxCjUogw25yEkJEWbkw4ZiqaBWJm9GK86jEz0YRKKNok9Cm1El11th/i1QF2TBDuxCtYS0oQv3MIObuI+nGMIwIljAQ1xGI5xQINWlBhXBiTqclgtv4xXCUsUTDOADotAwIsce9OIsqmFHPkzJsORvpKACDVLNNfThJ/TtBb7ADRfCEjQm4/3okHkcyaXU3xAW2FEtFW3U3uAbVDn3IQYvQhjGVTSiHIX6MDMK4EA9LsRisbgR2jt8wg/OtbW1NZU+Qu+nX6T/zth1nEBl8q5cH1aGQ+icmpqKG9GHeb1ebWlpSZ2bm4v4fL7A7OzsIn1GYQ7Uod3lcsWN0N6GQqGhyclJNXG+srLic7vdseXlZa/H4wkRnLKMRr9ZFVr8fv8jLh4MBAKv+fbudWEvCfs8Pz/vUVXVRbXaxMRENBgMjiXGV1dX094g6e7GcqmuFVfQiwcszfvx8fGwhPXjGYEf+SxKNRqhI4nj6elpw1vf6A9dgRo0yUWXcINv/piJvRzfRV80Gh1gBb6yAsMERahugc82/FOnC1RQonvYHkELzoXD4S76i+jGLYKeJ6qlolGCtvC4gv5Jr9tGKrEPB9CAoziJNnRqmtaz2YM40+3FCgV2OHT71x7UStXH0ZTJFpNpqEWqtUnFRShFxWabZ1bvHLpd2yrhijB4LcjyXSSLF56sw4WE/HPtFwoiecfnKRGcAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"unmuteButton" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAcCAYAAACQ0cTtAAAAk0lEQVR42u2NwQnDMAxFtUFH6AgdISN0hI6UEf4Oxgdvkas9RUZQ/yEBYdChgoZC9eCBLBs/SZLkjxlj3Ol2RehJd6rfDq1UT81eKcwZVCMB9Zw/p7CzfErvXT2ndzB3kAitNfUUQ60V555zLFZKUU/zBscOdo7EFiOcmFLMcQli4y+6Bz4LBx90E3JV8CZJkvwsb8qa9F25tXYIAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"unmuteButtonOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAcCAYAAACQ0cTtAAACOUlEQVR42u3WS2sTURjG8ZqJuTSJTW1T26YqrWmN1jt2ISpWTb1ABS3iRkS84WUndlNQFN34Fdy5d+U36MJVQVroKgnmvgqBZBV3Gf8DTyQMzMggRZC+8CNnJsn75CRnzqRvu/6/Mk1zRw8fwBhbEeSDAT92ih+cU7D8dYiahxFFTPoR1HOG+Fxm7h6kRiE1H8Y49iKJEcQRRRghhQegmTuFKkQMBBDBbkwgjVOY0+Mh7McoEhjSa+OIIawehluYgSB2YQ9SOI0MbuEFfuCizs8ijYOYwRSSCo8g0J2hU9AAkmp0AbfxDJ/RhlV3sYgFZPR4GedwApMKDMNvD+v+RlGM4aga3McKvqO3XuKhxt/wFI+xClOBScTU12dfEEEMIqUZudU7vMKajjewrvGqZjiFOAL2MANhJHAENzqdjumE+ojXeMvxJkyxAh/hEqYxiKBT2AiOY6lQKJhOesNqtdpm93y1WvUUlsAsFrPZrOmEeo/lcrm8Zh1XKpUNxuvWuFgsun6N9t/sAM43Go0PzWbzU6vV+sInztvClvHEGpdKpd8LxArinPMCsa9GjGp287iD51ip1+tfc7ncTzV7gJu4igVc8bL07Rf0GGYwhwyWcI9Zvsnn80XG13EGx3AYafzxonYKjOoNE2pyEmcx3263r2nLmu7ZJ4e9b1ew7fQxhY5jUgEp7FPIAPq9bcTut5cQoohjSOKIIKjGhrjeYryEBhWMnnuZ9+buoaJgUcjW/xeRvu36F/ULlStUoyVtQSYAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"fullscreenButton" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAYAAAB75n/uAAAAbElEQVR42u2R0QnAIAxEu1lWc5/+ZYKs4TTWjwS0qIFrP+/BkYMLOdCLELKn1tpG5TleYF2yyMUzvCAOZDtwgU85PJGE/+NPyuTJG1Uts/9+sI0+y6GCrtunLHKJHbjAZYcd8x28IJTmhJAtD4gEt9ueDIktAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"fullscreenButtonOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAYAAAB75n/uAAACFUlEQVR42t2W324SURCHhS67VCoFbYhRkbQsaCwVSwgUaZP2yia9Mb6MN41vYfpIfYIm5QIegJfA3yTfSU52c1i98KabfGGYmd+cPX+Gw7On+2w2m5JPUfxfC5dhB8pQKooXvjGCiohFFRJ8EVTwVSHGtxOckSuOsCb2xUsDe0/swl42jiZxg2wr/kK0REf0DOzX4hXIzsVbaPODsH4VUSOxL8biwsD+SCEhOx/vo61Rq5zd1JipdhBkn6k4hmk2iKZDjdhtuj9Awnqm4twTPopf4lKM4BLfo0tCk1IjCQ3QFF0xR+QK/BBXYgxX+PycOdpmaAC3RG1xiui7uMWeic8ww3dLzgZNO7tEoU1OxYhpX7Dmd+KDgT0ldk5umt/k/DGtioZ4y/E7EUMx4JQcQR/fkJwemgY1OKbhAd6wnscU+ESRQ+jhOyGniyY4QFlE4rk4sCKIJyzFaLVa/XaNhT0iNiH30LTUiEJ9UGeqg8ViYRv3TVxjj80PY3zXloM9QFvf1gcN3mRiIr3pvX2u1+ufHMMvMDefn2MatI2iPjgSZyYylsvlg77fiK/umGLfWMzlmQbt3/UBQoc7530IxLf3QeT3AYIZbzbE9w5SfGfknGb6IAr1Qez9XL8XXabdxtc0sNvEuuS20MZFd0LsXThNqOOrQg0fcS6cXPHiKzOB2L8yg3GKG4WXfoBSUfz//W15ss8fvEcYMYnLr+AAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"normalscreenButton" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAYAAAB75n/uAAAAbElEQVR42u2Q0QnAMAhEu5kD588JXMNpbIUEpCBpe5+9B4JczF3MQQjpcfeBz+4vxpMe2ULSIF9YjaqWM+hXWRrdA2YZah61Wv2/qGrU6nQkQK6yLmCeCbzFCmk02FxWX/WyYXw1H69mCSEtJ16St50Fqd0HAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"normalscreenButtonOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAYAAAB75n/uAAACDUlEQVR42u2Vy0ojURCGZ9Kmk4A63cYLMhdE28tCECUgxCuzGBDc6AgO7uYizKAP4NKNb6S+g08gSZO8QZ7h+Bd8ScDDIZmsLfhIpc7/V53uPnS/e4uRwjn3vsto2sHiggdrw2iGaT4miiKGEhShBDEU8YSH9Jr3G4yLSZGID+Q9qCXk0rIBhoSaj4kyxlnxUXyBz+ITKKcuDdoEb+9KQrufEHPiXqyLLVETmwDUpEE7h7cYGhBxmQk72xAWR+KY/Bs4akfkG3gSekTebaJYFlWxKLbFDQ2e+P0BvRqabTxVekT+M+gPmBKZ2BWn4tn146czCNa+o83wlkNXUGAxRVx3fvyC11HHk9KjQFtvQIxoSeyIE/Fb/BWX5EK5auQnaJfwxsMMyMSeOKPZVX8IzVUjP0Ob+QP8Y1rhPq6Kg2az6Yw8z12j0XCKf4blVuuum9Y8eCvBY8ritFgTXzudzl273c4VzlBcG93/tmYa05oHb2XQMZ0RK2JfnFujVquVs9M/huVWY+g52hXzDjqmJe7jgqhZI+3wVvkFA04N8gtbI6/hSekRhV4VMS+vee3uAeOeOOSs1w3yQ9Zq0j6aB2/sPwP/ZTeFYUEsc/mZWISM2jKaeTzeyy50FWV2k/LgquQJpNSmySfxeLsPfnAQlzCC1dgAoInxDP9Vg8gAauG1//82I/ZM1DztW4wSL9xQTRdfTNL0AAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"volumeCapLeft" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAaCAYAAACdM43SAAAAEklEQVR42mP4//8/AwgzDHcGAFd5m2W1AHjxAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"volumeCapRight" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAaCAYAAACdM43SAAAAEklEQVR42mP4//8/AwgzDHcGAFd5m2W1AHjxAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"volumeRail" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAaCAYAAAD43n+tAAAANklEQVR42u3PsQ3AMAgAMIZKSGz8/yvNBdlbZH/gCACAmycz31Wh7g6hL4eqaldoZoQAAP7pAACeB6WdpTwEAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"volumeRailCapLeft" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAaCAYAAACQLf2VAAAAUklEQVR42mNkQAOMg1aAl5dX4O/fv+uB2AEmsJ+RkdGBg4ODgYmJCSzwX1RUlIGdnR2u5b+amhqKGfsVFRUdmJmZEYZKSEj0c3FxJQxu76MLAAClCw6mxiBchAAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"volumeRailCapRight" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAaCAYAAACQLf2VAAAAU0lEQVR42tXMMQoAIQxE0XTaRLaS1GlCGkW8Px5t3KzsIRx4zYeE6JqllBByzouZHxIR1FpRSsEbFrk7gqpGAM058fvCGAOhtXZOeu8IZnaeXrMN+2gdUQAHUEcAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"volumeProgress" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAaCAYAAAD43n+tAAAAL0lEQVR42u3PsQ0AIAwDsCLx/6udM8EFFTuyP3AVAMBkJTk/hXZ3l5CQkBAAwNsFna8SATE1MG0AAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"volumeProgressCapLeft" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAaCAYAAACQLf2VAAAASklEQVR42mNkQAOMg1bg06dPAqysrOuZmJgcwALPnj3bD+OABa5fv/4fRcuxY8dQBbZt27b/////CC2rVq0S+P3793qYIOOQCQ8A+QIdmsjAgckAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"volumeProgressCapRight" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAaCAYAAACQLf2VAAAAQUlEQVR42mNgGDLg58+f/0H4+/fv+z99+iTA+OLFi/8wyX///h1gef/+PbIGB3QBBhQBRkZGhBYQh5WVNXDoBAcA0N8jO0ip8PQAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"volumeThumb" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAaCAYAAACdM43SAAAAEklEQVR42mP4//8/AwgzDHcGAFd5m2W1AHjxAAAAAElFTkSuQmCC"/\x3e\x3c/elements\x3e\x3c/component\x3e\x3ccomponent name\x3d"display"\x3e\x3csettings\x3e\x3csetting name\x3d"bufferinterval" value\x3d"100"/\x3e\x3csetting name\x3d"bufferrotation" value\x3d"45"/\x3e\x3csetting name\x3d"fontcolor" value\x3d"cccccc"/\x3e\x3csetting name\x3d"overcolor" value\x3d"ffffff"/\x3e\x3csetting name\x3d"fontsize" value\x3d"15"/\x3e\x3csetting name\x3d"fontweight" value\x3d"normal"/\x3e\x3c/settings\x3e\x3celements\x3e\x3celement name\x3d"background" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAA8CAAAAACCmo8mAAAAG0lEQVQIW2NIZeZh+s/EAMQwiMxGlSFHHQ7TAEepMbj150V5AAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"capLeft" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAA8CAYAAABfESsNAAAAnElEQVR42u2WvQ2DMBCFv8I1M3gjMoTpMwqjkI1S0RnJEhaiuZcFEuyCBCnyqz+9+9XpHMAwDD0wAp4PciGEXtK0risxRvZ9fw+a2ZhzZp5njuTMzC/LQklOEtu21YGSyqCZ1YHfcazR1Tle6FjVnr+q+vz2XJxjW4p2Utr2tFn/OvT5s5b0BHwJdmZ2Bybg0NmllB5d190kHb5cL8J5WhbWZJeBAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"capRight" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAA8CAYAAABfESsNAAAAmklEQVR42mNKTU39jwffB2J/BiBgunnzJgM2/PjxY4bPnz8r/P//f0NKSoo/E5DBgA1//fqV4enTpyDFDP/+/ZvAxEAAvHnzBqRQAaeJMPzz508wTVAhDBOlEGg1LUxkIAIMtBsH0ERigmf4+XpggodGbhxNFKNFymiRMhrXA1Gk0D+uoQH+gIkIRSCrC5gIeOIBkA74+PHjRgDhswBcaL43lQAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"bufferIcon" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAQAAAAm93DmAAAFy0lEQVR42oWXy2sk1xWHv1vvR1erNeqWZ2TFiSQ/ZI2GMBDygsRhTIwZgg3ZeeFV9lnlT8giS/8BhqxCICYJ2TgPhzEhYLJQFgMT2SN79JhoMq1Hq7tVXV3ve7PoktQjd8sHCpq6zVfn8TvnVAkumRLnPzV0LFw8XCwgI2ZITEaJFIqJZlxCneEEAg0bn0Y8176eB2CG19tuhx4DUpRiMtIYw40gooJqGHjMHi5urzt39JZgeHRwb/nBPJRIFOWVHqoRzEDHQKvOTGpxc/uW+zNnzUcQoy9vvx/EbkxKgWS6h0og0DGxcbAxERRIdIKDBfeOszZPgCDmcE2+3n68dMyADJSYFLRx7p2JS0B9a34YCGEMb3aQ+HJGb/kEGIBPQLyUB1joiLXGYx1FwmBSyAIDm2DY2ljVX9WXoXzy8db6f1tSM8V5UkGghwB/t36x0iYfBR2xj3wWKNDQcahvrNo/Mr7joZPcSlYffPT9XTsbnCTE+EDKkPy4FvaK9xaGWZ5XBJ9FHl8A9Sp/NrWtr8Xftl5v0STAFqqhiqx94/TpQC1krZKYHtFm+PsXtz7IP9E7RaLiswxaJGSXQ9Yxh4G+7FHHAmoqE/ELHe+lg6WHX/y6fC1tqqDYHt5bfuAe/9PtFZHMxgviXGTyQthCCNDPNaODoQqi2d6tk6c7eYByw5faboferugY+ZQ+OcshSHIjKp8k6wk+UBAruW+dEjJ01NIhJuqs9XpG1sjUMx4mX+4URXHz6ONPk1c6Sym6ign7w/vrbQYMKBAIFJKcgvzW8aafaWO4bFw6QmlomKOubV/fXHVv21/HlPvx/dbm6i5dIopKFhKFRKJEnefQK0LJHuk40MDAxsGjhp/4O3PdQEo3Wmk3OvQZkFBWQDW6hAJMrmEDIf1xFYJQNjZ+P9iaLwLLDNQLoZORkVSjKqn8U6M/f6kGGgEmkBOOwEIF+FvNf78ys2bXhC6j5PPbO8+fEBGTkI+GwLTZh80i1nkm90nBwOoFGy83f+Dd8IUgFdq1f+Vv9IOclOIrcNoYDiwW2UFqmJtzM2vejRYt1VJNVXvOe3mzXlVVwlQcBGO4ETIAAyNxzZqHjwF4KmEwN3TQERe5m2LmpDuVnsYnColSqCtRV5hG4cT5ICFBVc2QDdyEEoX4Cmg+6Y5Gvtbpb0ZPO5zQEx0RtvsPb3arAa9dCQwvZkxV5xAMskb4ra0N8rUoEE5+cvrZd3fqKQqdEjV9uwGS/UuykWfC9nrBw1bma1pQrHT9mISEjIyC/ErhTBS2gY6NjYODGZob9T23KN3oe4fLAxIyCqSQSlwS0BWtpyEwMbBxP2v87RszC1Zd09J+/+nSzk/axOQUVXEu2m9m+nAwUECBRgl/Xphfqc066Cp1rcauejRYGe1fdY5UijXz0wsc6CzyaAwolBKAQnxU9+e9RkP5CDKEk9345GBlQHHmW9U7cu+aZTwzXi1qz66A0aF27DmBjYsGWHg49Y6HgfmF8buga0KQvd37Zk5pOsXl0kzcKUqq8ccKkKVC/MP7zYI7YxlwlP+qe3fv3YGrlQKyK9++FAo5F+10k/mYUcgxcf/58Ej/4+J803UsBTm+/SG3P38x+o93CTe2U7Tz7BRvdvP/hftdTuhyQq93sP/Dk3u+2/CdgDoz1Jlxm7N/mPllKEpLjOGi8Z1igFBKIClI39n+LcOoNiuITsODH+/OJU9cXbexlQ7Y5NTs0HpN3Xn81wXLrLyM2J8UsqQkaw1+/vAvhx0floZv9MhRqSykHJtEUgJ8kPKoUc8MYMhwQg6FUlACkuLNFA1GAkFoSZJnKsMGCjLivJmNVNHvTevFqmFQlBRkJAwZkpCSk7/VOzg5jUMGRIT04qPuT/uV1KfYuWyEUiO/RrNWAQLxanp370Oas56paVF61L27t55Ne3c9l9u4KXHpVEe/b/6pEVoXwqa8av4Iplr1VaChoVVejzKrrlpd/wdqZ96EzbsuCAAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"errorIcon" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAACL0lEQVR42u2T64nCUBCF7SAlpIQtISVYQkrYElKCJaSElHBL8LfPKD7wyUXxgYrOzkCyHC6b3LgasywOfBDuOTNzcklq73rXfygiqjMxk1YsZ38lXIOyq1F1OI/s5VUZsAlBNOMlaDhvVhXOZ7B80D4ztNeV+VNY9VdUzg3VM/5srM9XhXOMb0zleJXxjTqlB7xer8HtdiPAy/KKhl7pLTXc5XJxGc1QggJNIXgOfs24pQU8nU4hQynn89kFjZD0XDyGFpYS7nA4uMfjkYAQddQEQwtRk1lPD7jb7SKGUvb7vWvoTdCbqIkXNCF6arjNZuNtt1sCAtPDZwp09YMe4AyZ+bSAWmvFUILm4Y7Fo0xderQUep5Rq9XKW6/XBAQ/+fi8AZ5GhicwZj1+i4vFIl4ul5QQZ/lYC8AX5Pi+58nsh8LNZjOfoZT5fO7neAPwZgaUGeIB/F+Fm0wmznQ6jRlKyH1b1uvgred5zbmy6+6Ao9EoGI/HBHh5ftF/6SXZdVe44XDoMJqhBFWgxwO/V8CvwK+Z4rfY7/eDOI4JsC4cDAYO4yVYl8lM3CE7C4XrdrsuQym9Xi+qlVQyW3YArrWp3W6HDKV0Oh1usler1fLTHnku0iOzxQ+EtiUfDAHYYOsl5I6+0Oj9yDNHYNSM84KADqOhNyq65K5fX/wP9tpfznrV9kWu7dbtn1bxgCHj1sorfKmwaEDFUMUo21XrCsNpyVD4yl8GflLvetcfqy+dCCa6ODMoXAAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"playIcon" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAmUlEQVR42u3YsQ2AMAwFUTZhNEbJKMyVIsooxgXdiYogrvCXrn+SO28Roa6ABSxgAUXAlp3Zvq3fIuA9QG1AQJ1AQqVAQqVAQqVAQqVAQqVAQqVAQqVAQn1A7ngNHGO0LL5ozvke2HtvWSzuzHDiv4CE3ZMACZMACZMACZMACZMACZMACZMACZMACdMAAVu3+iwUsIAFLOBDFwtNtcHhiAyTAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"playIconOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAB+UlEQVR42u3YPUtCURjA8epqWlmS9EbvFEQUQUOFZksEEb0MzUFBQzW0VbOfIugr+AWaWwrKNQIVQXwFndXx9h9OnOiVy9PJhB74Ld7lD5d7POc02bb9pzVe4FfD8+am35vvAnWU0gJN/V6HwHdhFlxohUdphQvWS2y9Ai0V1AE/AoofPnjhdhIqD3wf14V+jGNKmcAQetTzNmeh8sAWuOHDAKYRxBrWsYolzGAUvQ5CJYHQH4QH3ZhEGFHcIoIT7GETy5jFmINQcaCFNvRhDju4tvU84RJnOMC2s1B5oAsdGMQi9nCDt5PAFS4EoaLAYYRwiDt8Nkl5qPNAH0YQxhHuocZAqCBwBcd4gBrToc4DTxCDHmmoXp464YVLR0oD5aFbCGEGIwigHW4dKQmUh55jHxtYwAR63kYKAsWTwCVOsYugigzAC6u+gXoeEcEO5jEIH9yCQCNzhRDG0KVfs4PAUqkUS6VStgnlclkeWCwWY/F43P5JmUzmsVKpCF6xocBsNpuoVquCj8RQIGHJWq1mYJlRgcIwwUJtKFCHmf+rOybwQRBmdLMQxlGhULg3GSbesBJ4ZzBMvuXP5/M3Hy0XgrCfPTTlcrnrVwvsE+uY4NBk4NhJVDSdTt+y8guOnQ1/cG/8qw/55dH/9dsfusBsjCvg/1t+qWfcOHUEmHnfQwAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"replayIcon" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAABxUlEQVR42u2XwY3CMBBF0wElpARKcAkpISWkhJRACS5hS3AJnOHAwoEDB2QOHJCQmP2DcrBGycZ2BtiVMtKTEGLe/NixJYq55prrxUVEBjSgBStgu88NMJ8KVXZBPI2XBxaU7wi2AJbyy7LjVeGWwNP08uzSDlcDPzLUCcZ+X79j5RyofumtgNNeSfnO+QG5SfCYIc+kd3LgQKxzpNzT9cqy2VfJ4BPr70iptXpG42JXWcXH4+EBBbhCqdgl3D5JcL/fDSBBpRWQXT3++N253W4NoABfKBc7xYwmuvl6vbaAApx2QHaKGW108+VysYAC1AOyU8yID3g+n1eAAtQDslPMiA94Op1aQAHqAdkpZsQHPB6PDaAA9UPCTjEj/pAcDgcDSJB1zez3e9Pjr3r8Jkm82+08oADe5lSH6Xqt+N4Jd/oObbdbCyhks9mYREcd9D9DskN6gU0OCFEJSODBIsGxEv22c5Ag7/9KJyTBV0K/AzSCLXKLV6vnieuEftkr+RY7khVyGQyqJ74iEp0/TxBVTGKPedX2aj1UC+jPhuTDBEgvpH7AdUJA/4GAw2GAAy2oNQ7KlEt+DWwXxoBFMddc/6x+ACbEv+zn5grUAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"replayIconOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAGZklEQVR42rWYTWxUVRiGoTPM0LG20IEypUCKTX9IhCK0iqAVGtQAIUasAyaAWkaJJlZMhigs8CcaEhdSdSNx0bhRFrqQjS66BTFGFiSFgC2/bWkhQIFSZ4pwfW/ynOTkwO3l9yZPAnfO+b53vvOd95zpuLt9PM8bb1EgIhB1iECBPWfcw3psUQiYIOKiUCTEIw4JPoszNmqLfRjCIkYUyYtFqSgT5aJCzIAK3pUxppg5RmzkgQh1KjZRFJEwJSpFrZgnGsQisRgW8W4eYyqZU0qMiXZF70dcRMRYslKqUyMWiCaxUrSI9aJVZKCVdy2MaWJODTFKiRkz1bxXcXGWJyWqRaN4QaTF2yIrOkSn2C8Oii7+3clnWcammdtIrBSx4wEiQ8VNFCV847limVgn2kQ7QvIi7Mkztp2564g1l9gl5ELkHVaOiTPFfLGCpdspjoh7fY4QI0PM+eQosSsZtiFilH4GAVaJd0UH1bivhxgdxFxFjhnkjAVuHARGad4US7CCQL+JfEjSs6IfzoaOV0xiryBXitxRBAb2XZLd1iwyIZUbEHvFJ2KreB+28m6vGAipZIZcNeR2+hGBGGgR5W6kmXcGiBsVv4odYrNIYyfLYaVI89kOxo4GiNxJrkZyF6FlvNt7cfypFjtoC9gQQ2K3yBK4GY+rE1VQx7tmxmSZMxSwcdrIWYuGuOlFu/cSopzAa7EF9xkl0QdiDSdGNfOSogSSvKtmzBrm7A6oZDs5FzAvYXrRXt5ijqQmjLXLjcJSZUnYKGYjpohvHYM475KMaWROlhju00XOJjRIC8vsLG8d/ZO9efNmTngWA/TTOqoymzmFBONqJbhY8FkpYxcxd4cfy4mdQ/xKUWcv8ziCFXLzqBctN27c6Lh+/bpno3d7afpmli7JPPfQdy8ZhYytZu5mP9Zt4nf4udFQxryIEWj6r0Fs0ITOXC7nWeSxjbTpE2u3FYQYv3GH6cxN+7H8mHYOP6efGw30oQRa5lzBMrRqwv7h4WHPMDIychZvM0uQDDma3Crir7SQYvkx7Rx+Tj83GiqMaRuBxv8Wi4wmdA0NDXmGK1eu9GHAy7GRSeZYCrt5O71YLZ4XW/yYdo5r164dwLQXGz8MFKjJBy9cuOCBHyBYYHDV4ggrwnqmWR67RTH77RxXr14NFugu8eXLl/cPDg564Adwltgx09tsDERNFeUkrKIHXxIf+jHtHMoZtMS3bhJ9u86+vj7P0N/fbzbJq+IJxtoHu3ueT0JUragn7tNU7w3xhR/TzqGcQZvkVptRuTtOnTrl2egb+jbzlnhOPIYIU0X7qvYoFZgnll68eHE79vGa2CS2q4V+d+MrZ4DNBBj1iRMncsePH/cMZ86c8Zd5m3iZICmRsHzQvQ0tu3Tp0uea61fob/3/Yy4G3/X29p63YytXoFEHHnUS1HXs2DHPRsuwhz551jqSYoiLIjhFG7xy7ty5PWauRPXo3c+q1J9uXOU6zCHgHnXBlwX51K6jR496NgqWy+fzH+nzF+2bhznaWN5ZYololai/7Pmq5HnF+M+Nq1zfcAwudC8LY1233jt9+vRhN5iW4xBLMcdcMAkWoy+rsKM2je1jXiCq3j84xConJg4RfGFNj46OfuZXzQ44MDDwAwJqxGQRt08LkqwW2zQ3P5a47u7uER1x32vsO2Ipl4oSx2Mdi8Dx2a0btOPalehfBfT96kes5imW0vRg1HGCtJbt27Dq6fTYp7G7RCsGPZM24UYd8KMJ15+DyBY1+9c+3OmeoXpTERW1e5jqb/Q3VJjAXj0a+5UlcFaYQNvLUghp8EXBQqo7zbrNROzjEkPeJCM+gJAxUZ934a/uDi4Y8+8xJJyC6VZChblBW/ZSYAmcyQ7OnDx5shsRoWjsPusAcHowWOQE+7CHIucGTdWxGAlkqd7s6ekZRMCdMMwXqwwT6C63ERoDhHG8gVXBCvOTNUiMv7NlP/16/lBf/6Ij9FNsq15Mt3923tWfel1RDHONfpp4XDt/IzbSpx47JDH7tGl+km196Z/FXN0yYi2eu5DqTXZ+uN/341rUZBIt4GLawg3ldbEei1qNjy5BWB2tUWqf7Q9WIH2IRSWxizmcyU9Cg6jnfRVjyhlfbHrbFfcwRCZo9ClY1XQoF2UImsSmSlD52IOtXPiPpBiJEwF/9TcbLupuOjfu/32eYAv3OqcpAAAAAElFTkSuQmCC"/\x3e\x3c/elements\x3e\x3c/component\x3e\x3ccomponent name\x3d"dock"\x3e\x3csettings\x3e\x3csetting name\x3d"iconalpha" value\x3d"0.75"/\x3e\x3csetting name\x3d"iconalphaactive" value\x3d"0.5"/\x3e\x3csetting name\x3d"iconalphaover" value\x3d"1"/\x3e\x3csetting name\x3d"margin" value\x3d"8"/\x3e\x3c/settings\x3e\x3celements\x3e\x3celement name\x3d"button" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAA80lEQVR42u2WQQqDMBBFQ4pQeoVueiN7BtG9R+lR7IlaAllnIZaCxHR+KWLpou7mCxE+Jm7m8b+TiTXy1HVdim5N0yQNoTYYwGKrqiqnaer6vj865x4aQm0wgMXGGC/yYfTeP4dhiBpCbTCAxQrZKYQwppSMpsAAFgAZJiGy90LbITCAhc8hBneWLs2RMegrMgZ3ZodYIuP8qSnbfpmhln66jO5gpOsyhsh4HaI7qfMs29Qsy5H9iyxfYddMe8r7EFWX5cg2FVkeritO6rtsCoILWgEWONRiY4zZy3unoU9tmNLaEMJVFmeRl48HDaE2GMDyAjEWKwKFLBqcAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"buttonOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAA80lEQVR42u2WQQqDMBBFQ4pQeoVueiN7BtG9R+lR7IlaAllnIZaCxHR+KWLpou7mCxE+Jm7m8b+TiTXy1HVdim5N0yQNoTYYwGKrqiqnaer6vj865x4aQm0wgMXGGC/yYfTeP4dhiBpCbTCAxQrZKYQwppSMpsAAFgAZJiGy90LbITCAhc8hBneWLs2RMegrMgZ3ZodYIuP8qSnbfpmhln66jO5gpOsyhsh4HaI7qfMs29Qsy5H9iyxfYddMe8r7EFWX5cg2FVkeritO6rtsCoILWgEWONRiY4zZy3unoU9tmNLaEMJVFmeRl48HDaE2GMDyAjEWKwKFLBqcAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"buttonActive" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABD0lEQVR42u2XQQ6CMBREm97BeCnjIQjcxLt4KVckrKuphYIC/jEtKRu3fxaSDGlh0ZeZ/2mxRq66rs+iW9M0bw1hbTCAxVZVdVqW5eq9P7Rte9cQ1gYDWOw8zxd5ELque4QQeg1hbTCAxQrZ0Tn3XNd11BQYwAKgkUmI7DsQyklTYAALn0Nyi4lyVBZciltkDNpFpu3QrqizZcoiLeqi7dUj2xxKFa6q/C3idIiyywgiI3ZIBi9th8BQdhmFdl3GuJepn4fy8eMf2c/IEtBEENnEu9uz1BBvlzFGRvHXwRmZUMU0icpCUUfL4E7pEhwayvOIllLbD3DIY2KMUSvsvDZYrHPuLYM+v9BQgunB8gFJekgEq5c0PwAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"divider" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAEklEQVR42mP4//8/AzJmIF0AAHImL9Fd8LZHAAAAAElFTkSuQmCC"/\x3e\x3c/elements\x3e\x3c/component\x3e\x3ccomponent name\x3d"playlist"\x3e\x3csettings\x3e\x3csetting name\x3d"activecolor" value\x3d"bfbfbf"/\x3e\x3csetting name\x3d"backgroundcolor" value\x3d"262626"/\x3e\x3csetting name\x3d"fontcolor" value\x3d"999999"/\x3e\x3csetting name\x3d"fontsize" value\x3d"11"/\x3e\x3csetting name\x3d"fontweight" value\x3d"normal"/\x3e\x3csetting name\x3d"overcolor" value\x3d"cccccc"/\x3e\x3csetting name\x3d"titlecolor" value\x3d"cccccc"/\x3e\x3csetting name\x3d"titleactivecolor" value\x3d"ffffff"/\x3e\x3csetting name\x3d"titleovercolor" value\x3d"ffffff"/\x3e\x3csetting name\x3d"titlesize" value\x3d"13"/\x3e\x3csetting name\x3d"titleweight" value\x3d"normal"/\x3e\x3c/settings\x3e\x3celements\x3e\x3celement name\x3d"divider" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAACCAAAAADqPASNAAAAHklEQVQImWNkoBQwMzEzMSEIRl8Kzfv3799fEIIRAKz4EE/thllAAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"item" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQAQMAAAC032DuAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAABFJREFUGBljYBgFo2AU0AsAAANwAAFvnYTuAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"itemActive" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAkklEQVR42u3QsQkAIAxFQQsHy/4LqYWohYW9IAj34ENIeTkiRvq7vlb3ynHXB/+Wk64CCBAgQIACCBAgQAEECBCgAAIECFAAAQIEKIAAAQIUQIAAAQogQIAABRAgQIACCBAgQAEECBAgQAEECBCgAAIECFAAAQIEKIAAAQIUQIAAAQogQIAABRAgQIACCBAgQJ1NmcoiAdM9H4IAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"itemImage" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAAAAACpLjUBAAAAeklEQVR42mPiJQswMXCSARiYGFjIAEBtZAEmRnJ0MZJrG321jfpt1G+DzW8jMUj2lzMwlO8n2W87PMrLPXaQ7LfOHR4eOzpJ99vLe/deku63eItDhyziSfab5fGFC49bkuy3jIUMDAszRtPkaDYd9duo34aT3/6TARgA1wJNszqw3XsAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"sliderCapBottom" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAKCAYAAACqnE5VAAAAEklEQVQ4EWNgGAWjYBSMAnQAAAQaAAFh133DAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"sliderCapTop" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAKCAYAAACqnE5VAAAAEklEQVQ4EWNgGAWjYBSMAnQAAAQaAAFh133DAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"sliderRail" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAABCAYAAADAW76WAAAAEElEQVR42mNiIA78J4AJAgCXsgf7Men2/QAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"sliderRailCapBottom" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAECAYAAACQli8lAAAAJklEQVR42mNgIA78J4CpBu7jseQ+NS3yx2ORPwOVgT+az+6TYgkAKMIaoyp3CGoAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"sliderRailCapTop" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAECAYAAACQli8lAAAALElEQVR42mNgIB74A/F9IP4PxfehYlQF/kgWoGOqWnYfj0X3qWnRfwKYIAAAPu0ao3yGmCgAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"sliderThumb" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAABCAYAAADAW76WAAAAMElEQVR42mP+//8/Q0NDA16sqqr6Pycnp6G0tLShqqqqoba2tgEEGhsbG6CgkZAZAEhcK/uBtK2eAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"sliderThumbCapBottom" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAECAYAAACQli8lAAAAUElEQVR42q3NoREAIQwEwHSYJjOo1IBIDfEx+EgEDMfLVwyCbWDphoig1gp3R2sNmYneO+acWGuBXimlxCEKekVV+RAxvWRm/EXxi2KMcZ1sxLJpnEUZrv0AAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"sliderThumbCapTop" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAECAYAAACQli8lAAAAUklEQVR42q3NoREAIQwFUTpMk0wUNSBSAz4mPhIBk8/JUwwiW8C+8pqI0BhDzQzujjmnrrWoZNZao947Pgg/CHtvREQexsx6gTQNqrXiAuHlcQDl9mmceNYnwwAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3c/elements\x3e\x3c/component\x3e\x3ccomponent name\x3d"tooltip"\x3e\x3csettings\x3e\x3csetting name\x3d"fontcase" value\x3d"normal"/\x3e\x3csetting name\x3d"fontcolor" value\x3d"cccccc"/\x3e\x3csetting name\x3d"fontsize" value\x3d"12"/\x3e\x3csetting name\x3d"fontweight" value\x3d"normal"/\x3e\x3csetting name\x3d"activecolor" value\x3d"cccccc"/\x3e\x3csetting name\x3d"overcolor" value\x3d"ffffff"/\x3e\x3c/settings\x3e\x3celements\x3e\x3celement name\x3d"arrow" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAASklEQVR42p3KQQ2AMAAEwXOAi/lWSqUgpZIqASmVAN+GNECYZH8bHDhfOoLyYSxJEuwP054Z+mLqucOGMU0DW1ZQp7HmCRpa/roABHU6b1RN/woAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"background" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAADklEQVR42mNQQwIMxHEAuXQHISaBGr0AAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"capTop" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAADklEQVR42mNQQwIMxHEAuXQHISaBGr0AAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"capBottom" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAADklEQVR42mNQQwIMxHEAuXQHISaBGr0AAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"capLeft" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAADklEQVR42mNQQwIMxHEAuXQHISaBGr0AAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"capRight" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAADklEQVR42mNQQwIMxHEAuXQHISaBGr0AAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"capTopLeft" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIElEQVR42mNgAAI1NTV/IL4PxP9hnP8wzACTQRb4j4wBSrYUAF5mO7QAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"capTopRight" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAH0lEQVR42mNQU1P7D8T3gdifAQSgAjDsjy5wH13gPwBoAhQA/dBvkQAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"capBottomLeft" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAHUlEQVR42mNQU1P7j4wZgMR9dAF/FAEQgAqCVQIAxzkUAKo9yiMAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"capBottomRight" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAHElEQVR42mNQU1P7j4wZ0ATuowv4wwTugzlAAADkhRQAhODqdgAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"menuTopHD" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAYCAMAAABaxIqeAAAANlBMVEUAAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAzMzOAgICiTZjlAAAAEHRSTlMADx8vP09fb3+Pn6+/z9/v+t8hjgAAAKRJREFUeNrt0EsOwyAMANHBfOKCA+X+l21Eq0RKN6jtoou8nS15hODyK956U1AFLEDu8proWN9YUXDNM8W1BVn1CNakRxB0xISizEkF8HUPxsx6DhItrEzZT/dgieR4DlK6Z9KSAdlf6PqmvAWDMUuad6UoycZfpQxU+SJIalb7AlatKWsEbqrVzD4M4oJ36sAHgTA2XsJmDCLPDZfLcP8xLv/nAYfSCxb2gYC4AAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"menuTopCC" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAYCAMAAAAyNwimAAAANlBMVEUAAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAzMzOAgICiTZjlAAAAEHRSTlMADx8vP09fb3+Pn6+/z9/v+t8hjgAAAOJJREFUGBntwVFSBCEMQMFHyECAQMz9L+vqnmA+tCxruuHxR1TPaEDLBpqZ0TW/qBnYyX1BdlCnesbgnhIdCYV1OaiDhEACZvQtaFTyCOoso+zGLW0BIpTDEtSBrZCAGacCfZLdUWdaQYRbzPjWB22gx2xuIAEzkhd1Em/qFNvbCrf0CUhlZ2agx6wXIAEzQoC2SCQuR6HMyS0SFZbJAWZT5y0BM8aEsi8S7Djngra4p4UfL2MAl6vzloAZZR2PAQlsp8beUbmpaIVaeNFSeVNABBAtgAJSAVUej9/08cN4/H+f7VwOHN0tLaAAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"menuOption" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAuElEQVR42u2SQQqGIBCF/wOU1UYUMjAiQdSTeI4O2DnmUL9PatVq3AUNPBhEPt6bmd9XL6u+77uiXHRAV9+1wvais4iEEFXor7e9xdkJiJSSjDG0LAsppWgYhgplOb2iVdi2bRRCqHLOkdb6dpo5wAPu4AyglFJVjJGstTSOI+EPF4iYD+C6rjRNExuIyJgZYgJU5b2neZ7vBWX2UrAAzAwx4QwwuLuX0no2mBlAcMY4G85hf/Wu+gNm+kvWRCvtuQAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"menuOptionOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABfklEQVR42r2VTWqDUBSFG6v5KcVJsWTWaUZdRLuNbsNxt5CZ4/xsIJhAkGQJ3UBCcCA6UhBJQDDk9h04giREKQkVPpD37j3cc+/z+dD0iEirSn10s4hGHokG/iReEdIVbUVH0SMdrumlcKMYKzEUTwpT8aKwAN9N7hmMbdWKsYJnCrwpBop3MuCaxZh2KXrNpsHAPpK32+2H4zjfw+HQAXjHGoX7jDUu7FNQpxULCa7rftm2/TMajeLZbJaB8XgcYw17FLWYo58LaizfhCVVxScSl8vlYbPZSBiGEkWR7HY78TzvgD3E0L7JXO3cbpdNH8AaqoFYmqZSFIUcj0fZ7/fi+75MJpMYMYhlTre0XR1GT/GK5qNfsIjKIFY+p9NJ4jiW1Wp1QAximdODRqMgbKKyqmCSJLJYLLJrgrWW0TPYhBDI81yCIJDpdHrVcu1QMAD0DDZRGcTW63XdUJqPDSqdz+cZ+oZhNB6b+x/s+396t18Od72+/vuCvf0X8At7J48fIgP61QAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"menuOptionActive" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABfklEQVR42r2VTWqDUBSFG6v5KcVJsWTWaUZdRLuNbsNxt5CZ4/xsIJhAkGQJ3UBCcCA6UhBJQDDk9h04giREKQkVPpD37j3cc+/z+dD0iEirSn10s4hGHokG/iReEdIVbUVH0SMdrumlcKMYKzEUTwpT8aKwAN9N7hmMbdWKsYJnCrwpBop3MuCaxZh2KXrNpsHAPpK32+2H4zjfw+HQAXjHGoX7jDUu7FNQpxULCa7rftm2/TMajeLZbJaB8XgcYw17FLWYo58LaizfhCVVxScSl8vlYbPZSBiGEkWR7HY78TzvgD3E0L7JXO3cbpdNH8AaqoFYmqZSFIUcj0fZ7/fi+75MJpMYMYhlTre0XR1GT/GK5qNfsIjKIFY+p9NJ4jiW1Wp1QAximdODRqMgbKKyqmCSJLJYLLJrgrWW0TPYhBDI81yCIJDpdHrVcu1QMAD0DDZRGcTW63XdUJqPDSqdz+cZ+oZhNB6b+x/s+396t18Od72+/vuCvf0X8At7J48fIgP61QAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"volumeCapTop" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAGCAYAAADDl76dAAAAFUlEQVR42mP4//8/AzUxw6iBg89AACt1ZqjY29nMAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"volumeCapBottom" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAGCAYAAADDl76dAAAAFUlEQVR42mP4//8/AzUxw6iBg89AACt1ZqjY29nMAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"volumeRail" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAA8CAYAAABmdppWAAAAPklEQVR42u3MoREAIAwDQDpI95+xVwG2AjziY3IR+ViPZOaeu7tXVc2O2y+AQCAQCAQCgUAgEAgEAoHAP8ADVGLAaqN7TdUAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"volumeRailCapBottom" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAECAYAAACOXx+WAAAAW0lEQVR42pXOsQoAIQjG8QPJIWuwlhafqfefepQvbLqhE274gwj+8AFwzczwbowBVUUpBSklfN1F4LqBIgJmXr/BWuvsvTt0aq35dwckohmBIZpzXg55PvsuutlmfbZn1WsUKQAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"volumeRailCapTop" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAECAYAAACOXx+WAAAAX0lEQVR42p2OsQrAIAxEhRAHoxB1cfGb/P/JTzkboVsttMODcOEe5wC4EymlEUKYMUYYdlv21jk+VHXUWtFa25RStlREQETjs7D3Pi9wY9Kc8xZ67+cfIZ6EtpKZceot+LS2cEn/XGYAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"volumeProgress" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAA8CAYAAABmdppWAAAASElEQVR42u3MMRXAQAjA0LrnvTOBDGygAxHkDLR7hwwZ8x/gtYjgnENmUlV0NzPD7gLw9QkKCgoKCgoKCgoKCgoKCgoKCv4EvNU5k5sN8UhuAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"volumeProgressCapBottom" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAECAYAAACOXx+WAAAAVUlEQVR42pXMwQkAIQxE0XSYshQtImXYhh3kKFiD+L3s3iTgwBz/E0BuTylRSsHMaK3Re2fOyd6bb9dOAtAD0J/BnLMGoD6DgNRa1cz8B8cYvtbSqDn4F/TaDHcq1wAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"volumeProgressCapTop" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAECAYAAACOXx+WAAAAVElEQVR42mP5//8/Ay7Q09PjLyIiMkFCQkJBUlKSQVxc/IGoqGgBMzPzRlx6WHBJdHZ2+jMxMW1AFgMapAAVCwDijSQZCHT5BAbcYALJBgKBAjlyAHZIEpxZZYn/AAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"volumeThumb" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAAnklEQVR42mP4//8/AxbMBMTsQMwHxMJALALFwlAxdqgaDL24DOMGYoVly5ZFVldXz6ysrFwOwiA2SAwkB1XDRMhARqjtigcPHsw/d+7c9Z9A8B8KQGyQGEgOpAaqlpGQgSAv2Vy7du38fxwAKmcDVYvXQCZoOHkjuwwdQOW8oWqZCBkICvyA/4RBAFQt/Q2kqpepHilUTzZUT9gUZz0ACDf945eBHBQAAAAASUVORK5CYII\x3d"/\x3e\x3c/elements\x3e\x3c/component\x3e\x3c/components\x3e\x3c/skin\x3e';
        this.xml =
            f.utils.parseXML(this.text);
        return this
    }
})(jwplayer);
(function (f) {
    var g = jwplayer.utils,
        a = jwplayer.events,
        c = a.state,
        d = g.css,
        b = g.isMobile(),
        e = document,
        k = ".jwpreview",
        l = !0,
        h = !1;
    f.display = function (m, w) {
        function n(d) {
            if (Y) Y(d);
            else if ((!b || !s.jwGetControls()) && P.sendEvent(a.JWPLAYER_DISPLAY_CLICK), s.jwGetControls()) {
                var e = (new Date).getTime();
                ka && 500 > e - ka ? (s.jwSetFullscreen(), ka = void 0) : ka = (new Date).getTime();
                var j = g.bounds(y.parentNode.querySelector(".jwcontrolbar")),
                    f = g.bounds(y),
                    e = j.left - 10 - f.left,
                    h = j.left + 30 - f.left,
                    k = f.bottom - 40,
                    m = f.bottom,
                    u = j.right -
                        30 - f.left,
                    j = j.right + 10 - f.left;
                if (b && !(d.x >= e && d.x <= h && d.y >= k && d.y <= m)) {
                    if (d.x >= u && d.x <= j && d.y >= k && d.y <= m) {
                        s.jwSetFullscreen();
                        return
                    }
                    P.sendEvent(a.JWPLAYER_DISPLAY_CLICK);
                    if (R) return
                }
                switch (s.jwGetState()) {
                    case c.PLAYING:
                    case c.BUFFERING:
                        s.jwPause();
                        break;
                    default:
                        s.jwPlay()
                }
            }
        }

        function z(a, b) {
            Z.showicons && (a || b ? (O.setRotation("buffer" == a ? parseInt(Z.bufferrotation) : 0, parseInt(Z.bufferinterval)), O.setIcon(a), O.setText(b)) : O.hide())
        }

        function j(a) {
            x != a ? (x && q(k, h), (x = a) ? (a = new Image, a.addEventListener("load",
                B, h), a.src = x) : (d("#" + y.id + " " + k, {
                    "background-image": void 0
                }), q(k, h), C = F = 0)) : x && !R && q(k, l);
            p(s.jwGetState())
        }

        function r(a) {
            clearTimeout(fa);
            fa = setTimeout(function () {
                p(a.newstate)
            }, 100)
        }

        function p(a) {
            a = X ? X : s ? s.jwGetState() : c.IDLE;
            if (a != ba) switch (ba = a, O && O.setRotation(0), a) {
                case c.IDLE:
                    !Q && !J && (x && !D && q(k, l), a = !0, s._model && !1 === s._model.config.displaytitle && (a = !1), z("play", t && a ? t.title : ""));
                    break;
                case c.BUFFERING:
                    Q = h;
                    L.error && L.error.setText();
                    J = h;
                    z("buffer");
                    break;
                case c.PLAYING:
                    z();
                    break;
                case c.PAUSED:
                    z("play")
            }
        }

        function B() {
            C = this.width;
            F = this.height;
            p(s.jwGetState());
            I();
            x && d("#" + y.id + " " + k, {
                "background-image": "url(" + x + ")"
            })
        }

        function A(a) {
            Q = l;
            z("error", a.message)
        }

        function I() {
            0 < y.clientWidth * y.clientHeight && g.stretch(s.jwGetStretching(), u, y.clientWidth, y.clientHeight, C, F)
        }

        function q(a, b) {
            g.exists(v[a]) || (v[a] = !1);
            v[a] != b && (v[a] = b, d("#" + y.id + " " + a, {
                opacity: b ? 1 : 0,
                visibility: b ? "visible" : "hidden"
            }))
        }
        var s = m,
            y, u, E, t, x, C, F, D = h,
            L = {}, Q = h,
            J = h,
            v = {}, R, N, O, X, ba, Z = g.extend({
                showicons: l,
                bufferrotation: 45,
                bufferinterval: 100,
                fontcolor: "#ccc",
                overcolor: "#fff",
                fontsize: 15,
                fontweight: ""
            }, m.skin.getComponentSettings("display"), w),
            P = new a.eventdispatcher,
            Y, ka;
        g.extend(this, P);
        this.clickHandler = n;
        var fa;
        this.forceState = function (a) {
            X = a;
            p(a);
            this.show()
        };
        this.releaseState = function (a) {
            X = null;
            p(a);
            this.show()
        };
        this.hidePreview = function (a) {
            D = a;
            q(k, !a);
            a && (R = !0)
        };
        this.setHiding = function () {
            R = !0
        };
        this.element = function () {
            return y
        };
        this.redraw = I;
        this.show = function (a) {
            if (O && (a || (X ? X : s ? s.jwGetState() : c.IDLE) != c.PLAYING)) clearTimeout(N),
            N = void 0, y.style.display = "block", O.show(), R = !1
        };
        this.hide = function () {
            O && (O.hide(), R = !0)
        };
        this.setAlternateClickHandler = function (a) {
            Y = a
        };
        this.revertAlternateClickHandler = function () {
            Y = void 0
        };
        y = e.createElement("div");
        y.id = s.id + "_display";
        y.className = "jwdisplay";
        u = e.createElement("div");
        u.className = "jwpreview jw" + s.jwGetStretching();
        y.appendChild(u);
        s.jwAddEventListener(a.JWPLAYER_PLAYER_STATE, r);
        s.jwAddEventListener(a.JWPLAYER_PLAYLIST_ITEM, function () {
            Q = h;
            L.error && L.error.setText();
            var a = (t = s.jwGetPlaylist()[s.jwGetPlaylistIndex()]) ?
                t.image : "";
            ba = void 0;
            j(a)
        });
        s.jwAddEventListener(a.JWPLAYER_PLAYLIST_COMPLETE, function () {
            J = l;
            z("replay");
            var a = s.jwGetPlaylist()[0];
            j(a.image)
        });
        s.jwAddEventListener(a.JWPLAYER_MEDIA_ERROR, A);
        s.jwAddEventListener(a.JWPLAYER_ERROR, A);
        b ? (E = new g.touch(y), E.addEventListener(g.touchEvents.TAP, n)) : y.addEventListener("click", n, h);
        E = {
            font: Z.fontweight + " " + Z.fontsize + "px/" + (parseInt(Z.fontsize) + 3) + "px Arial,Helvetica,sans-serif",
            color: Z.fontcolor
        };
        O = new f.displayicon(y.id + "_button", s, E, {
            color: Z.overcolor
        });
        y.appendChild(O.element());
        r({
            newstate: c.IDLE
        })
    };
    d(".jwdisplay", {
        position: "absolute",
        cursor: "pointer",
        width: "100%",
        height: "100%",
        overflow: "hidden"
    });
    d(".jwdisplay .jwpreview", {
        position: "absolute",
        width: "100%",
        height: "100%",
        background: "no-repeat center",
        overflow: "hidden",
        opacity: 0
    });
    d(".jwdisplay, .jwdisplay *", {
        "-webkit-transition": "opacity .25s, background-image .25s, color .25s",
        "-moz-transition": "opacity .25s, background-image .25s, color .25s",
        "-o-transition": "opacity .25s, background-image .25s, color .25s"
    })
})(jwplayer.html5);
(function (f) {
    var g = jwplayer.utils,
        a = g.css,
        c = void 0,
        d = document,
        b = "none",
        e = "100%";
    f.displayicon = function (f, l, h, m) {
        function w(a, b) {
            return "#" + q + (b ? ":hover" : "") + " " + (a ? a : "")
        }

        function n(a, b, c, e) {
            var g = d.createElement("div");
            g.className = a;
            b && b.appendChild(g);
            z(a, "." + a, c, e);
            return g
        }

        function z(b, c, d, e) {
            var f = j(b);
            "replayIcon" == b && !f.src && (f = j("playIcon"));
            f.src ? (d = g.extend({}, d), 0 < b.indexOf("Icon") && (F = f.width), d["background-image"] = "url(" + f.src + ")", d["background-size"] = f.width + "px " + f.height + "px", d.width =
                f.width, a(w(c), d), e = g.extend({}, e), f.overSrc && (e["background-image"] = "url(" + f.overSrc + ")"), g.isMobile() || a("#" + A.id + " .jwdisplay:hover " + (c ? c : w()), e), a(w(), {
                    display: "table"
                }, !0)) : a(w(), {
                    display: "none"
                }, !0);
            C = f
        }

        function j(a) {
            var b = I.getSkinElement("display", a);
            a = I.getSkinElement("display", a + "Over");
            return b ? (b.overSrc = a && a.src ? a.src : "", b) : {
                src: "",
                overSrc: "",
                width: 0,
                height: 0
            }
        }

        function r() {
            var d = E || 0 == F,
                g = "px " + e;
            a(w(".jwtext"), {
                display: t.innerHTML && d ? c : b
            });
            L = 10;
            setTimeout(function () {
                p(g)
            }, 0);
            d && (D =
                setInterval(function () {
                    p(g)
                }, 100))
        }

        function p(b) {
            if (0 >= L) clearInterval(D);
            else {
                L--;
                var c = Math.max(C.width, g.bounds(s).width - u.width - y.width);
                (g.isFF() || g.isIE()) && c++;
                g.isChrome() && 1 == s.parentNode.clientWidth % 2 && c++;
                a(w(), {
                    "background-size": [y.width + b, c + b, u.width + b].join()
                }, !0)
            }
        }

        function B() {
            v = (v + J) % 360;
            g.rotate(x, v)
        }
        var A = l,
            I = A.skin,
            q = f,
            s, y, u, E, t, x, C, F = 0,
            D, L;
        this.element = function () {
            return s
        };
        this.setText = function (a) {
            var b = t.style;
            t.innerHTML = a ? a.replace(":", ":\x3cbr\x3e") : "";
            b.height = "0";
            b.display =
                "block";
            if (a)
                for (; 2 < Math.floor(t.scrollHeight / d.defaultView.getComputedStyle(t, null).lineHeight.replace("px", "")); ) t.innerHTML = t.innerHTML.replace(/(.*) .*$/, "$1...");
            b.height = "";
            b.display = "";
            r()
        };
        this.setIcon = function (a) {
            var b = n("jwicon");
            b.id = s.id + "_" + a;
            z(a + "Icon", "#" + b.id);
            s.contains(x) ? s.replaceChild(b, x) : s.appendChild(b);
            x = b
        };
        var Q, J = 0,
            v;
        this.setRotation = function (a, b) {
            clearInterval(Q);
            v = 0;
            J = a;
            0 == a ? B() : Q = setInterval(B, b)
        };
        l = this.hide = function () {
            s.style.opacity = 0
        };
        this.show = function () {
            s.style.opacity =
                1
        };
        s = n("jwdisplayIcon");
        s.id = q;
        f = j("background");
        y = j("capLeft");
        u = j("capRight");
        E = 0 < y.width * u.width;
        var R = {
            "background-image": "url(" + y.src + "), url(" + f.src + "), url(" + u.src + ")",
            "background-position": "left,center,right",
            "background-repeat": "no-repeat",
            padding: "0 " + u.width + "px 0 " + y.width + "px",
            height: f.height,
            "margin-top": f.height / -2
        };
        a(w(), R);
        f.overSrc && (R["background-image"] = "url(" + y.overSrc + "), url(" + f.overSrc + "), url(" + u.overSrc + ")");
        g.isMobile() || a("#" + A.id + " .jwdisplay:hover " + w(), R);
        t = n("jwtext",
            s, h, m);
        x = n("jwicon", s);
        l();
        r()
    };
    a(".jwdisplayIcon", {
        display: "table",
        cursor: "pointer",
        position: "relative",
        "margin-left": "auto",
        "margin-right": "auto",
        top: "50%"
    }, !0);
    a(".jwdisplayIcon div", {
        position: "relative",
        display: "table-cell",
        "vertical-align": "middle",
        "background-repeat": "no-repeat",
        "background-position": "center"
    });
    a(".jwdisplayIcon div", {
        "vertical-align": "middle"
    }, !0);
    a(".jwdisplayIcon .jwtext", {
        color: "#fff",
        padding: "0 1px",
        "max-width": "300px",
        "overflow-y": "hidden",
        "text-align": "center",
        "-webkit-user-select": b,
        "-moz-user-select": b,
        "-ms-user-select": b,
        "user-select": b
    })
})(jwplayer.html5);
(function (f) {
    var g = jwplayer.utils,
        a = g.css,
        c = g.bounds,
        d = ".jwdockbuttons",
        b = document,
        e = "none",
        k = "block";
    f.dock = function (l, h) {
        function m(a) {
            return !a || !a.src ? {} : {
                background: "url(" + a.src + ") center",
                "background-size": a.width + "px " + a.height + "px"
            }
        }

        function w(b, c) {
            var d = j(b);
            a(n("." + b), g.extend(m(d), {
                width: d.width
            }));
            return z("div", b, c)
        }

        function n(a) {
            return "#" + B + " " + (a ? a : "")
        }

        function z(a, c, d) {
            a = b.createElement(a);
            c && (a.className = c);
            d && d.appendChild(a);
            return a
        }

        function j(a) {
            return (a = A.getSkinElement("dock",
                a)) ? a : {
                    width: 0,
                    height: 0,
                    src: ""
                }
        }

        function r() {
            a(d + " .capLeft, " + d + " .capRight", {
                display: I ? k : e
            })
        }
        var p = g.extend({}, {
            iconalpha: 0.75,
            iconalphaactive: 0.5,
            iconalphaover: 1,
            margin: 8
        }, h),
            B = l.id + "_dock",
            A = l.skin,
            I = 0,
            q = {}, s = {}, y, u, E, t = this;
        t.redraw = function () {
            c(y)
        };
        t.element = function () {
            return y
        };
        t.offset = function (b) {
            a(n(), {
                "margin-left": b
            })
        };
        t.hide = function () {
            t.visible && (t.visible = !1, y.style.opacity = 0, clearTimeout(E), E = setTimeout(function () {
                y.style.display = e
            }, 250))
        };
        t.showTemp = function () {
            this.visible || (y.style.opacity =
                0, y.style.display = k)
        };
        t.hideTemp = function () {
            this.visible || (y.style.display = e)
        };
        t.show = function () {
            !t.visible && I && (t.visible = !0, y.style.display = k, clearTimeout(E), E = setTimeout(function () {
                y.style.opacity = 1
            }, 0))
        };
        t.addButton = function (b, d, e, j) {
            if (!q[j]) {
                var h = z("div", "divider", u),
                    k = z("button", null, u),
                    m = z("div", null, k);
                m.id = B + "_" + j;
                m.innerHTML = "\x26nbsp;";
                a("#" + m.id, {
                    "background-image": b
                });
                "string" == typeof e && (e = new Function(e));
                g.isMobile() ? (new g.touch(k)).addEventListener(g.touchEvents.TAP, function (a) {
                    e(a)
                }) :
                    k.addEventListener("click", function (a) {
                        e(a);
                        a.preventDefault()
                    });
                q[j] = {
                    element: k,
                    label: d,
                    divider: h,
                    icon: m
                };
                if (d) {
                    var n = new f.overlay(m.id + "_tooltip", A, !0);
                    b = z("div");
                    b.id = m.id + "_label";
                    b.innerHTML = d;
                    a("#" + b.id, {
                        padding: 3
                    });
                    n.setContents(b);
                    if (!g.isMobile()) {
                        var p;
                        k.addEventListener("mouseover", function () {
                            clearTimeout(p);
                            var b = s[j],
                                d, e;
                            d = c(q[j].icon);
                            b.offsetX(0);
                            e = c(y);
                            a("#" + b.element().id, {
                                left: d.left - e.left + d.width / 2
                            });
                            d = c(b.element());
                            e.left > d.left && b.offsetX(e.left - d.left + 8);
                            n.show();
                            g.foreach(s,
                                function (a, b) {
                                    a != j && b.hide()
                                })
                        }, !1);
                        k.addEventListener("mouseout", function () {
                            p = setTimeout(n.hide, 100)
                        }, !1);
                        y.appendChild(n.element());
                        s[j] = n
                    }
                }
                I++;
                r()
            }
        };
        t.removeButton = function (a) {
            if (q[a]) {
                u.removeChild(q[a].element);
                u.removeChild(q[a].divider);
                var b = document.getElementById("" + B + "_" + a + "_tooltip");
                b && y.removeChild(b);
                delete q[a];
                I--;
                r()
            }
        };
        t.numButtons = function () {
            return I
        };
        t.visible = !1;
        y = z("div", "jwdock");
        u = z("div", "jwdockbuttons");
        y.appendChild(u);
        y.id = B;
        var x = j("button"),
            C = j("buttonOver"),
            F = j("buttonActive");
        x && (a(n(), {
            height: x.height,
            padding: p.margin
        }), a(d, {
            height: x.height
        }), a(n("button"), g.extend(m(x), {
            width: x.width,
            cursor: "pointer",
            border: e
        })), a(n("button:hover"), m(C)), a(n("button:active"), m(F)), a(n("button\x3ediv"), {
            opacity: p.iconalpha
        }), a(n("button:hover\x3ediv"), {
            opacity: p.iconalphaover
        }), a(n("button:active\x3ediv"), {
            opacity: p.iconalphaactive
        }), a(n(".jwoverlay"), {
            top: p.margin + x.height
        }), w("capLeft", u), w("capRight", u), w("divider"));
        setTimeout(function () {
            c(y)
        })
    };
    a(".jwdock", {
        opacity: 0,
        display: e
    });
    a(".jwdock \x3e *", {
        height: "100%",
        "float": "left"
    });
    a(".jwdock \x3e .jwoverlay", {
        height: "auto",
        "float": e,
        "z-index": 99
    });
    a(d + " button", {
        position: "relative"
    });
    a(d + " \x3e *", {
        height: "100%",
        "float": "left"
    });
    a(d + " .divider", {
        display: e
    });
    a(d + " button ~ .divider", {
        display: k
    });
    a(d + " .capLeft, " + d + " .capRight", {
        display: e
    });
    a(d + " .capRight", {
        "float": "right"
    });
    a(d + " button \x3e div", {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        margin: 5,
        position: "absolute",
        "background-position": "center",
        "background-repeat": "no-repeat"
    });
    g.transitionStyle(".jwdock",
        "background .25s, opacity .25s");
    g.transitionStyle(".jwdock .jwoverlay", "opacity .25s");
    g.transitionStyle(d + " button div", "opacity .25s")
})(jwplayer.html5);
(function (f) {
    var g = jwplayer,
        a = g.utils,
        c = g.events,
        d = c.state,
        b = g.playlist;
    f.instream = function (e, g, l, h) {
        function m(b) {
            b.type == c.JWPLAYER_MEDIA_ERROR && (b = a.extend({}, b), b.type = c.JWPLAYER_ERROR);
            p(b.type, b);
            R = !0;
            v.jwInstreamDestroy(!1)
        }

        function w() {
            v.jwInstreamDestroy(!0)
        }

        function n(a) {
            D && p(a.type, a)
        }

        function z() {
            D && x.play()
        }

        function j() {
            D && setTimeout(function () {
                v.jwInstreamDestroy(!0)
            }, 10)
        }

        function r(a) {
            a.width && a.height && s.resizeMedia()
        }

        function p(a, b, c) {
            if (D || c) b = b || {}, A.tag && !b.tag && (b.tag = A.tag),
            L.sendEvent(a, b)
        }

        function B() {
            C && C.redraw();
            F && F.redraw()
        }
        var A = {
            controlbarseekable: "never",
            controlbarpausable: !0,
            controlbarstoppable: !0,
            playlistclickable: !0,
            skipoffset: -1,
            tag: null
        }, I, q, s = l,
            y, u, E, t, x, C, F, D = !1,
            L, Q, J, v = this,
            R = !1,
            N = !0;
        v.load = function (l, L) {
            a.isAndroid(2.3) ? m({
                type: c.JWPLAYER_ERROR,
                message: "Error loading instream: Cannot play instream on Android 2.3"
            }) : (R = !1, D = !0, q = a.extend(A, L), I = new b.item(l), Q = document.createElement("div"), Q.id = v.id + "_instream_container", y = h.detachMedia(), x = new f.video(y),
                x.addGlobalListener(n), x.addEventListener(c.JWPLAYER_MEDIA_META, r), x.addEventListener(c.JWPLAYER_MEDIA_COMPLETE, j), x.addEventListener(c.JWPLAYER_MEDIA_BUFFER_FULL, z), x.addEventListener(c.JWPLAYER_MEDIA_ERROR, m), x.attachMedia(), x.mute(g.mute), x.volume(g.volume), J = new f.model({}, x), J.setVolume(g.volume), J.setMute(g.mute), J.addEventListener(c.JWPLAYER_ERROR, m), s.addEventListener(c.JWPLAYER_AD_SKIPPED, w), t = g.playlist[g.item], E = g.getVideo().checkComplete() ? d.IDLE : e.jwGetState(), h.checkBeforePlay() && (E =
                    d.PLAYING, N = !1), u = y.currentTime, J.setPlaylist([l]), R || ((E == d.BUFFERING || E == d.PLAYING) && y.pause(), F = new f.display(v), F.setAlternateClickHandler(function (a) {
                        e.jwGetControls() ? (J.state == d.PAUSED ? v.jwInstreamPlay() : v.jwInstreamPause(), a.hasControls = !0) : a.hasControls = !1;
                        p(c.JWPLAYER_INSTREAM_CLICK, a)
                    }), a.isIE() && y.parentElement.addEventListener("click", F.clickHandler), Q.appendChild(F.element()), C = new f.controlbar(v), Q.appendChild(C.element()), C.show(), e.jwGetControls() ? (C.show(), F.show()) : (C.hide(), F.hide()),
                    s.setupInstream(Q, C, F, A.skipoffset), B(), x.load(J.playlist[0])))
        };
        v.jwInstreamDestroy = function (a) {
            if (D) {
                D = !1;
                E != d.IDLE ? x.load(t, !1) : x.stop();
                L.resetEventListeners();
                R || F.revertAlternateClickHandler();
                x.detachMedia();
                s.destroyInstream();
                if (C) try {
                    C.element().parentNode.removeChild(C.getDisplayElement())
                } catch (b) { }
                p(c.JWPLAYER_INSTREAM_DESTROYED, {
                    reason: a ? "complete" : "destroyed"
                }, !0);
                h.attachMedia();
                if (E == d.BUFFERING || E == d.PLAYING) y.play(), g.playlist[g.item] == t && N && g.getVideo().seek(u)
            }
        };
        v.jwInstreamAddEventListener =
            function (a, b) {
                L.addEventListener(a, b)
            };
        v.jwInstreamRemoveEventListener = function (a, b) {
            L.removeEventListener(a, b)
        };
        v.jwInstreamPlay = function () {
            D && (x.play(!0), g.state = jwplayer.events.state.PLAYING, F.show())
        };
        v.jwInstreamPause = function () {
            D && (x.pause(!0), g.state = jwplayer.events.state.PAUSED, e.jwGetControls() && F.show())
        };
        v.jwInstreamSeek = function (a) {
            D && x.seek(a)
        };
        v.jwInstreamSetText = function (a) {
            C.setText(a)
        };
        v.jwInstreamUpdateSkipTime = function (a, b) {
            s.updateSkipTime(a, b)
        };
        v.jwInstreamState = function () {
            if (D) return g.state
        };
        v.jwPlay = function () {
            "true" == q.controlbarpausable.toString().toLowerCase() && v.jwInstreamPlay()
        };
        v.jwPause = function () {
            "true" == q.controlbarpausable.toString().toLowerCase() && v.jwInstreamPause()
        };
        v.jwStop = function () {
            "true" == q.controlbarstoppable.toString().toLowerCase() && (v.jwInstreamDestroy(), e.jwStop())
        };
        v.jwSeek = function (a) {
            switch (q.controlbarseekable.toLowerCase()) {
                case "always":
                    v.jwInstreamSeek(a);
                    break;
                case "backwards":
                    J.position > a && v.jwInstreamSeek(a)
            }
        };
        v.jwSeekDrag = function (a) {
            J.seekDrag(a)
        };
        v.jwGetPosition = function () { };
        v.jwGetDuration = function () { };
        v.jwGetWidth = e.jwGetWidth;
        v.jwGetHeight = e.jwGetHeight;
        v.jwGetFullscreen = e.jwGetFullscreen;
        v.jwSetFullscreen = e.jwSetFullscreen;
        v.jwGetVolume = function () {
            return g.volume
        };
        v.jwSetVolume = function (a) {
            J.setVolume(a);
            e.jwSetVolume(a)
        };
        v.jwGetMute = function () {
            return g.mute
        };
        v.jwSetMute = function (a) {
            J.setMute(a);
            e.jwSetMute(a)
        };
        v.jwGetState = function () {
            return J.state
        };
        v.jwGetPlaylist = function () {
            return [I]
        };
        v.jwGetPlaylistIndex = function () {
            return 0
        };
        v.jwGetStretching =
            function () {
                return g.config.stretching
            };
        v.jwAddEventListener = function (a, b) {
            L.addEventListener(a, b)
        };
        v.jwRemoveEventListener = function (a, b) {
            L.removeEventListener(a, b)
        };
        v.jwSetCurrentQuality = function () { };
        v.jwGetQualityLevels = function () {
            return []
        };
        v.skin = e.skin;
        v.id = e.id + "_instream";
        L = new c.eventdispatcher;
        e.jwAddEventListener(c.JWPLAYER_RESIZE, B);
        e.jwAddEventListener(c.JWPLAYER_FULLSCREEN, function (b) {
            n(b);
            B();
            a.isIPad() && (!b.fullscreen && J.state == jwplayer.events.state.PAUSED) && F.show(!0);
            a.isIPad() && (!b.fullscreen &&
                J.state == jwplayer.events.state.PLAYING) && F.hide()
        });
        return v
    }
})(jwplayer.html5);
(function (f) {
    var g = f.utils,
        a = g.css,
        c = f.events.state,
        d = f.html5.logo = function (b, e) {
            function k(a) {
                g.exists(a) && a.stopPropagation && a.stopPropagation();
                if (!z || !m.link) l.jwGetState() == c.IDLE || l.jwGetState() == c.PAUSED ? l.jwPlay() : l.jwPause();
                z && m.link && (l.jwPause(), l.jwSetFullscreen(!1), window.open(m.link, m.linktarget))
            }
            var l = b,
                h = l.id + "_logo",
                m, w, n = d.defaults,
                z = !1;
            this.resize = function () { };
            this.element = function () {
                return w
            };
            this.offset = function (b) {
                a("#" + h + " ", {
                    "margin-bottom": b
                })
            };
            this.position = function () {
                return m.position
            };
            this.margin = function () {
                return parseInt(m.margin)
            };
            this.hide = function (a) {
                if (m.hide || a) z = !1, w.style.visibility = "hidden", w.style.opacity = 0
            };
            this.show = function () {
                z = !0;
                w.style.visibility = "visible";
                w.style.opacity = 1
            };
            var j = "o";
            l.edition && (j = l.edition(), j = "pro" == j ? "p" : "premium" == j ? "r" : "ads" == j ? "a" : "free" == j ? "f" : "o");
            if ("o" == j || "f" == j) n.link = "http://www.longtailvideo.com/jwpabout/?a\x3dl\x26v\x3d" + f.version + "\x26m\x3dh\x26e\x3d" + j;
            m = g.extend({}, n, e);
            m.hide = "true" == m.hide.toString();
            w = document.createElement("img");
            w.className = "jwlogo";
            w.id = h;
            if (m.file) {
                var n = /(\w+)-(\w+)/.exec(m.position),
                    j = {}, r = m.margin;
                3 == n.length ? (j[n[1]] = r, j[n[2]] = r) : j.top = j.right = r;
                a("#" + h + " ", j);
                w.src = (m.prefix ? m.prefix : "") + m.file;
                g.isMobile() ? (new g.touch(w)).addEventListener(g.touchEvents.TAP, k) : w.onclick = k
            } else w.style.display = "none";
            return this
        };
    d.defaults = {
        prefix: g.repo(),
        file: "logo.png",
        linktarget: "_top",
        margin: 8,
        hide: !1,
        position: "top-right"
    };
    a(".jwlogo", {
        cursor: "pointer",
        position: "absolute",
        "z-index": 100,
        opacity: 0
    });
    g.transitionStyle(".jwlogo",
        "visibility .25s, opacity .25s")
})(jwplayer);
(function (f) {
    var g = f.html5,
        a = f.utils,
        c = a.css,
        d = void 0;
    g.menu = function (b, e, f, l) {
        function h(a) {
            return !a || !a.src ? {} : {
                background: "url(" + a.src + ") no-repeat left",
                "background-size": a.width + "px " + a.height + "px"
            }
        }

        function m(a, b) {
            return function () {
                B(a);
                z && z(b)
            }
        }

        function w(a, b) {
            var c = document.createElement("div");
            a && (c.className = a);
            b && b.appendChild(c);
            return c
        }

        function n(a) {
            return (a = f.getSkinElement("tooltip", a)) ? a : {
                width: 0,
                height: 0,
                src: d
            }
        }
        var z = l,
            j = new g.overlay(e + "_overlay", f);
        l = a.extend({
            fontcase: d,
            fontcolor: "#cccccc",
            fontsize: 11,
            fontweight: d,
            activecolor: "#ffffff",
            overcolor: "#ffffff"
        }, f.getComponentSettings("tooltip"));
        var r, p = [];
        this.element = function () {
            return j.element()
        };
        this.addOption = function (b, c) {
            var d = w("jwoption", r);
            d.id = e + "_option_" + c;
            d.innerHTML = b;
            a.isMobile() ? (new a.touch(d)).addEventListener(a.touchEvents.TAP, m(p.length, c)) : d.addEventListener("click", m(p.length, c));
            p.push(d)
        };
        this.clearOptions = function () {
            for (; 0 < p.length; ) r.removeChild(p.pop())
        };
        var B = this.setActive = function (a) {
            for (var b = 0; b < p.length; b++) {
                var c =
                    p[b];
                c.className = c.className.replace(" active", "");
                b == a && (c.className += " active")
            }
        };
        this.show = j.show;
        this.hide = j.hide;
        this.offsetX = j.offsetX;
        r = w("jwmenu");
        r.id = e;
        var A = n("menuTop" + b);
        b = n("menuOption");
        var I = n("menuOptionOver"),
            q = n("menuOptionActive");
        if (A && A.image) {
            var s = new Image;
            s.src = A.src;
            s.width = A.width;
            s.height = A.height;
            r.appendChild(s)
        }
        b && (A = "#" + e + " .jwoption", c(A, a.extend(h(b), {
            height: b.height,
            color: l.fontcolor,
            "padding-left": b.width,
            font: l.fontweight + " " + l.fontsize + "px Arial,Helvetica,sans-serif",
            "line-height": b.height,
            "text-transform": "upper" == l.fontcase ? "uppercase" : d
        })), c(A + ":hover", a.extend(h(I), {
            color: l.overcolor
        })), c(A + ".active", a.extend(h(q), {
            color: l.activecolor
        })));
        j.setContents(r)
    };
    c("." + "jwmenu jwoption".replace(/ /g, " ."), {
        cursor: "pointer",
        position: "relative"
    })
})(jwplayer);
(function (f) {
    var g = jwplayer.utils,
        a = jwplayer.events;
    f.model = function (c, d) {
        function b(a) {
            var b = w[a.type] ? w[a.type].split(",") : [],
                c, d;
            if (0 < b.length) {
                for (c = 0; c < b.length; c++) {
                    var g = b[c].split("-\x3e"),
                        f = g[0],
                        g = g[1] ? g[1] : f;
                    e[g] != a[f] && (e[g] = a[f], d = !0)
                }
                d && e.sendEvent(a.type, a)
            } else e.sendEvent(a.type, a)
        }
        var e = this,
            k, l = g.getCookies(),
            h = {
                controlbar: {},
                display: {}
            }, m = {
                autostart: !1,
                controls: !0,
                debug: void 0,
                fullscreen: !1,
                height: 320,
                mobilecontrols: !1,
                mute: !1,
                playlist: [],
                playlistposition: "none",
                playlistsize: 180,
                playlistlayout: "extended",
                repeat: !1,
                skin: void 0,
                stretching: g.stretching.UNIFORM,
                width: 480,
                volume: 90
            }, w = {};
        w[a.JWPLAYER_MEDIA_MUTE] = "mute";
        w[a.JWPLAYER_MEDIA_VOLUME] = "volume";
        w[a.JWPLAYER_PLAYER_STATE] = "newstate-\x3estate";
        w[a.JWPLAYER_MEDIA_BUFFER] = "bufferPercent-\x3ebuffer";
        w[a.JWPLAYER_MEDIA_TIME] = "position,duration";
        e.setVideo = function (a) {
            k && k.removeGlobalListener(b);
            k = a;
            k.getTag();
            k.volume(e.volume);
            k.mute(e.mute);
            k.addGlobalListener(b)
        };
        e.getVideo = function () {
            return k
        };
        e.seekDrag = function (a) {
            k.seekDrag(a)
        };
        e.setFullscreen = function (b) {
            b != e.fullscreen && (e.fullscreen = b, e.sendEvent(a.JWPLAYER_FULLSCREEN, {
                fullscreen: b
            }))
        };
        e.setPlaylist = function (b) {
            e.playlist = g.filterPlaylist(b);
            0 == e.playlist.length ? e.sendEvent(a.JWPLAYER_ERROR, {
                message: "Error loading playlist: No playable sources found"
            }) : (e.sendEvent(a.JWPLAYER_PLAYLIST_LOADED, {
                playlist: jwplayer(e.id).getPlaylist()
            }), e.item = -1, e.setItem(0))
        };
        e.setItem = function (b) {
            var c = !1;
            b == e.playlist.length || -1 > b ? (b = 0, c = !0) : b = -1 == b || b > e.playlist.length ? e.playlist.length -
                1 : b;
            if (c || b != e.item) e.item = b, e.sendEvent(a.JWPLAYER_PLAYLIST_ITEM, {
                index: e.item
            })
        };
        e.setVolume = function (c) {
            e.mute && 0 < c && e.setMute(!1);
            c = Math.round(c);
            e.mute || g.saveCookie("volume", c);
            b({
                type: a.JWPLAYER_MEDIA_VOLUME,
                volume: c
            });
            k.volume(c)
        };
        e.setMute = function (c) {
            g.exists(c) || (c = !e.mute);
            g.saveCookie("mute", c);
            b({
                type: a.JWPLAYER_MEDIA_MUTE,
                mute: c
            });
            k.mute(c)
        };
        e.componentConfig = function (a) {
            return h[a]
        };
        g.extend(e, new a.eventdispatcher);
        var n = e,
            z = g.extend({}, m, l, c);
        g.foreach(z, function (a, b) {
            z[a] = g.serialize(b)
        });
        n.config = z;
        g.extend(e, {
            id: c.id,
            state: a.state.IDLE,
            duration: -1,
            position: 0,
            buffer: 0
        }, e.config);
        e.playlist = [];
        e.setItem(0);
        e.setVideo(d ? d : new f.video)
    }
})(jwplayer.html5);
(function (f) {
    var g = f.utils,
        a = g.css,
        c = g.transitionStyle,
        d = "top",
        b = "bottom",
        e = "right",
        k = "left",
        l = void 0,
        h = document,
        m = {
            fontcase: l,
            fontcolor: "#ffffff",
            fontsize: 12,
            fontweight: l,
            activecolor: "#ffffff",
            overcolor: "#ffffff"
        };
    f.html5.overlay = function (c, f, z) {
        function j(a) {
            return "#" + s + (a ? " ." + a : "")
        }

        function r(a, b) {
            var c = h.createElement("div");
            a && (c.className = a);
            b && b.appendChild(c);
            return c
        }

        function p(b, c) {
            var d;
            d = (d = q.getSkinElement("tooltip", b)) ? d : {
                width: 0,
                height: 0,
                src: "",
                image: l,
                ready: !1
            };
            var e = r(c, y);
            a(j(c.replace(" ",
                ".")), B(d));
            return [e, d]
        }

        function B(a) {
            return {
                background: "url(" + a.src + ") center",
                "background-size": a.width + "px " + a.height + "px"
            }
        }

        function A(c, f) {
            f || (f = "");
            var h = p("cap" + c + f, "jwborder jw" + c + (f ? f : "")),
                m = h[0],
                h = h[1],
                n = g.extend(B(h), {
                    width: c == k || f == k || c == e || f == e ? h.width : l,
                    height: c == d || f == d || c == b || f == b ? h.height : l
                });
            n[c] = c == b && !C || c == d && C ? x : 0;
            f && (n[f] = 0);
            a(j(m.className.replace(/ /g, ".")), n);
            m = {};
            n = {};
            h = {
                left: h.width,
                right: h.width,
                top: (C ? x : 0) + h.height,
                bottom: (C ? 0 : x) + h.height
            };
            f && (m[f] = h[f], m[c] = 0, n[c] = h[c],
                n[f] = 0, a(j("jw" + c), m), a(j("jw" + f), n), F[c] = h[c], F[f] = h[f])
        }

        function I() {
            0 != y.clientWidth && (a(j(), {
                "margin-left": Math.round(E - y.clientWidth / 2)
            }), a(j("jwarrow"), {
                "margin-left": Math.round(t.width / -2 - E)
            }))
        }
        var q = f,
            s = c,
            y, u, E = 0,
            t, x, C = z;
        c = g.extend({}, m, q.getComponentSettings("tooltip"));
        var F = {}, D = this;
        D.element = function () {
            return y
        };
        var L;
        D.setContents = function (a) {
            g.empty(u);
            u.appendChild(a);
            clearTimeout(L);
            L = setTimeout(I, 0)
        };
        D.offsetX = function (a) {
            E = a;
            clearTimeout(L);
            I()
        };
        D.borderWidth = function () {
            return F.left
        };
        D.show = function () {
            D.showing = !0;
            y.style.opacity = 1;
            y.style.visibility = "visible"
        };
        D.hide = function () {
            D.showing = !1;
            y.style.opacity = 0;
            y.style.visibility = "hidden"
        };
        y = r(".jwoverlay".replace(".", ""));
        y.id = s;
        t = p("arrow", "jwarrow")[1];
        x = t.height;
        a(j("jwarrow"), {
            position: "absolute",
            bottom: C ? l : 0,
            top: C ? 0 : l,
            width: t.width,
            height: x,
            left: "50%"
        });
        A(d, k);
        A(b, k);
        A(d, e);
        A(b, e);
        A(k);
        A(e);
        A(d);
        A(b);
        p("background", "jwback");
        a(j("jwback"), {
            left: F.left,
            right: F.right,
            top: F.top,
            bottom: F.bottom
        });
        u = r("jwcontents", y);
        a(j("jwcontents") +
            " *", {
                color: c.fontcolor,
                font: c.fontweight + " " + c.fontsize + "px Arial,Helvetica,sans-serif",
                "text-transform": "upper" == c.fontcase ? "uppercase" : l
            });
        C && g.transform(j("jwarrow"), "rotate(180deg)");
        a(j(), {
            padding: F.top + 1 + "px " + F.right + "px " + (F.bottom + 1) + "px " + F.left + "px"
        });
        D.showing = !1
    };
    a(".jwoverlay", {
        position: "absolute",
        visibility: "hidden",
        opacity: 0
    });
    a(".jwoverlay .jwcontents", {
        position: "relative",
        "z-index": 1
    });
    a(".jwoverlay .jwborder", {
        position: "absolute",
        "background-size": "100% 100%"
    }, !0);
    a(".jwoverlay .jwback", {
        position: "absolute",
        "background-size": "100% 100%"
    });
    c(".jwoverlay", "opacity .25s, visibility .25s, left .01s linear")
})(jwplayer);
(function (f) {
    var g = jwplayer.utils;
    f.player = function (a) {
        function c(a) {
            var b = {
                description: a.description,
                file: a.file,
                image: a.image,
                mediaid: a.mediaid,
                title: a.title
            };
            g.foreach(a, function (a, c) {
                b[a] = c
            });
            b.sources = [];
            b.tracks = [];
            0 < a.sources.length && g.foreach(a.sources, function (a, c) {
                b.sources.push({
                    file: c.file,
                    type: c.type ? c.type : void 0,
                    label: c.label,
                    "default": c["default"] ? !0 : !1
                })
            });
            0 < a.tracks.length && g.foreach(a.tracks, function (a, c) {
                b.tracks.push({
                    file: c.file,
                    kind: c.kind ? c.kind : void 0,
                    label: c.label,
                    "default": c["default"] ? !0 : !1
                })
            });
            !a.file && 0 < a.sources.length && (b.file = a.sources[0].file);
            return b
        }

        function d(a) {
            return function () {
                return e[a]
            }
        }
        var b = this,
            e, k, l, h;
        e = new f.model(a);
        b.id = e.id;
        k = new f.view(b, e);
        l = new f.controller(e, k);
        b._model = e;
        jwplayer.utils.css.block();
        b.jwPlay = l.play;
        b.jwPause = l.pause;
        b.jwStop = l.stop;
        b.jwSeek = l.seek;
        b.jwSetVolume = l.setVolume;
        b.jwSetMute = l.setMute;
        b.jwLoad = l.load;
        b.jwPlaylistNext = l.next;
        b.jwPlaylistPrev = l.prev;
        b.jwPlaylistItem = l.item;
        b.jwSetFullscreen = l.setFullscreen;
        b.jwResize = k.resize;
        b.jwSeekDrag = e.seekDrag;
        b.jwGetQualityLevels = l.getQualityLevels;
        b.jwGetCurrentQuality = l.getCurrentQuality;
        b.jwSetCurrentQuality = l.setCurrentQuality;
        b.jwGetCaptionsList = l.getCaptionsList;
        b.jwGetCurrentCaptions = l.getCurrentCaptions;
        b.jwSetCurrentCaptions = l.setCurrentCaptions;
        b.jwSetControls = k.setControls;
        b.jwGetSafeRegion = k.getSafeRegion;
        b.jwForceState = k.forceState;
        b.jwReleaseState = k.releaseState;
        b.jwGetPlaylistIndex = d("item");
        b.jwGetPosition = d("position");
        b.jwGetDuration = d("duration");
        b.jwGetBuffer =
            d("buffer");
        b.jwGetWidth = d("width");
        b.jwGetHeight = d("height");
        b.jwGetFullscreen = d("fullscreen");
        b.jwGetVolume = d("volume");
        b.jwGetMute = d("mute");
        b.jwGetState = d("state");
        b.jwGetStretching = d("stretching");
        b.jwGetPlaylist = function () {
            for (var a = e.playlist, b = [], d = 0; d < a.length; d++) b.push(c(a[d]));
            return b
        };
        b.jwGetControls = d("controls");
        b.jwDetachMedia = l.detachMedia;
        b.jwAttachMedia = l.attachMedia;
        b.jwPlayAd = function (a) {
            var c = jwplayer(b.id).plugins;
            c.vast && c.vast.jwPlayAd(a)
        };
        b.jwPauseAd = function () {
            var a = jwplayer(b.id).plugins;
            a.googima && a.googima.jwPauseAd()
        };
        b.jwLoadInstream = function (a, c) {
            h || (h = new f.instream(b, e, k, l));
            h.load(a, c)
        };
        b.jwInstreamPlay = function () {
            h && h.jwInstreamPlay()
        };
        b.jwInstreamPause = function () {
            h && h.jwInstreamPause()
        };
        b.jwInstreamState = function () {
            return h ? h.jwInstreamState() : ""
        };
        b.jwInstreamDestroy = function () {
            h && h.jwInstreamDestroy();
            h = void 0
        };
        b.jwInstreamAddEventListener = function (a, b) {
            h && h.jwInstreamAddEventListener(a, b)
        };
        b.jwInstreamRemoveEventListener = function (a, b) {
            h && h.jwInstreamRemoveEventListener(a,
                b)
        };
        b.jwPlayerDestroy = function () {
            k && k.destroy()
        };
        b.jwInstreamSetText = function (a) {
            h && h.jwInstreamSetText(a)
        };
        b.jwInstreamUpdateSkipTime = function (a, b) {
            h && h.jwInstreamUpdateSkipTime(a, b)
        };
        b.jwIsBeforePlay = function () {
            return l.checkBeforePlay()
        };
        b.jwIsBeforeComplete = function () {
            return e.getVideo().checkComplete()
        };
        b.jwAddEventListener = l.addEventListener;
        b.jwRemoveEventListener = l.removeEventListener;
        b.jwDockAddButton = k.addButton;
        b.jwDockRemoveButton = k.removeButton;
        a = new f.setup(e, k, l);
        a.addEventListener(jwplayer.events.JWPLAYER_READY,
            function (a) {
                l.playerReady(a);
                g.css.unblock()
            });
        a.addEventListener(jwplayer.events.JWPLAYER_ERROR, function (a) {
            console.log("There was a problem setting up the player: ", a);
            g.css.unblock()
        });
        a.start()
    }
})(jwplayer.html5);
(function (f) {
    var g = {
        size: 180,
        backgroundcolor: "#333333",
        fontcolor: "#999999",
        overcolor: "#CCCCCC",
        activecolor: "#CCCCCC",
        titlecolor: "#CCCCCC",
        titleovercolor: "#FFFFFF",
        titleactivecolor: "#FFFFFF",
        fontweight: "normal",
        titleweight: "normal",
        fontsize: 11,
        titlesize: 13
    }, a = jwplayer.events,
        c = jwplayer.utils,
        d = c.css,
        b = c.isMobile(),
        e = document;
    f.playlistcomponent = function (k, l) {
        function h(a) {
            return "#" + r.id + (a ? " ." + a : "")
        }

        function m(a, b) {
            var c = e.createElement(a);
            b && (c.className = b);
            return c
        }

        function w(a) {
            return function () {
                q =
                    a;
                n.jwPlaylistItem(a);
                n.jwPlay(!0)
            }
        }
        var n = k,
            z = n.skin,
            j = c.extend({}, g, n.skin.getComponentSettings("playlist"), l),
            r, p, B, A, I = -1,
            q, s, y = -1,
            u = 76,
            E = {
                background: void 0,
                divider: void 0,
                item: void 0,
                itemOver: void 0,
                itemImage: void 0,
                itemActive: void 0
            }, t, x = this;
        x.element = function () {
            return r
        };
        x.redraw = function () {
            s && s.redraw()
        };
        x.show = function () {
            c.show(r)
        };
        x.hide = function () {
            c.hide(r)
        };
        r = m("div", "jwplaylist");
        r.id = n.id + "_jwplayer_playlistcomponent";
        t = "basic" == n._model.playlistlayout;
        p = m("div", "jwlistcontainer");
        r.appendChild(p);
        c.foreach(E, function (a) {
            E[a] = z.getSkinElement("playlist", a)
        });
        t && (u = 32);
        E.divider && (u += E.divider.height);
        var C = 0,
            F = 0,
            D = 0;
        c.clearCss(h());
        d(h(), {
            "background-color": j.backgroundcolor
        });
        d(h("jwlist"), {
            "background-image": E.background ? " url(" + E.background.src + ")" : ""
        });
        d(h("jwlist *"), {
            color: j.fontcolor,
            font: j.fontweight + " " + j.fontsize + "px Arial, Helvetica, sans-serif"
        });
        E.itemImage ? (C = (u - E.itemImage.height) / 2 + "px ", F = E.itemImage.width, D = E.itemImage.height) : (F = 4 * u / 3, D = u);
        E.divider && d(h("jwplaylistdivider"), {
            "background-image": "url(" + E.divider.src + ")",
            "background-size": "100% " + E.divider.height + "px",
            width: "100%",
            height: E.divider.height
        });
        d(h("jwplaylistimg"), {
            height: D,
            width: F,
            margin: C ? C + "0 " + C + C : "0 5px 0 0"
        });
        d(h("jwlist li"), {
            "background-image": E.item ? "url(" + E.item.src + ")" : "",
            height: u,
            overflow: "hidden",
            "background-size": "100% " + u + "px",
            cursor: "pointer"
        });
        C = {
            overflow: "hidden"
        };
        "" !== j.activecolor && (C.color = j.activecolor);
        E.itemActive && (C["background-image"] = "url(" + E.itemActive.src + ")");
        d(h("jwlist li.active"),
            C);
        d(h("jwlist li.active .jwtitle"), {
            color: j.titleactivecolor
        });
        d(h("jwlist li.active .jwdescription"), {
            color: j.activecolor
        });
        C = {
            overflow: "hidden"
        };
        "" !== j.overcolor && (C.color = j.overcolor);
        E.itemOver && (C["background-image"] = "url(" + E.itemOver.src + ")");
        b || (d(h("jwlist li:hover"), C), d(h("jwlist li:hover .jwtitle"), {
            color: j.titleovercolor
        }), d(h("jwlist li:hover .jwdescription"), {
            color: j.overcolor
        }));
        d(h("jwtextwrapper"), {
            height: u,
            position: "relative"
        });
        d(h("jwtitle"), {
            overflow: "hidden",
            display: "inline-block",
            height: t ? u : 20,
            color: j.titlecolor,
            "font-size": j.titlesize,
            "font-weight": j.titleweight,
            "margin-top": t ? "0 10px" : 10,
            "margin-left": 10,
            "margin-right": 10,
            "line-height": t ? u : 20
        });
        d(h("jwdescription"), {
            display: "block",
            "font-size": j.fontsize,
            "line-height": 18,
            "margin-left": 10,
            "margin-right": 10,
            overflow: "hidden",
            height: 36,
            position: "relative"
        });
        n.jwAddEventListener(a.JWPLAYER_PLAYLIST_LOADED, function () {
            p.innerHTML = "";
            for (var a = n.jwGetPlaylist(), e = [], g = 0; g < a.length; g++) a[g]["ova.hidden"] || e.push(a[g]);
            if (B = e) {
                a =
                    m("ul", "jwlist");
                a.id = r.id + "_ul" + Math.round(1E7 * Math.random());
                A = a;
                for (a = 0; a < B.length; a++) {
                    var h = a,
                        e = B[h],
                        g = m("li", "jwitem"),
                        j = void 0;
                    g.id = A.id + "_item_" + h;
                    0 < h ? (j = m("div", "jwplaylistdivider"), g.appendChild(j)) : (h = E.divider ? E.divider.height : 0, g.style.height = u - h + "px", g.style["background-size"] = "100% " + (u - h) + "px");
                    h = m("div", "jwplaylistimg jwfill");
                    j = void 0;
                    e["playlist.image"] && E.itemImage ? j = e["playlist.image"] : e.image && E.itemImage ? j = e.image : E.itemImage && (j = E.itemImage.src);
                    j && !t && (d("#" + g.id + " .jwplaylistimg", {
                        "background-image": j
                    }), g.appendChild(h));
                    h = m("div", "jwtextwrapper");
                    j = m("span", "jwtitle");
                    j.innerHTML = e && e.title ? e.title : "";
                    h.appendChild(j);
                    e.description && !t && (j = m("span", "jwdescription"), j.innerHTML = e.description, h.appendChild(j));
                    g.appendChild(h);
                    e = g;
                    b ? (new c.touch(e)).addEventListener(c.touchEvents.TAP, w(a)) : e.onclick = w(a);
                    A.appendChild(e)
                }
                I = n.jwGetPlaylistIndex();
                p.appendChild(A);
                s = new f.playlistslider(r.id + "_slider", n.skin, r, A)
            }
        });
        n.jwAddEventListener(a.JWPLAYER_PLAYLIST_ITEM, function (a) {
            0 <=
                I && (e.getElementById(A.id + "_item_" + I).className = "jwitem", I = a.index);
            e.getElementById(A.id + "_item_" + a.index).className = "jwitem active";
            a = n.jwGetPlaylistIndex();
            a != q && (q = -1, s && s.visible() && s.thumbPosition(a / (n.jwGetPlaylist().length - 1)))
        });
        var L = setInterval(function () {
            var a = e.getElementById(r.id),
                b = c.bounds(a).height;
            a != r ? clearInterval(L) : b != y && (y = b, x.redraw())
        }, 200);
        return this
    };
    d(".jwplaylist", {
        position: "absolute",
        width: "100%",
        height: "100%"
    });
    c.dragStyle(".jwplaylist", "none");
    d(".jwplaylist .jwplaylistimg", {
        position: "relative",
        width: "100%",
        "float": "left",
        margin: "0 5px 0 0",
        background: "#000",
        overflow: "hidden"
    });
    d(".jwplaylist .jwlist", {
        position: "absolute",
        width: "100%",
        "list-style": "none",
        margin: 0,
        padding: 0,
        overflow: "hidden"
    });
    d(".jwplaylist .jwlistcontainer", {
        position: "absolute",
        overflow: "hidden",
        width: "100%",
        height: "100%"
    });
    d(".jwplaylist .jwlist li", {
        width: "100%"
    });
    d(".jwplaylist .jwtextwrapper", {
        overflow: "hidden"
    });
    d(".jwplaylist .jwplaylistdivider", {
        position: "absolute"
    });
    b && c.transitionStyle(".jwplaylist .jwlist",
        "top .35s")
})(jwplayer.html5);
(function (f) {
    function g() {
        var a = [],
            b;
        for (b = 0; b < arguments.length; b++) a.push(".jwplaylist ." + arguments[b]);
        return a.join(",")
    }
    var a = jwplayer.utils,
        c = a.touchEvents,
        d = a.css,
        b = document,
        e = window,
        k = void 0;
    f.playlistslider = function (g, f, m, w) {
        function n(a) {
            return "#" + u.id + (a ? " ." + a : "")
        }

        function z(a, c, e, g) {
            var f = b.createElement("div");
            a && (f.className = a, c && d(n(a), {
                "background-image": c.src ? c.src : k,
                "background-repeat": g ? "repeat-y" : "no-repeat",
                height: g ? k : c.height
            }));
            e && e.appendChild(f);
            return f
        }

        function j(a) {
            return (a =
                s.getSkinElement("playlist", a)) ? a : {
                    width: 0,
                    height: 0,
                    src: k
                }
        }

        function r(a) {
            if (L) return a = a ? a : e.event, Y(C - (a.detail ? -1 * a.detail : a.wheelDelta / 40) / 10), a.stopPropagation && a.stopPropagation(), a.preventDefault && a.preventDefault(), a.cancelBubble = !0, a.cancel = !0, a.returnValue = !1
        }

        function p(a) {
            0 == a.button && (x = !0);
            b.onselectstart = function () {
                return !1
            };
            e.addEventListener("mousemove", A, !1);
            e.addEventListener("mouseup", q, !1)
        }

        function B(a) {
            Y(C - 2 * a.deltaY / y.clientHeight)
        }

        function A(b) {
            if (x || "click" == b.type) {
                var c = a.bounds(E),
                    d = t.clientHeight / 2;
                Y((b.pageY - c.top - d) / (c.height - d - d))
            }
        }

        function I(a) {
            return function (b) {
                0 < b.button || (Y(C + 0.05 * a), F = setTimeout(function () {
                    D = setInterval(function () {
                        Y(C + 0.05 * a)
                    }, 50)
                }, 500))
            }
        }

        function q() {
            x = !1;
            e.removeEventListener("mousemove", A);
            e.removeEventListener("mouseup", q);
            b.onselectstart = k;
            clearTimeout(F);
            clearInterval(D)
        }
        var s = f,
            y = w,
            u, E, t, x, C = 0,
            F, D;
        f = a.isMobile();
        var L = !0,
            Q, J, v, R, N, O, X, ba, Z;
        this.element = function () {
            return u
        };
        this.visible = function () {
            return L
        };
        var P = this.redraw = function () {
            clearTimeout(Z);
            Z = setTimeout(function () {
                if (y && y.clientHeight) {
                    var a = y.parentNode.clientHeight / y.clientHeight;
                    0 > a && (a = 0);
                    1 < a ? L = !1 : (L = !0, d(n("jwthumb"), {
                        height: Math.max(E.clientHeight * a, N.height + O.height)
                    }));
                    d(n(), {
                        visibility: L ? "visible" : "hidden"
                    });
                    y && (y.style.width = L ? y.parentElement.clientWidth - v.width + "px" : "")
                } else Z = setTimeout(P, 10)
            }, 0)
        }, Y = this.thumbPosition = function (a) {
            isNaN(a) && (a = 0);
            C = Math.max(0, Math.min(1, a));
            d(n("jwthumb"), {
                top: X + (E.clientHeight - t.clientHeight) * C
            });
            w && (w.style.top = Math.min(0, u.clientHeight -
                    w.scrollHeight) * C + "px")
        };
        u = z("jwslider", null, m);
        u.id = g;
        g = new a.touch(y);
        f ? g.addEventListener(c.DRAG, B) : (u.addEventListener("mousedown", p, !1), u.addEventListener("click", A, !1));
        Q = j("sliderCapTop");
        J = j("sliderCapBottom");
        v = j("sliderRail");
        g = j("sliderRailCapTop");
        m = j("sliderRailCapBottom");
        R = j("sliderThumb");
        N = j("sliderThumbCapTop");
        O = j("sliderThumbCapBottom");
        X = Q.height;
        ba = J.height;
        d(n(), {
            width: v.width
        });
        d(n("jwrail"), {
            top: X,
            bottom: ba
        });
        d(n("jwthumb"), {
            top: X
        });
        Q = z("jwslidertop", Q, u);
        J = z("jwsliderbottom",
            J, u);
        E = z("jwrail", null, u);
        t = z("jwthumb", null, u);
        f || (Q.addEventListener("mousedown", I(-1), !1), J.addEventListener("mousedown", I(1), !1));
        z("jwrailtop", g, E);
        z("jwrailback", v, E, !0);
        z("jwrailbottom", m, E);
        d(n("jwrailback"), {
            top: g.height,
            bottom: m.height
        });
        z("jwthumbtop", N, t);
        z("jwthumbback", R, t, !0);
        z("jwthumbbottom", O, t);
        d(n("jwthumbback"), {
            top: N.height,
            bottom: O.height
        });
        P();
        y && !f && (y.addEventListener("mousewheel", r, !1), y.addEventListener("DOMMouseScroll", r, !1));
        return this
    };
    d(g("jwslider"), {
        position: "absolute",
        height: "100%",
        visibility: "hidden",
        right: 0,
        top: 0,
        cursor: "pointer",
        "z-index": 1,
        overflow: "hidden"
    });
    d(g("jwslider") + " *", {
        position: "absolute",
        width: "100%",
        "background-position": "center",
        "background-size": "100% 100%",
        overflow: "hidden"
    });
    d(g("jwslidertop", "jwrailtop", "jwthumbtop"), {
        top: 0
    });
    d(g("jwsliderbottom", "jwrailbottom", "jwthumbbottom"), {
        bottom: 0
    })
})(jwplayer.html5);
(function (f) {
    var g = jwplayer.utils,
        a = g.css,
        c = document,
        d = "none";
    f.rightclick = function (a, e) {
        return;
        function k(a) {
            var b = c.createElement("div");
            b.className = a.replace(".", "");
            return b
        }

        function l() {
            w || (n.style.display = d)
        }
        var h, m = g.extend({
            aboutlink: "salam",
            abouttext: "salam"
        }, e),
            w = !1,
            n, z;
        this.element = function () {
            return n
        };
        this.destroy = function () {
            c.removeEventListener("mousedown", l, !1)
        };
        h = c.getElementById(a.id);
        n = k(".jwclick");
        n.id = a.id + "_menu";
        n.style.display = d;
        h.oncontextmenu = function (a) {
            if (!w) {
                null == a && (a = window.event);
                var b = null != a.target ? a.target : a.srcElement,
                    c = g.bounds(h),
                    b = g.bounds(b);
                n.style.display = d;
                n.style.left = (a.offsetX ? a.offsetX : a.layerX) + b.left - c.left + "px";
                n.style.top = (a.offsetY ? a.offsetY : a.layerY) + b.top - c.top + "px";
                n.style.display = "block";
                a.preventDefault()
            }
        };
        n.onmouseover = function () {
            w = !0
        };
        n.onmouseout = function () {
            w = !1
        };
        c.addEventListener("mousedown", l, !1);
        z = k(".jwclick_item");
        z.innerHTML =
            m.abouttext;
        z.onclick = function () {
            window.top.location = m.aboutlink
        };
        n.appendChild(z);
        h.appendChild(n)
    };
    a(".jwclick", {
        "background-color": "#FFF",
        "-webkit-border-radius": 5,
        "-moz-border-radius": 5,
        "border-radius": 5,
        height: "auto",
        border: "1px solid #bcbcbc",
        "font-family": '"MS Sans Serif", "Geneva", sans-serif',
        "font-size": 10,
        width: 320,
        "-webkit-box-shadow": "5px 5px 7px rgba(0,0,0,.10), 0px 1px 0px rgba(255,255,255,.3) inset",
        "-moz-box-shadow": "5px 5px 7px rgba(0,0,0,.10), 0px 1px 0px rgba(255,255,255,.3) inset",
        "box-shadow": "5px 5px 7px rgba(0,0,0,.10), 0px 1px 0px rgba(255,255,255,.3) inset",
        position: "absolute",
        "z-index": 999
    }, !0);
    a(".jwclick div", {
        padding: "8px 21px",
        margin: "0px",
        "background-color": "#FFF",
        border: "none",
        "font-family": '"MS Sans Serif", "Geneva", sans-serif',
        "font-size": 10,
        color: "inherit"
    }, !0);
    a(".jwclick_item", {
        padding: "8px 21px",
        "text-align": "left",
        cursor: "pointer"
    }, !0);
    a(".jwclick_item:hover", {
        "background-color": "#595959",
        color: "#FFF"
    }, !0);
    a(".jwclick_item a", {
        "text-decoration": d,
        color: "#000"
    }, !0);
    a(".jwclick hr", {
        width: "100%",
        padding: 0,
        margin: 0,
        border: "1px #e9e9e9 solid"
    }, !0)
})(jwplayer.html5);
(function (f) {
    var g = jwplayer,
        a = g.utils,
        c = g.events,
        d = g.playlist,
        b = 2,
        e = 4;
    f.setup = function (g, l) {
        function h(a, b, c) {
            q.push({
                name: a,
                method: b,
                depends: c
            })
        }

        function m() {
            for (var a = 0; a < q.length; a++) {
                var b = q[a],
                    c;
                a: 
                {
                    if (c = b.depends) {
                        c = c.toString().split(",");
                        for (var d = 0; d < c.length; d++)
                            if (!p[c[d]]) {
                                c = !1;
                                break a
                            }
                    }
                    c = !0
                }
                if (c) {
                    q.splice(a, 1);
                    try {
                        b.method(), m()
                    } catch (e) {
                        j(e.message)
                    }
                    return
                }
            }
            0 < q.length && !I && setTimeout(m, 500)
        }

        function w() {
            p[b] = !0
        }

        function n(a) {
            j("Error loading skin: " + a)
        }

        function z() {
            p[e] = !0
        }

        function j(a) {
            I = !0;
            A.sendEvent(c.JWPLAYER_ERROR, {
                message: a
            });
            r.setupError(a)
        }
        var r = l,
            p = {}, B, A = new c.eventdispatcher,
            I = !1,
            q = [];
        a.extend(this, A);
        this.start = m;
        h(1, function () {
            g.edition && "invalid" == g.edition() ? j("Error setting up player: Invalid license key") : p[1] = !0
        });
        h(b, function () {
            B = new f.skin;
            B.load(g.config.skin, w, n)
        }, 1);
        h(3, function () {
            switch (a.typeOf(g.config.playlist)) {
                case "string":
                    j("Can't load a playlist as a string anymore");
                case "array":
                    var b = new d(g.config.playlist);
                    g.setPlaylist(b);
                    0 == g.playlist[0].sources.length ?
                    j("Error loading playlist: No playable sources found") : p[3] = !0
            }
        }, 1);
        h(e, function () {
            var a = g.playlist[g.item].image;
            if (a) {
                var b = new Image;
                b.addEventListener("load", z, !1);
                b.addEventListener("error", z, !1);
                b.src = a;
                setTimeout(z, 500)
            } else p[e] = !0
        }, 3);
        h(5, function () {
            r.setup(B);
            p[5] = !0
        }, e + "," + b);
        h(6, function () {
            p[6] = !0
        }, "5,3");
        h(7, function () {
            A.sendEvent(c.JWPLAYER_READY);
            p[7] = !0
        }, 6)
    }
})(jwplayer.html5);
(function (f) {
    f.skin = function () {
        var g = {}, a = !1;
        this.load = function (c, d, b) {
            new f.skinloader(c, function (b) {
                a = !0;
                g = b;
                "function" == typeof d && d()
            }, function (a) {
                "function" == typeof b && b(a)
            })
        };
        this.getSkinElement = function (c, d) {
            c = c.toLowerCase();
            d = d.toLowerCase();
            if (a) try {
                return g[c].elements[d]
            } catch (b) {
                jwplayer.utils.log("No such skin component / element: ", [c, d])
            }
            return null
        };
        this.getComponentSettings = function (c) {
            c = c.toLowerCase();
            return a && g && g[c] ? g[c].settings : null
        };
        this.getComponentLayout = function (c) {
            c = c.toLowerCase();
            if (a) {
                var d = g[c].layout;
                if (d && (d.left || d.right || d.center)) return g[c].layout
            }
            return null
        }
    }
})(jwplayer.html5);
(function (f) {
    var g = jwplayer.utils,
        a = g.foreach,
        c = "Skin formatting error";
    f.skinloader = function (d, b, e) {
        function k(a) {
            z = a;
            g.ajax(g.getAbsolutePath(A), function (a) {
                try {
                    g.exists(a.responseXML) && h(a.responseXML)
                } catch (b) {
                    r(c)
                }
            }, function (a) {
                r(a)
            })
        }

        function l(a, b) {
            return a ? a.getElementsByTagName(b) : null
        }

        function h(a) {
            var b = l(a, "skin")[0];
            a = l(b, "component");
            var c = b.getAttribute("target"),
                b = parseFloat(b.getAttribute("pixelratio"));
            0 < b && (s = b);
            (!c || parseFloat(c) > parseFloat(jwplayer.version)) && r("Incompatible player version");
            if (0 === a.length) j(z);
            else
                for (c = 0; c < a.length; c++) {
                    var d = n(a[c].getAttribute("name")),
                        b = {
                            settings: {},
                            elements: {},
                            layout: {}
                        }, e = l(l(a[c], "elements")[0], "element");
                    z[d] = b;
                    for (var f = 0; f < e.length; f++) w(e[f], d);
                    if ((d = l(a[c], "settings")[0]) && 0 < d.childNodes.length) {
                        d = l(d, "setting");
                        for (e = 0; e < d.length; e++) {
                            var f = d[e].getAttribute("name"),
                                h = d[e].getAttribute("value");
                            /color$/.test(f) && (h = g.stringToColor(h));
                            b.settings[n(f)] = h
                        }
                    }
                    if ((d = l(a[c], "layout")[0]) && 0 < d.childNodes.length) {
                        d = l(d, "group");
                        for (e = 0; e < d.length; e++) {
                            h =
                                d[e];
                            f = {
                                elements: []
                            };
                            b.layout[n(h.getAttribute("position"))] = f;
                            for (var k = 0; k < h.attributes.length; k++) {
                                var q = h.attributes[k];
                                f[q.name] = q.value
                            }
                            h = l(h, "*");
                            for (k = 0; k < h.length; k++) {
                                q = h[k];
                                f.elements.push({
                                    type: q.tagName
                                });
                                for (var A = 0; A < q.attributes.length; A++) {
                                    var B = q.attributes[A];
                                    f.elements[k][n(B.name)] = B.value
                                }
                                g.exists(f.elements[k].name) || (f.elements[k].name = q.tagName)
                            }
                        }
                    }
                    p = !1;
                    m()
                }
        }

        function m() {
            clearInterval(B);
            I || (B = setInterval(function () {
                var b = !0;
                a(z, function (c, d) {
                    "properties" != c && a(d.elements,
                        function (a) {
                            (z[n(c)] ? z[n(c)].elements[n(a)] : null).ready || (b = !1)
                        })
                });
                b && !1 == p && (clearInterval(B), j(z))
            }, 100))
        }

        function w(a, b) {
            b = n(b);
            var c = new Image,
                d = n(a.getAttribute("name")),
                e = a.getAttribute("src");
            if (0 !== e.indexOf("data:image/png;base64,")) var f = g.getAbsolutePath(A),
            e = [f.substr(0, f.lastIndexOf("/")), b, e].join("/");
            z[b].elements[d] = {
                height: 0,
                width: 0,
                src: "",
                ready: !1,
                image: c
            };
            c.onload = function () {
                var a = b,
                    e = z[n(a)] ? z[n(a)].elements[n(d)] : null;
                e ? (e.height = Math.round(c.height / s * q), e.width = Math.round(c.width /
                    s * q), e.src = c.src, e.ready = !0, m()) : console.log("Loaded an image for a missing element: " + a + "." + d)
            };
            c.onerror = function () {
                I = !0;
                m();
                r("Skin image not found: " + this.src)
            };
            c.src = e
        }

        function n(a) {
            return a ? a.toLowerCase() : ""
        }
        var z = {}, j = b,
            r = e,
            p = !0,
            B, A = d,
            I = !1,
            q = (jwplayer.utils.isMobile(), 1),
            s = 1;
        "string" != typeof A || "" === A ? h(f.defaultskin().xml) : "xml" != g.extension(A) ? r("Skin not a valid file type") : new f.skinloader("", k, r)
    }
})(jwplayer.html5);
(function (f) {
    var g = jwplayer.utils,
        a = jwplayer.events,
        c = g.css;
    f.thumbs = function (d) {
        function b(a) {
            if ("array" == !g.typeOf(a)) return e("Invalid data");
            h = a;
            c("#" + w, {
                display: "block"
            })
        }

        function e(a) {
            console.log("Thumbnails could not be loaded: " + a)
        }

        function f(a) {
            a = a.target;
            c("#" + w, {
                "background-image": a.src,
                "background-position": "0 0",
                width: a.width,
                height: a.height
            })
        }
        var l, h, m, w = d;
        d = new a.eventdispatcher;
        g.extend(this, d);
        this.load = function (a) {
            c("#" + w, {
                display: "none"
            });
            a && (m = a.split("?")[0].split("/").slice(0, -1).join("/"), (new jwplayer.parsers.srt(b, e, !0)).load(a))
        };
        this.element = function () {
            return l
        };
        this.updateTimeline = function (a) {
            var b = 0;
            if (h) {
                for (; b < h.length && a > h[b].end; ) b++;
                b == h.length && b--;
                if (h[b].text)
                    if (a = h[b].text, 0 > a.indexOf("://") && (a = m ? m + "/" + a : a), 0 < a.indexOf("#xywh")) try {
                        var d = /(.+)\#xywh=(\d+),(\d+),(\d+),(\d+)/.exec(a),
                            g = d[1];
                        c("#" + w, {
                            "background-image": g,
                            "background-position": -1 * d[2] + "px " + -1 * d[3] + "px",
                            width: d[4],
                            height: d[5]
                        })
                    } catch (l) {
                        e("Could not parse thumbnail")
                    } else g = new Image, g.addEventListener("load",
                        f, !1), g.src = a
                }
            };
            l = document.createElement("div");
            l.id = w
        }
    })(jwplayer.html5);
    (function (f) {
        var g = f.utils,
        a = f.events,
        c = a.state,
        d = !0,
        b = !1;
        f.html5.video = function (e) {
            function f(a, b) {
                N && R.sendEvent(a, b)
            }

            function l() { }

            function h(b) {
                w(b);
                N && (L == c.PLAYING && !D) && (t = Number(u.currentTime.toFixed(1)), f(a.JWPLAYER_MEDIA_TIME, {
                    position: t,
                    duration: E
                }))
            }

            function m(c) {
                N && (x || (x = d, n()), "loadedmetadata" == c.type && (u.muted && (u.muted = b, u.muted = d), f(a.JWPLAYER_MEDIA_META, {
                    duration: u.duration,
                    height: u.videoHeight,
                    width: u.videoWidth
                })))
            }

            function w() {
                x && (0 < F && !ba) && (I ? setTimeout(function () {
                    0 < F && fa(F)
                },
                200) : fa(F))
            }

            function n() {
                C || (C = d, f(a.JWPLAYER_MEDIA_BUFFER_FULL))
            }

            function z(a) {
                N && !D && (u.paused ? u.currentTime == u.duration && 3 < u.duration || ka() : (!g.isFF() || !("play" == a.type && L == c.BUFFERING)) && B(c.PLAYING))
            }

            function j() {
                N && (D || B(c.BUFFERING))
            }

            function r(a) {
                var b;
                if ("array" == g.typeOf(a) && 0 < a.length) {
                    b = [];
                    for (var c = 0; c < a.length; c++) {
                        var d = a[c],
                        e = {};
                        e.label = d.label && d.label ? d.label ? d.label : 0 : c;
                        b[c] = e
                    }
                }
                return b
            }

            function p() {
                C = x = b;
                y = O[X];
                B(c.BUFFERING);
                u.src = y.file;
                u.load();
                J = setInterval(A, 100);
                g.isMobile() &&
                n()
            }

            function B(b) {
                if (!(b == c.PAUSED && L == c.IDLE) && !D && L != b) {
                    var d = L;
                    L = b;
                    f(a.JWPLAYER_PLAYER_STATE, {
                        oldstate: d,
                        newstate: b
                    })
                }
            }

            function A() {
                if (N) {
                    var b;
                    b = 0 == u.buffered.length || 0 == u.duration ? 0 : u.buffered.end(u.buffered.length - 1) / u.duration;
                    b != v && (v = b, f(a.JWPLAYER_MEDIA_BUFFER, {
                        bufferPercent: Math.round(100 * v)
                    }));
                    1 <= b && clearInterval(J)
                }
            }
            var I = g.isIE(),
            q = {
                abort: l,
                canplay: m,
                canplaythrough: l,
                durationchange: function () {
                    if (N) {
                        var a = Number(u.duration.toFixed(1));
                        E != a && (E = a);
                        ba && (0 < F && a > F) && fa(F);
                        h()
                    }
                },
                emptied: l,
                ended: function () {
                    N && L != c.IDLE && (X = -1, Y = d, f(a.JWPLAYER_MEDIA_BEFORECOMPLETE), N && (B(c.IDLE), Y = b, f(a.JWPLAYER_MEDIA_COMPLETE)))
                },
                error: function () {
                    N && (console.log("Error playing media: %o", u.error), R.sendEvent(a.JWPLAYER_MEDIA_ERROR, {
                        message: "Error loading media: File could not be played"
                    }), B(c.IDLE))
                },
                loadeddata: l,
                loadedmetadata: m,
                loadstart: l,
                pause: z,
                play: z,
                playing: z,
                progress: w,
                ratechange: l,
                readystatechange: l,
                seeked: function () {
                    !D && L != c.PAUSED && B(c.PLAYING)
                },
                seeking: I ? j : l,
                stalled: l,
                suspend: l,
                timeupdate: h,
                volumechange: function () {
                    f(a.JWPLAYER_MEDIA_VOLUME, {
                        volume: Math.round(100 * u.volume)
                    });
                    f(a.JWPLAYER_MEDIA_MUTE, {
                        mute: u.muted
                    })
                },
                waiting: j
            }, s, y, u, E, t, x, C, F, D = b,
            L = c.IDLE,
            Q, J = -1,
            v = -1,
            R = new a.eventdispatcher,
            N = b,
            O, X = -1,
            ba = g.isAndroid(b, d),
            Z = g.isIOS(7),
            P = this,
            Y = b;
            g.extend(P, R);
            P.load = function (b) {
                if (N) {
                    s = b;
                    F = 0;
                    E = b.duration ? b.duration : -1;
                    t = 0;
                    O = s.sources;
                    0 > X && (X = 0);
                    for (b = 0; b < O.length; b++)
                        if (O[b]["default"]) {
                            X = b;
                            break
                        }
                    var c = g.getCookies().qualityLabel;
                    if (c)
                        for (b = 0; b < O.length; b++)
                            if (O[b].label == c) {
                                X = b;
                                break
                            } (b = r(O)) && R.sendEvent(a.JWPLAYER_MEDIA_LEVELS, {
                                levels: b,
                                currentQuality: X
                            });
                    p()
                }
            };
            P.stop = function () {
                N && (u.removeAttribute("src"), I || u.load(), X = -1, clearInterval(J), B(c.IDLE))
            };
            P.play = function () {
                N && !D && u.play()
            };
            var ka = P.pause = function () {
                N && (u.pause(), B(c.PAUSED))
            };
            P.seekDrag = function (a) {
                N && ((D = a) ? u.pause() : u.play())
            };
            var fa = P.seek = function (b) {
                N && (!D && 0 == F && f(a.JWPLAYER_MEDIA_SEEK, {
                    position: t,
                    offset: b
                }), x ? (F = 0, u.currentTime = b) : F = b)
            }, ga = P.volume = function (a) {
                g.exists(a) && (u.volume = Math.min(Math.max(0, a / 100), 1), Q = 100 * u.volume)
            };
            P.mute = function (a) {
                g.exists(a) ||
                (a = !u.muted);
                a ? (Q = 100 * u.volume, u.muted = d) : (ga(Q), u.muted = b)
            };
            this.checkComplete = function () {
                return Y
            };
            P.detachMedia = function () {
                N = b;
                return u
            };
            P.attachMedia = function (e) {
                N = d;
                e || (x = b);
                Y && (B(c.IDLE), f(a.JWPLAYER_MEDIA_COMPLETE), Y = b)
            };
            P.getTag = function () {
                return u
            };
            P.audioMode = function () {
                if (!O) return b;
                var a = O[0].type;
                return "aac" == a || "mp3" == a || "vorbis" == a
            };
            P.setCurrentQuality = function (b) {
                X != b && (b = parseInt(b), 0 <= b && (O && O.length > b) && (X = b, g.saveCookie("qualityLabel", O[b].label), f(a.JWPLAYER_MEDIA_LEVEL_CHANGED, {
                    currentQuality: b,
                    levels: r(O)
                }), b = u.currentTime, p(), P.seek(b)))
            };
            P.getCurrentQuality = function () {
                return X
            };
            P.getQualityLevels = function () {
                return r(O)
            };
            e || (e = document.createElement("video"));
            u = e;
            g.foreach(q, function (a, c) {
                u.addEventListener(a, c, b)
            });
            Z || (u.controls = d, u.controls = b);
            u.setAttribute("x-webkit-airplay", "allow");
            N = d
        }
    })(jwplayer);
    (function (f) {
        var g = jwplayer.utils,
        a = jwplayer.events,
        c = a.state,
        d = g.css,
        b = g.isMobile(),
        e = g.isIPad(),
        k = g.isIPod(),
        l = g.isAndroid(),
        h = g.isIOS(),
        m = document,
        w = "aspectMode",
        n = "jwmain",
        z = "jwvideo",
        j = "jwplaylistcontainer",
        r = !0,
        p = !1,
        B = "hidden",
        A = "none",
        I = "block",
        q = 115,
        s = 65;
        f.view = function (y, u) {
            function E(a) {
                a && (a.element().addEventListener("mousemove", F, p), a.element().addEventListener("mouseout", D, p))
            }

            function t(a, b) {
                var c = m.createElement(a);
                b && (c.className = b);
                return c
            }

            function x() {
                clearTimeout(qa);
                qa = setTimeout(fa,
                Qa)
            }

            function C() {
                clearTimeout(qa);
                if (W.jwGetState() == c.PAUSED || W.jwGetState() == c.PLAYING) ga(), ja || (qa = setTimeout(fa, Qa))
            }

            function F() {
                clearTimeout(qa);
                ja = r
            }

            function D() {
                ja = p
            }

            function L(a) {
                na.sendEvent(a.type, a)
            }

            function Q(b, c, e) {
                g.exists(e) || (e = r);
                g.exists(b) && g.exists(c) && (G.width = b, G.height = c);
                T.style.width = isNaN(b) ? b : b + "px"; -1 == T.className.indexOf(w) && (T.style.height = isNaN(c) ? c : c + "px");
                ca && ca.redraw();
                U && U.redraw(r);
                S && (S.offset(U && 0 <= S.position().indexOf("bottom") ? U.height() + U.margin() : 0), setTimeout(function () {
                    da &&
                    da.offset("top-left" == S.position() ? S.element().clientWidth + S.margin() : 0)
                }, 500));
                b = G.playlistsize;
                var f = G.playlistposition;
                J(c);
                if (Aa && b && ("right" == f || "bottom" == f)) {
                    Aa.redraw();
                    c = {
                        display: I
                    };
                    var h = {};
                    c[f] = 0;
                    h[f] = b;
                    "right" == f ? c.width = b : c.height = b;
                    d(wa(j), c);
                    d(wa(n), h)
                }
                v();
                e && na.sendEvent(a.JWPLAYER_RESIZE)
            }

            function J(a) {
                var b = g.bounds(T);
                K = 0 < a.toString().indexOf("%") ? p : 0 == b.height ? p : "bottom" == G.playlistposition ? b.height <= 40 + G.playlistsize : 40 >= b.height;
                U && (K ? (U.audioMode(r), ga(), ca.hidePreview(r), ca &&
                ca.hide(), la(p)) : (U.audioMode(p), Ya(W.jwGetState())));
                S && K && Y();
                T.style.backgroundColor = K ? "transparent" : "#000"
            }

            function v() {
                ea && -1 == T.className.indexOf(w) && g.stretch(G.stretching, ea, xa.clientWidth, xa.clientHeight, ea.videoWidth, ea.videoHeight)
            }

            function R(a) {
                if (G.fullscreen) switch (a.keyCode) {
                    case 27:
                        ua(p)
                }
            }

            function N(a) {
                h || (a ? (T.className += " jwfullscreen", m.getElementsByTagName("body")[0].style["overflow-y"] = B) : (T.className = T.className.replace(/\s+jwfullscreen/, ""), m.getElementsByTagName("body")[0].style["overflow-y"] =
                ""))
            }

            function O() {
                var a;
                a = m.mozFullScreenElement || m.webkitCurrentFullScreenElement || m.msFullscreenElement || ea.webkitDisplayingFullscreen;
                a = !(!a || a.id && a.id != W.id);
                G.fullscreen != a && ua(a)
            }

            function X() {
                U && (!K && !G.getVideo().audioMode()) && U.hide()
            }

            function ba() {
                da && (!K && G.controls) && da.show()
            }

            function Z() {
                da && (!Ja && !G.getVideo().audioMode()) && da.hide()
            }

            function P() {
                S && !K && S.show()
            }

            function Y() {
                S && !G.getVideo().audioMode() && S.hide(K)
            }

            function ka() {
                ca && G.controls && !K && (!k || W.jwGetState() == c.IDLE) && ca.show();
                if (!b || !G.fullscreen) ea.controls = p
            }

            function fa() {
                clearTimeout(qa);
                qa = 0;
                ra = p;
                var a = W.jwGetState();
                (!u.controls || a != c.PAUSED) && X();
                u.controls || Z();
                a != c.IDLE && a != c.PAUSED && (Z(), Y())
            }

            function ga() {
                ra = r;
                if ((G.controls || K) && !(k && La == c.PAUSED)) (!k || K) && U && U.show(), ba();
                Ia.hide && P()
            }

            function la(a) {
                (a = a && !K) || l ? d(wa(z), {
                    visibility: "visible",
                    opacity: 1
                }) : d(wa(z), {
                    visibility: B,
                    opacity: 0
                })
            }

            function fb() {
                Ja = r;
                ua(p);
                G.controls && ba()
            }

            function gb() { }

            function Ga(a) {
                Ja = p;
                clearTimeout(Ha);
                Ha = setTimeout(function () {
                    Ya(a.newstate)
                },
                100)
            }

            function nb() {
                X()
            }

            function Ya(a) {
                La = a;
                switch (a) {
                    case c.PLAYING:
                        G.getVideo().audioMode() ? (la(p), ca.hidePreview(K), ca.setHiding(r), U && (ga(), U.hideFullscreen(r)), ba(), P()) : (la(r), v(), ca.hidePreview(r), U && U.hideFullscreen(p), fa());
                        break;
                    case c.IDLE:
                        la(p);
                        K || (ca.hidePreview(p), ka(), ba(), P(), U && U.hideFullscreen(p));
                        break;
                    case c.BUFFERING:
                        ka();
                        fa();
                        b && la(r);
                        break;
                    case c.PAUSED:
                        ka(), ga()
                }
            }

            function wa(a) {
                return "#" + W.id + (a ? " ." + a : "")
            }

            function jb(a) {
                var b = ha.getContext("2d");
                b.clearRect(0, 0, q, s);
                b.fillStyle =
                "black";
                b.globalAlpha = 0.5;
                b.fillRect(0, 0, q, s);
                b.globalAlpha = 1;
                b.strokeStyle = "white";
                b.strokeRect(0, 0, q, s);
                b.font = "13px Arial";
                b.fillStyle = "white";
                var c = ha.width / 2,
                d = ha.height / 2;
                b.textAlign = "center";
                b.fillText("Skip ad in " + a, c, d + 6)
            }

            function Oa() {
                na.sendEvent(a.JWPLAYER_AD_SKIPPED, {
                    tag: Ta
                })
            }

            function Na(a, b) {
                d(a, {
                    display: b ? I : A
                })
            }
            var W = y,
            G = u,
            T, za, ya, mb, Pa, qa = 0,
            Qa = b ? 4E3 : 2E3,
            ea, xa, Sa, Da, aa, ha, V, cb, Ea = p,
            M = p,
            U, ca, da, S, Ia = g.extend({}, G.componentConfig("logo")),
            H, Aa, K, ma = p,
            ra = p,
            Ja, ia, Ka, ja = p,
            La, Ta, na = new a.eventdispatcher;
            g.extend(this, na);
            this.getCurrentCaptions = function () {
                return H.getCurrentCaptions()
            };
            this.setCurrentCaptions = function (a) {
                H.setCurrentCaptions(a)
            };
            this.getCaptionsList = function () {
                return H.getCaptionsList()
            };
            this.setup = function (e) {
                if (!ma) {
                    W.skin = e;
                    za = t("span", n);
                    xa = t("span", z);
                    ea = G.getVideo().getTag();
                    xa.appendChild(ea);
                    ya = t("span", "jwcontrols");
                    Da = t("span", "jwinstream");
                    Pa = t("span", j);
                    mb = t("span", "jwaspect");
                    e = G.height;
                    var h = G.componentConfig("controlbar"),
                    l = G.componentConfig("display");
                    J(e);
                    H = new f.captions(W,
                    G.captions);
                    H.addEventListener(a.JWPLAYER_CAPTIONS_LIST, L);
                    H.addEventListener(a.JWPLAYER_CAPTIONS_CHANGED, L);
                    ya.appendChild(H.element());
                    ca = new f.display(W, l);
                    ca.addEventListener(a.JWPLAYER_DISPLAY_CLICK, function (a) {
                        L(a);
                        b ? ra ? fa() : ga() : Ga(W.jwGetState());
                        ra && (clearTimeout(qa), qa = setTimeout(fa, Qa))
                    });
                    K && ca.hidePreview(r);
                    ya.appendChild(ca.element());
                    S = new f.logo(W, Ia);
                    ya.appendChild(S.element());
                    da = new f.dock(W, G.componentConfig("dock"));
                    ya.appendChild(da.element());
                    W.edition && !b ? ia = new f.rightclick(W, {
                        abouttext: G.abouttext,
                        aboutlink: G.aboutlink
                    }) : b || (ia = new f.rightclick(W, {}));
                    G.playlistsize && (G.playlistposition && G.playlistposition != A) && (Aa = new f.playlistcomponent(W, {}), Pa.appendChild(Aa.element()));
                    U = new f.controlbar(W, h);
                    U.addEventListener(a.JWPLAYER_USER_ACTION, x);
                    ya.appendChild(U.element());
                    k && X();
                    setTimeout(function () {
                        Q(G.width, G.height, p)
                    }, 0);
                    za.appendChild(xa);
                    za.appendChild(ya);
                    za.appendChild(Da);
                    T.appendChild(za);
                    T.appendChild(mb);
                    T.appendChild(Pa);
                    m.addEventListener("webkitfullscreenchange",
                    O, p);
                    ea.addEventListener("webkitbeginfullscreen", O, p);
                    ea.addEventListener("webkitendfullscreen", O, p);
                    m.addEventListener("mozfullscreenchange", O, p);
                    m.addEventListener("MSFullscreenChange", O, p);
                    m.addEventListener("keydown", R, p);
                    W.jwAddEventListener(a.JWPLAYER_PLAYER_READY, gb);
                    W.jwAddEventListener(a.JWPLAYER_PLAYER_STATE, Ga);
                    W.jwAddEventListener(a.JWPLAYER_MEDIA_ERROR, nb);
                    W.jwAddEventListener(a.JWPLAYER_PLAYLIST_COMPLETE, fb);
                    Ga({
                        newstate: c.IDLE
                    });
                    b || (ya.addEventListener("mouseout", function () {
                        clearTimeout(qa);
                        qa = setTimeout(fa, 10)
                    }, p), ya.addEventListener("mousemove", C, p), g.isIE() && (xa.addEventListener("mousemove", C, p), xa.addEventListener("click", ca.clickHandler)));
                    E(U);
                    E(da);
                    E(S);
                    d("#" + T.id + "." + w + " .jwaspect", {
                        "margin-top": G.aspectratio,
                        display: I
                    });
                    e = g.exists(G.aspectratio) ? parseFloat(G.aspectratio) : 100;
                    h = G.playlistsize;
                    d("#" + T.id + ".playlist-right .jwaspect", {
                        "margin-bottom": -1 * h * (e / 100) + "px"
                    });
                    d("#" + T.id + ".playlist-right ." + j, {
                        width: h + "px",
                        right: 0,
                        top: 0,
                        height: "100%"
                    });
                    d("#" + T.id + ".playlist-bottom .jwaspect", {
                        "padding-bottom": h + "px"
                    });
                    d("#" + T.id + ".playlist-bottom ." + j, {
                        width: "100%",
                        height: h + "px",
                        bottom: 0
                    });
                    d("#" + T.id + ".playlist-right ." + n, {
                        right: h + "px"
                    });
                    d("#" + T.id + ".playlist-bottom ." + n, {
                        bottom: h + "px"
                    })
                }
            };
            var ua = this.fullscreen = function (d) {
                g.exists(d) || (d = !G.fullscreen);
                if (d) {
                    if (G.getVideo().audioMode()) return;
                    b ? (ea.webkitEnterFullScreen(), G.setFullscreen(r)) : G.fullscreen || (N(r), T.requestFullScreen ? T.requestFullScreen() : T.mozRequestFullScreen ? T.mozRequestFullScreen() : T.webkitRequestFullScreen ? T.webkitRequestFullScreen() :
                    T.msRequestFullscreen && T.msRequestFullscreen(), G.setFullscreen(r))
                } else b ? (ea.webkitExitFullScreen(), G.setFullscreen(p), e && (ea.controls = r, ea.controls = p)) : G.fullscreen && (N(p), G.setFullscreen(p), m.cancelFullScreen ? m.cancelFullScreen() : m.mozCancelFullScreen ? m.mozCancelFullScreen() : m.webkitCancelFullScreen ? m.webkitCancelFullScreen() : m.msExitFullscreen && m.msExitFullscreen()), e && W.jwGetState() == c.PAUSED && setTimeout(ka, 500);
                U && U.redraw();
                ca && ca.redraw();
                da && da.redraw();
                v();
                G.fullscreen ? Ka = setInterval(v,
                200) : clearInterval(Ka);
                setTimeout(function () {
                    var b = g.bounds(za);
                    G.width = b.width;
                    G.height = b.height;
                    na.sendEvent(a.JWPLAYER_RESIZE)
                }, 0);
                setTimeout(function () {
                    if (Ea && aa) {
                        var a = g.bounds(document.getElementById(W.id));
                        aa.style.top = a.height / 2 - 32 + "px"
                    }
                }, 1E3)
            };
            this.resize = Q;
            this.resizeMedia = v;
            var kb = this.completeSetup = function () {
                d(wa(), {
                    opacity: 1
                })
            }, Ha;
            this.setupInstream = function (a, b, d, e) {
                Na(wa("jwinstream"), r);
                Na(wa("jwcontrols"), p);
                Da.appendChild(a);
                V = b;
                cb = d;
                Ga({
                    newstate: c.PLAYING
                });
                Ea = r;
                if (0 <= e) {
                    aa || (aa =
                    t("div", "jwinstreamskip"), aa.id = "skipContainer", ha = t("canvas"), aa.appendChild(ha));
                    a = g.bounds(document.getElementById(W.id));
                    aa.style.top = a.height / 2 - Math.floor(s / 2) + "px";
                    aa.style.width = q + "px";
                    aa.style.height = s + "px";
                    aa.style.visibility = G.controls ? "visible" : "hidden";
                    ha.width = q;
                    ha.height = s;
                    Da.appendChild(aa);
                    jb(e);
                    var f = setInterval(function () {
                        var a = m.getElementById(W.id),
                        b = g.bounds(a).width;
                        a != T ? clearInterval(f) : 0 < b && b != Sa && (Sa = b, a = g.bounds(a), aa.style.top = a.height / 2 - Math.floor(s / 2) + "px")
                    }, 200)
                }
            };
            this.destroyInstream =
            function () {
                Na(wa("jwinstream"), p);
                Na(wa("jwcontrols"), r);
                Da.innerHTML = "";
                M = Ea = p
            };
            this.setupError = function (a) {
                ma = r;
                jwplayer.embed.errorScreen(T, a, G);
                kb()
            };
            this.updateSkipTime = function (a, c) {
                Ta = c;
                var d = ha.getContext("2d");
                if (0 <= a) jb(a);
                else if (!M) {
                    d.clearRect(0, 0, q, s);
                    d.fillStyle = "black";
                    d.globalAlpha = 0.5;
                    d.fillRect(0, 0, q, s);
                    d.globalAlpha = 1;
                    d.strokeStyle = "white";
                    d.strokeRect(0, 0, q, s);
                    d.fillStyle = "white";
                    d.font = "20px Arial";
                    var e = ha.width / 2,
                    f = ha.height / 2;
                    d.textAlign = "center";
                    d.fillText("Skip ad \x3e\x3e",
                    e, f + 10);
                    b ? (new g.touch(aa)).addEventListener(g.touchEvents.TAP, function () {
                        Oa()
                    }) : aa.addEventListener("click", Oa);
                    M = r;
                    aa.style.cursor = "pointer";
                    var h = d.measureText("Skip ad \x3e\x3e").width,
                    f = f + 10 + parseInt(20 / 15),
                    j = 20 / 15;
                    1 > j && (j = 1);
                    var k;
                    d.beginPath();
                    k = e + h / 2;
                    d.strokeStyle = "white";
                    d.lineWidth = j;
                    d.moveTo(e - h / 2, f);
                    d.lineTo(k, f);
                    d.stroke()
                }
            };
            this.addButton = function (a, b, d, e) {
                da && (da.addButton(a, b, d, e), W.jwGetState() == c.IDLE && ba())
            };
            this.removeButton = function (a) {
                da && da.removeButton(a)
            };
            this.setControls =
            function (b) {
                var c = G.controls,
                    d = b ? r : p;
                G.controls = d;
                d != c && (d ? Ga({
                    newstate: W.jwGetState()
                }) : (fa(), ca && ca.hide()), Ea && (b ? (V.show(), cb.show(), aa && (aa.style.visibility = "visible")) : (V.hide(), cb.hide(), aa && (aa.style.visibility = "hidden"))), na.sendEvent(a.JWPLAYER_CONTROLS, {
                    controls: d
                }))
            };
            this.forceState = function (a) {
                ca.forceState(a)
            };
            this.releaseState = function () {
                ca.releaseState(W.jwGetState())
            };
            this.getSafeRegion = function () {
                var a = {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                };
                if (!G.controls) return a;
                U.showTemp();
                da.showTemp();
                var b = g.bounds(za),
                c = b.top,
                d = Ea ? g.bounds(m.getElementById(W.id + "_instream_controlbar")) : g.bounds(U.element()),
                e = Ea ? !1 : 0 < da.numButtons(),
                f = 0 === S.position().indexOf("top"),
                h = g.bounds(S.element());
                e && (e = g.bounds(da.element()), a.y = Math.max(0, e.bottom - c));
                f && (a.y = Math.max(a.y, h.bottom - c));
                a.width = b.width;
                a.height = d.height ? (f ? d.top : h.top) - c - a.y : b.height - a.y;
                U.hideTemp();
                da.hideTemp();
                return a
            };
            this.destroy = function () {
                m.removeEventListener("webkitfullscreenchange", O, p);
                m.removeEventListener("mozfullscreenchange",
                O, p);
                m.removeEventListener("MSFullscreenChange", O, p);
                ea.removeEventListener("webkitbeginfullscreen", O, p);
                ea.removeEventListener("webkitendfullscreen", O, p);
                m.removeEventListener("keydown", R, p);
                ia && ia.destroy()
            };
            T = t("div", "jwplayer playlist-" + G.playlistposition);
            T.id = W.id;
            G.aspectratio && (d(".jwplayer", {
                display: "inline-block"
            }), T.className = T.className.replace("jwplayer", "jwplayer " + w));
            Q(G.width, G.height);
            var pa = document.getElementById(W.id);
            pa.parentNode.replaceChild(T, pa)
        };
        d(".jwplayer", {
            position: "relative",
            display: "block",
            opacity: 0,
            "min-height": 0,
            "-webkit-transition": "opacity .25s ease",
            "-moz-transition": "opacity .25s ease",
            "-o-transition": "opacity .25s ease"
        });
        d("." + n, {
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            "-webkit-transition": "opacity .25s ease",
            "-moz-transition": "opacity .25s ease",
            "-o-transition": "opacity .25s ease"
        });
        d("." + z + " ,.jwcontrols", {
            position: "absolute",
            height: "100%",
            width: "100%",
            "-webkit-transition": "opacity .25s ease",
            "-moz-transition": "opacity .25s ease",
            "-o-transition": "opacity .25s ease"
        });
        d("." + z, {
            overflow: B,
            visibility: B,
            opacity: 0,
            cursor: "pointer"
        });
        d("." + z + " video", {
            background: "transparent",
            width: "100%",
            height: "100%"
        });
        d("." + j, {
            position: "absolute",
            height: "100%",
            width: "100%",
            display: A
        });
        d(".jwinstream", {
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            display: "none"
        });
        d(".jwinstreamskip", {
            position: "relative",
            "float": "right",
            display: "inline-block"
        });
        d(".jwaspect", {
            display: "none"
        });
        d(".jwplayer." + w, {
            height: "auto"
        });
        d(".jwplayer.jwfullscreen", {
            width: "100%",
            height: "100%",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            "z-index": 1E3,
            position: "fixed"
        }, r);
        d(".jwplayer.jwfullscreen ." + n, {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }, r);
        d(".jwplayer.jwfullscreen ." + j, {
            display: A
        }, r);
        d(".jwplayer .jwuniform", {
            "background-size": "contain !important"
        });
        d(".jwplayer .jwfill", {
            "background-size": "cover !important",
            "background-position": "center"
        });
        d(".jwplayer .jwexactfit", {
            "background-size": "100% 100% !important"
        })
    })(jwplayer.html5);
    (function (f) {
        var g = jwplayer.utils.extend,
        a = f.logo;
        a.defaults.prefix = "";
        a.defaults.file = "";
        f.logo =
        function (c, d) {
            "free" == c.edition() ? d = null : (a.defaults.file = "", a.defaults.prefix = "");
            g(this, new a(c, d))
        }
    })(jwplayer.html5);
    (function (f) {
        var g = f.model;
        f.model = function (a, c) {
            var d = new jwplayer.utils.key(a.key),
            b = new g(a, c),
            e = b.componentConfig;
            b.edition = function () {
                return d.edition()
            };
            b.componentConfig = function (a) {
                return "logo" == a ? b.logo : e(a)
            };
            return b
        }
    })(jwplayer.html5);
    (function (f) {
        f.player.prototype.edition = function () {
            return this._model.edition()
        }
    })(jwplayer.html5);
    (function (f) {
        var g = jwplayer.utils.extend,
        a = f.rightclick;
        f.rightclick = function (c, d) {
            if ("free" == c.edition()) d.aboutlink = "http://www.longtailvideo.com/jwpabout/?a\x3dr\x26v\x3d" + f.version + "\x26m\x3dh\x26e\x3df", delete d.abouttext;
            else {
                if (!d.aboutlink) {
                    var b = "http://www.longtailvideo.com/jwpabout/?a\x3dr\x26v\x3d" + f.version + "\x26m\x3dh\x26e\x3d",
                    e = c.edition();
                    d.aboutlink = b + ("pro" == e ? "p" : "premium" == e ? "r" : "ads" == e ? "a" : "f")
                }
                d.abouttext ? d.abouttext += " ..." : (b = c.edition(), b = b.charAt(0).toUpperCase() + b.substr(1),
                d.abouttext = "About JW Player " + f.version + " (" + b + " edition)")
            }
            g(this, new a(c, d))
        }
    })(jwplayer.html5);
    (function (f) {
        var g = f.view;
        f.view = function (a, c) {
            var d = new g(a, c);
            "invalid" == c.edition() && d.setupError("Error setting up player: Invalid license key");
            return d
        }
    })(jwplayer.html5);