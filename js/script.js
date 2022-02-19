"use strict"

const buttons = document.querySelector('#buttons');
const errorBtn = document.querySelector('#btnError');
const spanStatus = document.querySelector('#statusId');
let hrefIcon = '';
let url = 'https://gbfs.citibikenyc.com/gbfs/en/station_information.json';
let maxStations = 10;
const activStations = [];
let counter = 0;

function getRandom (arr) {
  return arr[Math.floor(Math.random() * arr.length)]
};

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
    return url='some wrong url';
  } else {
    newStatus ('ошибки не должно быть');
    return url= 'https://gbfs.citibikenyc.com/gbfs/en/station_information.json';
  }
};

function newStatus (comment) {
  spanStatus.innerText = comment;
}

const myMap = () => {new ymaps.Map("YMapsID", {
    center: [40.71, -74],
    zoom: 10,
  });
  newStatus('карта загружена');}


ymaps.ready(myMap, newStatus ('Карта не загрузилась. Проверьте соединение с интернетом ...')); // Либо тут колбеки и зис


console.dir (ymaps);
console.log (myMap);


let myPlacemark = (counter) => {
  new ymaps.Placemark([activStations[counter].lat, activStations[counter].lon], {
  hintContent: `Станция номер - ${activStations[counter].legacy_id} `,
  balloonContent: `Название станции - ${activStations[counter].name}`,
},{
  iconLayout: 'default#image',
  iconContent: 'islands#blueBicycleIcon',
  iconImageSize: [40, 40],
  iconImageOffset: [0, 0]
});

myMap.geoObjects.add(myPlacemark);
}

/*
errorBtn.addEventListener('click', errorActiv);
buttons.addEventListener('click', (e)=>{
    myMap.geoObjects.removeAll();
    counter = 0;
    changeBtnStyle (e.target);
    choiseMethod(e.target)});
  
  let choiseMethod = (choise) => {
      if (choise.id=='btnXML') {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'json';
        xhr.send();
        xhr.onload = function() {
          if (xhr.status != 200) {
            newStatus ('Возникла ошибка. Попробуйте позже ...');
          } else {
            let stations = xhr.response.data.stations;
            for (let i = 0; i < maxStations; i++) {
              activStations.push(getRandom(stations));
            }
            let timerId = setInterval(() => {
             const myPlacemark = new ymaps.Placemark([activStations[counter].lat, activStations[counter].lon], {
               hintContent: `Станция номер - ${activStations[counter].legacy_id} `,
               balloonContent: `Название станции - ${activStations[counter].name}`,
             },
             {
              iconLayout: 'default#image',
              iconImageHref: hrefIcon,
              iconImageSize: [40, 40],
              iconImageOffset: [0, 0]
             });
             
             myMap.geoObjects.add(myPlacemark);
             newStatus (`Показано ${(counter+1)} станций из ${stations.length}`);
             counter++;
            }, 1000);
            setTimeout(() => clearInterval(timerId), maxStations*1000);
            }
          };
        xhr.onerror = function() {
          newStatus("Запрос не удался");
        };

      } else if (choise.id=='btnFetch') {
        hrefIcon = '../img/markGreen.svg';
        async function getResponse () {
          let myResponse = await fetch (url);
            if (myResponse.statusText == 'OK') {
              let dataBase = await myResponse.json();
              let stations = dataBase.data.stations;
              for (let i = 0; i < maxStations; i++) {
                activStations.push(getRandom(stations));
                };
             let timerId = setInterval(() => {
              const myPlacemark = new ymaps.Placemark([activStations[counter].lat, activStations[counter].lon], {
                hintContent: `Станция номер - ${activStations[counter].legacy_id} `,
                balloonContent: `Название станции - ${activStations[counter].name}`,
              },
              {
               iconLayout: 'default#image',
               iconImageHref: hrefIcon,
               iconImageSize: [40, 40],
               iconImageOffset: [0, 0]
              });
              myMap.geoObjects.add(myPlacemark);
              newStatus (`Показано ${(counter+1)} станций из ${stations.length}`);
              counter++;
             }, 1000);
             setTimeout(() => clearInterval(timerId), maxStations*1000);    
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
            xhr.send();
            xhr.onload = function() {
            let stations = xhr.response.data.stations;
            let activStations = getRandom(stations);//немного отличается, то что не массив
            const myPlacemark = new ymaps.Placemark([activStations.lat, activStations.lon], { 
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
             newStatus (`Показано ${(counter+1)} станций из ${stations.length}`);
             counter++;
            setTimeout(()=> resolve(), 1000)}
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
      } else return };
      */