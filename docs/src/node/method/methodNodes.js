class MethodNodes {
    
    // Public
    getTemplate( child ) {

        const nodeTemplate = [ ];

        for ( const node of child.children ) {

            if ( node.localName === this.getName() ) {

                nodeTemplate.push( this.getCustomTemplate( node ) );

                // Remove script
                node.innerHTML = '';

            }

        }

        if ( nodeTemplate.length === 0 ) return '';

        return this.#createTemplate( nodeTemplate.join( '' ) );

    }

    removeDescription( description = '' ) {

        while ( description.search( `<${ this.getName() }` ) > -1 ) {

            const endNode = `</${ this.getName() }>`;

            const start = description.indexOf( `<${ this.getName() }` );
            const end = description.indexOf( `</${ this.getName() }>` );
            const decs = description.substring( start, end + endNode.length );

            description = description.replace( decs, '' );

        }

        return description;

    }


    // Private
    #createTemplate( customTemplate ) {

        let template = this.getDefaultTemplate();

        template = template.replace( '*', customTemplate )

        return template;

    }

}

export { MethodNodes };