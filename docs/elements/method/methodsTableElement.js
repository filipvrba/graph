import { ChildrenElement } from '../childrenElement.js';

class MethodsTableElement extends ChildrenElement {

    constructor() {

        super();

    }

    initChild( child ) {

        const type = child.getAttribute( 'type' );
        const name = child.getAttribute( 'name' );

        const typeTemplate = this.getTypeTemplate( type );

        this.childTemplate = ( this.childTemplate === undefined )
            ? ''
            : this.childTemplate;

        this.childTemplate += this.createChildTemplate( typeTemplate,
            name );

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

    createChildTemplate( type, name ) {

        const nameSlim = this.getNameSlim( name );

        let thType = `
        <th>
            ${ type }
        </th>
        `;

        if ( this.isStatic ) {

            thType = `
            <th class="row">
                <p class="${ STATIC }"></p>
                ${ type }
            </th>
            `;

        }

        const template = `
        <tr>
            ${ thType }
            <th>
                <p>
                    <a href="#${ this.getNodeName() }-${ nameSlim }">${ name }</a>
                </p>
            </th>
        </tr>
        `;

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