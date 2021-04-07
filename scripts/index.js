function openPopupEdit() {
    formInputName.value = profileTitle.textContent;
    formInputAbout.value = profileSubtitle.textContent;
    removeFormErrorContainers(formEditElement);// Убрать контейнеры для ошибок из формы перед открытия попапа
    //activeFormButton(saveButtonFormEdit, inactiveButtonSaveClass);//Кнопка активна при открытии попапа редактирования профиля с заполненными полями
    showPopup(popupProfileInfo);
}

function handleProfileSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = formInputName.value;
    profileSubtitle.textContent = formInputAbout.value;
    closePopup(popupProfileInfo);
}

// Убрать контейнеры для ошибок из формы
function removeFormErrorContainers(formEditElement) { //передаем на вход ссылку на нужную форму
    const inputsForm = formEditElement.querySelectorAll('.form__input'); //находим класс полей формы

    //находим контейнеры ошибок для каждого поля и скрываем
    inputsForm.forEach(
        item => {//для каждого поля формы(инпута)
            const errorContainers = formEditElement.querySelector(`#${item.id}-error`);//находим контейнер ощибки по id через поле
            errorContainers.classList.remove('form__error_visible');//скрываем ошибку
            item.classList.remove('form__input_type_error');//скрываеем красную линию
        });
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEscPress);
}

const closePopupEscPress = (evt) => {
    const openedPopup = document.querySelector('.popup_opened');
    if (evt.key === 'Escape') {
        closePopup(openedPopup);
    }
};

function renderCards(cards, container) {
    const result = cards.map(function (item) {
        const newCard = new Card(item.name, item.link, '#element');
        return newCard.createCardDomNode();
    });
    container.append(...result);
}

function addCardFormListener(evt) {
    evt.preventDefault();
    //получаем значение написанное в инпут названия карточки
    const inputCardNameValue = inputCardName.value;
    //получаем значение написанное в инпут ссылки на картинку
    const inputImgValue = inputImg.value;
    //создаем новую карточку с полученными выше значениями 
    const newCard = new Card(inputCardNameValue, inputImgValue, '#element');
    //вставляем карточку в начало
    cardsContainer.prepend(newCard.createCardDomNode());
    //обнуляем поля после ввода значений
    formAddElement.reset();
    closePopup(popupCardAdd);
}

editButton.addEventListener('click', openPopupEdit);
addCardButton.addEventListener('click', () => {
    //inactiveFormButton(saveButtonFormAdd, inactiveButtonSaveClass);
    showPopup(popupCardAdd);
});
formEditElement.addEventListener('submit', handleProfileSubmit);
formAddElement.addEventListener('submit', addCardFormListener);
popupsAll.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
            closePopup(popup)
        }
    });
});
renderCards(initialCards, cardsContainer);

const formList = Array.from(document.querySelectorAll(configValidation.formSelector));
formList.forEach(
    formElement => {
        formElement.addEventListener('submit', evt => {
            evt.preventDefault();
        });

        const formValidate = new FormValidator(configValidation, formElement);
        formValidate.enableValidation();
    });