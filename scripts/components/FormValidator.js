/**
 * Класс, представляющий валидацию формы
 */
export default class FormValidator {
  /**
   * Создать экземпляр формы под валидацию
   * 
   * @param {Object} config - необходимые селекторы
   * @param {Node} form - форма
   */
  constructor( config, form ) {
    this._inputUnvalidateClass = config.inputUnvalidateClass;
    this._form = form;
    this._inputList = this._getFormElements( form, config.inputSelector );
    this._errorList = this._getFormElements( form, config.errorClass );
    this._btnSubmit = form.querySelector( `.${ config.submitBtnSelector }` );
  }

  /**
   * Получить массив элементов из формы
   * 
   * @method
   * @private
   * @param {HTMLFormElement} form - форма
   * @param {string} formSelector - селектор поиска внутри формы
   * @returns {Array<HTMLElement>} - массив элементов формы
   */
  _getFormElements = ( form, formSelector ) => {
    return Array.from( form.querySelectorAll( `.${ formSelector }` ) );
  }

  _hasInvalidInput = () => {
    return this._inputList.some( input => !input.validity.valid );
  }

  _showInputError = ( textError, errorElement, inputElement ) => {
    inputElement.classList.add( `${ this._inputUnvalidateClass }` );
    errorElement.textContent = textError;
  }

  _hideInputError = ( errorElement, inputElement ) => {
    inputElement.classList.remove( `${ this._inputUnvalidateClass }` );
    errorElement.textContent = '';
  } 

  _checkInputValidity = ( inputElement, errorElement ) => {
    inputElement.validity.valid 
      ? this._hideInputError ( errorElement, inputElement ) 
      : this._showInputError (
          inputElement.validationMessage, 
          errorElement, 
          inputElement
        );
  }

  _toggleButtonState = () => {
    this._hasInvalidInput() ?
      this._btnSubmit.setAttribute( 'disabled', true ):
      this._btnSubmit.removeAttribute( 'disabled' );
  }

    /**  
   * из-за модульного подключения toggleButtonState срабатывает быстрее
   * чем очистка input внутри index.js, поэтому переместим эту фукнцию
   * в конец очереди через setTimeout
   */
  _setEventListeners = () => {
    this._form.addEventListener('submit', ev => {
      ev.preventDefault();
      setTimeout( this._toggleButtonState, 0 );
    });

    this._inputList.forEach( ( inputElement, index ) => {
      inputElement.addEventListener( 'input', () => {
        this._checkInputValidity( inputElement, this._errorList[index] );
        this._toggleButtonState();
      });
    })
  } 

  /**
   * Включить валидацию переданной формы
   */
  enableValidation = () => {
    this._setEventListeners();
  };
}