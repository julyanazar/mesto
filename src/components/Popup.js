import { popupsAll } from '../utils/constants.js'

export default class Popup {
    constructor(popupSelector) {
        this._popup = popupSelector;
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose.bind(this));
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    setEventListeners() {
        popupsAll.forEach((popup) => {
            popup.addEventListener('click', (evt) => {
                if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
                    this.close();
                }
            });
        });
    }
}