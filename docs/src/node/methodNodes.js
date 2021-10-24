class MethodNodes {

    constructor() {

        this.index = -1;

    }
    
    // Public
    getTemplate( child ) {

        const nodeTemplate = [ ];

        for ( const node of child.children ) {

            const name = this.getName();  // Call virtual function
            if ( node.localName === name ) {

                nodeTemplate.push( this.getCustomTemplate( node ) );

                // Remove script
                node.innerHTML = '';

            }

        }

        if ( nodeTemplate.length === 0 ) return '';

        return this.#createTemplate( nodeTemplate.join( '' ) );

    }

    removeDescription( description = '', replace = '' ) {

        const name = this.getName();  // Call virtual function

        while ( this.#isInDesc( name, description ) ) {

            const desc = this.getDescription( name, description );
            description = description.replace( desc, replace );

        }

        return description;

    }

    getDescription( name, description ) {

        const endNode = `</${ name }>`;
        const start = description.indexOf( `<${ name }` );
        const end = description.indexOf( endNode );
        const desc = description.substring( start, end + endNode.length );

        return desc;

    }


    // Private
    #isInDesc( name, description ) {

        const isExist = this.#getDescIndex( name, description ) > -1;

        if ( isExist ) {

            this.index = this.#getDescIndex( name, description );

        }

        return isExist;

    }

    #getDescIndex( name, description ) {

        return description.search( `<${ name }` );

    }

    #createTemplate( customTemplate ) {

        let template = this.getDefaultTemplate();  // Call virtual function

        template = template.replace( '*', customTemplate )

        return template;

    }

}

export { MethodNodes };