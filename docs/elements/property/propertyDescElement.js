import { ChildrenElement } from "../childrenElement.js";

import { TableNode } from "../../src/node/property/tableNode.js";
import { ParametersNode } from "../../src/node/method/parametersNode.js";

class PropertyDescElement extends ChildrenElement {

    constructor() {

        super();

    }

    init() {

        this.tableNode = new TableNode();

    }

    getNodeName() {  //

        return 'prop';

    }

    initChild(child) {

        const tableTemplate = this.tableNode.getTemplate( child.get() );

        let description = child.description;
        if (tableTemplate !== '') {

            description = this.tableNode.removeDescription(description);

        }

        const values = {

            child,
            tableTemplate,
            description

        };

        this.childTemplate += this.createChildTemplate(values);

    }

    applyTemplate() {  //

        const template = `
        <div class="section name" id="property-descriptions">
            <h2>${this.getAttribute('name')}</h2>
            ${this.childTemplate}
        </div>
        `;

        this.innerHTML = template;

    }

    createChildTemplate(values) {

        const nameSlim = this.getNameSlim(values.child.name);

        const template = `
        <div id="${this.getNodeName()}-${nameSlim}">
            <ul>
                <li>
                    <div class="row">
                        ${values.child.getTypeTemplate()}
                        <p><strong>${values.child.name}</strong></p>
                    </div>
                </li>
            </ul>
            ${values.tableTemplate}
            <div class="description">
                ${this.getDescription(values.description)}
            </div>
        </div>
        `;

        return template;

    }

    getDescription( description = '' ) {

        const parametersNode = new ParametersNode();

        if ( description.indexOf( parametersNode.getName() ) != -1 ) {

            const node = this.querySelector('note-info');
            const parametersTemplate = parametersNode.getTemplate( node );

            if (parametersTemplate !== '') {

                description = parametersNode.removeDescription(
                    description);

                const descLeft = description.substring( 0, parametersNode.index );
                const descRigth = description.substring( parametersNode.index );
                description = descLeft + parametersTemplate + descRigth;

            }

        }

        return description;

    }

}

export { PropertyDescElement };