import Popup from "./Popup.js";

export default class PopupCardDelete extends Popup{
  constructor( { popupConfig, popupSelector, nameForm } ) {
    console.log( popupSelector)
    super( popupConfig, popupSelector );
    this._form = document.forms[nameForm];
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener( 'submit', (ev) => {
      ev.preventDefault();
      this.close();
      return true;
    });
  }
}