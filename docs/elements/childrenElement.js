import { ChildNode } from '../src/node/childNode.js';

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

                this.hr( child.outerHTML );
                continue;

            }

            this.initChild( new ChildNode( child ) );

        }

    }

    getNameSlim( name ) {

        let nameSlim = ( name.indexOf( ' ' ) > -1 )
        ? name.split( ' ' )[ 0 ]
        : name;

        return nameSlim;

    }

    hr( outerHTML ) {

        this.childTemplate += outerHTML;

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