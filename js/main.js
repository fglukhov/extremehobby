var isIE9OrBelow = function() {
  return /MSIE\s/.test(navigator.userAgent) && parseFloat(navigator.appVersion.split("MSIE")[1]) < 10;
}

var numFormat = wNumb({
  thousand: ' '
});

$(window).scroll(function () {


  var scrollPos = $(window).scrollTop();

  if (scrollPos > 0) {
    $("header").addClass("header-fixed");
  } else {
    $("header").removeClass("header-fixed");
  }


});

$(window).resize(function () {

});

$(document).ready(function () {

  var scrollPos = $(window).scrollTop();

  if (scrollPos > 0) {
    $("header").addClass("header-fixed");
  } else {
    $("header").removeClass("header-fixed");
  }

  swapGallery();

  // Mobile

  // Contacts

  $(".contacts-section").hide();

  $("#contacts_office").show();

  $(".contacts-tabs li").click(function () {

    var curLi = $(this);

    $(".contacts-tabs li").removeClass("active");
    $(this).addClass("active");

    $(".contacts-section").filter(function () {

      return $(this).attr("id") != curLi.data("section").replace("#", "");

    }).hide();

    $(".contacts-section").filter(function () {

      return $(this).attr("id") == curLi.data("section").replace("#", "");

    }).fadeIn(150);

  });

  // Cart

  $(".cart-table td").each(function () {

    var td = $(this);

    if (td.hasClass("td-cart-discount") || td.hasClass("td-cart-price") || td.hasClass("td-cart-total")) {

      td.html("<span class='val'>" + td.text() + "</span>")

    }

    var colTh = $(".cart-table th").filter(function () {

      return td.prevAll().length == $(this).prevAll().length;

    });

    $('<div class="td-ttl"><span>' + colTh.text() + '</span></div>').prependTo(td);

  });

  // Soclinks trigger

  $(".item-soclinks-trigger").on("click", function () {

    $(".item-soclinks-mob .item-soclinks-buttons").fadeIn(150, function () {

      $(".item-soclinks-mob .item-soclinks-buttons").addClass("open");

    });

  });

  $("body").on("click", function (e) {

    if ($(".item-soclinks-mob .item-soclinks-buttons").hasClass("open") && !$(e.target).parents().hasClass(".item-soclinks-mob")) {

      $(".item-soclinks-mob .item-soclinks-buttons").fadeOut(150, function () {

        $(".item-soclinks-mob .item-soclinks-buttons").removeClass("open");

      });

    }

  });

  // Catalog filter

  if($('#mobile-indicator').css('display') == 'block') {

    $(".mob-filter-trigger").click(function () {

      $(".catalog-filter-wrapper").fadeIn(150);

    });

    $(".catalog-filter .close").click(function () {

      $(".catalog-filter-wrapper").fadeOut(150);

    });

    $(".catalog-filter-wrapper").click(function (e) {

      if (!$(e.target).hasClass("catalog-filter") && !$(e.target).parents().hasClass("catalog-filter")) {

        $(".catalog-filter-wrapper").fadeOut(150);

      }


    });

  }

  // Catalog filter END

  // Mobile menu

  $(".menu-trigger").click(function () {

    $(".header-menu").fadeIn(150);

  });

  $(".menu-close").click(function () {

    $(".header-menu").fadeOut(150);

  });

  $(".header-menu").click(function (e) {

    if (!$(e.target).hasClass("header-menu-inner") && !$(e.target).parents().hasClass("header-menu-inner")) {

      $(".header-menu").fadeOut(150);

    }


  });

  // Mobile menu END

  // Mobile submenu

  $(".submenu").each(function () {

    var mobSubmenu = $('<div class="mob-submenu">' + $(this).find(".submenu-content").html() + '</div>');

    $(".navbar-nav > li[data-submenu='#" + $(this).attr("id") +"']").append(mobSubmenu);

  });

  if ($("#mobile-indicator").css("display") == "block") {

    $(".navbar-nav > li[data-submenu]").click(function (e) {

      if (!$(e.target).attr("href")) {

        var menuLi = $(this);

        $(this).closest("li").find(".mob-submenu").slideToggle(250, function () {

          menuLi.toggleClass("open");

        });

      }

    });

  }

  // Mobile submenu END

  // Region modal

  $(".location-tab-content .tab-pane").each(function () {

    var tabHeader = $('<div class="tab-header">' + $(".location-tabs a[href='#" + $(this).attr("id") + "']").text() + '</div>');

    $(this).before(tabHeader);

    $(".location-tab-content .tab-header").first().addClass("open");

  });

  $("body").on("click", ".tab-header", function () {

    $(".location-tabs a[href='#" + $(this).next(".tab-pane").attr("id") + "']").tab("show");

  });

  $(".location-tabs a").on("show.bs.tab", function () {

    $(".location-tab-content .tab-header").removeClass("open");

    $(".location-tab-content .tab-pane" + $(this).attr("href")).prev(".tab-header").addClass("open");

  });

  // Region modal END

  // Mobile END

  // Fast view

  $("body").on("click", ".catalog-tmb a", function (e) {

    if ($(e.target).hasClass("btn-fast-view") || $(e.target).parents().hasClass("btn-fast-view")) {

      var url = $(this).closest(".catalog-tmb").find(".btn-fast-view").data("url");

      var fastViewModal = $('\
      \
      <div class="modal fade fast-view-modal" id="fastViewModal" tabindex="-1">\
        <div class="modal-dialog">\
          <div class="modal-content">\
            <div class="modal-header">\
              <button class="close" type="button" data-dismiss="modal" aria-label="Close"></button>\
            </div>\
            <div class="modal-body">\
              ' + 'modal body' + '\
              </div>\
            </div>\
          </div>\
        </div>\
      </div>\
      ');

      if (!$("#fastViewModal").length) {

        $("body").append(fastViewModal);

      }

      $.ajax({
        url: url,
        dataType: "html"
      }).done(function(data) {
        var modalContent = data;

        $("#fastViewModal .modal-body").html(modalContent);
        $("#fastViewModal").modal('show');


        $("#fastViewModal").modal('show');

      });

      return false;
    }

  });

  $("body").on("shown.bs.modal", "#fastViewModal", function () {

    console.log("show");

    $("#fastViewModal .item-gallery-thumbs").slick({
      slidesToShow: 7,
      slidesToScroll: 7,
      vertical: true,
      infinite: false
    });

    $("#fastViewModal .item-gallery-slider").on("afterChange", function (event, slick, currentSlide) {

      $(this).closest(".item-gallery").find(".item-gallery-thumbs .slide").removeClass("active");
      $(this).closest(".item-gallery").find(".item-gallery-thumbs .slide[data-slick-index='" + currentSlide +"']").addClass("active");

    });

    $("#fastViewModal .item-gallery-slider").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true
    });

  });

  $(".item-gallery-slider").on("afterChange", function (event, slick, currentSlide) {

    $(this).closest(".item-gallery").find(".item-gallery-thumbs .slide").removeClass("active");
    $(this).closest(".item-gallery").find(".item-gallery-thumbs .slide[data-slick-index='" + currentSlide +"']").addClass("active");

  });

  $("body").on("click", ".item-gallery-thumbs .slide", function () {

    $(this).closest(".item-gallery-thumbs").find(".slide").removeClass("active");

    $(this).addClass("active");

    $(this).closest(".item-gallery").find(".item-gallery-slider").slick("slickGoTo", $(this).data("slick-index"));

  });

  // Header search

  $(".header-search-form input[type=text]").on("focus", function () {

    $(this).closest(".header-search-form").addClass("open");

  });

  $(".header-search-form input[type=text]").on("blur", function () {

    $(this).closest(".header-search-form").removeClass("open");

  });

  // Modals

  $(".modal").on("shown.bs.modal", function() {

    $(".modal").not($(this)).modal("hide");

  });

  // Submenu

  if ($("#mobile-indicator").css("display") != "block") {

    $(".navbar-nav li").on("mouseenter", function () {

      var listItem = $(this);

      if ($(this).data("submenu")) {

        $(".submenu").filter(function () {

          return $(this).attr("id") !== listItem.data("submenu").replace("#", "");

        }).stop().fadeOut(250);

        $($(this).data("submenu")).stop().fadeIn(250);
        listItem.addClass("open");

      }

    });

    $(".navbar-nav li").on("mouseleave", function () {

      var listItem = $(this),
        submenu = $($(this).data("submenu"));


      var t = setTimeout(function () {

        if (!submenu.is(":hover")) {
          submenu.stop().fadeOut(250);
          listItem.removeClass("open");
        }

      }, 100);

    });

    $(".submenu").on("mouseleave", function () {

      var listItem = $(".navbar-nav li[data-submenu='#" + $(this).attr("id") + "']"),
        submenu = $(this);


      var t = setTimeout(function () {

        if (!listItem.is(":hover")) {
          submenu.stop().fadeOut(250);
          listItem.removeClass("open");
        }

      }, 100);

    });

  }

  // Order track link

  $(".order-item").click(function (e) {

    if ($(e.target).hasClass("order-track-link")) {
      window.open($(e.target).data("href"), '_blank');
      return false;
    }

  });

  $("body").on("input change", "input, select", function () {

    if ($(this).closest("form").find("button[type=submit]").length) {
      $(this).closest("form").find("button[type=submit]").attr("disabled", false);
    }

  });

  // Header dropdowns

  if ($("#mobile-indicator").css("display") != "block") {

    $("[data-dropdown-hover]").on("mouseenter", function (e) {

      var dropdown = $($(this).data("dropdown-hover"));

      dropdown.fadeIn(150);

    });

    $("[data-dropdown-hover]").on("mouseleave", function (e) {

      var dropdown = $($(this).data("dropdown-hover"));

      dropdown.fadeOut(150);

    });

  } else {

    $("[data-dropdown-hover='.header-dropdown-user']").on("click", function (e) {

      var dropdown = $($(this).data("dropdown-hover"));

      dropdown.fadeIn(150);

    });

    $("body").on("click", function (e) {

      if ($(e.target).data("dropdown-hover") != ".header-dropdown-user" && $(e.target).closest("li").data("dropdown-hover") != ".header-dropdown-user") {

        $(".header-dropdown.dropdown-hover").fadeOut(150, function () {
          $(".header-dropdown.dropdown-hover").removeClass("active");
        });

      }

    });

  }
  
  $("[data-dropdown]").click(function (e) {

    if ($($(this).data("dropdown")).length && !$(e.target).hasClass("btn-ok")) {

      var dropdown = $($(this).data("dropdown"));

      $(".header-dropdown").not(dropdown).fadeOut(150, function () {
        $(".header-dropdown").not(dropdown).removeClass("active");
      });

      if (!dropdown.hasClass("active")) {
        dropdown.fadeIn(150, function () {
          dropdown.addClass("active");
        });
      } else {
        dropdown.fadeOut(150, function () {
          dropdown.removeClass("active");
        });
      }
    }

  });

  $("body").on("click", function (e) {

    if (!$(e.target).hasClass("dropdown-trigger") && !$(e.target).parents().hasClass("dropdown-trigger") && !$(e.target).hasClass("dropdown-hover") && !$(e.target).parents().hasClass("dropdown-hover")) {

      $(".header-dropdown").not(".dropdown-hover").fadeOut(150, function () {
        $(".header-dropdown").not(".dropdown-hover").removeClass("active");
      });

    }

  });

  $(".header-dropdown .btn-ok").click(function () {

    var dropdown = $(this).closest(".header-dropdown");

    dropdown.fadeOut(150, function () {
      dropdown.removeClass("active");
    });

  });

  // Top slider

  $(".top-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    fade: true
  });
  
  // Item count
  
  $("body").on("click", ".btn-count-minus, .btn-count-plus", function () {

    var btn = $(this),
        field = $(this).closest(".count").find("input[type=text]");

    if (btn.hasClass("btn-count-minus") && field.val()*1 > 1) {

      var newVal = field.val()*1 - 1;
      field.val(newVal);

    }

    if (btn.hasClass("btn-count-plus")) {

      var newVal = field.val()*1 + 1;
      field.val(newVal);

    }

    cartTotal();


  });

  // Items slider

  $(".items-slider").slick({
    slidesToShow: 4,
    slidesToScroll: 4,
    infinite: false,
    dots: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  });

  // Catalog item

  $(".item-gallery-thumbs").slick({
    slidesToShow: 7,
    slidesToScroll: 7,
    vertical: true,
    infinite: false
  });

  $(".item-gallery-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: true
        }
      }
    ]
  });

  // Catalog

  $("body").on("mouseenter", ".catalog-tmb", function () {

    if ($(this).find(".catalog-tmb-extra").length) {

      var catalogTmb = $(this),
          catalogTmbDummy = $(this).find(".catalog-tmb-dummy"),
          catalogTmbExtra = $(this).find(".catalog-tmb-extra"),
          catalogTmbExtraInner = $(this).find(".catalog-tmb-extra-inner");

      catalogTmbExtra.css({
        height: catalogTmbExtraInner.height()
      });

      catalogTmbDummy.css({
        height: catalogTmbExtraInner.height() + catalogTmb.height()
      });

    }

  });

  $("body").on("mouseleave", ".catalog-tmb", function () {

    if ($(this).find(".catalog-tmb-extra").length) {

      var catalogTmb = $(this),
          catalogTmbDummy = $(this).find(".catalog-tmb-dummy"),
          catalogTmbExtra = $(this).find(".catalog-tmb-extra"),
          catalogTmbExtraInner = $(this).find(".catalog-tmb-extra-inner");

      catalogTmbExtra.css({
        height: 0
      });

      catalogTmbDummy.css({
        height: catalogTmb.height()
      });

    }

  });


  $("body").on("mouseover mousemove mouseenter", ".catalog-tmb-gallery .slick-dots li", function () {

    var galSlider = $(this).closest(".catalog-tmb-gallery");

    galSlider.slick("slickGoTo", $(this).prevAll().length);

  });

  $(".catalog-tmb-gallery").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: false,
    arrows: false,
    dots: true,
    fade: true,
    speed: 0
  })
  
  // Catalog menu

  $("body").on("click", ".catalog-menu .li-trigger", function () {

    var menuTrigger = $(this),
        menuTarget = $(this).closest("li").children("ul"),
        triggerParent = $(this).closest("li");

    if (!triggerParent.hasClass("active")) {

      menuTarget.slideDown(500, function () {
        triggerParent.addClass("active");
      });

    } else {

      menuTarget.slideUp(500, function () {
        triggerParent.removeClass("active");
      });

    }


  });
  
  // Catalog filter

  $("body").on("change", ".filter-sort input[type=radio]", function () {

    $(this).closest(".catalog-filter-item").find(".catalog-filter-button .name").html($(this).next("label").html());

    $(this).closest(".catalog-filter-dropdown").slideUp(300, function () {
      $(this).closest(".catalog-filter-item").removeClass("active");
    });

  });

  $("body").on("click", ".catalog-filter-button", function (e) {

    var filterTrigger = $(this),
        filterTarget = $(this).closest(".catalog-filter-item").find(".catalog-filter-dropdown"),
        triggerParent = $(this).closest(".catalog-filter-item");

    if (!$(e.target).hasClass("btn-filter-reset")) {


      if (!triggerParent.hasClass("active")) {

        triggerParent.siblings().find(".catalog-filter-dropdown").slideUp(300, function () {
          triggerParent.siblings().removeClass("active");
        });

        filterTarget.slideDown(300, function () {
          triggerParent.addClass("active");
        });
  
      } else {
  
        filterTarget.slideUp(300, function () {
          triggerParent.removeClass("active");
        });
  
      }

    } else {

      filterTarget.find("input").prop("checked",false).trigger("change");
      filterTarget.find("input[type=text]").val("");
      filterTarget.find(".btn-filter-apply").click();

    }


  });

  // Select filter params

  $("body").on("click", ".btn-filter-apply", function () {

    var filterRadios = $(this).closest(".catalog-filter-dropdown").find("input[type=checkbox]"),
        checkedInputs = $(this).closest(".catalog-filter-dropdown").find("input:checked"),
        paramNameContainer = $(this).closest(".catalog-filter-item").find(".catalog-filter-button .name"),
        paramValContainer = $(this).closest(".catalog-filter-item").find(".catalog-filter-button .val"),
        filterDropdown = $(this).closest(".catalog-filter-item").find(".catalog-filter-dropdown"),
        filterElement = $(this).closest(".catalog-filter-item");

    if (filterRadios.length) {

      if (checkedInputs.length == 0) {

        paramValContainer.html("");
        paramNameContainer.html(paramNameContainer.html().replace(":", ""));

        filterElement.removeClass("selected");

      } else {

        if (checkedInputs.attr("type") == "radio") {

          paramNameContainer.html(checkedInputs.next("label").html());

        } else if (checkedInputs.attr("type") == "checkbox") {

          filterElement.addClass("selected");

          if (checkedInputs.length <= 1) {

            paramValContainer.html(checkedInputs.next("label").html().replace(/<span>[0-9]+<\/span>/g, "").trim());
            paramNameContainer.html(paramNameContainer.html() + ":");

          } else {

            paramValContainer.html("(" + checkedInputs.length + ")");
            paramNameContainer.html(paramNameContainer.html().replace(":", ""));

          }

        }

      }

    } else {

      if (filterDropdown.find(".price-range").length) {

        var priceString = '',
            fromInput = filterDropdown.find(".filter-price-from"),
            toInput = filterDropdown.find(".filter-price-to");

        if (fromInput.val()) {
          priceString += "от " + fromInput.val() + " &#8381; ";
        }

        if (toInput.val()) {
          priceString += "до " + toInput.val() + " &#8381;";
        }

        if (fromInput.val() || toInput.val()) {

          paramNameContainer.html(priceString);

          filterElement.addClass("selected");

        } else {

          paramNameContainer.html("Стоимость");

          filterElement.removeClass("selected");

        }

      }

    }

    filterDropdown.slideUp(300);
    filterElement.removeClass("active");

  });
  
  $("body").on("click", function (e) {

    if (!$(e.target).hasClass("catalog-filter") && !$(e.target).parents().hasClass("catalog-filter")) {

      $(".catalog-filter-dropdown").slideUp(300);
      $(".catalog-filter-item").removeClass("active");

    }

  });

  $(".photo-slider").each(function () {

    var slider = $(this);

    slider.on("init", function () {

      var sliderCounter = $("<div class='slider-counter'>Фото 1 из " + slider.find(".slide").not(".slick-cloned").length + "</div>");

      slider.append(sliderCounter);

    });

    slider.on('afterChange', function(event, slick, currentSlide){

      slider.find(".slider-counter").html("Фото " + currentSlide + " из " + slider.find(".slide").not(".slick-cloned").length);

    });

    slider.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      lazyLoad: 'ondemand'
    });

  });


  // OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD
  
  // Blog filter
  
  $("#filter_date").pickadate({
    monthsFull: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    weekdaysShort: ['П', 'В', 'С', 'Ч', 'П', 'С', 'В'],
    format: 'd.mm.yyyy',
    selectYears: true,
    selectMonths: true,
    onStart: function () {
      $("#filter_date").next(".picker").find("select").prop("disabled", false);
    },
    onSet: function () {
      $("#filter_date").next(".picker").find("select").prop("disabled", false);
    }
  })

  reviewsMakeup();

  // Reviews list gallery slider

  $(".review-tmb-gallery-slider").slick({
    variableWidth: true,
    slidesToScroll: 3,
    infinite: false
  });

  // Reviews slider

  $(".reviews-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    adaptiveHeight: true
  });

  // Restaurant menu

  $(".rest-menu-nav").slick({
    slidesToShow: 4,
    slidesToScroll: 4
  });

  $(".rest-menu-slider").on("init", function () {

    $(".rest-menu-nav .menu-nav-tmb").click(function () {

      $(this).closest(".rest-menu-nav").find(".menu-nav-tmb").removeClass("active");
      $(this).addClass("active");

      $(".rest-menu-slider").slick("slickGoTo", $(this).closest(".slick-slide").prevAll().not(".slick-cloned").length)

    });

  });

  $(".rest-menu-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    swipe: false,
    arrows: false,
    adaptiveHeight: true
  });

  // Features gallery

  $(".features-galleries-slider").on("init", function () {

    var slider = $(this);

    var navTmbs = $(this).closest(".features-gallery-wrapper").find(".nav-tmb");

    navTmbs.click(function () {

      navTmbs.removeClass("active");

      $(this).addClass("active");

      slider.slick("slickGoTo", $(this).prevAll().length);

    });

  });

  $(".features-galleries-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    swipe: false,
    arrows: false
  });

  $(".features-gallery").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true
  });


  $(".guests-select").each(function () {

    var gSelect = $(this);

    gSelect.on('loaded.bs.select changed.bs.select', function (e) {

      var formattedVal = "<span class='select-num'>" + gSelect.val() + "</span>" + "<span class='select-text'>" + declOfNum(gSelect.val(), ['гость', 'гостя', 'гостей']) + "</span>";


      gSelect.siblings(".dropdown-toggle").find(".filter-option").html(formattedVal);

    });


  });


  // Expandable

  $("body").on("click", ".expandable-trigger", function () {

    var exTrigger = $(this);

    if (!exTrigger.hasClass("active")) {

      exTrigger.closest(".expandable").find(".expandable-content").slideDown(500, function () {
        exTrigger.addClass("active").html(exTrigger.data("collapsetext"))
      });

    } else {

      exTrigger.closest(".expandable").find(".expandable-content").slideUp(500, function () {
        exTrigger.removeClass("active").html(exTrigger.data("expandtext"))
      });

    }

  });




  // Side menu

  $(".side-menu-arrow").click(function () {

    var parentLi = $(this).closest("li");

    parentLi.find(".side-submenu").slideToggle(250, function () {
      parentLi.toggleClass("active");
    });

  });

  // Restaurants slider

  $('.restaurants-slider').on('afterChange', function(event, slick, currentSlide){

    if ($(".restaurants-slider .slick-prev").hasClass("slick-disabled")) {
      $(".restaurants-slider-wrapper .prev-custom").addClass("disabled");
    } else {
      $(".restaurants-slider-wrapper .prev-custom").removeClass("disabled");
    }

    if ($(".restaurants-slider .slick-next").hasClass("slick-disabled")) {
      $(".restaurants-slider-wrapper .next-custom").addClass("disabled");
    } else {
      $(".restaurants-slider-wrapper .next-custom").removeClass("disabled");
    }

  });

  $(".restaurants-slider").on("init", function () {

    if ($(".restaurants-slider .slick-prev").hasClass("slick-disabled")) {
      $(".restaurants-slider-wrapper .prev-custom").addClass("disabled");
    }

    if ($(".restaurants-slider .slick-next").hasClass("slick-disabled")) {
      $(".restaurants-slider-wrapper .next-custom").addClass("disabled");
    }

    $(".restaurants-slider-wrapper .prev-custom").click(function () {
      $(".restaurants-slider").slick("slickPrev");
    });

    $(".restaurants-slider-wrapper .next-custom").click(function () {
      $(".restaurants-slider").slick("slickNext");
    });

  });

  $(".restaurants-slider").slick({
    slidesToShow: 3,
    slidesToScroll: 3,
    infinite: false
  });

  // Hotel map

  $(".hotel-map-inner").panzoom({
    minScale: 1,
    contain: 'automatic'
  }).panzoom('zoom');

  // Main menu

  $(".submenu li").on("mouseenter", function () {

    if ($(this).find("a.has-submenu").length) {
      $(this).addClass("open");
      $(this).find(".sub-submenu").fadeIn(150);

      if ($(this).find(".sub-submenu").offset().left + $(".sub-submenu").width() > $(window).width()) {
        $(this).find(".sub-submenu").addClass("sub-submenu-l");
      }

    }

  });

  $(".submenu li").on("mouseleave", function () {

    if ($(this).find("a.has-submenu").length) {
      $(this).removeClass("open");
      $(this).find(".sub-submenu").fadeOut(150);
    }

  });

  // Main menu END

  // Main slider

  $(".main-slider").on("init", function () {

    $(".main-slider .slick-current").next().addClass("slide-current");

    $(".main-slider .slick-slide").click(function () {
      if (!$(this).hasClass("slide-current")) {
        $(".main-slider").slick("slickGoTo", $(this).data("slick-index") * 1 - 1)
      }
    });

  });

  $(".main-slider").on("beforeChange", function(event, slick, currentSlide, nextSlide){


    var dir;
    if((currentSlide<nextSlide&&currentSlide==nextSlide-1)||(currentSlide==slick.slideCount-1&&nextSlide==0))
      {
        dir='forward';
      }
    else if(nextSlide<currentSlide||(nextSlide==slick.slideCount-1&&currentSlide==0))
      {
        dir='backward';
      }

    if (dir == 'forward') {
      $(".slide-current").removeClass("slide-current");
      $(".main-slider .slide[data-slick-index=" + currentSlide +"]").next().next().addClass("slide-current");
      $(".main-pic-slider").slick("slickNext");
    } else {
      $(".slide-current").removeClass("slide-current");
      $(".main-slider .slide[data-slick-index=" + currentSlide +"]").addClass("slide-current");
      $(".main-pic-slider").slick("slickPrev");
    }

  });

  $(".main-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 1000,
    vertical: true,
    swipe: false,
    initialSlide: 0
  });

  $(".main-pic-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: false,
    vertical: true,
    speed: 1000,
    arrows: false,
    swipe: false,
    initialSlide: 1,
    infinite: true
  });

  // Main slider END

  // Actions slider

  $('.actions-slider').on('afterChange', function(event, slick, currentSlide){

    if ($(".actions-slider .slick-prev").hasClass("slick-disabled")) {
      $(".actions-slider-wrapper .prev-custom").addClass("disabled");
    } else {
      $(".actions-slider-wrapper .prev-custom").removeClass("disabled");
    }

    if ($(".actions-slider .slick-next").hasClass("slick-disabled")) {
      $(".actions-slider-wrapper .next-custom").addClass("disabled");
    } else {
      $(".actions-slider-wrapper .next-custom").removeClass("disabled");
    }

  });

  $(".actions-slider").on("init", function () {

    if ($(".actions-slider .slick-prev").hasClass("slick-disabled")) {
      $(".actions-slider-wrapper .prev-custom").addClass("disabled");
    }

    if ($(".actions-slider .slick-next").hasClass("slick-disabled")) {
      $(".actions-slider-wrapper .next-custom").addClass("disabled");
    }

    $(".actions-slider-wrapper .prev-custom").click(function () {
      $(".actions-slider").slick("slickPrev");
    });

    $(".actions-slider-wrapper .next-custom").click(function () {
      $(".actions-slider").slick("slickNext");
    });

  });

  $(".actions-slider").slick({
    slidesToShow: 2,
    slidesToScroll: 2,
    infinite: false,
    swipe: false
  });

  // Actions slider END

  // Datepicker

  var monthsRus = ["янавря", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];

  $(".book-date").each(function () {

    var pickerField = $(this);

    pickerField.pickadate({
      monthsFull: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      format: 'd.mm.yyyy',
      onSet: function () {

        pickerField.closest(".form-field").find(".book-date-input").val(this.get("select", "dd.mm.yyyy"));

        pickerField.html("<span class='num'>" + this.get("select", "d") + "</span> " + monthsRus[ this.get("select", "m") - 1 ]);

        // Максимальная и минимальная даты


        var fromDate = new Date(pickerField.closest("form").find(".book-date-from").pickadate("picker").get("select", "yyyy"), pickerField.closest("form").find(".book-date-from").pickadate("picker").get("select", "m") - 1, pickerField.closest("form").find(".book-date-from").pickadate("picker").get("select", "d"));

        var toDate = new Date(pickerField.closest("form").find(".book-date-to").pickadate("picker").get("select", "yyyy"), pickerField.closest("form").find(".book-date-to").pickadate("picker").get("select", "m") - 1, pickerField.closest("form").find(".book-date-to").pickadate("picker").get("select", "d"));

        if (pickerField.hasClass("book-date-from") && ( toDate <= fromDate || toDate === undefined)) {
          var datePlusDay = addDays(fromDate, 1);
          pickerField.closest("form").find(".book-date-to").pickadate("picker").set("select", datePlusDay)
        }

        if (pickerField.hasClass("book-date-from")) {
          pickerField.closest("form").find(".book-date-to").pickadate("picker").set("min", addDays(fromDate, 1))
        }


      }
    });

  });

  // Numeric input

  $(document).on("input", ".numeric", function() {
    this.value = this.value.replace(/\D/g,'');
  });


  // Fancybox

  $("a.fancybox").fancybox();

  // Forms


  if (isIE9OrBelow()) {
    $(".form-file-pic").hide();
  }

  if (!isIE9OrBelow()) {

    $("input[type=file]").each(function () {
      var fileInput = $(this);
      $(this).nicefileinput({
        label: function () {
          if (fileInput.data("title")) {
            return fileInput.data("title")
          } else {
            return "Выбрать файл"
          }
        }
      });
    });

  }

  $("body").on("mouseup", "li.dropdown-header", function () {
    $(this).toggleClass("active");
    $(this).nextAll("li[data-optgroup='" + $(this).data("optgroup") + "']").fadeToggle(150);
    return false;
  });

  $("select").not(".picker__select--month, .picker__select--year").each(function () {
    if ($(this).attr("multiple")) {
      $(this).selectpicker({
        selectAllText: "Выбрать всё",
        deselectAllText: "Снять выбор",
        selectedTextFormat: "count",
        countSelectedText: function(count) {
          return count + " " + declOfNum(count, ['элемент', 'элемента', 'элементов']);
        }
      });
    } else {
      $(this).selectpicker({
        selectAllText: "Выбрать всё",
        deselectAllText: "Снять выбор"
      });
    }
  });

  $("select[multiple]").not(".simple-multi").on("shown.bs.select",function () {
    if (!$(this).prev(".dropdown-menu").find(".dropdown-footer").length) {
      dropdownFooter = '\
      <div class="dropdown-footer">\
      <div class="btn btn-1 btn-ico btn-save">Выбрать</div>\
      <div class="btn btn-cancel">Очистить</div>\
      </div>\
      ';
      $(this).prev(".dropdown-menu").find("ul").append(dropdownFooter);
    }
  });

  $("select.select-grantee-add").on("shown.bs.select",function () {
    if (!$(this).prev(".dropdown-menu").find(".dropdown-top-button").length) {
      dropdownHeader = '\
      <div class="dropdown-top-button">\
        <a class="link-add" href="#" data-toggle="modal" data-target="#addGranteeModal"><span>Добавить нового</span></a>\
      </div>\
      ';
      $(this).prev(".dropdown-menu").find("ul").prepend(dropdownHeader);
    }
  });

  $("select.select-operator-add").on("shown.bs.select",function () {
    if (!$(this).prev(".dropdown-menu").find(".dropdown-top-button").length) {
      dropdownHeader = '\
      <div class="dropdown-top-button">\
        <a class="link-add" href="#" data-toggle="modal" data-target="#addOperatorModal"><span>Добавить нового</span></a>\
      </div>\
      ';
      $(this).prev(".dropdown-menu").find("ul").prepend(dropdownHeader);
    }
  });

  $("body").on("click",".bootstrap-select .btn-save", function () {
    $(this).closest("div.dropdown-menu").next("select").selectpicker("toggle");
    return false;
  });

  $("body").on("click",".bootstrap-select .btn-cancel", function () {
    $(this).closest("div.dropdown-menu").next("select").selectpicker('deselectAll');
    return false;
  });

  $("#contest_operators").selectpicker({
    countSelectedText: function(count) {
      return count + " " + declOfNum(count, ['оператор', 'оператора', 'операторов']);
    }
  });

  $("#search_brand").selectpicker({
    countSelectedText: function(count) {
      return count + " " + declOfNum(count, ['бренд', 'бренда', 'брендов']);
    }
  });

  $("#search_price").selectpicker({
    countSelectedText: function(count) {
      return count + " " + declOfNum(count, ['цена', 'цены', 'цен']);
    }
  });

  $(".select-grantees").selectpicker({
    countSelectedText: function(count) {
      return count + " " + declOfNum(count, ['грантополучатель', 'грантополучателя', 'грантополучателей']);
    }
  });

  $("#search_stock").selectpicker({
    selectAllText: "Выбрать всё",
    deselectAllText: "Снять выбор",
    selectedTextFormat: "count",
    countSelectedText: function(count) {
      return count + " " + declOfNum(count, ['вариант', 'варианта', 'вариантов']);
    }
  });

  $('.input-numeric').bind('keyup paste', function(){
    this.value = this.value.replace(/[^0-9]/g, '');
  });

  if ($("input:text").length) {
    $("input:text").each(function() {
      if ($(this).val()) {
        $(this).prev(".placeholder").hide();
      }
    });
  }

  if ($("textarea").length) {
    $("textarea").each(function() {
      if ($(this).val()) {
        $(this).prev(".placeholder").hide();
      }
    });
  }

  $("body").on("focus","input, textarea",function() {
    var el = $(this);

    if (el.parent().find(".placeholder").length) {
      var placeholder = el.parent().find(".placeholder");

      placeholder.hide();

    }

  });

  $("body").on("blur","input, textarea",function() {
    var el = $(this);

    if (el.parent().find(".placeholder").length) {
      var placeholder = el.parent().find(".placeholder");

      if (!el.val() || (el.hasClass("input-phone") && ! /^(?=.*[0-9])[- +()0-9]+$/.test(el.val()))) {
        placeholder.show();
      }

    }

  });

  $("body").on("click",".placeholder",function(e) {
    if ($(this).parent().find("input").length) {
      $(this).parent().find("input").trigger("focus");
    }
    if ($(this).parent().find("textarea").length) {
      $(this).parent().find("textarea").trigger("focus");
    }
  })

  $("input.input-phone").mask("+7(999) 999-99-99");

  $("body").on("focus","input[type=text], input[type=email], input[type=password], textarea", function () {
    $(this).closest(".form-item").addClass("focus");
  });

  $("body").on("blur","input[type=text], input[type=email], input[type=password], textarea", function () {
    $(this).closest(".form-item").removeClass("focus")
  });

  validateForms();

});

