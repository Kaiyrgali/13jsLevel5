"use strict"

const buttons = document.querySelector('#buttons');
const errorBtn = document.querySelector('#btnError');
const spanStatus = document.querySelector('#statusId');
let hrefIcon = '';
let url = 'https://gbfs.citibikenyc.com/gbfs/en/station_information.json';
const numLabels = 10;
let activStations = [];
let i = 0;


function getRandom (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

ymaps.ready(function () { 
  var myMap = new ymaps.Map("YMapsID", {
    center: [40.71, -74],
    zoom: 10,
});
  newStatus ('карта загружена');
  errorBtn.addEventListener('click', errorActiv);

  buttons.addEventListener('click', (e)=>{
    changeBtnStyle (e.target);
    choiseMethod(e.target)});
  
  let choiseMethod = (choise) => {
      if (choise.id=='btnXML') {
        hrefIcon = '../img/markRed.svg';
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'json';
        xhr.send();
        xhr.onload = function() {
          if (xhr.status != 200) {
            newStatus ('Возникла ошибка. Попробуйте позже ...');
          } else {
            let stations = xhr.response.data.stations;
            for (let i = 0; i < numLabels; i++) {
              activStations.push(getRandom(stations));
            } 
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
             newStatus (`Показано ${(i+1)} станций из ${stations.length}`);
             i++;
            }, 1000);
            setTimeout(() => clearInterval(timerId), numLabels*1000);
            // Если рандомизация и Обработка карты повторяется. Поэтому можно вывести ее в отдельную функцию и попробовать импортировать
            }
          };
         
        xhr.onerror = function() { // Заменить на свой обработчик ошибок
          alert("Запрос не удался");
        };

      } else if (choise.id=='btnFetch') {
        hrefIcon = '../img/markGreen.svg';
        async function getResponse () {
          let myResponse = await fetch (url);
            if (myResponse.statusText == 'OK') {
              let dataBase = await myResponse.json();
              let stations = dataBase.data.stations;
              for (let i = 0; i < numLabels; i++) {
                activStations.push(getRandom(stations));
                };
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
              newStatus (`Показано ${(i+1)} станций из ${stations.length}`);
              i++;
             }, 1000);
             
             setTimeout(() => clearInterval(timerId), numLabels*1000);
            return activStations[0];    
          } else newStatus ('Возникла ошибка. Попробуйте позже ...');          
        };
          getResponse();    
      } else if (choise.id=='btnPromise') {
        hrefIcon = '../img/markBlue.svg';
        function loadStaitions () {
          return new Promise ((resolve) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.responseType = 'json';
            console.log(xhr);
            xhr.send();
            xhr.onload = function() {
            let stations = xhr.response.data.stations;
            let activStations = getRandom(stations); //сократил, так как массив не нужен
            var myPlacemark = new ymaps.Placemark([activStations.lat, activStations.lon], { //немного отличается, то что не массив
               hintContent: `Станция номер - ${activStations.legacy_id} `,
               balloonContent: `Название станции - ${activStations.name}`,
             },
             {
              iconLayout: 'default#image',
              iconImageHref: hrefIcon,
              iconImageSize: [40, 40],
              iconImageOffset: [0, 0]
             });
             myMap.geoObjects.add(myPlacemark);
             newStatus (`Показано ${(i+1)} станций из ${stations.length}`);
             i++;
            setTimeout(()=> resolve(i), 1000)}
          })
               
        }
        loadStaitions ()
          .then (() => loadStaitions ())
          .then (() => loadStaitions ())
          .then (() => loadStaitions ())
          .then (() => loadStaitions ())
          .then (() => loadStaitions ())
          .then (() => loadStaitions ())
          .then (() => loadStaitions ())
          .then (() => loadStaitions ())
          .then (() => loadStaitions ())
          .catch (newStatus ('Возникла ошибка. Попробуйте позже ...'))

          // catch (alert ('Mistake!');
      } else return };
    });
  

function changeBtnStyle (choise) {
  for (let i = 0; i < buttons.children.length; i++) {
    buttons.children[i].classList.remove("btn-active");   
  }
  choise.classList.add("btn-active");
};

function errorActiv () {
  errorBtn.classList.toggle('error-active');
  if (errorBtn.classList == 'error-active') {
    newStatus ('сгенерирована ошибка');
    return url='mlml';
  } else return url= 'https://gbfs.citibikenyc.com/gbfs/en/station_information.json';;
};

function newStatus (comment) {
  spanStatus.innerText = comment;
  // setInterval(()={spanStatus.innerText = comment}, 1000); 
}
//https://www.pandoge.com/stati-i-sovety/podrobnaya-instrukciya-po-dobavleniyu-yandekskarty-na-svoy-sayt 