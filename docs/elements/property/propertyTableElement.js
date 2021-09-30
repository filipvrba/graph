import { ChildrenElement } from '../childrenElement.js'

class PropertyTableElement extends ChildrenElement {

    constructor() {

        super();

    }

    initChild( child ) {

        this.childTemplate += this.createChildTemplate( child );

    }

    getNodeName() {  //

        return 'prop';

    }

    applyTemplate() {  //

        const template = `
        <div class="section" id="properties" >
            <h2>${ this.getAttribute( 'name' ) }</h2>
            <table>
                <colgroup>
                    <col style="width: 38%;">
                    <col style="width: 50%;">
                    <col style="width: 13%;">
                </colgroup>
                ${ this.childTemplate }
            </table>
        </div>
        `;

        this.innerHTML = template;

    }

    createChildTemplate( child ) {

        const nameSlim = this.getNameSlim( child.name );

        const template = `
        <tr>
            <th>
                ${ child.getTypeTemplate() }
            </th>
            <th>
                <p>
                    <a href="#${ this.getNodeName() }-${ nameSlim }">${ child.name }</a>
                </p>
            </th>
            <th>
                ${ child.getValueTemplate() }
            </th>
        </tr>
        `;

        return template;

    }

}

export { PropertyTableElement };