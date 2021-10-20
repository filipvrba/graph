class PagesElements extends HTMLElement {

    constructor() {

        super();

        this.innerHTML = '<p class="fa fa-refresh loader"></p>';
        this.metaDescription = document.querySelector('meta[name="description"]');
        this.metaKeywords = document.querySelector('meta[name="keywords"]');
        this.metaAuthor = document.querySelector('meta[name="author"]');

        this.init();

    }

    async init() {

        let page = await getPage();
        this.load( page );

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
        this.applyMeta( template );
        this.applyHash();

        const event = new CustomEvent( 'loadedPage' );
        document.dispatchEvent( event );

    }

    applyTemplate( template ) {

        this.innerHTML = template;

    }

    applyMeta( template ) {

        const smallDesc = document.getElementById( 'small-desc' );
        this.metaDescription.content = smallDesc.innerText;

    }

    applyHash() {

        if ( hash !== '' ) {

            window.location.replace( hash );

        }

    }

}

export { PagesElements };