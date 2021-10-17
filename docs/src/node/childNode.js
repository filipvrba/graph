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
            <s-c>${ value }</s-c>
        </p>
        `;

        /**
         * If still exist a node from value,
         * so don't apply the literal from template.
         * 
         * Example: value = <select-color />
         */
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

        type = this.getVirtualTemplate() + this.getLambdaTemplate() + type;

        return type;

    }

    getVirtualTemplate() {

        const pClass = 'class="fa fa-pencil-square-o"';
        let template = `<p ${ pClass }></p>`;

        if ( this.virtual === null ) {

            template = '';

        } else if ( this.virtual !== '' ) {

            template = `
            <p>
                <a ${ pClass } href="${ this.virtual }" title="Virtual function"></a>
            </p>
            `;

        }

        return template;

    }

    getLambdaTemplate() {

        const symbol = '&#955;';
        let template = '';

        if ( this.hasLambda ) {

            template = `
            <p id="lambda" class="fa" title="Anonymous function">
                ${ symbol }
            </p>`;
            
        }

        return template;

    }

    setChild( value ) {

        this.#child = value;

    }

    get() {

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

        let value = this.description;

        if ( value.trim() === '' ) {
            
            value = this.#child.getAttribute( 'value' );

        }

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

    get virtual() {

        return this.#child.getAttribute( 'virtual' );

    }

    get hasLambda() {

        return this.#child.hasAttribute( 'lambda' );

    }

}

export { ChildNode };