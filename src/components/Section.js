export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    setItemAppend(element) {
        this._container.append(element);
    }

    setItemPrepend(element) {
        this._container.prepend(element);
    }

    renderItems(arr) {
        arr.forEach(item => {
            this._renderer(item);
        });
    }
}