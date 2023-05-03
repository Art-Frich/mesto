/**
 * Класс, представляющий валидацию формы
 */
export default class FormValidator {
  /**
   * Создать экземпляр формы под валидацию
   * @constructor
   * @param {Object} config - необходимые селекторы
   * @param {Node} form - форма
   */
  constructor( config, form ) {
    this._inputUnvalidateClass = config.inputUnvalidateClass;
    this._form = form;
    this._inputList = this._getFormElements( form, config.inputSelector );
    this._errorList = this._getFormElements( form, config.errorSelector );
    this._btnSubmit = form.querySelector( config.submitBtnSelector );
  }

  _getFormElements = ( form, formSelector ) => {
    return Array.from( form.querySelectorAll( formSelector ) );
  }

  _hasInvalidInput = () => {
    return this._inputList.some( input => !this._checkValidity( input ));
  }

  _showInputError = ( textError, errorElement, inputElement ) => {
    inputElement.classList.add( this._inputUnvalidateClass );
    errorElement.textContent = textError;
  }

  _hideInputError = ( errorElement, inputElement ) => {
    inputElement.classList.remove( this._inputUnvalidateClass );
    errorElement.textContent = '';
  } 

  _checkInputValidity = ( inputElement, errorElement ) => {
    this._checkValidity( inputElement )
      ? this._hideInputError ( errorElement, inputElement ) 
      : this._showInputError (
          inputElement.validationMessage, 
          errorElement, 
          inputElement
        );
  }

  _checkValidity( item ) {
    return item.validity.valid;
  }

  _toggleButtonState = () => {
    this._hasInvalidInput() ?
      this._btnSubmit.setAttribute( 'disabled', true ):
      this._btnSubmit.removeAttribute( 'disabled' );
  }

  // Примечание: если не использовать preventDefault, очищать инпуты не потребуется,
  // но потребуется setTimeout (сначала reset, затем toggleButtonState)
  // иначе reset выполнится после вложенного кода аналогично submit
  _setEventListeners = () => {
    this._form.addEventListener( 'reset', ev => {
      ev.preventDefault();
      this._inputList.forEach( ( inputElement, index ) => {
        inputElement.value = '';
        this._hideInputError( this._errorList[ index ], inputElement );
      });
      this._toggleButtonState();
    })

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