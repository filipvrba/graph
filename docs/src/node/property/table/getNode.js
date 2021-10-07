import { CustomNode } from "./customNode.js";

class GetNode extends CustomNode {

    constructor() {

        super();

    }

    // Virtual function
    getName() {

        return 'get';

    }

}

export { GetNode };