import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor ( { 
    popupConfig, classInput, classPopup, nameForm
  }, callbackSubmit ) {
    super( popupConfig, classPopup );
    this._callbackSubmit = callbackSubmit;
    this._classInput = classInput;
    
    this._form = document.forms[nameForm];
    this.inputs = Array.from( 
      this._form.querySelectorAll( `.${ this._classInput }` )
    );
    this.setEventListeners();
  }

  _getInputValues() {
    const data = [];
    this.inputs.forEach( input => {
      data.push( input.value );
    })
    return data;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener( 'submit', () => {
      this._callbackSubmit( this._getInputValues() )
    });
  }

  close = () => {
    this._form.reset();
    super.close();
  }
}