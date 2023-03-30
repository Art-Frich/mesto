'use strict';

/**
 * Класс, представляющий карточку места
 */
export default class Card {
   /**
   * Создает экземпляр карточки места
   *
   * @constructor
   * @param {string} placeName - название места
   * @param {string} placeImgSrc - URL-адрес изображения места
   * @param {object} config - словарик всех необходимых селекторов
   * @param {function} openImgFunc
   */
  constructor ( placeName, placeImgSrc, config, openImgFunc ) {
    this._placeName = placeName;
    this._placeImgSrc = placeImgSrc; 
    this._openImgFunc = openImgFunc;

    this._templateSelector = config.templateSelector;
    this._placesItemSelector = config.cardSelector;
    this._classLikeActive = config.classLikeActive;

    this._placeElement = this._getPlaceElement();
    this._img = this._placeElement.querySelector( `.${ config.imgSelector }` );
    this._imgTitle = this._placeElement.querySelector( `.${ config.titleSelector }` );
    this._imgLike = this._placeElement.querySelector( `.${ config.likeSelector }` );
    this._btnPlaceDel = this._placeElement.querySelector( `.${ config.btnDelSelector }` );
  }

  /**
   * получить шаблон карточки
   * 
   * @private
   * @method
   * @returns {Node} клонирует html элемент
   */
  _getPlaceElement = () => {
    return document
      .querySelector( `.${ this._templateSelector }` )
      .content
      .querySelector( `.${ this._placesItemSelector }` )
      .cloneNode( true );
  } 

  _toggleLikeCondition = () => {
    this._imgLike.classList.toggle( this._classLikeActive );
  }

  /**
   * Установить слушатели на карточку
   * 
   * @method
   * @private
   */
  _setEventListeners = () => {
    this._img.addEventListener( 'click', () => this._openImgFunc( this._placeImgSrc, this._placeName ) );
    this._imgLike.addEventListener( 'mousedown', this._toggleLikeCondition );
    this._btnPlaceDel.addEventListener( 'click', this._deleteOnClick );
  }

  setOpenOnClick = ( imgParamets, img ) => {
    img.addEventListener("click", () => this.openImgFullOnClick( imgParamets ));
  };

  _deleteOnClick = () => {
    this._placeElement.remove();
    this._placeElement = null;
  };

  /**
   * Заполняет атрибуты <img>
   *
   * @private
   * @method
   */
  _fillPlaceImg = () => {
    this._img.src = this._placeImgSrc;
    this._img.alt += ` ${this._placeName}`; 
    this._imgTitle.textContent = this._placeName;
  }

  /**
   * Возвращает заполненный HTML-элемент карточки места.
   *
   * @method
   * @returns {Node} HTML-элемент карточки места.
   */
  getPlaceCard = () => {
    this._fillPlaceImg();
    this._setEventListeners();

    return this._placeElement;
  }
}