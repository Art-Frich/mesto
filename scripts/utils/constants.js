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

// // попап профиля
// this._popupEditProfile = document.querySelector('.popup_type_edit-profile');
// this._nameUserInput = this._popupEditProfile.querySelector('.popup__input_type_name-user');
// this._aboutInput = this._popupEditProfile.querySelector('.popup__input_type_about');

// // попап места
// this._popupAddPlace = document.querySelector('.popup_type_add-place');
// this._namePlaceInput = this._popupAddPlace.querySelector('.popup__input_type_name-place');
// this._urlInput = this._popupAddPlace.querySelector('.popup__input_type_url');

// // профиль
// this._profile = document.querySelector('.profile');
// this._nameUserValue = this._profile.querySelector('.profile__title-name');
// this._userAboutValue = this._profile.querySelector('.profile__subtitle');

// // Формы
// const formAddPlace = document.forms['addNewPlace'];
// const formEditProfile = document.forms['editProfileText'];
