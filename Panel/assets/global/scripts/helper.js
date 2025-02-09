/**
Core script to handle the entire theme and core functions
**/
var Helper = function () {

    // IE mode
    var isRTL = false;
    var isIE8 = false;
    var isIE9 = false;
    var isIE10 = false;

    var resizeHandlers = [];

    var globalImgPath = '../../assets/global/img/';

    // theme layout color set

    var brandColors = {
        'blue': '#89C4F4',
        'red': '#F3565D',
        'green': '#1bbc9b',
        'purple': '#9b59b6',
        'grey': '#95a5a6',
        'yellow': '#F8CB00'
    };

    // initializes main settings
    var handleInit = function () {

        if ($('body').css('direction') === 'rtl') {
            isRTL = true;
        }

        isIE8 = !! navigator.userAgent.match(/MSIE 8.0/);
        isIE9 = !! navigator.userAgent.match(/MSIE 9.0/);
        isIE10 = !! navigator.userAgent.match(/MSIE 10.0/);

        if (isIE10) {
            jQuery('html').addClass('ie10'); // detect IE10 version
        }
        
        if (isIE10 || isIE9 || isIE8) {
            jQuery('html').addClass('ie'); // detect IE10 version
        }
    }

    // runs callback functions set by Helper.addResponsiveHandler().
    var _runResizeHandlers = function () {
        // reinitialize other subscribed elements
        for (var i = 0; i < resizeHandlers.length; i++) {
            var each = resizeHandlers[i];
            each.call();
        }
    }

    // handle the layout reinitialization on window resize
    var handleOnResize = function () {
        var resize;
        if (isIE8) {
            var currheight;
            $(window).resize(function () {
                if (currheight == document.documentElement.clientHeight) {
                    return; //quite event since only body resized not window.
                }
                if (resize) {
                    clearTimeout(resize);
                }
                resize = setTimeout(function () {
                    _runResizeHandlers();
                }, 50); // wait 50ms until window resize finishes.                
                currheight = document.documentElement.clientHeight; // store last body client height
            });
        } else {
            $(window).resize(function () {
                if (resize) {
                    clearTimeout(resize);
                }
                resize = setTimeout(function () {
                    _runResizeHandlers();
                }, 50); // wait 50ms until window resize finishes.
            });
        }
    }

    // Handles portlet tools & actions
    var handlePortletTools = function () {
        jQuery('body').on('click', '.portlet > .portlet-title > .tools > a.remove', function (e) {
            e.preventDefault();
            jQuery(this).closest(".portlet").remove();
        });

        jQuery('body').on('click', '.portlet > .portlet-title > .tools > a.reload', function (e) {
            e.preventDefault();
            var el = jQuery(this).closest(".portlet").children(".portlet-body");
            var url = jQuery(this).attr("data-url");
            var error = $(this).attr("data-error-display");
            if (url) {
                Helper.blockUI({target: el, iconOnly: true});
                $.ajax({
                    type: "GET",
                    cache: false,
                    url: url,
                    dataType: "html",
                    success: function(res) 
                    {                        
                        Helper.unblockUI(el);
                        el.html(res);
                    },
                    error: function(xhr, ajaxOptions, thrownError)
                    {
                        Helper.unblockUI(el);
                        var msg = 'Error on reloading the content. Please check your connection and try again.';
                        if (error == "toastr" && toastr) {
                            toastr.error(msg);
                        } else if (error == "notific8" && $.notific8) {
                            $.notific8('zindex', 11500);
                            $.notific8(msg, {theme: 'ruby', life: 3000});
                        } else {
                            alert(msg);
                        }
                    }
                });
            } else {
                // for demo purpose
                Helper.blockUI({target: el, iconOnly: true});
                window.setTimeout(function () {
                    Helper.unblockUI(el);
                }, 1000);
            }            
        });

        // load ajax data on page init
        $('.portlet .portlet-title a.reload[data-load="true"]').click();

        jQuery('body').on('click', '.portlet > .portlet-title > .tools > .collapse, .portlet .portlet-title > .tools > .expand', function (e) {
            e.preventDefault();
            var el = jQuery(this).closest(".portlet").children(".portlet-body");
            if (jQuery(this).hasClass("collapse")) {
                jQuery(this).removeClass("collapse").addClass("expand");
                el.slideUp(200);
            } else {
                jQuery(this).removeClass("expand").addClass("collapse");
                el.slideDown(200);
            }
        });
    }

    // Handles custom checkboxes & radios using jQuery Uniform plugin
    var handleUniform = function () {
        if (!jQuery().uniform) {
            return;
        }
        var test = $("input[type=checkbox]:not(.toggle, .make-switch), input[type=radio]:not(.toggle, .star, .make-switch)");
        if (test.size() > 0) {
            test.each(function () {
                if ($(this).parents(".checker").size() == 0) {
                    $(this).show();
                    $(this).uniform();
                }
            });
        }
    }

    var handleBootstrapSwitch = function () {
        if (!jQuery().bootstrapSwitch) {
            return;
        }
        $('.make-switch').bootstrapSwitch();
    }

    // Handles Bootstrap Accordions.
    var handleAccordions = function () {
        jQuery('body').on('shown.bs.collapse', '.accordion.scrollable', function (e) {
            Helper.scrollTo($(e.target));
        });
    }

    // Handles Bootstrap Tabs.
    var handleTabs = function () {
        //activate tab if tab id provided in the URL
        if (location.hash) {
            var tabid = location.hash.substr(1);
            $('a[href="#' + tabid + '"]').parents('.tab-pane:hidden').each(function(){
                var tabid = $(this).attr("id");
                $('a[href="#' + tabid + '"]').click();    
            });            
            $('a[href="#' + tabid + '"]').click();
        }
    }

    // Handles Bootstrap Modals.
    var handleModals = function () {
        // fix stackable modal issue: when 2 or more modals opened, closing one of modal will remove .modal-open class. 
        $('body').on('hide.bs.modal', function () {
           if ($('.modal:visible').size() > 1 && $('html').hasClass('modal-open') == false) {
              $('html').addClass('modal-open');
           } else if ($('.modal:visible').size() <= 1) {
              $('html').removeClass('modal-open');
           }
        });
            
        $('body').on('show.bs.modal', '.modal', function () {
            if ($(this).hasClass("modal-scroll")) {
                $('body').addClass("modal-open-noscroll");
            } 
        });

        $('body').on('hide.bs.modal', '.modal', function () {
            $('body').removeClass("modal-open-noscroll");
        });
    }

    // Handles Bootstrap Tooltips.
    var handleTooltips = function () {
       jQuery('.tooltips').tooltip();
    }

    // Handles Bootstrap Dropdowns
    var handleDropdowns = function () {
        /*
          Hold dropdown on click  
        */
        $('body').on('click', '.dropdown-menu.hold-on-click', function (e) {
            e.stopPropagation();
        });
    }

    var handleAlerts = function () {
        $('body').on('click', '[data-close="alert"]', function(e){
            $(this).parent('.alert').hide();
            e.preventDefault();
        });
    }

    // Handle Hower Dropdowns
    var handleDropdownHover = function () {
        $('[data-hover="dropdown"]').dropdownHover();
    }

    // Handles Bootstrap Popovers

    // last popep popover
    var lastPopedPopover;

    var handlePopovers = function () {
        jQuery('.popovers').popover();

        // close last displayed popover

        $(document).on('click.bs.popover.data-api', function (e) {
            if (lastPopedPopover) {
                lastPopedPopover.popover('hide');
            }
        });
    }

    // Handles scrollable contents using jQuery SlimScroll plugin.
    var handleScrollers = function () {
        $('.scroller').each(function () {
            if ($(this).attr("data-initialized")) {
                return; // exit
            }
            var height;
            if ($(this).attr("data-height")) {
                height = $(this).attr("data-height");
            } else {
                height = $(this).css('height');
            }
            $(this).slimScroll({
                allowPageScroll: true, // allow page scroll when the element scroll is ended
                size: '7px',
                color: ($(this).attr("data-handle-color")  ? $(this).attr("data-handle-color") : '#bbb'),
                railColor: ($(this).attr("data-rail-color")  ? $(this).attr("data-rail-color") : '#eaeaea'),
                position: isRTL ? 'left' : 'right',
                height: height,
                alwaysVisible: ($(this).attr("data-always-visible") == "1" ? true : false),
                railVisible: ($(this).attr("data-rail-visible") == "1" ? true : false),
                disableFadeOut: true
            });
            $(this).attr("data-initialized", true);
        });
    }

    // Handles Image Preview using jQuery Fancybox plugin
    var handleFancybox = function () {
        if (!jQuery.fancybox) {
            return;
        }

        if (jQuery(".fancybox-button").size() > 0) {
            jQuery(".fancybox-button").fancybox({
                groupAttr: 'data-rel',
                prevEffect: 'none',
                nextEffect: 'none',
                closeBtn: true,
                helpers: {
                    title: {
                        type: 'inside'
                    }
                }
            });
        }
    }

    // Fix input placeholder issue for IE8 and IE9
    var handleFixInputPlaceholderForIE = function () {
        //fix html5 placeholder attribute for ie7 & ie8
        if (isIE8 || isIE9) { // ie8 & ie9
            // this is html5 placeholder fix for inputs, inputs with placeholder-no-fix class will be skipped(e.g: we need this for password fields)
            jQuery('input[placeholder]:not(.placeholder-no-fix), textarea[placeholder]:not(.placeholder-no-fix)').each(function () {

                var input = jQuery(this);

                if (input.val() == '' && input.attr("placeholder") != '') {
                    input.addClass("placeholder").val(input.attr('placeholder'));
                }

                input.focus(function () {
                    if (input.val() == input.attr('placeholder')) {
                        input.val('');
                    }
                });

                input.blur(function () {
                    if (input.val() == '' || input.val() == input.attr('placeholder')) {
                        input.val(input.attr('placeholder'));
                    }
                });
            });
        }
    }

    // Handle Select2 Dropdowns
    var handleSelect2 = function() {
        if (jQuery().select2) {
            $('.select2me').select2({
                placeholder: "Select",
                allowClear: true
            });
        }
    }

    //* END:CORE HANDLERS *//

    return {

        //main function to initiate the theme
        init: function () {
            //IMPORTANT!!!: Do not modify the core handlers call order.

            //Core handlers
            handleInit(); // initialize core variables
            handleOnResize(); // set and handle responsive    
            
            //UI Component handlers            
            handleUniform(); // hanfle custom radio & checkboxes
            handleBootstrapSwitch(); // handle bootstrap switch plugin
            handleScrollers(); // handles slim scrolling contents 
            handleFancybox() // handle fancy box
            handleSelect2(); // handle custom Select2 dropdowns
            handlePortletTools(); // handles portlet action bar functionality(refresh, configure, toggle, remove)
            handleAlerts(); //handle closabled alerts
            handleDropdowns(); // handle dropdowns
            handleTabs(); // handle tabs
            handleTooltips(); // handle bootstrap tooltips
            handlePopovers(); // handles bootstrap popovers
            handleAccordions(); //handles accordions 
            handleModals(); // handle modals
        },

        //main function to initiate core javascript after ajax complete
        initAjax: function () {
            handleScrollers(); // handles slim scrolling contents 
            handleSelect2(); // handle custom Select2 dropdowns
            handleDropdowns(); // handle dropdowns
            handleTooltips(); // handle bootstrap tooltips
            handlePopovers(); // handles bootstrap popovers
            handleAccordions(); //handles accordions 
            handleUniform(); // hanfle custom radio & checkboxes     
            handleBootstrapSwitch(); // handle bootstrap switch plugin
            handleDropdownHover() // handles dropdown hover       
        },
        
        //public function to remember last opened popover that needs to be closed on click
        setLastPopedPopover: function (el) {
            lastPopedPopover = el;
        },

        //public function to add callback a function which will be called on window resize
        addResizeHandler: function (func) {
            resizeHandlers.push(func);
        },

        //public functon to call _runresizeHandlers
        runResizeHandlers: function() {
            _runResizeHandlers();   
        },
        
        // wrHelperer function to scroll(focus) to an element
        scrollTo: function (el, offeset) {
            var pos = (el && el.size() > 0) ? el.offset().top : 0;

             if (el) {
                if ($('body').hasClass('page-header-fixed')) { 
                    pos = pos - $('.page-header').height(); 
                }            
                pos = pos + (offeset ? offeset : -1 * el.height());
            }

            jQuery('html,body').animate({
                scrollTop: pos
            }, 'slow');
        },

        // function to scroll to the top
        scrollTop: function () {
            Helper.scrollTo();
        },

        // wrHelperer function to  block element(indicate loading)
        blockUI: function (options) {
            var options = $.extend(true, {}, options);
            var html = '';
            if (options.iconOnly) {
                html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '')+'"><img src="' + this.getGlobalImgPath() + 'loading-spinner-grey.gif" align=""></div>';
            } else if (options.textOnly) {
                html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '')+'"><span>&nbsp;&nbsp;' + (options.message ? options.message : 'LOADING...') + '</span></div>';
            } else {    
                html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '')+'"><img src="' + this.getGlobalImgPath() + 'loading-spinner-grey.gif" align=""><span>&nbsp;&nbsp;' + (options.message ? options.message : 'LOADING...') + '</span></div>';
            }

            if (options.target) { // element blocking
                var el = jQuery(options.target);
                if (el.height() <= ($(window).height())) {
                    options.cenrerY = true;
                }            
                el.block({
                    message: html,
                    baseZ: options.zIndex ? options.zIndex : 1000,
                    centerY: options.cenrerY != undefined ? options.cenrerY : false,
                    css: {
                        top: '10%',
                        border: '0',
                        padding: '0',
                        backgroundColor: 'none'
                    },
                    overlayCSS: {
                        backgroundColor: options.overlayColor ? options.overlayColor : '#000',
                        opacity: options.boxed ? 0.05 : 0.1, 
                        cursor: 'wait'
                    }
                });
            } else { // page blocking
                $.blockUI({
                    message: html,
                    baseZ: options.zIndex ? options.zIndex : 1000,
                    css: {
                        border: '0',
                        padding: '0',
                        backgroundColor: 'none'
                    },
                    overlayCSS: {
                        backgroundColor: options.overlayColor ? options.overlayColor : '#000',
                        opacity: options.boxed ? 0.05 : 0.1,
                        cursor: 'wait'
                    }
                });
            }            
        },

        // wrHelperer function to  un-block element(finish loading)
        unblockUI: function (target) {
            if (target) {
                jQuery(target).unblock({
                    onUnblock: function () {
                        jQuery(target).css('position', '');
                        jQuery(target).css('zoom', '');
                    }
                });
            } else {
                $.unblockUI();
            }
        },

        startPageLoading: function(message) {
            $('.page-loading').remove();
            $('body').append('<div class="page-loading"><img src="' + this.getGlobalImgPath() + 'loading-spinner-grey.gif"/>&nbsp;&nbsp;<span>' + (message ? message : 'Loading...') + '</span></div>');
        },

        stopPageLoading: function() {
            $('.page-loading').remove();
        },

        alert: function(options) {

            options = $.extend(true, {
                container: "", // alerts parent container(by default placed after the page breadcrumbs)
                place: "append", // append or prepent in container 
                type: 'success',  // alert's type
                message: "",  // alert's message
                close: true, // make alert closable
                reset: true, // close all previouse alerts first
                focus: true, // auto scroll to the alert after shown
                closeInSeconds: 0, // auto close after defined seconds
                icon: "" // put icon before the message
            }, options);

            var id = Helper.getUniqueID("Helper_alert");

            var html = '<div id="'+id+'" class="Helper-alerts alert alert-'+options.type+' fade in">' + (options.close ? '<button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button>' : '' ) + (options.icon != "" ? '<i class="fa-lg fa fa-'+options.icon + '"></i>  ' : '') + options.message+'</div>'

            if (options.reset) {0
                $('.Helper-alerts').remove();
            }

            if (!options.container) {
                $('.page-breadcrumb').after(html);
            } else {
                if (options.place == "append") {
                    $(options.container).append(html);
                } else {
                    $(options.container).prepend(html);
                }
            }

            if (options.focus) {
                Helper.scrollTo($('#' + id));
            }

            if (options.closeInSeconds > 0) {
                setTimeout(function(){
                    $('#' + id).remove();
                }, options.closeInSeconds * 1000);
            }
        },

        // initializes uniform elements
        initUniform: function (els) {
            if (els) {
                jQuery(els).each(function () {
                    if ($(this).parents(".checker").size() == 0) {
                        $(this).show();
                        $(this).uniform();
                    }
                });
            } else {
                handleUniform();
            }
        },

        //wrHelperer function to update/sync jquery uniform checkbox & radios
        updateUniform: function (els) {
            $.uniform.update(els); // update the uniform checkbox & radios UI after the actual input control state changed
        },

        //public function to initialize the fancybox plugin
        initFancybox: function () {
            handleFancybox();
        },

        //public helper function to get actual input value(used in IE9 and IE8 due to placeholder attribute not supported)
        getActualVal: function (el) {
            var el = jQuery(el);
            if (el.val() === el.attr("placeholder")) {
                return "";
            }
            return el.val();
        },

        //public function to get a paremeter by name from URL
        getURLParameter: function (paramName) {
            var searchString = window.location.search.substring(1),
                i, val, params = searchString.split("&");

            for (i = 0; i < params.length; i++) {
                val = params[i].split("=");
                if (val[0] == paramName) {
                    return unescape(val[1]);
                }
            }
            return null;
        },

        // check for device touch support
        isTouchDevice: function () {
            try {
                document.createEvent("TouchEvent");
                return true;
            } catch (e) {
                return false;
            }
        },

        // To get the correct viewport width based on  http://andylangton.co.uk/articles/javascript/get-viewport-size-javascript/
        getViewPort: function () {
            var e = window, a = 'inner';
            if (!('innerWidth' in window)) {
                a = 'client';
                e = document.documentElement || document.body;
            }
            return {
                width: e[a + 'Width'],
                height: e[a + 'Height']
            }
        },

        getUniqueID: function(prefix) {
            return 'prefix_' + Math.floor(Math.random() * (new Date()).getTime());
        },

        // check IE8 mode
        isIE8: function () {
            return isIE8;
        },

        // check IE9 mode
        isIE9: function () {
            return isIE9;
        },

        //check RTL mode
        isRTL: function () {
            return isRTL;
        },

        getGlobalImgPath: function () {
            return globalImgPath;
        },

        // get layout color code by color name
        getBrandColor: function (name) {
            if (brandColors[name]) {
                return brandColors[name];
            } else {
                return '';
            }
        }

    };

}();




