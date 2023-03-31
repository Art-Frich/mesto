'use strict';

import Card from './Card.js';
import FormValidator from './FormValidator.js';
import initialCards from './initialCards.js';
import { PopupWithImage, Popup } from './Popup.js';

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
const classPopup = 'popup';

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
const popupWithImgConfig = {
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
  templateSelector: 'template'
}

/**
 * HTML элемент сетки мест
 */
const placesGrid = document.querySelector( '.places__grid' );
/**
 * объект класса PopupWithImage
 */
const popupWithImgObject = new PopupWithImage ( popupWithImgConfig, classPopup );
const popupObject = new Popup ( classPopup );

// функции

function createPlaceCard( namePlace, linkImg ) {
  return new Card( 
    namePlace, linkImg, cardConfig, popupWithImgObject.open
  );
}

function addPlace ( namePlace, linkImg ) {
  const card = createPlaceCard( namePlace, linkImg );
  placesGrid.prepend( card.getPlaceCard() );
}

function setValidate ( form ) {
  const newValidate = new FormValidator ( validateConfig, form );
  newValidate.enableValidation(); // запуск валидации
}


//код при запуске скрипта

// загрузить стартовые значения
initialCards.forEach( object => addPlace( object.name, object.link ) );

// установить валидацию
Array.from( document.forms ).forEach( form => setValidate( form ) );

// установка слушателей-закрывашек 
popupObject.setEventListeners();

/**
 * включить анимацию на страничке
 */
setTimeout( () => document.querySelector( '.preload' ).classList.remove( 'preload' ), 500 );