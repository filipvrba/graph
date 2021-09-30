import { ChildrenElement } from "../childrenElement.js";

class PropertyDescElement extends ChildrenElement {

    constructor() {

        super();

    }

    getNodeName() {  //

        return 'prop';

    }

    initChild( child ) {

        this.childTemplate += this.createChildTemplate( child );
        
    }

    applyTemplate() {  //

        const template = `
        <div class="section name" id="property-descriptions">
            <h2>${ this.getAttribute( 'name' ) }</h2>
            ${ this.childTemplate }
        </div>
        `;

        this.innerHTML = template;

    }

    createChildTemplate( child ) {

        const nameSlim = this.getNameSlim( child.name );

        const template = `
        <div id="${ this.getNodeName() }-${ nameSlim }">
            <ul>
                <li>
                    <div>
                        ${ child.getTypeTemplate() }
                        <p><strong>${ child.name }</strong></p>
                    </div>
                </li>
            </ul>
            ${ this.getValueTemplate( child ) }
            <div class="description">
                ${ child.description }
            </div>
        </div>
        `;

        return template;

    }

    getValueTemplate( child ) {

        let template = '';

        if ( child.identity !== null ) {

            template = `
            <table>
                <colgroup>
                    <col style="width: 55%;">
                    <col style="width: 45%;">
                </colgroup>
                <tr>
                    <th>
                        <p>${ child.identity }</p>
                    </th>
                    <th>
                        ${ child.getValueTemplate() }
                    </th>
                </tr>
            </table>
            `;

        }

        return template;

    }

}

export { PropertyDescElement };