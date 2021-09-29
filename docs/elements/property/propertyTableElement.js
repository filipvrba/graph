import { ChildrenElement } from '../childrenElement.js'

class PropertyTableElement extends ChildrenElement {

    constructor() {

        super();

    }

    initChild( child ) {

        const type = child.getAttribute( 'type' );
        const name = child.getAttribute( 'name' );
        const value = child.getAttribute( 'value' );

        const typeTemplate = this.getTypeTemplate( type );
        const valueTemplate = this.getValueTemplate( value );

        this.childTemplate = ( this.childTemplate === undefined )
            ? ''
            : this.childTemplate;

        this.childTemplate += this.createChildTemplate( typeTemplate,
            name, valueTemplate );

    }

    getNodeName() {

        return 'prop';

    }

    applyTemplate() {

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

    getValueTemplate( value ) {

        let template = `
        <p>
            <code>
                <span>${ value }</span>
            </code>
        </p>
        `;

        if ( value.indexOf( '<' ) > -1 ) {
            
            template = value;
        
        }

        return template;

    }

    createChildTemplate( type, name, value ) {

        const nameSlim = this.getNameSlim( name );

        const template = `
        <tr>
            <th>
                ${ type }
            </th>
            <th>
                <p>
                    <a href="#${ this.getNodeName() }-${ nameSlim }">${ name }</a>
                </p>
            </th>
            <th>
                ${ value }
            </th>
        </tr>
        `;

        return template;

    }

}

export { PropertyTableElement };