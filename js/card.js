import {generateAd} from './ads.js';

const cardAd = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('.map__canvas');

const generateAds = (count) => Array.from({length: count}, generateAd);

const anotherAds = generateAds(1);

const generateCards = () => {

  anotherAds.forEach((ad) => {
    const newAd = cardAd.cloneNode(true);

    const adsList = newAd.querySelector('.popup__features');
    const features = adsList.querySelectorAll('.popup__feature');
    const featureModifiers = ad.features.map((feature) => `popup__feature--${feature}`);

    const adPhotos = newAd.querySelector('.popup__photos');
    const photos = adPhotos.querySelector('.popup__photo');

    const newPhoto = photos.cloneNode(true);
    adPhotos.innerHTML = '';

    for (let i = 0; i < ad.photos.length; i++) {
      const duplicateNewPhoto = newPhoto.cloneNode(true);
      duplicateNewPhoto.src = ad.photos[i];
      adPhotos.appendChild(duplicateNewPhoto);
    }

    features.forEach((featureListItem) => {
      const featureModifier = featureListItem.classList[1];

      if (!featureModifiers.includes(featureModifier)) {
        featureListItem.remove();
      }
    });

    let housingType = '';

    switch(ad.type) {
      case 'flat':
        housingType = 'Квартира';
        break;
      case 'bungalow':
        housingType = 'Бунгало';
        break;
      case 'house':
        housingType = 'Дом';
        break;
      case 'palace':
        housingType = 'Дворец';
        break;
      case 'hotel':
        housingType = 'Отель';
        break;
    }

    newAd.querySelector('.popup__type').textContent = housingType;
    newAd.querySelector('.popup__avatar').src = ad.author;
    newAd.querySelector('.popup__title').textContent = ad.title;
    newAd.querySelector('.popup__text--address').textContent = `${ad.address.lat}, ${ad.address.lng}`;
    newAd.querySelector('.popup__text--price').textContent = `${ad.price} ₽/ночь`;
    newAd.querySelector('.popup__text--capacity').textContent = `${ad.rooms} комнаты для ${ad.guests} гостей`;
    newAd.querySelector('.popup__text--time').textContent = `Заезд после ${ad.checkin}, выезд до ${ad.checkout}`;
    newAd.querySelector('.popup__description').textContent = ad.description;

    mapCanvas.appendChild(newAd);
  });
};

export {generateCards};
