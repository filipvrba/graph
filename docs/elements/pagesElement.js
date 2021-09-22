class PagesElements extends HTMLElement {

    constructor() {

        super();

        this.innerHTML = '<p class="fa fa-refresh loader"></p>';

        this.init();

    }

    async init() {

        const page = await getPage();

        fetch( `${ getPath( page.dir ) }/${ page.path }.html` )
        .then( res => res.text() )
        .then( template => { this.loaded( template ) } );

    }

    loaded( template ) {

        this.applyTemplate( template );
        this.applyHash();

    }

    applyTemplate( template ) {

        this.innerHTML = template;

    }

    applyHash() {

        if ( hash !== '' ) {

            window.location.replace( hash );

        }

    }

}

export { PagesElements };