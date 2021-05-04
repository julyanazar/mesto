export default class Api {
    constructor(options) {
        this._options = options;
        this._url = this._options.url;
        this._headers = this._options.headers;
    }

    // Получить доступные карточки
    getInitialCards() {
        return fetch(`${this._url}/cards`, { headers: this._headers })
            .then(res => this._checkRequestResult(res))
            .catch(err => this._errorRequestResultr(err));
    }

    // Получить данные пользователя
    getUserInfo() {
        return fetch(`${this._url}/users/me`, { headers: this._headers })
            .then(res => this._checkRequestResult(res))
            .catch(err => this._errorRequestResultr(err));
    }

    // Редактировать данные пользователя
    editUserInfo(name, about) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(res => this._checkRequestResult(res))
            .catch(err => this._errorRequestResult(err));
    }

    // Редактировать аватар пользователя
    editUserAvatar(urlAvatar) {
        console.log(urlAvatar);
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: urlAvatar
            })
        })
            .then(res => this._checkRequestResult(res))
            .catch(err => this._errorRequestResult(err));
    }

    _checkRequestResult(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка! ${res.status}`);
    }

    _errorRequestResult(err) {
        console.log(err);
    }

}