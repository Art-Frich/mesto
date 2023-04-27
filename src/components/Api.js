export default class Api {
  // токен e07a98d9-da5b-4bb3-83f5-8be59ad95ea9
  // id 7fe16738c600cfe949208d93
  // url servera https://mesto.nomoreparties.co/v1/cohort-65/

  constructor( { token, myId, urlServer, qUsersMe, qCards } ) {
    this._token = token;
    this._urlServer = urlServer;
    this._myId = myId;
    this._qUsersMe = qUsersMe;
    this._qCards = qCards;
    this._errMsgText = 'Произошла ошибка. Получено от сервера:'
  }

  getUserDataFromServer() {
    return fetch( this._urlServer + this._qUsersMe, {
      headers: {
        authorization: this._token
      }
    })
      .then( res => {
          if ( res.ok ) { return res.json(); }
          throw new Error( res );
      })
      .catch( err => {
        alert( `${this._errMsgText} ${ err }` );
        console.log( err );
      });
  }

  getInitialCards() {
    return fetch( this._urlServer + this._qCards, {
      headers: {
        authorization: this._token
      }
    })
      .then( res => {
        if ( res.ok ) { return res.json(); }
        throw new Error( res );
      })
      .catch( err => {
        alert( `${this._errMsgText} ${ err }` );
        console.log( err );
      });
  }

  updateUserData( newName, newAbout ) {
    fetch( this._urlServer + this._qUsersMe, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newName,
        about: newAbout
      })
    })
      .then( res => {
        if ( !res.ok ) {
          throw new Error( res );
        }
      })
      .catch( err => {
        alert( `${this._errMsgText} ${ err }` );
        console.log( err );
      });
  }

  addNewCard( namePlace, linkImg ) {
    fetch( this._urlServer + this._qCards, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: namePlace,
        link: linkImg
      })
    })
      .then( res => {
        if ( !res.ok ) {
          throw new Error( res );
        }
      })
      .catch( err => {
        alert( `${this._errMsgText} ${ err }` );
        console.log( err );
      });
  }
}