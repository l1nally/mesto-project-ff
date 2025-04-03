// Функция обновления состояния кнопки
export const updateButtonState = (button, isLoading) => {
  if (isLoading) {
    button.textContent = "Сохранение...";
    button.disabled = true;
  } else {
    button.textContent = "Сохранить";
    button.disabled = false;
  }
};
