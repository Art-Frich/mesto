// Триггеры
const triggersClose = document.querySelectorAll('.triggerClose');

// templat-ы
const placeTemplate = document.querySelector('.template').content;

// Формы
const formAddPlace = document.forms['addNewPlace'];
const formEditProfile = document.forms['editProfileText'];

// Кнопки
const btnEdit = document.querySelector('.profile__btn-edit');
const btnAddPlace = document.querySelector('.profile__btn-add');

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

//служебные переменные
const classPopupOpened = 'popup_opened';
const classBtnClose = 'popup__btn-close';
const classLikeActive = 'places__grid-item-like_active';

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
  document.addEventListener('keydown', handlerKey);
}

// проверка popup на существование
function isObject (object) {
  return (!!object)
}

// сбросить значения input
function resetInput (ev) {
  const form = ev.target.closest('.popup__form');
  form.reset();
}

// закрываем попап
function closePopup () {
  const popup = document.querySelector(`.${classPopupOpened}`);
  if (isObject(popup)) {
    popup.classList.remove(classPopupOpened);
    document.removeEventListener('keydown', handlerKey);
  }
}

// обработчик нажатий
const handlerKey = (ev) => {
  //закрываем попап по клику esc
  switch (ev.key) {
    case 'Escape':
      closePopup();
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
    closePopup();
}

// дейсвтия для submit PlaseForm
function handlePlaceFormSubmit (ev) {
  ev.preventDefault();
  if (unblockBtn()) {
    unblockBtn.block = true;
    addPlace(urlInput.value, namePlaceInput.value);
    closePopup();
    resetInput(ev);
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
  ev.target.classList.toggle(classLikeActive);
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

  imgLike.addEventListener('mousedown', toggleLikeCondition);
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

// загрузить в input формы изменения личных данных стартовые значения
nameUserInput.value = nameUser.textContent;
aboutInput.value = nameAbout.textContent;

// события закрывашки попапов
triggersClose.forEach((item) => {
  item.addEventListener('mousedown', ev => {
    if (ev.target.classList.contains(classPopupOpened) || 
        ev.target.classList.contains(classBtnClose)) {
        closePopup();
    } 
  });
})

// открыть попап изменения данных профиля при нажатии
btnEdit.addEventListener('click', () => {
  openPopup(popupEditProfile);
});

// открыть форму-попап добавления места при нажатии
btnAddPlace.addEventListener('click', () => openPopup(popupAddPlace));

// применение формы изменения профиля
formEditProfile.addEventListener('submit', handleProfileFormSubmit);

// применение формы добавления места
formAddPlace.addEventListener('submit', handlePlaceFormSubmit);

// включить анимацию на страничке
setTimeout(() => document.querySelector('.preload').classList.remove('preload'), 500)