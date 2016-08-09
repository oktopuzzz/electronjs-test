var urlResponseHandler = {};

;(function() {
  function checkStatus(response) {
    //console.log(response);
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      var errMessage = response.statusText; //"Неизвестная ошибка сервера";
      if (response.status == 404) {
        errMessage = "Ресурс не найден";
      }
      else if (response.status == 500) {
        errMessage = "Внутренняя ошибка сервера";
      }

      var error = new Error(errMessage);
      error.statusCode = response.status;
      error.response = response;
      error.nativeError = response.statusText;
      throw error;
    }
  }

  function parseJSON(response) {
    //console.log(response);

    return Promise.resolve()
      .then(function(res) { return response.json(); })
      .catch(function(err) {
        const error = new Error("Неверный формат данных,\nполученных от сервера");
        error.response = response;
        error.nativeError = err;
        throw error;
      });
  }

  urlResponseHandler.processResponse = function(response) {
    return Promise.resolve()
      .then(function(res) { return checkStatus(response); })
      .then(function(response) { return parseJSON(response); });
  }
})();


