import Popup from "./Popup.js";
/**
 * класс наследуемый от Popup. Работает с модальным окном full image
 */
export default class PopupWithImage extends Popup {
  /**
   * 
   * @param {object} popupConfig - классы передаваемые в Popup
   * @param {string} popupSelector - класс рабочего popup-окна
   * @param {string} figureSelector - селектор элемента с картинкой и подписью
   * @param {string} imgSelector - селектор картинки внутри фигуры
   * @param {string} figcaptionSelector - селектор подписи внутри фигуры
   */
  constructor( { 
    popupConfig,
    popupSelector,
    figureSelector, 
    imgSelector,
    figcaptionSelector  
  } ) {
    
    super( popupConfig, popupSelector );
    this._figure = document.querySelector( figureSelector );
    this._figureImg = this._figure.querySelector( imgSelector );
    this._figcaption = this._figure.querySelector( figcaptionSelector );
  }

  /**
   * открывает модальное окно с изображением карточки
   * @param {URL} placeImgSrc - url к картинке
   * @param {string} placeName - название к карточке
   */
  open( placeImgSrc, placeName ) {
    this._figureImg.src = placeImgSrc;
    this._figureImg.alt = placeName;
    this._figcaption.textContent = placeName;
    super.open();
  }
}