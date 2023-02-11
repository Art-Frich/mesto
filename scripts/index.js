const btnEdit = document.querySelector('.profile__btn-edit');
const btnCloseEdit = document.querySelector('.popup__btn-close-edit');

const form = document.querySelector('.popup__form')
const popup = document.querySelector('.popup');
const nameInput = popup.querySelector('.popup__input_type_name');
const aboutInput = popup.querySelector('.popup__input_type_about');

const profile = document.querySelector('.profile');
const nameUser = profile.querySelector('.profile__title-name');
const nameAbout = profile.querySelector('.profile__subtitle');

const classPopupOpened = 'popup_opened'

function openPopup () {
  nameInput.value = nameUser.textContent;
  aboutInput.value = nameAbout.textContent;
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
    nameAbout.textContent = aboutInput.value;
    closePopup ();
}


// кнопка изменения данных профиля
btnEdit.addEventListener('click', openPopup);

// кнопка "закрыть" окно изменения данных профиля
btnCloseEdit.addEventListener('click', closePopup);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
forms.addEventListener('submit', handleFormSubmit);