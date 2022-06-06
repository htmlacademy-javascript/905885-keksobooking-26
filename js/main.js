function getRandomNumber (min, max) {
  let message = '';

  if (min, max < 0) {
    message = `Диапазон не может быть отрицательным, Возможно вы имели ввиду этот диапазон: (${  Math.abs(min)  },${  Math.abs(max)  }), тогда среднее значение: `;
  }

  if (min >= max) {
    return 'Неверно указан диапазон';
  }

  min = Math.ceil(Math.abs(min));
  max = Math.floor(Math.abs(max));

  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return (message + randomNumber);
}

function getRandomDotNumber (min, max, amount) {
  let message = '';

  if (min, max < 0) {
    message = `Диапазон не может быть отрицательным, Возможно вы имели ввиду этот диапазон: (${  Math.abs(min)  },${  Math.abs(max)  }), тогда число будет: `;
  }

  if (min >= max) {
    return 'Неверно указан диапазон';
  }

  min = Math.abs(min);
  max = Math.abs(max);
  let randomNumber = Math.random() * (max - min + 1) + min;

  if (randomNumber > max) {
    randomNumber = max;
  }

  const range = randomNumber.toFixed(amount);

  return (message + range);
}

getRandomNumber(-1, -5);

getRandomDotNumber(1, 5, 4);
