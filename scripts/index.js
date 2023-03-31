import Card from './Card.js';
import FormValidator from './FormValidator.js';
import initialCards from './initialCards.js';
import Popup from './Popup.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';

// Формы
const formAddPlace = document.forms['addNewPlace'];
const formEditProfile = document.forms['editProfileText'];

// Кнопки
const btnEdit = document.querySelector('.profile__btn-edit');
const btnAddPlace = document.querySelector('.profile__btn-add');

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

const placesGrid = document.querySelector( '.places__grid' );

const popupWithImgObject = new PopupWithImage ( popupWithImgConfig, classPopup );
const popupObject = new Popup ( classPopup );
const popupWithFormObject = new PopupWithForm ( classPopup, addPlace );

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

btnEdit.addEventListener( 'click', popupWithFormObject.openEditProfilePopup );

// открыть форму-попап добавления места 
btnAddPlace.addEventListener( 'click', popupWithFormObject.openAddPlacePopup );

// применение формы изменения профиля
formEditProfile.addEventListener( 'submit', popupWithFormObject.handleProfileFormSubmit );

// применение формы добавления места
formAddPlace.addEventListener( 'submit', popupWithFormObject.handlePlaceFormSubmit );


/**
 * включить анимацию на страничке
 */
setTimeout( () => document.querySelector( '.preload' ).classList.remove( 'preload' ), 500 );