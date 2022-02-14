const urlImageOne = new URL ('http://geek-nose.com/wp-content/uploads/2016/07/20141015121419_0c0a6_1280x1280.jpg'),
        urlImageTwo = new URL ('http://www.softlab.ru/upload/iblock/3b1/400_f_44067931.jpg_big.jpg'),
        urlImageThree = new URL ('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEjMZrr5mFBVQrcGWPZ7yi4hOGLDdmmvDn0WcB7ZjIrbw1f2lq7Xz7K5uXbKyLs_HH8ac&usqp=CAU');

const urls = [urlImageOne, urlImageTwo, urlImageThree];
const IMAGES = document.querySelector('#images');

// urls.forEach(url => {
//         IMAGES.innerHTML += `<img src=${url} width=100px>`;
// });
function loadImage (url) {
        return new Promise ((resolve, reject)=> {
        const images = new Image();
        images.width = 100;
        images.src = url;
        document.body.append(images);
        images.addEventListener('load', ()=> {
               resolve();
        images.addEventListener('error', ()=> {
                reject();
        })
        
       })
})
};
//        return n++;
        //{IMAGES.innerHTML += `<img src=${urls[0]} width=100px>`})


loadImage (urls[0])
        .then(()=>loadImage(urls[1]))
        .then(()=>loadImage(urls[2]))
        .catch (alert('Возникла ошибка 0'))
        // .catch(()=>alert('Возникла ошибка')); 
console.dir (loadImage);
// function promiseLoad (url) {
//         return new Promise((resolve) =>
//         resolve ());
//         // return promise;
// } 

// promiseLoad ()
// promise (urls)
// promise
//         .then (()=>{IMAGES.innerHTML += `<img src=${urls[0]} width=100px>`})
//         .then (()=>{IMAGES.innerHTML += `<img src=${urls[1]} width=100px>`})
//         .then (()=>{IMAGES.innerHTML += `<img src=${urls[2]} width=100px>`});
//         console.dir (promise.then);
//         console.log(urls);