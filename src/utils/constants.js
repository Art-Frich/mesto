// Кнопки
export const btnEditProfile = document.querySelector('.profile__btn-edit');
export const btnAddPlace = document.querySelector('.profile__btn-add');

// Селекторы
export const selectorCards = '.places__grid';

// Служебные
const inputSelector = '.popup__input';
const popupConfig = {
  classBtnClose: 'popup__btn-close',
  classPopupOpened: 'popup_opened'
}

// Конфиги
export const popupWithImageConfig = {
  popupConfig: popupConfig,
  popupSelector: '.popup_type_full-img-place',
  figureSelector: '.popup__figure',
  imgSelector: '.popup__img',
  figcaptionSelector: '.popup__figcaption'
}

export const popupAddPlaceConfig = {
  popupConfig: popupConfig,
  inputSelector: inputSelector,
  popupSelector: '.popup_type_add-place',
  nameForm: 'addNewPlace'
}

export const popupEditProfileConfig = {
  popupConfig: popupConfig,
  inputSelector: inputSelector,
  popupSelector: '.popup_type_edit-profile',
  nameForm: 'editProfileText'
}

export const userInfoConfig = {
  selectorNameUserContainer: '.profile__title-name',
  selectorUserAboutContainer: '.profile__subtitle'
}

export const validateConfig = {
  inputSelector: inputSelector,
  submitBtnSelector: '.popup__btn-save-edit',
  inputUnvalidateSelector: '.popup__input_type_error',
  errorSelector: '.popup__error',
};

export const cardConfig = {
  cardSelector: '.places__grid-item',
  imgSelector: '.card__photo',
  titleSelector: '.card__title',
  likeSelector: '.card__like',
  btnDelSelector: '.card__del-card-btn',
  classLikeActive: 'card__like_active',
  templateSelector: '.template'
}