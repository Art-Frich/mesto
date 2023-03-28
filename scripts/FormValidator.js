'use strict';

export default class FormValidator {
  constructor( config, form ) {
    this._inputUnvalidateClass = config._inputUnvalidateClass;
    this._form = form;
    this._inputList = this._getFormElements( form, config.inputSelector );
    this._errorList = this._getFormElements( form, config.errorClass );
    this._btnSubmit = form.querySelector( `.${ config.submitBtnSelector }` );
  }

  // получить список областей к форме
  _getFormElements = ( form, formSelector ) => {
    return Array.from( form.querySelectorAll( `.${ formSelector }` ) );
  }

  // проверить валидность инпутов
  _hasInvalidInput = () => {
    let flag = true;
    this._inputList.forEach( item => {
      flag *= item.validity.valid;
    });
    return !flag;
  }

  // показать текст ошибки
  _showInputError = ( textError, errorElement, inputElement ) => {
    inputElement.classList.add( `${ this._inputUnvalidateClass }` );
    errorElement.textContent = textError;
  }

  // скрыть текст ошибки
  _hideInputError = ( errorElement, inputElement ) => {
    inputElement.classList.remove( `${ this._inputUnvalidateClass }` );
    errorElement.textContent = '';
  } 

  // проверить валидность формы и вызвать соответствующий метод
  _checkInputValidity = ( inputElement, errorElement ) => {
    inputElement.validity.valid 
      ? this._hideInputError ( errorElement, inputElement ) 
      : this._showInputError (
          inputElement.validationMessage, 
          errorElement, 
          inputElement
        );
  }

  // переключатель состояния кнопки с контроллером
  _toggleButtonState = () => {
    this._hasInvalidInput() ?
      this._btnSubmit.setAttribute( 'disabled', true ):
      this._btnSubmit.removeAttribute( 'disabled' );
  }

  // устанавливаем листенеры инпутам
  _setEventListeners = () => {
    // отключить действия по умолчанию для submit форм
    this._form.addEventListener('submit', ev => {
      ev.preventDefault();
      this._toggleButtonState();
    });

     // листенеры на инпуты
    this._inputList.forEach( ( inputElement, index ) => {
      inputElement.addEventListener( 'input', () => {
        this._checkInputValidity( inputElement, this._errorList[index] );
        this._toggleButtonState();
      });
    })
  } 

  // подключаем все модули валидации
  enableValidation = () => {
    this._setEventListeners();
  };
}