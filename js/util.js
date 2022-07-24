const ALERT_SHOW_TIME = 5000;

function getRandomInteger (min, max) {
  const minNumber = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const maxNumber = Math.floor(Math.max(Math.abs(min), Math.abs(max)));

  const randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;

  return randomNumber;
}

function getRandomFloat (min, max, amount) {
  const minNumber = Math.min(Math.abs(min), Math.abs(max));
  const maxNumber = Math.max(Math.abs(min), Math.abs(max));
  const randomNumber = Math.random() * (maxNumber - minNumber) + minNumber;

  return +randomNumber.toFixed(amount);
}

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const generateArrayList = (elements) => {
  const arrayLength = getRandomInteger(0, elements.length);
  const tempElements = [];

  for (let i = 0; i < arrayLength; i++) {
    const arrayElement = getRandomArrayElement(elements);

    if (!tempElements.includes(arrayElement)) {
      tempElements.push(arrayElement);
    }
  }

  return tempElements;
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.margin = '0 auto';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {getRandomInteger, getRandomFloat, getRandomArrayElement, generateArrayList, showAlert};
