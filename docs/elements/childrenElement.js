/**
 * Abstract class.
 */
class ChildrenElement extends HTMLElement {

    constructor() {

        super();

        this.childTemplate = '';

        this.init();
        this.loopChildren();
        this.applyTemplate();

    }

    loopChildren() {

        for ( const child of this.children ) {

            if ( child.localName !== this.getNodeName() ||
                child.localName === 'hr' ) {

                this.hr();
                continue;

            }

            this.initChild( child );

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
                type = `<p><a href="?${ typeName }">${ capitalized(typeName) }</a></p>`;
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

    hr() {

        this.childTemplate += '<hr>';

    }

    /**
     * This is abstract method.
     */
     initChild( type, name, value, desc ) {

        throw 'Abstract class initChild( ... ) must by implemented.';
        
    }

    /**
     * This is abstract method.
     * She should get the constant node name from child.
     */
     getNodeName() {

        throw 'Abstract class getNodeName() must by implemented.';
        
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
    init() { }

}

export { ChildrenElement };