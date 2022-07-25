const FetchMethods = {
  GET: 'GET',
  POST: 'POST'
};

const FetchLinks = {
  GET: 'https://26.javascript.pages.academy/keksobooking/data',
  POST: 'https://26.javascript.pages.academy/keksobooking'
};

const FetchErrors = {
  GET_ERROR: 'Ошибка загрузки данных',
  POST_ERROR: 'Не удалось отправить форму. Попробуйте ещё раз'
};

const getAds = (onSuccess, onFail) => {
  fetch(
    FetchLinks.GET,
    {
      method: FetchMethods.GET,
    },
  )
    .then((response) => {
      if (!response.ok) {
        onFail(FetchErrors.GET_ERROR);
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
    FetchLinks.POST,
    {
      method: FetchMethods.POST,
      body,
    },
  )
    .then((response) => {
      if (!response.ok) {
        return onFail(FetchErrors.POST_ERROR);
      }
      return onSuccess();
    })
    .catch(() => {
      onFail(FetchErrors.POST_ERROR);
    });
};

export {getAds, sendAd};
