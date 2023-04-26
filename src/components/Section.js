/**
 * класс работающий с разметкой
 */
export default class Section {
  /**
   * @param {Array} items - набор данных для исходных карточек 
   * @param {Function} renderer - callback для рендеринга исходного массива карточек
   * @param {string} selectorCards - селектор html-блока со всеми карточками
   */
  constructor( selectorCards ) {
    this._cards = document.querySelector( selectorCards )
  }

  /**
   * добавить новую карточку в разметку
   * @param {HTMLElement} newElement - готовый html элемент для вставки
   */
  addItem = ( newElement ) => {
    this._cards.prepend( newElement );
  }
}