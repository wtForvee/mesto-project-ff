import "../pages/index.css"
import { openPopup, closePopup, closePopupOverlayClick } from "./modal.js";
import { createCard, deleteCard, likeCard } from "./card.js";
import { initialCards } from "./cards.js";
import { enableValidation, clearValidation  } from "./validation.js";
import { 
  apiGetProfileInfo, 
 } from "./api.js";


const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}; 

export const cardTemplate = document.querySelector('#card-template').content;

const container = document.querySelector('.places');
const cardsContainer = container.querySelector('.places__list');

const popups = document.querySelectorAll('.popup');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const avatarProfile = document.querySelector('.profile__image');
const popupAvatar = document.querySelector('.popup_type_avatar');
const formAvatar = popupAvatar.querySelector('.popup__form');
const linkAvatar = formAvatar.querySelector('.popup__input_type_url');

const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const formEdit = popupEdit.querySelector('.popup__form');
const nameInput = formEdit.querySelector('.popup__input_type_name');
const jobInput = formEdit.querySelector('.popup__input_type_description');

const addButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_type_new-card');
const formCard = popupAdd.querySelector('.popup__form');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardLinkInput = document.querySelector('.popup__input_type_url');

const popupImageContainer = document.querySelector('.popup_type_image');
const popupImage = popupImageContainer.querySelector('.popup__image');
const popupImageCaption = popupImageContainer.querySelector('.popup__caption');

const promise = new Promise((resolve) => {
  resolve(apiGetProfileInfo())
})

promise
  .then((res) => {
    profileName.textContent = res.name;
    profileDescription.textContent = res.about;
  })

// Вывести карточки на страницу
function renderCards() {
  initialCards.forEach(function(element) {
    const card = createCard(element, deleteCard, likeCard, openCard);
    
    cardsContainer.prepend(card);
});
}

renderCards();



// Открыть картинку выбранной карточки
function openCard(imageLink, cardName) {
  popupImage.src = imageLink;
  popupImage.alt = cardName;
  popupImageCaption.textContent = cardName;

  openPopup(popupImageContainer);
}

// Отправка формы аватара
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
 
  avatarProfile.style.backgroundImage = `url(${linkAvatar.value})`;
  
  closePopup(popupAvatar);

  formAvatar.reset(); 
}

// Отправка формы профиля
function handleEditFormSubmit(evt) {
  evt.preventDefault();
 
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(popupEdit);

  formEdit.reset();
}

// Отправка формы карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const newCard = createCard({ name: cardNameInput.value, link: cardLinkInput.value }, deleteCard, likeCard, openCard);

  cardsContainer.prepend(newCard);

  closePopup(popupAdd);

  formCard.reset();
}

// Закрыть popup
popups.forEach(function(popup) {
  const closeButton = popup.querySelector('.popup__close');
  
  closeButton.addEventListener('click', function() {
    closePopup(popup);
  });
  popup.addEventListener('click', closePopupOverlayClick);
});

// Обработчик клика по аватару
avatarProfile.addEventListener('click', function() {
   linkAvatar.value = avatarProfile.style.backgroundImage

  clearValidation(formAvatar, validationConfig);
  openPopup(popupAvatar);
});

// Обработчик клика по кнопке редактирование профиля
editButton.addEventListener('click', function() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;

  clearValidation(formEdit, validationConfig);
  openPopup(popupEdit);
});

// Обработчик клика по кнопке добавления карточки
addButton.addEventListener('click', function() {
  formCard.reset();
  clearValidation(formCard, validationConfig);
  openPopup(popupAdd);
});

// Обработчик сабмита формы редактирования профиля
formAvatar.addEventListener('submit', handleAvatarFormSubmit);
  
// Обработчик сабмита формы редактирования профиля
formEdit.addEventListener('submit', handleEditFormSubmit);
  
// Обработчик сабмита формы добавления карточки
formCard.addEventListener('submit', handleCardFormSubmit);

enableValidation(validationConfig);
clearValidation(formAvatar, validationConfig);
clearValidation(formEdit, validationConfig);
clearValidation(formCard, validationConfig);

