ymaps.ready(init);

function init () {
    // Создание экземпляра карты.
    var myMap = new ymaps.Map('map', {
            center: [55.76, 37.64],
            zoom: 10
        }, {
            searchControlProvider: 'yandex#search'
        });
    myMap.behaviors.disable('scrollZoom');

    // Создадим пользовательский макет ползунка масштаба.
            ZoomLayout = ymaps.templateLayoutFactory.createClass("<div class='map-modal apply-wrap map-js'>" +
               "<div class='map-modal_title'>Показана только часть объявлений</div>" +
                "<p>Пожалуйста, <span id='zoom-in' class='btn'>приблизьте карту</span>, либо задайте<br /> более узкие условия поиска</p>" +  "<span class='map-modal_close'></span>" +
                "</div>", {

                // Переопределяем методы макета, чтобы выполнять дополнительные действия
                // при построении и очистке макета.
                build: function () {
                    // Вызываем родительский метод build.
                    ZoomLayout.superclass.build.call(this);

                    // Привязываем функции-обработчики к контексту и сохраняем ссылки
                    // на них, чтобы потом отписаться от событий.
                    this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);

                    // Начинаем слушать клики на кнопках макета.
                    $('#zoom-in').bind('click', this.zoomInCallback);

                    $('.map-modal_close').click(function () {
                        $(this).parents('.map-js').slideUp();
                    });
                },

                clear: function () {
                    // Снимаем обработчики кликов.
                    $('#zoom-in').unbind('click', this.zoomInCallback);

                    // Вызываем родительский метод clear.
                    ZoomLayout.superclass.clear.call(this);
                },

                zoomIn: function () {
                    var map = this.getData().control.getMap();
                    map.setZoom(map.getZoom() + 1, {checkZoomRange: true});
                }
            }),
            zoomControl = new ymaps.control.ZoomControl({options: {layout: ZoomLayout}});

        myMap.controls.add(zoomControl, {position: {
                top: 220,
                left: 50,
                right: 50
        }});

        clusterer = new ymaps.Clusterer();

         
        // var result = [];
        // ymaps.geoXml.load('data.xml')
        //  .then(function (res) {
        //  res.geoObjects.each(function (geoObject) {
        //  result.push(geoObject);
        //  });
        // clusterer.add(result);
        //  });
        //   myMap.geoObjects.add(clusterer);
          var clusterer =  ymaps.geoQuery(ymaps.geoXml.load('data.xml')).clusterize({
            preset: 'islands#invertedDarkGreenClusterIcons', 
            geoObjectHideIconOnBalloonOpen: false
          });

          myMap.geoObjects.add(clusterer);

    // ymaps.geoXml.load('data.xml')
    //     .then(function (res) {
    //         // Добавление геообъектов на карту.
    //         myMap.geoObjects.add(res.geoObjects);

    //        // Вызывается в случае неудачной загрузки YMapsML-файла.
    //     }, function (error){
    //         alert('Ошибка: ' + error);
    //     });
}


    // var i=1;
    // // Загрузка YMapsML-файла
    // ymaps.geoXml.load('data.xml')
    // .then(function (res) { // функция обрабатывает успешный результат получения YMapsML
    // clusterer = new ymaps.Clusterer({margin:[20]});
    // res.geoObjects.each(function (obj, objIndex, group) {
    // obj.properties.set(‘clusterCaption’, i++);
    // clusterer.add(obj);
    // });
    // myMap.geoObjects.add(clusterer);
    // }, function (error) {
    // alert(‘Ошибка: ‘ + error);
    // });