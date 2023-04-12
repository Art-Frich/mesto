import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor ( 
    popupConfig, classPopup, classInput, classForm, callBackSubmit 
  ) {
    super( popupConfig, classPopup );
    this._callBackSubmit = callBackSubmit;
    this._classInput = classInput;
    // строго говоря, это дубликат, он уже есть внутри Popup, но в ТЗ сказано работать с селекторами...
    this._popup = document.querySelector( `.${ classPopup }` );
    this._form = this._popup.querySelector( `.${ classForm }` );
    this._inputs = Array.from( 
      this._form.querySelectorAll( `.${ this._classInput }` )
    );
  }

  _getInputValues() {
    const data = []
    this._inputs.forEach( input => {
      data.push( input.value );
    })
  }

  setEventListeners() {
    super.setEventListeners();
    this._callBackSumbmit( this._getInputValues() );
  }

  close() {
    super.close();
    this._form.reset();
  }
}