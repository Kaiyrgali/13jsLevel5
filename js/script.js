"use strict"

const bottons = document.querySelector('#bottons');
let hrefIcon = '';
const url = new URL ('https://gbfs.citibikenyc.com/gbfs/en/station_information.json');
const numLabels = 10;

function getRandom (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

ymaps.ready(function () { 
  var myMap = new ymaps.Map("YMapsID", {
    center: [40.71, -74],
    zoom: 10,
});

  bottons.addEventListener('click', (e)=>choiseMethod(e.target));
  let choiseMethod = (choise) => {
      if (choise.id=='btnXML') {
        hrefIcon = '../img/markRed.svg';
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'json';
        xhr.send();
        xhr.onload = function() {
          if (xhr.status != 200) {
            alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Заменить на собственный обработчик ошибок
          } else {
            let stations = xhr.response.data.stations;
            let activStations = [];
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
              let activStations = [];
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
              i++;
             }, 1000);
             setTimeout(() => clearInterval(timerId), numLabels*1000);
            return activStations[0];    
          };          
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
            setTimeout(()=> resolve(), 1000)}
          })
               
        }
        loadStaitions ()
          .then (() => {return loadStaitions ()})
          .then (() => {return loadStaitions ()})
          .then (() => {return loadStaitions ()})
          .then (() => {return loadStaitions ()})
          .then (() => {return loadStaitions ()})
          .then (() => {return loadStaitions ()})
          .then (() => {return loadStaitions ()})
          .then (() => {return loadStaitions ()})
          .then (() => {return loadStaitions ()})

          // catch (alert ('Mistake!');
      } else return };

    });

