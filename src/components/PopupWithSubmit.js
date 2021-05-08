import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
    constructor(popupSelector, submitFormHandler) {
        super(popupSelector);
        this._submitFormHandler = submitFormHandler;

        this._formElement = this._popup.querySelector('.form');
    }

    setEventListeners() {
        this._formElement.addEventListener('submit', (evt) => {
            this._submitFormHandler(evt, this._card);
        });
        super.setEventListeners();
    }

    open(card) {
        this._card = card;
        super.open();
    }
}