function yearsName(age) {
  var txt;
  count = age % 100;
  if (count >= 5 && count <= 20) {
    txt = 'лет';
  } else {
    count = count % 10;
    if (count == 1) {
      txt = 'год';
    } else if (count >= 2 && count <= 4) {
      txt = 'года';
    } else {
      txt = 'лет';
    }
  }
  return txt;
}

function calcCredit(S,p,n){

  p = +p / 1200;
  n = +n * 12;

  return Math.round(+S * p / (1 - Math.pow(1 + p, -n)));

}

function validateForms() {

  jQuery.validator.addClassRules('phone-email-group', {
    require_from_group: [1, ".phone-email-group"]
  });

  $("select").on("change", function () {
    if (!$(this).closest(".picker").length) {
      $(this).valid();
    }
  });

  $("body").on("click", ".form-item", function (e) {
    if ($(this).find(".bootstrap-select").length && !$(e.target).hasClass("bootstrap-select") && !$(e.target).parents().hasClass("bootstrap-select")) {
      $(e.target).closest(".form-item").find("select").selectpicker('toggle');
    }
  });

  $("form").each(function() {

    form = $(this);

    $(this).validate({
      focusInvalid: true,
      sendForm : false,
      errorPlacement: function(error, element) {
        if (element[0].tagName == "SELECT") {
          element.closest(".form-item").addClass("error");
          element.closest(".btn-group").addClass("btn-group-error");
          if (element.closest(".form-item").length) {
            error.insertAfter(element.closest(".form-item"));
          } else {
            error.insertAfter(element.closest(".btn-group"));
          }
        } else {
          if (element.attr("type") == "checkbox") {
            element.siblings("label").addClass("checkbox-label-error")
          } else {
            error.insertAfter(element);
          }
        }

      },
      unhighlight: function(element, errorClass, validClass) {
        $(element).removeClass(errorClass);
        $(element).closest(".form-item").removeClass("error").addClass("valid");

        if ($(element)[0].tagName == "SELECT") {
          $(element).closest(".form-item").removeClass("error");
          $(element).closest(".btn-group").removeClass("btn-group-error");
          if ($(element).closest(".form-item").length) {
            error.insertAfter(element.closest(".form-item"));
            $(element).closest(".form-item").next("label.error").remove();
          } else {
            $(element).closest(".btn-group").next("label.error").remove();
          }
        } else {
          $(element).next(".error").remove();
          if ($(element).attr("type") == "checkbox") {
            $(element).siblings("label").removeClass("checkbox-label-error")
          }
        }
      },
      invalidHandler: function(form, validatorcalc) {
        var errors = validatorcalc.numberOfInvalids();
        if (errors && validatorcalc.errorList[0].element.tagName == "INPUT") {
          validatorcalc.errorList[0].element.focus();
        }
      }
    });

    if ($(this).find("input.password").length && $(this).find("input.password-repeat").length) {
      $(this).find("input.password-repeat").rules('add', {
        equalTo: "#"+form.find("input.password").attr("id")
      });
    }

  });

}

