import { ChildrenElement } from "./childrenElement.js";

class ParametersElement extends ChildrenElement {

    constructor() {

        super();

    }

    getAccesParameterName() {

        return 'para';

    }

    getTemplate() {

        return `
        <ul>
            <ul>
                *
            </ul>
        </ul>
        `;

    }

    parameters( child ) {

        const paraTemplates = [ ];

        for ( const parameter of child.children ) {

            if ( parameter.localName === this.getAccesParameterName() ) {

                const name = parameter.getAttribute( 'name' );
                const decs = parameter.innerHTML.trim();

                paraTemplates.push( this.getParaTemplate( name, decs ) );

                parameter.innerHTML = '';

            }

        }

        if ( paraTemplates.length === 0 ) return '';

        return this.createTemplate( paraTemplates.join( '' ) );

    }

    getParaTemplate( name, decs ) {

        return `
        <li class="p-default">
            <code><span>${ name }</span></code> ${ decs }
        </li>
        `;

    }


    createTemplate( paraTemplates ) {

        let template = this.getTemplate();
        const pointer = template.indexOf( '*' );

        template = template.insertTemplate( pointer, paraTemplates )

        return template;

    }

    removeDescription( decs = '' ) {

        while ( decs.search( `<${ this.getAccesParameterName() }` ) > -1 ) {

            const endPara = `</${ this.getAccesParameterName() }>`;

            const start = decs.indexOf( `<${ this.getAccesParameterName() }` );
            const end = decs.indexOf( `</${ this.getAccesParameterName() }>` );
            const _decs = decs.substring( start, end + endPara.length );

            decs = decs.replace( _decs, '' );

        }

        return decs;

    }

    child( type, name, value, desc, child ) {

        const parameters = this.parameters( child );
        const _desc = this.removeDescription( desc );

        const typeTemplate = this.getTypeTemplate( type );

        desc = `${ parameters }${ _desc }`;
        this.childTemplate += this.createChildTemplate( typeTemplate, name, desc );

    }

    /**
     * This is abstract method.
     */
     createChildTemplate( typeTemplate, name, desc ) {

            throw 'Abstract class createChildTemplate( ... ) must by implemented.';
            
        }

}

export { ParametersElement };