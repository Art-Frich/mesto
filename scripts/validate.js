// получить текстовый блок с ошибкой (пока пустой)
function getErrorElement (errorClass, field) {
  return field.querySelector(`.${errorClass}`);
}

// показать текст ошибки
function showInputError (textError, inputUnvalidateClass, errorVisibleClass, errorElement, inputElement) {
  inputElement.classList.add(`${inputUnvalidateClass}`);
  errorElement.textContent = textError;
}

// скрыть текст ошибки
function hideInputError (inputUnvalidateClass, errorVisibleClass, errorElement, inputElement) {
  inputElement.classList.remove(`${inputUnvalidateClass}`);
  errorElement.textContent = '';
} 

// проверить валидность формы и вызвать соответствующий метод
function checkInputValidity (inputElement, formParametrs, field) {
  const errorClass = formParametrs.errorClass;
  const errorVisibleClass = errorClass+'_visible';
  const inputUnvalidateClass = formParametrs.inputUnvalidateClass;
  const errorElement = getErrorElement(errorClass, field);

  inputElement.validity.valid ?
    hideInputError (inputUnvalidateClass, errorVisibleClass, errorElement, inputElement) :
    showInputError (
      inputElement.validationMessage, inputUnvalidateClass, 
      errorVisibleClass, errorElement, inputElement
      );
}

// проверить валидность инпутов
function hasInvalidInput(inputList) {
  let flag = true;
  inputList.forEach(item => {
    flag *= item.validity.valid;
  });
  return !flag;
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
  popupEditProfileClass: 'popup_type_editProfile'
});