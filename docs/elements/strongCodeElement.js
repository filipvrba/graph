class StrongCodeElement extends HTMLElement {

    constructor() {

        super();

        this.innerHTML = this.getDefaulTemplate( this.innerHTML );

    }

    getDefaulTemplate( value ) {

        return `
        <code><span>${ value }</span></code>
        `;

    }

}

export { StrongCodeElement };