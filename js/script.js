"use strict"

const buttons = document.querySelector('#buttons');
const errorBtn = document.querySelector('#btnError');
const spanStatus = document.querySelector('#statusId');
let url = 'https://gbfs.citibikenyc.com/gbfs/en/station_information.json';
const maxStations = 10;
let myMap = new Object ();
let stations = new Array;
let activeBtn = new Object();
let activStations = new Array;
let iconMap = new String;

function getRandom (arr) {
  return arr[Math.floor(Math.random() * arr.length)]
};

function changeBtnStyle (choise) {
  for (let i = 0; i < buttons.children.length; i++) {
  buttons.children[i].classList.remove("btn-active");
};
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

function makeStations () {
  console.log(stations);
  activStations=[];
    for (let i = 0; i < maxStations; i++) {
      activStations.push(getRandom(stations));
    }
  }

function drawStations () {
  myMap.geoObjects.removeAll();
  for (let i = 0; i < activStations.length; i++) {
    let myPlacemark = new ymaps.Placemark(
      [activStations[i].lat, activStations[i].lon], {
        hintContent: `Станция номер - ${activStations[i].legacy_id} `,
        balloonContent: `Название станции - ${activStations[i].name}`,
      },
      {preset: iconMap});
      myMap.geoObjects.add(myPlacemark);
      newStatus (`Показано ${(i+1)} станций из ${stations.length}`);
    };
};

ymaps.ready(newMap, newStatus ('Карта не загрузилась. Проверьте соединение с интернетом ...'));

function newMap() {
  myMap = new ymaps.Map("YMapsID", {center: [40.71, -74], zoom: 10,});
  newStatus('карта загружена');
};

errorBtn.addEventListener('click', errorActiv);
buttons.addEventListener('click', (e)=>{
  activeBtn = e;
  changeBtnStyle (activeBtn.target); // меняем цвета активной кнопки
  choiseMethod(activeBtn.target) // скачиваем базу велосипедов одним из трех ассинхронных методов  
});


function choiseMethod (choise) {
  if (choise.id=='btnXML') {
    methodOne ();
  } else if (choise.id=='btnFetch') {
  methodTwo ();
  } else if (choise.id=='btnPromise') {
    methodThree ()
      .then (() => methodThree ())
      .then (() => methodThree ())
      .then (() => methodThree ())
      .then (() => methodThree ())
      .then (() => methodThree ())
      .then (() => methodThree ())
      .then (() => methodThree ())
      .then (() => methodThree ())
      .then (() => methodThree ())
      .catch (newStatus ('Возникла ошибка. Попробуйте позже ...'))
  } else return };

function methodOne () {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'json';
  xhr.send();
  xhr.onload = function() {
    if (xhr.status != 200) {
     newStatus ('Возникла ошибка. Попробуйте позже ...');
    } else {
      iconMap = 'islands#blueBicycleIcon';
      stations = xhr.response.data.stations;
      makeStations () // Генерируем массив из 10ти (maxNumber) станций
      drawStations (); // Рисуем на карте 10ть (maxNumber) станций        
    }
    xhr.onerror = function() {
      newStatus("Запрос не удался");
    };
  };
}; 

async function methodTwo () {
  const myResponse = await fetch (url);
  if (myResponse.statusText == 'OK') {
    const dataBase = await myResponse.json();
    iconMap = 'islands#redBicycleIcon';
    stations = dataBase.data.stations;
    makeStations () // Генерируем массив из 10ти (maxNumber) станций
    drawStations (); // Рисуем на карте 10ть (maxNumber) станций        
  } else newStatus ('Возникла ошибка. Попробуйте позже ...');          
};

function methodThree () {
  return new Promise ((resolve) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.send();
    xhr.onload = function() {
    iconMap = 'islands#greenBicycleIcon';
    stations = xhr.response.data.stations;
    makeStations (); // Генерируем массив из 10ти (maxNumber) станций
    drawStations (); // Рисуем на карте 10ть (maxNumber) станций     
    console.log('methodThree');
    resolve ();
  }
  })
}
