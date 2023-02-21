// Кнопки
const btnEdit = document.querySelector('.profile__btn-edit');
const btnAddPlace = document.querySelector('.profile__btn-add');
const closeButtons = document.querySelectorAll('.popup__btn-close');

// templat-ы
const placeTemplate = document.querySelector('.template').content;

// Формы
const formAddPlace = document.querySelector('.popup__form[name="addNewPlace"]');
const formEditProfile = document.querySelector('.popup__form[name="editProfileText"]');

//попап профиля
const popupEditProfile = document.querySelector('.popup_type_editProfile');
const nameUserInput = popupEditProfile.querySelector('.popup__input_type_name-user');
const aboutInput = popupEditProfile.querySelector('.popup__input_type_about');

// попап места
const popupAddPlace = document.querySelector('.popup_type_addPlace');
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

//служебная переменная
const classPopupOpened = 'popup_opened';

//сетка мест и массив мест
const placesGrid = document.querySelector('.places__grid');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


// функции

// открыть попап
function openPopup (popup) {
  popup.classList.add(classPopupOpened);
}

// проверка popup на существование
function isObject (object) {
  return (!!object)
}

// сбросить значения input
function resetInput (popup) {
  const form = popup.querySelector('.popup__form');
  form.reset();
}

// закрываем попап
function closePopup () {
  // код рабочий, но не универсален, оставлю в запасе
  // const popup = ev.target.closest('.popup');
  const popup = document.querySelector('.popup_opened');
  if (isObject(popup)) {
    popup.classList.remove(classPopupOpened);
    if (popup.classList.contains('popup_type_addPlace')) {
      resetInput(popup)
    };
  }
}

// остановка распространений события при клике по попапу
function notСlosePopup (ev) {
  ev.stopPropagation();
}

// обработчик нажатий
function keyHandler (ev) {
  switch (ev.key) {
    case 'Escape':
      closePopup ();
      break;
  }
}

// блокировка двойного нажатия
function unblockBtn () {
  return (!unblockBtn.block)
}

// действия для submit ProfileForm
function handleProfileFormSubmit (ev) {
    ev.preventDefault();
    nameUser.textContent = nameUserInput.value;
    nameAbout.textContent = aboutInput.value;
    closePopup ();
}

// дейсвтия для submit PlaseForm
function handlePlaceFormSubmit (ev) {
  ev.preventDefault();
  if (unblockBtn()) {
    unblockBtn.block = true;
    addPlace(urlInput.value, namePlaceInput.value);
    closePopup ();
    setTimeout(() => {unblockBtn.block = false;}, 500);
  }
}

// открыть изображение места
function openImgFull(ev) {
  popupFigureImg.src = ev.target.src;
  //"изображение_" = 12 символов, с 13-го название места
  popupFigureImg.alt = ev.target.alt.slice(12);
  popupFigureFigcaption.textContent = ev.target.alt.slice(12); 
  openPopup(popupFigure);
}

// переключить состояние лайка
function toggleLikeCondition (ev) {
  ev.target.classList.toggle('places__grid-item-like_active');
}

// создать html-карточку места
function createPlaceElement (placeImgSrc, placeName) {
  const placeElement = placeTemplate.querySelector('.places__grid-item').cloneNode(true);
  const img = placeElement.querySelector('.places__grid-item-photo');
  const imgTitle = placeElement.querySelector('.places__grid-item-title');
  const imgLike = placeElement.querySelector('.places__grid-item-like');
  const btnPlaceDel = placeElement.querySelector('.places__grid-item-del');

  img.src = placeImgSrc;
  img.alt += ' ' + placeName; 
  imgTitle.textContent = placeName;

  imgLike.addEventListener('click', toggleLikeCondition);
  img.addEventListener('click', openImgFull);
  btnPlaceDel.addEventListener('click', () => placeElement.remove());

  return placeElement;
}

// добавить новое место
function addPlace (placeImgSrc, placeName) {
  placesGrid.prepend(createPlaceElement(placeImgSrc, placeName));
}


//код при запуске скрипта

// загрузить стартовые значения
initialCards.forEach(object => addPlace(object.link, object.name));

// события закрывашки попапов на каждый объект с крестиком
closeButtons.forEach((btn) => {
  const popup = btn.closest('.popup');
  const popupContainer = popup.querySelector('.popup__container');
  // закрыть на крестик
  btn.addEventListener('click', () => closePopup ());
  // не закрывать, если произошел клик по попапу
  popupContainer.addEventListener('click', (ev) => notСlosePopup (ev));
  // закрыть, если произошел клик по оверлею
  popup.addEventListener('click', () => closePopup ());
})

// открыть попап изменения данных профиля при нажатии
btnEdit.addEventListener('click', () => {
  openPopup(popupEditProfile);
  nameUserInput.value = nameUser.textContent;
  aboutInput.value = nameAbout.textContent;
});

// открыть форму-попап добавления места при нажатии
btnAddPlace.addEventListener('click', () => openPopup(popupAddPlace));

// применение формы изменения профиля
formEditProfile.addEventListener('submit', (ev) => handleProfileFormSubmit(ev));

// применение формы добавления места
formAddPlace.addEventListener('submit', (ev) => handlePlaceFormSubmit(ev));

//закрываем попап по клику esc
document.addEventListener('keydown', ev => keyHandler(ev));

// включить анимацию на страничке
setTimeout(() => document.querySelector('.preload').classList.remove('preload'), 500)