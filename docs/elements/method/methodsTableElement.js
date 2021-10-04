import { ChildrenElement } from '../childrenElement.js';

class MethodsTableElement extends ChildrenElement {

    constructor() {

        super();

    }

    initChild( child ) {

        this.childTemplate += this.createChildTemplate( child );

    }

    getNodeName() {

        return 'meth';

    }

    applyTemplate() {

        const id = this.getID();

        const template = `
        <div class="section" id="${ id }">
            <h2>${ this.getAttribute( 'name' ) }</h2>
            <table>
                <colgroup>
                    <col style="width: 12%;">
                    <col style="width: 88%;">
                </colgroup>
                ${ this.childTemplate }
            </table>
        </div>
        `;

        this.innerHTML = template;

    }

    getRowTemplate( col1, col2 ) {

        return `
        <tr>
            ${ col1 }
            <th class="description">
                <p>
                    ${ col2 }
                </p>
            </th>
        </tr>
        `;

    }

    createChildTemplate( child ) {

        const nameSlim = this.getNameSlim( child.name );

        let thType = `
        <th>
            ${ child.getTypeTemplate() }
        </th>
        `;

        if ( this.isStatic ) {

            thType = `
            <th class="row">
                <p class="${ STATIC }"></p>
                ${ child.getTypeTemplate() }
            </th>
            `;

        }

        const linkName = `<a href="#${ this.getNodeName() }-${ nameSlim }">${ child.name }</a>`;
        const template = this.getRowTemplate( thType, linkName );

        return template;

    }

    getID() {

        let id = 'methods';
        if ( this.isStatic ) id += '-static';

        return id;

    }

    get isStatic() {

        return this.getAttribute( 'static' ) === 'true';

    }

}

export { MethodsTableElement };