class FooterElement extends HTMLElement {

    constructor() {

        super();

        this.author = this.getAttribute( 'author' );
        this.linkedin = this.getAttribute( 'linkedin' );
        this.createYear = 2021;
        this.github = 'https://github.com/filipvrba/graph';

        this.init();

    }

    async init() {

        let page = await getPage();

        if ( page.dir === 'api' ) {

            const pageName = getPageName();

            const apiPath = this.getApiPath( page.path );

            this.innerHTML = this.getTemplate( `${ this.github}/tree/master/src/${ apiPath }`,
                `${ pageName } - source code` );

        } else {

            this.innerHTML = this.getTemplate( this.github, `${ capitalized( DOCUMENT ) } - repository codes` );

        }

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
            <p>&copy; Copyright ${ this.getTime() }, <a href="${ this.linkedin }">${ this.author }</a>.
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