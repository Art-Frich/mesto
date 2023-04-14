/**
 * класс работающий с информацией о пользователе на странице
 */
export default class UserInfo {
  /**
   * 
   * @param {string} selectorNameUserContainer
   * @param {string} selectorUserAboutContainer
   */
  constructor( { 
    selectorNameUserContainer, 
    selectorUserAboutContainer 
  } ) {
    this._nameContainer = document.querySelector( `.${selectorNameUserContainer}` );
    this._aboutContainer = document.querySelector( `.${selectorUserAboutContainer}` );
  }

  /**
   * позволяет получить текущие данные пользователя
   * @returns возвращает массив вида [name, about]
   */
  getUserInfo = () => {
    return [
      this._nameContainer.textContent,
      this._aboutContainer.textContent 
    ]
  }

  /**
   * позволяет установить новые данные пользователя
   * @param {string} newName 
   * @param {string} newAbout 
   */
  setUserInfo( newName, newAbout ) {
    this._nameContainer.textContent = newName;
    this._aboutContainer.textContent = newAbout;
  }
}