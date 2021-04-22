import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import { initialCards } from '../utils/initial-сards.js';

import {
    popupProfileInfo,
    popupCardAdd,
    editButton,
    addCardButton,
    formInputName,
    formInputAbout,
    formEditElement,
    formAddElement,
    inputCardName,
    inputImg,
    cardsContainer,
    configValidation,
    cardListSelector,
    popupZoomImg,
    profileSelectors
} from '../utils/constants.js';

const cardsList = new Section({
    items: initialCards,
    renderer: (cardItem) => {
        const card = new Card(cardItem.name, cardItem.link, '#element', {
            handleCardClick: (name, link) => {
                imagePopup.open(name, link);
            }
        });
        const cardElement = card.createCardDomNode();
        cardsList.setItem(cardElement);
    }
},
    cardListSelector);
cardsList.renderItems()

const userInfo = new UserInfo(profileSelectors);
function openPopupEdit() {
    const currentInfo = userInfo.getUserInfo();
    formInputName.value = currentInfo.name;
    formInputAbout.value = currentInfo.about;
    popupEditProfile.open();
    removeFormErrorContainers(formEditElement);// Убрать контейнеры для ошибок из формы перед открытия попапа
    formValidateEdit.activeFormButton();//Кнопка активна при открытии попапа редактирования профиля с заполненными полями
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

const formEditSubmitHandler = (evt) => {
    evt.preventDefault();

    const info = {
        name: formInputName.value,
        about: formInputAbout.value
    }

    userInfo.setUserInfo(info);
    popupEditProfile.close();
}

const popupEditProfile = new PopupWithForm(popupProfileInfo, formEditSubmitHandler)
popupEditProfile.setEventListeners();

const formAddSubmitHandler = (event) => {
    event.preventDefault();

    const inputCardNameValue = inputCardName.value;
    const inputImgValue = inputImg.value;
    cardsContainer.prepend(new Card(inputCardNameValue, inputImgValue, '#element', {
        handleCardClick: (name, link) => {
            imagePopup.open(name, link);
        }
    }).createCardDomNode());
    popupAddCard.close();
}

const popupAddCard = new PopupWithForm(popupCardAdd, formAddSubmitHandler)
popupAddCard.setEventListeners();

const imagePopup = new PopupWithImage(popupZoomImg)
imagePopup.setEventListeners()

editButton.addEventListener('click', openPopupEdit);

addCardButton.addEventListener('click', () => {
    formValidateAdd.inactiveFormButton();
    popupAddCard.open();
});

const formList = Array.from(document.querySelectorAll(configValidation.formSelector));
formList.forEach(
    formElement => {
        formElement.addEventListener('submit', evt => {
            evt.preventDefault();
        });
    });

const formValidateEdit = new FormValidator(configValidation, formEditElement);
const formValidateAdd = new FormValidator(configValidation, formAddElement);

formValidateEdit.enableValidation();
formValidateAdd.enableValidation();