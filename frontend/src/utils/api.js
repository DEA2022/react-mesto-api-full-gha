class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getUserInfo(token) {
    return fetch(this._baseUrl + '/users/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(this._getResponseData);
  };

  getInitialCards(token) {
    return fetch(this._baseUrl + '/cards', {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(this._getResponseData);
  };

  setUserInfo(data, token) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        about: data.job,
      })
    })
      .then(this._getResponseData);
  }

  createNewCard(data, token) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.place,
        link: data.url,
      })
    })
      .then(this._getResponseData);
  };


  deleteCard(cardId, token) {
    return fetch(this._baseUrl + '/cards/' + cardId, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(this._getResponseData);
  };

  addLike(cardId, token) {
    return fetch(this._baseUrl + '/cards/' + cardId + '/likes', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(this._getResponseData);
  }

  deleteLike(cardId, token) {
    return fetch(this._baseUrl + '/cards/' + cardId + '/likes', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(this._getResponseData);
  }

  updateUserAvatar(data, token) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: data.src
      })
    })
      .then(this._getResponseData);
  }

}

export const api = new Api({
  baseUrl: 'api.danilova48.nomoredomainsicu.ru',
})







