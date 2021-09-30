class ChildNode {

    #child;

    constructor( child ) {

        this.setChild( child );

    }

    getValueTemplate() {

        let value = this.value;

        if ( value === null || value === '' ) return '';

        let template = `
        <p>
            <code>
                <span>${ value }</span>
            </code>
        </p>
        `;

        if ( value.indexOf( '<' ) > -1 ) {
            
            template = value;
        
        }

        return template;

    }

    getTypeTemplate() {

        let type = this.type;

        const typeArray = type.split( ':' );
        const typeChar = typeArray[ 0 ];
        const typeName = typeArray[ 1 ];

        switch ( typeChar ) {

            case 'o':  // Object
                type = `<obj-type type="${ capitalized( typeName ) }"></obj-type>`;
                break;
            case 'c':  // Class
                type = `<class-type type="${ typeName }"></class-type>`;
                break;
            case 'a':  // API
                type = `<p><a href="?${ typeName }">${ capitalized(typeName) }</a></p>`;
                break;

        }

        return type;

    }

    setChild( value ) {

        this.#child = value;

    }

    getChild() {

        return this.#child;

    }

    get name() {

        return this.#child.getAttribute( 'name' );

    }

    get type() {

        return this.#child.getAttribute( 'type' );

    }

    get value() {

        return this.arrayValue[ 1 ];

    }

    get identity() {

        return this.arrayValue[ 0 ];

    }

    get arrayValue() {

        let value = this.#child.getAttribute( 'value' );

        if ( value !== null ) {

            if ( value.indexOf( ':' ) !== -1 ) {

                value = value.split( ':' );
            
            } else {

                value = [ null, value ];

            }

        } else {

            value = [ null, null ];

        }

        return value;

    }

    get description() {

        return this.#child.innerHTML;

    }

}

export { ChildNode };