jQuery.extend(jQuery.validator.messages, {
  required: "Не заполнено поле",
  remote: "Please fix this field.",
  email: "Введите правильный e-mail.",
  url: "Please enter a valid URL.",
  date: "Please enter a valid date.",
  dateISO: "Please enter a valid date (ISO).",
  number: "Please enter a valid number.",
  digits: "Please enter only digits.",
  creditcard: "Please enter a valid credit card number.",
  equalTo: "Пароли не совпадают.",

  accept: "Please enter a value with a valid extension.",
  maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
  minlength: jQuery.validator.format("Please enter at least {0} characters."),
  rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
  range: jQuery.validator.format("Please enter a value between {0} and {1}."),
  max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
  min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
});

function cartTotal() {

  var cartTotal = 0,
    cartPrice = 0,
    cartDiscount = 0;

  $(".cart-item, .header-cart-item").each(function () {

    if ($(this).data("price")) {
      if ($(this).data("discount")) {
        var itemDiscount = $(this).data("discount") * 1;

      } else {
        var itemDiscount = 0;
      }

      var itemPrice = $(this).data("price") * $(this).find(".count input[type=text]").val();
      var itemDiscount = itemDiscount * $(this).find(".count input[type=text]").val();

      cartPrice += itemPrice;
      cartTotal += itemPrice - itemDiscount;
      cartDiscount += itemDiscount;
    }

  });

  $(".cart-price-val").html(numFormat.to(cartPrice));
  $(".cart-discount-val").html(numFormat.to(cartDiscount));
  $(".cart-total-val").html(numFormat.to(cartTotal));

  $(".header-cart-total-val").html(numFormat.to(cartTotal));

}

