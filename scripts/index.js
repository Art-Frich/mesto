// Кнопки
const btnEdit = document.querySelector('.profile__btn-edit');
const btnAddPlace = document.querySelector('.profile__btn-add');
const btnCloseEdit = document.querySelector('.popup__btn-close_type_profile');
const btnClosePlace = document.querySelector('.popup__btn-close_type_place');

// Формы
const formAddPlace = document.querySelector('.popup__form[name="addNewPlace"]');
const formEditProfile = 
  document.querySelector('.popup__form[name="editProfileText"]');

//попап профиля
const popupEditProfile = document.querySelector('.popup_type_editProfile');
const nameUserInput = 
  popupEditProfile.querySelector('.popup__input_type_name-user');
const aboutInput = popupEditProfile.querySelector('.popup__input_type_about');

// попап места
const popupAddPlace = document.querySelector('.popup_type_addPlace');
const namePlaceInput = 
  popupAddPlace.querySelector('.popup__input_type_name-place')
const urlInput = popupAddPlace.querySelector('.popup__input_type_url');

// профиль
const profile = document.querySelector('.profile');
const nameUser = profile.querySelector('.profile__title-name');
const nameAbout = profile.querySelector('.profile__subtitle');

//служебная переменная
const classPopupOpened = 'popup_opened';

//сетка мест и массив мест
const placesGrid = document.querySelector('.places__grid');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function openPopup (btn) {
  btn.classList.add(classPopupOpened);
}

// закрываем попам и очищаем поля ввода
function closePopup () {
  let popup = document.querySelector('.popup_opened')
  let input = popup.querySelectorAll('.popup__input');
  input.forEach((item) => {
    item.value = null;
  })
  popup.classList.remove(classPopupOpened);
}

// просто закрывает попап
function handleFormSubmit (event) {
  // Эта строчка отменяет стандартную отправку формы.
    event.preventDefault();
    closePopup ();
}

function addPlace(item) {
  const placeTemplate = 
    document.querySelector('.places__card-template').content;
  const placeElement = 
    placeTemplate.querySelector('.places__grid-item').cloneNode(true);
  placeElement.querySelector('.places__grid-item-photo').src = item.link;
  placeElement.querySelector('.places__grid-item-title').textContent = 
    item.name;
  placeElement.querySelector('.places__grid-item-like').addEventListener('click', (ev) => {
    ev.target.classList.toggle('places__grid-item-like_active');
  })
  placesGrid.prepend(placeElement);
}

// загружаем стартовые значения
initialCards.forEach(addPlace);

// кнопка изменения данных профиля
btnEdit.addEventListener('click', () => {
  openPopup(popupEditProfile);
  nameUserInput.value = nameUser.textContent;
  aboutInput.value = nameAbout.textContent;
});

// кнопка добавления нового места
btnAddPlace.addEventListener('click', () => {
  openPopup(popupAddPlace);
});

// кнопка "закрыть" окно изменения данных профиля
btnCloseEdit.addEventListener('click', closePopup);
btnClosePlace.addEventListener('click', closePopup);

//реагирование формы изменения профиля на нажатие кнопки
formEditProfile.addEventListener('submit', (ev) => {
  nameUser.textContent = nameUserInput.value;
  nameAbout.textContent = aboutInput.value;
  handleFormSubmit(ev);
});

//реагирование формы добавления места на нажатие кнопки
formAddPlace.addEventListener('submit', (ev) => {
  let lastIndex = initialCards.length - 1;
  initialCards.push({});
  initialCards[lastIndex].link = urlInput.value;
  initialCards[lastIndex].name = namePlaceInput.value;
  addPlace(initialCards[lastIndex]);
  handleFormSubmit(ev);
})