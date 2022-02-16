"use strict"

const bottons = document.querySelector('#bottons');
async function getResponse () {
  let myResponse = await fetch ('https://gbfs.citibikenyc.com/gbfs/en/station_information.json');
  // console.log(myResponse);
    if (myResponse.statusText == 'OK') {
      let dataBase = await myResponse.json();
      // console.log(dataBase);
      console.log(Date(dataBase.last_updated)); /// добавить вывод обновления и общего количества станций
      
      let stations = dataBase.data.stations;
      // console.log(stations);
      function rrr (arr) {
        return arr[Math.floor(Math.random() * arr.length)];
      };
     let activStations = [];
     for (let i = 0; i < 5; i++) {
       activStations.push(rrr(stations));
     } 
     console.log(activStations);
    return activStations;    
    //  return activStations;
    //  
      // let stations = dataBase.data.stations;
  //     for (const key in stations) {
  //     console.log(stations[key]);} 
  //   } else {
  //     alert("Ошибка HTTP: " + myResponse.status);
  //     }
  };
};
  
ymaps.ready(function () { 
  // let hrefIcon = '';
  var myMap = new ymaps.Map("YMapsID", {
    center: [40.71, -74],
    zoom: 11,
});

  bottons.addEventListener('click', (e)=>choiseMethod(e.target));
  let choiseMethod = (choise) => {
      let hrefIcon = '';
      console.log(choise.id);
      // let hrefIcon = (choise.id=='btnFetch')?'../img/markRed.svg':'';
      if (choise.id=='btnXML') {
        hrefIcon = '../img/markRed.svg';
        
      } else if (choise.id=='btnFetch') {
        hrefIcon = '../img/markGreen.svg';
        // getResponse();
        let massive = getResponse().then ();
        // console.log(massive);        
      } else if (choise.id=='btnPromise') {
        hrefIcon = '../img/markBlue.svg';
      } else return
    
      
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
      myMap.geoObjects.add(myPlacemark); 
     };
      });




// getResponse ();

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
