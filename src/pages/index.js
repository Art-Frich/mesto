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
  btnEditProfile, btnAddPlace, cardConfig, btnEditAvatar, validateConfig,
  popupWithImageConfig, popupAddPlaceConfig, popupEditProfileConfig,
  selectorCards, userInfoConfig, apiConfig, popupConfirmDeleteConfig,
  popupEditAvatarConfig, errMsg,
 } from '../utils/constants.js';

// Переменные
let myId;

// функции
function createCardConfigProperties( data ) {
  return {
    config: cardConfig,
    placeName: data.name,
    placeImgSrc: data.link,
    likes: data.likes,
    ownerId: data.owner._id,
    myId: myId,
  }
}

function renderer( data ) {
  const cardObject = new Card(
    createCardConfigProperties( data ),
    {
      handleCardClick: () => popupWithImage.open( data.link, data.name ),
      setLikeOnServer: () => api.setLike( data._id ),
      deleteLikeFromServer: () => api.deleteLike( data._id ),
      handleLikeClick: () =>  {
        cardObject.toggleLikeConditionOnserver()
          .then( data => {
            cardObject.setCountLikes( data.likes );
            cardObject.doLikeActive();
          })
          .catch( err => alert( errMsg + err ) )
          .finally( () => cardObject.toggleflagCondition() );
      },
      confirmDelete: () => popupConfirmDeleteCard.open( async () => {
        try {
          await api.deleteCard(data._id);
          cardObject.deleteCard();
          popupConfirmDeleteCard.close();
        } catch (err) {
          alert(errMsg + err);
        } finally {
          popupConfirmDeleteCard.toggleBtnSubmitText();
        }
      }),
    }
  );
  const newCard = cardObject.getPlaceCard();
  cards.addItem( newCard );
}

const handlerSubmitPopupEditProfile =  ({ nameUser, aboutUser }) => {
  api.updateUserData( nameUser, aboutUser )
    .then( () => {
      userInfo.setUserInfo( nameUser, aboutUser );
      popupEditProfile.close();
    })
    .catch( err => alert( errMsg + err ) )
    .finally( () => popupEditProfile.toggleBtnSubmitText() );
}

const handlerSubmitPopupAddCard = ({ namePlace, urlImage }) => {
    api.addNewCard( namePlace, urlImage )
      .then( data => {
        renderer( data );
        popupAddCard.close();
      })
      .catch( err => alert( 'Произошла какая-то ошибка...\n' + err ) )
      .finally( () => popupAddCard.toggleBtnSubmitText() );
}

const handlerSubmitPopupEditAvatar = ( { urlImage } ) => {
  api.updateAvatar( urlImage )
    .then( data => {
      userInfo.setAvatar( data.avatar );
      popupEditAvatar.close();
    })
    .catch( err => alert( 'Произошла какая-то ошибка...\n' + err ) )
    .finally( () => popupEditAvatar.toggleBtnSubmitText() );
}

// объекты классов
const popupConfirmDeleteCard = new PopupCardDelete( popupConfirmDeleteConfig );
const popupWithImage = new PopupWithImage( popupWithImageConfig ); 
const userInfo = new UserInfo( userInfoConfig );
const api = new Api( apiConfig );
const cards = new Section( renderer, selectorCards );

const popupEditProfile = new PopupWithForm( popupEditProfileConfig, handlerSubmitPopupEditProfile );
const popupAddCard = new PopupWithForm( popupAddPlaceConfig, handlerSubmitPopupAddCard);
const popupEditAvatar = new PopupWithForm( popupEditAvatarConfig, handlerSubmitPopupEditAvatar);

// Запуск скриптов
Promise.all([ 
  api.getUserDataFromServer(), 
  api.getInitialCards()
])
  .then( ([ dataOne, dataTwo ]) => {
    userInfo.setInitialUserInfo( dataOne );
    myId = dataOne._id;
    cards.renderCards( dataTwo );
  })
  .catch( ([ errOne, errTwo ]) => alert( errOne, errTwo ) )

popupWithImage.setEventListeners();
popupAddCard.setEventListeners();
popupEditProfile.setEventListeners();
popupConfirmDeleteCard.setEventListeners();
popupEditAvatar.setEventListeners();

Array.from( document.forms ).forEach( form => {
  const newValidator = new FormValidator ( validateConfig, form );
  newValidator.enableValidation();
} );

btnEditAvatar.addEventListener( 'click', popupEditAvatar.open )
btnAddPlace.addEventListener( 'click', popupAddCard.open );
btnEditProfile.addEventListener( 'click', () => {
  popupEditProfile.setInputValues( userInfo.getUserInfo() );
  popupEditProfile.open() 
});

// включить анимацию на страничке
setTimeout( () => document.querySelector( '.preload' ).classList.remove( 'preload' ), 500 );