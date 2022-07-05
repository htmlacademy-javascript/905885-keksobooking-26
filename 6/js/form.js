const adForm = document.querySelector('.ad-form');
const formFieldsets = adForm.querySelectorAll('fieldset');

const mapFilters = document.querySelector('.map__filters');
const mapFiltersSelects = mapFilters.querySelectorAll('select');

const inactiveState = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');

  mapFiltersSelects.forEach((mapFilterSelect) => {
    mapFilterSelect.setAttribute('disabled', 'disabled');
  });

  formFieldsets.forEach((formFieldset) => {
    formFieldset.setAttribute('disabled', 'disabled');
  });
};

const activeState = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');

  mapFiltersSelects.forEach((mapFilterSelect) => {
    mapFilterSelect.removeAttribute('disabled');
  });

  formFieldsets.forEach((formFieldset) => {
    formFieldset.removeAttribute('disabled');
  });
};

export {inactiveState, activeState};
