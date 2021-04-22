export default class Card {
    constructor(name, link, cardSelector, { handleCardClick }) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    createCardDomNode = () => {
        this._newItem = this._getTemplate();

        const elementTitle = this._newItem
            .querySelector('.element__title');
        elementTitle.textContent = this._name;

        const elementImg = this._newItem
            .querySelector('.element__img');
        elementImg.src = this._link;
        elementImg.alt = this._name;

        this._setEventListeners();

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
        this._newItem
            .querySelector('.element__trash-button')
            .addEventListener('click', () => {
                this._deleteCardHandler();
            });

        this._newItem
            .querySelector('.element__like-button')
            .addEventListener('click', () => {
                this._likeCardHandler();
            });

        this._newItem.querySelector('.element__img')
            .addEventListener('click', () => {
                this._handleCardClick(this._name, this._link);
            });

    }

    _deleteCardHandler = () => {
        this._newItem.remove();
    }

    _likeCardHandler = () => {
        this._newItem
            .querySelector('.element__like-button')
            .classList.toggle('element__like-button_active');
    }
}