/**
Core script to handle the entire theme and core functions
**/
var Layout = function () {

    var layoutImgPath = 'assets/admin/layout/img/';

    // ios vertual keyboard issue fix
    var handleIOSKeyboard = function () {
        /*
          Virtual keyboards:
          Also, note that if you're using inputs in your modal – iOS has a rendering bug which doesn't 
          update the position of fixed elements when the virtual keyboard is triggered  
        */
        var deviceAgent = navigator.userAgent.toLowerCase();
        if (deviceAgent.match(/(iphone|ipod|ipad)/)) {
            $(document).on('focus', 'input, textarea', function () {
                $('.page-header').hide();
                $('.page-footer').hide();
            });
            $(document).on('blur', 'input, textarea', function () {
                $('.page-header').show();
                $('.page-footer').show();
            });
        }
    }

    //* BEGIN:CORE HANDLERS *//
    // this function handles responsive layout on screen size resize or mobile device rotate.

    // Set proper height for sidebar and content. The content and sidebar height must be synced always.
    var handleSidebarAndContentHeight = function () {
        var content = $('.page-content');
        var sidebar = $('.page-sidebar');
        var body = $('body');
        var height;

        if (body.hasClass("page-footer-fixed") === true && body.hasClass("page-sidebar-fixed") === false) {
            var available_height = $(window).height() - $('.page-footer').outerHeight() - $('.page-header').outerHeight();
            if (content.height() < available_height) {
                content.attr('style', 'min-height:' + available_height + 'px');
            }
        } else {
            if (body.hasClass('page-sidebar-fixed')) {
                height = _calculateFixedSidebarViewportHeight();
                if (body.hasClass('page-footer-fixed') === false) {
                    height = height - $('.page-footer').outerHeight();
                }                 
            } else {
                height = sidebar.height() + 20;
                var headerHeight = $('.page-header').outerHeight();
                var footerHeight = $('.page-footer').outerHeight();                
                if ($(window).width() > 1024 && (height + headerHeight + footerHeight)  < $(window).height()) {
                    height = $(window).height() - headerHeight - footerHeight;
                }
            }            
            if (height >= content.height()) {
                content.attr('style', 'min-height:' + height + 'px'); 
            }
        }
    }

    // Handle sidebar menu
    var handleSidebarMenu = function () {
        jQuery('.page-sidebar').on('click', 'li > a', function (e) {
            if ($(this).next().hasClass('sub-menu') == false) {
                if ($('.btn-navbar').hasClass('collapsed') == false) {
                    $('.btn-navbar').click();
                }
                return;
            }

            if ($(this).next().hasClass('sub-menu always-open')) {
                return;
            }

            var parent = $(this).parent().parent();
            var the = $(this);
            var menu = $('.page-sidebar-menu');
            var sub = jQuery(this).next();

            var autoScroll = menu.data("auto-scroll") ? menu.data("auto-scroll") : true;
            var slideSpeed = menu.data("slide-speed") ? parseInt(menu.data("slide-speed")) : 200;

            parent.children('li.open').children('a').children('.arrow').removeClass('open');
            parent.children('li.open').children('.sub-menu:not(.always-open)').slideUp(200);
            parent.children('li.open').removeClass('open');
            
            var slideOffeset = -200;

            if (sub.is(":visible")) {
                jQuery('.arrow', jQuery(this)).removeClass("open");
                jQuery(this).parent().removeClass("open");
                sub.slideUp(slideSpeed, function () {
                    if (autoScroll == true && $('body').hasClass('page-sidebar-closed') == false) {
                        if ($('body').hasClass('page-sidebar-fixed')) {
                            menu.slimScroll({'scrollTo': (the.position()).top});
                        } else {
                            Helper.scrollTo(the, slideOffeset);
                        }
                    }
                    handleSidebarAndContentHeight();
                });
            } else {
                jQuery('.arrow', jQuery(this)).addClass("open");
                jQuery(this).parent().addClass("open");
                sub.slideDown(slideSpeed, function () {
                    if (autoScroll == true && $('body').hasClass('page-sidebar-closed') == false) {
                        if ($('body').hasClass('page-sidebar-fixed')) {
                            menu.slimScroll({'scrollTo': (the.position()).top});
                        } else {
                            Helper.scrollTo(the, slideOffeset);
                        }
                    }
                    handleSidebarAndContentHeight();
                });
            }

            e.preventDefault();
        });

        // handle ajax links within sidebar menu
        jQuery('.page-sidebar').on('click', ' li > a.ajaxify', function (e) {
            e.preventDefault();
            Helper.scrollTop();

            var url = $(this).attr("href");
            var menuContainer = jQuery('.page-sidebar ul');
            var pageContent = $('.page-content');
            var pageContentBody = $('.page-content .page-content-body');

            menuContainer.children('li.active').removeClass('active');
            menuContainer.children('arrow.open').removeClass('open');

            $(this).parents('li').each(function () {
                $(this).addClass('active');
                $(this).children('a > span.arrow').addClass('open');
            });
            $(this).parents('li').addClass('active');

            Helper.startPageLoading();
            
            if ($(window).width() <= 991 && $('.page-sidebar').hasClass("in")) {
                $('.navbar-toggle').click();
            }

            $.ajax({
                type: "GET",
                cache: false,
                url: url,
                dataType: "html",
                success: function (res) {
                    Helper.stopPageLoading();
                    pageContentBody.html(res);
                    Layout.fixContentHeight(); // fix content height
                    Helper.initAjax(); // initialize core stuff
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    Helper.stopPageLoading();
                    pageContentBody.html('<h4>Could not load the requested content.</h4>');                    
                }
            });
        });

        // handle ajax link within main content
        jQuery('.page-content').on('click', '.ajaxify', function (e) {
            e.preventDefault();
            Helper.scrollTop();

            var url = $(this).attr("href");
            var pageContent = $('.page-content');
            var pageContentBody = $('.page-content .page-content-body');

            Helper.startPageLoading();
            
            if ($(window).width() <= 991 && $('.page-sidebar').hasClass("in")) {
                $('.navbar-toggle').click();
            }

            $.ajax({
                type: "GET",
                cache: false,
                url: url,
                dataType: "html",
                success: function (res) {
                    Helper.stopPageLoading();
                    pageContentBody.html(res);
                    Layout.fixContentHeight(); // fix content height
                    Helper.initAjax(); // initialize core stuff
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    pageContentBody.html('<h4>Could not load the requested content.</h4>');
                    Helper.stopPageLoading();
                }
            });
        });
    }

    // Helper function to calculate sidebar height for fixed sidebar layout.
    var _calculateFixedSidebarViewportHeight = function () {
        var sidebarHeight = $(window).height() - $('.page-header').outerHeight();
        if ($('body').hasClass("page-footer-fixed")) { 
            sidebarHeight = sidebarHeight - $('.page-footer').outerHeight(); 
        }

        return sidebarHeight;
    }

    // Handles fixed sidebar
    var handleFixedSidebar = function () {
        var menu = $('.page-sidebar-menu');

        if (menu.parent('.slimScrollDiv').size() === 1) { // destroy existing instance before updating the height
            menu.slimScroll({
                destroy: true
            });
            menu.removeAttr('style');
            $('.page-sidebar').removeAttr('style');
        }

        if ($('.page-sidebar-fixed').size() === 0) {
            handleSidebarAndContentHeight();
            return;
        }
        
        var viewport = Helper.getViewPort();
        if (viewport.width >= 992) {
            var sidebarHeight = _calculateFixedSidebarViewportHeight();

            menu.slimScroll({
                size: '7px',
                color: '#a1b2bd',
                opacity: .3,
                position: Helper.isRTL() ? 'left' : 'right',
                height: sidebarHeight,
                allowPageScroll: false,
                disableFadeOut: false
            });
            handleSidebarAndContentHeight();
        }
    }

    // Handles sidebar toggler to close/hide the sidebar.
    var _initFixedSidebarHoverEffect = function() {
        var body = $('body');
        if (body.hasClass('page-sidebar-fixed')) {
            $('.page-sidebar-menu').on('mouseenter', function(){
                if (body.hasClass('page-sidebar-closed')) {
                    $(this).removeClass('page-sidebar-menu-closed');
                }
            }).on('mouseleave', function(){
                if (body.hasClass('page-sidebar-closed')) {
                    $(this).addClass('page-sidebar-menu-closed');
                }
            });
        }
    }

    // Hanles sidebar toggler
    var handleSidebarToggler = function () {
        var viewport = Helper.getViewPort();
        var body = $('body');
        if ($.cookie && $.cookie('sidebar_closed') === '1' && viewport.width >= 992) {
            $('body').addClass('page-sidebar-closed');
            $('.page-sidebar-menu').addClass('page-sidebar-menu-closed');
        }

        // handle sidebar show/hide
        $('.page-sidebar, .page-header').on('click', '.sidebar-toggler', function (e) {

            setTimeout(function(){}, 500);

            var sidebar = $('.page-sidebar');
            var sidebarMenu = $('.page-sidebar-menu');
            $(".sidebar-search", sidebar).removeClass("open");

            if (body.hasClass("page-sidebar-closed")) {
                body.removeClass("page-sidebar-closed");
                sidebarMenu.removeClass("page-sidebar-menu-closed");
                if ($.cookie) {
                    $.cookie('sidebar_closed', '0');
                }
            } else {
                body.addClass("page-sidebar-closed");
                sidebarMenu.addClass("page-sidebar-menu-closed");
                if ($.cookie) {
                    $.cookie('sidebar_closed', '1');
                }
            }

            $(window).trigger('resize');
        });

        _initFixedSidebarHoverEffect();

        // handle the search bar close
        $('.page-sidebar').on('click', '.sidebar-search .remove', function (e) {
            e.preventDefault();
            $('.sidebar-search').removeClass("open");
        });

        // handle the search query submit on enter press
        $('.page-sidebar .sidebar-search').on('keypress', 'input.form-control', function (e) {
            if (e.which == 13) {
                $('.sidebar-search').submit();
                return false; //<---- Add this line
            }
        });

        // handle the search submit(for sidebar search and responsive mode of the header search)
        $('.sidebar-search .submit').on('click', function (e) {
            e.preventDefault();
            if ($('body').hasClass("page-sidebar-closed")) {
                if ($('.sidebar-search').hasClass('open') == false) {
                    if ($('.page-sidebar-fixed').size() === 1) {
                        $('.page-sidebar .sidebar-toggler').click(); //trigger sidebar toggle button
                    }
                    $('.sidebar-search').addClass("open");
                } else {
                    $('.sidebar-search').submit();
                }
            } else {
                $('.sidebar-search').submit();
            }
        });
    }

    // Handles the horizontal menu
    var handleHorizontalMenu = function () {
        //handle tab click
        $('.page-header').on('click', '.hor-menu a[data-toggle="tab"]', function (e) {     
            e.preventDefault();
            var nav = $(".hor-menu .nav");
            var active_link = nav.find('li.current');
            $('li.active', active_link).removeClass("active");
            $('.selected', active_link).remove();
            var new_link = $(this).parents('li').last();
            new_link.addClass("current");
            new_link.find("a:first").append('<span class="selected"></span>');
        });

        // handle search box expand/collapse        
        $('.page-header').on('click', '.search-form', function (e) {
            $(this).addClass("open");
            $(this).find('.form-control').focus();

            $('.page-header .search-form .form-control').on('blur', function(e){
                $(this).closest('.search-form').removeClass("open");
                $(this).unbind("blur");
            });
        });

        // handle hor menu search form on enter press
        $('.page-header').on('keypress', '.hor-menu .search-form .form-control', function (e) {
            if (e.which == 13) {
                $(this).closest('.search-form').submit();
                return false;
            }
        });

        // handle header search button click
        $('.page-header').on('mousedown', '.search-form.open .submit', function (e) {
            e.preventDefault();
            e.stopPropagation();
            $(this).closest('.search-form').submit();
        });

        $(document).on('click', '.mega-menu-dropdown .dropdown-menu', function(e) {
            e.stopPropagation();
        });
    }

    // Handles Bootstrap Tabs.
    var handleTabs = function () {
        // fix content height on tab click
        $('body').on('shown.bs.tab', 'a[data-toggle="tab"]', function () {
            handleSidebarAndContentHeight();
        });
    }        

    // Handles the go to top button at the footer
    var handleGoTop = function () {
        /* set variables locally for increased performance */
        jQuery('.page-footer').on('click', '.go-top', function (e) {
            Helper.scrollTo();
            e.preventDefault();
        });
    }
    
    // Handle Theme Settings
    var handleTheme = function () {

        var panel = $('.theme-panel');

        if ($('body').hasClass('page-boxed') == false) {
            $('.layout-option', panel).val("fluid");
        }

        $('.sidebar-option', panel).val("default");
        $('.page-header-option', panel).val("fixed");
        $('.page-footer-option', panel).val("default");
        if ( $('.sidebar-pos-option').attr("disabled") === false) {
            $('.sidebar-pos-option', panel).val(Helper.isRTL() ? 'right' : 'left');
        }
        
        //handle theme layout
        var resetLayout = function () {
            $("body").
            removeClass("page-boxed").
            removeClass("page-footer-fixed").
            removeClass("page-sidebar-fixed").
            removeClass("page-header-fixed").
            removeClass("page-sidebar-reversed");

            $('.page-header > .page-header-inner').removeClass("container");

            if ($('.page-container').parent(".container").size() === 1) {
                $('.page-container').insertAfter('body > .clearfix');
            }

            if ($('.page-footer > .container').size() === 1) {
                $('.page-footer').html($('.page-footer > .container').html());
            } else if ($('.page-footer').parent(".container").size() === 1) {
                $('.page-footer').insertAfter('.page-container');
            }

            $('body > .container').remove();
        }

        var lastSelectedLayout = '';

        var setLayout = function () {

            var layoutOption = $('.layout-option', panel).val();
            var sidebarOption = $('.sidebar-option', panel).val();
            var headerOption = $('.page-header-option', panel).val();
            var footerOption = $('.page-footer-option', panel).val();
            var sidebarPosOption = $('.sidebar-pos-option', panel).val();

            if (sidebarOption == "fixed" && headerOption == "default") {
                alert('Default Header with Fixed Sidebar option is not supported. Proceed with Fixed Header with Fixed Sidebar.');
                $('.page-header-option', panel).val("fixed");
                $('.sidebar-option', panel).val("fixed");
                sidebarOption = 'fixed';
                headerOption = 'fixed';
            }

            resetLayout(); // reset layout to default state

            if (layoutOption === "boxed") {
                $("body").addClass("page-boxed");

                // set header
                $('.page-header > .page-header-inner').addClass("container");
                var cont = $('body > .clearfix').after('<div class="container"></div>');

                // set content
                $('.page-container').appendTo('body > .container');

                // set footer
                if (footerOption === 'fixed') {
                    $('.page-footer').html('<div class="container">' + $('.page-footer').html() + '</div>');
                } else {
                    $('.page-footer').appendTo('body > .container');
                }
            }

            if (lastSelectedLayout != layoutOption) {
                //layout changed, run responsive handler:
                Helper.runResizeHandlers();
            }
            lastSelectedLayout = layoutOption;

            //header
            if (headerOption === 'fixed') {
                $("body").addClass("page-header-fixed");
                $(".page-header").removeClass("navbar-static-top").addClass("navbar-fixed-top");
            } else {
                $("body").removeClass("page-header-fixed");
                $(".page-header").removeClass("navbar-fixed-top").addClass("navbar-static-top");
            }

            //sidebar
            if ($('body').hasClass('page-full-width') === false) {
                if (sidebarOption === 'fixed') {
                    $("body").addClass("page-sidebar-fixed");
                    $("page-sidebar-menu").addClass("page-sidebar-menu-fixed");
                    $("page-sidebar-menu").removeClass("page-sidebar-menu-default");
                    _initFixedSidebarHoverEffect();
                } else {
                    $("body").removeClass("page-sidebar-fixed");
                    $("page-sidebar-menu").addClass("page-sidebar-menu-default");
                    $("page-sidebar-menu").removeClass("page-sidebar-menu-fixed");                    
                    $('.page-sidebar-menu').unbind('mouseenter').unbind('mouseleave');
                }
            }

            //footer 
            if (footerOption === 'fixed') {
                $("body").addClass("page-footer-fixed");                
            } else {
                $("body").removeClass("page-footer-fixed");
            }

            //sidebar position
            if (Helper.isRTL()) {
                if (sidebarPosOption === 'left') {
                    $("body").addClass("page-sidebar-reversed");
                    $('#frontend-link').tooltip('destroy').tooltip({placement: 'right'});
                } else {
                    $("body").removeClass("page-sidebar-reversed");
                    $('#frontend-link').tooltip('destroy').tooltip({placement: 'left'});
                }
            } else {
                if (sidebarPosOption === 'right') {
                    $("body").addClass("page-sidebar-reversed");
                    $('#frontend-link').tooltip('destroy').tooltip({placement: 'left'});
                } else {
                    $("body").removeClass("page-sidebar-reversed");
                    $('#frontend-link').tooltip('destroy').tooltip({placement: 'right'});
                }
            }

            handleSidebarAndContentHeight(); // fix content height            
            handleFixedSidebar(); // reinitialize fixed sidebar
            handleFixedSidebarHoverable(); // reinitialize fixed sidebar hover effect
        }

        // handle theme colors
        var setColor = function (color) {
            var color_ = (Helper.isRTL() ? color + '-rtl' : color);
            $('#style_color').attr("href", "assets/admin/layout/css/themes/" + color_ + ".css");
            if (color == 'light2') {
                $('.page-logo img').attr('src', 'assets/admin/layout/img/logo-invert.png');
            } else {
                $('.page-logo img').attr('src', 'assets/admin/layout/img/logo.png');
            }
            if ($.cookie) {                
                $.cookie('style_color', color);
            }
        }

        $('.toggler', panel).click(function () {
            $('.toggler').hide();
            $('.toggler-close').show();
            $('.theme-panel > .theme-options').show();
        });

        $('.toggler-close', panel).click(function () {
            $('.toggler').show();
            $('.toggler-close').hide();
            $('.theme-panel > .theme-options').hide();
        });

        $('.theme-colors > ul > li', panel).click(function () {
            var color = $(this).attr("data-style");
            setColor(color);
            $('ul > li', panel).removeClass("current");
            $(this).addClass("current");
        });

        $('.layout-option, .page-header-option, .sidebar-option, .page-footer-option, .sidebar-pos-option', panel).change(setLayout);

        if ($.cookie && $.cookie('style_color')) {
            setColor($.cookie('style_color'));
        }
    }

    //* END:CORE HANDLERS *//

    return {

        //main function to initiate the theme
        init: function () {
            //IMPORTANT!!!: Do not modify the core handlers call order.

            // reinitialize the layout on window resize
            Helper.addResizeHandler(handleSidebarAndContentHeight);
            Helper.addResizeHandler(handleFixedSidebar);
            
            //layout handlers
            handleIOSKeyboard(); // initialize core variables
            handleFixedSidebar(); // handles fixed sidebar menu
            handleSidebarMenu(); // handles main menu
            handleHorizontalMenu(); // handles horizontal menu
            handleSidebarToggler(); // handles sidebar hide/show            
            handleGoTop(); //handles scroll to top functionality in the footer
            handleTabs(); // handle bootstrap tabs
            handleTheme(); // handles style customer tool 
        },

        //public function to fix the sidebar and content height accordingly
        fixContentHeight: function () {
            handleSidebarAndContentHeight();
        },

        getLayoutImgPath: function () {
            return layoutImgPath;
        }
    };

}();




















