import getRandomImage from './nasa-api';
import { save, load } from './storage';

// todo vísa í rétta hluti með import

// breytur til þess að halda utan um html element nodes
let title; // titill fyrir mynd á forsíðu
let text; // texti fyrir mynd á forsíðu
let img; // mynd á forsíðu

let image; // object sem inniheldur núverandi mynd á forsíðu.
let video;

/*
 * Sækir nýja Mynd af handahófi frá Nasa API og birtir hana á forsíðunni
 * ásamt titli og texta.
 */
async function getNewImage() {
  image = await getRandomImage();
  console.log(image);
  text.innerText = image.text;
  title.innerText = image.title;

  if (image.type === 'video') {
    video.src = image.mediaUrl;

    video.style.display = 'visible';
    img.style.display = 'none';
  } else {
    img.src = image.mediaUrl;

    img.style.display = 'visible';
    video.style.display = 'none';
  }
}

/*
 * Vistar núverandi mynd í storage.
 */
function saveCurrentImage() {
  save(image.type, image.mediaUrl, image.text, image.title);
}

/*
 * Upphafsstillir forsíðuna. Setur event listeners á takkana, og sækir eina mynd.
 *
 */
export default function init(apod) { // eslint-disable-line no-unused-vars
  img = document.querySelector('.apod__image');
  title = document.querySelector('.apod__title');
  text = document.querySelector('.apod__text');
  video = document.querySelector('.apod__video');


  document.querySelector('#new-image-button').addEventListener('click', getNewImage);
  document.querySelector('#save-image-button').addEventListener('click', saveCurrentImage);
  getNewImage();
}

/*
 * Fall fyrir favourites.html. Sér um að sækja allar vistuðu myndirnar og birta þær ásamt
 * titlum þeirra.
 */
export function loadFavourites() {
  const main = document.querySelector('main');
  const storedImages = load();
  storedImages.forEach((obj) => {
    const titleElement = document.createElement('h1');
    titleElement.innerText = obj.title;

    const item = document.createElement('div');
    item.classList.add('apod');
    item.appendChild(titleElement);

    if (obj.type === 'video') {
      const videoElement = document.createElement('iframe');
      videoElement.src = obj.mediaUrl;
      videoElement.width = '420';
      videoElement.height = '315';

      item.appendChild(videoElement);
    } else {
      const imgElement = document.createElement('img');
      imgElement.src = obj.mediaUrl;
      imgElement.classList.add('apod__image');
      item.appendChild(imgElement);
    }
    main.appendChild(item);
  });
}
