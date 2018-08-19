var numFormat = wNumb({
  thousand: ' '
});

$(window).scroll(function () {

  fixElements();

});

$(window).resize(function () {

  resizeVideo();

  fancyboxFix();

  slickResponsive();

});

$(document).ready(function () {

  $("body").on("click", ".btn-controls-delete", function () {
    if ($(this).data("text")) {
      $(".confirm-modal-text").html($(this).data("text"));
    } else {
      $(".confirm-modal-text").html("Вы действительно хотите удалить элемент?");
    }
    $("#confirmModal").modal("show");
  });

  $(".confirm-modal .btn-cancel").click(function () {
    $("#confirmModal").modal("hide");
  });

  // Modal form cancel

  $(".modal .btn-cancel").click(function () {
    $(this).closest(".modal").find("input, textarea, select").val("").change();
    $(this).closest(".modal").modal("hide");
  });
  
  // Contest add
  
  $(".operators-list-item .link-add").click(function () {
    $(this).closest(".operators-list-item").find(".extra-form").slideToggle(500);
    return false;
  });

  // Template edit

  $("body").on("mouseenter",".templates-item-table td:first-child", function () {

    $(this).append('\
      <div class="table-row-controls">\
        <div class="btn btn-row-remove"></div>\
        <div class="btn btn-row-add"></div>\
      </div>\
    ');

  });

  $("body").on("mouseleave",".templates-item-table td", function () {

    $(this).find(".table-row-controls").remove();

  });

  $("body").on("click", ".btn-row-add", function () {

    var curTd = $(this).closest("th");

    var curTr = $(this).closest("tr");

    var tdCount = curTr.find("td").length - 1;

    var trHtml = '<td class="td-name"><input type="text" /></td>';

    for (i=0; i < tdCount; i++) {
      trHtml += '<td>&nbsp;</td>';
    }

    curTr.after('<tr>' + trHtml + '</tr>');

    fixTables();

  });

  $("body").on("click", ".btn-row-remove", function () {

    var curTr = $(this).closest("tr");

    curTr.remove();

    fixTables();

  });

  $("body").on("mouseenter",".templates-item-table th", function () {

    if ($(this).prev("th").length) {

      $(this).append('\
        <div class="table-col-controls">\
          <div class="btn btn-col-remove"></div>\
          <div class="btn btn-col-add"></div>\
        </div>\
      ');

    }


  });

  $("body").on("mouseleave",".templates-item-table th", function () {

    $(this).find(".table-col-controls").remove();

  });

  $("body").on("click", ".btn-col-add", function () {

    var curTh = $(this).closest("th");

    var curTd = $(this).closest("table").find("td").filter(function () {

      return $(this).prevAll("td").length == curTh.prevAll("th").length;

    });

    curTh.after('<th><input type="text" /></th>');

    curTd.each(function () {
      $(this).after('<td></td>');
    });

    fixTables();

  });

  $("body").on("click", ".btn-col-remove", function () {

    var curTh = $(this).closest("th");

    var curTd = $(this).closest("table").find("td").filter(function () {

      return $(this).prevAll("td").length == curTh.prevAll("th").length;

    });

    curTh.remove();

    curTd.each(function () {
      $(this).remove();
    });

    fixTables();

  });

  // Extra form

  $(".link-add").click(function () {
    if ($(this).data("target")) {
      $($(this).data("target")).slideToggle(700);
      return false;
    }
  });

  // Listed selects

  $(".select-listed").change(function () {
    var selectItem = $(this);
    var selectVal = $(this).val();

    if (selectVal.length) {
      var selectedItemsList = selectItem.closest(".btn-group").next(".selected-items").find(".selected-items-list");
      selectItem.closest(".btn-group").next(".selected-items").show();
      selectedItemsList.html("");

      for (var i = 0; i < selectVal.length; i++) {
        selectedItemsList.append("<li data-val='" + selectVal[i] + "'><div class='remove'></div>" + selectItem.find("option[value='" + selectVal[i] + "']").html() + "</li>")
      }

    } else {
      selectItem.closest(".btn-group").next(".selected-items").hide();
    }

  });

  $("body").on("click",".selected-items-list .remove", function () {

    var selectItem = $(this).closest(".selected-items").prev(".btn-group").find("select");
    var valArr = new Array();



    $(this).closest("li").remove();
    var selectedItems = selectItem.closest(".btn-group").next(".selected-items").find(".selected-items-list").find("li");

    selectedItems.each(function () {
      valArr.push($(this).data("val"))
    });

    console.log(valArr)

    selectItem.selectpicker("val",valArr).trigger("change");

  });

  // Datepicker

  $(".input-date-picker").each(function () {
    var datepicker = $(this).pickadate({
      selectMonths: true,
      selectYears: true,
      onOpen: function() {
        datepickerRender($(datepicker));
      },
      onSet: function() {
        $(datepicker).removeClass("rendered");
        datepickerRender($(datepicker));
      }

    });
  });

  $(".input-date-from").each(function () {
    var datepicker = $(this).pickadate({
      selectMonths: true,
      selectYears: true,
      onOpen: function() {
        datepickerRender($(datepicker));
      },
      onSet: function() {
        $(datepicker).removeClass("rendered");
        datepickerRender($(datepicker));
      }

    });
  });


  $(".input-date-to").each(function () {
    var datepicker = $(this).pickadate({
      selectMonths: true,
      selectYears: true,
      onOpen: function() {
        datepickerRender($(datepicker));
      },
      onSet: function() {
        $(datepicker).removeClass("rendered");
        datepickerRender($(datepicker));
      }

    });
  });



  $(".data-table-wrapper").mCustomScrollbar({
    axis:"x",
    mouseWheel: false,
    callbacks:{
      whileScrolling:function(){

        $(this).find(".table-header-fixed tr").css({
          marginLeft: $(this).find(".mCSB_container").position().left
        });

      }
    }
  });



  // Data tables

  fixTables();

  fixElements();

  // Mobile nav

  $(".navbar-trigger").on("click",function () {
    $(".navbar-collapse").addClass("open");
  });

  $(".navbar-close").on("click",function () {
    $(".navbar-collapse").removeClass("open");
  });

  $(".navbar-collapse").on("click",function (e) {
    if (!$(e.target).hasClass(".navbar-wrapper") && !$(e.target).parents().hasClass(".navbar-wrapper")) {
      $(".navbar-collapse").removeClass("open");
    }
  })

  // Header menu

  $(".header-menu-trigger, .header-user-btn").click(function () {
    $(this).toggleClass("active");
    $($(this).data("target")).fadeToggle(300);
  });

  $("body").on("click",function (e) {

    if (!$(e.target).hasClass("header-menu") && !$(e.target).closest(".header-menu").length && !$(e.target).hasClass("header-menu-trigger") && !$(e.target).hasClass("header-user-btn") && !$(e.target).closest(".header-menu-trigger").length && !$(e.target).closest(".header-user-btn").length ) {

      $(".header-menu-trigger, .header-user-btn").removeClass("active");
      $(".header-menu").fadeOut(300);

    }

  });

  // Sidebar menu

  $(".sidebar-menu-trigger").on("click", function () {

    var sidebarMenuTrigger = $(this);

    if (!sidebarMenuTrigger.hasClass("active")) {

      $(".sidebar-menu").slideDown(500, function () {
        sidebarMenuTrigger.addClass("active").find(".name").html("Свернуть")
      });

    } else {

      $(".sidebar-menu").slideUp(500, function () {
        sidebarMenuTrigger.removeClass("active").find(".name").html("Меню")
      });

    }

  });

  slickResponsive();

  // Home video

  $(".home-play-button").click(function () {
    $(this).fadeOut(500);
    $(".home-video-wrapper").fadeIn(500);
    $(".home-video").get(0).play();
  });

  // Sticky video block

  resizeVideo();

  // Brands slider

  $(".brands-slider").on("init", function () {

    $(".brands-nav-next").click(function () {
      $(".brands-slider").slick("slickNext");
    });

    $(".brands-nav-prev").click(function () {
      $(".brands-slider").slick("slickPrev");
    });

  });

  $(".brands-slider").slick({
    slidesToShow: 5,
    slidesToScroll: 4,
    arrows: false
  });

  // Main slider

  $(".main-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true
  });

  $("body").on("click", "form .form-reset", function () {
    $(this).closest("form")[0].reset();
    $(this).closest("form").submit();

  });

  // Form extra

  $(".form-extra-trigger .trigger").on("click",function () {

    var extraTrigger = $(this);

    var extraContent = $(this).closest(".form-extra").find(".form-extra-content");

    if (!$(this).hasClass("active")) {
      extraContent.slideDown(1000, function () {
        extraTrigger.addClass("active");
      });
    } else {
      extraContent.slideUp(1000, function () {
        extraTrigger.removeClass("active");
      });
    }

  });

  // Order calculator

  if ($(".order-form").length) {
    calcOrder();
  }

  $(".order-form .form-radio-text input, .order-form #order_coupon").on("change",function () {
    calcOrder();
  });

  // Add to cart

  $("body").on("click", ".tmb-cart", function () {
    $(this).addClass("active");
    $(this).find(".icon-basket").addClass("active")

    if ($(".add-to-cart-modal").length) {
      $(".add-to-cart-modal").remove();
    }

    var cartPic = $(this).closest(".catalog-tmb").find(".tmb-pic").css("background-image").replace('url(','').replace(')','').replace(/\"/gi, ""),
        cartFullTtl = $(this).closest(".catalog-tmb").find(".full-ttl").html(),
        cartPrice = $(this).closest(".catalog-tmb").find(".price").html();


    $("body").append('\
      <div class="modal fade add-to-cart-modal" tabindex="-1" role="dialog" id="addToCartModal">\
        <div class="modal-dialog">\
          <div class="modal-content loading">\
            <div class="close" data-dismiss="modal"></div>\
            <div class="add-to-cart">\
              <div class="add-to-cart-header">\
                <div class="h4">Товар добавлен в заказ</div>\
                <div class="sub-ttl">\
                  Всего в вашей корзине 2 заказа. <a href="#">Просмотреть</a>\
                </div>\
              </div>\
              <div class="cart-list">\
                <div class="cart-tmb">\
                  <div class="row">\
                    <div class="cart-tmb-pic"><a class="pic" href="#" style="background-image:url(' + cartPic +');"></a></div>\
                    <div class="cart-tmb-descr"><a href="#">' + cartFullTtl + '</a></div>\
                    <div class="cart-tmb-price">\
                      <div class="price">' + cartPrice + ' <span class="units">&#8381;</span></div>\
                      <div class="cart-tmb-count">1 шт.</div>\
                    </div>\
                  </div>\
                </div>\
              </div>\
              <div class="add-to-cart-footer">\
                <div class="btn btn-1">Продолжить выбор</div>\
                <a href="#" class="btn btn-2">Оформить заказ</a>\
              </div>\
            </div>\
          </div>\
        </div>\
      </div>\
    ');

    $(".add-to-cart-modal").modal("show");


    return false;

  });

  // Cart popup

  if ($("#mobile-indicator").css("display") == "block") {
    $(".header-controls-item a").on("click", function () {
      if ($(this).closest(".header-controls-item").find(".cart-popup").length) {
        $(this).closest(".header-controls-item").find(".cart-popup").fadeIn(150);
        return false;
      }
    });
  } else {

    $(".header-controls-item").on("mouseenter", function () {
      if ($(this).find(".cart-popup").length) {
        $(this).find(".cart-popup").fadeIn(150);
      }
    });


  }

  $(".header-controls-item").on("mouseleave", function () {
    if ($(this).find(".cart-popup").length) {
      $(this).find(".cart-popup").hide();
    }
  });

  $(".cart-popup-close").on("click",function () {
    $(".cart-popup").hide();
  })

  // Tooltip custom

  $("body").on("click", ".tooltip-custom-trigger", function () {

    var tooltipTarget = $($(this).data("target"));
    tooltipTarget.fadeIn(150).addClass("active");

  });

  $("body").on("click", function (e) {
    if (!$(e.target).hasClass("tooltip-custom-wrapper") && !$(e.target).parents().hasClass("tooltip-custom-wrapper")) {
      $(".tooltip-custom.active").hide().removeClass("active");
    }



  });

  // Text radios

  $(".form-radio-text input").on("change",function () {
    var radio = $(this);
    var radioDescrs = $(this).closest(".form-group").find(".form-radios-descr-item");

    radioDescrs.hide();

    radioDescrs.filter(function () {
      return $(this).data("radio") == radio.attr("id")
    }).fadeIn(150)

  });

  // Form group expandable

  $("body").on("click", ".form-group-expandable-trigger span", function () {

    var $btn = $(this);
    var $target = $(this).closest(".form-group-expandable").find(".form-item");

    if (!$target.hasClass("open")) {
      $target.slideDown(500,function () {
        $target.addClass("open");
        $btn.html($btn.data("collapse-text"));
      });
    } else {
      $target.slideUp(500,function () {
        $target.find("input, textarea").val("");
        $target.removeClass("open");
        $btn.html($btn.data("expand-text"));
      });
    }

  });

  // Numeric input

  $(document).on("input", ".numeric", function() {
    this.value = this.value.replace(/\D/g,'');
  });

  // Count

  $(".count-plus").click(function () {
    var countInput = $(this).closest(".count").find(".count-input");
    countInput.val( + countInput.val() + 1 );

    if ($(this).closest(".cart-item").data("price")) {
      var itemPrice = $(this).closest(".cart-item").data("price") * countInput.val();
      $(this).closest(".cart-item").find(".price").html(numFormat.to(itemPrice));
    }

    cartTotal();
  });

  $(".count-minus").click(function () {
    var countInput = $(this).closest(".count").find(".count-input");
    if (+countInput.val() > 1) {
      countInput.val( + countInput.val() - 1 );
    }

    if ($(this).closest(".cart-item").data("price")) {
      var itemPrice = $(this).closest(".cart-item").data("price") * countInput.val();
      $(this).closest(".cart-item").find(".price").html(numFormat.to(itemPrice));
    }

    cartTotal();
  });

  // Catalog tooltip

  $(".catalog-tmb .tmb-compare, .catalog-tmb .tmb-cart").on("mouseenter",function () {

    var tToggle = $(this);

    if ($(this).find(".catalog-tooltip").length) {
      var catalogTooltip = $(this).find(".catalog-tooltip");

      catalogTooltip.fadeIn(150);

      var mLeft = - catalogTooltip.outerWidth() / 2;

      catalogTooltip.css({
        marginLeft: mLeft,
        right: "auto",
        left: "50%"
      });

      if (catalogTooltip.offset().left < 0) {
        mLeft = 0;
        catalogTooltip.css({
          marginLeft: mLeft,
          left: 0
        });
      } else if (catalogTooltip.offset().left + catalogTooltip.outerWidth() > $(window).width()) {
        mLeft = 0;
        catalogTooltip.css({
          marginLeft: mLeft,
          right: 0,
          left:"auto"
        });
      } else {
        catalogTooltip.css({
          marginLeft: mLeft
        });
      }


      catalogTooltip.find(".arrow").css({
        left: Math.abs(catalogTooltip.offset().left - tToggle.offset().left) + tToggle.outerWidth()/2
      })

    }

  });

  $(".catalog-tmb .tmb-compare, .catalog-tmb .tmb-cart").on("mouseleave",function () {

    if ($(this).find(".catalog-tooltip").length) {
      var catalogTooltip = $(this).find(".catalog-tooltip");
      catalogTooltip.hide();
    }

  })






  // Catalog gallery


  $(".gallery-big").on("init",function () {

    $(".gallery-thumbs a").on("click",function () {

      $(".gallery-big").slick("slickGoTo", $(this).prevAll("a").length);

      return false;
    })

  });


  $(".gallery-big").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    lazyLoad: "ondemand",
    speed:500,
    arrows: false,
    swipe: false,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: true,
          swipe: true,
          fade: false
        }
      }
    ]
  });




  // Catalog slider

  $(".catalog-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
  })

  // Expandable

  $("body").on("click", ".expandable-trigger span", function () {

    var $btn = $(this);
    var $target = $(this).closest(".expandable-trigger").prev(".expandable");

    if (!$target.hasClass("open")) {
      $target.slideDown(500,function () {
        $target.addClass("open");
        $btn.html("Свернуть");
      });
    } else {
      $target.slideUp(500,function () {
        $target.removeClass("open");
        $btn.html("Развернуть");
      });
    }

  });

  $("body").on("click", ".expandable-alt-trigger", function () {

    var $btn = $(this);
    var $target = $(this).closest(".expandable-alt").find(".expandable-alt-content");

    if (!$target.hasClass("open")) {
      $target.slideDown(500,function () {
        $target.addClass("open");
        $btn.html("Свернуть").addClass("active");
      });
    } else {
      $target.slideUp(500,function () {
        $target.removeClass("open");
        $btn.html("Развернуть").removeClass("active");
      });
    }

  });



  // More button

  $("body").on("click", ".more-link", function () {

    $(this).addClass("loading");

    link = $(this);

    $.get( $(this).attr("href"), function( data ) {
      link.after( data );
      link.nextAll().hide().fadeIn(500);
      link.remove();
    });

    return false;

  })

  // Anchors

  $(".header-buttons a").click(function () {

    $("html,body").animate({
      scrollTop: $("a[name='" + $(this).attr("href").replace("#","") + "']").offset().top
    },1000)

    return false;
  })



  // Clients

  $(".partners-slider").slick({
    slidesToShow: 4,
    slidesToScroll: 4,
    dots: true,
    infinite:false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  // Fancybox


  $("a.fancybox").fancybox();

  fancyboxFix();


  // Operator logo

  $("body").on("click",".remove-file",function () {
    $(this).closest(".form-file-wrapper").find(".file-preview-img").hide();
    $(this).closest(".form-file-wrapper").find(".file-preview-dummy").show();
    $(this).closest(".form-file-wrapper").find("input[type=file]").val("").trigger("change");
  });

  $(".form-file-wrapper input[type=file]").change(function () {

    if ($(this).val()) {
      $(this).closest(".form-file-wrapper").find(".btn-cancel").addClass("vis");
      $(this).closest(".form-file-wrapper").find(".file-preview-dummy").hide();
      readURL(this, $(this).closest(".form-file-wrapper").find(".file-preview-img"));
      $(this).closest(".form-file-wrapper").find(".file-preview-img").show();
    } else {
      $(this).closest(".form-file-wrapper").find(".btn-cancel").removeClass("vis");
    }

  });


  // Forms

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
        selectedTextFormat: "count"
      });
    } else {
      $(this).selectpicker({
        selectAllText: "Выбрать всё",
        deselectAllText: "Снять выбор"
      });
    }
  });

  $("select[multiple]").on("shown.bs.select",function () {
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

  $("input.input-phone").mask("+7 (999) 999-99-99");

  $("body").on("focus","input[type=text], input[type=email], input[type=password], textarea", function () {
    $(this).closest(".form-item").addClass("focus");
  });

  $("body").on("blur","input[type=text], input[type=email], input[type=password], textarea", function () {
    $(this).closest(".form-item").removeClass("focus")
  });

  validateForms();

});

