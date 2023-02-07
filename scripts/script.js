var btnEdit = document.querySelector('.profile__btn-edit');
var btnAdd = document.querySelector('.profile__btn-add');
var btnSaveEdit = document.querySelector('.popup__btn-save-edit');
var btnCloseEdit = document.querySelector('.popup__btn-close-edit');

var formElement = document.querySelector('.popup');
var nameInput = formElement.querySelector('.popup__input-name');
var jobInput = formElement.querySelector('.popup__input-about');

var profile = document.querySelector('.profile');
var nameUser = profile.querySelector('.profile__title-name');
var nameAbout = profile.querySelector('.profile__subtitle');

// кнопка изменения данных профиля
btnEdit.addEventListener('click', function () {
  nameInput.placeholder = nameUser.textContent;
  jobInput.placeholder = nameAbout.textContent;
  formElement.classList.add('popup__opened');
})

// кнопка "закрыть" окно изменения данных профиля
btnCloseEdit.addEventListener('click', function () {
  nameInput.value = null;
  jobInput.value = null;
  formElement.classList.remove('popup__opened');
})

// кнопка "сохранить" изменения данных профиля
btnSaveEdit.addEventListener('click', function () {
  nameUser.textContent = nameInput.value;
  nameAbout.textContent = jobInput.value;
  formElement.classList.remove('popup__opened');
})


function handleFormSubmit (evt) {
  // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.
    evt.preventDefault(); 

    nameUser.textContent = nameInput.value;
    nameAbout.textContent = jobInput.value;
    formElement.classList.remove('popup__opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);