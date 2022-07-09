import {activateForm, deactivateForm} from './form.js';
import {adsContainer, generateCards} from './card.js';

const address = document.querySelector('#address');

deactivateForm();

const map = L.map('map-canvas')
  .on('load', () => {
    activateForm();
  })
  .setView({
    lat: 35.6938401,
    lng: 139.7035494
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

const pinIcon = L.icon ({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainPinMarker = L.marker(
  {
    lat: 35.6938401,
    lng: 139.7035494
  },
  {
    draggable: true,
    icon: mainPinIcon
  },
);

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (ad) => {
  const marker = L.marker({
    lat: ad.address.lat,
    lng: ad.address.lng
  },
  {
    pinIcon,
  }
  );

  marker
    .addTo(markerGroup)
    .bindPopup(generateCards(ad));
};

adsContainer.forEach((ad) => {
  createMarker(ad);
});

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  address.value = `${evt.target.getLatLng().lat}, ${evt.target.getLatLng().lng}`;
});
