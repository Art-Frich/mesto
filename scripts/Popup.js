class Popup {
  /**
   * @param {string} classPopupOpened
   */
  constructor( classPopupOpened ) {
    this._classPopupOpened = classPopupOpened;
  }

  /**
   * Открыть попап и повесить слушатель-закрывашку
   * @method
   */
  _openPopup( popupElement ) {
    popupElement.classList.add( this._classPopupOpened );
    document.addEventListener( 'keydown', this._handleKey );
  }

  // обработчик нажатий
  _handleKey = ( ev ) => {
    if ( ev.key === 'Escape' ) { this._closePopup(); }
  }

  /**
   * Закрыть попап и снять слушатель-закрывашку
   * @method
   */
   _closePopup = () => {
    const popup = document.querySelector( `.${ this._classPopupOpened }` );
    if (popup) {
      popup.classList.remove( this._classPopupOpened );
      document.removeEventListener( 'keydown', this._handleKey );
    }
  }

}

/**
 * класс наследуемый от Popup. Работает с модальным окном full image
 */
class PopupWithImage extends Popup {
  /**
   * @param {string} classPopupOpened 
   */
  constructor( moduleImgConfig, classPopupOpened ) {
    super( classPopupOpened );

    this._popupFigure = document
      .querySelector( `.${ moduleImgConfig.figureSelector }` );

    this._popupFigureImg = this._popupFigure
      .querySelector( `.${ moduleImgConfig.imgSelector }` );

    this._popupFigureFigcaption = this._popupFigure
      .querySelector( `.${ moduleImgConfig.figcaptionSelector }` );

    this.openImgFullOnClick.bind( this );
  }

  openImgFullOnClick = ( placeImgSrc, placeName ) => {
    this._popupFigureImg.src = placeImgSrc;
    const imgAlt = placeName;
    this._popupFigureImg.alt = imgAlt;
    this._popupFigureFigcaption.textContent = imgAlt;
    super._openPopup( this._popupFigure );
  }
}

export { PopupWithImage };