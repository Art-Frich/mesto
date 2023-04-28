// импорты
import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupCardDelete from '../components/PopupCardDelete';
import {
  btnEditProfile, btnAddPlace, cardConfig, validateConfig,
  popupWithImageConfig, popupAddPlaceConfig, popupEditProfileConfig,
  selectorCards, userInfoConfig, apiConfig, popupConfirmDeleteConfig
 } from '../utils/constants.js';

// Переменные
let myId;

// функции

// Примечание: можно прокинуть id в класс и вызывать его через this. Не знаю, что из этого лучше
// Примечание2: создание класса Card выглядит громоздким и сложным
function renderer( data ) {
  const cardObject = new Card({
    placeName: data.name,
    placeImgSrc: data.link,
    countLike: data.likes.length || 0,
    config: cardConfig,
    ownerId: data.owner._id,
    myId: myId,
    handleCardClick: () => popupWithImage.open( data.link, data.name ),
    confirmDelete: () => popupConfirmDeleteCard.open( () => {
      handleResponse( api.deleteCard( data._id ) )
        .then( () => cardObject.deleteOnClick() )
        .catch( err => console.log( err ) )
    }),
    setLikeOnServer: () => handleResponse( api.setLike( data._id ) ),
    deleteLikeFromServer: () => handleResponse( api.deleteLike( data._id ) ),
  });
  const newCard = cardObject.getPlaceCard();
  cards.addItem( newCard );
}

function handleResponse( response ){
  return response
    .then( res => {
      if ( !res.ok ) {
        throw new Error( res );
      }
      return res.json();
    })
}

// объекты классов
const popupConfirmDeleteCard = new PopupCardDelete( popupConfirmDeleteConfig );
const popupWithImage = new PopupWithImage( popupWithImageConfig ); 
const userInfo = new UserInfo( userInfoConfig );
const api = new Api( apiConfig );
const cards = new Section( renderer, selectorCards );

const popupEditProfile = new PopupWithForm( 
  popupEditProfileConfig, ( { nameUser, aboutUser } ) => {
    userInfo.setUserInfo( nameUser, aboutUser );
    handleResponse( api.updateUserData( nameUser, aboutUser ) );
} );

const popupAddCard = new PopupWithForm( popupAddPlaceConfig, ({
  namePlace, urlImage }) => {
    handleResponse( api.addNewCard( namePlace, urlImage ) )
      .then( data => renderer( data ) )
      .catch( err => console.log( err ) )
  }
);

// Запуск скриптов

// Примечание: сначала получить id, затем генерировать карточки. Возможно стоит попробовать заюзать Promise.All. Дело в том, что иногда почему-то myId отсутствует. Ранее это были два отдельных вызова. Сначала - данные профиля, затем карточки, но иногда багало.
handleResponse( api.getUserDataFromServer() )
  .then( data => {
    userInfo.setInitialUserInfo( data );
    myId = data._id;
  })
  .then( () => handleResponse( api.getInitialCards() ) ) 
  .then( data => cards.renderCards( data ) )
  .catch( err => console.log( err ) )

popupWithImage.setEventListeners();
popupAddCard.setEventListeners();
popupEditProfile.setEventListeners();
popupConfirmDeleteCard.setEventListeners();

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