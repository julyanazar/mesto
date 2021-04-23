import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submit) {
    super(popupSelector);
    this._submit = submit;
    this._formElement = this._popup.querySelector('.form');
  }

  _getInputValues() {
    this._inputValues = {};

    this._formElement
      .querySelectorAll('.form__input')
      .forEach((input) => {
        this._inputValues[input.name] = input.value;
      });
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      this._submit(this._getInputValues());
    });
  }

  close() {
    this._formElement.reset();
    super.close();
  }
}