export default class Card {
    constructor({ name, link, likes }, userId, cardSelector, { handleCardClick, likeCardHandler }, cardId) {
        this._name = name;
        this._link = link;
        this._countLikes = likes;

        this._userId = userId;
        this._cardSelector = cardSelector;

        this._handleCardClick = handleCardClick;
        this._likeCardHandler = likeCardHandler;

        this._cardId = cardId;
    }

    createCardDomNode = () => {
        this._newItem = this._getTemplate();

        this._likeButton = this._newItem.querySelector('.element__like-button');
        this._likes = this._newItem.querySelector('.element__like-count');
        this._deleteButton = this._newItem.querySelector('.element__trash-button');

        this._title = this._newItem.querySelector('.element__title');
        this._image = this._newItem.querySelector('.element__img');

        this._title.textContent = this._name;
        this._image.src = this._link;
        this._image.alt = this._name;

        this._setEventListeners();
        this.renderLikes();

        return this._newItem;
    }

    _getTemplate = () => {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardElement;
    }

    _setEventListeners = () => {
        this._deleteButton
            .addEventListener('click', () => {
                this._deleteCardHandler();
            });

        this._likeButton
            .addEventListener('click', () => {
                this._likeCardHandler();
            })

        this._image
            .addEventListener('click', () => {
                this._handleCardClick(this._name, this._link);
            });

    }

    _deleteCardHandler = () => {
        this._newItem.remove();
    }

    /* _likeCardHandler = () => {
         this._newItem
             .querySelector('.element__like-button')
             .classList.toggle('element__like-button_active');
     }*/

    // Получаем id карточки
    getIdCard() {
        return this._cardId;
    }

    // Определяем наличие конктретного юзера в массиве лайкнувших
    likedCard() {
        return this._countLikes.some(like => {
            return like._id === this._userId;
        });
    }

    // Отрисовать лайки
    renderLikes() {
        this._likes.textContent = this._countLikes.length;
        this.showLikes(this._userId)
    }

    // Функция изменения вида лайка
    showLikes() {
        if (this.likedCard(this._userId)) {
            this._likeButton.classList.add('element__like-button_active');
        } else {
            this._likeButton.classList.remove('element__like-button_active');
        }
    }

    // Функция установки количества лайков !!!в свойства карточки!!!
    setLikes(listLikes) {
        this._countLikes = listLikes;
    }
}