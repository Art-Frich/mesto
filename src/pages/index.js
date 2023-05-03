// Примечание: уточнить, что значит "Обрабатывайте ошибку внутри этого блока. Если нет времени писать сложную логику, хотя бы просто выведите ошибку в консоль." Что подразумевается под сложной логикой. Какую обработку ошибок имеют ввиду.
// Примечание: уточнить на счет async/await и .then\.catch - есть ли преимущества? Как выбрать?

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
  popupEditAvatarConfig,
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
      setLikeOnServer: () => handleResponse( api.setLike( data._id ) ),
      deleteLikeFromServer: () => handleResponse( api.deleteLike( data._id ) ),
      confirmDelete: () => popupConfirmDeleteCard.open( () => {
        handleResponse( api.deleteCard( data._id ) )
          .then( () => cardObject.deleteCard() )
          .catch( err => console.log( err ) )
      }),
    }
  );
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
    return handleResponse( api.updateUserData( nameUser, aboutUser ) )
});

const popupAddCard = new PopupWithForm( popupAddPlaceConfig, ({
  namePlace, urlImage }) => {
    return handleResponse( api.addNewCard( namePlace, urlImage ) )
      .then( data => renderer( data ) )
});

const popupEditAvatar = new PopupWithForm( popupEditAvatarConfig, ( { urlImage } ) => {
  return handleResponse( api.updateAvatar( urlImage ) )
    .then( data => userInfo.setAvatar( data.avatar ) )
});


// Запуск скриптов

// Примечание: сначала получить id, затем генерировать карточки. 
// Для решения вместо цепочки последовательных .then использовано Promise.all
Promise.all([ 
  handleResponse( api.getUserDataFromServer() ), 
  handleResponse( api.getInitialCards() )
])
  .then( ([ dataOne, dataTwo ]) => {
    userInfo.setInitialUserInfo( dataOne );
    myId = dataOne._id;
    cards.renderCards( dataTwo );
  })
  .catch( ([ errOne, errTwo ]) => console.log( errOne, errTwo ) )

popupWithImage.setEventListeners();
popupAddCard.setEventListeners();
popupEditProfile.setEventListeners();
popupConfirmDeleteCard.setEventListeners();
popupEditAvatar.setEventListeners();

// Примечание: нижестоящий код пытается повесить валиадцию на форму без инпутов.
// Мысли: имеется форма без инпутов, для которой валидация ненужна. Соответственно, её следовало бы исключить. Это можно сделать, составив список исключений и сверяться внутри перебора, но т.к. она не содержит инпутов, а следовательно и некуда установить листенеры, система потратит ресурсы только на попытку подключить валидацию. Создание списка исключений же задействует еще немного памяти и я не уверен, что это стоящая оптимизация.
// Также можно попробовать сверяться с содержимым формы: если есть инпуты, то... через form.elements, но это также ресурсы на проверку того, что в принципе не будет потреблять ресурсы, т.к. не существует (нельзя установить валидацию на то, чего нет)
// Итог: оставить в текущем виде, ждать комментариев от ревьюера или позднее уточнить у наставника
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