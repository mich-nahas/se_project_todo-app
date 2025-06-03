import {
  showInputError,
  hideInputError,
  toggleButtonState,
} from "../scripts/validate.js";

class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._formSelector = settings.formSelector;
    this._buttonSelector = settings.buttonSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._formEl = formEl;
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      showInputError(
        this._formEl,
        inputElement,
        inputElement.validationMessage,
        {
          errorClass: this._errorClass,
          inputErrorClass: this._inputErrorClass,
        }
      );
    } else {
      hideInputError(this._formEl, inputElement, {
        errorClass: this._errorClass,
        inputErrorClass: this._inputErrorClass,
      });
    }
  }

  _setEventListeners() {
    const inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );
    const buttonElement = this._formEl.querySelector(this._buttonSelector);

    toggleButtonState(inputList, buttonElement, {
      inactiveButtonClass: this._inactiveButtonClass,
    });

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        toggleButtonState(inputList, buttonElement, {
          inactiveButtonClass: this._inactiveButtonClass,
        });
      });
    });
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

export default FormValidator;
