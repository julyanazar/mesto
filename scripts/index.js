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

let formEditElement = document.querySelector('.form__edit');
const formAddElement = document.querySelector('.form__add');

const cardsContainer = document.querySelector('.elements__items');
const templateElement = document.querySelector('.template');

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

function fillPopupEdit(evt) {
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

function createTaskDomNode(item) {
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

    return newItem;
}

function renderCards() {
    const result = initialCards.map(function(item) {
        const newCard = createTaskDomNode(item);
        addCardListeners(newCard);
        return newCard;
    });
    cardsContainer.append(...result);
}

function addCardFormListener (evt) {
    evt.preventDefault();
    //получаем значение написанное в инпут названия карточки
    const inputCardName = formAddElement.querySelector('.form__input-card-name');
    const inputCardNameValue = inputCardName.value;
    //получаем значение написанное в инпут ссылки на картинку
    const inputImg = formAddElement.querySelector('.form__input-src');
    const inputImgValue = inputImg.value;
    //создаем новую карточку с полученными выше значениями 
    const newCard = createTaskDomNode({ name: inputCardNameValue, link: inputImgValue});

    //вызываем функцию с операциями навешивания слушателей и передаем туда нашу домноду
    addCardListeners(newCard);

    //вставляем карточку в начало
    cardsContainer.prepend(newCard);
    //обнуляем поля после ввода значений
    inputCardName.value = '';
    inputImg.value = '';
    closePopupAddCard(evt);
}

function addCardListeners(card) {
    const deleteButton = card.querySelector('.element__trash-button');
    deleteButton.addEventListener('click', deleteCardHandler);
    
    const likeButton = card.querySelector('.element__like-button');
    likeButton.addEventListener('click', likeCardHandler);
}

function deleteCardHandler(evt) {
    const target = evt.target;
    const currentCard = target.closest('.element');

    currentCard.remove();
}

function likeCardHandler(evt) {
    evt.target.classList.toggle('element__like-button_active');
}

editButton.addEventListener('click', fillPopupEdit);
closeButtonInfo.addEventListener('click', closePopupEdit);
addCardButton.addEventListener('click', showPopupAddCard)
closeButtonAdd.addEventListener('click', closePopupAddCard);
formEditElement.addEventListener('submit', formSubmitHandler); 
formAddElement.addEventListener('submit', addCardFormListener);
renderCards();