'use strict';

import Card from './Card.js';
import FormValidator from './FormValidator.js';
import initialCards from './initialCards.js';
import { ModuleImg } from './Popup.js';

// Триггеры
const popupList = document.querySelectorAll('.popup');

// Формы
const formAddPlace = document.forms['addNewPlace'];
const formEditProfile = document.forms['editProfileText'];

// Кнопки
const btnEdit = document.querySelector('.profile__btn-edit');
const btnAddPlace = document.querySelector('.profile__btn-add');

//попап профиля
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const nameUserInput = popupEditProfile.querySelector('.popup__input_type_name-user');
const aboutInput = popupEditProfile.querySelector('.popup__input_type_about');

// попап места
const popupAddPlace = document.querySelector('.popup_type_add-place');
const namePlaceInput = popupAddPlace.querySelector('.popup__input_type_name-place');
const urlInput = popupAddPlace.querySelector('.popup__input_type_url');

// профиль
const profile = document.querySelector('.profile');
const nameUser = profile.querySelector('.profile__title-name');
const nameAbout = profile.querySelector('.profile__subtitle');

//служебные переменные
const classPopupOpened = 'popup_opened';
const classBtnClose = 'popup__btn-close';

/**
 * настройки валидации
 *  */ 
const validateConfig = {
  inputSelector: 'popup__input',
  submitBtnSelector: 'popup__btn-save-edit',
  inputUnvalidateClass: 'popup__input_type_error',
  errorClass: 'popup__error',
};

/**
 * настройки модульного окна с изображением места карточки
 */
const moduleImgConfig = {
  figureSelector: 'popup_type_full-img-place',
  imgSelector: 'popup__img',
  figcaptionSelector: 'popup__figcaption'
}

/**
 * настройки для карточки
 */
const cardConfig = {
  cardSelector: 'places__grid-item',
  imgSelector: 'card__photo',
  titleSelector: 'card__title',
  likeSelector: 'card__like',
  btnDelSelector: 'card__del-card-btn',
  classLikeActive: 'card__like_active',
  classPopupOpened: classPopupOpened,
  templateSelector: 'template'
}

//сетка мест
const placesGrid = document.querySelector('.places__grid');

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
  if ( ev.key === 'Escape' ) { closePopup(); }
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

// дейсвтия для submit PlaceForm
function handlePlaceFormSubmit ( ev ) {
  ev.preventDefault();
  if ( unblockBtn() ) {
    unblockBtn.block = true;
    addPlace( namePlaceInput.value, urlInput.value );
    closePopup();
    resetInput( ev );
    setTimeout( () => { unblockBtn.block = false; }, 500 );
  }
}

function createModuleImg() {
  return new ModuleImg ( moduleImgConfig, classPopupOpened );
}

function createPlaceCard( namePlace, linkImg ) {
  const moduleImgObject = createModuleImg();
  return new Card( 
    namePlace, linkImg, cardConfig, moduleImgObject.setOpenOnClick 
  );
}

function addPlaceToGrid( card ) {
  placesGrid.prepend( card.getPlaceCard() );
}

// добавить новое место
function addPlace ( namePlace, linkImg ) {
  const card = createPlaceCard( namePlace, linkImg );
  addPlaceToGrid( card );
}

// установка валидаторов формы
function setValidate ( form ) {
  const newValidate = new FormValidator ( validateConfig, form );
  newValidate.enableValidation(); // запуск валидации
}


//код при запуске скрипта

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

// открыть попап изменения данных профиля
btnEdit.addEventListener('click', () => {
  nameUserInput.value = nameUser.textContent;
  aboutInput.value = nameAbout.textContent;
  openPopup(popupEditProfile);
});

// открыть форму-попап добавления места 
btnAddPlace.addEventListener('click', () => openPopup(popupAddPlace));

// применение формы изменения профиля
formEditProfile.addEventListener('submit', handleProfileFormSubmit);

// применение формы добавления места
formAddPlace.addEventListener('submit', handlePlaceFormSubmit);

// включить анимацию на страничке
setTimeout( () => document.querySelector('.preload').classList.remove('preload'), 500 );