import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submit) {
    super(popupSelector);
    this._submit = submit;
    this._formElement = popupSelector.querySelector('.form');
  }

  _getInputValues() {
    this._inputValuesList = {};

    this._formElement
      .querySelectorAll('.form__input')
      .forEach(input => {
        this._inputValuesList[input.name] = input.value;
      });

  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      this._submit(evt)
    });
  }

  close() {
    this._formElement.reset();
    super.close();
  }
}