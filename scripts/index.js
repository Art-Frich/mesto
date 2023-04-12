//    НА ВЫНОС
  /**
   * Обработка события submit у формы редактирования профиля
   * @param {Event} ev - событие submit
   */
  // handleProfileFormSubmit = ( ev ) => {
  //   ev.preventDefault();
  //   this._nameUserValue.textContent = this._nameUserInput.value;
  //   this._userAboutValue.textContent = this._aboutInput.value;
  //   super.close();
  // }
  
  // дейсвтия для submit PlaceForm
  /**
   * Обработка события submit у формы добавления места
   * @param {Event} ev - событие submit
   */
  // handlePlaceFormSubmit = ( ev ) => {
  //   ev.preventDefault();
  //   if ( this._unblockBtn() ) {
  //     this._unblockBtn.block = true;
  //     this._addPlaceFunc( this._namePlaceInput.value, this._urlInput.value );
  //     super.close();
  //     this._resetInput( ev );
  //     setTimeout( () => { this._unblockBtn.block = false; }, 500 );
  //   }
  // }



// действия для submit ProfileForm 
// function handleProfileFormSubmit ( ev ) { 
//     ev.preventDefault(); 
//     nameUser.textContent = nameUserInput.value; 
//     nameAbout.textContent = aboutInput.value; 
//     closePopup(); 
// } 

// // дейсвтия для submit PlaseForm 
// function handlePlaceFormSubmit ( ev ) { 
//   ev.preventDefault(); 
//   if ( unblockBtn() ) { 
//     unblockBtn.block = true; 
//     addPlace( namePlaceInput.value, urlInput.value ); 
//     closePopup(); 
//     resetInput(ev); 
//     setTimeout(() => {unblockBtn.block = false;}, 500); 
//   } 
// } 


// // открыть попап изменения данных профиля при нажатии 
// btnEdit.addEventListener('click', () => {
//   nameUserInput.value = nameUser.textContent; 
//   aboutInput.value = nameAbout.textContent;  
//   openPopup(popupEditProfile); 
// }); 

// // открыть форму-попап добавления места при нажатии 
// btnAddPlace.addEventListener('click', () => openPopup(popupAddPlace)); 

// // применение формы изменения профиля 
// formEditProfile.addEventListener('submit', handleProfileFormSubmit); 

// // применение формы добавления места 
// formAddPlace.addEventListener('submit', handlePlaceFormSubmit); 

import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Popup from './components/Popup.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage.js';
import Section from './components/Section.js';
import UserInfo from './components/UserInfo.js';
import initialCards from './utils/initialCards.js';
import {
  btnEdit, btnAddPlace, cardConfig, validateConfig,
  selectorCards, popupWithImageConfig
 } from './utils/constants.js';

// функции

// function createPlaceCard( namePlace, linkImg ) {
//   const cardObject = new Card( 
//     namePlace, linkImg, cardConfig, openImgFull
//   );
//   return cardObject.getPlaceCard();
// }

// function setValidate ( form ) {
//   const newValidate = new FormValidator ( validateConfig, form );
//   newValidate.enableValidation();
// }

const popupWithImage = new PopupWithImage( popupWithImageConfig ); 
const section = new Section( {
  items: initialCards,
  renderer: ( dataCard ) => {
    const card = new Card({
      placeName: dataCard.name,
      placeImgSrc: dataCard.link,
      config: cardConfig,
      handleCardClick: () => popupWithImage.open( dataCard.link, dataCard.name )
    })
    const newCard = card.getPlaceCard();
    section.addItem( newCard );
  } 
}, selectorCards )

popupWithImage.setEventListeners();
section.addInitialCards();


// установить валидацию
// Array.from( document.forms ).forEach( form => setValidate( form ) );


/**
 * включить анимацию на страничке
 */
setTimeout( () => document.querySelector( '.preload' ).classList.remove( 'preload' ), 500 );