function calcOrder() {

  var orderPrice = $(".order-price-val").html();
  orderPrice = orderPrice.replace(/\s+/g, '');

  var orderDiscount = 0;

  var orderTotal = +orderPrice;

  $(".order-form [data-price]").each(function () {
    if ($(this).attr("type") != "radio") {
      orderTotal += $(this).data("price") - 0;
    } else {
      if ($(this).is(":checked")) {
        orderTotal += $(this).data("price") - 0;
      }
    }
  });

  $(".order-form [data-discount]").each(function () {
    orderDiscount -= $(this).data("discount") - 0;
  });

  //console.log(orderDiscount)

  var orderCouponDiscount = +Math.floor(orderPrice.replace(/\s+/g, '')*(+$("#order_coupon_discount").val()/100));

  orderDiscount -= orderCouponDiscount;

  $(".order-shipping-val").html($("[name='order_shipping_1']:checked").data("price"));

  $(".order-coupon-val").html(orderCouponDiscount);
  $(".order-coupon-percent").html("-"+$("#order_coupon_discount").val());

  $(".order-total-val").html(numFormat.to(orderTotal + orderDiscount));

}

function declOfNum(number, titles) {
  cases = [2, 0, 1, 1, 1, 2];
  return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
}

function resizeVideo() {
  $(".home-section-video").css({
    height: $(window).height()
  });

  $(".home-section-video-wrapper").css({
    height: $(window).height() + 800
  });

}

