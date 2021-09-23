import { ChildrenElement } from "./childrenElement.js";

class PropertyDescElement extends ChildrenElement {

    constructor() {

        super();

    }

    getAccesNodeName() {

        return 'prop';

    }

    child( type, name, value, desc ) {

        const typeTemplate = this.getTypeTemplate( type );

        this.setDefaulChildTemplate();
        
        this.childTemplate += this.createChildTemplate( typeTemplate, name,
            value, desc );
        
    }

    hr() {

        this.setDefaulChildTemplate();

        this.childTemplate += '<hr>';

    }

    setDefaulChildTemplate() {

        this.childTemplate = ( this.childTemplate === undefined )
            ? ''
            : this.childTemplate;

    }

    applyTemplate() {

        const template = `
        <div class="section name" id="property-descriptions">
            <h2>${ this.getAttribute( 'name' ) }</h2>
            ${ this.childTemplate }
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

    createChildTemplate( type, name, value, desc ) {

        const nameSlim = this.getNameSlim( name );

        const valueArray = value.split( ':' );
        const valueIdentity = valueArray[ 0 ];
        value = valueArray[ 1 ];

        const valueTemplate = this.getValueTemplate( value );

        const template = `
        <div id="${ this.getAccesNodeName() }-${ nameSlim }">
            <ul>
                <li>
                    <p>
                        ${ type }
                        <strong>${ name }</strong>
                    </p>
                </li>
            </ul>
            <table>
                <colgroup>
                    <col style="width: 55%;">
                    <col style="width: 45%;">
                </colgroup>
                <tr>
                    <th>
                        ${ valueIdentity }
                    </th>
                    <th>
                        ${ valueTemplate }
                    </th>
                </tr>
            </table>
            <div class="description">
                ${ desc }
            </div>
        </div>
        `;

        return template;

    }

}

export { PropertyDescElement };