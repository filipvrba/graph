class FooterElement extends HTMLElement {

    constructor() {

        super();

        this.author = this.getAttribute( 'author' );
        this.linkedin = this.getAttribute( 'linkedin' );
        this.createYear = 2021;
        this.github = GITHUB_URL + DOCUMENT;
        this.circles = GITHUB_URL + CIRCLES;

        this.init();

    }

    async init() {

        let page = await getPage();

        const isIndex = page.path.indexOf( INDEX ) > -1;
        const isApi = page.dir === 'api' ;

        const isExemples = page.path.indexOf( "exemples" ) > -1;

        if ( isApi ) {

            const pageName = getPageName();

            const apiPath = this.getApiPath( page.path );

            this.innerHTML = this.getTemplate( `${ this.github}/tree/master/src/${ apiPath }`,
                `${ pageName } - ${ this.getLinkDescription( !isIndex ) }` );

        } else if ( isExemples && !isIndex ) {

            const pageName = getPageName().toLowerCase();
            this.innerHTML = this.getLinkTemplate( GITHUB_URL + pageName, pageName, isApi );

        } else {

            this.innerHTML = this.getLinkTemplate( this.github, DOCUMENT, isApi );
        }
    }

    getLinkTemplate( uri, name, isApi ) {

        return this.getTemplate( uri, `${ capitalized( name ) } - ${ this.getLinkDescription( isApi ) }` );
    }

    getLinkDescription( isApi ) {

        if ( isApi ) {

            return 'source code';

        }

        return 'repository codes';

    }

    getApiPath( path ) {

        const arrayPath = path.split( '/' );

        if ( arrayPath.indexOf( INDEX ) > -1 ) {

            return path.replace( INDEX, '' );

        }

        return `${ path }.js`;

    }

    getTime() {

        const time = new Date();
        if ( time.getFullYear() > this.createYear ) {

            return `${ this.createYear } - ${ time.getFullYear() }`;

        }

        return this.createYear.toString();

    }

    getTemplate( urlGithub, nameGithub ) {

        return `
            <p>&copy; Copyright ${ this.getTime() }, <a href="?author">${ AUTHOR }</a>.
            </p>
            <div class="github">
                <p class="fa fa-github"></p>
                <p>
                    <a href="${ urlGithub }">${ nameGithub }</a>
                </p>
            </div>
        `;

    }

}

export { FooterElement };