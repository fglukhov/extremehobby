document.addEventListener("DOMContentLoaded", function (event) {

  ymaps.ready(function () {
    var myMap = new ymaps.Map('contactsMap1', {
        center: [55.918923, 37.808366],
        zoom: 17
      }, {
        searchControlProvider: 'yandex#search'
      }),

      // Создаём макет содержимого.
      MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
      ),

      myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
        //hintContent: 'Собственный значок метки',
        //balloonContent: 'Это красивая метка'
      }, {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        iconImageHref: 'images/map-pin.png',
        // Размеры метки.
        iconImageSize: [45, 65],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-23, -65]
      });

    myMap.geoObjects
      .add(myPlacemark);
  });

});