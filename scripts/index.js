'use strict';

import Card from './Card.js';
import FormValidator from './FormValidator.js';

// Триггеры
const popupList = document.querySelectorAll('.popup');

// Формы
const formAddPlace = document.forms['addNewPlace'];
const formEditProfile = document.forms['editProfileText'];

// Кнопки
const btnEdit = document.querySelector('.profile__btn-edit');
const btnAddPlace = document.querySelector('.profile__btn-add');

//попап профиля
const popupEditProfile = document.querySelector('.popup_type_editProfile');
const nameUserInput = popupEditProfile.querySelector('.popup__input_type_name-user');
const aboutInput = popupEditProfile.querySelector('.popup__input_type_about');

// попап места
const popupAddPlace = document.querySelector('.popup_type_addPlace');
const namePlaceInput = popupAddPlace.querySelector('.popup__input_type_name-place');
const urlInput = popupAddPlace.querySelector('.popup__input_type_url');

// профиль
const profile = document.querySelector('.profile');
const nameUser = profile.querySelector('.profile__title-name');
const nameAbout = profile.querySelector('.profile__subtitle');

//служебные переменные
const classPopupOpened = 'popup_opened';
const classBtnClose = 'popup__btn-close';
const placeTemplateSelector = '.template';

// настройки валидации
const validateConfig = {
  inputSelector: 'popup__input',
  submitBtnSelector: 'popup__btn-save-edit',
  inputUnvalidateClass: 'popup__input_type_error',
  errorClass: 'popup__error',
};

//сетка мест и массив мест
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


// функции

// открыть попап
function openPopup (popup) {
  popup.classList.add(classPopupOpened);
  document.addEventListener('keydown', handleKey);
}

// сбросить значения input
function resetInput (ev) {
  const form = ev.target.closest('.popup__form');
  form.reset();
}

// закрываем попап
function closePopup () {
  const popup = document.querySelector(`.${classPopupOpened}`);
  if (popup) {
    popup.classList.remove(classPopupOpened);
    document.removeEventListener('keydown', handleKey);
  }
}

// обработчик нажатий
const handleKey = ( ev ) => {
  //закрываем попап по клику esc
  switch (ev.key) {
    case 'Escape':
      closePopup();
      break;
  }
}

// блокировка двойного нажатия
function unblockBtn () {
  return !unblockBtn.block;
}

// действия для submit ProfileForm
function handleProfileFormSubmit ( ev ) {
    ev.preventDefault();
    nameUser.textContent = nameUserInput.value;
    nameAbout.textContent = aboutInput.value;
    closePopup();
}

// дейсвтия для submit PlaseForm
function handlePlaceFormSubmit ( ev ) {
  ev.preventDefault();
  if ( unblockBtn() ) {
    unblockBtn.block = true;
    addPlace( namePlaceInput.value, urlInput.value );
    closePopup();
    resetInput(ev);
    setTimeout(() => {unblockBtn.block = false;}, 500);
  }
}

// добавить новое место
function addPlace ( namePlace, linkImg ) {
  const newCard = new Card( namePlace, linkImg, placeTemplateSelector);
  placesGrid.prepend( newCard.getPlaceCard() );
}

// установка валидаторов формы
function setValidate ( form ) {
  const newValidate = new FormValidator ( validateConfig, form );
  newValidate.enableValidation(); // запуск валидации
}


//код при запуске скрипта

// загрузить в input формы изменения личных данных стартовые значения
nameUserInput.value = nameUser.textContent;
aboutInput.value = nameAbout.textContent;

// загрузить стартовые значения
initialCards.forEach( object => addPlace( object.name, object.link ) );

// установить валидацию
Array.from( document.forms ).forEach( form => setValidate( form ) );

// события закрывашки попапов
popupList.forEach((item) => {
  item.addEventListener('mousedown', ev => {
    if (ev.target.classList.contains(classPopupOpened) || 
        ev.target.classList.contains(classBtnClose)) {
          closePopup();
        } 
  });
})

// открыть попап изменения данных профиля при нажатии
btnEdit.addEventListener('click', () => {
  openPopup(popupEditProfile);
});

// открыть форму-попап добавления места при нажатии
btnAddPlace.addEventListener('click', () => openPopup(popupAddPlace));

// применение формы изменения профиля
formEditProfile.addEventListener('submit', handleProfileFormSubmit);

// применение формы добавления места
formAddPlace.addEventListener('submit', handlePlaceFormSubmit);

// включить анимацию на страничке
setTimeout(() => document.querySelector('.preload').classList.remove('preload'), 500)