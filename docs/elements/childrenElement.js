/**
 * Abstract class.
 */
class ChildrenElement extends HTMLElement {

    constructor() {

        super();

        this.loopChildren();
        this.applyTemplate();

    }

    loopChildren() {

        for ( const child of this.children ) {

            if ( child.localName !== this.getAccesNodeName() ||
                child.localName === 'hr' ) {

                this.hr();
                continue;

            }

            const childType = child.getAttribute( 'type' );
            const childName = child.getAttribute( 'name' );
            const childValue = child.getAttribute( 'value' );
            const childDescription = child.innerHTML;

            this.child( childType, childName, childValue, childDescription );

        }

    }

    getTypeTemplate( type ) {

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
                type = `<p><a href="?${ typeName }">${ typeName }</a></p>`;
                break;

        }

        return type;

    }

    getNameSlim( name ) {

        let nameSlim = ( name.indexOf( ' ' ) > -1 )
        ? name.split( ' ' )[ 0 ]
        : name;

        return nameSlim;

    }

    /**
     * This is abstract method.
     */
    child( type, name, value, desc ) {

        throw 'Abstract class child( ... ) must by implemented.';
        
    }

    /**
     * This is abstract method.
     * She should get the constant node name from child.
     */
    getAccesNodeName() {

        throw 'Abstract class getAccesNodeName() must by implemented.';
        
    }

    /**
     * This is abstract method.
     */
    applyTemplate() {

        throw 'Abstract class applyTemplate() must by implemented.';

    }

    /**
     * This is abstract method.
     */
    hr() { }

}

export { ChildrenElement };