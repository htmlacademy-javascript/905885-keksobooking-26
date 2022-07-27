import {activateForm, deactivateForm, setFilterChange} from './form.js';
import {generateCard} from './card.js';
import {getFilteredAds} from './filter.js';
import {getAds} from './api.js';
import {showAlert, debounce} from './util.js';

const RERENDER_DELAY = 500;

const InitialCoord = {
  LAT: 35.6938401,
  LNG: 139.7035494
};

const PinSize = {
  WIDTH: 40,
  HEIGHT: 40,
  WIDTH_MAIN: 52,
  HEIGHT_MAIN: 52
};

const PinAnchorPos = {
  VERT: 20,
  HOR: 40,
  VERT_MAIN: 26,
  HOR_MAIN: 52
};

const MapAtribute = {
  PROVIDER: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  ATRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
};

const mapScale = 10;

const CARDS_COUNT = 10;

const address = document.querySelector('#address');

deactivateForm();

const map = L.map('map-canvas');

const pinIcon = L.icon ({
  iconUrl: './img/pin.svg',
  iconSize: [PinSize.WIDTH, PinSize.HEIGHT],
  iconAnchor: [PinAnchorPos.VERT, PinAnchorPos.HOR],
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
    .slice()
    .filter(getFilteredAds)
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
    lat: InitialCoord.LAT,
    lng: InitialCoord.LNG
  }, mapScale);

L.tileLayer(
  MapAtribute.PROVIDER,
  {
    attribution: MapAtribute.ATRIBUTION,
  },
).addTo(map);

const mainPinIcon = L.icon ({
  iconUrl: './img/main-pin.svg',
  iconSize: [PinSize.WIDTH_MAIN, PinSize.HEIGHT_MAIN],
  iconAnchor: [PinAnchorPos.VERT_MAIN, PinAnchorPos.HOR_MAIN],
});

const mainPinMarker = L.marker(
  {
    lat: InitialCoord.LAT,
    lng: InitialCoord.LNG
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

export {map, markerGroup, mainPinMarker, InitialCoord, onAdsFetch};
