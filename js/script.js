"use strict"

const bottons = document.querySelector('#bottons');
let hrefIcon = '';
const url = new URL ('https://gbfs.citibikenyc.com/gbfs/en/station_information.json');
const numLabels = 10;


ymaps.ready(function () { 
  // let hrefIcon = '';
  var myMap = new ymaps.Map("YMapsID", {
    center: [40.71, -74],
    zoom: 11,
});

  bottons.addEventListener('click', (e)=>choiseMethod(e.target));
  let choiseMethod = (choise) => {
      // let hrefIcon = '';
      // console.log(choise.id);
      // let hrefIcon = (choise.id=='btnFetch')?'../img/markRed.svg':'';
      if (choise.id=='btnXML') {
        hrefIcon = '../img/markRed.svg';
        
      } else if (choise.id=='btnFetch') {
        hrefIcon = '../img/markGreen.svg';
        async function getResponse () {
          let myResponse = await fetch (url);
          console.log(myResponse);
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
             for (let i = 0; i < numLabels; i++) {
               activStations.push(rrr(stations));
             } 
             console.log(activStations[0]);
             let i=0;
             let timerId = setInterval(() => {
              var myPlacemark = new ymaps.Placemark([activStations[i].lat, activStations[i].lon], {
                hintContent: `Станция номер - ${activStations[i].legacy_id} `,
                balloonContent: `Название станции - ${activStations[i].name}`,
              },
              {
               iconLayout: 'default#image',
               iconImageHref: hrefIcon,
               iconImageSize: [40, 40],
               iconImageOffset: [0, 0]
              });
              
              myMap.geoObjects.add(myPlacemark);
              i++;
             }, 1000);
             setTimeout(() => clearInterval(timerId), numLabels*1000);
             console.log('Finish');
            //  for (let i = 0; i < 5; i++) {
              
              
            // }
            return activStations[0];    
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
           getResponse();     
        // for (let i = 0; i < 5; i++) {
        //   var myPlacemark = new ymaps.Placemark([40.71, -74], {
        //     hintContent: `Станция номер - `,
        //     balloonContent: 'html-контент',
        //   },
        //   {
        //    iconLayout: 'default#image',
        //    iconImageHref: hrefIcon,
        //    iconImageSize: [40, 40],
        //    iconImageOffset: [0, 0]
        //   });
        //   myMap.geoObjects.add(myPlacemark); 
          
        // }
                
      } else if (choise.id=='btnPromise') {
        hrefIcon = '../img/markBlue.svg';
      } else return
    
      
      
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
