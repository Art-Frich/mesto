/**
 * класс работающий с разметкой
 */
export default class Section {
  /**
   * @param {Function} funRenderer - callback для рендеринга исходного массива карточек
   * @param {string} selectorCards - селектор html-блока со всеми карточками
   */
  constructor( funRenderer, selectorCards ) {
    this._cards = document.querySelector( selectorCards );
    this._renderer = funRenderer;
  }

  /**
   * метод для рендера карточек с сервера
   * @param {Array} data - массив объектов с данными карточки
   */
  renderCards( data ) {
    for ( let i = data.length - 1; i > -1; i-- ){
      this._renderer( data[ i ].name, data[ i ].link );
    }
  }

  /**
   * добавить новую карточку в разметку
   * @param {HTMLElement} newElement - готовый html элемент для вставки
   */
  addItem = ( newElement ) => {
    this._cards.prepend( newElement );
  }
}