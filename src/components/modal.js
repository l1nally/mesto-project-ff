// @todo: Функция открытия попапа
function openPopUp(popUp) {
  popUp.classList.add("popup_is-opened");
}

// @todo: Функция закрытия попапа
function closePopUp(popUp) {
  popUp.classList.remove("popup_is-opened");
}

export { openPopUp, closePopUp };
