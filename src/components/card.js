import { apiDeleteCard, apiLikeCard, apiUnlikeCard } from "./api.js";

// Функция создания карточки
const createCard = (profileId, cardData, deleteCard, likeUnlikeCard, openCard) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCounter.textContent = cardData.likes.length;
  
  if (cardData.owner._id === profileId) {
    deleteButton.style.display = "block";
  } else {
    deleteButton.style.display = "none";
  } 

  const checkLikeCard = (cardData) => {
    return cardData.likes.some((like) => {
      return like._id === profileId;
    });
  };

  if (checkLikeCard(cardData)) {
    likeButton.classList.add('card__like-button_is-active');
  } else { 
    likeButton.classList.remove('card__like-button_is-active');
  }
  
  deleteButton.addEventListener('click', () => deleteCard(cardData, cardElement));
  likeButton.addEventListener('click', () => likeUnlikeCard(cardData, cardElement));
  cardImage.addEventListener('click', () => openCard(cardData.link, cardData.name));

  return cardElement;
}

// Функция удаления карточки
const deleteCard = (cardData, cardElement) => {
  apiDeleteCard(cardData._id)
    .then(() => cardElement.remove())
    .catch((err) => console.log(err));
}

// Функция лайка карточки
const likeUnlikeCard = (cardData, cardElement) => {
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');
  
  if (likeButton.classList.contains('card__like-button_is-active')) {
    apiUnlikeCard(cardData._id)
      .then((likesData) => {
        likeCounter.textContent = likesData.likes.length;
        
        likeButton.classList.remove('card__like-button_is-active');
      })
      .catch((err) => console.log(err));
  } else {
    apiLikeCard(cardData._id)
      .then((likesData) => {
        likeCounter.textContent = likesData.likes.length;

        likeButton.classList.add('card__like-button_is-active');
      })
      .catch((err) => console.log(err));
  }
}

export { createCard, deleteCard, likeUnlikeCard }