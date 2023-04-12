// блокировка двойного нажатия
export function unblockBtn() {
  return !this._unblockBtn.block;
}

// открыть изображение места 
export function openImgFull( imgSrc, placeName ) { 
  this._img.src = imgSrc;
  this._img.alt = placeName;
  popupFigureFigcaption.textContent = placeName
  openPopup( popupFigure ); 
} 