class MethodNodes {
    
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

    removeDescription( description = '' ) {

        const name = this.getName();  // Call virtual function

        while ( description.search( `<${ name }` ) > -1 ) {

            const endNode = `</${ name }>`;

            const start = description.indexOf( `<${ name }` );
            const end = description.indexOf( `</${ name }>` );
            const decs = description.substring( start, end + endNode.length );

            description = description.replace( decs, '' );

        }

        return description;

    }


    // Private
    #createTemplate( customTemplate ) {

        let template = this.getDefaultTemplate();  // Call virtual function

        template = template.replace( '*', customTemplate )

        return template;

    }

}

export { MethodNodes };