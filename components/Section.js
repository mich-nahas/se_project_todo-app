class Section {
  constructor({ items, renderer, containerSelector }) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  renderItems() {
    this._items.forEach((element) => {
      this._renderer(element);
    });
  }
  addItem(element) {
    this._container.append(element);
  }

  removeItem(id) {
    const itemEl = this._container.querySelector(`[data-id="${id}"]`);
    if (itemEl) {
      itemEl.remove();
    }
  }
}

export default Section;
