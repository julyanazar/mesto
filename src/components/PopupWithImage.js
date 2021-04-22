import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = document.querySelector('.popup__img');
        this._imageTitle = popupSelector.querySelector('.popup__title');
    }

    open(name, link) {
        super.open()
        this._image.src = link;
        this._image.alt = name;
        this._imageTitle.textContent = name;
    }
}