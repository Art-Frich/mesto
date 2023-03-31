class Popup {
  /**
   * @param {string} classPopupOpened
   */
  constructor( classPopup ) {
    this._classPopup = classPopup;
    this._classPopupOpened = `${ classPopup }_opened`;
    this._popupList = document.querySelectorAll( `.${classPopup }` );
  }

  // примечание: возможно стоит вынести из класса и прокидывать как config
  static _classBtnClose = 'popup__btn-close'; 

  /**
   * Открыть попап и повесить слушатель-закрывашку
   * @method
   */
  open( popupElement ) {
    popupElement.classList.add( this._classPopupOpened );
    document.addEventListener( 'keydown', this._handleEscClose );
  }

  // обработчик нажатий
  _handleEscClose = ( ev ) => {
    if ( ev.key === 'Escape' ) { this.close(); }
  }

  /**
   * Закрыть попап и снять слушатель-закрывашку
   * @method
   */
  close = () => {
  const popup = document.querySelector( `.${ this._classPopupOpened }` );
    if (popup) {
      popup.classList.remove( this._classPopupOpened );
      document.removeEventListener( 'keydown', this._handleEscClose );
    }
  }

  /**
   * Установка слушателей закрывашек на крестик
   */
  setEventListeners() {
    this._popupList.forEach((item) => {
      item.addEventListener( 'mousedown', ev => {
        if (ev.target.classList.contains( this._classPopupOpened ) || 
            ev.target.classList.contains( Popup._classBtnClose )) {
          this.close();
        } 
      });
    })
  }

}

/**
 * класс наследуемый от Popup. Работает с модальным окном full image
 */
class PopupWithImage extends Popup {
  /**
   * @param {string} classPopupOpened 
   */
  constructor( popupWithImgConfig, classPopup ) {
    super( classPopup );

    this._popupFigure = document
      .querySelector( `.${ popupWithImgConfig.figureSelector }` );

    this._popupFigureImg = this._popupFigure
      .querySelector( `.${ popupWithImgConfig.imgSelector }` );

    this._popupFigureFigcaption = this._popupFigure
      .querySelector( `.${ popupWithImgConfig.figcaptionSelector }` );

    // this.openImgFullOnClick.bind( this );
  }

  open = ( placeImgSrc, placeName ) => {
    this._popupFigureImg.src = placeImgSrc;
    const imgAlt = placeName;
    this._popupFigureImg.alt = imgAlt;
    this._popupFigureFigcaption.textContent = imgAlt;
    super.open( this._popupFigure );
  }
}

class PopupWithForm extends Popup {
  constructor ( popupWithFormConfig, classPopup ) {
    super( classPopup );

  }



  function resetInput ( ev ) {
    const form = ev.target.closest( '.popup__form' );
    form.reset();
  }
  
  // блокировка двойного нажатия
  function unblockBtn () {
    return !unblockBtn.block;
  }
  
  /**
   * Обработка события submit у формы редактирования профиля
   * @param {Event} ev - событие submit
   */
  function handleProfileFormSubmit ( ev ) {
      ev.preventDefault();
      nameUser.textContent = nameUserInput.value;
      nameAbout.textContent = aboutInput.value;
      closePopup();
  }
  
  // дейсвтия для submit PlaceForm
  /**
   * Обработка события submit у формы добавления места
   * @param {Event} ev - событие submit
   */
  function handlePlaceFormSubmit ( ev ) {
    ev.preventDefault();
    if ( unblockBtn() ) {
      unblockBtn.block = true;
      addPlace( namePlaceInput.value, urlInput.value );
      closePopup();
      resetInput( ev );
      setTimeout( () => { unblockBtn.block = false; }, 500 );
    }
  }

  // открыть попап изменения данных профиля
btnEdit.addEventListener( 'click', () => {
  nameUserInput.value = nameUser.textContent;
  aboutInput.value = nameAbout.textContent;
  openPopup( popupEditProfile );
});

// открыть форму-попап добавления места 
btnAddPlace.addEventListener( 'click', () => openPopup(popupAddPlace) );

// применение формы изменения профиля
formEditProfile.addEventListener( 'submit', handleProfileFormSubmit );

// применение формы добавления места
formAddPlace.addEventListener( 'submit', handlePlaceFormSubmit );
}

export { PopupWithImage, Popup };