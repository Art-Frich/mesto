export default class Api {
  // токен e07a98d9-da5b-4bb3-83f5-8be59ad95ea9
  // id 7fe16738c600cfe949208d93
  // url servera https://mesto.nomoreparties.co/v1/cohort-65/

  constructor( token, urlServer ) {
    this.token = token;
    this.urlServer = urlServer;
    this.qUsersMe = 'users/me'
  }

  // _createQuery( infoPath, typeQ = 'GET' ) {
  //   fetch( this.urlServer + infoPath, {
  //     method: typeQ,
  //     headers: {
  //       authorization: this.token
  //     }
  //   })
  //     .then(res => res.json())
  //     .then((result) => {
  //       console.log('i work ', result);
  //     });
  // }

  getUserInfo() {
    fetch ( this.urlServer + this.qUsersMe, {
      headers: {
        autorization: this.token
      }
    })
      .then( res => res.json() )
      .then( data => {
        console.log( data )
      })


  }
}