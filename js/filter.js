const filterForm = document.querySelector('.map__filters');
const typeHousingSelect = filterForm.querySelector('#housing-type');
const housingPriceSelect = filterForm.querySelector('#housing-price');
const housingRoomsSelect = filterForm.querySelector('#housing-rooms');
const housingGuestsSelect = filterForm.querySelector('#housing-guests');
const featuresCheckbox = filterForm.querySelectorAll('.map__checkbox');

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
  low: (value) => {
    if (value <= HousingPrice.LOW) {
      return value;
    }
  },
  middle: (value) => {
    if (value >= HousingPrice.LOW && value <= HousingPrice.HIGH) {
      return value;
    }
  },
  high: (value) => {
    if (value >= HousingPrice.HIGH) {
      return value;
    }
  },
};

const setNewFilters = () => {
  filterState.type = typeHousingSelect.value;
  filterState.rooms = housingRoomsSelect.value;
  filterState.guests = housingGuestsSelect.value;
  filterState.price = housingPriceSelect.value;

  featuresCheckbox.forEach((feature) => {
    if (feature.checked) {
      filterState.features.push(feature);
    }
  });
};

const getFilteredAds = (ad) => {
  const filterContainer = [];

  if (filterState.type !== DEFAULT_SELECT_VALUE) {
    filterContainer.push(filterState.type === ad.offer.type);
  }

  if (filterState.rooms !== DEFAULT_SELECT_VALUE) {
    filterContainer.push(filterState.rooms === ad.offer.rooms);
  }

  if (filterState.guests !== DEFAULT_SELECT_VALUE) {
    filterContainer.push(filterState.guests === ad.offer.guests);
  }

  if (filterState.price !== DEFAULT_SELECT_VALUE) {
    filterContainer.push(checkPrice[filterState.price](ad.offer.price));
  }

  if (filterState.features !== DEFAULT_SELECT_VALUE) {
    filterContainer.push(ad.offer.features);
  }

  return filterContainer.every((value) => value);
};

export {setNewFilters, getFilteredAds};
