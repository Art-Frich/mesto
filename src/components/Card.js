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
   * @param {function} handeCardClick - callback клика по картинке
   */
  constructor ( { 
    placeName, placeImgSrc, countLike, config, ownerId, myId, handleCardClick }, confirmDelete 
  ) {
    this._placeName = placeName;
    this._placeImgSrc = placeImgSrc; 
    this._countLike = countLike;
    this._handeCardClick = handleCardClick;
    this._confirmDelete = confirmDelete;
    this._ownerCardId = ownerId;
    this._myId = myId;

    this._templateSelector = config.templateSelector;
    this._placesItemSelector = config.cardSelector;
    this._classLikeActive = config.classLikeActive;
    this._btnDellHiddenClass = config.btnDellHiddenClass;

    this._placeElement = this._getPlaceElement();
    this._img = this._placeElement.querySelector( config.imgSelector );
    this._imgTitle = this._placeElement.querySelector( config.titleSelector );
    this._imgLike = this._placeElement.querySelector( config.likeSelector );
    this._btnPlaceDel = this._placeElement.querySelector( config.btnDelSelector );
    this._countLikeConitainer = this._placeElement.querySelector( config.countLikeSelector );
  }

  _getPlaceElement = () => {
    return document
      .querySelector( this._templateSelector )
      .content
      .querySelector( this._placesItemSelector )
      .cloneNode( true );
  } 

  _toggleLikeCondition = () => {
    this._imgLike.classList.toggle( this._classLikeActive );
  }

  _setEventListeners = () => {
    this._img.addEventListener( 'click', () => {
      this._handeCardClick( this._placeImgSrc, this._placeName )
    } );
    this._imgLike.addEventListener( 'mousedown', this._toggleLikeCondition );
    this._btnPlaceDel.addEventListener( 'click', this._confirmDelete );
  }

  deleteOnClick() {
    this._placeElement.remove();
    this._placeElement = null;
  };

  _fillPlaceImg = () => {
    this._img.src = this._placeImgSrc;
    this._img.alt += ` ${ this._placeName }`; 
    this._imgTitle.textContent = this._placeName;
    this._countLikeConitainer.textContent = this._countLike;
    if ( this._ownerCardId === this._myId ) {
      this._btnPlaceDel.classList.add( this._btnDellHiddenClass );
    }
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