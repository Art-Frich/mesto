/**
 * класс работающий с информацией о пользователе на странице
 */
export default class UserInfo {
  /**
   * @constructor
   * @param {string} selectorNameUserContainer
   * @param {string} selectorUserAboutContainer
   * @param {string} selectorUserAvatar
   */
  constructor( { 
    selectorNameUserContainer, 
    selectorUserAboutContainer,
    selectorUserAvatar 
  } ) {
    this._nameContainer = document.querySelector( selectorNameUserContainer );
    this._aboutContainer = document.querySelector( selectorUserAboutContainer );
    this._userAvatar = document.querySelector( selectorUserAvatar );
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

  /**
   * Устанавливает ссылку на изображение для аватара
   * @param {string} url 
   */
  setAvatar( url ) {
    this._userAvatar.src = url;
  }

  /**
   * Устанавливает начальные значения "Имя", "Обо мне" и аватар
   * @param {object} data данные о пользователе 
   */
  setInitialUserInfo( data ){
    this.setUserInfo( data.name, data.about );
    this.setAvatar( data.avatar );
  }
}