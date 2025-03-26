// @todo: Добавление класса к элементу
function addClass(element, addingClass) {
  element.classList.add(addingClass);
}

// @todo: Удаление класса у элемента
function removeClass(element, removingClass) {
  element.classList.remove(removingClass);
}

// @todo: Добавление обработчика события
function addListener(element, event, functionCallBack) {
  element.addEventListener(event, functionCallBack);
}

// @todo: Удаление обработчика события
function removeListener(element, event, functionCallBack) {
  element.removeEventListener(event, functionCallBack);
}

// @todo: Функция открытия попапа
function openPopUp(popUp) {
  addClass(popUp, "popup_is-opened");
  addListener(document, "keydown", closeByEscape);
  addListener(popUp, "click", closeByOverlay);
}

// @todo: Функция закрытия попапа
function closePopUp(popUp) {
  removeClass(popUp, "popup_is-opened");
  removeListener(document, "keydown", closeByEscape);
  removeListener(popUp, "click", closeByOverlay);
}

// @todo: Закрытие попапа по клавише Esc
function closeByEscape(evt) {
  const closingPopUp = document.querySelector(".popup_is-opened");
  if (evt.key === "Escape") {
    closePopUp(closingPopUp);
  }
}

// @todo: Закрытие попапа по клику на оверлей
function closeByOverlay(evt) {
  if (!evt.target.classList.contains(".popup__content")) {
    closePopUp(evt.target);
  }
}

export { addClass, addListener, openPopUp, closePopUp };
