class TodoCounter {
  constructor(todos, selector) {
    this._element = document.querySelector(selector);
    this._completed = todos.filter((todo) => todo.completed).length;
    this._total = todos.length;
    this._updateText(this._completed, this._total);
  }

  updateCompleted = (increment) => {
    this._completed += increment;
    this._updateText(this._completed, this._total);
  };

  updateTotal = (increment) => {
    this._total += increment ? 1 : -1;
    this._updateText(this._completed, this._total);
  };

  _updateText(completed, total) {
    if (total === 0) {
      this._element.textContent = "No todos available";
      return;
    }
    this._element.textContent = `Showing ${completed} out of ${total} completed`;
  }
}

export default TodoCounter;
