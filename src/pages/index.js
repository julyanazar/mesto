import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import { initialCards } from '../utils/initial-сards.js';

import {
    editButton,
    addCardButton,
    formInputName,
    formInputAbout,
    formEditElement,
    formAddElement,
    configValidation,
    cardListSelector,
    profileSelectors,
    popupProfileInfoSelector,
    popupCardAddSelector,
    popupZoomImgSelector
} from '../utils/constants.js';
import './index.css';

function openPopupEdit() {
    const currentInfo = userInfo.getUserInfo();

    formInputName.value = currentInfo.name;
    formInputAbout.value = currentInfo.about;

    popupEditProfile.open();

    formValidateEdit.resetValidation();// метод для очистки ошибок и управления кнопкой 
}

function createCard(name, link, template) {
    const card = new Card(name, link, template, {
        handleCardClick: (name, link) => {
            imagePopup.open(name, link);
        }
    });
    const cardElement = card.createCardDomNode();
    return cardElement;
}

const formEditSubmitHandler = (inputValues) => {
    userInfo.setUserInfo(inputValues);
    popupEditProfile.close();
}

const formAddSubmitHandler = (inputValues) => {
    cardsList.setItemPrepend(createCard(inputValues.name, inputValues.about, '#element'));

    popupAddCard.close();
}

const cardsList = new Section({
    items: initialCards,
    renderer: (cardItem) => {
        cardsList.setItemAppend(createCard(cardItem.name, cardItem.link, '#element'));
    }
}, cardListSelector);
cardsList.renderItems();

editButton.addEventListener('click', openPopupEdit);

addCardButton.addEventListener('click', () => {
    formValidateAdd.resetValidation();//// метод для очистки ошибок и управления кнопкой 

    popupAddCard.open();
});

const formList = Array.from(document.querySelectorAll(configValidation.formSelector));
formList.forEach(
    formElement => {
        formElement.addEventListener('submit', evt => {
            evt.preventDefault();
        });
    });

const userInfo = new UserInfo(profileSelectors);

const formValidateEdit = new FormValidator(configValidation, formEditElement);
const formValidateAdd = new FormValidator(configValidation, formAddElement);

formValidateEdit.enableValidation();
formValidateAdd.enableValidation();

const popupEditProfile = new PopupWithForm(popupProfileInfoSelector, formEditSubmitHandler);
const popupAddCard = new PopupWithForm(popupCardAddSelector, formAddSubmitHandler);
const imagePopup = new PopupWithImage(popupZoomImgSelector);

popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
imagePopup.setEventListeners();