const filterForm = document.querySelector('.map__filters');
const typeHousingSelect = filterForm.querySelector('#housing-type');
const housingPriceSelect = filterForm.querySelector('#housing-price');
const housingRoomsSelect = filterForm.querySelector('#housing-rooms');
const housingGuestsSelect = filterForm.querySelector('#housing-guests');
const featuresCheckboxs = filterForm.querySelectorAll('.map__checkbox');

const DEFAULT_SELECT_VALUE = 'any';

const HousingPrice = {
  LOW: 10000,
  HIGH: 50000
};

const filterState = {
  type: DEFAULT_SELECT_VALUE,
  price: DEFAULT_SELECT_VALUE,
  rooms: DEFAULT_SELECT_VALUE,
  guests: DEFAULT_SELECT_VALUE,
  features: []
};

const checkPrice = {
  low: (value) => value < HousingPrice.LOW,
  middle: (value) => value >= HousingPrice.LOW && value <= HousingPrice.HIGH,
  high: (value) => value > HousingPrice.HIGH
};

const setNewFilters = () => {
  filterState.type = typeHousingSelect.value;
  filterState.rooms = housingRoomsSelect.value;
  filterState.guests = housingGuestsSelect.value;
  filterState.price = housingPriceSelect.value;

  featuresCheckboxs.forEach((feature) => {
    const isChecked = feature.checked;

    if (isChecked) {
      filterState.features.push(feature.value);
    }
  });
};

const getFilteredAds = (ad) => {
  const filterContainer = [];

  if (ad.type !== filterState.type && filterState.type !== DEFAULT_SELECT_VALUE) {
    filterContainer.push(filterState.type === ad.offer.type);
  }

  if (filterState.rooms !== DEFAULT_SELECT_VALUE) {
    filterContainer.push(+filterState.rooms === ad.offer.rooms);
  }

  if (filterState.guests !== DEFAULT_SELECT_VALUE) {
    filterContainer.push(+filterState.guests === ad.offer.guests);
  }

  if (filterState.price !== DEFAULT_SELECT_VALUE) {
    filterContainer.push(checkPrice[filterState.price](ad.offer.price));
  }

  if (!ad.offer.features && filterState.features.length) {
    filterContainer.push(false);
  }

  if (filterState.features.length !== 0 && ad.offer.features) {
    const hasAllFeatures = filterState.features.every((feature) => ad.offer.features.includes(feature));
    filterContainer.push(hasAllFeatures);
  }

  return filterContainer.every((value) => value);
};

export {setNewFilters, getFilteredAds};
