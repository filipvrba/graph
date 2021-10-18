class MDNElement extends HTMLElement {

    constructor() {

        super();

        this.type = this.getAttribute( 'type' );

    }

    init( url, isLowerCase = true ) {

        const type = isLowerCase ? this.type.toLowerCase(): this.type;
    
        this.innerHTML = `
            <p>
                <a href="${ this.getUrlType() }">
                    <span>${ type }</span>
                </a>
            </p>
        `;

    }

    getUrlType() {

        return this.url + this.type;

    }

}

export { MDNElement };