!function (e) {
    e.flexslider = function (t, a) {
        var n = e(t);
        n.vars = e.extend({}, e.flexslider.defaults, a);
        var i, s = n.vars.namespace, r = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
            o = ("ontouchstart" in window || r || window.DocumentTouch && document instanceof DocumentTouch) && n.vars.touch,
            l = "", c = "vertical" === n.vars.direction, d = n.vars.reverse, u = 0 < n.vars.itemWidth,
            v = "fade" === n.vars.animation, p = "" !== n.vars.asNavFor, m = {};
        e.data(t, "flexslider", n), m = {
            init: function () {
                n.animating = !1, n.currentSlide = parseInt(n.vars.startAt ? n.vars.startAt : 0, 10), isNaN(n.currentSlide) && (n.currentSlide = 0), n.animatingTo = n.currentSlide, n.atEnd = 0 === n.currentSlide || n.currentSlide === n.last, n.containerSelector = n.vars.selector.substr(0, n.vars.selector.search(" ")), n.slides = e(n.vars.selector, n), n.container = e(n.containerSelector, n), n.count = n.slides.length, n.syncExists = 0 < e(n.vars.sync).length, "slide" === n.vars.animation && (n.vars.animation = "swing"), n.prop = c ? "top" : "marginLeft", n.args = {}, n.manualPause = !1, n.stopped = !1, n.started = !1, n.startTimeout = null, n.transitions = !n.vars.video && !v && n.vars.useCSS && function () {
                    var e, t = document.createElement("div"),
                        a = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                    for (e in a) if (void 0 !== t.style[a[e]]) return n.pfx = a[e].replace("Perspective", "").toLowerCase(), n.prop = "-" + n.pfx + "-transform", !0;
                    return !1
                }(), "" !== n.vars.controlsContainer && (n.controlsContainer = 0 < e(n.vars.controlsContainer).length && e(n.vars.controlsContainer)), "" !== n.vars.manualControls && (n.manualControls = 0 < e(n.vars.manualControls).length && e(n.vars.manualControls)), n.vars.randomize && (n.slides.sort(function () {
                    return Math.round(Math.random()) - .5
                }), n.container.empty().append(n.slides)), n.doMath(), n.setup("init"), n.vars.controlNav && m.controlNav.setup(), n.vars.directionNav && m.directionNav.setup(), n.vars.keyboard && (1 === e(n.containerSelector).length || n.vars.multipleKeyboard) && e(document).bind("keyup", function (e) {
                    e = e.keyCode, n.animating || 39 !== e && 37 !== e || (e = 39 === e ? n.getTarget("next") : 37 === e ? n.getTarget("prev") : !1, n.flexAnimate(e, n.vars.pauseOnAction))
                }), n.vars.mousewheel && n.bind("mousewheel", function (e, t, a, i) {
                    e.preventDefault(), e = 0 > t ? n.getTarget("next") : n.getTarget("prev"), n.flexAnimate(e, n.vars.pauseOnAction)
                }), n.vars.pausePlay && m.pausePlay.setup(), n.vars.slideshow && n.vars.pauseInvisible && m.pauseInvisible.init(), n.vars.slideshow && (n.vars.pauseOnHover && n.hover(function () {
                    n.manualPlay || n.manualPause || n.pause()
                }, function () {
                    n.manualPause || n.manualPlay || n.stopped || n.play()
                }), n.vars.pauseInvisible && m.pauseInvisible.isHidden() || (0 < n.vars.initDelay ? n.startTimeout = setTimeout(n.play, n.vars.initDelay) : n.play())), p && m.asNav.setup(), o && n.vars.touch && m.touch(), (!v || v && n.vars.smoothHeight) && e(window).bind("resize orientationchange focus", m.resize), n.find("img").attr("draggable", "false"), setTimeout(function () {
                    n.vars.start(n)
                }, 200)
            }, asNav: {
                setup: function () {
                    n.asNav = !0, n.animatingTo = Math.floor(n.currentSlide / n.move), n.currentItem = n.currentSlide, n.slides.removeClass(s + "active-slide").eq(n.currentItem).addClass(s + "active-slide"), r ? (t._slider = n, n.slides.each(function () {
                        this._gesture = new MSGesture, this._gesture.target = this, this.addEventListener("MSPointerDown", function (e) {
                            e.preventDefault(), e.currentTarget._gesture && e.currentTarget._gesture.addPointer(e.pointerId)
                        }, !1), this.addEventListener("MSGestureTap", function (t) {
                            t.preventDefault(), t = e(this);
                            var a = t.index();
                            e(n.vars.asNavFor).data("flexslider").animating || t.hasClass("active") || (n.direction = n.currentItem < a ? "next" : "prev", n.flexAnimate(a, n.vars.pauseOnAction, !1, !0, !0))
                        })
                    })) : n.slides.on("click touchend MSPointerUp", function (t) {
                        t.preventDefault(), t = e(this);
                        var a = t.index();
                        0 >= t.offset().left - e(n).scrollLeft() && t.hasClass(s + "active-slide") ? n.flexAnimate(n.getTarget("prev"), !0) : e(n.vars.asNavFor).data("flexslider").animating || t.hasClass(s + "active-slide") || (n.direction = n.currentItem < a ? "next" : "prev", n.flexAnimate(a, n.vars.pauseOnAction, !1, !0, !0))
                    })
                }
            }, controlNav: {
                setup: function () {
                    n.manualControls ? m.controlNav.setupManual() : m.controlNav.setupPaging()
                }, setupPaging: function () {
                    var t, a, i = 1;
                    if (n.controlNavScaffold = e('<ol class="' + s + "control-nav " + s + ("thumbnails" === n.vars.controlNav ? "control-thumbs" : "control-paging") + '"></ol>'), 1 < n.pagingCount) for (var r = 0; r < n.pagingCount; r++) a = n.slides.eq(r), t = "thumbnails" === n.vars.controlNav ? '<img src="' + a.attr("data-thumb") + '"/>' : "<a>" + i + "</a>", "thumbnails" === n.vars.controlNav && !0 === n.vars.thumbCaptions && (a = a.attr("data-thumbcaption"), "" != a && void 0 != a && (t += '<span class="' + s + 'caption">' + a + "</span>")), n.controlNavScaffold.append("<li>" + t + "</li>"), i++;
                    n.controlsContainer ? e(n.controlsContainer).append(n.controlNavScaffold) : n.append(n.controlNavScaffold), m.controlNav.set(), m.controlNav.active(), n.controlNavScaffold.delegate("a, img", "click touchend MSPointerUp", function (t) {
                        if (t.preventDefault(), "" === l || l === t.type) {
                            var a = e(this), i = n.controlNav.index(a);
                            a.hasClass(s + "active") || (n.direction = i > n.currentSlide ? "next" : "prev", n.flexAnimate(i, n.vars.pauseOnAction))
                        }
                        "" === l && (l = t.type), m.setToClearWatchedEvent()
                    })
                }, setupManual: function () {
                    n.controlNav = n.manualControls, m.controlNav.active(), n.controlNav.bind("click touchend MSPointerUp", function (t) {
                        if (t.preventDefault(), "" === l || l === t.type) {
                            var a = e(this), i = n.controlNav.index(a);
                            a.hasClass(s + "active") || (i > n.currentSlide ? n.direction = "next" : n.direction = "prev", n.flexAnimate(i, n.vars.pauseOnAction))
                        }
                        "" === l && (l = t.type), m.setToClearWatchedEvent()
                    })
                }, set: function () {
                    n.controlNav = e("." + s + "control-nav li " + ("thumbnails" === n.vars.controlNav ? "img" : "a"), n.controlsContainer ? n.controlsContainer : n)
                }, active: function () {
                    n.controlNav.removeClass(s + "active").eq(n.animatingTo).addClass(s + "active")
                }, update: function (t, a) {
                    1 < n.pagingCount && "add" === t ? n.controlNavScaffold.append(e("<li><a>" + n.count + "</a></li>")) : 1 === n.pagingCount ? n.controlNavScaffold.find("li").remove() : n.controlNav.eq(a).closest("li").remove(), m.controlNav.set(), 1 < n.pagingCount && n.pagingCount !== n.controlNav.length ? n.update(a, t) : m.controlNav.active()
                }
            }, directionNav: {
                setup: function () {
                    var t = e('<ul class="' + s + 'direction-nav"><li><a class="' + s + 'prev" href="#">' + n.vars.prevText + '</a></li><li><a class="' + s + 'next" href="#">' + n.vars.nextText + "</a></li></ul>");
                    n.controlsContainer ? (e(n.controlsContainer).append(t), n.directionNav = e("." + s + "direction-nav li a", n.controlsContainer)) : (n.append(t), n.directionNav = e("." + s + "direction-nav li a", n)), m.directionNav.update(), n.directionNav.bind("click touchend MSPointerUp", function (t) {
                        t.preventDefault();
                        var a;
                        ("" === l || l === t.type) && (a = e(this).hasClass(s + "next") ? n.getTarget("next") : n.getTarget("prev"), n.flexAnimate(a, n.vars.pauseOnAction)), "" === l && (l = t.type), m.setToClearWatchedEvent()
                    })
                }, update: function () {
                    var e = s + "disabled";
                    1 === n.pagingCount ? n.directionNav.addClass(e).attr("tabindex", "-1") : n.vars.animationLoop ? n.directionNav.removeClass(e).removeAttr("tabindex") : 0 === n.animatingTo ? n.directionNav.removeClass(e).filter("." + s + "prev").addClass(e).attr("tabindex", "-1") : n.animatingTo === n.last ? n.directionNav.removeClass(e).filter("." + s + "next").addClass(e).attr("tabindex", "-1") : n.directionNav.removeClass(e).removeAttr("tabindex")
                }
            }, pausePlay: {
                setup: function () {
                    var t = e('<div class="' + s + 'pauseplay"><a></a></div>');
                    n.controlsContainer ? (n.controlsContainer.append(t), n.pausePlay = e("." + s + "pauseplay a", n.controlsContainer)) : (n.append(t), n.pausePlay = e("." + s + "pauseplay a", n)), m.pausePlay.update(n.vars.slideshow ? s + "pause" : s + "play"), n.pausePlay.bind("click touchend MSPointerUp", function (t) {
                        t.preventDefault(), ("" === l || l === t.type) && (e(this).hasClass(s + "pause") ? (n.manualPause = !0, n.manualPlay = !1, n.pause()) : (n.manualPause = !1, n.manualPlay = !0, n.play())), "" === l && (l = t.type), m.setToClearWatchedEvent()
                    })
                }, update: function (e) {
                    "play" === e ? n.pausePlay.removeClass(s + "pause").addClass(s + "play").html(n.vars.playText) : n.pausePlay.removeClass(s + "play").addClass(s + "pause").html(n.vars.pauseText)
                }
            }, touch: function () {
                var e, a, i, s, o, l, p = !1, m = 0, f = 0, g = 0;
                if (r) {
                    t.style.msTouchAction = "none", t._gesture = new MSGesture, t._gesture.target = t, t.addEventListener("MSPointerDown", h, !1), t._slider = n, t.addEventListener("MSGestureChange", S, !1), t.addEventListener("MSGestureEnd", y, !1);
                    var h = function (e) {
                        e.stopPropagation(), n.animating ? e.preventDefault() : (n.pause(), t._gesture.addPointer(e.pointerId), g = 0, s = c ? n.h : n.w, l = Number(new Date), i = u && d && n.animatingTo === n.last ? 0 : u && d ? n.limit - (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo : u && n.currentSlide === n.last ? n.limit : u ? (n.itemW + n.vars.itemMargin) * n.move * n.currentSlide : d ? (n.last - n.currentSlide + n.cloneOffset) * s : (n.currentSlide + n.cloneOffset) * s)
                    }, S = function (e) {
                        e.stopPropagation();
                        var a = e.target._slider;
                        if (a) {
                            var n = -e.translationX, r = -e.translationY;
                            o = g += c ? r : n, p = c ? Math.abs(g) < Math.abs(-n) : Math.abs(g) < Math.abs(-r), e.detail === e.MSGESTURE_FLAG_INERTIA ? setImmediate(function () {
                                t._gesture.stop()
                            }) : (!p || 500 < Number(new Date) - l) && (e.preventDefault(), !v && a.transitions && (a.vars.animationLoop || (o = g / (0 === a.currentSlide && 0 > g || a.currentSlide === a.last && g > 0 ? Math.abs(g) / s + 2 : 1)), a.setProps(i + o, "setTouch")))
                        }
                    }, y = function (t) {
                        if (t.stopPropagation(), t = t.target._slider) {
                            if (t.animatingTo === t.currentSlide && !p && null !== o) {
                                var n = d ? -o : o, r = n > 0 ? t.getTarget("next") : t.getTarget("prev");
                                t.canAdvance(r) && (550 > Number(new Date) - l && 50 < Math.abs(n) || Math.abs(n) > s / 2) ? t.flexAnimate(r, t.vars.pauseOnAction) : v || t.flexAnimate(t.currentSlide, t.vars.pauseOnAction, !0)
                            }
                            i = o = a = e = null, g = 0
                        }
                    }
                } else {
                    t.addEventListener("touchstart", x, !1);
                    var x = function (r) {
                        n.animating ? r.preventDefault() : (window.navigator.msPointerEnabled || 1 === r.touches.length) && (n.pause(), s = c ? n.h : n.w, l = Number(new Date), m = r.touches[0].pageX, f = r.touches[0].pageY, i = u && d && n.animatingTo === n.last ? 0 : u && d ? n.limit - (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo : u && n.currentSlide === n.last ? n.limit : u ? (n.itemW + n.vars.itemMargin) * n.move * n.currentSlide : d ? (n.last - n.currentSlide + n.cloneOffset) * s : (n.currentSlide + n.cloneOffset) * s, e = c ? f : m, a = c ? m : f, t.addEventListener("touchmove", b, !1), t.addEventListener("touchend", T, !1))
                    }, b = function (t) {
                        m = t.touches[0].pageX, f = t.touches[0].pageY, o = c ? e - f : e - m, p = c ? Math.abs(o) < Math.abs(m - a) : Math.abs(o) < Math.abs(f - a), (!p || 500 < Number(new Date) - l) && (t.preventDefault(), !v && n.transitions && (n.vars.animationLoop || (o /= 0 === n.currentSlide && 0 > o || n.currentSlide === n.last && o > 0 ? Math.abs(o) / s + 2 : 1), n.setProps(i + o, "setTouch")))
                    }, T = function (r) {
                        if (t.removeEventListener("touchmove", b, !1), n.animatingTo === n.currentSlide && !p && null !== o) {
                            r = d ? -o : o;
                            var c = r > 0 ? n.getTarget("next") : n.getTarget("prev");
                            n.canAdvance(c) && (550 > Number(new Date) - l && 50 < Math.abs(r) || Math.abs(r) > s / 2) ? n.flexAnimate(c, n.vars.pauseOnAction) : v || n.flexAnimate(n.currentSlide, n.vars.pauseOnAction, !0)
                        }
                        t.removeEventListener("touchend", T, !1), i = o = a = e = null
                    }
                }
            }, resize: function () {
                !n.animating && n.is(":visible") && (u || n.doMath(), v ? m.smoothHeight() : u ? (n.slides.width(n.computedW), n.update(n.pagingCount), n.setProps()) : c ? (n.viewport.height(n.h), n.setProps(n.h, "setTotal")) : (n.vars.smoothHeight && m.smoothHeight(), n.newSlides.width(n.computedW), n.setProps(n.computedW, "setTotal")))
            }, smoothHeight: function (e) {
                if (!c || v) {
                    var t = v ? n : n.viewport;
                    e ? t.animate({height: n.slides.eq(n.animatingTo).height()}, e) : t.height(n.slides.eq(n.animatingTo).height())
                }
            }, sync: function (t) {
                var a = e(n.vars.sync).data("flexslider"), i = n.animatingTo;
                switch (t) {
                    case"animate":
                        a.flexAnimate(i, n.vars.pauseOnAction, !1, !0);
                        break;
                    case"play":
                        a.playing || a.asNav || a.play();
                        break;
                    case"pause":
                        a.pause()
                }
            }, uniqueID: function (t) {
                return t.find("[id]").each(function () {
                    var t = e(this);
                    t.attr("id", t.attr("id") + "_clone")
                }), t
            }, pauseInvisible: {
                visProp: null, init: function () {
                    var e = ["webkit", "moz", "ms", "o"];
                    if ("hidden" in document) return "hidden";
                    for (var t = 0; t < e.length; t++) e[t] + "Hidden" in document && (m.pauseInvisible.visProp = e[t] + "Hidden");
                    m.pauseInvisible.visProp && (e = m.pauseInvisible.visProp.replace(/[H|h]idden/, "") + "visibilitychange", document.addEventListener(e, function () {
                        m.pauseInvisible.isHidden() ? n.startTimeout ? clearTimeout(n.startTimeout) : n.pause() : n.started ? n.play() : 0 < n.vars.initDelay ? setTimeout(n.play, n.vars.initDelay) : n.play()
                    }))
                }, isHidden: function () {
                    return document[m.pauseInvisible.visProp] || !1
                }
            }, setToClearWatchedEvent: function () {
                clearTimeout(i), i = setTimeout(function () {
                    l = ""
                }, 3e3)
            }
        }, n.flexAnimate = function (t, a, i, r, l) {
            if (n.vars.animationLoop || t === n.currentSlide || (n.direction = t > n.currentSlide ? "next" : "prev"), p && 1 === n.pagingCount && (n.direction = n.currentItem < t ? "next" : "prev"), !n.animating && (n.canAdvance(t, l) || i) && n.is(":visible")) {
                if (p && r) {
                    if (i = e(n.vars.asNavFor).data("flexslider"), n.atEnd = 0 === t || t === n.count - 1, i.flexAnimate(t, !0, !1, !0, l), n.direction = n.currentItem < t ? "next" : "prev", i.direction = n.direction, Math.ceil((t + 1) / n.visible) - 1 === n.currentSlide || 0 === t) return n.currentItem = t, n.slides.removeClass(s + "active-slide").eq(t).addClass(s + "active-slide"), !1;
                    n.currentItem = t, n.slides.removeClass(s + "active-slide").eq(t).addClass(s + "active-slide"), t = Math.floor(t / n.visible)
                }
                if (n.animating = !0, n.animatingTo = t, a && n.pause(), n.vars.before(n), n.syncExists && !l && m.sync("animate"), n.vars.controlNav && m.controlNav.active(), u || n.slides.removeClass(s + "active-slide").eq(t).addClass(s + "active-slide"), n.atEnd = 0 === t || t === n.last, n.vars.directionNav && m.directionNav.update(), t === n.last && (n.vars.end(n), n.vars.animationLoop || n.pause()), v) o ? (n.slides.eq(n.currentSlide).css({
                    opacity: 0,
                    zIndex: 1
                }), n.slides.eq(t).css({
                    opacity: 1,
                    zIndex: 2
                }), n.wrapup(f)) : (n.slides.eq(n.currentSlide).css({zIndex: 1}).animate({opacity: 0}, n.vars.animationSpeed, n.vars.easing), n.slides.eq(t).css({zIndex: 2}).animate({opacity: 1}, n.vars.animationSpeed, n.vars.easing, n.wrapup)); else {
                    var f = c ? n.slides.filter(":first").height() : n.computedW;
                    u ? (t = n.vars.itemMargin, t = (n.itemW + t) * n.move * n.animatingTo, t = t > n.limit && 1 !== n.visible ? n.limit : t) : t = 0 === n.currentSlide && t === n.count - 1 && n.vars.animationLoop && "next" !== n.direction ? d ? (n.count + n.cloneOffset) * f : 0 : n.currentSlide === n.last && 0 === t && n.vars.animationLoop && "prev" !== n.direction ? d ? 0 : (n.count + 1) * f : d ? (n.count - 1 - t + n.cloneOffset) * f : (t + n.cloneOffset) * f, n.setProps(t, "", n.vars.animationSpeed), n.transitions ? (n.vars.animationLoop && n.atEnd || (n.animating = !1, n.currentSlide = n.animatingTo), n.container.unbind("webkitTransitionEnd transitionend"), n.container.bind("webkitTransitionEnd transitionend", function () {
                        n.wrapup(f)
                    })) : n.container.animate(n.args, n.vars.animationSpeed, n.vars.easing, function () {
                        n.wrapup(f)
                    })
                }
                n.vars.smoothHeight && m.smoothHeight(n.vars.animationSpeed)
            }
        }, n.wrapup = function (e) {
            v || u || (0 === n.currentSlide && n.animatingTo === n.last && n.vars.animationLoop ? n.setProps(e, "jumpEnd") : n.currentSlide === n.last && 0 === n.animatingTo && n.vars.animationLoop && n.setProps(e, "jumpStart")), n.animating = !1, n.currentSlide = n.animatingTo, n.vars.after(n)
        }, n.animateSlides = function () {
            n.animating || n.flexAnimate(n.getTarget("next"))
        }, n.pause = function () {
            clearInterval(n.animatedSlides), n.animatedSlides = null, n.playing = !1, n.vars.pausePlay && m.pausePlay.update("play"), n.syncExists && m.sync("pause")
        }, n.play = function () {
            n.playing && clearInterval(n.animatedSlides), n.animatedSlides = n.animatedSlides || setInterval(n.animateSlides, n.vars.slideshowSpeed), n.started = n.playing = !0, n.vars.pausePlay && m.pausePlay.update("pause"), n.syncExists && m.sync("play")
        }, n.stop = function () {
            n.pause(), n.stopped = !0
        }, n.canAdvance = function (e, t) {
            var a = p ? n.pagingCount - 1 : n.last;
            return t ? !0 : p && n.currentItem === n.count - 1 && 0 === e && "prev" === n.direction ? !0 : p && 0 === n.currentItem && e === n.pagingCount - 1 && "next" !== n.direction ? !1 : e !== n.currentSlide || p ? n.vars.animationLoop ? !0 : n.atEnd && 0 === n.currentSlide && e === a && "next" !== n.direction ? !1 : n.atEnd && n.currentSlide === a && 0 === e && "next" === n.direction ? !1 : !0 : !1
        }, n.getTarget = function (e) {
            return n.direction = e, "next" === e ? n.currentSlide === n.last ? 0 : n.currentSlide + 1 : 0 === n.currentSlide ? n.last : n.currentSlide - 1
        }, n.setProps = function (e, t, a) {
            var i = function () {
                var a = e ? e : (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo;
                return -1 * function () {
                    if (u) return "setTouch" === t ? e : d && n.animatingTo === n.last ? 0 : d ? n.limit - (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo : n.animatingTo === n.last ? n.limit : a;
                    switch (t) {
                        case"setTotal":
                            return d ? (n.count - 1 - n.currentSlide + n.cloneOffset) * e : (n.currentSlide + n.cloneOffset) * e;
                        case"setTouch":
                            return e;
                        case"jumpEnd":
                            return d ? e : n.count * e;
                        case"jumpStart":
                            return d ? n.count * e : e;
                        default:
                            return e
                    }
                }() + "px"
            }();
            n.transitions && (i = c ? "translate3d(0," + i + ",0)" : "translate3d(" + i + ",0,0)", a = void 0 !== a ? a / 1e3 + "s" : "0s", n.container.css("-" + n.pfx + "-transition-duration", a), n.container.css("transition-duration", a)), n.args[n.prop] = i, (n.transitions || void 0 === a) && n.container.css(n.args), n.container.css("transform", i)
        }, n.setup = function (t) {
            if (v) n.slides.css({
                width: "100%",
                "float": "left",
                marginRight: "-100%",
                position: "relative"
            }), "init" === t && (o ? n.slides.css({
                opacity: 0,
                display: "block",
                webkitTransition: "opacity " + n.vars.animationSpeed / 1e3 + "s ease",
                zIndex: 1
            }).eq(n.currentSlide).css({opacity: 1, zIndex: 2}) : n.slides.css({
                opacity: 0,
                display: "block",
                zIndex: 1
            }).eq(n.currentSlide).css({zIndex: 2}).animate({opacity: 1}, n.vars.animationSpeed, n.vars.easing)), n.vars.smoothHeight && m.smoothHeight(); else {
                var a, i;
                "init" === t && (n.viewport = e('<div class="' + s + 'viewport"></div>').css({
                    overflow: "hidden",
                    position: "relative"
                }).appendTo(n).append(n.container), n.cloneCount = 0, n.cloneOffset = 0, d && (i = e.makeArray(n.slides).reverse(), n.slides = e(i), n.container.empty().append(n.slides))), n.vars.animationLoop && !u && (n.cloneCount = 2, n.cloneOffset = 1, "init" !== t && n.container.find(".clone").remove(), m.uniqueID(n.slides.first().clone().addClass("clone").attr("aria-hidden", "true")).appendTo(n.container), m.uniqueID(n.slides.last().clone().addClass("clone").attr("aria-hidden", "true")).prependTo(n.container)), n.newSlides = e(n.vars.selector, n), a = d ? n.count - 1 - n.currentSlide + n.cloneOffset : n.currentSlide + n.cloneOffset, c && !u ? (n.container.height(200 * (n.count + n.cloneCount) + "%").css("position", "absolute").width("100%"), setTimeout(function () {
                    n.newSlides.css({display: "block"}), n.doMath(), n.viewport.height(n.h), n.setProps(a * n.h, "init")
                }, "init" === t ? 100 : 0)) : (n.container.width(200 * (n.count + n.cloneCount) + "%"), n.setProps(a * n.computedW, "init"), setTimeout(function () {
                    n.doMath(), n.newSlides.css({
                        width: n.computedW,
                        "float": "left",
                        display: "block"
                    }), n.vars.smoothHeight && m.smoothHeight()
                }, "init" === t ? 100 : 0))
            }
            u || n.slides.removeClass(s + "active-slide").eq(n.currentSlide).addClass(s + "active-slide"), n.vars.init(n)
        }, n.doMath = function () {
            var e = n.slides.first(), t = n.vars.itemMargin, a = n.vars.minItems, i = n.vars.maxItems;
            n.w = void 0 === n.viewport ? n.width() : n.viewport.width(), n.h = e.height(), n.boxPadding = e.outerWidth() - e.width(), u ? (n.itemT = n.vars.itemWidth + t, n.minW = a ? a * n.itemT : n.w, n.maxW = i ? i * n.itemT - t : n.w, n.itemW = n.minW > n.w ? (n.w - t * (a - 1)) / a : n.maxW < n.w ? (n.w - t * (i - 1)) / i : n.vars.itemWidth > n.w ? n.w : n.vars.itemWidth, n.visible = Math.floor(n.w / n.itemW), n.move = 0 < n.vars.move && n.vars.move < n.visible ? n.vars.move : n.visible, n.pagingCount = Math.ceil((n.count - n.visible) / n.move + 1), n.last = n.pagingCount - 1, n.limit = 1 === n.pagingCount ? 0 : n.vars.itemWidth > n.w ? n.itemW * (n.count - 1) + t * (n.count - 1) : (n.itemW + t) * n.count - n.w - t) : (n.itemW = n.w, n.pagingCount = n.count, n.last = n.count - 1), n.computedW = n.itemW - n.boxPadding
        }, n.update = function (e, t) {
            n.doMath(), u || (e < n.currentSlide ? n.currentSlide += 1 : e <= n.currentSlide && 0 !== e && (n.currentSlide -= 1), n.animatingTo = n.currentSlide), n.vars.controlNav && !n.manualControls && ("add" === t && !u || n.pagingCount > n.controlNav.length ? m.controlNav.update("add") : ("remove" === t && !u || n.pagingCount < n.controlNav.length) && (u && n.currentSlide > n.last && (n.currentSlide -= 1, n.animatingTo -= 1), m.controlNav.update("remove", n.last))), n.vars.directionNav && m.directionNav.update()
        }, n.addSlide = function (t, a) {
            var i = e(t);
            n.count += 1, n.last = n.count - 1, c && d ? void 0 !== a ? n.slides.eq(n.count - a).after(i) : n.container.prepend(i) : void 0 !== a ? n.slides.eq(a).before(i) : n.container.append(i), n.update(a, "add"), n.slides = e(n.vars.selector + ":not(.clone)", n), n.setup(), n.vars.added(n)
        }, n.removeSlide = function (t) {
            var a = isNaN(t) ? n.slides.index(e(t)) : t;
            n.count -= 1, n.last = n.count - 1, isNaN(t) ? e(t, n.slides).remove() : c && d ? n.slides.eq(n.last).remove() : n.slides.eq(t).remove(), n.doMath(), n.update(a, "remove"), n.slides = e(n.vars.selector + ":not(.clone)", n), n.setup(), n.vars.removed(n)
        }, m.init()
    }, e(window).blur(function (e) {
        focused = !1
    }).focus(function (e) {
        focused = !0
    }), e.flexslider.defaults = {
        namespace: "flex-",
        selector: ".slides > li",
        animation: "fade",
        easing: "swing",
        direction: "horizontal",
        reverse: !1,
        animationLoop: !0,
        smoothHeight: !1,
        startAt: 0,
        slideshow: !0,
        slideshowSpeed: 7e3,
        animationSpeed: 600,
        initDelay: 0,
        randomize: !1,
        thumbCaptions: !1,
        pauseOnAction: !0,
        pauseOnHover: !1,
        pauseInvisible: !0,
        useCSS: !0,
        touch: !0,
        video: !1,
        controlNav: !0,
        directionNav: !0,
        prevText: "",
        nextText: "",
        keyboard: !0,
        multipleKeyboard: !1,
        mousewheel: !1,
        pausePlay: !1,
        pauseText: "Pause",
        playText: "Play",
        controlsContainer: "",
        manualControls: "",
        sync: "",
        asNavFor: "",
        itemWidth: 0,
        itemMargin: 0,
        minItems: 1,
        maxItems: 0,
        move: 0,
        allowOneSlide: !0,
        start: function () {
        },
        before: function () {
        },
        after: function () {
        },
        end: function () {
        },
        added: function () {
        },
        removed: function () {
        },
        init: function () {
        }
    }, e.fn.flexslider = function (t) {
        if (void 0 === t && (t = {}), "object" == typeof t) return this.each(function () {
            var a = e(this), n = a.find(t.selector ? t.selector : ".slides > li");
            1 === n.length && !0 === t.allowOneSlide || 0 === n.length ? (n.fadeIn(400), t.start && t.start(a)) : void 0 === a.data("flexslider") && new e.flexslider(this, t)
        });
        var a = e(this).data("flexslider");
        switch (t) {
            case"play":
                a.play();
                break;
            case"pause":
                a.pause();
                break;
            case"stop":
                a.stop();
                break;
            case"next":
                a.flexAnimate(a.getTarget("next"), !0);
                break;
            case"prev":
            case"previous":
                a.flexAnimate(a.getTarget("prev"), !0);
                break;
            default:
                "number" == typeof t && a.flexAnimate(t, !0)
        }
    }
}(jQuery);