class PagesElements extends HTMLElement {

    constructor() {

        super();

        this.init();

    }

    async init() {

        const page = await getPage();

        fetch( `${ getPath( page.dir ) }/${ page.path }.html` )
        .then( res => res.text() )
        .then( template => { this.applyTemplate( template ) } );

    }

    applyTemplate( template ) {

        this.innerHTML = template;

    }

}

export { PagesElements };