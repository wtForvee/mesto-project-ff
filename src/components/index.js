import "../pages/index.css"
import { openPopup, closePopup, closePopupOverlayClick } from "./modal.js";
import { createCard, deleteCard, likeCard } from "./card.js";
import { initialCards } from "./cards.js";

// Темплейт карточки
export const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы
const container = document.querySelector('.places');
const cardsContainer = container.querySelector('.places__list');

const popups = document.querySelectorAll('.popup');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

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

// Обработчик клика по кнопке редактирование профиля
editButton.addEventListener('click', function() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;

  openPopup(popupEdit);
});

// Обработчик клика по кнопке добавления карточки
addButton.addEventListener('click', function() {
  formCard.reset();
  openPopup(popupAdd);
});
  
// Обработчик сабмита формы редактирования профиля
formEdit.addEventListener('submit', handleEditFormSubmit);
  
// Обработчик сабмита формы добавления карточки
formCard.addEventListener('submit', handleCardFormSubmit);