/**
 * класс описывает общий функционал всех popup-окон
 */
export default class Popup {
  /**
   * 
   * @param {string} classBtnClose
   * @param {string} classPopupOpened
   * @param {string} classPopup
   */
  constructor( { classBtnClose, classPopupOpened }, classPopup ) {
    this._classPopupOpened = classPopupOpened;
    this._classBtnClose = classBtnClose;
    this._popup = document.querySelector( `.${ classPopup }` );
  }

  /**
   * Открыть попап
   * повесить слушатель-закрывашку по клику на esc
   * @param {HTMLElement} popupElement
   */
  open() {
    if ( !this._popup.classList.contains( this._classPopupOpened ) ) {
      this._popup.classList.add( this._classPopupOpened );
      document.addEventListener( 'keydown', ( ev ) => { 
        this._handleEscClose( ev )
      } );
    }
  }

  _handleEscClose( ev ) {
    if ( ev.key === 'Escape' ) { this.close(); }
  }

  /**
   * Закрыть попап и снять слушатель-закрывашку
   */
  close() {
    if ( this._popup.classList.contains( this._classPopupOpened ) ) {
      this._popup.classList.remove( this._classPopupOpened );
      document.removeEventListener( 'keydown', ( ev ) => {
        this._handleEscClose( ev ) 
      } );
    }
  }

  /**
   * Установка слушателей закрывашек 
   * по клику на крестик и оверлей
   */
  setEventListeners() {
    this._popup.addEventListener( 'mousedown', ev => {
      if (ev.target.classList.contains( this._classPopupOpened ) || 
          ev.target.classList.contains( this._classBtnClose )) {
        this.close();
      } 
    } );
  }
}