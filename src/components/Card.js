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
  constructor({ 
    placeName, placeImgSrc, likes,
    config, ownerId, myId, handleCardClick,
    confirmDelete, setLikeOnServer, deleteLikeFromServer 
  }) {
    // Примечание: очень громоздкий конструктор
    this._placeName = placeName;
    this._placeImgSrc = placeImgSrc; 
    this._likes = likes;
    this._countLike = likes.length || 0;
    this._ownerCardId = ownerId;
    this._myId = myId;
    this._handeCardClick = handleCardClick;
    this._confirmDelete = confirmDelete;
    this._setLikeOnServer = setLikeOnServer;
    this._deleteLikeFromServer = deleteLikeFromServer;

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

    this._isLikeInProcess = false; // флаг для корректной обработки дабл-клика по лайку
  }

  _getPlaceElement = () => {
    return document
      .querySelector( this._templateSelector )
      .content
      .querySelector( this._placesItemSelector )
      .cloneNode( true );
  } 

  _toggleLikeConditionOnserver = () => {
    return this._imgLike.classList.contains( this._classLikeActive ) 
      ? this._deleteLikeFromServer()
      : this._setLikeOnServer()
  }

  _toggleLikeCondition = () => {
    if ( this._isLikeInProcess === false ) {
      this._isLikeInProcess = true;
      this._toggleLikeConditionOnserver()
        .then( data => {
          this._countLikeConitainer.textContent = data.likes.length;
          this._doLikeActive();
        })
        .catch( err => console.log( err ) )
        .finally( () => this._isLikeInProcess = false );
    }
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
    this._checkOwner();
    this._checkMyLike();
  }

  _checkOwner = () => {
    if ( this._ownerCardId === this._myId ) {
      this._btnPlaceDel.classList.add( this._btnDellHiddenClass );
    }
  }

  _doLikeActive = () => {
    this._imgLike.classList.toggle( this._classLikeActive );
  }

  _checkMyLike = () => {
    this._likes.forEach( element => {
      if ( element._id === this._myId ) {
        this._doLikeActive();
      }
    });
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