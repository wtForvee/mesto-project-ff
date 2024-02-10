const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-6',
    headers: {
      authorization: '1136abe6-6a51-4cc0-9261-9f97d2f76efb',
      'Content-Type': 'application/json'
    }
  }

// Проверка запроса
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);   
};
  
// Загрузка профиля с сервера
const apiGetProfileInfo = () => {
  return fetch(`${config.baseUrl}/users/me`)
    .then((res) => checkResponse(res));
}

// // Загрузка карточек с сервера
// const apiGetInitialCards = () => {
//   return fetch(`${config.baseUrl}/cards`)
//     .then((res) => checkResponse(res));
// }

// // Редактирование профиля
// const apiEditProfile = (name, description) => {
//   return fetch(`${config.baseUrl}/users/me`, {
//     method: 'PATCH',
//     headers: config.headers,
//     body: JSON.stringify({
//       name: name,
//       about: description
//     })
//     .then((res) => checkResponse(res));
//   });
// }

// // Добавление новой карточки
// const apiAddNewCard = (nameCard, link) => {
//   return fetch(`${config.baseUrl}/cards`, {
//     method: 'POST',
//     headers: config.headers,
//     body: JSON.stringify({
//       nameCard: nameCard,
//       link: link
//     })
//     .then((res) => checkResponse(res));
//   });
// }

// // Удаление карточки
// const apiDeleteCard = (cardId) => {
//   return fetch(`${config.baseUrl}/cards/${cardId}`, {
//     method: 'DELETE',
//     headers: config.headers,
//   })
//   .then((res) => checkResponse(res));
// }

// // Лайк карточки
// const apiLikeCard = (cardId) => {
//   return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
//     method: "PUT",
//     headers: config.headers,
//   })
//   .then((res) => checkResponse(res));
// }

// // Снятие лайка карточки
// const apiUnlikeCard = (cardId) => {
//   return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
//     method: "DELETE",
//     headers: config.headers,
//   })
//   .then((res) => checkResponse(res));
// }

// // Обновление аватара
// const apiUpdateAvatar = (avatarLink) => {
//   return fetch(`${config.baseUrl}/users/me/avatar`, {
//     method: "PATCH",
//     headers: config.headers,
//     body: JSON.stringify({
//       avatar: avatarLink
//     })
//   })
//   .then((res) => checkResponse(res));
// }

export { 
  apiGetProfileInfo, 
  // apiGetInitialCards, 
  // apiEditProfile,
  // apiAddNewCard,
  // apiDeleteCard,
  // apiLikeCard,
  // apiUnlikeCard,
  // apiUpdateAvatar
 }