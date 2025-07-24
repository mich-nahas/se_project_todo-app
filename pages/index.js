import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todoList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const name = inputValues.name;
    const dateInput = inputValues.date;
    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();
    addItem({ id, name, date, completed: false });
    addTodoPopup.close();
  },
});
addTodoPopup.setEventListeners();

function handleCheck(item) {
  if (item.completed) {
    todoCounter.updateCompleted(1);
  } else {
    todoCounter.updateCompleted(-1);
  }
}

function handleDelete(item) {
  if (item) {
    todoCounter.updateTotal(false);
    if (item.completed) {
      todoCounter.updateCompleted(-1);
    }
    section.removeItem(item.id);
  }
}

const section = new Section({
  items: [...initialTodos],
  renderer: (item) => {
    const todo = new Todo(item, "#todo-template", handleCheck, handleDelete);
    const todoElement = todo.getView();
    section.addItem(todoElement);
  },
  containerSelector: ".todos__list",
});

section.renderItems();

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const addItem = (item) => {
  const todo = new Todo(item, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getView();
  section.addItem(todoElement);
  todoCounter.updateTotal(true);
  todoCounter.updateCompleted(false);
};

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
