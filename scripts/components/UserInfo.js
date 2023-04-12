export default class UserInfo {
  constructor( { 
    selectorNameUserContainer, 
    selectorUserAboutContainer 
  } ) {
    this._nameContainer = document.querySelector( `.${selectorNameUserContainer}` );
    this._aboutContainer = document.querySelector( `.${selectorUserAboutContainer}` );
  }

  getUserInfo = () => {
    return { 
      name: this._nameContainer.textContent,
      about: this._aboutContainer.textContent 
    }
  }

  setUserInfo( newName, newAbout ) {
    this._nameContainer.textContent = newName;
    this._aboutContainer.textContent = newAbout;
  }
}