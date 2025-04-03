// Обработчик для Escape
function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopUp(openedPopup);
  }
}

// @todo: Функция открытия попапа
function openPopUp(popUp) {
  popUp.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeByEscape);
}

// @todo: Функция закрытия попапа
function closePopUp(popUp) {
  popUp.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeByEscape);
}

export { openPopUp, closePopUp };

export function closeModalOnOverlay(popup) {
  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      closePopUp(popup);
      const form = popup.querySelector(".popup__form");
      if (form) {
        form.reset();
      }
    }
  });
}
