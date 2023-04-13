// Кнопки
export const btnEditProfile = document.querySelector('.profile__btn-edit');
export const btnAddPlace = document.querySelector('.profile__btn-add');

// Селекторы
export const selectorCards = 'places__grid';

// Служебные
const classInput = 'popup__input';
const popupConfig = {
  classBtnClose: 'popup__btn-close',
  classPopupOpened: 'popup_opened'
}

// Конфиги
export const popupWithImageConfig = {
  popupConfig: popupConfig,
  classPopup: 'popup_type_full-img-place',
  figureSelector: 'popup__figure',
  imgSelector: 'popup__img',
  figcaptionSelector: 'popup__figcaption'
}

export const popupAddPlaceConfig = {
  popupConfig: popupConfig,
  classInput: classInput,
  classPopup: 'popup_type_add-place',
  nameForm: 'addNewPlace'
}

export const popupEditProfileConfig = {
  popupConfig: popupConfig,
  classInput: classInput,
  classPopup: 'popup_type_edit-profile',
  nameForm: 'editProfileText'
}

export const userInfoConfig = {
  selectorNameUserContainer: 'profile__title-name',
  selectorUserAboutContainer: 'profile__subtitle'
}

export const validateConfig = {
  inputSelector: classInput,
  submitBtnSelector: 'popup__btn-save-edit',
  inputUnvalidateClass: 'popup__input_type_error',
  errorClass: 'popup__error',
};

export const cardConfig = {
  cardSelector: 'places__grid-item',
  imgSelector: 'card__photo',
  titleSelector: 'card__title',
  likeSelector: 'card__like',
  btnDelSelector: 'card__del-card-btn',
  classLikeActive: 'card__like_active',
  templateSelector: 'template'
}