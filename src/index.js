import "./pages/index.css"
import { openPopup, closePopup } from "./modules/modal.js";
import { createCard, deleteCard, likeCard } from "./modules/card.js";
import { initialCards } from "./scripts/cards.js";

// Темплейт карточки
export const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы
    // Карточки
    const container = document.querySelector('.places');
    const cardsContainer = container.querySelector('.places__list');

    // Popup
    const popups = document.querySelectorAll('.popup');
    
    // Редактирование профиля
    const editButton = document.querySelector('.profile__edit-button');
    const popupEdit = document.querySelector('.popup_type_edit');
    const formEdit = popupEdit.querySelector('.popup__form');

    // Добавление карточки профиля
    const addButton = document.querySelector('.profile__add-button');
    const popupAdd = document.querySelector('.popup_type_new-card');
    const formCard = popupAdd.querySelector('.popup__form');

    // Popup открытия карточки
    const popupImage = document.querySelector('.popup_type_image');
 
// Вывести карточки на страницу
function renderCards() {
  initialCards.forEach(function(element) {
    const card = createCard(element, deleteCard, likeCard);
    
    cardsContainer.prepend(card);
});
}

renderCards();

// Открыть картинку выбранной карточки
function handleImageClick(evt) {
  if (evt.target.classList.contains('card__image')) {
      const card = evt.target.closest('.card');
      const imageSrc = card.querySelector('.card__image').src;
      const imageCaption = card.querySelector('.card__title').textContent;

      popupImage.querySelector('.popup__image').src = imageSrc;
      popupImage.querySelector('.popup__image').alt = imageCaption;
      popupImage.querySelector('.popup__caption').textContent = imageCaption;

      openPopup(popupImage);
  }
}

// Отправка формы профиля
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  const nameInput = formEdit.querySelector('.popup__input_type_name');
  const jobInput = formEdit.querySelector('.popup__input_type_description');
  const profileName = document.querySelector('.profile__title');
  const profileDescr = document.querySelector('.profile__description');
  
  profileName.textContent = nameInput.value;
  profileDescr.textContent = jobInput.value;

  closePopup(popupEdit);

  formEdit.reset();
}

// Отправка формы карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const cardNameInput = document.querySelector('.popup__input_type_card-name');
  const cardLinkInput = document.querySelector('.popup__input_type_url');
  const newCard = createCard({ name: cardNameInput.value, link: cardLinkInput.value }, deleteCard, likeCard);

  cardsContainer.prepend(newCard);

  closePopup(popupAdd);

  formCard.reset();
}

// Закрыть popup нажатием на крестик
popups.forEach(function(popup) {
  const closeButton = popup.querySelector('.popup__close');
  
  closeButton.addEventListener('click', function() {
    closePopup(popup);
  });
});

// Обработчик клика по кнопке редактирование профиля
editButton.addEventListener('click', function() {
  formEdit.reset();
  
  openPopup(popupEdit);
});

// Обработчик клика по кнопке добавления карточки
addButton.addEventListener('click', function() {
  formCard.reset();
  
  openPopup(popupAdd);
});

// Обработчик клика на изображении в карточке
cardsContainer.addEventListener('click', handleImageClick);

// Обработчик сабмита формы редактирования профиля
formEdit.addEventListener('submit', handleEditFormSubmit);

// Обработчик сабмита формы добавления карточки
formCard.addEventListener('submit', handleCardFormSubmit);



