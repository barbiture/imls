ymaps.ready(init);

function init() {
    var myMap = new ymaps.Map("map", {
            center: [55.73, 37.75],
            zoom: 10
        }, {
            searchControlProvider: 'yandex#search'
        });
    myMap.behaviors.disable('scrollZoom');

    
    var myButton =
      new ymaps.control.Button(
        '<b>Я кнопка</b>'
      );
    myButton.events
      .add(
        'press',
        function () {
            // Создаем многоугольник без вершин.
            var myPolygon = new ymaps.Polygon([], {}, {
                // Курсор в режиме добавления новых вершин.
                editorDrawingCursor: "crosshair",
                // Максимально допустимое количество вершин.
                editorMaxPoints: 5,
                // Цвет заливки.
                fillColor: '#2eba4530',
                // Цвет обводки.
                strokeColor: '#2eba45',
                // Ширина обводки.
                strokeWidth: 2
            });
            // Добавляем многоугольник на карту.
            myMap.geoObjects.add(myPolygon);

            // Включаем режим редактирования с возможностью добавления новых вершин.
            myPolygon.editor.startDrawing();
        }
      )
      .add(
        'select',
        function () {
          alert('Нажата');
        }
      )
      .add(
        'deselect',
        function () {
           myMap.geoObjects.remove(myPolygon);
        }
      );
    myMap.controls.add(myButton, {
      float: "left"
    });
}