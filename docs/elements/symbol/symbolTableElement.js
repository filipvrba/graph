import { SignalTableElement } from "../signal/signalTableElemen.js";

const Symbols = {

    AIRS: 0, // 'rss',
    ACCEPTS: 1, // 'wifi',
    INHERITS: 2, // 'sitemap',
    VIRTUAL: 3, // 'pencil-square-o',
    RETURN: 4, //'sign-out',
    HOME: 5, // 'home',
    ANONYM: 6, // λ
    STATIC: 7
}

class SymbolTableElement extends SignalTableElement {

    constructor() {

        super();
    }

    getNodeName() {

        return 'symbol';
    }

    getID() {

        return 'symbols';
    }

    getIconTemplate( child ) {

        switch ( parseInt( child.type ) ) {

            case Symbols.AIRS:
                return '<p class="fa fa-rss"></p>';
            case Symbols.ACCEPTS:
                return `<p class="fa fa-wifi">${ child.getOriginTemplate() }</p>`;
            case Symbols.INHERITS:
                return '<p class="fa fa-sitemap"></p>';
            case Symbols.VIRTUAL:
                return '<p class="fa fa-pencil-square-o"></p>';
            case Symbols.RETURN:
                return '<p class="fa fa-sign-out"></p>';
            case Symbols.HOME:
                return '<p class="fa fa-home"></p>';
            case Symbols.ANONYM:
                return child.getLambdaTemplate( true );
            case Symbols.STATIC:
                return '<p class="fa fa-flash"></p>';
        }
    }

    createChildTemplate( child ) {

        const iconTemplate = this.getIconTemplate( child );

        const name = `
        <th class="row">
            <div style="display: blocks;">
                ${ iconTemplate }
            </div>
            <p>${ child.name }</p>
        </th>
        `;

        const id = `${ this.getNodeName() }-${ child.name }`;
        const trNode = '<tr';
        const trNodeID = `${ trNode } id="${ id }"`;
        
        let template = this.getRowTemplate( name, child.description );
        template = template.replace( trNode, trNodeID );

        return template;
    }
}

export { SymbolTableElement };