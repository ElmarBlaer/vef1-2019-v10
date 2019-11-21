import { randomNumber } from './helpers';
/**
 * Sækir Myndir frá nasa API. Til þess að sjá dæmi um json svari sjá apod.json
 */

// API lykill til að fá aðgang að nasa gögnum.
// const API_KEY = 'DEMO_KEY';
// Slóð að sækja myndir frá. Dæmi um heila slóð https://api.nasa.gov/planetary/apod?api_key=Wc2LzStTRz6RNrNYQzjhVQnMgUz5rEy2zyJcxh4J
const URL = 'https://api.nasa.gov/planetary/apod?api_key=Wc2LzStTRz6RNrNYQzjhVQnMgUz5rEy2zyJcxh4J&date=';


/**
 * Sækir mynd af handahófi frá APOD API hjá nasa
 *
 * @returns {Promise} sem mun innihalda upplýsingar um mynd/myndband hjá nasa.
 */
function getDate() {
  const fDate = new Date('June 16, 1995 00:00:00');
  const lowerTime = fDate.getTime();
  const currentTime = Date.now();
  const time = randomNumber(lowerTime, currentTime);
  const date = new Date(time);
  const dd = date.getDate();
  const mm = date.getMonth();
  const yyyy = date.getFullYear();

  return `${yyyy}-${mm + 1}-${dd}`;
}

export default async function getRandomImage() {
  const randomDate = getDate();
  const searchString = URL + randomDate;

  const res = await fetch(searchString);
  const {
    media_type: type, url: mediaUrl, explanation: text, title,
  } = await res.json();

  return {
    type, mediaUrl, text, title,
  };
}
