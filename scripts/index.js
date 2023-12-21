  // @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const container = document.querySelector('.places');
const cardsContainer = container.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard (element, deleteCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').src = element.link;
    cardElement.querySelector('.card__image').alt = element.name;
    cardElement.querySelector('.card__title').textContent = element.name;
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard);
    return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
    const eventTarget = evt.target;
    eventTarget.closest('.card').remove();
  }

// @todo: Вывести карточки на страницу

function renderCards() {
    initialCards.forEach(function(element) {
    const card = createCard(element, deleteCard);
    cardsContainer.prepend(card);
  });
}

renderCards();