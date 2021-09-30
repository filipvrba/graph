import { ChildrenElement } from "../childrenElement.js";

import { ParametersNode } from "../../src/node/method/parametersNode.js";
import { ReturnNode } from "../../src/node/method/returnNode.js";

class MethodDescElement extends ChildrenElement {

    constructor() {

        super();

    }

    init() {

        this.parametersNode = new ParametersNode();
        this.returnNode = new ReturnNode();

    }

    initChild( child ) {

        const parametersTemplate = this.parametersNode.getTemplate( child.getChild() );
        const returnTemplate = this.returnNode.getTemplate( child.getChild() );

        let description = child.description;
        if ( parametersTemplate !== '' ) {

            description = this.parametersNode.removeDescription( description );

        } else if (returnTemplate !== '' ) {

            description = this.returnNode.removeDescription( description );

        }

        const values = {

            typeTemplate: child.getTypeTemplate(),
            nameMethod: child.name,
            parametersTemplate,
            returnTemplate,
            description

        };

        this.childTemplate += this.createChildTemplate( values );

    }

    getNodeName() {
        
        return 'meth';

    }

    applyTemplate() {

        const id = this.getID();

        const template = `
        <div class="section name" id="${id}">
            <h2>${this.getAttribute('name')}</h2>
            ${this.childTemplate}
        </div>
        `;

        this.innerHTML = template;

    }

    createChildTemplate( values ) {

        const nameSlim = this.getNameSlim( values.nameMethod );

        let pStatic = '';

        if (this.isStatic) {

            pStatic = `<p class="${STATIC}"></p>`;

        }


        let classPara = '';
        if ( values.parametersTemplate.length > 0 ) {

            classPara = 'parameters';

        }

        const template = `
        <div id="${this.getNodeName()}-${nameSlim}">
            <ul id="meth-name" class="${ classPara }">
                <li>
                    <div class="row">
                        ${pStatic}
                        ${ values.typeTemplate }
                        <p>
                            <strong>${ values.nameMethod }</strong>
                        </p>
                    </div>
                </li>
            </ul>
            <div class="description">
                ${ values.parametersTemplate }
                ${ values.description }
                ${ values.returnTemplate }
            </div>
        </div>
        `;

        return template;

    }

    getID() {

        let id = 'method-descriptions';
        if (this.isStatic) id += '-static';

        return id;

    }

    get isStatic() {

        return this.getAttribute('static') === 'true';

    }

}

export { MethodDescElement };