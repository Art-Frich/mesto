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

// Примечание: здесь я прописываю callback, который будет реализован внутри класса, разве нужно здесь использовать публичные методы класса? Ведь каждый из этих методов не будет реализован в index.js, они все будут исполнены внутри класса. Аналогично приватные свойства.
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
      // примечание: vsc предложил переписать promise.then.catch на async\await\try\catch - зачем?
      confirmDelete: () => popupConfirmDeleteCard.open( async () => {
        try {
          await api.deleteCard(data._id);
          cardObject.deleteCard();
          popupConfirmDeleteCard.close();
        } catch (err) {
          alert(errMsg + err);
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