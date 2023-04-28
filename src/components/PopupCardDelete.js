import Popup from "./Popup.js";

export default class PopupCardDelete extends Popup{
  constructor( { popupConfig, popupSelector, nameForm } ) {
    super( popupConfig, popupSelector );
    this._delCard;
    this._form = document.forms[nameForm];
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener( 'submit', (ev) => {
      ev.preventDefault();
      this._delCard();
      this.close();
    });
  }

  open( callback ) {
    this._delCard = callback;
    super.open()
  }
}