function parallax(obj, objOffset, speed) {

  var objPos = - $(window).scrollTop() + obj.closest(".parallax-wrapper").offset().top + objOffset

  obj.css({
    transform: "translateY(" + objPos + "px)"
  });

}

function fancyboxFix() {

  if($('#mobile-indicator').css('display') == 'block') {
    $('.gallery-big .fancybox').off("click.fb-start");
    $('.gallery-big .fancybox').click(function () {
      return false;
    });
  } else {

    $('.gallery-big .fancybox').fancybox();

  }

}

function slickResponsive() {

  if ($("#mobile-indicator").css("display") == "block") {

    $(".also-catalog > .row, .popular-catalog > .row").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 500,
      dots: true,
      arrows: false
    });

  } else {

    if ($(".also-catalog > .row").hasClass("slick-initialized")) {
      $(".also-catalog > .row").slick("unslick");
    }

    if ($(".popular-catalog > .row").hasClass("slick-initialized")) {
      $(".popular-catalog > .row").slick("unslick");
    }

  }

}

function readURL(input, img) {

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      img.attr('src', e.target.result);
    }

    reader.readAsDataURL(input.files[0]);
  }
}

function fixElements() {
  var scrollPos = $(window).scrollTop();

  if ($(".data-table").length) {

    if (scrollPos > $(".data-table").offset().top) {
      $(".data-table-over-wrapper").css({
        marginTop: $(".data-table .table-header").height()
      });

      $(".data-table .table-header").addClass("table-header-fixed");



    } else {
      $(".data-table-over-wrapper").css({
        marginTop: 0
      });

      $(".data-table .table-header").removeClass("table-header-fixed");

    }

    if($(".data-table-wrapper .mCSB_container").length > 0) {
      $(".data-table .table-header-fixed tr").css({
          marginLeft: $(".data-table-wrapper .mCSB_container").position().left
      });
    }

  }


  if ($(".data-table").length && $(".data-table-footer").length) {
    if (scrollPos + $(window).height() < $(".data-table").offset().top + $(".data-table").height() + $(".data-table-footer").outerHeight()) {
      $(".data-table-footer").addClass("data-table-footer-fixed");
      $(".data-table-wrapper .mCSB_scrollTools").addClass("scroll-tools-fixed").css({
        bottom: $(".data-table-footer").outerHeight()
      });
    } else {
      $(".data-table-footer").removeClass("data-table-footer-fixed");
      $(".data-table-wrapper .mCSB_scrollTools").removeClass("scroll-tools-fixed").css({
        bottom: 0
      });
    }
  }
}

