let userId;
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import Api from '../components/Api.js';

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
    profileAvatarContainer,
    formAvatarElement,
    popupEditAvatarSelector,
    popupDeleteCardSelector
} from '../utils/constants.js';
import './index.css';

function openPopupEdit() {
    const currentInfo = userInfo.getUserInfo();

    formInputName.value = currentInfo.name;
    formInputAbout.value = currentInfo.about;

    popupEditProfile.open();
    formValidateEdit.resetValidation();// метод для очистки ошибок и управления кнопкой 
    popupEditProfile.resetWaitSaveButton();
}

// Открытие попапа редактирования профиля
editButton.addEventListener('click', openPopupEdit);

// Открытие попапа добавления новых карточек
addCardButton.addEventListener('click', () => {
    formValidateAdd.resetValidation();// метод для очистки ошибок и управления кнопкой 
    popupAddCard.open();
    popupAddCard.resetWaitSaveButton();
});

// Открытие попапа редактирования аватара
profileAvatarContainer.addEventListener('click', function () {
    popupAvatarEdit.open();
    FormValidateAvatar.resetValidation();// метод для очистки ошибок и управления кнопкой 
    popupAvatarEdit.resetWaitSaveButton();
})

// Обработчик формы редактироваия профиля
const formEditSubmitHandler = (inputValues) => {

    popupEditProfile.waitSaveButton('Сохранение...');

    api.editUserInfo(inputValues.name, inputValues.about)
        .then(() => {
            userInfo.setUserInfo(inputValues.name, inputValues.about);
            popupEditProfile.close();
        })
        .catch(err => errorRequestResult(err));
}

// Обработчик формы добавления новых карточек
const formAddSubmitHandler = (inputValues) => {

    popupAddCard.waitSaveButton('Сохранение...');

    api.addCard(inputValues.name, inputValues.about)
        .then(data => {
            cardsList.setItemPrepend(createCard(data, userId, '#element'));
            popupAddCard.close();
        })
        .catch(err => errorRequestResult(err));
}

// Обработчик формы редактирования аватара
const formEditAvatarSubmitHandler = (inputValues) => {
    
    popupAvatarEdit.waitSaveButton('Сохранение...');

    api.editUserAvatar(inputValues['avatar-input'])
        .then(() => {
            userInfo.setAvatar(inputValues['avatar-input']);
            popupAvatarEdit.close();
        })
        .catch(err => errorRequestResult(err));
}

// Обработчик формы удаления карточки
const formDeleteSubmitHandler = (evt, card) => {
    evt.preventDefault();

    api.removeCard(card.getIdCard())
        .then(res => {
            card.deleteCard();
            popupDeleteCard.close();
        })
        .catch(err => errorRequestResult(err));
}

// Экземпляр класса для работы с API
const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-23',
    headers: {
        authorization: 'e56d1e25-39ae-447a-8210-54350a3c4955',
        'Content-Type': 'application/json'
    }
});

// Создание карточки
function createCard(item, userId, template) {
    const card = new Card(item, userId, template, {
        handleCardClick: (name, link) => {
            imagePopup.open(name, link);
        },

        likeCardHandler: () => {
            const likedCard = card.likedCard();
            const resultApi = likedCard ? api.deleteLikeCard(card.getIdCard()) : api.likeCard(card.getIdCard());

            resultApi
                .then(data => {
                    card.setLikes(data.likes);
                    card.renderLikes();
                })
                .catch(err => errorRequestResult(err));
        },

        deleteCardHandler: () => {
            popupDeleteCard.open(card);
        }
    }, item._id);
    const cardElement = card.createCardDomNode();
    return cardElement;
}

api.getInitialData()
    .then((arg) => {
        const [dataUserInfo, dataCards] = arg;
        userInfo.setUserInfo(dataUserInfo.name, dataUserInfo.about);
        userInfo.setAvatar(dataUserInfo.avatar);
        userId = dataUserInfo._id
        cardsList.renderItems(dataCards);
    })
    .catch(data => { errorRequestResult(data) });

// Рендер карточек
const cardsList = new Section({
    renderer: (cardItem) => {
        cardsList.setItemAppend(createCard(cardItem, userId, '#element'));
    }
}, cardListSelector);

const formList = Array.from(document.querySelectorAll(configValidation.formSelector));
formList.forEach(
    formElement => {
        formElement.addEventListener('submit', evt => {
            evt.preventDefault();
        });
    });

function errorRequestResult(err) {
    console.log(err);
}

const userInfo = new UserInfo(profileSelectors);

const formValidateEdit = new FormValidator(configValidation, formEditElement);
const formValidateAdd = new FormValidator(configValidation, formAddElement);
const FormValidateAvatar = new FormValidator(configValidation, formAvatarElement);

formValidateEdit.enableValidation();
formValidateAdd.enableValidation();
FormValidateAvatar.enableValidation();

const popupEditProfile = new PopupWithForm(popupProfileInfoSelector, formEditSubmitHandler);
const popupAddCard = new PopupWithForm(popupCardAddSelector, formAddSubmitHandler);
const popupAvatarEdit = new PopupWithForm(popupEditAvatarSelector, formEditAvatarSubmitHandler);
const imagePopup = new PopupWithImage(popupZoomImgSelector);
const popupDeleteCard = new PopupWithSubmit(popupDeleteCardSelector,
    (evt, card) => {
        formDeleteSubmitHandler(evt, card)
    }
);

popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupAvatarEdit.setEventListeners();
imagePopup.setEventListeners();
popupDeleteCard.setEventListeners();