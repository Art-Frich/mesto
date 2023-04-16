/**
 * класс описывает общий функционал всех popup-окон
 */
export default class Popup {
  /**
   * 
   * @param {string} classBtnClose
   * @param {string} classPopupOpened
   * @param {string} popupSelector
   */
  constructor( { classBtnClose, classPopupOpened }, popupSelector ) {
    this._classPopupOpened = classPopupOpened;
    this._classBtnClose = classBtnClose;
    this._popup = document.querySelector( popupSelector );
    this._handleEscClose = this._handleEscClose.bind( this );
  }

  /**
   * Открыть попап
   * повесить слушатель-закрывашку по клику на esc
   * @param {HTMLElement} popupElement
   */
  open() {
    this._popup.classList.add( this._classPopupOpened );
    document.addEventListener( 'keydown', this._handleEscClose );
}

  _handleEscClose( ev ) {
    if ( ev.key === 'Escape' ) { this.close(); }
  }

  /**
   * Закрыть попап и снять слушатель-закрывашку
   */
  close() {
    this._popup.classList.remove( this._classPopupOpened );
    document.removeEventListener( 'keydown', this._handleEscClose );
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