// получить текстовый блок с ошибкой (пока пустой)
function getErrorElement (errorClass, field) {
  return field.querySelector(`.${errorClass}`);
}

// показать текст ошибки
function showInputError (textError, inputUnvalidateClass, errorVisibleClass, errorElement, inputElement) {
  inputElement.classList.add(`${inputUnvalidateClass}`);
  // errorElement.classList.add(`${errorVisibleClass}`);
  errorElement.textContent = textError;
}

// скрыть текст ошибки
function hideInputError (inputUnvalidateClass, errorVisibleClass, errorElement, inputElement) {
  inputElement.classList.remove(`${inputUnvalidateClass}`);
  // errorElement.classList.remove(`${errorVisibleClass}`);
  errorElement.textContent = '';
} 

// проверить валидность формы и вызвать соответствующий метод
function checkInputValidity (inputElement, formParametrs, field) {
  const errorClass = formParametrs.errorClass;
  const errorVisibleClass = errorClass+'_visible';
  const inputUnvalidateClass = formParametrs.inputUnvalidateClass;
  const errorElement = getErrorElement(errorClass, field);

  inputElement.validity.valid ? //если
    hideInputError (inputUnvalidateClass, errorVisibleClass, errorElement, inputElement) : //то
    showInputError (
      inputElement.validationMessage, inputUnvalidateClass, 
      errorVisibleClass, errorElement, inputElement
      ); //иначе
}

function hasInvalidInput(inputList) {
  let flag = true;
  inputList.forEach(item => {
    flag *= item.validity.valid;
  });
  return !flag;
}

// обработчик нажатий P.S. т.к. есть свой keyHandler у index.js
function keyHandlerFromValide (ev) {
  switch (ev.key) {
    case 'Escape':
      return true;
  }
}

// сброс валидации в случае выхода с формы без submit
function resetValidationForm (btnSubmit, inputList, errorList, popup, formParametrs) {
  toggleButtonState(btnSubmit, inputList);
  errorList.forEach(item => item.textContent = '');
  inputList.forEach(item => item.classList.remove(`${formParametrs.inputUnvalidateClass}`));
  
  if (popup.classList.contains(`${formParametrs.popupEditProfileClass}`)) {
    btnSubmit.removeAttribute('disabled');
  }
}

// переключатель состояния кнопки с контроллером
function toggleButtonState (btnSubmit, inputList) {
  hasInvalidInput(inputList) ?
    btnSubmit.setAttribute('disabled', true):
    btnSubmit.removeAttribute('disabled');
}

// получить список областей к форме
function getFormElements (form, formSelector) {
  return Array.from(form.querySelectorAll(`.${formSelector}`));
}

// устанавливаем листенеры инпутам
function setEventListeners (form, formParametrs) {
  const formFieldList = getFormElements(form, formParametrs.formFieldSelector);
  const inputList = getFormElements(form, formParametrs.inputSelector);
  const errorList = getFormElements(form, formParametrs.errorClass);
  const btnSubmit = form.querySelector(`.${formParametrs.submitBtnSelector}`);
  const popup = form.closest(`.${formParametrs.popupSelector}`);
  const btnCloseForm = popup.querySelector(`.${formParametrs.btnCloseSelector}`);

  // при закрытии через крестик сбросить форму
  btnCloseForm.addEventListener('click', () => {
    resetValidationForm (btnSubmit, inputList, errorList, popup, formParametrs);
  });

  // это работает корректно, т.к. всплытие останавливается в index.js
  popup.addEventListener ('click', () => {
    resetValidationForm (btnSubmit, inputList, errorList, popup, formParametrs);
  });

  document.addEventListener('keydown', ev => {
    if (keyHandlerFromValide(ev)) {
      resetValidationForm (btnSubmit, inputList, errorList, popup, formParametrs);
    }
  });


  // отключить действия по умолчанию для submit форм
  form.addEventListener('submit', ev => {
    ev.preventDefault();
    toggleButtonState(btnSubmit, inputList);
  });

  // листенеры на инпуты
  inputList.forEach((inputElement, index) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(inputElement, formParametrs, formFieldList[index]);
      toggleButtonState(btnSubmit, inputList);
    });
  })
}

// получить список форм в документе
function getFormList (formSelector) {
  return Array.from(document.querySelectorAll(`.${formSelector}`));
}

// подключаем все модули валидации
function enableValidation (formParametrs) {
  getFormList(formParametrs.formSelector).forEach (formElement => {
    setEventListeners(formElement, formParametrs);
  });
}

// запуск валидации
enableValidation({
  formSelector: 'popup__form',
  inputSelector: 'popup__input',
  submitBtnSelector: 'popup__btn-save-edit',
  inputUnvalidateClass: 'popup__input_type_error',
  errorClass: 'popup__error',
  formFieldSelector: 'popup__field',
  popupSelector: 'popup',
  btnCloseSelector: 'popup__btn-close',
  popupEditProfileClass: 'popup_type_editProfile'
});