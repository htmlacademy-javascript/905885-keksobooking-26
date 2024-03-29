const cardAd = document.querySelector('#card').content.querySelector('.popup');

const mapEnglishTypeToRussian = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const generateCard = (ad) => {
  const newAd = cardAd.cloneNode(true);

  const adsList = newAd.querySelector('.popup__features');
  const features = adsList.querySelectorAll('.popup__feature');

  if (ad.offer.features) {
    const featureModifiers = ad.offer.features.map((feature) => `popup__feature--${feature}`);

    features.forEach((featureListItem) => {
      const featureModifier = featureListItem.classList[1];

      if (!featureModifiers.includes(featureModifier)) {
        featureListItem.remove();
      }
    });
  } else {
    adsList.remove();
  }

  const adPhotos = newAd.querySelector('.popup__photos');
  const photos = adPhotos.querySelector('.popup__photo');

  const newPhoto = photos.cloneNode(true);
  adPhotos.innerHTML = '';

  if (ad.offer.photos) {
    for (let i = 0; i < ad.offer.photos.length; i++) {
      const newPhotoContainer = newPhoto.cloneNode(true);
      newPhotoContainer.src = ad.offer.photos[i];
      adPhotos.appendChild(newPhotoContainer);
    }
  }

  newAd.querySelector('.popup__type').textContent = mapEnglishTypeToRussian[ad.offer.type];
  newAd.querySelector('.popup__avatar').src = ad.author.avatar;
  newAd.querySelector('.popup__title').textContent = ad.offer.title;
  newAd.querySelector('.popup__text--address').textContent = `${ad.location.lat}, ${ad.location.lng}`;
  newAd.querySelector('.popup__text--price').textContent = `${ad.offer.price} ₽/ночь`;
  newAd.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
  newAd.querySelector('.popup__text--time').textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;

  if (ad.offer.description) {
    newAd.querySelector('.popup__description').textContent = ad.offer.description;
  } else {
    newAd.querySelector('.popup__description').remove();
  }

  return newAd;
};

export {generateCard};
