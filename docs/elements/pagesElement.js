class PagesElements extends HTMLElement {

    constructor() {

        super();

        // this.loadHandler = () => this.init();

        this.innerHTML = '<p class="fa fa-refresh loader"></p>';
        this.metaDescription = document.querySelector('meta[name="description"]');
        this.metaKeywords = document.querySelector('meta[name="keywords"]');
        this.metaAuthor = document.querySelector('meta[name="author"]');

        this.metaOgURL = document.querySelector('meta[property="og:url"]');
        this.metaOgSiteName = document.querySelector('meta[property="og:site_name"]');
        this.metaOgDescription = document.querySelector('meta[property="og:description"]');
        this.metaOgImage = document.querySelector('meta[property="og:image"]');

        this.metaOgImage.content = window.location.origin +
            window.location.pathname + 'static/pictures/logo_1024px.png';

    }

    async init() {

        const page = await getPage();
        this.load( page );

    }

    async load( page ) {

        const url = `${ getPath( page.dir ) }/${ page.path }.html`;

        this.applyMeta( page );

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

    applyMeta( page ) {

        // Keywords
        this.metaKeywords.content = `${ DOCUMENT }, ${ this.getKeywords( page ) }`;

        // URL
        this.metaOgURL.content = window.location.href;

        // Title
        this.metaOgSiteName.content = getPageName();

        // Image
        this.metaOgImage.content = window.location.origin +
            window.location.pathname + 'static/pictures/logo_1024px.png';

        // Description
        const smallDesc = document.getElementById( 'small-desc' );
        if ( smallDesc ) {
            this.metaDescription.content = smallDesc.innerText;
            this.metaOgDescription.content = smallDesc.innerText;
        }

        // Author
        this.metaAuthor.content = AUTHOR;

    }

    getKeywords( page ) {

        let categories = page.path;
        
        const literalSearch = '/index';
        if ( categories.indexOf( literalSearch ) > -1 ) {

            categories = categories.replace( literalSearch, '' );

        }

        categories = categories.replaceAll( '/', ', ' );

        return categories;

    }

    applyHash() {

        if ( hash !== '' ) {

            window.location.replace( hash );

        }

    }

    connectedCallback() {

        window.addEventListener( 'load', this.loadHandler );

    }

    disconnectedCallback() {

        window.removeEventListener( 'load', this.loadHandler );

    }

}

export { PagesElements };