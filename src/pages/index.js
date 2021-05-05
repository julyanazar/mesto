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
    profileTitle,
    profileSubtitle,
    cardsContainer,
    inputCardName,
    inputImg,

    profileAvatar,
    profileAvatarContainer,
    popupEditAvatar,
    formAvatarElement,
    popupEditAvatarSelector,
    popupAvatarInput,
    popupEditAvatarSaveButton,
    userId,
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
    const info = {
        name: formInputName.value,
        about: formInputAbout.value
    }

    popupEditProfile.waitSaveButton('Сохранение...');

    api.editUserInfo(info.name, info.about)
        .finally(() => {
            userInfo.setUserInfo(inputValues);
            popupEditProfile.close();
        })
}

// Обработчик формы добавления новых карточек
const formAddSubmitHandler = () => {

    popupAddCard.waitSaveButton('Сохранение...');

    const nameCard = inputCardName.value;
    const linkCard = inputImg.value;


    api.addCard(nameCard, linkCard)
        .then(data => {
            cardsList.setItemPrepend(createCard(data, userId, '#element'));
        });
    popupAddCard.close();
}

// Обработчик формы редактирования аватара
const formEditAvatarSubmitHandler = () => {
    profileAvatar.src = popupAvatarInput.value;
    popupAvatarEdit.waitSaveButton('Сохранение...');

    api.editUserAvatar(popupAvatarInput.value)
        .finally(() => {
            popupAvatarEdit.close();
        });
}

// Обработчик формы удаления карточки
const formDeleteSubmitHandler = (evt, card) => {
    evt.preventDefault();

    api.removeCard(card.getIdCard())
        .then(res => {
            card.deleteCard();
        })
        .finally(() => {
            popupDeleteCard.close();
        })
}

// Экземпляр класса для работы с API
const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-23',
    headers: {
        authorization: 'e56d1e25-39ae-447a-8210-54350a3c4955',
        'Content-Type': 'application/json'
    }
});

// Генерация изначальных карточек с сервера
api.getInitialCards().then((data) => {
    cardsList.renderItems(data);
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

            resultApi.then(data => {
                card.setLikes(data.likes);
                card.renderLikes();
            });
        },

        deleteCardHandler: () => {
            popupDeleteCard.open(card);
        }
    }, item._id);
    const cardElement = card.createCardDomNode();
    return cardElement;
}

// Рендер карточек
const cardsList = new Section({
    renderer: (cardItem) => {
        cardsList.setItemAppend(createCard(cardItem, userId, '#element'));
    }
}, cardListSelector);

// Получаем с сервера данные пользователя
api.getUserInfo().then((data => {
    profileTitle.textContent = data.name;
    profileSubtitle.textContent = data.about;
    profileAvatar.src = data.avatar;
}))

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