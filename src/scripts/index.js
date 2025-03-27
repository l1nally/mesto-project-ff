import "../pages/index.css";
import { createCard, deleteCard, likeCard } from "../components/card";
import { initialCards } from "../components/cards";
import { openPopUp, closePopUp } from "../components/modal";

// @todo: Находим DOM-элементы
const cardsContainer = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

const popUps = document.querySelectorAll(".popup");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeImage = document.querySelector(".popup_type_image");
const popUpImage = popupTypeImage.querySelector(".popup__image");
const popUpCaption = popupTypeImage.querySelector(".popup__caption");

const formElementTypeNewCard = popupTypeNewCard.querySelector(".popup__form");
const namePlace = formElementTypeNewCard.querySelector(
  ".popup__input_type_card-name"
);
const urlCardImage = formElementTypeNewCard.querySelector(
  ".popup__input_type_url"
);

const formElementTypeEdit = popupTypeEdit.querySelector(".popup__form");
const nameInput = formElementTypeEdit.querySelector(".popup__input_type_name");
const jobInput = formElementTypeEdit.querySelector(
  ".popup__input_type_description"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// @todo: Выводим карточки на страницу
initialCards.forEach(function addCards(item) {
  const cardContent = createCard(item, deleteCard, likeCard, openPopUpImage);
  cardsContainer.append(cardContent);
});

// @todo: Функция добавления новой карточки
function addNewCard(evt) {
  evt.preventDefault();

  const cardData = {
    name: namePlace.value,
    link: urlCardImage.value,
  };

  const card = createCard(cardData, deleteCard, likeCard, openPopUpImage);

  cardsContainer.prepend(card);
  closePopUp(popupTypeNewCard);

  formElementTypeNewCard.reset();
}

// @todo: Функция редактирования профиля
function addNewProfile(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopUp(popupTypeEdit);

  formElementTypeEdit.reset();
}

// @todo: Функция заполнения полей профиля перед открытием попапа
function addProfileValues() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

// @todo: Функция открытия изображения в попапе
function openPopUpImage(link, name) {
  popUpImage.src = link;
  popUpImage.alt = name;
  popUpCaption.textContent = name;
  openPopUp(popupTypeImage);
}

// @todo: Добавляем обработчики событий для открытия попапов
profileEditButton.addEventListener("click", () => {
  openPopUp(popupTypeEdit);
  addProfileValues();
});
profileAddButton.addEventListener("click", () => openPopUp(popupTypeNewCard));

// @todo: Универсальное закрытие всех попапов
popUps.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close");

  closeButton.addEventListener("click", () => closePopUp(popup));

  popup.addEventListener("mousedown", (event) => {
    if (event.target === event.currentTarget) {
      closePopUp(popup);
    }
  });

  popup.classList.add("popup_is-animated");
});

// @todo: Закрытие попапов по клавише Esc
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closePopUp(openedPopup);
    }
  }
});

// @todo: Добавляем обработчики событий для форм
formElementTypeEdit.addEventListener("submit", addNewProfile);
formElementTypeNewCard.addEventListener("submit", addNewCard);
