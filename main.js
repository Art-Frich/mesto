/*! For license information please see main.js.LICENSE.txt */
(()=>{"use strict";function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,r(o.key),o)}}function n(t,e,n){return(e=r(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function r(e){var n=function(e,n){if("object"!==t(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,"string");if("object"!==t(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===t(n)?n:String(n)}var o=function(){function t(e,r){var o=this,i=e.placeName,u=e.placeImgSrc,a=e.likes,c=e.config,l=e.ownerId,s=e.myId,f=r.handleCardClick,p=r.confirmDelete,h=r.setLikeOnServer,y=r.deleteLikeFromServer,d=r.handleLikeClick;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),n(this,"_getPlaceElement",(function(){return document.querySelector(o._templateSelector).content.querySelector(o._placesItemSelector).cloneNode(!0)})),n(this,"toggleLikeConditionOnserver",(function(){return o._imgLike.classList.contains(o._classLikeActive)?o._deleteLikeFromServer():o._setLikeOnServer()})),n(this,"_toggleLikeCondition",(function(){o._isLikeInProcess||(o.toggleflagCondition(),o._handleLikeClick())})),n(this,"_setEventListeners",(function(){o._img.addEventListener("click",(function(){o._handeCardClick(o._placeImgSrc,o._placeName)})),o._imgLike.addEventListener("mousedown",o._toggleLikeCondition),o._btnPlaceDel.addEventListener("click",o._confirmDelete)})),n(this,"deleteCard",(function(){o._placeElement.remove(),o._placeElement=null})),n(this,"_fillCard",(function(){o._img.src=o._placeImgSrc,o._img.alt+=" ".concat(o._placeName),o._imgTitle.textContent=o._placeName,o.setCountLikes(o._likes),o._checkOwner(),o._checkMyLike()})),n(this,"_checkOwner",(function(){o._ownerCardId===o._myId&&o._btnPlaceDel.classList.add(o._btnDellHiddenClass)})),n(this,"doLikeActive",(function(){o._imgLike.classList.toggle(o._classLikeActive)})),n(this,"toggleflagCondition",(function(){o._isLikeInProcess?o._isLikeInProcess=!1:o._isLikeInProcess=!0})),n(this,"_checkMyLike",(function(){o._likes.forEach((function(t){t._id===o._myId&&o.doLikeActive()}))})),n(this,"getPlaceCard",(function(){return o._fillCard(),o._setEventListeners(),o._placeElement})),this._placeName=i,this._placeImgSrc=u,this._likes=a,this._ownerCardId=l,this._myId=s,this._handeCardClick=f,this._confirmDelete=p,this._setLikeOnServer=h,this._deleteLikeFromServer=y,this._handleLikeClick=d,this._templateSelector=c.templateSelector,this._placesItemSelector=c.cardSelector,this._classLikeActive=c.classLikeActive,this._btnDellHiddenClass=c.btnDellHiddenClass,this._placeElement=this._getPlaceElement(),this._img=this._placeElement.querySelector(c.imgSelector),this._imgTitle=this._placeElement.querySelector(c.titleSelector),this._imgLike=this._placeElement.querySelector(c.likeSelector),this._btnPlaceDel=this._placeElement.querySelector(c.btnDelSelector),this._countLikeContainer=this._placeElement.querySelector(c.countLikeSelector),this._isLikeInProcess=!1}var r,o;return r=t,(o=[{key:"setCountLikes",value:function(t){this._countLikeContainer.textContent=t.length}}])&&e(r.prototype,o),Object.defineProperty(r,"prototype",{writable:!1}),t}();function i(t){return i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i(t)}function u(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,c(r.key),r)}}function a(t,e,n){return(e=c(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function c(t){var e=function(t,e){if("object"!==i(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==i(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"===i(e)?e:String(e)}var l=function(){function t(e,n){var r=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),a(this,"_getFormElements",(function(t,e){return Array.from(t.querySelectorAll(e))})),a(this,"_hasInvalidInput",(function(){return r._inputList.some((function(t){return!r._checkValidity(t)}))})),a(this,"_showInputError",(function(t,e,n){n.classList.add(r._inputUnvalidateClass),e.textContent=t})),a(this,"_hideInputError",(function(t,e){e.classList.remove(r._inputUnvalidateClass),t.textContent=""})),a(this,"_checkInputValidity",(function(t,e){r._checkValidity(t)?r._hideInputError(e,t):r._showInputError(t.validationMessage,e,t)})),a(this,"_toggleButtonState",(function(){r._hasInvalidInput()?r._btnSubmit.setAttribute("disabled",!0):r._btnSubmit.removeAttribute("disabled")})),a(this,"_setEventListeners",(function(){r._form.addEventListener("reset",(function(t){t.preventDefault(),r._inputList.forEach((function(t,e){t.value="",r._hideInputError(r._errorList[e],t)})),r._toggleButtonState()})),r._inputList.forEach((function(t,e){t.addEventListener("input",(function(){r._checkInputValidity(t,r._errorList[e]),r._toggleButtonState()}))}))})),a(this,"enableValidation",(function(){r._setEventListeners()})),this._inputUnvalidateClass=e.inputUnvalidateClass,this._form=n,this._inputList=this._getFormElements(n,e.inputSelector),this._errorList=this._getFormElements(n,e.errorSelector),this._btnSubmit=n.querySelector(e.submitBtnSelector)}var e,n;return e=t,(n=[{key:"_checkValidity",value:function(t){return t.validity.valid}}])&&u(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function s(t){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},s(t)}function f(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==s(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==s(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===s(o)?o:String(o)),r)}var o}var p=function(){function t(e,n){var r=e.classBtnClose,o=e.classPopupOpened;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._classPopupOpened=o,this._classBtnClose=r,this._popup=document.querySelector(n),this._handleEscClose=this._handleEscClose.bind(this),this.open=this.open.bind(this)}var e,n;return e=t,(n=[{key:"open",value:function(){this._popup.classList.add(this._classPopupOpened),document.addEventListener("keydown",this._handleEscClose)}},{key:"_handleEscClose",value:function(t){"Escape"===t.key&&this.close()}},{key:"close",value:function(){this._popup.classList.remove(this._classPopupOpened),document.removeEventListener("keydown",this._handleEscClose)}},{key:"setEventListeners",value:function(){var t=this;this._popup.addEventListener("mousedown",(function(e){(e.target.classList.contains(t._classPopupOpened)||e.target.classList.contains(t._classBtnClose))&&t.close()}))}}])&&f(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function h(t){return h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},h(t)}function y(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,g(r.key),r)}}function d(){return d="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=v(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},d.apply(this,arguments)}function m(t,e){return m=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},m(t,e)}function b(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function v(t){return v=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},v(t)}function _(t,e,n){return(e=g(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function g(t){var e=function(t,e){if("object"!==h(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==h(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"===h(e)?e:String(e)}var S=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&m(t,e)}(u,t);var e,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=v(r);if(o){var n=v(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===h(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return b(t)}(this,t)});function u(t,e){var n,r=t.popupConfig,o=t.inputSelector,a=t.popupSelector,c=t.nameForm,l=t.btnSubmitSelector,s=t.btnSubmitFetchCondition;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),_(b(n=i.call(this,r,a)),"setInputValues",(function(t){n._inputs.forEach((function(e,n){return e.value=t[e.getAttribute("name")]}))})),_(b(n),"toggleBtnSubmitText",(function(){n._btnSubmit.textContent===n._btnSubmitOriginalText?n._btnSubmit.textContent=n._btnSubmitFetchCondition:n._btnSubmit.textContent=n._btnSubmitOriginalText})),n._callbackSubmit=e,n._classInput=o,n._btnSubmitFetchCondition=s,n._form=document.forms[c],n._inputs=Array.from(n._form.querySelectorAll(n._classInput)),n._btnSubmit=n._form.querySelector(l),n._btnSubmitOriginalText=n._btnSubmit.textContent,n}return e=u,(n=[{key:"_getInputValues",value:function(){return this._inputs.reduce((function(t,e){return t[e.getAttribute("name")]=e.value,t}),{})}},{key:"setEventListeners",value:function(){var t=this;d(v(u.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",(function(e){e.preventDefault(),t._fetchCondition()}))}},{key:"_fetchCondition",value:function(){this.toggleBtnSubmitText(),this._callbackSubmit(this._getInputValues())}},{key:"close",value:function(){this._form.reset(),d(v(u.prototype),"close",this).call(this)}},{key:"open",value:function(){d(v(u.prototype),"open",this).call(this)}}])&&y(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),u}(p);function w(t){return w="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},w(t)}function k(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==w(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==w(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===w(o)?o:String(o)),r)}var o}function C(){return C="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=O(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},C.apply(this,arguments)}function L(t,e){return L=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},L(t,e)}function O(t){return O=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},O(t)}var E=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&L(t,e)}(u,t);var e,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=O(r);if(o){var n=O(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===w(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function u(t){var e,n=t.popupConfig,r=t.popupSelector,o=t.figureSelector,a=t.imgSelector,c=t.figcaptionSelector;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(e=i.call(this,n,r))._figure=document.querySelector(o),e._figureImg=e._figure.querySelector(a),e._figcaption=e._figure.querySelector(c),e}return e=u,(n=[{key:"open",value:function(t,e){this._figureImg.src=t,this._figureImg.alt=e,this._figcaption.textContent=e,C(O(u.prototype),"open",this).call(this)}}])&&k(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),u}(p);function P(t){return P="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},P(t)}function j(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,x(r.key),r)}}function x(t){var e=function(t,e){if("object"!==P(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==P(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"===P(e)?e:String(e)}var I=function(){function t(e,n){var r,o,i,u=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),r=this,i=function(t){u._cards.prepend(t)},(o=x(o="addItem"))in r?Object.defineProperty(r,o,{value:i,enumerable:!0,configurable:!0,writable:!0}):r[o]=i,this._cards=document.querySelector(n),this._renderer=e}var e,n;return e=t,(n=[{key:"renderCards",value:function(t){for(var e=t.length-1;e>-1;e--)this._renderer(t[e])}}])&&j(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function T(t){return T="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},T(t)}function q(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,A(r.key),r)}}function A(t){var e=function(t,e){if("object"!==T(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==T(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"===T(e)?e:String(e)}var R=function(){function t(e){var n,r,o,i=this,u=e.selectorNameUserContainer,a=e.selectorUserAboutContainer,c=e.selectorUserAvatar;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),n=this,o=function(){return{nameUser:i._nameContainer.textContent,aboutUser:i._aboutContainer.textContent}},(r=A(r="getUserInfo"))in n?Object.defineProperty(n,r,{value:o,enumerable:!0,configurable:!0,writable:!0}):n[r]=o,this._nameContainer=document.querySelector(u),this._aboutContainer=document.querySelector(a),this._userAvatar=document.querySelector(c)}var e,n;return e=t,(n=[{key:"setUserInfo",value:function(t,e){this._nameContainer.textContent=t,this._aboutContainer.textContent=e}},{key:"setAvatar",value:function(t){this._userAvatar.src=t}},{key:"setInitialUserInfo",value:function(t){this.setUserInfo(t.name,t.about),this.setAvatar(t.avatar)}}])&&q(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function U(t){return U="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},U(t)}function D(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==U(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==U(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===U(o)?o:String(o)),r)}var o}var F=function(){function t(e){var n=e.token,r=e.myId,o=e.urlServer,i=e.qUsersMe,u=e.qCards,a=e.qLikes,c=e.qAvatar;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._token=n,this._urlServer=o,this._myId=r,this._qUsersMe=i,this._qCards=u,this._qLikes=a,this._qAvatar=c}var e,n;return e=t,(n=[{key:"getUserDataFromServer",value:function(){var t=this;return fetch(this._urlServer+this._qUsersMe,{headers:{authorization:this._token}}).then((function(e){return t._handleResponse(e)}))}},{key:"getInitialCards",value:function(){var t=this;return fetch(this._urlServer+this._qCards,{headers:{authorization:this._token}}).then((function(e){return t._handleResponse(e)}))}},{key:"updateUserData",value:function(t,e){var n=this;return fetch(this._urlServer+this._qUsersMe,{method:"PATCH",headers:{authorization:this._token,"Content-Type":"application/json"},body:JSON.stringify({name:t,about:e})}).then((function(t){return n._handleResponse(t)}))}},{key:"addNewCard",value:function(t,e){var n=this;return fetch(this._urlServer+this._qCards,{method:"POST",headers:{authorization:this._token,"Content-Type":"application/json"},body:JSON.stringify({name:t,link:e})}).then((function(t){return n._handleResponse(t)}))}},{key:"deleteCard",value:function(t){var e=this;return fetch(this._urlServer+this._qCards+t,{method:"DELETE",headers:{authorization:this._token}}).then((function(t){return e._handleResponse(t)}))}},{key:"setLike",value:function(t){var e=this;return fetch(this._urlServer+this._qCards+t+this._qLikes,{method:"PUT",headers:{authorization:this._token}}).then((function(t){return e._handleResponse(t)}))}},{key:"deleteLike",value:function(t){var e=this;return fetch(this._urlServer+this._qCards+t+this._qLikes,{method:"DELETE",headers:{authorization:this._token}}).then((function(t){return e._handleResponse(t)}))}},{key:"updateAvatar",value:function(t){var e=this;return fetch(this._urlServer+this._qUsersMe+this._qAvatar,{method:"PATCH",headers:{authorization:this._token,"Content-Type":"application/json"},body:JSON.stringify({avatar:t})}).then((function(t){return e._handleResponse(t)}))}},{key:"_handleResponse",value:function(t){return t.ok?t.json():Promise.reject(t.status)}}])&&D(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function B(t){return B="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},B(t)}function N(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,H(r.key),r)}}function V(){return V="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=G(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},V.apply(this,arguments)}function M(t,e){return M=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},M(t,e)}function z(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function G(t){return G=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},G(t)}function H(t){var e=function(t,e){if("object"!==B(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==B(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"===B(e)?e:String(e)}var J,Y=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&M(t,e)}(u,t);var e,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=G(r);if(o){var n=G(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===B(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return z(t)}(this,t)});function u(t){var e,n,r,o,a=t.popupConfig,c=t.popupSelector,l=t.nameForm,s=t.btnSubmitSelector,f=t.btnSubmitFetchCondition;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),n=z(e=i.call(this,a,c)),o=function(){e._btnSubmit.textContent===e._btnSubmitOriginalText?e._btnSubmit.textContent=e._btnSubmitFetchCondition:e._btnSubmit.textContent=e._btnSubmitOriginalText},(r=H(r="toggleBtnSubmitText"))in n?Object.defineProperty(n,r,{value:o,enumerable:!0,configurable:!0,writable:!0}):n[r]=o,e._delCard,e._form=document.forms[l],e._btnSubmitFetchCondition=f,e._btnSubmit=e._form.querySelector(s),e._btnSubmitOriginalText=e._btnSubmit.textContent,e}return e=u,(n=[{key:"setEventListeners",value:function(){var t=this;V(G(u.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",(function(e){t.toggleBtnSubmitText(),e.preventDefault(),t._delCard()}))}},{key:"open",value:function(t){this._delCard=t,V(G(u.prototype),"open",this).call(this)}}])&&N(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),u}(p),$=document.querySelector(".profile__btn-edit"),K=document.querySelector(".profile__btn-add"),Q=document.querySelector(".profile__avatar-edit"),W="Произошла какая-то ошибка...\n",X=".popup__input",Z=".popup__btn-submit",tt="Сохранение...",et={classBtnClose:"popup__btn-close",classPopupOpened:"to-visible"},nt={popupConfig:et,popupSelector:".popup_type_full-img-place",figureSelector:".popup__figure",imgSelector:".popup__img",figcaptionSelector:".popup__figcaption"},rt={popupConfig:et,inputSelector:X,popupSelector:".popup_type_add-place",nameForm:"addNewPlace",btnSubmitSelector:Z,btnSubmitFetchCondition:tt},ot={popupConfig:et,inputSelector:X,popupSelector:".popup_type_edit-profile",nameForm:"editProfileText",btnSubmitSelector:Z,btnSubmitFetchCondition:tt},it={inputSelector:X,submitBtnSelector:".popup__btn-submit",inputUnvalidateClass:"popup__input_type_error",errorSelector:".popup__error"},ut={cardSelector:".cards__grid-item",imgSelector:".card__photo",titleSelector:".card__title",likeSelector:".card__like",btnDelSelector:".card__del-card-btn",classLikeActive:"card__like_active",templateSelector:".template",countLikeSelector:".card__like-count",btnDellHiddenClass:"to-visible"},at={popupConfig:et,inputSelector:X,popupSelector:".popup_type_editAvatar",nameForm:"avatarUpdate",btnSubmitSelector:Z,btnSubmitFetchCondition:tt};function ct(t){return ct="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},ct(t)}function lt(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,i,u,a=[],c=!0,l=!1;try{if(i=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=i.call(n)).done)&&(a.push(r.value),a.length!==e);c=!0);}catch(t){l=!0,o=t}finally{try{if(!c&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(l)throw o}}return a}}(t,e)||function(t,e){if(t){if("string"==typeof t)return st(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?st(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function st(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function ft(){ft=function(){return t};var t={},e=Object.prototype,n=e.hasOwnProperty,r=Object.defineProperty||function(t,e,n){t[e]=n.value},o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",u=o.asyncIterator||"@@asyncIterator",a=o.toStringTag||"@@toStringTag";function c(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(t){c=function(t,e,n){return t[e]=n}}function l(t,e,n,o){var i=e&&e.prototype instanceof p?e:p,u=Object.create(i.prototype),a=new L(o||[]);return r(u,"_invoke",{value:S(t,n,a)}),u}function s(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}t.wrap=l;var f={};function p(){}function h(){}function y(){}var d={};c(d,i,(function(){return this}));var m=Object.getPrototypeOf,b=m&&m(m(O([])));b&&b!==e&&n.call(b,i)&&(d=b);var v=y.prototype=p.prototype=Object.create(d);function _(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function g(t,e){function o(r,i,u,a){var c=s(t[r],t,i);if("throw"!==c.type){var l=c.arg,f=l.value;return f&&"object"==ct(f)&&n.call(f,"__await")?e.resolve(f.__await).then((function(t){o("next",t,u,a)}),(function(t){o("throw",t,u,a)})):e.resolve(f).then((function(t){l.value=t,u(l)}),(function(t){return o("throw",t,u,a)}))}a(c.arg)}var i;r(this,"_invoke",{value:function(t,n){function r(){return new e((function(e,r){o(t,n,e,r)}))}return i=i?i.then(r,r):r()}})}function S(t,e,n){var r="suspendedStart";return function(o,i){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===o)throw i;return{value:void 0,done:!0}}for(n.method=o,n.arg=i;;){var u=n.delegate;if(u){var a=w(u,n);if(a){if(a===f)continue;return a}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var c=s(t,e,n);if("normal"===c.type){if(r=n.done?"completed":"suspendedYield",c.arg===f)continue;return{value:c.arg,done:n.done}}"throw"===c.type&&(r="completed",n.method="throw",n.arg=c.arg)}}}function w(t,e){var n=e.method,r=t.iterator[n];if(void 0===r)return e.delegate=null,"throw"===n&&t.iterator.return&&(e.method="return",e.arg=void 0,w(t,e),"throw"===e.method)||"return"!==n&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+n+"' method")),f;var o=s(r,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,f;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,f):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,f)}function k(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function C(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function L(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(k,this),this.reset(!0)}function O(t){if(t){var e=t[i];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,o=function e(){for(;++r<t.length;)if(n.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:E}}function E(){return{value:void 0,done:!0}}return h.prototype=y,r(v,"constructor",{value:y,configurable:!0}),r(y,"constructor",{value:h,configurable:!0}),h.displayName=c(y,a,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===h||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,c(t,a,"GeneratorFunction")),t.prototype=Object.create(v),t},t.awrap=function(t){return{__await:t}},_(g.prototype),c(g.prototype,u,(function(){return this})),t.AsyncIterator=g,t.async=function(e,n,r,o,i){void 0===i&&(i=Promise);var u=new g(l(e,n,r,o),i);return t.isGeneratorFunction(n)?u:u.next().then((function(t){return t.done?t.value:u.next()}))},_(v),c(v,a,"Generator"),c(v,i,(function(){return this})),c(v,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=Object(t),n=[];for(var r in e)n.push(r);return n.reverse(),function t(){for(;n.length;){var r=n.pop();if(r in e)return t.value=r,t.done=!1,t}return t.done=!0,t}},t.values=O,L.prototype={constructor:L,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(C),!t)for(var e in this)"t"===e.charAt(0)&&n.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(n,r){return u.type="throw",u.arg=t,e.next=n,r&&(e.method="next",e.arg=void 0),!!r}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],u=i.completion;if("root"===i.tryLoc)return r("end");if(i.tryLoc<=this.prev){var a=n.call(i,"catchLoc"),c=n.call(i,"finallyLoc");if(a&&c){if(this.prev<i.catchLoc)return r(i.catchLoc,!0);if(this.prev<i.finallyLoc)return r(i.finallyLoc)}else if(a){if(this.prev<i.catchLoc)return r(i.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return r(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var u=i?i.completion:{};return u.type=t,u.arg=e,i?(this.method="next",this.next=i.finallyLoc,f):this.complete(u)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),f},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),C(n),f}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;C(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:O(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=void 0),f}},t}function pt(t,e,n,r,o,i,u){try{var a=t[i](u),c=a.value}catch(t){return void n(t)}a.done?e(c):Promise.resolve(c).then(r,o)}function ht(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var i=t.apply(e,n);function u(t){pt(i,r,o,u,a,"next",t)}function a(t){pt(i,r,o,u,a,"throw",t)}u(void 0)}))}}function yt(t){var e=new o(function(t){return{config:ut,placeName:t.name,placeImgSrc:t.link,likes:t.likes,ownerId:t.owner._id,myId:J}}(t),{handleCardClick:function(){return mt.open(t.link,t.name)},setLikeOnServer:function(){return vt.setLike(t._id)},deleteLikeFromServer:function(){return vt.deleteLike(t._id)},handleLikeClick:function(){e.toggleLikeConditionOnserver().then((function(t){e.setCountLikes(t.likes),e.doLikeActive()})).catch((function(t){return alert(W+t)})).finally((function(){return e.toggleflagCondition()}))},confirmDelete:function(){return dt.open(ht(ft().mark((function n(){return ft().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,vt.deleteCard(t._id);case 3:e.deleteCard(),dt.close(),n.next=10;break;case 7:n.prev=7,n.t0=n.catch(0),alert(W+n.t0);case 10:return n.prev=10,dt.toggleBtnSubmitText(),n.finish(10);case 13:case"end":return n.stop()}}),n,null,[[0,7,10,13]])}))))}}),n=e.getPlaceCard();_t.addItem(n)}var dt=new Y({popupConfig:et,popupSelector:".popup_type_confirmDelete",nameForm:"confirmCardDelete",btnSubmitSelector:Z,btnSubmitFetchCondition:"Удаление..."}),mt=new E(nt),bt=new R({selectorNameUserContainer:".profile__title-name",selectorUserAboutContainer:".profile__subtitle",selectorUserAvatar:".profile__avatar"}),vt=new F({token:"e07a98d9-da5b-4bb3-83f5-8be59ad95ea9",myId:"7fe16738c600cfe949208d93",urlServer:"https://mesto.nomoreparties.co/v1/cohort-65/",qUsersMe:"users/me",qCards:"cards/",qLikes:"/likes/",qAvatar:"/avatar"}),_t=new I(yt,".cards__grid"),gt=new S(ot,(function(t){var e=t.nameUser,n=t.aboutUser;vt.updateUserData(e,n).then((function(){bt.setUserInfo(e,n),gt.close()})).catch((function(t){return alert(W+t)})).finally((function(){return gt.toggleBtnSubmitText()}))})),St=new S(rt,(function(t){var e=t.namePlace,n=t.urlImage;vt.addNewCard(e,n).then((function(t){yt(t),St.close()})).catch((function(t){return alert("Произошла какая-то ошибка...\n"+t)})).finally((function(){return St.toggleBtnSubmitText()}))})),wt=new S(at,(function(t){var e=t.urlImage;vt.updateAvatar(e).then((function(t){bt.setAvatar(t.avatar),wt.close()})).catch((function(t){return alert("Произошла какая-то ошибка...\n"+t)})).finally((function(){return wt.toggleBtnSubmitText()}))}));Promise.all([vt.getUserDataFromServer(),vt.getInitialCards()]).then((function(t){var e=lt(t,2),n=e[0],r=e[1];bt.setInitialUserInfo(n),J=n._id,_t.renderCards(r)})).catch((function(t){var e=lt(t,2),n=e[0],r=e[1];return alert(n,r)})),mt.setEventListeners(),St.setEventListeners(),gt.setEventListeners(),dt.setEventListeners(),wt.setEventListeners(),Array.from(document.forms).forEach((function(t){new l(it,t).enableValidation()})),Q.addEventListener("click",wt.open),K.addEventListener("click",St.open),$.addEventListener("click",(function(){gt.setInputValues(bt.getUserInfo()),gt.open()})),setTimeout((function(){return document.querySelector(".preload").classList.remove("preload")}),500)})();
//# sourceMappingURL=main.js.map