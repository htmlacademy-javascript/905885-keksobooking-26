import {generateAds} from './ads.js';

const cardAd = document.querySelector('#card').content.querySelector('.popup');
const adsContainer = generateAds(10);

const generateCards = (ad) => {

  const newAd = cardAd.cloneNode(true);

  const adsList = newAd.querySelector('.popup__features');
  const features = adsList.querySelectorAll('.popup__feature');
  const featureModifiers = ad.features.map((feature) => `popup__feature--${feature}`);

  const adPhotos = newAd.querySelector('.popup__photos');
  const photos = adPhotos.querySelector('.popup__photo');

  const newPhoto = photos.cloneNode(true);
  adPhotos.innerHTML = '';

  for (let i = 0; i < ad.photos.length; i++) {
    const newPhotoContainer = newPhoto.cloneNode(true);
    newPhotoContainer.src = ad.photos[i];
    adPhotos.appendChild(newPhotoContainer);
  }

  features.forEach((featureListItem) => {
    const featureModifier = featureListItem.classList[1];

    if (!featureModifiers.includes(featureModifier)) {
      featureListItem.remove();
    }
  });

  const mapEnglishTypeToRussian = {
    flat: 'Квартира',
    bungalow: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
    hotel: 'Отель'
  };

  newAd.querySelector('.popup__type').textContent = mapEnglishTypeToRussian[ad.type];
  newAd.querySelector('.popup__avatar').src = ad.author;
  newAd.querySelector('.popup__title').textContent = ad.title;
  newAd.querySelector('.popup__text--address').textContent = `${ad.address.lat}, ${ad.address.lng}`;
  newAd.querySelector('.popup__text--price').textContent = `${ad.price} ₽/ночь`;
  newAd.querySelector('.popup__text--capacity').textContent = `${ad.rooms} комнаты для ${ad.guests} гостей`;
  newAd.querySelector('.popup__text--time').textContent = `Заезд после ${ad.checkin}, выезд до ${ad.checkout}`;
  newAd.querySelector('.popup__description').textContent = ad.description;

  return newAd;

};

export {adsContainer, generateCards};
