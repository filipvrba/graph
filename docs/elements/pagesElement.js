class PagesElements extends HTMLElement {

    constructor() {

        super();

        this.innerHTML = '<p class="fa fa-refresh loader"></p>';

        this.init();

    }

    async init() {

        let page = await getPage();
        // this.load( page );

        fetch( `${ getPath( page.dir ) }/${ page.path }.html` )
        .then( res => res.text() )
        .then( template => { this.loaded( template ) } );

        

    }

    async load( page ) {

        const url = `${ getPath( page.dir ) }/${ page.path }.html`;
        let response = await fetch( url );

        if ( response.status === 200 ) {

            const template = await response.text();
            this.loaded( template )

        } else if ( response.status === 404 ) {

            page = await getFile( 'error' );
            this.load( page );

        }

    }

    loaded( template ) {

        this.applyTemplate( template );
        this.applyHash();

        const event = new CustomEvent( 'loadedPage' );
        document.dispatchEvent( event );

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