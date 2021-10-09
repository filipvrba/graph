class Clock {
    #time;

    constructor() {
        this.#time = Date.now();
    }

    getDT() {
        const currentTime = Date.now();
        const deltaTime = (currentTime - this.#time) / 1000;
        this.#time = currentTime;
        return deltaTime;
    }
}

export { Clock };