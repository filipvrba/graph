import { ChildNode } from "./childNode.js";

class SignalNode extends ChildNode {

    constructor( child ) {

        super( child );

    }

    get emit() {

        const emit = super.get().getAttribute( 'emit' );
        return ( emit === 'true' ) ? true : false;

    }

    get isOrigin() {

        return super.get().hasAttribute( 'origin' );

    }

    getOriginTemplate() {

        let template = '<sup>*</sup>';

        if ( !this.isOrigin ) {

            template = '';

        }

        return template;

    }

}

export { SignalNode };