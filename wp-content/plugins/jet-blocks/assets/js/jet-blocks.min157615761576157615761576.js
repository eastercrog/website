! function(h, m, o) {
    "use strict";
    var c = {
        init: function() {
            var e = {
                "jet-nav-menu.default": c.navMenu,
                "jet-search.default": c.searchBox,
                "jet-auth-links.default": c.authLinks,
                "jet-hamburger-panel.default": c.hamburgerPanel,
                "jet-blocks-cart.default": c.refreshCart
            };
            h.each(e, function(e, t) {
                m.hooks.addAction("frontend/element_ready/" + e, t)
            }), h(document).on("click.jetBlocks", ".jet-search__popup-trigger", c.searchPopupSwitch).on("click.jetBlocks", ".jet-search__popup-close", c.searchPopupSwitch), m.hooks.addAction("frontend/element_ready/section", c.setStickySection), h(document).on("ready", c.stickySection)
        },
        refreshCart: function(e) {
            if (o && window.JetBlocksEditor && window.JetBlocksEditor.activeSection) {
                var t = window.JetBlocksEditor.activeSection; - 1 !== ["cart_list_style", "cart_list_items_style", "cart_buttons_style"].indexOf(t) ? e.find(".jet-blocks-cart").addClass("jet-cart-hover") : e.find(".jet-blocks-cart").removeClass("jet-cart-hover"), h(".widget_shopping_cart_content").empty(), h(document.body).trigger("wc_fragment_refresh")
            }
        },
        navMenu: function(l) {
            if (!l.data("initialized")) {
                l.data("initialized", !0);
                var s, d = "jet-nav-hover",
                    n = "jet-nav-hover-out",
                    u = "jet-mobile-menu-active";
                l.find(".jet-nav:not(.jet-nav--vertical-sub-bottom)").hoverIntent({
                    over: function() {
                        h(this).addClass(d)
                    },
                    out: function() {
                        var e = h(this);
                        e.removeClass(d), e.addClass(n), setTimeout(function() {
                            e.removeClass(n)
                        }, 200)
                    },
                    timeout: 200,
                    selector: ".menu-item-has-children"
                }), c.mobileAndTabletCheck() ? (l.find(".jet-nav:not(.jet-nav--vertical-sub-bottom)").on("touchstart.jetNavMenu", ".menu-item > a", function(e) {
                    var t = h(e.currentTarget).closest(".menu-item");
                    t.data("offset", h(window).scrollTop()), t.data("elemOffset", t.offset().top)
                }), l.find(".jet-nav:not(.jet-nav--vertical-sub-bottom)").on("touchend.jetNavMenu", ".menu-item > a", function(e) {
                    var t, i, n, o, s, a, c, r;
                    if (e.preventDefault(), o = h(e.currentTarget), t = o.closest(".menu-item"), i = t.siblings(".menu-item.menu-item-has-children"), n = h("> a", t), s = h(".jet-nav__sub:first", t), a = t.data("offset"), c = t.data("elemOffset"), r = t.closest(".jet-hamburger-panel"), a !== h(window).scrollTop() || c !== t.offset().top) return !1;
                    i[0] && (i.removeClass(d), h(".menu-item-has-children", i).removeClass(d));
                    if (!h(".jet-nav__sub", t)[0] || t.hasClass(d)) return n.trigger("click"), window.location.href = n.attr("href"), l.find(".jet-nav-wrap").hasClass(u) && l.find(".jet-nav-wrap").removeClass(u), r[0] && r.hasClass("open-state") && (r.removeClass("open-state"), h("html").removeClass("jet-hamburger-panel-visible")), !1;
                    s[0] && t.addClass(d)
                }), h(document).on("touchstart.jetNavMenu", function(e) {
                    s = h(window).scrollTop()
                }), h(document).on("touchend.jetNavMenu", t)) : l.find(".jet-nav:not(.jet-nav--vertical-sub-bottom)").on("click.jetNavMenu", ".menu-item > a", function(e) {
                    var t = h(e.currentTarget).closest(".menu-item"),
                        i = t.closest(".jet-hamburger-panel");
                    t.hasClass("menu-item-has-children") && !t.hasClass(d) || i[0] && i.hasClass("open-state") && (i.removeClass("open-state"), h("html").removeClass("jet-hamburger-panel-visible"))
                }), l.find(".jet-nav--vertical-sub-bottom").on("click.jetNavMenu", ".menu-item > a", function(e) {
                    var t = h(e.currentTarget).closest(".menu-item"),
                        i = t.siblings(".menu-item.menu-item-has-children"),
                        n = h(".jet-nav__sub:first", t),
                        o = t.closest(".jet-hamburger-panel");
                    if (!t.hasClass("menu-item-has-children") || t.hasClass(d)) return l.find(".jet-nav-wrap").hasClass(u) && l.find(".jet-nav-wrap").removeClass(u), void(o[0] && o.hasClass("open-state") && (o.removeClass("open-state"), h("html").removeClass("jet-hamburger-panel-visible")));
                    e.preventDefault(), e.stopPropagation(), i[0] && (i.removeClass(d), h(".menu-item-has-children", i).removeClass(d), h(".jet-nav__sub", i).slideUp(200));
                    n[0] && (n.slideDown(200), t.addClass(d))
                }), h(document).on("click.jetNavMenu", function(e) {
                    if (!l.find(".jet-nav").hasClass("jet-nav--vertical-sub-bottom")) return;
                    t(e)
                }), h(".jet-nav__mobile-trigger", l).on("click.jetNavMenu", function(e) {
                    h(this).closest(".jet-nav-wrap").toggleClass(u)
                }), "ontouchend" in window ? h(document).on("touchend.jetMobileNavMenu", e) : h(document).on("click.jetMobileNavMenu", e), h(".jet-nav__mobile-close-btn", l).on("click.jetMobileNavMenu", function(e) {
                    h(this).closest(".jet-nav-wrap").removeClass(u)
                });
                var i = !1;
                o(), h(window).on("resize.jetMobileNavMenu", o), c.isEditMode() && l.data("initialized", !1)
            }

            function t(e) {
                var t = l.find(".jet-nav");
                if (("touchend" !== e.type || s === h(window).scrollTop()) && !h(e.target).closest(t).length) {
                    var i = h(".menu-item-has-children." + d, t);
                    i[0] && (i.removeClass(d), i.addClass(n), setTimeout(function() {
                        i.removeClass(n)
                    }, 200), t.hasClass("jet-nav--vertical-sub-bottom") && h(".jet-nav__sub", i).slideUp(200), e.stopPropagation())
                }
            }

            function e(e) {
                var t = l.find(".jet-nav-wrap").data("mobile-layout"),
                    i = l.find(".jet-nav-wrap"),
                    n = l.find(".jet-nav__mobile-trigger"),
                    o = l.find(".jet-nav");
                "left-side" !== t && "right-side" !== t || "touchend" === e.type && s !== h(window).scrollTop() || h(e.target).closest(n).length || h(e.target).closest(o).length || i.hasClass(u) && (i.removeClass(u), e.stopPropagation())
            }

            function o() {
                if ("full-width" === l.find(".jet-nav-wrap").data("mobile-layout")) {
                    var e = l.find(".jet-nav");
                    if ("mobile" === m.getCurrentDeviceMode()) {
                        i && e.css({
                            left: ""
                        });
                        var t = -e.offset().left;
                        e.css({
                            left: t
                        }), i = !0
                    } else i && (e.css({
                        left: ""
                    }), i = !1)
                }
            }
        },
        searchBox: function(a) {
            c.onSearchSectionActivated(a), h(document).on("click.jetBlocks", function(e) {
                var t = a.find(".jet-search"),
                    i = h(".jet-search__popup-trigger", t),
                    n = h(".jet-search__popup-content", t),
                    o = "jet-search-popup-active",
                    s = "jet-transition-out";
                h(e.target).closest(i).length || h(e.target).closest(n).length || t.hasClass(o) && (t.removeClass(o), t.addClass(s), setTimeout(function() {
                    t.removeClass(s)
                }, 300), e.stopPropagation())
            })
        },
        onSearchSectionActivated: function(e) {
            if (o && window.JetBlocksEditor && window.JetBlocksEditor.activeSection) {
                var t = window.JetBlocksEditor.activeSection; - 1 !== ["section_popup_style", "section_popup_close_style", "section_form_style"].indexOf(t) ? e.find(".jet-search").addClass("jet-search-popup-active") : e.find(".jet-search").removeClass("jet-search-popup-active")
            }
        },
        authLinks: function(e) {
            if (o && window.JetBlocksEditor) {
                if (!window.JetBlocksEditor.activeSection) return e.find(".jet-auth-links__logout").css("display", "none"), void e.find(".jet-auth-links__registered").css("display", "none");
                var t = window.JetBlocksEditor.activeSection,
                    i = -1 !== ["section_logout_link", "section_logout_link_style"].indexOf(t),
                    n = -1 !== ["section_registered_link", "section_registered_link_style"].indexOf(t);
                i ? e.find(".jet-auth-links__login").css("display", "none") : e.find(".jet-auth-links__logout").css("display", "none"), n ? e.find(".jet-auth-links__register").css("display", "none") : e.find(".jet-auth-links__registered").css("display", "none")
            }
        },
        hamburgerPanel: function(e) {
            var t, i, n = h(".jet-hamburger-panel", e),
                o = h(".jet-hamburger-panel__toggle", e),
                s = h(".jet-hamburger-panel__instance", e),
                a = h(".jet-hamburger-panel__cover", e),
                c = (h(".jet-hamburger-panel__inner", e), h(".jet-hamburger-panel__close-button", e)),
                r = (Boolean(m.isEditMode()), h("html"));
            "ontouchend" in window || "ontouchstart" in window ? (o.on("touchstart", function(e) {
                t = h(window).scrollTop()
            }), o.on("touchend", function(e) {
                if (t !== h(window).scrollTop()) return !1;
                i && clearTimeout(i), n.hasClass("open-state") ? (n.removeClass("open-state"), r.removeClass("jet-hamburger-panel-visible")) : (i = setTimeout(function() {
                    n.addClass("open-state")
                }, 10), r.addClass("jet-hamburger-panel-visible"))
            })) : o.on("click", function(e) {
                n.hasClass("open-state") ? (n.removeClass("open-state"), r.removeClass("jet-hamburger-panel-visible")) : (n.addClass("open-state"), r.addClass("jet-hamburger-panel-visible"))
            }), c.on("click", function(e) {
                n.hasClass("open-state") ? (n.removeClass("open-state"), r.removeClass("jet-hamburger-panel-visible")) : (n.addClass("open-state"), r.addClass("jet-hamburger-panel-visible"))
            }), h(document).on("click.JetHamburgerPanel", function(e) {
                (!h(e.target).closest(o).length && !h(e.target).closest(s).length || h(e.target).closest(a).length) && n.hasClass("open-state") && (n.removeClass("open-state"), h(e.target).closest(".jet-hamburger-panel__toggle").length || r.removeClass("jet-hamburger-panel-visible"), e.stopPropagation())
            })
        },
        searchPopupSwitch: function(e) {
            var t = h(this).closest(".jet-search"),
                i = h(".jet-search__field", t),
                n = "jet-search-popup-active",
                o = "jet-transition-in",
                s = "jet-transition-out";
            t.hasClass(n) ? (t.removeClass(n), t.addClass(s), setTimeout(function() {
                t.removeClass(s)
            }, 300)) : (t.addClass(o), setTimeout(function() {
                t.removeClass(o), t.addClass(n)
            }, 300), i.focus())
        },
        stickySection: function() {
            ({
                isEditMode: Boolean(m.isEditMode()),
                correctionSelector: h("#wpadminbar"),
                initDesktop: !1,
                initTablet: !1,
                initMobile: !1,
                init: function() {
                    this.isEditMode || (this.run(), h(window).on("resize.JetStickySection orientationchange.JetStickySection", this.run.bind(this)))
                },
                getOffset: function() {
                    var e = 0;
                    return this.correctionSelector[0] && "fixed" === this.correctionSelector.css("position") && (e = this.correctionSelector.outerHeight(!0)), e
                },
                run: function() {
                    var e = m.getCurrentDeviceMode(),
                        i = "jet-sticky-transition-in",
                        n = "jet-sticky-transition-out",
                        o = {
                            stickyClass: "jet-sticky-section--stuck",
                            topSpacing: this.getOffset()
                        };

                    function s(e, t) {
                        e.jetStickySection(t).on("jetStickySection:stick", function(e) {
                            h(e.target).addClass(i), setTimeout(function() {
                                h(e.target).removeClass(i)
                            }, 3e3)
                        }).on("jetStickySection:unstick", function(e) {
                            h(e.target).addClass(n), setTimeout(function() {
                                h(e.target).removeClass(n)
                            }, 3e3)
                        }), e.trigger("jetStickySection:activated")
                    }
                    "desktop" !== e || this.initDesktop || (this.initTablet && (c.getStickySectionsTablet.forEach(function(e, t) {
                        e.trigger("jetStickySection:detach")
                    }), this.initTablet = !1), this.initMobile && (c.getStickySectionsMobile.forEach(function(e, t) {
                        e.trigger("jetStickySection:detach")
                    }), this.initMobile = !1), c.getStickySectionsDesktop[0] && (c.getStickySectionsDesktop.forEach(function(e, t) {
                        c.getStickySectionsDesktop[t + 1] ? o.stopper = c.getStickySectionsDesktop[t + 1] : o.stopper = "", s(e, o)
                    }), this.initDesktop = !0)), "tablet" !== e || this.initTablet || (this.initDesktop && (c.getStickySectionsDesktop.forEach(function(e, t) {
                        e.trigger("jetStickySection:detach")
                    }), this.initDesktop = !1), this.initMobile && (c.getStickySectionsMobile.forEach(function(e, t) {
                        e.trigger("jetStickySection:detach")
                    }), this.initMobile = !1), c.getStickySectionsTablet[0] && (c.getStickySectionsTablet.forEach(function(e, t) {
                        c.getStickySectionsTablet[t + 1] ? o.stopper = c.getStickySectionsTablet[t + 1] : o.stopper = "", s(e, o)
                    }), this.initTablet = !0)), "mobile" !== e || this.initMobile || (this.initDesktop && (c.getStickySectionsDesktop.forEach(function(e, t) {
                        e.trigger("jetStickySection:detach")
                    }), this.initDesktop = !1), this.initTablet && (c.getStickySectionsTablet.forEach(function(e, t) {
                        e.trigger("jetStickySection:detach")
                    }), this.initTablet = !1), c.getStickySectionsMobile[0] && (c.getStickySectionsMobile.forEach(function(e, t) {
                        c.getStickySectionsMobile[t + 1] ? o.stopper = c.getStickySectionsMobile[t + 1] : o.stopper = "", s(e, o)
                    }), this.initMobile = !0))
                }
            }).init()
        },
        getStickySectionsDesktop: [],
        getStickySectionsTablet: [],
        getStickySectionsMobile: [],
        setStickySection: function(t) {
            ({
                target: t,
                isEditMode: Boolean(m.isEditMode()),
                init: function() {
                    if (!this.isEditMode && "yes" === this.getSectionSetting("jet_sticky_section")) {
                        var e = this.getSectionSetting("jet_sticky_section_visibility") || [];
                        if (!e[0]) return; - 1 !== e.indexOf("desktop") && c.getStickySectionsDesktop.push(t), -1 !== e.indexOf("tablet") && c.getStickySectionsTablet.push(t), -1 !== e.indexOf("mobile") && c.getStickySectionsMobile.push(t)
                    }
                },
                getSectionSetting: function(e) {
                    var t = {};
                    if (Boolean(m.isEditMode())) {
                        if (!m.hasOwnProperty("config")) return;
                        if (!m.config.hasOwnProperty("elements")) return;
                        if (!m.config.elements.hasOwnProperty("data")) return;
                        var i = this.target.data("model-cid"),
                            n = m.config.elements.data[i];
                        if (!n) return;
                        if (!n.hasOwnProperty("attributes")) return;
                        t = n.attributes || {}
                    } else t = this.target.data("settings") || {};
                    if (t[e]) return t[e]
                }
            }).init()
        },
        mobileAndTabletCheck: function() {
            var e, t = !1;
            return e = navigator.userAgent || navigator.vendor || window.opera, (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4))) && (t = !0), t
        },
        isEditMode: function() {
            return Boolean(m.isEditMode())
        }
    };
    h(window).on("elementor/frontend/init", c.init)
}(jQuery, window.elementorFrontend, window.elementor);