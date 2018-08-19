$(document).ready(function () {
  
  $(".yc-act-day a").click(function () {

    eventsPopupYear($(this), "/cultmosaic/build/load/events-list-year.html");

    return false;

  });

  $("body").on("click", function (e) {

    if ($(".events-popup-year").length && !$(e.target).is(".yc-act-day") && !$(e.target).is(".events-popup-year") && !$(e.target).parents().hasClass(".events-popup-year")) {
      $(".events-popup-year").remove();
    }

  });
  
});

function eventsPopupYear(link, url) {

  $(".events-popup-year").remove();

  link.after('\
  <div class="events-popup-year">\
  \
  </div>\
  ');

  var eventsPopup = link.next(".events-popup-year");

  if (eventsPopup.offset().left < $(".year-calendar").offset().left) {
    eventsPopup.addClass("events-popup-year-r");
  }

  if (eventsPopup.offset().right > $(".year-calendar").offset().right) {
    eventsPopup.addClass("events-popup-year-l");
  }

  $.get( url, function( data ) {
    eventsPopup.html( data );
  });


  
}