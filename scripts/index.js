let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');

let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

let formInputName = document.querySelector('.form__input-name');
let formInputAbout = document.querySelector('.form__input-about');

let formElement = document.querySelector('.form');

function togglePopupEdit(evt) {
    evt.preventDefault();
    if (!popup.classList.contains('popup_opened')) {
        formInputName.value = profileTitle.textContent;
        formInputAbout.value = profileSubtitle.textContent;
    }
    popup.classList.toggle('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent = formInputName.value;
    profileSubtitle.textContent =  formInputAbout.value;
    togglePopupEdit(evt); 
}

editButton.addEventListener('click', togglePopupEdit);
closeButton.addEventListener('click', togglePopupEdit);
formElement.addEventListener('submit', formSubmitHandler); 