class ExamplesElement extends HTMLElement {

    constructor() {

        super();

        const code = this.innerText.trim();

        this.innerHTML = eval( code );

    }

}

export { ExamplesElement };