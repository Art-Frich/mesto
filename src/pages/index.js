// импорты
import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import initialCards from '../utils/initialCards.js';
import {
  btnEditProfile, btnAddPlace, cardConfig, validateConfig,
  popupWithImageConfig, popupAddPlaceConfig, popupEditProfileConfig,
  selectorCards, userInfoConfig
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
  section.addItem( newCard );
}

// объекты классов
const popupWithImage = new PopupWithImage( popupWithImageConfig ); 
const userInfo = new UserInfo( userInfoConfig );

const section = new Section( {
  items: initialCards,
  renderer: ( dataCard ) => renderer( dataCard.name, dataCard.link )
}, selectorCards )

const popupEditProfile = new PopupWithForm( 
  popupEditProfileConfig, ( [newName, newAbout] ) => {
    userInfo.setUserInfo( newName, newAbout );
    popupEditProfile.close();
} );

const popupAddCard = new PopupWithForm( popupAddPlaceConfig, ([ name, link ]) => {
  renderer( name, link );
  popupAddCard.close();
} );

// Запуск скриптов
popupWithImage.setEventListeners();
popupAddCard.setEventListeners();
popupEditProfile.setEventListeners();
section.addInitialCards();

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