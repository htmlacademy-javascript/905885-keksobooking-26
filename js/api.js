const FetchMethod = {
  GET: 'GET',
  POST: 'POST'
};

const FetchLink = {
  GET: 'https://26.javascript.pages.academy/keksobooking/data',
  POST: 'https://26.javascript.pages.academy/keksobooking'
};

const FetchError = {
  GET: 'Ошибка загрузки данных',
  POST: 'Не удалось отправить форму. Попробуйте ещё раз'
};

const getAds = (onSuccess, onFail) => {
  fetch(
    FetchLink.GET,
    {
      method: FetchMethod.GET,
    },
  )
    .then((response) => {
      if (!response.ok) {
        return onFail(FetchError.GET);
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

const sendAd = (onSuccess, onFail, body) => {
  fetch(
    FetchLink.POST,
    {
      method: FetchMethod.POST,
      body,
    },
  )
    .then((response) => {
      if (!response.ok) {
        return onFail(FetchError.POST);
      }
      return onSuccess();
    })
    .catch(() => {
      onFail(FetchError.POST);
    });
};

export {getAds, sendAd};
