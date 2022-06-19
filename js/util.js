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
  const temporaryArray = [];

  for (let i = 0; i < arrayLength; i++) {
    const arrayElement = getRandomArrayElement(elements);

    if (!temporaryArray.includes(arrayElement)) {
      temporaryArray.push(arrayElement);
    }
  }

  return temporaryArray;
};

export {getRandomInteger, getRandomFloat, getRandomArrayElement, generateArrayList};
