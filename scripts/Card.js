import { showPopup } from './utils.js';
import {popupZoomImg, popupZoomTitle, popupZoomPicture} from './constants.js';
export class Card {
    constructor(name, link, cardSelector) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
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

        this._newItem
            .querySelector('.element__img')
            .addEventListener('click', () => {
            this._showPopupImg();
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

      _showPopupImg = () => {
        popupZoomTitle.textContent = this._name;
        popupZoomPicture.src = this._link;
        popupZoomPicture.alt = this._name;
    
        showPopup(popupZoomImg);
      }
}