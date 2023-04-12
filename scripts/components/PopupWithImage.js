/**
 * класс наследуемый от Popup. Работает с модальным окном full image
 */
export default class PopupWithImage extends Popup {
  /**
   * 
   * @param {object} popupConfig 
   * @param {string} figureSelector
   * @param {string} imgSelector
   * @param {string} figcaptionSelector
   */
  constructor( { 
    popupConfig, 
    figureSelector, 
    imgSelector,
    figcaptionSelector  
  } ) {
    super( popupConfig );
    this._figure = document.querySelector(`.${ figureSelector }`);
    this._figureImg = this._figure.querySelector(`.${ imgSelector }`);
    this._figcaption = this._figure.querySelector( `.${ figcaptionSelector }` );
  }

  /**
   * открывает модальное окно с изображением карточки
   * @param {URL} placeImgSrc 
   * @param {string} placeName 
   */
  open = ( placeImgSrc, placeName ) => {
    this._figureImg.src = placeImgSrc;
    this._figureImg.alt = placeName;
    this._figcaption.textContent = placeName;
    super.open();
  }
}