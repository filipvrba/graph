import { ChildNode } from "../../childNode.js";
import { MethodNodes } from "../../methodNodes.js";

class CustomNode extends MethodNodes {

    constructor() {

        super();

    }

    // Virtual function
    getCustomTemplate( node ) {

        const child = new ChildNode( node );

        let template = '';

        template = `
        <th>
            <p>${ this.getName() }</p>
        </th>
        <th>
            <p>${ child.description }</p>
        </th>
        `;


        return template;

    }

}

export { CustomNode };