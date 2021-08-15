class Rendering {
    #ctx;

    constructor() {
        this.#ctx = undefined;
    }

    addRenderer(ctx) {
        this.#ctx = ctx;
    }

    get renderer() {
        return this.#ctx;
    }
}

export { Rendering };