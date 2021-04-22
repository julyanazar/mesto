export default class FormValidator {
    constructor(rest, formElement) {
        this.formSelector = rest.formSelector;
        this.inputSelector = rest.inputSelector;
        this.submitButtonSelector = rest.submitButtonSelector;
        this.inactiveButtonClass = rest.inactiveButtonClass;
        this.inputErrorClass = rest.inputErrorClass;
        this.errorClass = rest.errorClass;
        this.formElement = formElement;
    }

    enableValidation = () => {
        this._setEventListeners();
    }

    _setEventListeners = () => {
        this.inputList = Array.from(this.formElement
            .querySelectorAll(this.inputSelector));

        this.buttonElement = this.formElement
            .querySelector(this.submitButtonSelector);

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
        this.errorElement = this.formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this.inputErrorClass);
        this.errorElement.classList.remove(this.errorClass);
    }

    _showInputError = (inputElement) => {
        this.errorElement = this.formElement
            .querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this.inputErrorClass);
        this.errorElement.textContent = inputElement.validationMessage;
        this.errorElement.classList.add(this.errorClass);
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
            .add(this.inactiveButtonClass);
        this.buttonElement
            .setAttribute('disabled', true);
    }

    activeFormButton = () => {
        this.buttonElement.classList
            .remove(this.inactiveButtonClass);
        this.buttonElement
            .removeAttribute('disabled');
    }
}