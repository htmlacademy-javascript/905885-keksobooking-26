const adForm = document.querySelector('.ad-form');
const formFieldsets = adForm.querySelectorAll('fieldset');

const typeHousing = adForm.querySelector('#type');

const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');

const priceByType = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};

const roomsByGuests = {
  '1 комната': ['для 1 гостя'],
  '2 комнаты': ['для 2 гостей', 'для 1 гостя'],
  '3 комнаты': ['для 3 гостей', 'для 2 гостей', 'для 1 гостя'],
  '100 комнат': ['не для гостей']
};

const mapFiltersContainer = document.querySelector('.map__filters');
const mapFiltersSelects = mapFiltersContainer.querySelectorAll('select');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form--invalid',
  successClass: 'ad-form--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error-text',
});

function validateTitle (value) {
  return value.length >= 30 && value.length <= 100;
}

function validatePriceByType () {
  return priceByType[typeHousing.value];
}

function validatePrice (element) {
  return element.value >= validatePriceByType() && element.value <= 10000;
}

function validatePriceError () {
  return `Минимальное значение: ${validatePriceByType()}, Максимальное значение: 100000`;
}

function validateRooms () {
  return roomsByGuests[roomNumber.value].includes(capacity.value);
}

function validateRoomsError () {
  return `
  ${roomNumber.value}
  ${roomNumber.value === '100 комнат' ? 'не для гостей' : `не ${  capacity.value}`}
  `;
}

pristine.addValidator(
  adForm.querySelector('#title'),
  validateTitle,
  'От 30 до 100 символов'
);

pristine.addValidator(
  adForm.querySelector('#price'),
  validatePrice,
  validatePriceError
);

pristine.addValidator(
  adForm.querySelector('#room_number'),
  validateRooms,
  validateRoomsError
);

pristine.addValidator(
  adForm.querySelector('#capacity'),
  validateRooms,
  validateRoomsError
);

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

const deactivateForm = () => {
  adForm.classList.add('ad-form--disabled');
  mapFiltersContainer.classList.add('map__filters--disabled');

  mapFiltersSelects.forEach((mapFilterSelect) => {
    mapFilterSelect.disabled = true;
  });

  formFieldsets.forEach((formFieldset) => {
    formFieldset.disabled = true;
  });
};

const activateForm = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFiltersContainer.classList.remove('map__filters--disabled');

  mapFiltersSelects.forEach((mapFilterSelect) => {
    mapFilterSelect.disabled = false;
  });

  formFieldsets.forEach((formFieldset) => {
    formFieldset.disabled = false;
  });
};

export {deactivateForm, activateForm};
