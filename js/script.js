"use strict"
let hrefIcon='';
// const hrefIcon = ['../img/markRed.svg', '../img/markBlue.svg', '../img/markGreen.svg'];
const bottons = document.querySelector('#bottons');

const btnClick = bottons.addEventListener('click', (e)=>choiseMethod(e.target));

function choiseMethod (choise) {
  switch (choise.id) {
    case 'btnFetch':
      console.log('CLICK');
      let hrefIcon = '../img/markRed.svg';
      return hrefIcon;
    default: break
    }
  
  // console.log(choise.id);
}
ymaps.ready(function () { 
 
    var myMap = new ymaps.Map("YMapsID", {
        center: [40.71, -74],
        zoom: 11,
    });
 
    // создание маркера
    /// Эту часть надо убирать в функцию отдельную
    
    var myPlacemark = new ymaps.Placemark([40.71, -74], {
       hintContent: 'название маркера',
       balloonContent: 'html-контент',
    },
    {
        iconLayout: 'default#image',
        iconImageHref: hrefIcon,
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

