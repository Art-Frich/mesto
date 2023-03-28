'use strict';

export default class Card {
  constructor (placeName, placeImgSrc, templateSelector) {
    this._placeName = placeName;
    this._placeImgSrc = placeImgSrc; 
    this._templateSelector = templateSelector;

    this._placesItemSelector = '.places__grid-item';
    this._placeElement = this._getPlaceElement(); // html карточка пустая

    this._img = this._placeElement.querySelector('.places__grid-item-photo');
    this._imgTitle = this._placeElement.querySelector('.places__grid-item-title');
    this._imgLike = this._placeElement.querySelector('.places__grid-item-like');
    this._btnPlaceDel = this._placeElement.querySelector('.places__grid-item-del');
    this._classLikeActive = 'places__grid-item-like_active';

    // попап картинки
    this._popupFigure = document.querySelector('.popup_type_full-img-place');
    this._popupFigureImg = this._popupFigure.querySelector('.popup__img');
    this._popupFigureFigcaption = this._popupFigure.querySelector('.popup__figcaption');

    this._classPopupOpened = '.popup_opened';
  }

  // создать html-карточку места
  _getPlaceElement = () => {
    return document
      .querySelector( this._templateSelector )
      .content
      .querySelector( this._placesItemSelector )
      .cloneNode( true );
  } 

  // получить готовую html карточку
  getPlaceCard = () => {
    this._fillPlaceImg();
    this._setEventListeners();

    return this._placeElement;
  }

  // заполнить атрибуты <img>
  _fillPlaceImg = () => {
    this._img.src = this._placeImgSrc;
    this._img.alt += ' ' + this._placeName; 
    this._imgTitle.textContent = this._placeName;
  }

  // установить слушатели
  _setEventListeners = () => {
    this._img.addEventListener( 'click', this._openImgFull );
    this._imgLike.addEventListener( 'mousedown', this._toggleLikeCondition );
    this._btnPlaceDel.addEventListener( 'click', () => 
      this._placeElement.remove()
    );
  }

  // открыть изображение места
  _openImgFull = ( ev ) => {
    this._popupFigureImg.src = ev.target.src;
    //"изображение_" = 12 символов, с 13-го название места
    let imgAlt = ev.target.alt.slice( 12 );
    this._popupFigureImg.alt = imgAlt;
    this._popupFigureFigcaption.textContent = imgAlt;
    this._openPopup();
  }

  // открыть попап
  _openPopup = () => {
    this._popupFigure.classList.add( this._classPopupOpened );
    document.addEventListener( 'keydown', this._handleKey );
  }

  // обработчик нажатий
  _handleKey = ( ev ) => {
    //закрываем попап по клику esc
    switch ( ev.key ) {
      case 'Escape':
        this._closePopup();
        break;
    }
  }

  // закрываем попап
  _closePopup = () => {
    const popup = document.querySelector( this._classPopupOpened );
    if (popup) {
      popup.classList.remove( this._classPopupOpened );
      document.removeEventListener( 'keydown', this._handleKey );
    }
  }

  // переключить состояние лайка
  _toggleLikeCondition = ( ev ) => {
    ev.target.classList.toggle( this._classLikeActive );
  }
}