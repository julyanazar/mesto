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