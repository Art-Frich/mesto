class Popup {
  /**
   * @param {string} classPopupOpened
   */
  constructor( classPopup ) {
    this._classPopup = classPopup;
    this._classPopupOpened = `${ classPopup }_opened`;
  }

  /**
   * Открыть попап и повесить слушатель-закрывашку
   * @method
   */
  openPopup( popupElement ) {
    popupElement.classList.add( this._classPopupOpened );
    document.addEventListener( 'keydown', this._handleKey );
  }

  // обработчик нажатий
  _handleKey = ( ev ) => {
    if ( ev.key === 'Escape' ) { this.closePopup(); }
  }

  /**
   * Закрыть попап и снять слушатель-закрывашку
   * @method
   */
  closePopup = () => {
  const popup = document.querySelector( `.${ this._classPopupOpened }` );
    if (popup) {
      popup.classList.remove( this._classPopupOpened );
      document.removeEventListener( 'keydown', this._handleKey );
    }
  }

  setEventListeners() {
    // события закрывашки попапов
    this._popupList.forEach((item) => {
      item.addEventListener('mousedown', ev => {
        if (ev.target.classList.contains(classPopupOpened) || 
            ev.target.classList.contains(classBtnClose)) {
              closePopup();
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
  constructor( moduleImgConfig, classPopup ) {
    super( classPopup );

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
    super.openPopup( this._popupFigure );
  }
}

export { PopupWithImage };