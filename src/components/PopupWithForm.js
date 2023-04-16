import Popup from "./Popup.js";

/**
 * класс описывает дополнительный функционал для popup с картинкой карточки
 */
export default class PopupWithForm extends Popup {
  /**
   * 
   * @param {object} popupConfig - классы передаваемые в Popup
   * @param {string} inputSelector - класс, по которому можно найти input-элементы
   * @param {string} popupSelector - класс рабочего popup-окна
   * @param {string} nameForm - атрибут name html элемента формы внутри рабочего popup-окна
   * @param {Function} callbackSubmit - обработчик submit события
   */
  constructor ( { 
    popupConfig, inputSelector, popupSelector, nameForm
  }, callbackSubmit ) {

    super( popupConfig, popupSelector );
    this._callbackSubmit = callbackSubmit;
    this._classInput = inputSelector;
    
    this._form = document.forms[nameForm];
    this._inputs = Array.from( 
      this._form.querySelectorAll( this._classInput )
    );
  }
  
  /**
   * устанавливает в input-элементы указанные значения
   * @param {Array} values - массив значений для input-элементов 
   */
  setInputValues = ( values ) => {
    this._inputs.forEach( ( input, i ) =>
      input.value = values[ i ]
    );
  }

  _getInputValues() {
    const data = [];
    this._inputs.forEach( input => {
      data.push( input.value );
    })
    return data;
  }

  /**
   * устанавливает слушатели закрывашки, а также submit - события для текущего popup-окна
   */
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener( 'submit', (ev) => {
      ev.preventDefault();
      this._callbackSubmit( this._getInputValues() )
    });
  }

  /**
   * закрывает текущий popup, предварительно очищая форму
   */
  close() {
    this._form.reset(); // сначала стереть
    super.close();
  }

  /**
   * открывает текущий popup, предварительно устанавливая корректное состояние кнопки
   */
  open() {
    // this._callResetEventForInput();
    super.open();
  }
}