import {activateForm, deactivateForm, setFilterChange} from './form.js';
import {compareCards, generateCard} from './card.js';
import {getAds} from './api.js';
import {showAlert} from './util.js';
import {debounce} from './util.js';

const RERENDER_DELAY = 500;

const TOKYO_CENTER_LAT = 35.6938401;
const TOKYO_CENTER_LNG = 139.7035494;
const CARDS_COUNT = 10;

const address = document.querySelector('#address');

deactivateForm();

const map = L.map('map-canvas');

const pinIcon = L.icon ({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (ad) => {
  const marker = L.marker({
    lat: ad.location.lat,
    lng: ad.location.lng
  },
  {
    pinIcon,
  }
  );

  marker
    .addTo(markerGroup)
    .bindPopup(generateCard(ad));
};

const onAdsFetch = (ads) => {
  ads
    // .slice()
    // .sort(compareCards)
    .slice(0, CARDS_COUNT)
    .forEach((ad) => createMarker(ad));
};

map
  .on('load', () => {
    activateForm();
    getAds((ads) => {
      onAdsFetch(ads);
      setFilterChange(debounce(
        () => onAdsFetch(ads),
        RERENDER_DELAY,
      ));
    },showAlert);
  })
  .setView({
    lat: TOKYO_CENTER_LAT,
    lng: TOKYO_CENTER_LNG
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon ({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: TOKYO_CENTER_LAT,
    lng: TOKYO_CENTER_LNG
  },
  {
    draggable: true,
    icon: mainPinIcon
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  address.value = `${evt.target.getLatLng().lat}, ${evt.target.getLatLng().lng}`;
});

export {map, markerGroup, mainPinMarker, TOKYO_CENTER_LAT, TOKYO_CENTER_LNG, onAdsFetch};
