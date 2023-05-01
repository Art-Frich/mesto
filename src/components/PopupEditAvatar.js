import Popup from "./Popup.js";

export default class PopupEditAvatar extends Popup {
  constructor( { 
    popupConfig, popupSelector, inputSelector, formName 
  }, updateUrlOnServer ){
    super( popupConfig, popupSelector );
    this._inputSelector = inputSelector;
    this._formName = formName;
    this._form = document.forms[ formName ];
    this._input = this._form.querySelector( inputSelector );
    this._updateUrlOnserver = updateUrlOnServer;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener( 'submit', (ev) => {
      ev.preventDefault();
      this._updateUrlOnserver();
      this.close();
    });
  }

  getNewUrl() {
    return this._input.value;
  }

  close() {
    this._form.reset(); // сначала стереть
    super.close();
  }
}