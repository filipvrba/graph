class MDNElement extends HTMLElement {

    constructor() {

        super();

        this.type = this.getAttribute( 'type' );

    }

    init( url ) {

        this.innerHTML = `
            <p>
                <a href="${ this.getUrlType( url ) }">
                    <span>${ this.type.toLowerCase() }</span>
                </a>
            </p>
        `;

    }

    getUrlType( url ) {

        return this.url + this.type;

    }

}

export { MDNElement };