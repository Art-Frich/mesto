// импорты
import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js'; //чё -_-
import initialCards from '../utils/initialCards.js'
import {
  btnEditProfile, btnAddPlace, cardConfig, validateConfig,
  popupWithImageConfig, popupAddPlaceConfig, popupEditProfileConfig,
  selectorCards, userInfoConfig, apiConfig,
 } from '../utils/constants.js';


// функции
function createCardConfigObject ( name, link ) {
  return {
    placeName: name,
    placeImgSrc: link,
    config: cardConfig,
    handleCardClick: () => popupWithImage.open( link, name )
  }
}

function renderer( name, link ) {
  const cardObject = new Card( createCardConfigObject( name, link ) );
  const newCard = cardObject.getPlaceCard();
  cards.addItem( newCard );
}

// объекты классов
const popupWithImage = new PopupWithImage( popupWithImageConfig ); 
const userInfo = new UserInfo( userInfoConfig );
const api = new Api( apiConfig );
const cards = new Section( renderer, selectorCards );

const popupEditProfile = new PopupWithForm( 
  popupEditProfileConfig, ( { nameUser, aboutUser } ) => {
    userInfo.setUserInfo( nameUser, aboutUser );
    api.updateUserData( nameUser, aboutUser );
} );

const popupAddCard = new PopupWithForm( popupAddPlaceConfig, ( 
  { namePlace, urlImage } ) => {
    renderer( namePlace, urlImage );
    api.addNewCard( namePlace, urlImage );
  }
);

// Запуск скриптов
api.getUserDataFromServer()
  .then( data => userInfo.setInitialUserInfo( data ) );

popupWithImage.setEventListeners();
popupAddCard.setEventListeners();
popupEditProfile.setEventListeners();
api.getInitialCards()
  .then( data => cards.renderCards( data ) );

Array.from( document.forms ).forEach( form => {
  const newValidator = new FormValidator ( validateConfig, form );
  newValidator.enableValidation();
} );

btnAddPlace.addEventListener( 'click', () => popupAddCard.open() );
btnEditProfile.addEventListener( 'click', () => {
  popupEditProfile.setInputValues( userInfo.getUserInfo() );
  popupEditProfile.open() 
});

// включить анимацию на страничке
setTimeout( () => document.querySelector( '.preload' ).classList.remove( 'preload' ), 500 );