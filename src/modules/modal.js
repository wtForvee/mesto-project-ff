// Функция открытия popup
function openPopup(popup) {
    popup.classList.add('popup_is-opened', 'popup_is-animated');
    popup.addEventListener('click', closePopupOverlayClick)
    document.addEventListener('keydown', closePopupEscapeKeydown)
}

// Функция закрытия popup
function closePopup(popup) {
    popup.classList.remove('popup_is-opened', 'popup_is-animated');
    popup.removeEventListener('click', closePopupOverlayClick)
    document.removeEventListener('keydown', closePopupEscapeKeydown)
}

// Функция закрытия popup нажатие на Escape
function closePopupEscapeKeydown(evt) {
    const openedPopup = document.querySelector('.popup_is-opened')
    
    if (evt.key === 'Escape') {
        closePopup(openedPopup);
    }
}

// Функция закрытия popup кликом по оверлею
function closePopupOverlayClick(evt) {
    const openedPopup = document.querySelector('.popup_is-opened')

    if (evt.target.classList.contains('popup')) {
        closePopup(openedPopup);
    }
}

export { openPopup, closePopup }