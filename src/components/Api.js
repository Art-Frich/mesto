export default class Api {
  // токен e07a98d9-da5b-4bb3-83f5-8be59ad95ea9
  // id 7fe16738c600cfe949208d93
  // url servera https://mesto.nomoreparties.co/v1/cohort-65/

  constructor({ 
    token, myId, urlServer, qUsersMe, qCards, qLikes 
  }) {
    this._token = token;
    this._urlServer = urlServer;
    this._myId = myId;
    this._qUsersMe = qUsersMe;
    this._qCards = qCards;
    this._qLikes = qLikes;
  }

  getUserDataFromServer() {
    return fetch( this._urlServer + this._qUsersMe, {
      headers: {
        authorization: this._token
      }
    })
  }

  getInitialCards() {
    return fetch( this._urlServer + this._qCards, {
      headers: {
        authorization: this._token
      }
    })
  }

  updateUserData( newName, newAbout ) {
    return fetch( this._urlServer + this._qUsersMe, {
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
  }

  addNewCard( namePlace, linkImg ) {
    return fetch( this._urlServer + this._qCards, {
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
  }

  deleteCard( id ) {
    return fetch( this._urlServer + this._qCards + id, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      }
    })
  }

  setLike( id ){
    return fetch( this._urlServer + this._qCards + id + this._qLikes, {
      method: 'PUT',
      headers: {
        authorization: this._token,
      }
    })
  }

  deleteLike( id ) {
    return fetch( this._urlServer + this._qCards + id + this._qLikes, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      }
    })
  }
}