class Todo {
  constructor(data, templateSelector, handleCheck, handleDelete) {
    this._data = data;
    this._todoTemplate = document.querySelector(templateSelector);
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
    this._completed = data.completed;
  }

  _setEventListeners() {
    this._todoCheckboxEl.addEventListener("change", () => {
      this._todoElement.classList.toggle("todo_checked");
      this._data.completed = this._todoCheckboxEl.checked;
      this._handleCheck(this._data);
    });
    this._todoDeleteBtn.addEventListener("click", () => {
      this._handleDelete(this._data);
      this._todoElement.remove();
    });
  }

  _generateCheckboxEl() {
    const todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  getView() {
    this._todoElement = this._todoTemplate.content.cloneNode(true).children[0];

    this._todoElement.dataset.id = this._data.id;

    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");

    const todoNameEl = this._todoElement.querySelector(".todo__name");
    const todoDate = this._todoElement.querySelector(".todo__date");

    todoNameEl.textContent = this._data.name;

    this._generateCheckboxEl();
    this._setEventListeners();

    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
    return this._todoElement;
  }
}

export default Todo;
