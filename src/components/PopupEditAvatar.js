import Popup from "./Popup.js";

export default class PopupEditAvatar extends Popup {
  constructor( { 
    popupConfig, popupSelector, inputSelector, formName, 
    btnSubmitSelector, btnSubmitFetchCondition,
  }, updateUrlOnServer ){
    super( popupConfig, popupSelector );
    this._formName = formName;
    this._form = document.forms[ formName ];
    this._updateUrlOnserver = updateUrlOnServer;
    this._btnSubmitFetchCondition = btnSubmitFetchCondition;

    this._input = this._form.querySelector( inputSelector );
    this._btnSubmit = this._form.querySelector( btnSubmitSelector );
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener( 'submit', (ev) => {
      ev.preventDefault();
      this._fetchCondition();
   });
  }

  _fetchCondition() {
    const btnSubmitOriginalText = this._btnSubmit.textContent;
    this._btnSubmit.textContent = this._btnSubmitFetchCondition;
    this._updateUrlOnserver()
      .then( () => this._btnSubmit.textContent = btnSubmitOriginalText )
      .catch( err => console.log( err ) )
      .finally( () => this.close() );
  }

  getNewUrl() {
    return this._input.value;
  }

  close() {
    this._form.reset(); // сначала стереть
    super.close();
  }
}