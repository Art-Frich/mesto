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
    // Примечание: при увеличении количества полей данных, код линейно вырастет в объеме
    this._nameContainer = document.querySelector( selectorNameUserContainer );
    this._aboutContainer = document.querySelector( selectorUserAboutContainer );
  }

  /**
   * позволяет получить текущие данные пользователя
   * @returns возвращает массив вида [name, about]
   */
  getUserInfo = () => {
    // Примечание: важно, чтобы значение ключа совпадало со значением
    // атрибута 'name' целевых input-элементов 
    return {
      nameUser: this._nameContainer.textContent,
      aboutUser: this._aboutContainer.textContent
    }
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