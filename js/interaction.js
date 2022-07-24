const getData = (onSuccess, onFail) => {
  fetch(
    'https://26.javascript.pages.academy/keksobooking/data',
    {
      method: 'GET',
    },
  )
    .then((response) => {
      if (!response.ok) {
        onFail('Ошибка загрузки данных');
      }

      return response;
    })
    .then((response) => response.json())
    .then((ads) => {
      if (onSuccess) {
        onSuccess(ads);
      }
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://26.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {getData, sendData};
