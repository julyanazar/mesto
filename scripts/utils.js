function showPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEscPress);
}