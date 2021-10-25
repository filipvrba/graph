class ListPagesElement extends HTMLElement {

    constructor() {

        super();

        this.parent = this.getAttribute( 'parent' );

        this.init();

    }

    async init() {
        
        let template = '';

        const files = await getFiles();

        // Find the same parent on an files.
        files.forEach( ( file, name ) => {

            if ( file.dir === 'api' ) {

                const path = file.path;
                template += this.createTemplate( name, path );

            }

        });

        this.applyTemplate( template );
        
    }

    createTemplate( nameFile, path ) {

        // Path variables
        const pathArray = path.split( '/' );

        const parent = pathArray[ pathArray.length - 2 ];
        const name = pathArray[ pathArray.length - 1 ];

        const isParent = parent === this.parent;
        const isIndex = name === INDEX;

        let template = '';

        if ( pathArray.length > 1 && isParent && !isIndex ) {

            template += this.getCustomTemplate( nameFile );

        } else if ( isIndex && !this.parent  ) {

            template += this.getCustomTemplate( parent );

        }

        return template;

    }

    applyTemplate( template ) {

        this.innerHTML = `
            <ul>
                ${ template }
            </ul>
        `;

    }

    getCustomTemplate( name ) {

        return `
        <li>
            <p>
                <a href="?${ name }">
                    <span>${ capitalized( name ) }</span>
                </a>
            </p>
        </li>
        `;

    }

}

export { ListPagesElement };