/*! handlebars v1.3.0 Copyright (C) 2011 by Yehuda Katz Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. @license */;
var Handlebars = (function() {
    var a = (function() {
        var m;
        function n(o) {
            this.string = o
        }
        n.prototype.toString = function() {
            return"" + this.string
        };
        m = n;
        return m
    })();
    var k = (function(v) {
        var w = {};
        var p = v;
        var x = {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "`": "&#x60;"};
        var m = /[&<>"'`]/g;
        var q = /[&<>"'`]/;
        function y(z) {
            return x[z] || "&amp;"
        }
        function u(B, A) {
            for (var z in A) {
                if (Object.prototype.hasOwnProperty.call(A, z)) {
                    B[z] = A[z]
                }
            }
        }
        w.extend = u;
        var o = Object.prototype.toString;
        w.toString = o;
        var n = function(z) {
            return typeof z === "function"
        };
        if (n(/x/)) {
            n = function(z) {
                return typeof z === "function" && o.call(z) === "[object Function]"
            }
        }
        var n;
        w.isFunction = n;
        var t = Array.isArray || function(z) {
            return(z && typeof z === "object") ? o.call(z) === "[object Array]" : false
        };
        w.isArray = t;
        function s(z) {
            if (z instanceof p) {
                return z.toString()
            } else {
                if (!z && z !== 0) {
                    return""
                }
            }
            z = "" + z;
            if (!q.test(z)) {
                return z
            }
            return z.replace(m, y)
        }
        w.escapeExpression = s;
        function r(z) {
            if (!z && z !== 0) {
                return true
            } else {
                if (t(z) && z.length === 0) {
                    return true
                } else {
                    return false
                }
            }
        }
        w.isEmpty = r;
        return w
    })(a);
    var d = (function() {
        var n;
        var o = ["description", "fileName", "lineNumber", "message", "name", "number", "stack"];
        function m(t, s) {
            var q;
            if (s && s.firstLine) {
                q = s.firstLine;
                t += " - " + q + ":" + s.firstColumn
            }
            var r = Error.prototype.constructor.call(this, t);
            for (var p = 0; p < o.length; p++) {
                this[o[p]] = r[o[p]]
            }
            if (q) {
                this.lineNumber = q;
                this.column = s.firstColumn
            }
        }
        m.prototype = new Error();
        n = m;
        return n
    })();
    var i = (function(x, A) {
        var z = {};
        var v = x;
        var t = A;
        var C = "1.3.0";
        z.VERSION = C;
        var n = 4;
        z.COMPILER_REVISION = n;
        var q = {1: "<= 1.0.rc.2", 2: "== 1.0.0-rc.3", 3: "== 1.0.0-rc.4", 4: ">= 1.0.0"};
        z.REVISION_CHANGES = q;
        var u = v.isArray, p = v.isFunction, o = v.toString, m = "[object Object]";
        function s(E, D) {
            this.helpers = E || {};
            this.partials = D || {};
            w(this)
        }
        z.HandlebarsEnvironment = s;
        s.prototype = {constructor: s, logger: y, log: r, registerHelper: function(E, F, D) {
                if (o.call(E) === m) {
                    if (D || F) {
                        throw new t("Arg not supported with multiple helpers")
                    }
                    v.extend(this.helpers, E)
                } else {
                    if (D) {
                        F.not = D
                    }
                    this.helpers[E] = F
                }
            }, registerPartial: function(D, E) {
                if (o.call(D) === m) {
                    v.extend(this.partials, D)
                } else {
                    this.partials[D] = E
                }
            }};
        function w(D) {
            D.registerHelper("helperMissing", function(E) {
                if (arguments.length === 2) {
                    return undefined
                } else {
                    throw new t("Missing helper: '" + E + "'")
                }
            });
            D.registerHelper("blockHelperMissing", function(G, F) {
                var E = F.inverse || function() {
                }, H = F.fn;
                if (p(G)) {
                    G = G.call(this)
                }
                if (G === true) {
                    return H(this)
                } else {
                    if (G === false || G == null) {
                        return E(this)
                    } else {
                        if (u(G)) {
                            if (G.length > 0) {
                                return D.helpers.each(G, F)
                            } else {
                                return E(this)
                            }
                        } else {
                            return H(G)
                        }
                    }
                }
            });
            D.registerHelper("each", function(E, M) {
                var K = M.fn, G = M.inverse;
                var I = 0, J = "", H;
                if (p(E)) {
                    E = E.call(this)
                }
                if (M.data) {
                    H = B(M.data)
                }
                if (E && typeof E === "object") {
                    if (u(E)) {
                        for (var F = E.length; I < F; I++) {
                            if (H) {
                                H.index = I;
                                H.first = (I === 0);
                                H.last = (I === (E.length - 1))
                            }
                            J = J + K(E[I], {data: H})
                        }
                    } else {
                        for (var L in E) {
                            if (E.hasOwnProperty(L)) {
                                if (H) {
                                    H.key = L;
                                    H.index = I;
                                    H.first = (I === 0)
                                }
                                J = J + K(E[L], {data: H});
                                I++
                            }
                        }
                    }
                }
                if (I === 0) {
                    J = G(this)
                }
                return J
            });
            D.registerHelper("if", function(F, E) {
                if (p(F)) {
                    F = F.call(this)
                }
                if ((!E.hash.includeZero && !F) || v.isEmpty(F)) {
                    return E.inverse(this)
                } else {
                    return E.fn(this)
                }
            });
            D.registerHelper("unless", function(F, E) {
                return D.helpers["if"].call(this, F, {fn: E.inverse, inverse: E.fn, hash: E.hash})
            });
            D.registerHelper("with", function(F, E) {
                if (p(F)) {
                    F = F.call(this)
                }
                if (!v.isEmpty(F)) {
                    return E.fn(F)
                }
            });
            D.registerHelper("log", function(F, E) {
                var G = E.data && E.data.level != null ? parseInt(E.data.level, 10) : 1;
                D.log(G, F)
            })
        }
        var y = {methodMap: {0: "debug", 1: "info", 2: "warn", 3: "error"}, DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3, level: 3, log: function(F, D) {
                if (y.level <= F) {
                    var E = y.methodMap[F];
                    if (typeof console !== "undefined" && console[E]) {
                        console[E].call(console, D)
                    }
                }
            }};
        z.logger = y;
        function r(E, D) {
            y.log(E, D)
        }
        z.log = r;
        var B = function(D) {
            var E = {};
            v.extend(E, D);
            return E
        };
        z.createFrame = B;
        return z
    })(k, d);
    var g = (function(v, z, p) {
        var x = {};
        var u = v;
        var s = z;
        var o = p.COMPILER_REVISION;
        var r = p.REVISION_CHANGES;
        function n(C) {
            var B = C && C[0] || 1, E = o;
            if (B !== E) {
                if (B < E) {
                    var A = r[E], D = r[B];
                    throw new s("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + A + ") or downgrade your runtime to an older version (" + D + ").")
                } else {
                    throw new s("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + C[1] + ").")
                }
            }
        }
        x.checkRevision = n;
        function w(A, D) {
            if (!D) {
                throw new s("No environment passed to template")
            }
            var C = function(F, H, J, K, I, L) {
                var E = D.VM.invokePartial.apply(this, arguments);
                if (E != null) {
                    return E
                }
                if (D.compile) {
                    var G = {helpers: K, partials: I, data: L};
                    I[H] = D.compile(F, {data: L !== undefined}, D);
                    return I[H](J, G)
                } else {
                    throw new s("The partial " + H + " could not be compiled when running in runtime-only mode")
                }
            };
            var B = {escapeExpression: u.escapeExpression, invokePartial: C, programs: [], program: function(F, G, H) {
                    var E = this.programs[F];
                    if (H) {
                        E = t(F, G, H)
                    } else {
                        if (!E) {
                            E = this.programs[F] = t(F, G)
                        }
                    }
                    return E
                }, merge: function(G, F) {
                    var E = G || F;
                    if (G && F && (G !== F)) {
                        E = {};
                        u.extend(E, F);
                        u.extend(E, G)
                    }
                    return E
                }, programWithDepth: D.VM.programWithDepth, noop: D.VM.noop, compilerInfo: null};
            return function(H, F) {
                F = F || {};
                var I = F.partial ? F : D, J, G;
                if (!F.partial) {
                    J = F.helpers;
                    G = F.partials
                }
                var E = A.call(B, I, H, J, G, F.data);
                if (!F.partial) {
                    D.VM.checkRevision(B.compilerInfo)
                }
                return E
            }
        }
        x.template = w;
        function q(B, C, D) {
            var A = Array.prototype.slice.call(arguments, 3);
            var E = function(G, F) {
                F = F || {};
                return C.apply(this, [G, F.data || D].concat(A))
            };
            E.program = B;
            E.depth = A.length;
            return E
        }
        x.programWithDepth = q;
        function t(A, B, C) {
            var D = function(F, E) {
                E = E || {};
                return B(F, E.data || C)
            };
            D.program = A;
            D.depth = 0;
            return D
        }
        x.program = t;
        function m(A, C, E, F, D, G) {
            var B = {partial: true, helpers: F, partials: D, data: G};
            if (A === undefined) {
                throw new s("The partial " + C + " could not be found")
            } else {
                if (A instanceof Function) {
                    return A(E, B)
                }
            }
        }
        x.invokePartial = m;
        function y() {
            return""
        }
        x.noop = y;
        return x
    })(k, d, i);
    var f = (function(w, y, o, s, v) {
        var x;
        var m = w;
        var p = y;
        var r = o;
        var u = s;
        var q = v;
        var t = function() {
            var z = new m.HandlebarsEnvironment();
            u.extend(z, m);
            z.SafeString = p;
            z.Exception = r;
            z.Utils = u;
            z.VM = q;
            z.template = function(A) {
                return q.template(A, z)
            };
            return z
        };
        var n = t();
        n.create = t;
        x = n;
        return x
    })(i, a, d, k, g);
    var j = (function(q) {
        var o;
        var n = q;
        function m(r) {
            r = r || {};
            this.firstLine = r.first_line;
            this.firstColumn = r.first_column;
            this.lastColumn = r.last_column;
            this.lastLine = r.last_line
        }
        var p = {ProgramNode: function(t, v, s, u) {
                var r, w;
                if (arguments.length === 3) {
                    u = s;
                    s = null
                } else {
                    if (arguments.length === 2) {
                        u = v;
                        v = null
                    }
                }
                m.call(this, u);
                this.type = "program";
                this.statements = t;
                this.strip = {};
                if (s) {
                    w = s[0];
                    if (w) {
                        r = {first_line: w.firstLine, last_line: w.lastLine, last_column: w.lastColumn, first_column: w.firstColumn};
                        this.inverse = new p.ProgramNode(s, v, r)
                    } else {
                        this.inverse = new p.ProgramNode(s, v)
                    }
                    this.strip.right = v.left
                } else {
                    if (v) {
                        this.strip.left = v.right
                    }
                }
            }, MustacheNode: function(w, v, r, t, s) {
                m.call(this, s);
                this.type = "mustache";
                this.strip = t;
                if (r != null && r.charAt) {
                    var u = r.charAt(3) || r.charAt(2);
                    this.escaped = u !== "{" && u !== "&"
                } else {
                    this.escaped = !!r
                }
                if (w instanceof p.SexprNode) {
                    this.sexpr = w
                } else {
                    this.sexpr = new p.SexprNode(w, v)
                }
                this.sexpr.isRoot = true;
                this.id = this.sexpr.id;
                this.params = this.sexpr.params;
                this.hash = this.sexpr.hash;
                this.eligibleHelper = this.sexpr.eligibleHelper;
                this.isHelper = this.sexpr.isHelper
            }, SexprNode: function(w, t, r) {
                m.call(this, r);
                this.type = "sexpr";
                this.hash = t;
                var v = this.id = w[0];
                var u = this.params = w.slice(1);
                var s = this.eligibleHelper = v.isSimple;
                this.isHelper = s && (u.length || t)
            }, PartialNode: function(r, t, u, s) {
                m.call(this, s);
                this.type = "partial";
                this.partialName = r;
                this.context = t;
                this.strip = u
            }, BlockNode: function(u, s, r, v, t) {
                m.call(this, t);
                if (u.sexpr.id.original !== v.path.original) {
                    throw new n(u.sexpr.id.original + " doesn't match " + v.path.original, this)
                }
                this.type = "block";
                this.mustache = u;
                this.program = s;
                this.inverse = r;
                this.strip = {left: u.strip.left, right: v.strip.right};
                (s || r).strip.left = u.strip.right;
                (r || s).strip.right = v.strip.left;
                if (r && !s) {
                    this.isInverse = true
                }
            }, ContentNode: function(r, s) {
                m.call(this, s);
                this.type = "content";
                this.string = r
            }, HashNode: function(s, r) {
                m.call(this, r);
                this.type = "hash";
                this.pairs = s
            }, IdNode: function(x, w) {
                m.call(this, w);
                this.type = "ID";
                var v = "", t = [], y = 0;
                for (var u = 0, r = x.length; u < r; u++) {
                    var s = x[u].part;
                    v += (x[u].separator || "") + s;
                    if (s === ".." || s === "." || s === "this") {
                        if (t.length > 0) {
                            throw new n("Invalid path: " + v, this)
                        } else {
                            if (s === "..") {
                                y++
                            } else {
                                this.isScoped = true
                            }
                        }
                    } else {
                        t.push(s)
                    }
                }
                this.original = v;
                this.parts = t;
                this.string = t.join(".");
                this.depth = y;
                this.isSimple = x.length === 1 && !this.isScoped && y === 0;
                this.stringModeValue = this.string
            }, PartialNameNode: function(r, s) {
                m.call(this, s);
                this.type = "PARTIAL_NAME";
                this.name = r.original
            }, DataNode: function(s, r) {
                m.call(this, r);
                this.type = "DATA";
                this.id = s
            }, StringNode: function(r, s) {
                m.call(this, s);
                this.type = "STRING";
                this.original = this.string = this.stringModeValue = r
            }, IntegerNode: function(r, s) {
                m.call(this, s);
                this.type = "INTEGER";
                this.original = this.integer = r;
                this.stringModeValue = Number(r)
            }, BooleanNode: function(r, s) {
                m.call(this, s);
                this.type = "BOOLEAN";
                this.bool = r;
                this.stringModeValue = r === "true"
            }, CommentNode: function(s, r) {
                m.call(this, r);
                this.type = "comment";
                this.comment = s
            }};
        o = p;
        return o
    })(d);
    var b = (function() {
        var n;
        var m = (function() {
            var v = {trace: function r() {
                }, yy: {}, symbols_: {error: 2, root: 3, statements: 4, EOF: 5, program: 6, simpleInverse: 7, statement: 8, openInverse: 9, closeBlock: 10, openBlock: 11, mustache: 12, partial: 13, CONTENT: 14, COMMENT: 15, OPEN_BLOCK: 16, sexpr: 17, CLOSE: 18, OPEN_INVERSE: 19, OPEN_ENDBLOCK: 20, path: 21, OPEN: 22, OPEN_UNESCAPED: 23, CLOSE_UNESCAPED: 24, OPEN_PARTIAL: 25, partialName: 26, partial_option0: 27, sexpr_repetition0: 28, sexpr_option0: 29, dataName: 30, param: 31, STRING: 32, INTEGER: 33, BOOLEAN: 34, OPEN_SEXPR: 35, CLOSE_SEXPR: 36, hash: 37, hash_repetition_plus0: 38, hashSegment: 39, ID: 40, EQUALS: 41, DATA: 42, pathSegments: 43, SEP: 44, "$accept": 0, "$end": 1}, terminals_: {2: "error", 5: "EOF", 14: "CONTENT", 15: "COMMENT", 16: "OPEN_BLOCK", 18: "CLOSE", 19: "OPEN_INVERSE", 20: "OPEN_ENDBLOCK", 22: "OPEN", 23: "OPEN_UNESCAPED", 24: "CLOSE_UNESCAPED", 25: "OPEN_PARTIAL", 32: "STRING", 33: "INTEGER", 34: "BOOLEAN", 35: "OPEN_SEXPR", 36: "CLOSE_SEXPR", 40: "ID", 41: "EQUALS", 42: "DATA", 44: "SEP"}, productions_: [0, [3, 2], [3, 1], [6, 2], [6, 3], [6, 2], [6, 1], [6, 1], [6, 0], [4, 1], [4, 2], [8, 3], [8, 3], [8, 1], [8, 1], [8, 1], [8, 1], [11, 3], [9, 3], [10, 3], [12, 3], [12, 3], [13, 4], [7, 2], [17, 3], [17, 1], [31, 1], [31, 1], [31, 1], [31, 1], [31, 1], [31, 3], [37, 1], [39, 3], [26, 1], [26, 1], [26, 1], [30, 2], [21, 1], [43, 3], [43, 1], [27, 0], [27, 1], [28, 0], [28, 2], [29, 0], [29, 1], [38, 1], [38, 2]], performAction: function q(w, z, A, D, C, y, B) {
                    var x = y.length - 1;
                    switch (C) {
                        case 1:
                            return new D.ProgramNode(y[x - 1], this._$);
                            break;
                        case 2:
                            return new D.ProgramNode([], this._$);
                            break;
                        case 3:
                            this.$ = new D.ProgramNode([], y[x - 1], y[x], this._$);
                            break;
                        case 4:
                            this.$ = new D.ProgramNode(y[x - 2], y[x - 1], y[x], this._$);
                            break;
                        case 5:
                            this.$ = new D.ProgramNode(y[x - 1], y[x], [], this._$);
                            break;
                        case 6:
                            this.$ = new D.ProgramNode(y[x], this._$);
                            break;
                        case 7:
                            this.$ = new D.ProgramNode([], this._$);
                            break;
                        case 8:
                            this.$ = new D.ProgramNode([], this._$);
                            break;
                        case 9:
                            this.$ = [y[x]];
                            break;
                        case 10:
                            y[x - 1].push(y[x]);
                            this.$ = y[x - 1];
                            break;
                        case 11:
                            this.$ = new D.BlockNode(y[x - 2], y[x - 1].inverse, y[x - 1], y[x], this._$);
                            break;
                        case 12:
                            this.$ = new D.BlockNode(y[x - 2], y[x - 1], y[x - 1].inverse, y[x], this._$);
                            break;
                        case 13:
                            this.$ = y[x];
                            break;
                        case 14:
                            this.$ = y[x];
                            break;
                        case 15:
                            this.$ = new D.ContentNode(y[x], this._$);
                            break;
                        case 16:
                            this.$ = new D.CommentNode(y[x], this._$);
                            break;
                        case 17:
                            this.$ = new D.MustacheNode(y[x - 1], null, y[x - 2], o(y[x - 2], y[x]), this._$);
                            break;
                        case 18:
                            this.$ = new D.MustacheNode(y[x - 1], null, y[x - 2], o(y[x - 2], y[x]), this._$);
                            break;
                        case 19:
                            this.$ = {path: y[x - 1], strip: o(y[x - 2], y[x])};
                            break;
                        case 20:
                            this.$ = new D.MustacheNode(y[x - 1], null, y[x - 2], o(y[x - 2], y[x]), this._$);
                            break;
                        case 21:
                            this.$ = new D.MustacheNode(y[x - 1], null, y[x - 2], o(y[x - 2], y[x]), this._$);
                            break;
                        case 22:
                            this.$ = new D.PartialNode(y[x - 2], y[x - 1], o(y[x - 3], y[x]), this._$);
                            break;
                        case 23:
                            this.$ = o(y[x - 1], y[x]);
                            break;
                        case 24:
                            this.$ = new D.SexprNode([y[x - 2]].concat(y[x - 1]), y[x], this._$);
                            break;
                        case 25:
                            this.$ = new D.SexprNode([y[x]], null, this._$);
                            break;
                        case 26:
                            this.$ = y[x];
                            break;
                        case 27:
                            this.$ = new D.StringNode(y[x], this._$);
                            break;
                        case 28:
                            this.$ = new D.IntegerNode(y[x], this._$);
                            break;
                        case 29:
                            this.$ = new D.BooleanNode(y[x], this._$);
                            break;
                        case 30:
                            this.$ = y[x];
                            break;
                        case 31:
                            y[x - 1].isHelper = true;
                            this.$ = y[x - 1];
                            break;
                        case 32:
                            this.$ = new D.HashNode(y[x], this._$);
                            break;
                        case 33:
                            this.$ = [y[x - 2], y[x]];
                            break;
                        case 34:
                            this.$ = new D.PartialNameNode(y[x], this._$);
                            break;
                        case 35:
                            this.$ = new D.PartialNameNode(new D.StringNode(y[x], this._$), this._$);
                            break;
                        case 36:
                            this.$ = new D.PartialNameNode(new D.IntegerNode(y[x], this._$));
                            break;
                        case 37:
                            this.$ = new D.DataNode(y[x], this._$);
                            break;
                        case 38:
                            this.$ = new D.IdNode(y[x], this._$);
                            break;
                        case 39:
                            y[x - 2].push({part: y[x], separator: y[x - 1]});
                            this.$ = y[x - 2];
                            break;
                        case 40:
                            this.$ = [{part: y[x]}];
                            break;
                        case 43:
                            this.$ = [];
                            break;
                        case 44:
                            y[x - 1].push(y[x]);
                            break;
                        case 47:
                            this.$ = [y[x]];
                            break;
                        case 48:
                            y[x - 1].push(y[x]);
                            break
                    }
                }, table: [{3: 1, 4: 2, 5: [1, 3], 8: 4, 9: 5, 11: 6, 12: 7, 13: 8, 14: [1, 9], 15: [1, 10], 16: [1, 12], 19: [1, 11], 22: [1, 13], 23: [1, 14], 25: [1, 15]}, {1: [3]}, {5: [1, 16], 8: 17, 9: 5, 11: 6, 12: 7, 13: 8, 14: [1, 9], 15: [1, 10], 16: [1, 12], 19: [1, 11], 22: [1, 13], 23: [1, 14], 25: [1, 15]}, {1: [2, 2]}, {5: [2, 9], 14: [2, 9], 15: [2, 9], 16: [2, 9], 19: [2, 9], 20: [2, 9], 22: [2, 9], 23: [2, 9], 25: [2, 9]}, {4: 20, 6: 18, 7: 19, 8: 4, 9: 5, 11: 6, 12: 7, 13: 8, 14: [1, 9], 15: [1, 10], 16: [1, 12], 19: [1, 21], 20: [2, 8], 22: [1, 13], 23: [1, 14], 25: [1, 15]}, {4: 20, 6: 22, 7: 19, 8: 4, 9: 5, 11: 6, 12: 7, 13: 8, 14: [1, 9], 15: [1, 10], 16: [1, 12], 19: [1, 21], 20: [2, 8], 22: [1, 13], 23: [1, 14], 25: [1, 15]}, {5: [2, 13], 14: [2, 13], 15: [2, 13], 16: [2, 13], 19: [2, 13], 20: [2, 13], 22: [2, 13], 23: [2, 13], 25: [2, 13]}, {5: [2, 14], 14: [2, 14], 15: [2, 14], 16: [2, 14], 19: [2, 14], 20: [2, 14], 22: [2, 14], 23: [2, 14], 25: [2, 14]}, {5: [2, 15], 14: [2, 15], 15: [2, 15], 16: [2, 15], 19: [2, 15], 20: [2, 15], 22: [2, 15], 23: [2, 15], 25: [2, 15]}, {5: [2, 16], 14: [2, 16], 15: [2, 16], 16: [2, 16], 19: [2, 16], 20: [2, 16], 22: [2, 16], 23: [2, 16], 25: [2, 16]}, {17: 23, 21: 24, 30: 25, 40: [1, 28], 42: [1, 27], 43: 26}, {17: 29, 21: 24, 30: 25, 40: [1, 28], 42: [1, 27], 43: 26}, {17: 30, 21: 24, 30: 25, 40: [1, 28], 42: [1, 27], 43: 26}, {17: 31, 21: 24, 30: 25, 40: [1, 28], 42: [1, 27], 43: 26}, {21: 33, 26: 32, 32: [1, 34], 33: [1, 35], 40: [1, 28], 43: 26}, {1: [2, 1]}, {5: [2, 10], 14: [2, 10], 15: [2, 10], 16: [2, 10], 19: [2, 10], 20: [2, 10], 22: [2, 10], 23: [2, 10], 25: [2, 10]}, {10: 36, 20: [1, 37]}, {4: 38, 8: 4, 9: 5, 11: 6, 12: 7, 13: 8, 14: [1, 9], 15: [1, 10], 16: [1, 12], 19: [1, 11], 20: [2, 7], 22: [1, 13], 23: [1, 14], 25: [1, 15]}, {7: 39, 8: 17, 9: 5, 11: 6, 12: 7, 13: 8, 14: [1, 9], 15: [1, 10], 16: [1, 12], 19: [1, 21], 20: [2, 6], 22: [1, 13], 23: [1, 14], 25: [1, 15]}, {17: 23, 18: [1, 40], 21: 24, 30: 25, 40: [1, 28], 42: [1, 27], 43: 26}, {10: 41, 20: [1, 37]}, {18: [1, 42]}, {18: [2, 43], 24: [2, 43], 28: 43, 32: [2, 43], 33: [2, 43], 34: [2, 43], 35: [2, 43], 36: [2, 43], 40: [2, 43], 42: [2, 43]}, {18: [2, 25], 24: [2, 25], 36: [2, 25]}, {18: [2, 38], 24: [2, 38], 32: [2, 38], 33: [2, 38], 34: [2, 38], 35: [2, 38], 36: [2, 38], 40: [2, 38], 42: [2, 38], 44: [1, 44]}, {21: 45, 40: [1, 28], 43: 26}, {18: [2, 40], 24: [2, 40], 32: [2, 40], 33: [2, 40], 34: [2, 40], 35: [2, 40], 36: [2, 40], 40: [2, 40], 42: [2, 40], 44: [2, 40]}, {18: [1, 46]}, {18: [1, 47]}, {24: [1, 48]}, {18: [2, 41], 21: 50, 27: 49, 40: [1, 28], 43: 26}, {18: [2, 34], 40: [2, 34]}, {18: [2, 35], 40: [2, 35]}, {18: [2, 36], 40: [2, 36]}, {5: [2, 11], 14: [2, 11], 15: [2, 11], 16: [2, 11], 19: [2, 11], 20: [2, 11], 22: [2, 11], 23: [2, 11], 25: [2, 11]}, {21: 51, 40: [1, 28], 43: 26}, {8: 17, 9: 5, 11: 6, 12: 7, 13: 8, 14: [1, 9], 15: [1, 10], 16: [1, 12], 19: [1, 11], 20: [2, 3], 22: [1, 13], 23: [1, 14], 25: [1, 15]}, {4: 52, 8: 4, 9: 5, 11: 6, 12: 7, 13: 8, 14: [1, 9], 15: [1, 10], 16: [1, 12], 19: [1, 11], 20: [2, 5], 22: [1, 13], 23: [1, 14], 25: [1, 15]}, {14: [2, 23], 15: [2, 23], 16: [2, 23], 19: [2, 23], 20: [2, 23], 22: [2, 23], 23: [2, 23], 25: [2, 23]}, {5: [2, 12], 14: [2, 12], 15: [2, 12], 16: [2, 12], 19: [2, 12], 20: [2, 12], 22: [2, 12], 23: [2, 12], 25: [2, 12]}, {14: [2, 18], 15: [2, 18], 16: [2, 18], 19: [2, 18], 20: [2, 18], 22: [2, 18], 23: [2, 18], 25: [2, 18]}, {18: [2, 45], 21: 56, 24: [2, 45], 29: 53, 30: 60, 31: 54, 32: [1, 57], 33: [1, 58], 34: [1, 59], 35: [1, 61], 36: [2, 45], 37: 55, 38: 62, 39: 63, 40: [1, 64], 42: [1, 27], 43: 26}, {40: [1, 65]}, {18: [2, 37], 24: [2, 37], 32: [2, 37], 33: [2, 37], 34: [2, 37], 35: [2, 37], 36: [2, 37], 40: [2, 37], 42: [2, 37]}, {14: [2, 17], 15: [2, 17], 16: [2, 17], 19: [2, 17], 20: [2, 17], 22: [2, 17], 23: [2, 17], 25: [2, 17]}, {5: [2, 20], 14: [2, 20], 15: [2, 20], 16: [2, 20], 19: [2, 20], 20: [2, 20], 22: [2, 20], 23: [2, 20], 25: [2, 20]}, {5: [2, 21], 14: [2, 21], 15: [2, 21], 16: [2, 21], 19: [2, 21], 20: [2, 21], 22: [2, 21], 23: [2, 21], 25: [2, 21]}, {18: [1, 66]}, {18: [2, 42]}, {18: [1, 67]}, {8: 17, 9: 5, 11: 6, 12: 7, 13: 8, 14: [1, 9], 15: [1, 10], 16: [1, 12], 19: [1, 11], 20: [2, 4], 22: [1, 13], 23: [1, 14], 25: [1, 15]}, {18: [2, 24], 24: [2, 24], 36: [2, 24]}, {18: [2, 44], 24: [2, 44], 32: [2, 44], 33: [2, 44], 34: [2, 44], 35: [2, 44], 36: [2, 44], 40: [2, 44], 42: [2, 44]}, {18: [2, 46], 24: [2, 46], 36: [2, 46]}, {18: [2, 26], 24: [2, 26], 32: [2, 26], 33: [2, 26], 34: [2, 26], 35: [2, 26], 36: [2, 26], 40: [2, 26], 42: [2, 26]}, {18: [2, 27], 24: [2, 27], 32: [2, 27], 33: [2, 27], 34: [2, 27], 35: [2, 27], 36: [2, 27], 40: [2, 27], 42: [2, 27]}, {18: [2, 28], 24: [2, 28], 32: [2, 28], 33: [2, 28], 34: [2, 28], 35: [2, 28], 36: [2, 28], 40: [2, 28], 42: [2, 28]}, {18: [2, 29], 24: [2, 29], 32: [2, 29], 33: [2, 29], 34: [2, 29], 35: [2, 29], 36: [2, 29], 40: [2, 29], 42: [2, 29]}, {18: [2, 30], 24: [2, 30], 32: [2, 30], 33: [2, 30], 34: [2, 30], 35: [2, 30], 36: [2, 30], 40: [2, 30], 42: [2, 30]}, {17: 68, 21: 24, 30: 25, 40: [1, 28], 42: [1, 27], 43: 26}, {18: [2, 32], 24: [2, 32], 36: [2, 32], 39: 69, 40: [1, 70]}, {18: [2, 47], 24: [2, 47], 36: [2, 47], 40: [2, 47]}, {18: [2, 40], 24: [2, 40], 32: [2, 40], 33: [2, 40], 34: [2, 40], 35: [2, 40], 36: [2, 40], 40: [2, 40], 41: [1, 71], 42: [2, 40], 44: [2, 40]}, {18: [2, 39], 24: [2, 39], 32: [2, 39], 33: [2, 39], 34: [2, 39], 35: [2, 39], 36: [2, 39], 40: [2, 39], 42: [2, 39], 44: [2, 39]}, {5: [2, 22], 14: [2, 22], 15: [2, 22], 16: [2, 22], 19: [2, 22], 20: [2, 22], 22: [2, 22], 23: [2, 22], 25: [2, 22]}, {5: [2, 19], 14: [2, 19], 15: [2, 19], 16: [2, 19], 19: [2, 19], 20: [2, 19], 22: [2, 19], 23: [2, 19], 25: [2, 19]}, {36: [1, 72]}, {18: [2, 48], 24: [2, 48], 36: [2, 48], 40: [2, 48]}, {41: [1, 71]}, {21: 56, 30: 60, 31: 73, 32: [1, 57], 33: [1, 58], 34: [1, 59], 35: [1, 61], 40: [1, 28], 42: [1, 27], 43: 26}, {18: [2, 31], 24: [2, 31], 32: [2, 31], 33: [2, 31], 34: [2, 31], 35: [2, 31], 36: [2, 31], 40: [2, 31], 42: [2, 31]}, {18: [2, 33], 24: [2, 33], 36: [2, 33], 40: [2, 33]}], defaultActions: {3: [2, 2], 16: [2, 1], 50: [2, 42]}, parseError: function s(x, w) {
                    throw new Error(x)
                }, parse: function u(F) {
                    var M = this, C = [0], V = [null], H = [], W = this.table, x = "", G = 0, T = 0, z = 0, E = 2, J = 1;
                    this.lexer.setInput(F);
                    this.lexer.yy = this.yy;
                    this.yy.lexer = this.lexer;
                    this.yy.parser = this;
                    if (typeof this.lexer.yylloc == "undefined") {
                        this.lexer.yylloc = {}
                    }
                    var y = this.lexer.yylloc;
                    H.push(y);
                    var A = this.lexer.options && this.lexer.options.ranges;
                    if (typeof this.yy.parseError === "function") {
                        this.parseError = this.yy.parseError
                    }
                    function L(Y) {
                        C.length = C.length - 2 * Y;
                        V.length = V.length - Y;
                        H.length = H.length - Y
                    }
                    function K() {
                        var Y;
                        Y = M.lexer.lex() || 1;
                        if (typeof Y !== "number") {
                            Y = M.symbols_[Y] || Y
                        }
                        return Y
                    }
                    var S, O, B, R, X, I, Q = {}, N, U, w, D;
                    while (true) {
                        B = C[C.length - 1];
                        if (this.defaultActions[B]) {
                            R = this.defaultActions[B]
                        } else {
                            if (S === null || typeof S == "undefined") {
                                S = K()
                            }
                            R = W[B] && W[B][S]
                        }
                        if (typeof R === "undefined" || !R.length || !R[0]) {
                            var P = "";
                            if (!z) {
                                D = [];
                                for (N in W[B]) {
                                    if (this.terminals_[N] && N > 2) {
                                        D.push("'" + this.terminals_[N] + "'")
                                    }
                                }
                                if (this.lexer.showPosition) {
                                    P = "Parse error on line " + (G + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + D.join(", ") + ", got '" + (this.terminals_[S] || S) + "'"
                                } else {
                                    P = "Parse error on line " + (G + 1) + ": Unexpected " + (S == 1 ? "end of input" : "'" + (this.terminals_[S] || S) + "'")
                                }
                                this.parseError(P, {text: this.lexer.match, token: this.terminals_[S] || S, line: this.lexer.yylineno, loc: y, expected: D})
                            }
                        }
                        if (R[0] instanceof Array && R.length > 1) {
                            throw new Error("Parse Error: multiple actions possible at state: " + B + ", token: " + S)
                        }
                        switch (R[0]) {
                            case 1:
                                C.push(S);
                                V.push(this.lexer.yytext);
                                H.push(this.lexer.yylloc);
                                C.push(R[1]);
                                S = null;
                                if (!O) {
                                    T = this.lexer.yyleng;
                                    x = this.lexer.yytext;
                                    G = this.lexer.yylineno;
                                    y = this.lexer.yylloc;
                                    if (z > 0) {
                                        z--
                                    }
                                } else {
                                    S = O;
                                    O = null
                                }
                                break;
                            case 2:
                                U = this.productions_[R[1]][1];
                                Q.$ = V[V.length - U];
                                Q._$ = {first_line: H[H.length - (U || 1)].first_line, last_line: H[H.length - 1].last_line, first_column: H[H.length - (U || 1)].first_column, last_column: H[H.length - 1].last_column};
                                if (A) {
                                    Q._$.range = [H[H.length - (U || 1)].range[0], H[H.length - 1].range[1]]
                                }
                                I = this.performAction.call(Q, x, T, G, this.yy, R[1], V, H);
                                if (typeof I !== "undefined") {
                                    return I
                                }
                                if (U) {
                                    C = C.slice(0, -1 * U * 2);
                                    V = V.slice(0, -1 * U);
                                    H = H.slice(0, -1 * U)
                                }
                                C.push(this.productions_[R[1]][0]);
                                V.push(Q.$);
                                H.push(Q._$);
                                w = W[C[C.length - 2]][C[C.length - 1]];
                                C.push(w);
                                break;
                            case 3:
                                return true
                        }
                    }
                    return true
                }};
            function o(w, x) {
                return{left: w.charAt(2) === "~", right: x.charAt(0) === "~" || x.charAt(1) === "~"}
            }
            var p = (function() {
                var z = ({EOF: 1, parseError: function B(E, D) {
                        if (this.yy.parser) {
                            this.yy.parser.parseError(E, D)
                        } else {
                            throw new Error(E)
                        }
                    }, setInput: function(D) {
                        this._input = D;
                        this._more = this._less = this.done = false;
                        this.yylineno = this.yyleng = 0;
                        this.yytext = this.matched = this.match = "";
                        this.conditionStack = ["INITIAL"];
                        this.yylloc = {first_line: 1, first_column: 0, last_line: 1, last_column: 0};
                        if (this.options.ranges) {
                            this.yylloc.range = [0, 0]
                        }
                        this.offset = 0;
                        return this
                    }, input: function() {
                        var E = this._input[0];
                        this.yytext += E;
                        this.yyleng++;
                        this.offset++;
                        this.match += E;
                        this.matched += E;
                        var D = E.match(/(?:\r\n?|\n).*/g);
                        if (D) {
                            this.yylineno++;
                            this.yylloc.last_line++
                        } else {
                            this.yylloc.last_column++
                        }
                        if (this.options.ranges) {
                            this.yylloc.range[1]++
                        }
                        this._input = this._input.slice(1);
                        return E
                    }, unput: function(F) {
                        var D = F.length;
                        var E = F.split(/(?:\r\n?|\n)/g);
                        this._input = F + this._input;
                        this.yytext = this.yytext.substr(0, this.yytext.length - D - 1);
                        this.offset -= D;
                        var H = this.match.split(/(?:\r\n?|\n)/g);
                        this.match = this.match.substr(0, this.match.length - 1);
                        this.matched = this.matched.substr(0, this.matched.length - 1);
                        if (E.length - 1) {
                            this.yylineno -= E.length - 1
                        }
                        var G = this.yylloc.range;
                        this.yylloc = {first_line: this.yylloc.first_line, last_line: this.yylineno + 1, first_column: this.yylloc.first_column, last_column: E ? (E.length === H.length ? this.yylloc.first_column : 0) + H[H.length - E.length].length - E[0].length : this.yylloc.first_column - D};
                        if (this.options.ranges) {
                            this.yylloc.range = [G[0], G[0] + this.yyleng - D]
                        }
                        return this
                    }, more: function() {
                        this._more = true;
                        return this
                    }, less: function(D) {
                        this.unput(this.match.slice(D))
                    }, pastInput: function() {
                        var D = this.matched.substr(0, this.matched.length - this.match.length);
                        return(D.length > 20 ? "..." : "") + D.substr(-20).replace(/\n/g, "")
                    }, upcomingInput: function() {
                        var D = this.match;
                        if (D.length < 20) {
                            D += this._input.substr(0, 20 - D.length)
                        }
                        return(D.substr(0, 20) + (D.length > 20 ? "..." : "")).replace(/\n/g, "")
                    }, showPosition: function() {
                        var D = this.pastInput();
                        var E = new Array(D.length + 1).join("-");
                        return D + this.upcomingInput() + "\n" + E + "^"
                    }, next: function() {
                        if (this.done) {
                            return this.EOF
                        }
                        if (!this._input) {
                            this.done = true
                        }
                        var J, H, E, G, F, D;
                        if (!this._more) {
                            this.yytext = "";
                            this.match = ""
                        }
                        var K = this._currentRules();
                        for (var I = 0; I < K.length; I++) {
                            E = this._input.match(this.rules[K[I]]);
                            if (E && (!H || E[0].length > H[0].length)) {
                                H = E;
                                G = I;
                                if (!this.options.flex) {
                                    break
                                }
                            }
                        }
                        if (H) {
                            D = H[0].match(/(?:\r\n?|\n).*/g);
                            if (D) {
                                this.yylineno += D.length
                            }
                            this.yylloc = {first_line: this.yylloc.last_line, last_line: this.yylineno + 1, first_column: this.yylloc.last_column, last_column: D ? D[D.length - 1].length - D[D.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + H[0].length};
                            this.yytext += H[0];
                            this.match += H[0];
                            this.matches = H;
                            this.yyleng = this.yytext.length;
                            if (this.options.ranges) {
                                this.yylloc.range = [this.offset, this.offset += this.yyleng]
                            }
                            this._more = false;
                            this._input = this._input.slice(H[0].length);
                            this.matched += H[0];
                            J = this.performAction.call(this, this.yy, this, K[G], this.conditionStack[this.conditionStack.length - 1]);
                            if (this.done && this._input) {
                                this.done = false
                            }
                            if (J) {
                                return J
                            } else {
                                return
                            }
                        }
                        if (this._input === "") {
                            return this.EOF
                        } else {
                            return this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {text: "", token: null, line: this.yylineno})
                        }
                    }, lex: function w() {
                        var D = this.next();
                        if (typeof D !== "undefined") {
                            return D
                        } else {
                            return this.lex()
                        }
                    }, begin: function x(D) {
                        this.conditionStack.push(D)
                    }, popState: function C() {
                        return this.conditionStack.pop()
                    }, _currentRules: function A() {
                        return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules
                    }, topState: function() {
                        return this.conditionStack[this.conditionStack.length - 2]
                    }, pushState: function x(D) {
                        this.begin(D)
                    }});
                z.options = {};
                z.performAction = function y(I, E, H, D) {
                    function F(K, J) {
                        return E.yytext = E.yytext.substr(K, E.yyleng - J)
                    }
                    var G = D;
                    switch (H) {
                        case 0:
                            if (E.yytext.slice(-2) === "\\\\") {
                                F(0, 1);
                                this.begin("mu")
                            } else {
                                if (E.yytext.slice(-1) === "\\") {
                                    F(0, 1);
                                    this.begin("emu")
                                } else {
                                    this.begin("mu")
                                }
                            }
                            if (E.yytext) {
                                return 14
                            }
                            break;
                        case 1:
                            return 14;
                            break;
                        case 2:
                            this.popState();
                            return 14;
                            break;
                        case 3:
                            F(0, 4);
                            this.popState();
                            return 15;
                            break;
                        case 4:
                            return 35;
                            break;
                        case 5:
                            return 36;
                            break;
                        case 6:
                            return 25;
                            break;
                        case 7:
                            return 16;
                            break;
                        case 8:
                            return 20;
                            break;
                        case 9:
                            return 19;
                            break;
                        case 10:
                            return 19;
                            break;
                        case 11:
                            return 23;
                            break;
                        case 12:
                            return 22;
                            break;
                        case 13:
                            this.popState();
                            this.begin("com");
                            break;
                        case 14:
                            F(3, 5);
                            this.popState();
                            return 15;
                            break;
                        case 15:
                            return 22;
                            break;
                        case 16:
                            return 41;
                            break;
                        case 17:
                            return 40;
                            break;
                        case 18:
                            return 40;
                            break;
                        case 19:
                            return 44;
                            break;
                        case 20:
                            break;
                        case 21:
                            this.popState();
                            return 24;
                            break;
                        case 22:
                            this.popState();
                            return 18;
                            break;
                        case 23:
                            E.yytext = F(1, 2).replace(/\\"/g, '"');
                            return 32;
                            break;
                        case 24:
                            E.yytext = F(1, 2).replace(/\\'/g, "'");
                            return 32;
                            break;
                        case 25:
                            return 42;
                            break;
                        case 26:
                            return 34;
                            break;
                        case 27:
                            return 34;
                            break;
                        case 28:
                            return 33;
                            break;
                        case 29:
                            return 40;
                            break;
                        case 30:
                            E.yytext = F(1, 2);
                            return 40;
                            break;
                        case 31:
                            return"INVALID";
                            break;
                        case 32:
                            return 5;
                            break
                    }
                };
                z.rules = [/^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/, /^(?:[\s\S]*?--\}\})/, /^(?:\()/, /^(?:\))/, /^(?:\{\{(~)?>)/, /^(?:\{\{(~)?#)/, /^(?:\{\{(~)?\/)/, /^(?:\{\{(~)?\^)/, /^(?:\{\{(~)?\s*else\b)/, /^(?:\{\{(~)?\{)/, /^(?:\{\{(~)?&)/, /^(?:\{\{!--)/, /^(?:\{\{![\s\S]*?\}\})/, /^(?:\{\{(~)?)/, /^(?:=)/, /^(?:\.\.)/, /^(?:\.(?=([=~}\s\/.)])))/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}(~)?\}\})/, /^(?:(~)?\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=([~}\s)])))/, /^(?:false(?=([~}\s)])))/, /^(?:-?[0-9]+(?=([~}\s)])))/, /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)]))))/, /^(?:\[[^\]]*\])/, /^(?:.)/, /^(?:$)/];
                z.conditions = {mu: {rules: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32], inclusive: false}, emu: {rules: [2], inclusive: false}, com: {rules: [3], inclusive: false}, INITIAL: {rules: [0, 1, 32], inclusive: true}};
                return z
            })();
            v.lexer = p;
            function t() {
                this.yy = {}
            }
            t.prototype = v;
            v.Parser = t;
            return new t
        })();
        n = m;
        return n
    })();
    var l = (function(q, m) {
        var n = {};
        var r = q;
        var o = m;
        n.parser = r;
        function p(s) {
            if (s.constructor === o.ProgramNode) {
                return s
            }
            r.yy = o;
            return r.parse(s)
        }
        n.parse = p;
        return n
    })(b, j);
    var e = (function(r) {
        var q = {};
        var m = r;
        function o() {
        }
        q.Compiler = o;
        o.prototype = {compiler: o, disassemble: function() {
                var x = this.opcodes, w, u = [], z, y;
                for (var v = 0, s = x.length; v < s; v++) {
                    w = x[v];
                    if (w.opcode === "DECLARE") {
                        u.push("DECLARE " + w.name + "=" + w.value)
                    } else {
                        z = [];
                        for (var t = 0; t < w.args.length; t++) {
                            y = w.args[t];
                            if (typeof y === "string") {
                                y = '"' + y.replace("\n", "\\n") + '"'
                            }
                            z.push(y)
                        }
                        u.push(w.opcode + " " + z.join(" "))
                    }
                }
                return u.join("\n")
            }, equals: function(t) {
                var s = this.opcodes.length;
                if (t.opcodes.length !== s) {
                    return false
                }
                for (var w = 0; w < s; w++) {
                    var x = this.opcodes[w], u = t.opcodes[w];
                    if (x.opcode !== u.opcode || x.args.length !== u.args.length) {
                        return false
                    }
                    for (var v = 0; v < x.args.length; v++) {
                        if (x.args[v] !== u.args[v]) {
                            return false
                        }
                    }
                }
                s = this.children.length;
                if (t.children.length !== s) {
                    return false
                }
                for (w = 0; w < s; w++) {
                    if (!this.children[w].equals(t.children[w])) {
                        return false
                    }
                }
                return true
            }, guid: 0, compile: function(s, u) {
                this.opcodes = [];
                this.children = [];
                this.depths = {list: []};
                this.options = u;
                var v = this.options.knownHelpers;
                this.options.knownHelpers = {helperMissing: true, blockHelperMissing: true, each: true, "if": true, unless: true, "with": true, log: true};
                if (v) {
                    for (var t in v) {
                        this.options.knownHelpers[t] = v[t]
                    }
                }
                return this.accept(s)
            }, accept: function(u) {
                var t = u.strip || {}, s;
                if (t.left) {
                    this.opcode("strip")
                }
                s = this[u.type](u);
                if (t.right) {
                    this.opcode("strip")
                }
                return s
            }, program: function(u) {
                var t = u.statements;
                for (var v = 0, s = t.length; v < s; v++) {
                    this.accept(t[v])
                }
                this.isSimple = s === 1;
                this.depths.list = this.depths.list.sort(function(x, w) {
                    return x - w
                });
                return this
            }, compileProgram: function(u) {
                var s = new this.compiler().compile(u, this.options);
                var v = this.guid++, x;
                this.usePartial = this.usePartial || s.usePartial;
                this.children[v] = s;
                for (var w = 0, t = s.depths.list.length; w < t; w++) {
                    x = s.depths.list[w];
                    if (x < 2) {
                        continue
                    } else {
                        this.addDepth(x - 1)
                    }
                }
                return v
            }, block: function(x) {
                var w = x.mustache, t = x.program, s = x.inverse;
                if (t) {
                    t = this.compileProgram(t)
                }
                if (s) {
                    s = this.compileProgram(s)
                }
                var v = w.sexpr;
                var u = this.classifySexpr(v);
                if (u === "helper") {
                    this.helperSexpr(v, t, s)
                } else {
                    if (u === "simple") {
                        this.simpleSexpr(v);
                        this.opcode("pushProgram", t);
                        this.opcode("pushProgram", s);
                        this.opcode("emptyHash");
                        this.opcode("blockValue")
                    } else {
                        this.ambiguousSexpr(v, t, s);
                        this.opcode("pushProgram", t);
                        this.opcode("pushProgram", s);
                        this.opcode("emptyHash");
                        this.opcode("ambiguousBlockValue")
                    }
                }
                this.opcode("append")
            }, hash: function(v) {
                var u = v.pairs, x, w;
                this.opcode("pushHash");
                for (var t = 0, s = u.length; t < s; t++) {
                    x = u[t];
                    w = x[1];
                    if (this.options.stringParams) {
                        if (w.depth) {
                            this.addDepth(w.depth)
                        }
                        this.opcode("getContext", w.depth || 0);
                        this.opcode("pushStringParam", w.stringModeValue, w.type);
                        if (w.type === "sexpr") {
                            this.sexpr(w)
                        }
                    } else {
                        this.accept(w)
                    }
                    this.opcode("assignToHash", x[0])
                }
                this.opcode("popHash")
            }, partial: function(s) {
                var t = s.partialName;
                this.usePartial = true;
                if (s.context) {
                    this.ID(s.context)
                } else {
                    this.opcode("push", "depth0")
                }
                this.opcode("invokePartial", t.name);
                this.opcode("append")
            }, content: function(s) {
                this.opcode("appendContent", s.string)
            }, mustache: function(s) {
                this.sexpr(s.sexpr);
                if (s.escaped && !this.options.noEscape) {
                    this.opcode("appendEscaped")
                } else {
                    this.opcode("append")
                }
            }, ambiguousSexpr: function(w, u, t) {
                var x = w.id, v = x.parts[0], s = u != null || t != null;
                this.opcode("getContext", x.depth);
                this.opcode("pushProgram", u);
                this.opcode("pushProgram", t);
                this.opcode("invokeAmbiguous", v, s)
            }, simpleSexpr: function(s) {
                var t = s.id;
                if (t.type === "DATA") {
                    this.DATA(t)
                } else {
                    if (t.parts.length) {
                        this.ID(t)
                    } else {
                        this.addDepth(t.depth);
                        this.opcode("getContext", t.depth);
                        this.opcode("pushContext")
                    }
                }
                this.opcode("resolvePossibleLambda")
            }, helperSexpr: function(v, t, s) {
                var w = this.setupFullMustacheParams(v, t, s), u = v.id.parts[0];
                if (this.options.knownHelpers[u]) {
                    this.opcode("invokeKnownHelper", w.length, u)
                } else {
                    if (this.options.knownHelpersOnly) {
                        throw new m("You specified knownHelpersOnly, but used the unknown helper " + u, v)
                    } else {
                        this.opcode("invokeHelper", w.length, u, v.isRoot)
                    }
                }
            }, sexpr: function(t) {
                var s = this.classifySexpr(t);
                if (s === "simple") {
                    this.simpleSexpr(t)
                } else {
                    if (s === "helper") {
                        this.helperSexpr(t)
                    } else {
                        this.ambiguousSexpr(t)
                    }
                }
            }, ID: function(v) {
                this.addDepth(v.depth);
                this.opcode("getContext", v.depth);
                var t = v.parts[0];
                if (!t) {
                    this.opcode("pushContext")
                } else {
                    this.opcode("lookupOnContext", v.parts[0])
                }
                for (var u = 1, s = v.parts.length; u < s; u++) {
                    this.opcode("lookup", v.parts[u])
                }
            }, DATA: function(u) {
                this.options.data = true;
                if (u.id.isScoped || u.id.depth) {
                    throw new m("Scoped data references are not supported: " + u.original, u)
                }
                this.opcode("lookupData");
                var v = u.id.parts;
                for (var t = 0, s = v.length; t < s; t++) {
                    this.opcode("lookup", v[t])
                }
            }, STRING: function(s) {
                this.opcode("pushString", s.string)
            }, INTEGER: function(s) {
                this.opcode("pushLiteral", s.integer)
            }, BOOLEAN: function(s) {
                this.opcode("pushLiteral", s.bool)
            }, comment: function() {
            }, opcode: function(s) {
                this.opcodes.push({opcode: s, args: [].slice.call(arguments, 1)})
            }, declare: function(s, t) {
                this.opcodes.push({opcode: "DECLARE", name: s, value: t})
            }, addDepth: function(s) {
                if (s === 0) {
                    return
                }
                if (!this.depths[s]) {
                    this.depths[s] = true;
                    this.depths.list.push(s)
                }
            }, classifySexpr: function(v) {
                var u = v.isHelper;
                var w = v.eligibleHelper;
                var t = this.options;
                if (w && !u) {
                    var s = v.id.parts[0];
                    if (t.knownHelpers[s]) {
                        u = true
                    } else {
                        if (t.knownHelpersOnly) {
                            w = false
                        }
                    }
                }
                if (u) {
                    return"helper"
                } else {
                    if (w) {
                        return"ambiguous"
                    } else {
                        return"simple"
                    }
                }
            }, pushParams: function(u) {
                var s = u.length, t;
                while (s--) {
                    t = u[s];
                    if (this.options.stringParams) {
                        if (t.depth) {
                            this.addDepth(t.depth)
                        }
                        this.opcode("getContext", t.depth || 0);
                        this.opcode("pushStringParam", t.stringModeValue, t.type);
                        if (t.type === "sexpr") {
                            this.sexpr(t)
                        }
                    } else {
                        this[t.type](t)
                    }
                }
            }, setupFullMustacheParams: function(u, t, s) {
                var v = u.params;
                this.pushParams(v);
                this.opcode("pushProgram", t);
                this.opcode("pushProgram", s);
                if (u.hash) {
                    this.hash(u.hash)
                } else {
                    this.opcode("emptyHash")
                }
                return v
            }};
        function n(u, v, w) {
            if (u == null || (typeof u !== "string" && u.constructor !== w.AST.ProgramNode)) {
                throw new m("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " + u)
            }
            v = v || {};
            if (!("data" in v)) {
                v.data = true
            }
            var t = w.parse(u);
            var s = new w.Compiler().compile(t, v);
            return new w.JavaScriptCompiler().compile(s, v)
        }
        q.precompile = n;
        function p(s, t, u) {
            if (s == null || (typeof s !== "string" && s.constructor !== u.AST.ProgramNode)) {
                throw new m("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + s)
            }
            t = t || {};
            if (!("data" in t)) {
                t.data = true
            }
            var w;
            function v() {
                var z = u.parse(s);
                var y = new u.Compiler().compile(z, t);
                var x = new u.JavaScriptCompiler().compile(y, t, undefined, true);
                return u.template(x)
            }
            return function(y, x) {
                if (!w) {
                    w = v()
                }
                return w.call(this, y, x)
            }
        }
        q.compile = p;
        return q
    })(d);
    var h = (function(u, x) {
        var w;
        var m = u.COMPILER_REVISION;
        var q = u.REVISION_CHANGES;
        var r = u.log;
        var s = x;
        function o(z) {
            this.value = z
        }
        function y() {
        }
        y.prototype = {nameLookup: function(C, A) {
                var B, z;
                if (C.indexOf("depth") === 0) {
                    B = true
                }
                if (/^[0-9]+$/.test(A)) {
                    z = C + "[" + A + "]"
                } else {
                    if (y.isValidJavaScriptVariableName(A)) {
                        z = C + "." + A
                    } else {
                        z = C + "['" + A + "']"
                    }
                }
                if (B) {
                    return"(" + C + " && " + z + ")"
                } else {
                    return z
                }
            }, compilerInfo: function() {
                var A = m, z = q[A];
                return"this.compilerInfo = [" + A + ",'" + z + "'];\n"
            }, appendToBuffer: function(z) {
                if (this.environment.isSimple) {
                    return"return " + z + ";"
                } else {
                    return{appendToBuffer: true, content: z, toString: function() {
                            return"buffer += " + z + ";"
                        }}
                }
            }, initializeBuffer: function() {
                return this.quotedString("")
            }, namespace: "Handlebars", compile: function(z, B, D, C) {
                this.environment = z;
                this.options = B || {};
                r("debug", this.environment.disassemble() + "\n\n");
                this.name = this.environment.name;
                this.isChild = !!D;
                this.context = D || {programs: [], environments: [], aliases: {}};
                this.preamble();
                this.stackSlot = 0;
                this.stackVars = [];
                this.registers = {list: []};
                this.hashes = [];
                this.compileStack = [];
                this.inlineStack = [];
                this.compileChildren(z, B);
                var F = z.opcodes, E;
                this.i = 0;
                for (var A = F.length; this.i < A; this.i++) {
                    E = F[this.i];
                    if (E.opcode === "DECLARE") {
                        this[E.name] = E.value
                    } else {
                        this[E.opcode].apply(this, E.args)
                    }
                    if (E.opcode !== this.stripNext) {
                        this.stripNext = false
                    }
                }
                this.pushSource("");
                if (this.stackSlot || this.inlineStack.length || this.compileStack.length) {
                    throw new s("Compile completed with content left on stack")
                }
                return this.createFunctionContext(C)
            }, preamble: function() {
                var z = [];
                if (!this.isChild) {
                    var A = this.namespace;
                    var B = "helpers = this.merge(helpers, " + A + ".helpers);";
                    if (this.environment.usePartial) {
                        B = B + " partials = this.merge(partials, " + A + ".partials);"
                    }
                    if (this.options.data) {
                        B = B + " data = data || {};"
                    }
                    z.push(B)
                } else {
                    z.push("")
                }
                if (!this.environment.isSimple) {
                    z.push(", buffer = " + this.initializeBuffer())
                } else {
                    z.push("")
                }
                this.lastContext = 0;
                this.source = z
            }, createFunctionContext: function(D) {
                var F = this.stackVars.concat(this.registers.list);
                if (F.length > 0) {
                    this.source[1] = this.source[1] + ", " + F.join(", ")
                }
                if (!this.isChild) {
                    for (var C in this.context.aliases) {
                        if (this.context.aliases.hasOwnProperty(C)) {
                            this.source[1] = this.source[1] + ", " + C + "=" + this.context.aliases[C]
                        }
                    }
                }
                if (this.source[1]) {
                    this.source[1] = "var " + this.source[1].substring(2) + ";"
                }
                if (!this.isChild) {
                    this.source[1] += "\n" + this.context.programs.join("\n") + "\n"
                }
                if (!this.environment.isSimple) {
                    this.pushSource("return buffer;")
                }
                var G = this.isChild ? ["depth0", "data"] : ["Handlebars", "depth0", "helpers", "partials", "data"];
                for (var B = 0, z = this.environment.depths.list.length; B < z; B++) {
                    G.push("depth" + this.environment.depths.list[B])
                }
                var E = this.mergeSource();
                if (!this.isChild) {
                    E = this.compilerInfo() + E
                }
                if (D) {
                    G.push(E);
                    return Function.apply(this, G)
                } else {
                    var A = "function " + (this.name || "") + "(" + G.join(",") + ") {\n " + E + "}";
                    r("debug", A + "\n\n");
                    return A
                }
            }, mergeSource: function() {
                var D = "", B;
                for (var C = 0, z = this.source.length; C < z; C++) {
                    var A = this.source[C];
                    if (A.appendToBuffer) {
                        if (B) {
                            B = B + "\n + " + A.content
                        } else {
                            B = A.content
                        }
                    } else {
                        if (B) {
                            D += "buffer += " + B + ";\n ";
                            B = undefined
                        }
                        D += A + "\n "
                    }
                }
                return D
            }, blockValue: function() {
                this.context.aliases.blockHelperMissing = "helpers.blockHelperMissing";
                var z = ["depth0"];
                this.setupParams(0, z);
                this.replaceStack(function(A) {
                    z.splice(1, 0, A);
                    return"blockHelperMissing.call(" + z.join(", ") + ")"
                })
            }, ambiguousBlockValue: function() {
                this.context.aliases.blockHelperMissing = "helpers.blockHelperMissing";
                var A = ["depth0"];
                this.setupParams(0, A);
                var z = this.topStack();
                A.splice(1, 0, z);
                this.pushSource("if (!" + this.lastHelper + ") { " + z + " = blockHelperMissing.call(" + A.join(", ") + "); }")
            }, appendContent: function(z) {
                if (this.pendingContent) {
                    z = this.pendingContent + z
                }
                if (this.stripNext) {
                    z = z.replace(/^\s+/, "")
                }
                this.pendingContent = z
            }, strip: function() {
                if (this.pendingContent) {
                    this.pendingContent = this.pendingContent.replace(/\s+$/, "")
                }
                this.stripNext = "strip"
            }, append: function() {
                this.flushInline();
                var z = this.popStack();
                this.pushSource("if(" + z + " || " + z + " === 0) { " + this.appendToBuffer(z) + " }");
                if (this.environment.isSimple) {
                    this.pushSource("else { " + this.appendToBuffer("''") + " }")
                }
            }, appendEscaped: function() {
                this.context.aliases.escapeExpression = "this.escapeExpression";
                this.pushSource(this.appendToBuffer("escapeExpression(" + this.popStack() + ")"))
            }, getContext: function(z) {
                if (this.lastContext !== z) {
                    this.lastContext = z
                }
            }, lookupOnContext: function(z) {
                this.push(this.nameLookup("depth" + this.lastContext, z, "context"))
            }, pushContext: function() {
                this.pushStackLiteral("depth" + this.lastContext)
            }, resolvePossibleLambda: function() {
                this.context.aliases.functionType = '"function"';
                this.replaceStack(function(z) {
                    return"typeof " + z + " === functionType ? " + z + ".apply(depth0) : " + z
                })
            }, lookup: function(z) {
                this.replaceStack(function(A) {
                    return A + " == null || " + A + " === false ? " + A + " : " + this.nameLookup(A, z, "context")
                })
            }, lookupData: function() {
                this.pushStackLiteral("data")
            }, pushStringParam: function(z, A) {
                this.pushStackLiteral("depth" + this.lastContext);
                this.pushString(A);
                if (A !== "sexpr") {
                    if (typeof z === "string") {
                        this.pushString(z)
                    } else {
                        this.pushStackLiteral(z)
                    }
                }
            }, emptyHash: function() {
                this.pushStackLiteral("{}");
                if (this.options.stringParams) {
                    this.push("{}");
                    this.push("{}")
                }
            }, pushHash: function() {
                if (this.hash) {
                    this.hashes.push(this.hash)
                }
                this.hash = {values: [], types: [], contexts: []}
            }, popHash: function() {
                var z = this.hash;
                this.hash = this.hashes.pop();
                if (this.options.stringParams) {
                    this.push("{" + z.contexts.join(",") + "}");
                    this.push("{" + z.types.join(",") + "}")
                }
                this.push("{\n " + z.values.join(",\n ") + "\n }")
            }, pushString: function(z) {
                this.pushStackLiteral(this.quotedString(z))
            }, push: function(z) {
                this.inlineStack.push(z);
                return z
            }, pushLiteral: function(z) {
                this.pushStackLiteral(z)
            }, pushProgram: function(z) {
                if (z != null) {
                    this.pushStackLiteral(this.programExpression(z))
                } else {
                    this.pushStackLiteral(null)
                }
            }, invokeHelper: function(D, A, z) {
                this.context.aliases.helperMissing = "helpers.helperMissing";
                this.useRegister("helper");
                var B = this.lastHelper = this.setupHelper(D, A, true);
                var E = this.nameLookup("depth" + this.lastContext, A, "context");
                var C = "helper = " + B.name + " || " + E;
                if (B.paramsInit) {
                    C += "," + B.paramsInit
                }
                this.push("(" + C + ",helper ? helper.call(" + B.callParams + ") : helperMissing.call(" + B.helperMissingParams + "))");
                if (!z) {
                    this.flushInline()
                }
            }, invokeKnownHelper: function(B, z) {
                var A = this.setupHelper(B, z);
                this.push(A.name + ".call(" + A.callParams + ")")
            }, invokeAmbiguous: function(z, D) {
                this.context.aliases.functionType = '"function"';
                this.useRegister("helper");
                this.emptyHash();
                var A = this.setupHelper(0, z, D);
                var B = this.lastHelper = this.nameLookup("helpers", z, "helper");
                var E = this.nameLookup("depth" + this.lastContext, z, "context");
                var C = this.nextStack();
                if (A.paramsInit) {
                    this.pushSource(A.paramsInit)
                }
                this.pushSource("if (helper = " + B + ") { " + C + " = helper.call(" + A.callParams + "); }");
                this.pushSource("else { helper = " + E + "; " + C + " = typeof helper === functionType ? helper.call(" + A.callParams + ") : helper; }")
            }, invokePartial: function(z) {
                var A = [this.nameLookup("partials", z, "partial"), "'" + z + "'", this.popStack(), "helpers", "partials"];
                if (this.options.data) {
                    A.push("data")
                }
                this.context.aliases.self = "this";
                this.push("self.invokePartial(" + A.join(", ") + ")")
            }, assignToHash: function(A) {
                var C = this.popStack(), z, B;
                if (this.options.stringParams) {
                    B = this.popStack();
                    z = this.popStack()
                }
                var D = this.hash;
                if (z) {
                    D.contexts.push("'" + A + "': " + z)
                }
                if (B) {
                    D.types.push("'" + A + "': " + B)
                }
                D.values.push("'" + A + "': (" + C + ")")
            }, compiler: y, compileChildren: function(z, C) {
                var E = z.children, G, F;
                for (var D = 0, A = E.length; D < A; D++) {
                    G = E[D];
                    F = new this.compiler();
                    var B = this.matchExistingProgram(G);
                    if (B == null) {
                        this.context.programs.push("");
                        B = this.context.programs.length;
                        G.index = B;
                        G.name = "program" + B;
                        this.context.programs[B] = F.compile(G, C, this.context);
                        this.context.environments[B] = G
                    } else {
                        G.index = B;
                        G.name = "program" + B
                    }
                }
            }, matchExistingProgram: function(C) {
                for (var B = 0, A = this.context.environments.length; B < A; B++) {
                    var z = this.context.environments[B];
                    if (z && z.equals(C)) {
                        return B
                    }
                }
            }, programExpression: function(A) {
                this.context.aliases.self = "this";
                if (A == null) {
                    return"self.noop"
                }
                var F = this.environment.children[A], E = F.depths.list, D;
                var C = [F.index, F.name, "data"];
                for (var B = 0, z = E.length; B < z; B++) {
                    D = E[B];
                    if (D === 1) {
                        C.push("depth0")
                    } else {
                        C.push("depth" + (D - 1))
                    }
                }
                return(E.length === 0 ? "self.program(" : "self.programWithDepth(") + C.join(", ") + ")"
            }, register: function(z, A) {
                this.useRegister(z);
                this.pushSource(z + " = " + A + ";")
            }, useRegister: function(z) {
                if (!this.registers[z]) {
                    this.registers[z] = true;
                    this.registers.list.push(z)
                }
            }, pushStackLiteral: function(z) {
                return this.push(new o(z))
            }, pushSource: function(z) {
                if (this.pendingContent) {
                    this.source.push(this.appendToBuffer(this.quotedString(this.pendingContent)));
                    this.pendingContent = undefined
                }
                if (z) {
                    this.source.push(z)
                }
            }, pushStack: function(A) {
                this.flushInline();
                var z = this.incrStack();
                if (A) {
                    this.pushSource(z + " = " + A + ";")
                }
                this.compileStack.push(z);
                return z
            }, replaceStack: function(G) {
                var B = "", C = this.isInline(), F, A, D;
                if (C) {
                    var E = this.popStack(true);
                    if (E instanceof o) {
                        F = E.value;
                        D = true
                    } else {
                        A = !this.stackSlot;
                        var z = !A ? this.topStackName() : this.incrStack();
                        B = "(" + this.push(z) + " = " + E + "),";
                        F = this.topStack()
                    }
                } else {
                    F = this.topStack()
                }
                var H = G.call(this, F);
                if (C) {
                    if (!D) {
                        this.popStack()
                    }
                    if (A) {
                        this.stackSlot--
                    }
                    this.push("(" + B + H + ")")
                } else {
                    if (!/^stack/.test(F)) {
                        F = this.nextStack()
                    }
                    this.pushSource(F + " = (" + B + H + ");")
                }
                return F
            }, nextStack: function() {
                return this.pushStack()
            }, incrStack: function() {
                this.stackSlot++;
                if (this.stackSlot > this.stackVars.length) {
                    this.stackVars.push("stack" + this.stackSlot)
                }
                return this.topStackName()
            }, topStackName: function() {
                return"stack" + this.stackSlot
            }, flushInline: function() {
                var B = this.inlineStack;
                if (B.length) {
                    this.inlineStack = [];
                    for (var A = 0, z = B.length; A < z; A++) {
                        var C = B[A];
                        if (C instanceof o) {
                            this.compileStack.push(C)
                        } else {
                            this.pushStack(C)
                        }
                    }
                }
            }, isInline: function() {
                return this.inlineStack.length
            }, popStack: function(z) {
                var B = this.isInline(), A = (B ? this.inlineStack : this.compileStack).pop();
                if (!z && (A instanceof o)) {
                    return A.value
                } else {
                    if (!B) {
                        if (!this.stackSlot) {
                            throw new s("Invalid stack pop")
                        }
                        this.stackSlot--
                    }
                    return A
                }
            }, topStack: function(A) {
                var z = (this.isInline() ? this.inlineStack : this.compileStack), B = z[z.length - 1];
                if (!A && (B instanceof o)) {
                    return B.value
                } else {
                    return B
                }
            }, quotedString: function(z) {
                return'"' + z.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029") + '"'
            }, setupHelper: function(D, B, A) {
                var C = [], E = this.setupParams(D, C, A);
                var z = this.nameLookup("helpers", B, "helper");
                return{params: C, paramsInit: E, name: z, callParams: ["depth0"].concat(C).join(", "), helperMissingParams: A && ["depth0", this.quotedString(B)].concat(C).join(", ")}
            }, setupOptions: function(B, A) {
                var H = [], E = [], G = [], z, C, F;
                H.push("hash:" + this.popStack());
                if (this.options.stringParams) {
                    H.push("hashTypes:" + this.popStack());
                    H.push("hashContexts:" + this.popStack())
                }
                C = this.popStack();
                F = this.popStack();
                if (F || C) {
                    if (!F) {
                        this.context.aliases.self = "this";
                        F = "self.noop"
                    }
                    if (!C) {
                        this.context.aliases.self = "this";
                        C = "self.noop"
                    }
                    H.push("inverse:" + C);
                    H.push("fn:" + F)
                }
                for (var D = 0; D < B; D++) {
                    z = this.popStack();
                    A.push(z);
                    if (this.options.stringParams) {
                        G.push(this.popStack());
                        E.push(this.popStack())
                    }
                }
                if (this.options.stringParams) {
                    H.push("contexts:[" + E.join(",") + "]");
                    H.push("types:[" + G.join(",") + "]")
                }
                if (this.options.data) {
                    H.push("data:data")
                }
                return H
            }, setupParams: function(C, B, A) {
                var z = "{" + this.setupOptions(C, B).join(",") + "}";
                if (A) {
                    this.useRegister("options");
                    B.push("options");
                    return"options=" + z
                } else {
                    B.push(z);
                    return""
                }
            }};
        var n = ("break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield").split(" ");
        var v = y.RESERVED_WORDS = {};
        for (var t = 0, p = n.length; t < p; t++) {
            v[n[t]] = true
        }
        y.isValidJavaScriptVariableName = function(z) {
            if (!y.RESERVED_WORDS[z] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(z)) {
                return true
            }
            return false
        };
        w = y;
        return w
    })(i, d);
    var c = (function(v, A, n, r, u) {
        var x;
        var m = v;
        var t = A;
        var q = n.parser;
        var p = n.parse;
        var w = r.Compiler;
        var z = r.compile;
        var o = r.precompile;
        var B = u;
        var y = m.create;
        var s = function() {
            var C = y();
            C.compile = function(D, E) {
                return z(D, E, C)
            };
            C.precompile = function(D, E) {
                return o(D, E, C)
            };
            C.AST = t;
            C.Compiler = w;
            C.JavaScriptCompiler = B;
            C.Parser = q;
            C.parse = p;
            return C
        };
        m = s();
        m.create = s;
        x = m;
        return x
    })(f, j, l, e, h);
    return c
})();