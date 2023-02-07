let btnEdit = document.querySelector('.profile__btn-edit');
let btnCloseEdit = document.querySelector('.popup__btn-close-edit');

let formPopup = document.querySelector('.popup__container')
let popup = document.querySelector('.popup');
let popupInput = popup.querySelectorAll('.popup__input');
let nameInput = popupInput[0];
let jobInput = popupInput[1];

let profile = document.querySelector('.profile');
let nameUser = profile.querySelector('.profile__title-name');
let nameAbout = profile.querySelector('.profile__subtitle');

let classPopupOpened = 'popup_opened'

function openPopup () {
  nameInput.value = nameUser.textContent;
  jobInput.value = nameAbout.textContent;
  popup.classList.add(classPopupOpened);
}

function closePopup () {
  popup.classList.remove(classPopupOpened);
}

function handleFormSubmit (event) {
  // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.
    event.preventDefault()    

    nameUser.textContent = nameInput.value;
    nameAbout.textContent = jobInput.value;
    popup.classList.remove(classPopupOpened);
}


// кнопка изменения данных профиля
btnEdit.addEventListener('click', openPopup);

// кнопка "закрыть" окно изменения данных профиля
btnCloseEdit.addEventListener('click', closePopup);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formPopup.addEventListener('submit', handleFormSubmit);