const popupForAll = document.querySelector('.popup');

const popupProfileInfo = document.querySelector('.popup_profile_info');
const closeButtonInfo = popupProfileInfo.querySelector('.popup__close-button');

const popupCardAdd = document.querySelector('.popup_card_add');
const closeButtonAdd = popupCardAdd.querySelector('.popup__close-button');

const popupZoomImg = document.querySelector('.popup_zoom_img');
const closeButtonZoom = popupZoomImg.querySelector('.popup__close-button');

const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const formInputName = document.querySelector('.form__input-name');
const formInputAbout = document.querySelector('.form__input-about');

const formEditElement = document.querySelector('.form_edit');
const formAddElement = document.querySelector('.form_add');

const inputCardName = formAddElement.querySelector('.form__input-card-name');
const inputImg = formAddElement.querySelector('.form__input-src');

const cardsContainer = document.querySelector('.elements__items');
const templateElement = document.querySelector('.template');

const elementImg = document.querySelector('.element__img');

function openPopupEdit() {
    formInputName.value = profileTitle.textContent;
    formInputAbout.value = profileSubtitle.textContent;

    showPopup(popupProfileInfo);
}

function handleProfileSubmit (evt) {
    evt.preventDefault();
    profileTitle.textContent = formInputName.value;
    profileSubtitle.textContent =  formInputAbout.value;
    closePopupEdit(); 
}

function showPopup(popup) {
    popup.classList.add('popup_opened');
  }

function closePopup(popup) {
    popup.classList.remove('popup_opened');
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

function renderCards() {
    const result = initialCards.map(function(item) {
        const newCard = createCardDomNode(item);
        return newCard;
    });
    cardsContainer.append(...result);
}

function addCardFormListener (evt) {
    evt.preventDefault();
    //получаем значение написанное в инпут названия карточки
    const inputCardNameValue = inputCardName.value;
    //получаем значение написанное в инпут ссылки на картинку
    const inputImgValue = inputImg.value;
    //создаем новую карточку с полученными выше значениями 
    const newCard = createCardDomNode({ name: inputCardNameValue, link: inputImgValue});
    //вставляем карточку в начало
    cardsContainer.prepend(newCard);
    //обнуляем поля после ввода значений
    document.querySelector('.form_add').reset();
    closePopupAddCard(evt);
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
  const title = popupZoomImg.querySelector('.popup__title');
  const image = popupZoomImg.querySelector('.popup__img');

  title.textContent = item.name;
  image.src = item.link;
  image.alt = item.name;

  showPopup(popupZoomImg);
}

function closePopupImg() {
  closePopup(popupZoomImg);
}

editButton.addEventListener('click', openPopupEdit);
closeButtonInfo.addEventListener('click', closePopupEdit);
addCardButton.addEventListener('click', showPopupAddCard)
closeButtonAdd.addEventListener('click', closePopupAddCard);
formEditElement.addEventListener('submit', handleProfileSubmit); 
formAddElement.addEventListener('submit', addCardFormListener);
closeButtonZoom.addEventListener('click', closePopupImg);

renderCards();