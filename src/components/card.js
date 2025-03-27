const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
function createCard(cardData, fnForRemove, fnForLike, openPopUpImage) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = card.querySelector(".card__title");
  const cardImage = card.querySelector(".card__image");
  const deleteButton = card.querySelector(".card__delete-button");
  const likeButton = card.querySelector(".card__like-button");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  deleteButton.addEventListener("click", () => fnForRemove(card));
  likeButton.addEventListener("click", () => fnForLike(likeButton));
  cardImage.addEventListener("click", () =>
    openPopUpImage(cardData.link, cardData.name)
  );

  return card;
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// @todo: Функция лайка
function likeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, likeCard };
