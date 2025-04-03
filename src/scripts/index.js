import "../pages/index.css";
import avatar from "../images/avatar.jpg";
import {
  createCard,
  checkLikeStatus,
  updateLikeButton,
} from "../components/card.js";
import { openPopUp, closePopUp } from "../components/modal.js";
import {
  clearValidationErrors,
  toggleButtonState,
  enableValidation,
} from "../components/validation.js";
import {
  getUserInfo,
  getInitialCards,
  updateUserProfile,
  updateAvatar as apiUpdateAvatar,
  addNewCard as apiAddNewCard,
  deleteCard as apiDeleteCard,
  toggleLike as apiToggleLike,
} from "./api.js";

// @todo: Находим DOM-элементы
const profileImage = document.querySelector(".profile__image");
profileImage.style.backgroundImage = `url(${avatar})`;

const cardsContainer = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const profileAddButton = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popUpCloseButtons = document.querySelectorAll(".popup__close");
const popupTypeImage = document.querySelector(".popup_type_image");
const formElementTypeEdit = document.querySelector(
  '.popup__form[name="edit-profile"]'
);
const nameInput = formElementTypeEdit.querySelector(".popup__input_type_name");
const jobInput = formElementTypeEdit.querySelector(
  ".popup__input_type_description"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const formElementTypeNewCard = document.querySelector(
  ".popup__form[name='new-place']"
);
const namePlace = formElementTypeNewCard.querySelector(
  ".popup__input_type_card-name"
);
const urlCardImage = formElementTypeNewCard.querySelector(
  ".popup__input_type_url"
);
const popUpImage = document.querySelector(".popup__image");
const popUpCaption = document.querySelector(".popup__caption");
const popupTypeAvatar = document.querySelector(".popup_type_avatar");
const formElementTypeAvatar = document.querySelector(
  ".popup__form[name='edit-avatar']"
);
const avatarInput = formElementTypeAvatar.querySelector(
  ".popup__input_type_url"
);
const popups = document.querySelectorAll(".popup");
let userId;

const validationConfig = {
  popupFormElement: ".popup__form",
  popupInput: ".popup__input",
  button: ".popup__button",
  inactiveButton: "button_inactive",
  inputTypeError: "popup__input_type_error",
  inputActiveError: "popup__input-error_active",
  inputError: ".popup__input-error",
};

enableValidation(validationConfig);

// @todo: Функция загрузки данных с сервера
function loadData() {
  Promise.all([getUserInfo(), getInitialCards()])
    .then(([userData, cardsData]) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      profileImage.style.backgroundImage = `url(${userData.avatar})`;
      userId = userData._id;
      renderCards(cardsData, userId);
    })
    .catch((err) => console.error("Ошибка загрузки данных:", err));
}

// @todo: Функция переключения лайка
function toggleLike(cardId, likeButton, likeCount) {
  const isLiked = checkLikeStatus(likeButton);
  apiToggleLike(cardId, isLiked)
    .then((updatedCard) => {
      updateLikeButton(likeButton, likeCount, updatedCard.likes);
    })
    .catch((err) => console.error("Ошибка при изменении лайка:", err));
}

// @todo: Функция отрисовки карточек
function renderCards(cards, userId) {
  cardsContainer.innerHTML = "";
  cards.forEach((cardData) => {
    const cardElement = createCard(
      cardData,
      deleteCard,
      toggleLike,
      openPopUpImage,
      userId
    );
    cardsContainer.append(cardElement);
  });
}

// @todo: Функция обновления состояния кнопки
const updateButtonState = (button, isLoading) => {
  if (isLoading) {
    button.textContent = "Сохранение...";
    button.disabled = true;
  } else {
    button.textContent = "Сохранить";
    button.disabled = false;
  }
};

// @todo: Функция редактирования профиля
function addNewProfile(evt) {
  evt.preventDefault();
  const button = formElementTypeEdit.querySelector(".popup__button");
  updateButtonState(button, true);
  updateUserProfile(nameInput.value, jobInput.value)
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      closePopUp(popupTypeEdit);
    })
    .catch((err) => console.error("Ошибка обновления профиля:", err))
    .finally(() => updateButtonState(button, false));
}

// @todo: Функция заполнения полей профиля перед открытием попапа
function addProfileValues() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

profileEditButton.addEventListener("click", () => {
  addProfileValues();
  clearValidationErrors(formElementTypeEdit, validationConfig);
  openPopUp(popupTypeEdit);
});

formElementTypeEdit.addEventListener("submit", addNewProfile);

// @todo: Функция удаления карточки
function deleteCard(cardId, cardElement) {
  apiDeleteCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => console.error("Ошибка при удалении карточки:", err));
}

// @todo: Функция добавления новой карточки
function addNewCard(evt) {
  evt.preventDefault();
  const button = formElementTypeNewCard.querySelector(".popup__button");
  updateButtonState(button, true);

  const name = namePlace.value.trim();
  const link = urlCardImage.value.trim();

  apiAddNewCard(name, link)
    .then((cardData) => {
      const newCardElement = createCard(
        cardData,
        deleteCard,
        toggleLike,
        openPopUpImage,
        userId
      );
      cardsContainer.prepend(newCardElement);
      formElementTypeNewCard.reset();
      closePopUp(popupTypeNewCard);
    })
    .catch((err) => console.error("Ошибка при добавлении карточки:", err))
    .finally(() => updateButtonState(button, false));
}

profileAddButton.addEventListener("click", () => {
  clearValidationErrors(formElementTypeNewCard, validationConfig);
  openPopUp(popupTypeNewCard);
  const inputList = Array.from(
    formElementTypeNewCard.querySelectorAll(".popup__input")
  );
  const buttonElement = formElementTypeNewCard.querySelector(".popup__button");
  toggleButtonState(inputList, buttonElement, validationConfig);
});

formElementTypeNewCard.addEventListener("submit", addNewCard);

profileImage.addEventListener("click", () => {
  clearValidationErrors(formElementTypeAvatar, validationConfig);
  openPopUp(popupTypeAvatar);
});

// @todo: Функция обновления аватара
function updateAvatar(evt) {
  evt.preventDefault();
  const button = formElementTypeAvatar.querySelector(".popup__button");
  updateButtonState(button, true);
  apiUpdateAvatar(avatarInput.value)
    .then((data) => {
      profileImage.style.backgroundImage = `url(${data.avatar})`;
      closePopUp(popupTypeAvatar);
      formElementTypeAvatar.reset();
    })
    .catch((err) => console.error("Ошибка обновления аватара:", err))
    .finally(() => updateButtonState(button, false));
}

formElementTypeAvatar.addEventListener("submit", updateAvatar);

// @todo: Функция открытия изображения в попапе
function openPopUpImage(link, name) {
  popUpImage.src = link;
  popUpImage.alt = name;
  popUpCaption.textContent = name;
  openPopUp(popupTypeImage);
}

// @todo: Добавляем обработчики событий для закрытия попапов
popUpCloseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".popup");
    closePopUp(popup);
    if (popup === popupTypeNewCard) {
      formElementTypeNewCard.reset();
    }
  });
});

popups.forEach((popup) => {
  popup.classList.add("popup_is-animated");
  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      closePopUp(popup);
      const form = popup.querySelector(".popup__form");
      if (form) {
        form.reset();
      }
    }
  });
});

loadData();
