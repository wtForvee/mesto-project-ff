// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const container = document.querySelector('.places');
const cardsContainer = container.querySelector('.places__list');

// @todo: Функция создания карточки

// @todo: Функция удаления карточки
function cardDelete () {
    const card = document.querySelector('.card');
    card.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach(function(element) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').src = element.link;
    cardElement.querySelector('.card__title').textContent = element.name;
    cardsContainer.append(cardElement);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', cardDelete);
});