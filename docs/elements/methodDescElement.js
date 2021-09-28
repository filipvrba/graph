import { ParametersElement } from "./parametersElement.js"

class MethodDescElement extends ParametersElement {

    constructor() {

        super();

    }

    child( type, name, value, desc, child ) {

        super.child( type, name, value, desc, child );

    }

    getAccesNodeName() {
        
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

    createChildTemplate(type, name, parameters, desc) {

        const nameSlim = this.getNameSlim(name);

        let pStatic = '';

        if (this.isStatic) {

            pStatic = `<p class="${STATIC}"></p>`;

        }


        let classPara = '';
        if ( parameters.length > 0 ) {

            classPara = 'parameters';

        }

        const template = `
        <div id="${this.getAccesNodeName()}-${nameSlim}">
            <ul id="meth-name" class="${ classPara }">
                <li>
                    <div class="row">
                        ${pStatic}
                        ${type}
                        <p>
                            <strong>${name}</strong>
                        </p>
                    </div>
                </li>
            </ul>
            <div class="description">
                ${ parameters }${ desc }
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

    hr() {

        this.childTemplate += '<hr>';

    }

}

export { MethodDescElement };