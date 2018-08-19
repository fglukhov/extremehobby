$(document).ready(function () {
  
  $(".test-map").mapPan({
    zoomFactor: 1.2
  });
  
});


(function( $ ){
  $.fn.mapPan = function( options ) {


    var settings = $.extend({
      zoomFactor: 2
    }, options );

    var mapWrapper = $(this);

    var mapContainer = mapWrapper.find(".map-pan-inner");

    mapContainer.data("zoom", 1);

    mapContainer.find("img").on("load", function () {
      mapContainer.css({
        width: mapContainer.find("img").width(),
        height: mapContainer.find("img").height()
      });
      mapContainer.find("img").css({
        width: "100%",
        height: "100%"
      });
    });

    mapWrapper.addClass("map-pan-wrapper");

    mapWrapper.find('img').on('dragstart', function(event) { event.preventDefault(); });

    // var i = 0, timeOut = 0;

    var dr = mapWrapper.find(".map-pan-inner");

    mapWrapper.on('mousedown touchstart', function(e) {
      $(this).addClass('active');

      var drHeight = dr.outerHeight();
      var drWidth = dr.outerWidth();

      xpos = dr.offset().left + drWidth - e.pageX;
      ypos = dr.offset().top + drHeight - e.pageY;

      $(document.body).on('mousemove', function(e){
        var ileft = e.pageX + xpos - drWidth;
        var itop = e.pageY + ypos - drHeight;
        if(mapWrapper.hasClass("active")){
          dr.offset({top: itop,left: ileft});
        }

        if (dr.position().left > 0) {
          dr.css({left:0});
        }

        if (dr.position().left < mapWrapper.width() - dr.outerWidth() ) {
          dr.css({left:mapWrapper.width() - dr.outerWidth()});
        }

        if (dr.position().top > 0) {
          dr.css({top:0});
        }

        if (dr.position().top < mapWrapper.height() - dr.outerHeight() ) {
          dr.css({top:mapWrapper.height() - dr.outerHeight()});
        }

      });

      // timeOut = setInterval(function(){
      //   console.log(i++);
      // }, 100);
    }).bind('mouseup touchend', function() {
      $(this).removeClass('active');
      // clearInterval(timeOut);
    });

    $("body").on('mouseup touchend', function() {
      mapWrapper.removeClass('active');
      // clearInterval(timeOut);
    });

    mapWrapper.append('<div class="zoom-out">&minus;</div>');
    mapWrapper.append('<div class="zoom-in">+</div>');

    var zoomOutBtn = mapWrapper.find(".zoom-out");
    var zoomInBtn = mapWrapper.find(".zoom-in");

    zoomInBtn.click(function () {

      mapContainer.animate({
        width: mapContainer.width() * settings.zoomFactor,
        height: mapContainer.height() * settings.zoomFactor
      },500).data("zoom",mapContainer.data("zoom") * settings.zoomFactor);

      console.log(mapContainer.data("zoom"))

    });

    zoomOutBtn.click(function () {

      mapContainer.animate({
        width: mapContainer.width() / settings.zoomFactor,
        height: mapContainer.height() / settings.zoomFactor
      },500).data("zoom",mapContainer.data("zoom") / settings.zoomFactor);

      console.log(mapContainer.data("zoom"))

    });


  };
})( jQuery );