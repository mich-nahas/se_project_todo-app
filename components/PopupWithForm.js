import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popupForm.querySelectorAll(".popup__input");
  }

  getInputValues(evt) {
    const values = {};
    this._inputList.forEach((input) => {
      values[input.name] = input.value;
      input.value = "";
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this.getInputValues(evt);
      this._handleFormSubmit(inputValues);
      this.close();
    });
  }
}

export default PopupWithForm;
