/* все поля пустые */
const allInputsEmpty = (inputList) => {
  // Если true - все поля пустые
  return !inputList.some(inputElement => inputElement.value.length > 0);
}

/* хотя бы один инпут невалидный */
const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => !inputElement.validity.valid);
};

// Переключить состояние кнопки
const toggleButtonState = (inputList, buttonElement, {inactiveButtonClass}) => {
  if (/* хотя бы один инпут невалидный */ hasInvalidInput(inputList) || allInputsEmpty(inputList) /* все поля пустые */) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    validFormButton(formEditElement);// Кнопка активна при открытии попапа редактирования профиля с заполненными полями(функция в index.js)
    buttonElement.removeAttribute('disabled');
  }
};

// Подкрасить поле красным и Вывести ошибку
const showInputError = (formElement, inputElement, {errorClass, inputErrorClass}) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(errorClass);
};

// Убрать подкрашивание поля красным и Убрать ошибку
const hideInputError = (formElement, inputElement, {errorClass, inputErrorClass}) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
};

// Проверить валидность поля
const checkInput = (formElement, inputElement, rest) => {
  if (inputElement.validity.valid) {
    // Убрать подкрашивание поля красным
    // Убрать ошибку
    hideInputError(formElement, inputElement, rest);
  } else {
    // Подкрасить поле красным
    // Вывести ошибку
    showInputError(formElement, inputElement, rest);
  }
};

// Навешивание слушателей событий для полей формы
const setEventListeners = (formElement, {inputSelector, submitButtonSelector, ...rest}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  inputList.forEach(
    inputElement => {
      inputElement.addEventListener('input', () => {
        // Проверить валидность поля
        checkInput(formElement, inputElement, rest);
        // Переключить состояние кнопки
        toggleButtonState(inputList, buttonElement, rest);
      });
      // Дополнительно принудительно вызываем эту функцию(чтобы при загрузке страницы кнопка была неактивна)
      toggleButtonState(inputList, buttonElement, rest);
    }
  )
};

const enableValidation = ({formSelector, ...rest}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach(
    formElement => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      // Навешивание слушателей событий для полей формы
      setEventListeners(formElement, rest);
    }
  );
};

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_invalid',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
});