import { ChildrenElement } from "./childrenElement.js";

class MethodDescElement extends ChildrenElement {

    constructor() {

        super();

    }
    
    child( type, name, value, desc ) {

        const typeTemplate = this.getTypeTemplate( type );

        this.setDefaulChildTemplate();
        
        this.childTemplate += this.createChildTemplate( typeTemplate, name, desc );

    }

    getAccesNodeName() {

        return 'meth';
        
    }

    applyTemplate() {

        const id = this.getID();

        const template = `
        <div class="section name" id="${ id }">
            <h2>${ this.getAttribute( 'name' ) }</h2>
            ${ this.childTemplate }
        </div>
        `;

        console.log( template );

        this.innerHTML = template;

    }

    createChildTemplate( type, name, desc ) {

        const nameSlim = this.getNameSlim( name );

        let liType = `
        <p>
            ${ type }
            <strong>${ name }</strong>
        </p>
        `;

        if ( this.isStatic ) {

            liType = `
            <div class="row">
                <p class="${ STATIC }"></p>
                ${ type }
                <p>
                    <strong>${ name }</strong>
                </p>
            </div>
            `;

        }

        const template = `
        <div id="${ this.getAccesNodeName() }-${ nameSlim }">
            <ul>
                <li>
                    ${ liType }
                </li>
            </ul>
            <div class="description">
                ${ desc }
            </div>
        </div>
        `;

        return template;

    }

    getID() {

        let id = 'method-descriptions';
        if ( this.isStatic ) id += '-static';

        return id;

    }

    get isStatic() {

        return this.getAttribute( 'static' ) === 'true';

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

}

export { MethodDescElement };