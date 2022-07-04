import {getRandomInteger, getRandomFloat, getRandomArrayElement, generateArrayList} from './util.js';

const AVATARS = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png',
  'img/avatars/user09.png',
  'img/avatars/user10.png'
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const CHECKINS = [
  '12:00',
  '13:00',
  '14:00'
];

const CHECKOUTS = [
  '12:00',
  '13:00',
  '14:00'
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const generateLocation = () => {
  const latitide = getRandomFloat(35.65000, 35.70000, 5);
  const longtude = getRandomFloat(139.70000, 139.80000, 5);

  return {
    lat: latitide,
    lng: longtude
  };
};

const generateAd = () => ({
  author: getRandomArrayElement(AVATARS),
  title: 'Объявление!',
  address: (generateLocation()),
  price: getRandomInteger(10000, 100000),
  type: getRandomArrayElement(TYPES),
  rooms: getRandomInteger(1, 10),
  guests: getRandomInteger(1, 10),
  checkin: getRandomArrayElement(CHECKINS),
  checkout: getRandomArrayElement(CHECKOUTS),
  features: generateArrayList(FEATURES),
  description: 'Прекрасное место для вас и ваших гостей!',
  photos: generateArrayList(PHOTOS)
});

export {generateAd};
