import Popup from "./Popup.js";

/**
 * Класс описывает функционал модального окна подтверждения удаления карточки
 */
export default class PopupCardDelete extends Popup{
  /**
   * @constructor
   * @param {object} popupConfig
   * @param {string} popupSelector
   * @param {string} nameForm
   */
  constructor({ 
    popupConfig, popupSelector, nameForm, 
    btnSubmitSelector, btnSubmitFetchCondition 
  }) {
    super( popupConfig, popupSelector );
    this._delCard;
    this._form = document.forms[nameForm];
    this._btnSubmitFetchCondition = btnSubmitFetchCondition;
    this._btnSubmit = this._form.querySelector( btnSubmitSelector );
    this._btnSubmitOriginalText = this._btnSubmit.textContent;
  }

  /**
   * Устанавливает слушатели на модальное окно.
   */
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener( 'submit', (ev) => {
      this._btnSubmit.textContent = this._btnSubmitFetchCondition;
      ev.preventDefault();
      this._delCard();
    });
  }

  /**
   * Открывает модальное окно подтвержедения удаления карточки.
   * Прокидыает функцию удаления конкретно этой карточки.
   * @param {Function} callback 
   */
  open( callback ) {
    this._delCard = callback;
    super.open()
  }
}