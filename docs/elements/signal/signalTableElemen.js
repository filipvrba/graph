import { MethodsTableElement } from "../method/methodsTableElement.js";
import { SignalNode } from "../../src/node/signalNode.js";

class SignalTableElement extends MethodsTableElement {

    constructor() {

        super();

    }

    getNodeName() {

        return 'sign';

    }

    getID() {

        return 'signals';

    }

    getIcon( isEmit ) {

        if ( isEmit ) {

            return 'rss';

        }

        return 'wifi';

    }

    initChild( child ) {

        child = new SignalNode( child.get() );
        this.childTemplate += this.createChildTemplate( child );

    }

    createChildTemplate( child ) {

        const icon = this.getIcon( child.emit );

        const name = `
        <th class="row">
            <p class="fa fa-${ icon }"></p>
            <p>${ child.name }</p>
        </th>
        `;

        const id = `${ this.getNodeName() }-${ child.name }`;
        const trNode = '<tr';
        const trNodeID = `${ trNode } id="${ id }"`;
        
        let template = this.getRowTemplate( name, child.description );
        template = template.replace( trNode, trNodeID );

        return template;

    }

}

export { SignalTableElement };