// Contacts map

// function initMap() {
//   var myLatLng = {lat: 55.753735, lng: 37.622538};
//   var myCenter = {lat: 55.749735, lng: 37.622538};
//
//   var map = new google.maps.Map(document.getElementById('contactsMap'), {
//     zoom: 15,
//     center: myCenter,
//     styles: [
//       {
//         "featureType": "all",
//         "stylers": [
//           { "saturation": -100 }
//         ]
//       }
//     ]
//
//   });
//
//   var marker = new google.maps.Marker({
//     position: myLatLng,
//     map: map,
//     title: 'Hello World!',
//     icon: "images/map-pin.png"
//   });
// }

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
    $(this).valid();
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

  var cartTotal = 0;

  $(".cart-item").each(function () {

    if ($(this).data("price")) {
      var itemPrice = $(this).data("price") * $(this).find(".count-input").val();
      cartTotal += itemPrice;
    }

  });

  $(".cart-total-price .price").html(numFormat.to(cartTotal));
  $(".cart-total-all").html(numFormat.to(cartTotal - $(".cart-discount .price").html().replace(/\s+/g, '')));

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

  console.log(orderTotal)

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
      $(".data-table").css({
        marginTop: $(".data-table .table-header").height()
      });

      $(".data-table .table-header").addClass("table-header-fixed");



    } else {
      $(".data-table").css({
        marginTop: 0
      });

      $(".data-table .table-header").removeClass("table-header-fixed");

    }

    $(".data-table .table-header-fixed tr").css({
      marginLeft: $(".data-table-wrapper .mCSB_container").position().left
    });

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
    datepicker.next(".picker").find(".picker__select--year").wrap("<div class='select-wrapper select-wrapper-year'></div>").before("<label>Год</label>");
    datepicker.next(".picker").find(".picker__select--month").wrap("<div class='select-wrapper select-wrapper-month'></div>").before("<label>Месяц</label>");
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