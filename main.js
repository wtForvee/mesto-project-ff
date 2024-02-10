(()=>{"use strict";var e={d:(t,r)=>{for(var n in r)e.o(r,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:r[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};function t(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",n)}function r(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n)}function n(e){var t=document.querySelector(".popup_is-opened");"Escape"===e.key&&r(t)}function o(e){var t=document.querySelector(".popup_is-opened");e.target===e.currentTarget&&r(t)}function c(e,t,r,n){var o=d.querySelector(".card").cloneNode(!0),c=o.querySelector(".card__image"),u=o.querySelector(".card__title"),a=o.querySelector(".card__delete-button"),i=o.querySelector(".card__like-button");return c.src=e.link,c.alt=e.name,u.textContent=e.name,a.addEventListener("click",t),i.addEventListener("click",r),c.addEventListener("click",(function(){n(e.link,e.name)})),o}function u(e){e.target.closest(".card").remove()}function a(e){e.target.classList.toggle("card__like-button_is-active")}e.d({},{O:()=>d});var i=function(e,t,r){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(r.inputErrorClass),n.classList.remove(r.errorClass),n.textContent=""},p=function(e,t,r){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(r.inactiveButtonClass)):(t.disabled=!0,t.classList.add(r.inactiveButtonClass))},s=function(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector));r.forEach((function(r){i(e,r,t)}));var n=e.querySelector(t.submitButtonSelector);p(r,n,t)},l={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},d=document.querySelector("#card-template").content,_=document.querySelector(".places").querySelector(".places__list"),m=document.querySelectorAll(".popup"),y=document.querySelector(".profile__title"),f=document.querySelector(".profile__description"),v=document.querySelector(".profile__image"),S=document.querySelector(".popup_type_avatar"),q=S.querySelector(".popup__form"),k=q.querySelector(".popup__input_type_url"),b=document.querySelector(".profile__edit-button"),g=document.querySelector(".popup_type_edit"),E=g.querySelector(".popup__form"),L=E.querySelector(".popup__input_type_name"),h=E.querySelector(".popup__input_type_description"),C=document.querySelector(".profile__add-button"),x=document.querySelector(".popup_type_new-card"),j=x.querySelector(".popup__form"),w=document.querySelector(".popup__input_type_card-name"),A=document.querySelector(".popup__input_type_url"),B=document.querySelector(".popup_type_image"),D=B.querySelector(".popup__image"),O=B.querySelector(".popup__caption");function P(e,r){D.src=e,D.alt=r,O.textContent=r,t(B)}new Promise((function(e){e(fetch("".concat("https://nomoreparties.co/v1/wff-cohort-6","/users/me")).then((function(e){return function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}(e)})))})).then((function(e){y.textContent=e.name,f.textContent=e.about})),[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){var t=c(e,u,a,P);_.prepend(t)})),m.forEach((function(e){e.querySelector(".popup__close").addEventListener("click",(function(){r(e)})),e.addEventListener("click",o)})),v.addEventListener("click",(function(){k.value=v.style.backgroundImage,s(q,l),t(S)})),b.addEventListener("click",(function(){L.value=y.textContent,h.value=f.textContent,s(E,l),t(g)})),C.addEventListener("click",(function(){j.reset(),s(j,l),t(x)})),q.addEventListener("submit",(function(e){e.preventDefault(),v.style.backgroundImage="url(".concat(k.value,")"),r(S),q.reset()})),E.addEventListener("submit",(function(e){e.preventDefault(),y.textContent=L.value,f.textContent=h.value,r(g),E.reset()})),j.addEventListener("submit",(function(e){e.preventDefault();var t=c({name:w.value,link:A.value},u,a,P);_.prepend(t),r(x),j.reset()})),function(e){document.querySelectorAll(e.formSelector).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var r=Array.from(t.querySelectorAll(e.inputSelector)),n=t.querySelector(e.submitButtonSelector);p(r,n,e),r.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,r){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?i(e,t,r):function(e,t,r,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(n.inputErrorClass),o.textContent=r,o.classList.add(n.errorClass)}(e,t,t.validationMessage,r)}(t,o,e),p(r,n,e)}))}))}(e,t)}))}(l),s(q,l),s(E,l),s(j,l)})();