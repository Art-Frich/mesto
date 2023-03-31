import Popup from "./Popup.js";

/**
 * класс наследуемый от Popup. Работает с модальным окном full image
 */
export default class PopupWithImage extends Popup {
  /**
   * @param {string} classPopupOpened 
   */
  constructor( popupWithImgConfig, classPopup ) {
    super( classPopup );

    this._popupFigure = document
      .querySelector( `.${ popupWithImgConfig.figureSelector }` );

    this._popupFigureImg = this._popupFigure
      .querySelector( `.${ popupWithImgConfig.imgSelector }` );

    this._popupFigureFigcaption = this._popupFigure
      .querySelector( `.${ popupWithImgConfig.figcaptionSelector }` );

    // this.openImgFullOnClick.bind( this );
  }

  open = ( placeImgSrc, placeName ) => {
    this._popupFigureImg.src = placeImgSrc;
    const imgAlt = placeName;
    this._popupFigureImg.alt = imgAlt;
    this._popupFigureFigcaption.textContent = imgAlt;
    super.open( this._popupFigure );
  }
}