import { ChildrenElement } from "../childrenElement.js";

class SignalDescElement extends ChildrenElement {

    constructor() {

        super();

    }

    getNodeName() {

        return 'sign';

    }

    initChild( child ) {

        this.childTemplate += this.createChildTemplate( child );

    }

    applyTemplate() {

        const template = `
        <div class="section name" id="signals-descriptions">
            <h2>${ this.getAttribute('name') }</h2>
            ${ this.childTemplate }
        </div>
        `;

        this.innerHTML = template;

    }

    createChildTemplate( child ) {

        const icon = this.getIcon( this.isEmit( child ) );

        const template = `
        <div>
            <div id="signal-name">
                <div class="row">
                    <p class="fa fa-${ icon }"></p>
                    <p>
                        <strong>${ child.name }</strong>
                    </p>
                </div>
            </div>
            <div class="description">
                ${ child.description }
            </div>
        </div>
        `;

        return template;

    }

    isEmit( emit ) {

        return ( emit === 'true' ) ? true : false;

    }

    getIcon( isEmit ) {

        if ( isEmit ) {

            return 'rss';

        }

        return 'wifi';

    }

}

export { SignalDescElement };