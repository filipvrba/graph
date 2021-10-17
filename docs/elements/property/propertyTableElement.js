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

        // <col style="width: 38%;">
        // <col style="width: 50%;">
        // <col style="width: 13%;">

        const template = `
        <div class="section table-responsive" id="properties" >
            <h2>${ this.getAttribute( 'name' ) }</h2>
            <table>
                <col style="width: auto;">
                <col style="width: 50%;">
                <col style="width: auto;">
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
                <div class="row">
                    ${ child.getTypeTemplate() }
                </div>
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