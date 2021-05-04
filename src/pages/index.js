import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Api from '../components/Api.js';
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
    popupZoomImgSelector,
    profileTitle,
    profileSubtitle,

    profileAvatar,
    profileAvatarContainer,
    popupEditAvatar,
    formAvatarElement,
    popupEditAvatarSelector,
    popupCloseButtonSelector,
    popupAvatarInput
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
    const info = {
        name: formInputName.value,
        about: formInputAbout.value
    }

    api.editUserInfo(info.name, info.about)
        .finally(() => {
            userInfo.setUserInfo(inputValues);
            popupEditProfile.close();
        })

    // userInfo.setUserInfo(inputValues);
    // popupEditProfile.close();
}

const formAddSubmitHandler = (inputValues) => {
    cardsList.setItemPrepend(createCard(inputValues.name, inputValues.about, '#element'));

    popupAddCard.close();
}

/*
const cardsList = new Section({
    items: initialCards,
    renderer: (cardItem) => {
        cardsList.setItemAppend(createCard(cardItem.name, cardItem.link, '#element'));
    }
}, cardListSelector);
cardsList.renderItems();
*/

editButton.addEventListener('click', openPopupEdit);

addCardButton.addEventListener('click', () => {
    formValidateAdd.resetValidation();// метод для очистки ошибок и управления кнопкой 

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


// Экземпляр класса для работы с API
const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-23',
    headers: {
        authorization: 'e56d1e25-39ae-447a-8210-54350a3c4955',
        'Content-Type': 'application/json'
    }
});

api.getInitialCards().then((data) => {
    const cardsList = new Section({
        items: data,
        renderer: (cardItem) => {
            cardsList.setItemAppend(createCard(cardItem.name, cardItem.link, '#element'));
        }
    }, cardListSelector);
    cardsList.renderItems();
});

// Получаем с сервера данные пользователя
api.getUserInfo().then((data => {
    profileTitle.textContent = data.name;
    profileSubtitle.textContent = data.about;
    profileAvatar.src = data.avatar;
}))

// Редактируем аватар
const FormValidateAvatar = new FormValidator(configValidation, formAvatarElement);
FormValidateAvatar.enableValidation();

const formEditAvatarSubmitHandler = () => {

  profileAvatar.src = popupAvatarInput.value;

  api.editUserAvatar(popupAvatarInput.value)
  .finally(() => {
      popupAvatarEdit.close();
    });

}
const popupAvatarEdit = new PopupWithForm(popupEditAvatarSelector, formEditAvatarSubmitHandler);
popupAvatarEdit.setEventListeners();

profileAvatarContainer.addEventListener('click', function() {
    popupAvatarEdit.open();
    FormValidateAvatar.resetValidation();// метод для очистки ошибок и управления кнопкой 
  })