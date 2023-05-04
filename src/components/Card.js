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
   * @param {Array} likes - массив объектов, каждый из которых содержит информацию о пользователе поставившем лайк данной карточке
   * @param {object} config - словарик всех необходимых селекторов
   * @param {string} ownerId - id владельца карточки
   * @param {string} myId - id текущего пользователя
   * 
   * @param {function} handeCardClick - callback клика по картинке
   * @param {function} confirmDelete - подтвердить удаление карточки
   * @param {function} setLikeOnServer - отправляет на сервер запрос об установке лайка
   * @param {function} deleteLikeFromServer - отправляет на сервер запрос о снятии лайка 
   */
  // Примечание: очень громоздкий конструктор
  constructor(
    { placeName, placeImgSrc, likes, config, ownerId, myId },
    { handleCardClick, confirmDelete, setLikeOnServer, 
      deleteLikeFromServer, handleLikeClick }
  ) {
    this._placeName = placeName;
    this._placeImgSrc = placeImgSrc; 
    this._likes = likes;
    this._ownerCardId = ownerId;
    this._myId = myId;

    this._handeCardClick = handleCardClick;
    this._confirmDelete = confirmDelete;
    this._setLikeOnServer = setLikeOnServer;
    this._deleteLikeFromServer = deleteLikeFromServer;
    this._handleLikeClick = handleLikeClick;

    this._templateSelector = config.templateSelector;
    this._placesItemSelector = config.cardSelector;
    this._classLikeActive = config.classLikeActive;
    this._btnDellHiddenClass = config.btnDellHiddenClass;

    this._placeElement = this._getPlaceElement();
    this._img = this._placeElement.querySelector( config.imgSelector );
    this._imgTitle = this._placeElement.querySelector( config.titleSelector );
    this._imgLike = this._placeElement.querySelector( config.likeSelector );
    this._btnPlaceDel = this._placeElement.querySelector( config.btnDelSelector );
    this._countLikeContainer = this._placeElement.querySelector( config.countLikeSelector );

    this._isLikeInProcess = false; // флаг для корректной обработки дабл-клика по лайку
  }

  /**
   * 
   * @returns {Node} html код из шаблона для карточки
   */
  _getPlaceElement = () => {
    return document
      .querySelector( this._templateSelector )
      .content
      .querySelector( this._placesItemSelector )
      .cloneNode( true );
  } 

  /**
   * В зависимости от наличия или отсутсвия активного состояния лайка 
   * отправляет запрос установки или снятия лайка на сервер
   * @returns response об операции
   */
  toggleLikeConditionOnserver = () => {
    return this._imgLike.classList.contains( this._classLikeActive ) 
      ? this._deleteLikeFromServer()
      : this._setLikeOnServer()
  }

  /**
   * Блокирует клики по лайку до окончания обработки первого.
   * Обрабатывает response сервера.
   */
  _toggleLikeCondition = () => {
    if ( !this._isLikeInProcess ) {
      this.toggleflagCondition();
      this._handleLikeClick();
    }
  }

  _setEventListeners = () => {
    this._img.addEventListener( 'click', () => {
      this._handeCardClick( this._placeImgSrc, this._placeName )
    } );
    this._imgLike.addEventListener( 'mousedown', this._toggleLikeCondition );
    this._btnPlaceDel.addEventListener( 'click', this._confirmDelete );
  }

  /**
   * Метод удаляет карточку и обнуляет ссылку на ячейку памяти
   */
  deleteCard = () => {
    this._placeElement.remove();
    this._placeElement = null;
  };

  _fillCard = () => {
    this._img.src = this._placeImgSrc;
    this._img.alt += ` ${ this._placeName }`; 
    this._imgTitle.textContent = this._placeName;
    this.setCountLikes( this._likes );
    this._checkOwner();
    this._checkMyLike();
  }

  /**
   * Проверяет является ли карточка моей.
   * Скрывает кнопку удаления в противном случае
   */
  _checkOwner = () => {
    if ( this._ownerCardId === this._myId ) {
      this._btnPlaceDel.classList.add( this._btnDellHiddenClass );
    }
  }

  doLikeActive = () => {
    this._imgLike.classList.toggle( this._classLikeActive );
  }

  setCountLikes( likes ){
    this._countLikeContainer.textContent = likes.length;
  }

  toggleflagCondition = () => {
    this._isLikeInProcess 
      ? this._isLikeInProcess = false
      : this._isLikeInProcess = true;
  }

  /**
   * Проверяет есть ли среди лайков карточки мой и рендерит его
   */
  _checkMyLike = () => {
    this._likes.forEach( element => {
      if ( element._id === this._myId ) {
        this.doLikeActive();
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
    this._fillCard();
    this._setEventListeners();

    return this._placeElement;
  }
}