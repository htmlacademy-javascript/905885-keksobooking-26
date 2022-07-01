import {generateAds} from './ads.js';

const cardAd = document.querySelector('#card').content.querySelector('.popup');
const insertionArea = document.querySelector('.map__canvas');

const anotherAds = generateAds();

anotherAds.forEach((ad) => {
  const newAd = cardAd.cloneNode(true);

  const adList = newAd.querySelector('.popup__features');
  const featureList = adList.querySelectorAll('.popup__feature');
  const featureModifiers = ad.features.map((feature) => `popup__feature${  feature}`);

  const adPhotos = newAd.querySelector('.popup__photos');
  const photosList = adPhotos.querySelectorAll('.popup__photo');

  for (let i = 0; i < ad.photos.length - 1; i++) {
    photosList.cloneNode(true);
    featureList.appendChild(photosList);
  }

  for (let i = 0; i < ad.photos.length; i++) {
    photosList[i].src = ad.photos[i];
  }

  featureList.forEach((featureListItem) => {
    const featureModifier = featureListItem.classList[1];

    if (!featureModifiers.includes(featureModifier)) {
      featureListItem.remove();
    }
  });

  switch(ad.type) {
    case 'flat':
      ad.type = 'Квартира';
      break;
    case 'bungalow':
      ad.type = 'Бунгало';
      break;
    case 'house':
      ad.type = 'Дом';
      break;
    case 'palace':
      ad.type = 'Дворец';
      break;
    case 'hotel':
      ad.type = 'Отель';
      break;
  }

  newAd.querySelector('.popup__type').textContent = ad.type;
  newAd.querySelector('.popup__avatar').src = ad.author;
  newAd.querySelector('.popup__title').textContent = ad.title;
  newAd.querySelector('.popup__text--address').textContent = ad.address;
  newAd.querySelector('.popup__text--price').textContent = `${ad.price  } ₽/ночь`;
  newAd.querySelector('.popup__text--capacity').textContent = `${ad.rooms  } комнаты для ${  ad.guests  } гостей`;
  newAd.querySelector('.popup__text--time').textContent = `Заезд после ${  ad.checkin  }, выезд до ${  ad.checkout}`;
  newAd.querySelector('.popup__description').textContent = ad.description;

  insertionArea.appendChild(newAd);
});

export {anotherAds};
