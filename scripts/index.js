// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: Узлы DOM
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(cardData, deleteCardHandler) {
  const cardElement = cardTemplate.cloneNode(true).querySelector(".card");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  deleteButton.addEventListener("click", deleteCardHandler);

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(event) {
  const cardElement = event.target.closest(".card");
  cardElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, deleteCard);
  placesList.append(cardElement);
});
