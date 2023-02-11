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

const placesGrid = document.querySelector('.places__grid');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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
    event.preventDefault()    
    nameUser.textContent = nameInput.value;
    nameAbout.textContent = aboutInput.value;
    closePopup ();
}

function addPlace(item) {
  const placeTemplate = 
    document.querySelector('.places__card-template').content;
  const placeElement = 
    placeTemplate.querySelector('.places__grid-item').cloneNode(true);
  placeElement.querySelector('.places__grid-item-photo').src = item.link;
  placeElement.querySelector('.places__grid-item-title').textContent = 
    item.name;
  placesGrid.append(placeElement);
}

// загружаем стартовые значения
initialCards.forEach(addPlace);

// кнопка изменения данных профиля
btnEdit.addEventListener('click', openPopup);

// кнопка "закрыть" окно изменения данных профиля
btnCloseEdit.addEventListener('click', closePopup);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
form.addEventListener('submit', handleFormSubmit);