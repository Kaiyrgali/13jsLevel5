"use strict"

let url = 'https://gbfs.citibikenyc.com/gbfs/en/station_information.json',
  myMap = new Object(),
  stations = new Array(),
  activeBtn = new Object(),
  activStations = new Array(),
  iconMap = new String();

const maxStations = 10,
  buttons = document.querySelector('#buttons'),
  errorBtn = document.querySelector('#btnError'),
  spanStatus = document.querySelector('#statusId'),
  activeBtnClass = "btn-active",
  errorBtnClass = "error-active",
  errorText = "Возникла ошибка. Попробуйте позже ...",
  errorGenerateText = "Cгенерирована ошибка",
  errorNotText = "Ошибки не должно быть",
  errorRequestText= "Запрос не удался",
  errorLoadMapText = "Карта не загрузилась. Проверьте соединение с интернетом ...",
  LoadMapOk = "Карта загружена",
  urlWrong = "some wrong url",
  urlRight = url,
  mapCenter = [40.71, -74],
  mapZoom = 10,
  IdMethodOne = "btnXML",
  IdMethodTwo = "btnFetch",
  IdMethodThree = "btnPromise";

ymaps.ready(createMap, updateStatus(errorLoadMapText));

errorBtn.addEventListener('click', changeErrorStyle);

buttons.addEventListener('click', (e)=>{
  activeBtn = e;
  changeBtnStyle(activeBtn.target); // меняем цвета активной кнопки
  choiseMethod(activeBtn.target) // скачиваем базу велосипедов одним из трех ассинхронных методов  
});

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function changeBtnStyle(choise) {
  for (let i = 0; i < buttons.children.length; i++) {
    buttons.children[i].classList.remove(activeBtnClass);
  }
  choise.classList.add(activeBtnClass);
}

function changeErrorStyle() {
  errorBtn.classList.toggle(errorBtnClass);
  if (errorBtn.classList == errorBtnClass) {
    updateStatus(errorGenerateText);
    url = urlWrong;
  } else {
    updateStatus(errorNotText);
    url = urlRight;
  }
}

function updateStatus(comment) {
  spanStatus.innerText = comment;
}

function makeStations() {
  activStations = [];
  for (let i = 0; i < maxStations; i++) {
    activStations.push(getRandom(stations));
  }
}

function drawStations() {
  myMap.geoObjects.removeAll();
  for (let i = 0; i < activStations.length; i++) {
    setTimeout(() => {
      let myPlacemark = new ymaps.Placemark(
      [activStations[i].lat, activStations[i].lon], {
      hintContent: `Станция номер - ${activStations[i].legacy_id} `,
      balloonContent: `Название станции - ${activStations[i].name}`,
    }, {preset: iconMap});
      myMap.geoObjects.add(myPlacemark);
      updateStatus(`Показано ${(i + 1)} станций из ${stations.length}`);
    }, 500*i);
  }
}

function createMap() {
  myMap = new ymaps.Map("YMapsID", {center: mapCenter, zoom: mapZoom});
  updateStatus(LoadMapOk);
}

function choiseMethod(choise) {
  if (choise.id === IdMethodOne) {
    methodOne(url);
  } else if (choise.id === IdMethodTwo) {
    methodTwo(url);
  } else if (choise.id === IdMethodThree) {
    methodThree(url)
      .then (() => methodThree(url))
      .then (() => methodThree(url))
      .then (() => methodThree(url))
      .then (() => methodThree(url))
      .then (() => methodThree(url))
      .then (() => methodThree(url))
      .then (() => methodThree(url))
      .then (() => methodThree(url))
      .then (() => methodThree(url))
      .catch (updateStatus(errorText))
  } else return
}

function methodOne(currentUrl) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', currentUrl);
  xhr.responseType = 'json';
  xhr.send();
  xhr.onload = function() {
    if (xhr.status != 200) {
      updateStatus(errorText);
    } else {
      iconMap = 'islands#blueBicycleIcon';
      stations = xhr.response.data.stations;
      makeStations() // Генерируем массив из 10ти (maxNumber) станций
      drawStations(); // Рисуем на карте 10ть (maxNumber) станций        
    }
  }
  xhr.onerror = function() {
    updateStatus(errorRequestText);
  }
}

async function methodTwo(currentUrl) {
  const myResponse = await fetch (currentUrl);
  if (myResponse.statusText === 'OK') {
    const dataBase = await myResponse.json();
    iconMap = 'islands#redBicycleIcon';
    stations = dataBase.data.stations;
    makeStations(); // Генерируем массив из 10ти (maxNumber) станций
    drawStations(); // Рисуем на карте 10ть (maxNumber) станций        
  } else updateStatus(errorText);          
}

function methodThree(currentUrl) {
  return new Promise (function(resolve) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', currentUrl);
    xhr.responseType = 'json';
    xhr.send();
    xhr.onload = function() {
      iconMap = 'islands#greenBicycleIcon';
      stations = xhr.response.data.stations;
      makeStations(); // Генерируем массив из 10ти (maxNumber) станций
      drawStations(); // Рисуем на карте 10ть (maxNumber) станций     
      console.log('methodThree');
      resolve(); //иначе следующие then не срабатывают
    }
  })
}