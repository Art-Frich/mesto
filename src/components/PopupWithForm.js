import Popup from "./Popup.js";

/**
 * класс описывает дополнительный функционал для popup с картинкой карточки
 */
export default class PopupWithForm extends Popup {
  /**
   * @constructor
   * @param {object} popupConfig - классы передаваемые в Popup
   * @param {string} inputSelector - класс, по которому можно найти input-элементы
   * @param {string} popupSelector - класс рабочего popup-окна
   * @param {string} nameForm - атрибут name html элемента формы внутри рабочего popup-окна
   * @param {string} btnSubmitSelector - класс кнопки формы ответственной за submit
   * @param {string} btnSubmitFetchCondition - текст, который должен отобразиться внутри кнопки на время fetch-запроса
   * @param {Function} callbackSubmit - обработчик submit события
   */
  constructor ({ 
    popupConfig, inputSelector, popupSelector, nameForm, 
    btnSubmitSelector, btnSubmitFetchCondition
  }, callbackSubmit ) {

    super( popupConfig, popupSelector );
    this._callbackSubmit = callbackSubmit;
    this._classInput = inputSelector;
    this._btnSubmitFetchCondition = btnSubmitFetchCondition;
    
    this._form = document.forms[nameForm];
    this._inputs = Array.from( 
      this._form.querySelectorAll( this._classInput )
    );
    this._btnSubmit = this._form.querySelector( btnSubmitSelector );
  }

  /**
   * устанавливает в input-элементы указанные значения
   * @param {Array} values - массив значений для input-элементов 
   */
  // Примечание: слабым местом такой реализации выступает соответствие ключа и значения атрибута
  // Значение ключа же задаётся в классе UserInfo, который ничего не знает о PopupWithForm
  setInputValues = ( values ) => {
    this._inputs.forEach( ( input, i ) =>
      input.value = values[ input.getAttribute( 'name' ) ]
    );
  }

  // Примечание: такая реализация не работает
  // _getInputValues() {
  //   return this._inputs.reduce((data, input) => 
  //     data[input.getAttribute('name')] = input.value, 
  //     {}
  //   );
  // }
  _getInputValues() {
    return this._inputs.reduce((data, input) => {
      data[input.getAttribute('name')] = input.value;
      return data;
    }, {});
  }

  /**
   * устанавливает слушатели закрывашки, а также submit - события для текущего popup-окна
   */
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener( 'submit', (ev) => {
      ev.preventDefault();
      this._fetchCondition();
    });
  }

  /**
   * Улучшает UX опыт - изменяет надпись кнопки-submit на время fetch-запроса.
   * После возвращает её текст к исходному состоянию
   */
  _fetchCondition() {
    const btnSubmitOriginalText = this._btnSubmit.textContent;
    this._btnSubmit.textContent = this._btnSubmitFetchCondition;
    this._callbackSubmit( this._getInputValues() )
      .then( () => this._btnSubmit.textContent = btnSubmitOriginalText )
      .catch( err => console.log( err ) )
      .finally( () => this.close() );
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
    super.open();
  }
}