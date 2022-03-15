import { MethodNodes } from "../methodNodes.js";

import { ValueNode } from "./table/valueNode.js";
import { GetNode } from "./table/getNode.js";
import { SetNode } from "./table/setNode.js";

class TableNode extends MethodNodes {

    constructor() {

        super();

        const valueNode = new ValueNode();
        const getNode = new GetNode();
        const setNode = new SetNode();

        this.nodes = [ valueNode, getNode, setNode ];

    }

    // Virtual function
    getName() {

        return 'tab';

    }

    // Virtual function
    getDefaultTemplate() {

        return `
        <div class="table-responsive">
            <table>
                *
            </table>
        </div>
        `;
    }

    // Virtual function
    getCustomTemplate( node ) {

        const customTemplate = () => `
        <tr>
            *
        </tr>
        `;

        let template = '';

        for ( const _node of this.nodes ) {

            if ( typeof _node.getTemplate === 'undefined' ) continue;

            _node.getDefaultTemplate = customTemplate;  // It is Prototype
            template += _node.getTemplate( node );

        }

        return template;

    }

}

export { TableNode };
