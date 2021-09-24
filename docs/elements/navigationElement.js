class NavigationElement extends HTMLElement {

    constructor() {

        super();

        this.init();

    }

    async init() {

        this.createNavigation();

    }

    async createNavigation() {

        const page = await getPage();

        const categories = page.path.split( '/' );  // Create array
        const homeTemplate = this.getHomeTemplate();

        // Remove index on path
        const idIndex = categories.indexOf( INDEX );
        if ( idIndex > -1 ) {

            categories.splice( idIndex, 1 );

        }

        let template = `<ul>\n${ homeTemplate }`;
        for ( let i = 0; i < categories.length; i++ ) {


            if ( i < categories.length - 1 ) {
                template += `<li>
                    <p>
                        <a href="?${ categories[ i ] }">${ categories[ i ] }</a>
                    </p>
                </li>
                <li><p>&raquo;</p></li>`;
            } else {

                template += `<li><p><strong>${ categories[ i ] }</strong></p></li>`;
                this.titleChange( page.dir, categories[ i ] );

            }

        }
        template += '</ul>';

        this.innerHTML = template;
        
    }

    titleChange( dir, page ) {

        setTitle( `${ capitalized( page ) } - ${ DOCUMENT } ${ dir }` );

    }

    getHomeTemplate() {

        const template = `
        <li>
            <p>
                <a onclick="document.dispatchEvent( clickHomeEvent );" class="fa fa-home" style="font-size: 22px;"></a>
            </p>
        </li>
        <li><p>&raquo;<p></li>`;

        return template;

    }

}

export { NavigationElement };