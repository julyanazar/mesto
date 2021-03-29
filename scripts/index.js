const popupsAll = document.querySelectorAll('.popup');

const popupProfileInfo = document.querySelector('.popup_profile_info');

const popupCardAdd = document.querySelector('.popup_card_add');

const popupZoomImg = document.querySelector('.popup_zoom_img');
const popupZoomTitle = popupZoomImg.querySelector('.popup__title');
const popupZoomPicture = popupZoomImg.querySelector('.popup__img');

const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const formInputName = document.querySelector('.form__input-name');
const formInputAbout = document.querySelector('.form__input-about');

const formEditElement = document.querySelector('.form_edit');
const saveButtonFormEdit = formEditElement.querySelector('.form__save-button');

const formAddElement = document.querySelector('.form_add');
const saveButtonFormAdd = formAddElement.querySelector('.form__save-button');

const inputCardName = formAddElement.querySelector('.form__input-card-name');
const inputImg = formAddElement.querySelector('.form__input-src');

const cardsContainer = document.querySelector('.elements__items');
const templateElement = document.querySelector('.template');

const elementImg = document.querySelector('.element__img');

const inactiveButtonSaveClass = 'form__save-button_invalid';

function openPopupEdit() {
    formInputName.value = profileTitle.textContent;
    formInputAbout.value = profileSubtitle.textContent;
    removeFormErrorContainers(formEditElement);// Убрать контейнеры для ошибок из формы перед открытия попапа
    activeFormButton(saveButtonFormEdit, inactiveButtonSaveClass);//Кнопка активна при открытии попапа редактирования профиля с заполненными полями
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

// Кнопка активна при открытии попапа 
function validFormButton(form) {
    const saveButtonForm = form.querySelector('.form__save-button');
    saveButtonForm.classList.remove('form__save-button_invalid');
    saveButtonForm.removeAttribute('disabled');
}

// Кнопка не активна при открытии попапа 
function invalidFormButton(form) {
    const saveButtonForm = form.querySelector('.form__save-button');
    saveButtonForm.classList.add('form__save-button_invalid');
    saveButtonForm.setAttribute('disabled', true);
}

function showPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEscPress);
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

function createCardDomNode(item) {
    //рекурсивно клонируем содержимое тега template
    const newItem = templateElement.content.cloneNode(true);
    //записываем в название карточки name из массива initialCards
    const elementTitle = newItem.querySelector('.element__title');
    elementTitle.textContent = item.name;
    //добавляем в src link из массива initialCards
    const elementImg = newItem.querySelector('.element__img');
    elementImg.src = item.link;
    //добавляем в alt название карточки name из массива initialCards
    elementImg.alt = item.name;

    //добавляем слушатели карточке
    const deleteButton = newItem.querySelector('.element__trash-button');
    deleteButton.addEventListener('click', deleteCardHandler);

    const likeButton = newItem.querySelector('.element__like-button');
    likeButton.addEventListener('click', likeCardHandler);

    elementImg.addEventListener('click', () => {
        showPopupImg(item);
    });

    return newItem;
}

function renderCards(cards, container) {
    const result = cards.map(function (item) {
        const newCard = createCardDomNode(item);
        return newCard;
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
    const newCard = createCardDomNode({ name: inputCardNameValue, link: inputImgValue });
    //вставляем карточку в начало
    cardsContainer.prepend(newCard);
    //обнуляем поля после ввода значений
    formAddElement.reset();
    closePopup(popupCardAdd);
}

function deleteCardHandler(evt) {
    const target = evt.target;
    const currentCard = target.closest('.element');

    currentCard.remove();
}

function likeCardHandler(evt) {
    evt.target.classList.toggle('element__like-button_active');
}

function showPopupImg(item) {
    popupZoomTitle.textContent = item.name;
    popupZoomPicture.src = item.link;
    popupZoomPicture.alt = item.name;

    showPopup(popupZoomImg);
}

editButton.addEventListener('click', openPopupEdit);
addCardButton.addEventListener('click', () => {
    inactiveFormButton(saveButtonFormAdd, inactiveButtonSaveClass);
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