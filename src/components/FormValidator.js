export default class FormValidator {
    constructor(rest, formElement) {
        this._formSelector = rest.formSelector;
        this._inputSelector = rest.inputSelector;
        this._submitButtonSelector = rest.submitButtonSelector;
        this._inactiveButtonClass = rest.inactiveButtonClass;
        this._inputErrorClass = rest.inputErrorClass;
        this._textErrorSelector = rest.textErrorSelector;
        this._errorClass = rest.errorClass;
        this._formElement = formElement;
    }

    enableValidation = () => {
        this._setEventListeners();
    }

    _setEventListeners = () => {
        this.inputList = Array.from(this._formElement
            .querySelectorAll(this._inputSelector));

        this.buttonElement = this._formElement
            .querySelector(this._submitButtonSelector);

        this.inputList.forEach(
            inputElement => {
                inputElement.addEventListener('input', () => {
                    this._checkInput(inputElement);
                    this._toggleButtonState();
                });
                this._toggleButtonState();
            });
    }

    _checkInput = (inputElement) => {
        if (inputElement.validity.valid) {
            this._hideInputError(inputElement);
        } else {
            this._showInputError(inputElement);
        }
    }

    _hideInputError = (inputElement) => {
        this.errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        this.errorElement.classList.remove(this._errorClass);
    }

    _showInputError = (inputElement) => {
        this.errorElement = this._formElement
            .querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        this.errorElement.textContent = inputElement.validationMessage;
        this.errorElement.classList.add(this._errorClass);
    }

    _toggleButtonState = () => {
        if (this._hasInvalidInput() || this._allInputsEmpty()) {
            this.inactiveFormButton();
        } else {
            this.activeFormButton();
        }
    }

    _hasInvalidInput = () => {
        return this.inputList.some(inputElement =>
            !inputElement.validity.valid);
    }

    _allInputsEmpty = () => {
        return !this.inputList.some(inputElement =>
            inputElement.value.length > 0);
    }

    inactiveFormButton = () => {
        this.buttonElement.classList
            .add(this._inactiveButtonClass);
        this.buttonElement
            .setAttribute('disabled', true);
    }

    activeFormButton = () => {
        this.buttonElement.classList
            .remove(this._inactiveButtonClass);
        this.buttonElement
            .removeAttribute('disabled');
    }

    resetValidation = () => {
        const inputsForm = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        inputsForm.forEach(
            item => {
                const errorContainers = this._formElement.querySelector(`#${item.id}-error`);
                errorContainers.classList.remove(this._errorClass);
                item.classList.remove(this._inputErrorClass);
        });
    }

}