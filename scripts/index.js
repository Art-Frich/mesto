// mood: разочарование и трусливое отчаяние

import Card from './Card.js';
import FormValidator from './FormValidator.js';
import initialCards from './initialCards.js';

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

// попап картинки 
const popupFigure = document.querySelector('.popup_type_full-img-place'); 
const popupFigureImg = popupFigure.querySelector('.popup__img'); 
const popupFigureFigcaption = popupFigure.querySelector('.popup__figcaption'); 

// профиль 
const profile = document.querySelector('.profile'); 
const nameUser = profile.querySelector('.profile__title-name'); 
const nameAbout = profile.querySelector('.profile__subtitle'); 

//служебные переменные
// const classPopup = 'popup';
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


// функции

function openPopup (popup) { 
  popup.classList.add(classPopupOpened); 
  document.addEventListener('keydown', handleKey); 
} 

function resetInput (ev) { 
  const form = ev.target.closest('.popup__form'); 
  form.reset(); 
} 

// открыть изображение места 
function openImgFull( imgSrc, placeName ) { 
  popupFigureImg.src = imgSrc;
  popupFigureImg.alt = placeName;
  popupFigureFigcaption.textContent = placeName
  openPopup( popupFigure ); 
} 

function closePopup () { 
  const popup = document.querySelector(`.${classPopupOpened}`); 
  if (popup) { 
    popup.classList.remove(classPopupOpened); 
    document.removeEventListener('keydown', handleKey);
  } 
} 

const handleKey = ( ev ) => { 
  if ( ev.key === 'Escape' ) { closePopup() }
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

function createPlaceCard( namePlace, linkImg ) {
  const cardObject = new Card( 
    namePlace, linkImg, cardConfig, openImgFull
  );
  return cardObject.getPlaceCard();
}

function addPlace ( namePlace, linkImg ) {
  const cardPlace = createPlaceCard( namePlace, linkImg );
  placesGrid.prepend( cardPlace );
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
  nameUserInput.value = nameUser.textContent; 
  aboutInput.value = nameAbout.textContent;  
  openPopup(popupEditProfile); 
}); 

// открыть форму-попап добавления места при нажатии 
btnAddPlace.addEventListener('click', () => openPopup(popupAddPlace)); 

// применение формы изменения профиля 
formEditProfile.addEventListener('submit', handleProfileFormSubmit); 

// применение формы добавления места 
formAddPlace.addEventListener('submit', handlePlaceFormSubmit); 

/**
 * включить анимацию на страничке
 */
setTimeout( () => document.querySelector( '.preload' ).classList.remove( 'preload' ), 500 );