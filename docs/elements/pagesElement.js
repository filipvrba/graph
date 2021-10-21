import { MethodNodes } from "../src/node/methodNodes.js";

class PagesElements extends HTMLElement {

    constructor() {

        super();

        this.loadHandler = () => this.init();

        this.innerHTML = '<p class="fa fa-refresh loader"></p>';
        this.metaDescription = document.querySelector('meta[name="description"]');
        this.metaKeywords = document.querySelector('meta[name="keywords"]');
        this.metaAuthor = document.querySelector('meta[name="author"]');

        this.metaOgImage = document.querySelector('meta[property="og:image"]');
        this.metaOgImageAlt = document.querySelector('meta[property="og:image:alt"]');
        this.metaOgURL = document.querySelector('meta[property="og:url"]');
        this.metaOgSiteName = document.querySelector('meta[property="og:site_name"]');
        this.metaOgDescription = document.querySelector('meta[property="og:description"]');
        this.metaOgTitle = document.querySelector('meta[property="og:title"]');

    }

    async init() {

        const page = await getPage();
        this.load( page );

    }

    async load( page ) {

        const url = `${ getPath( page.dir ) }/${ page.path }.html`;
        let response = await fetch( url );

        if ( response.status === 200 ) {

            const template = await response.text();
            this.loaded( page, template )

        } else if ( response.status === 404 ) {

            page = await getFile( 'error' );
            this.load( page );

        }

    }

    loaded( page, template ) {

        this.applyMeta( page, template )
        this.applyTemplate( template );
        this.applyHash();

        const event = new CustomEvent( 'loadedPage' );
        document.dispatchEvent( event );

    }

    applyTemplate( template ) {

        this.innerHTML = template;

    }

    applyMeta( page, template ) {

        // Keywords
        this.metaKeywords.setAttribute( 'content', `${ DOCUMENT }, ${ this.getKeywords( page ) }` );

        // URL
        this.metaOgURL.setAttribute( 'content', window.location.href );

        // Title
        this.metaOgSiteName.setAttribute( 'content', getPageName() );
        this.metaOgTitle.setAttribute( 'content', getPageName() );

        // Image
        this.metaOgImage.setAttribute( 'content', window.location.origin +
            window.location.pathname + 'static/pictures/graph_social.png' );

        // Description
        const templateElement = document.createElement('html');
        templateElement.innerHTML = template;
        const smallDesc = templateElement.querySelector( '#small-desc' );

        if ( smallDesc ) {
            this.metaDescription.setAttribute( 'content', smallDesc.innerText );
            this.metaOgDescription.setAttribute( 'content', smallDesc.innerText );
            this.metaOgImageAlt.setAttribute( 'content', smallDesc.innerText );
        }

        // Author
        this.metaAuthor.setAttribute( 'content', AUTHOR );

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

        // window.addEventListener( 'load', this.loadHandler );
        this.init();

    }

    disconnectedCallback() {

        // window.removeEventListener( 'load', this.loadHandler );

    }

}

export { PagesElements };