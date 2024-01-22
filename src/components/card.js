import { cardTemplate } from "./index.js";

// @todo: Функция создания карточки
function createCard(element, deleteCard, likeCard, openCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = element.link;
  cardImage.alt = element.name;
  cardTitle.textContent = element.name;
  
  deleteButton.addEventListener('click', deleteCard);
  likeButton.addEventListener('click', likeCard);
  cardImage.addEventListener('click', function() {
    openCard(element.link, element.name);
  });

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
  evt.target.closest('.card').remove();
}

// @todo: Функция лайка карточки
function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

export { createCard, deleteCard, likeCard }