/**
 * Sækir og vistar í localStorage
 */

// Fast sem skilgreinir heiti á lykli sem vistað er undir í localStorage
const LOCALSTORAGE_KEY = 'favourite_spacephotos';

/**
 * Sækir gögn úr localStorage. Skilað sem lista á forminu:
 * [{ type, mediaUrl, text, title },
 *  { type, mediaUrl, text, title },
 *  ...,
 *  { type, mediaUrl, text, title }]
 *
 * @returns {array} fylki af myndum eða tóma fylkið ef ekkert vistað.
 */
export function load() {
  const storedImages = localStorage.getItem(LOCALSTORAGE_KEY);
  return JSON.parse(storedImages);
}

/**
 * Vistaðar myndir með texta.
 *
 * @param {string} type annað hvort image eða video
 * @param {string} mediaUrl URL á myndinni/myndbandinu.
 * @param {string} text texti fyrir myndina/myndbandið.
 * @param {string} title titill fyrir myndina/myndbandið.
 */
export function save(type, mediaUrl, text, title) {
  let storedImages = load();
  if (!storedImages) {
    storedImages = [];
  }
  if (storedImages.filter((obj) => obj.mediaUrl === mediaUrl).length === 0) {
    storedImages.push({
      type,
      mediaUrl,
      text,
      title,
    });
    const json = JSON.stringify(storedImages);
    localStorage.setItem(LOCALSTORAGE_KEY, json);
  }
}


/**
 * Hreinsar allar myndir úr localStorage
 */
export function clear() {
  localStorage.removeItem(LOCALSTORAGE_KEY);
}