function datepickerRender(datepicker) {

  if (!datepicker.hasClass("rendered")) {
    datepicker.addClass("rendered");
    datepicker.next(".picker").find("select").selectpicker();
    datepicker.next(".picker").find("div.picker__select--year").wrap("<div class='select-wrapper select-wrapper-year'></div>").before("<label>Год</label>");
    datepicker.next(".picker").find("div.picker__select--month").wrap("<div class='select-wrapper select-wrapper-month'></div>").before("<label>Месяц</label>");
    datepicker.next(".picker").find(".picker__header").append("<div class='picker-table-header'>Дата</div>");
  }
  
}

function fixTables() {

  $(".data-table").each(function () {
    $(this).css({
      width: "0"
    })
  });

  $(".data-table td").each(function () {
    $(this).css({
      width: "auto"
    });
  });

  $(".data-table th").each(function () {
    $(this).css({
      width: "auto"
    });
  });

  $(".data-table tr").each(function () {
    $(this).css({
      width: "auto"
    });
  });



  $(".data-table").each(function () {
    $(this).css({
      width: "auto"
    });
  });

  $(".data-table td").each(function () {
    $(this).css({
      width: $(this).outerWidth()
    });
  });

  $(".table-header tr").each(function () {
    $(this).css({
      width: $(this).outerWidth()
    });
  });

  $(".data-table").css({
    display: "block",
    width: $(".data-table").width()
  }).css({
    display: "table"
  });

  $(".data-table th").each(function () {
    th = $(this);
    th.css({
      width: $(this).closest("table").find("td").filter(function () {return $(this).prevAll().length == th.prevAll().length}).outerWidth()
    });
  });

}

function addDays(startDate,numberOfDays)
{
  var returnDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()+numberOfDays,
    startDate.getHours(),
    startDate.getMinutes(),
    startDate.getSeconds());
  return returnDate;
}

function declOfNum(number, titles) {
  cases = [2, 0, 1, 1, 1, 2];
  return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
}

function reviewsMakeup() {

  $(".review-tmb-text").each(function () {

    if ($(this).closest(".review-tmb").find(".review-tmb-gallery").length) {
      var galHeight = 50;
    } else {
      var galHeight = 0;
    }

    $(this).css({
      height: $(this).closest(".review-tmb").height()
            - $(this).closest(".review-tmb").find(".review-tmb-author").outerHeight(true)
            - $(this).closest(".review-tmb").find(".h3").outerHeight(true)
            - galHeight
            - 28
            - 20
    })

  });

}

function swapGallery() {

  var galleryClone = $(".item-gallery").clone();

  galleryClone.prependTo(".item-r-col");

};
