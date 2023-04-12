export default class Section {
  constructor( { items, renderer }, selectorCards ) {
    this._initialCards = items;
    this._renderer = renderer;
    this._cards = document.querySelector( `.${ selectorCards }` )
  }

  addInitialCards = () => {
    this._initialCards.forEach( cardData => {
      this._renderer( cardData );
    })
  }

  addItem = ( newElement ) => {
    this._cards.prepend( newElement );
  }
}