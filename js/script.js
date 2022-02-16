"use strict"
let hrefIcon = '<?xml version="1.0" encoding="UTF-8"?> <svg viewBox="0 0 2481 2073" xmlns="http://www.w3.org/2000/svg"> <g fill-rule="evenodd"> <path d="m730.94 1839.6c-38.766-190.3-107.12-348.67-189.9-495.44-61.407-108.87-132.54-209.36-198.36-314.94-21.972-35.243-40.934-72.476-62.047-109.05-42.216-73.137-76.444-157.94-74.269-267.93 2.125-107.47 33.208-193.68 78.03-264.17 73.719-115.94 197.2-210.99 362.88-235.97 135.47-20.424 262.48 14.082 352.54 66.748 73.596 43.038 130.6 100.53 173.92 168.28 45.22 70.716 76.36 154.26 78.97 263.23 1.3401 55.83-7.7999 107.53-20.68 150.42-13.03 43.409-33.99 79.695-52.64 118.45-36.41 75.659-82.05 144.98-127.86 214.34-136.44 206.61-264.5 417.31-320.58 706.03z" fill="#003f7f" stroke-miterlimit="10" stroke-width="37"/> <circle cx="729.55" cy="651.05" r="183.33" fill="#fff"/> </g> </svg>'


ymaps.ready(function () { 
 
    var myMap = new ymaps.Map("YMapsID", {
        center: [40.71, -74],
        zoom: 11,
    });
 
    // создание маркера
    var myPlacemark = new ymaps.Placemark([40.71, -74], {
       hintContent: 'название маркера',
       balloonContent: 'html-контент',
    },
    {
        iconLayout: 'default#image',
        iconImageHref: '../img/mark.svg',
        iconFill: 'red',
        iconImageSize: [40, 40],
        iconImageOffset: [0, 0]
    });

    // добавление маркера на карту
    myMap.geoObjects.add(myPlacemark);
    
});

async function getResponse () {
  let myResponse = await fetch ('https://gbfs.citibikenyc.com/gbfs/en/station_information.json');
  console.log(myResponse);
    if (myResponse.statusText == 'OK') { // если HTTP-статус в диапазоне 200-299
    // получаем тело ответа (см. про этот метод ниже)
    let user = await myResponse.json();
    console.log(user);
    console.log(Date(user.last_updated));

    let stations = user.data.stations.splice (0, 2);
    for (const key in stations) {
    console.log(stations[key]);} 
  } else {
    alert("Ошибка HTTP: " + myResponse.status);
    }
  }
getResponse ();

// 1. Создаём новый XMLHttpRequest-объект
// let xhr = new XMLHttpRequest();

// // 2. Настраиваем его: GET-запрос по URL /article/.../load
// xhr.open('GET', 'https://gbfs.citibikenyc.com/gbfs/en/station_information.json');
// // xhr.responseType = 'json';
// console.log(xhr);
// // 3. Отсылаем запрос
// xhr.send();

// // 4. Этот код сработает после того, как мы получим ответ сервера
// xhr.onload = function() {
//   if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
//     alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
//   } else { // если всё прошло гладко, выводим результат
//     alert(`Готово, получили ${xhr.response.length} байт`); // response -- это ответ сервера
//   }
// };

// xhr.onprogress = function(event) {
//   if (event.lengthComputable) {
//     alert(`Получено ${event.loaded} из ${event.total} байт`);
//   } else {
//     alert(`Получено ${event.loaded} байт`); // если в ответе нет заголовка Content-Length
//   }

// };

// xhr.onerror = function() {
//   alert("Запрос не удался");
// };

console.time();
console.timeEnd();

