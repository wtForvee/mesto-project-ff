// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
  };
  
  // Функция, которая удаляет класс с ошибкой
  const hideInputError = (formElement, inputElement, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
  };
  
  // 3 Проверяем валидность поля
  const checkInputValidity = (formElement, inputElement, validationConfig) => {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
  }
    
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    } else {
      hideInputError(formElement, inputElement, validationConfig);
    }
  };
  
  // Блокируем/разблокируем кнопку проверив все input 
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  
  // Блокировка/разблокировка кнопки
  const toggleButtonState = (inputList, popupButton, validationConfig) => {
    if (hasInvalidInput(inputList)) {  
        popupButton.disabled = true;
        popupButton.classList.add(validationConfig.inactiveButtonClass);
    } else {
        popupButton.disabled = false;
        popupButton.classList.remove(validationConfig.inactiveButtonClass);
    }
  };
  
  // 2 Находим все input и вешаем обработчик
  const setEventListeners = (validationConfig, formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const popupButton = formElement.querySelector(validationConfig.submitButtonSelector);
    toggleButtonState(inputList, popupButton, validationConfig);
  
    
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement, validationConfig);
        toggleButtonState(inputList, popupButton, validationConfig);
      });
    });
  }; 
  
  // 1 Находим все формы и вешаем обработчик
  const enableValidation = (validationConfig) => {
    const formList = document.querySelectorAll(validationConfig.formSelector);
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(validationConfig, formElement);
    });
  };

const clearValidation = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, validationConfig);
    })
    const popupButton = formElement.querySelector(validationConfig.submitButtonSelector);
    toggleButtonState(inputList, popupButton, validationConfig);
}

export { enableValidation, clearValidation }