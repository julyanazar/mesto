import { closePopupEscPress } from './index.js';
export function showPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEscPress);
}