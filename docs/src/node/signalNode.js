import { ChildNode } from "./childNode.js";

class SignalNode extends ChildNode {

    constructor( child ) {

        super( child );

    }

    get emit() {

        const emit = super.get().getAttribute( 'emit' );
        return ( emit === 'true' ) ? true : false;

    }

}

export { SignalNode };