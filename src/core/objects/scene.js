import { Object2D } from "./object2d.js";

class Scene extends Object2D{
    #ctx;

    constructor() {
        super();

        this.#ctx = null;

    }

    ready() {

        this.globalPosition = this.position;

    }

    addRenderer(ctx) {
        this.#ctx = ctx;
    }

    get renderer() {
        return this.#ctx;
    }
}

export { Scene };