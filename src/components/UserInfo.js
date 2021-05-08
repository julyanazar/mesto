export default class UserInfo {
    constructor({ nameSelector, aboutSelector, avatarSelector }) {
        this._name = document.querySelector(nameSelector);
        this._about = document.querySelector(aboutSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        const userData = {
            name: this._name.textContent,
            about: this._about.textContent
        }

        return userData;
    }

    setUserInfo(name, about) {
        this._name.textContent = name;
        this._about.textContent = about;
    }

    setAvatar(avatar) {
        this._avatar.src = avatar;
        this._avatar.alt = this._name.textContent;
      }
}