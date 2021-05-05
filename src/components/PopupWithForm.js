import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submit) {
    super(popupSelector);
    this._submit = submit;
    this._formElement = this._popup.querySelector('.form');

    this._formSaveButton = this._formElement.querySelector('.form__save-button');
    this._defaultSaveButtonText = this._formSaveButton.textContent;
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
    this._formElement.addEventListener('submit', () => {
      this._submit(this._getInputValues());
    });
  }

  close() {
    this._formElement.reset();
    super.close();
  }

  waitSaveButton(waitingText) {
    this._formSaveButton.textContent = waitingText;
  }

  resetWaitSaveButton() {
    this._formSaveButton.textContent = this._defaultSaveButtonText;
  }
}