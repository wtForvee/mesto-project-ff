import "../pages/index.css"
import { openPopup, closePopup, closePopupOverlayClick } from "./modal.js";
import { createCard, deleteCard, likeUnlikeCard } from "./card.js";
import { enableValidation, clearValidation  } from "./validation.js";
import { 
  apiGetProfileInfo, 
  apiGetInitialCards, 
  apiEditProfile,
  apiAddNewCard,
  apiUpdateAvatar
 } from "./api.js";

let profileId;

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}; 

const container = document.querySelector('.places');
const cardsContainer = container.querySelector('.places__list');

const popups = document.querySelectorAll('.popup');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileAvatar = document.querySelector('.profile__image');
const popupAvatar = document.querySelector('.popup_type_avatar');
const formAvatar = popupAvatar.querySelector('.popup__form');
const linkAvatar = formAvatar.querySelector('.popup__input_type_url');
const buttonSaveAvatar = formAvatar.querySelector('.popup__button');

const editProfileButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const profileNameInput = formEditProfile.querySelector('.popup__input_type_name');
const profileAboutInput = formEditProfile.querySelector('.popup__input_type_description');
const buttonSaveEditProfile = formEditProfile.querySelector('.popup__button');

const addCardButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_new-card');
const formAddCard = popupAddCard.querySelector('.popup__form');
const cardNameInput = formAddCard.querySelector('.popup__input_type_card-name');
const cardLinkInput = formAddCard.querySelector('.popup__input_type_url');
const buttonSaveAddCard = formAddCard.querySelector('.popup__button');

const popupImageContainer = document.querySelector('.popup_type_image');
const popupImage = popupImageContainer.querySelector('.popup__image');
const popupImageCaption = popupImageContainer.querySelector('.popup__caption');

Promise.all([apiGetProfileInfo(), apiGetInitialCards()])
  .then(([profileData, cardsData]) => {
    profileId = profileData._id;

    profileAvatar.style.backgroundImage = `url(\\${profileData.avatar})`;
    profileName.textContent = profileData.name;
    profileDescription.textContent = profileData.about;

    cardsData.forEach((card) => {
      cardsContainer.append(
        createCard(profileId, card, deleteCard, likeUnlikeCard, openCard)
      );
    });
  })
  .catch((err) => console.log(err));

// Открыть картинку выбранной карточки
function openCard(imageLink, cardName) {
  popupImage.src = imageLink;
  popupImage.alt = cardName;
  popupImageCaption.textContent = cardName;

  openPopup(popupImageContainer);
}

// Изменить аватар
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();

  const saveTextButton = buttonSaveAvatar.textContent;

  buttonSaveAvatar.textContent = 'Сохранение...';

  apiUpdateAvatar(linkAvatar.value)
    .then((avatarData) => {
      profileAvatar.style.backgroundImage = `url(${avatarData.avatar})`;
      
      closePopup(popupAvatar);
    })
    .catch((err) => console.log(err))
    .finally(() => buttonSaveAvatar.textContent = saveTextButton);
}

// Редактировать профиль
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  
  const saveTextButton = buttonSaveEditProfile.textContent;

  buttonSaveEditProfile.textContent = 'Сохранение...';

  apiEditProfile(profileNameInput.value, profileAboutInput.value)
    .then((profileData) => {
      profileName.textContent = profileData.name;
      profileDescription.textContent = profileData.about;
      
      closePopup(popupEditProfile);
    })
    .catch((err) => console.log(err))
    .finally(() => buttonSaveEditProfile.textContent = saveTextButton);
}

// Добавить карточку
function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const saveTextButton = buttonSaveAddCard.textContent;

  buttonSaveAddCard.textContent = 'Сохранение...';

  apiAddNewCard(cardNameInput.value, cardLinkInput.value)
    .then((cardData) => {
      const newCard = createCard(profileId, cardData, deleteCard, likeUnlikeCard, openCard);
        
      cardsContainer.prepend(newCard);
        
      closePopup(popupAddCard);

      formAddCard.reset();
    })
    .catch((err) => console.log(err))
    .finally(() => buttonSaveAddCard.textContent = saveTextButton);
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
profileAvatar.addEventListener('click', function() {
  formAvatar.reset();
  
  clearValidation(formAvatar, validationConfig);
  openPopup(popupAvatar);
});

// Обработчик клика по кнопке редактирование профиля
editProfileButton.addEventListener('click', function() {
  profileNameInput.value = profileName.textContent;
  profileAboutInput.value = profileDescription.textContent;

  clearValidation(formEditProfile, validationConfig);
  openPopup(popupEditProfile);
});

// Обработчик клика по кнопке добавления карточки
addCardButton.addEventListener('click', function() {
  formAddCard.reset();

  clearValidation(formAddCard, validationConfig);
  openPopup(popupAddCard);
});

// Обработчик сабмита формы редактирования профиля
formAvatar.addEventListener('submit', handleAvatarFormSubmit);
  
// Обработчик сабмита формы редактирования профиля
formEditProfile.addEventListener('submit', handleEditFormSubmit);
  
// Обработчик сабмита формы добавления карточки
formAddCard.addEventListener('submit', handleCardFormSubmit);

enableValidation(validationConfig);
clearValidation(formAvatar, validationConfig);
clearValidation(formEditProfile, validationConfig);
clearValidation(formAddCard, validationConfig);