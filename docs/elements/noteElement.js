class NoteElement extends HTMLElement {

    constructor() {

        super();

        this.template = `
        <div class="${ this.getClass( 'note' ) }">
            <div id="icon-info" class="row">
                <p class="fa fa-bookmark ${ this.getClass( 'icolor' ) }"></p>
                <p><strong>${ this.name }</strong></p>
            </div>
            <div class="info-container">
                <p>${ this.innerHTML }</p>
            </div>
        </div>
        `;

        this.init();

    }

    init() {

        this.innerHTML = this.template;

    }

    get isWarning() {

        return this.hasAttribute( 'warning' );

    }

    get isError() {

        return this.hasAttribute( 'error' );

    }

    get name() {

        let name = this.getAttribute( 'name' );

        if ( !name ) {

            name = 'Info';

        }

        return name;

    }

    getClass( name ) {

        if ( this.isWarning ) {

            name += '-warning';

        } else if ( this.isError ) {

            name += '-error';

        }

        return name;

    }

}

export { NoteElement };