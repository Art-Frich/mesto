import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor ( classPopup, addPlaceFunc ) {
    super( classPopup );
    this._addPlaceFunc = addPlaceFunc;

    // этот хардкод надо бы уточнить и ситуативно поправить либо все попапы так, либо вынести в config

    // попап профиля
    this._popupEditProfile = document.querySelector('.popup_type_edit-profile');
    this._nameUserInput = this._popupEditProfile.querySelector('.popup__input_type_name-user');
    this._aboutInput = this._popupEditProfile.querySelector('.popup__input_type_about');

    // попап места
    this._popupAddPlace = document.querySelector('.popup_type_add-place');
    this._namePlaceInput = this._popupAddPlace.querySelector('.popup__input_type_name-place');
    this._urlInput = this._popupAddPlace.querySelector('.popup__input_type_url');

    // профиль
    this._profile = document.querySelector('.profile');
    this._nameUserValue = this._profile.querySelector('.profile__title-name');
    this._userAboutValue = this._profile.querySelector('.profile__subtitle');

  }

  _resetInput = ( ev ) => {
    const form = ev.target.closest( '.popup__form' );
    form.reset();
  }
  
  // блокировка двойного нажатия
  _unblockBtn = () => {
    return !this._unblockBtn.block;
  }
  
  /**
   * Обработка события submit у формы редактирования профиля
   * @param {Event} ev - событие submit
   */
  handleProfileFormSubmit = ( ev ) => {
    ev.preventDefault();
    this._nameUserValue.textContent = this._nameUserInput.value;
    this._userAboutValue.textContent = this._aboutInput.value;
    super.close();
  }
  
  // дейсвтия для submit PlaceForm
  /**
   * Обработка события submit у формы добавления места
   * @param {Event} ev - событие submit
   */
  handlePlaceFormSubmit = ( ev ) => {
    ev.preventDefault();
    if ( this._unblockBtn() ) {
      this._unblockBtn.block = true;
      this._addPlaceFunc( this._namePlaceInput.value, this._urlInput.value );
      super.close();
      this._resetInput( ev );
      setTimeout( () => { this._unblockBtn.block = false; }, 500 );
    }
  }

  // открыть попап изменения данных профиля
  openEditProfilePopup = () => {
    this._nameUserInput.value = this._nameUserValue.textContent;
    this._aboutInput.value = this._userAboutValue.textContent;
    super.open( this._popupEditProfile );
  };

  openAddPlacePopup = () => {
    super.open( this._popupAddPlace );
  }
}