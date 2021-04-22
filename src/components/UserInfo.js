export default class UserInfo {
    constructor({ nameSelector, aboutSelector }) {
        this._nameSelector = document.querySelector(nameSelector);
        this._aboutSelector = document.querySelector(aboutSelector);
    }

    getUserInfo() {
        const userData = {
            name: this._nameSelector.textContent,
            about: this._aboutSelector.textContent
        }

        return userData;
    }

    setUserInfo({ name, about }) {
        this._nameSelector.textContent = name;
        this._aboutSelector.textContent = about;
    }
}