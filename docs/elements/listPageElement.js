class ListPagesElement extends HTMLElement {

    constructor() {

        super();

        this.parent = this.getAttribute( 'parent' );

        this.init();

    }

    async init() {

        const data = await getData();
        const files = data.files;
        
        let template = '';

        // Object convet to map;
        const filesMap = new Map();
        Object.keys( files ).forEach( key => {

            filesMap.set( key, files[ key ] );

        });

        // Find the same parent on an files.
        filesMap.forEach( ( file, name ) => {

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

            template += `
                <li>
                    <p>
                        <a href="?${ nameFile }">
                            <span>${ capitalized( nameFile ) }</span>
                        </a>
                    </p>
                </li>
            `;

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

}

export { ListPagesElement };