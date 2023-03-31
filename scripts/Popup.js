export default class Popup {
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
  close() {
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