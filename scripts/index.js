let popup = document.querySelector('.popup');

const popupProfileInfo = document.querySelector('.popup_profile_info');
let closeButtonInfo = popupProfileInfo.querySelector('.popup__close-button');

const popupCardAdd = document.querySelector('.popup_card_add');
let closeButtonAdd = popupCardAdd.querySelector('.popup__close-button');

let editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

let formInputName = document.querySelector('.form__input-name');
let formInputAbout = document.querySelector('.form__input-about');

let formElement = document.querySelector('.form');

function FillPopupEdit(evt) {
    evt.preventDefault();
    if (!popupProfileInfo.classList.contains('popup_opened')) {
        formInputName.value = profileTitle.textContent;
        formInputAbout.value = profileSubtitle.textContent;
    }
    showPopupEdit();
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent = formInputName.value;
    profileSubtitle.textContent =  formInputAbout.value;
    closePopupEdit(evt); 
}

function showPopup(popup) {
    popup.classList.add('popup_opened');
  }

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}  

function showPopupEdit() {
    showPopup(popupProfileInfo);
}  

function closePopupEdit() {
    closePopup(popupProfileInfo);
}

function showPopupAddCard() {
    showPopup(popupCardAdd);
}  

function closePopupAddCard() {
    closePopup(popupCardAdd);
}

editButton.addEventListener('click', FillPopupEdit);
closeButtonInfo.addEventListener('click', closePopupEdit);
addCardButton.addEventListener('click', showPopupAddCard)
closeButtonAdd.addEventListener('click', closePopupAddCard);
formElement.addEventListener('submit', formSubmitHandler); 