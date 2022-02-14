//Отправка формы
formElem/*АйДи элемента*/.onsubmit/*Эвент нажатия кнопки отправить*/ = () => {
    console.log ('Work!') //Действие
};

//Лучше так создавать URL
let url1 = 'https://learn.javascript.ru/async-await#await';
let url2 = new URL ('https://learn.javascript.ru/async-await#await');
console.log(url1);
console.log(url2);

//Перебор массива через .MAP
let urls = [
    'https://api.github.com/users/iliakan',
    'https://api.github.com/users/remy',
    'https://api.github.com/users/jeresig'
  ];
  
  // Преобразуем каждый URL во чтоөто другое в том числе промис, возвращённый fetch
  let requests = urls.map(url => url.toUpperCase (url)); //=> fetch(url)
  