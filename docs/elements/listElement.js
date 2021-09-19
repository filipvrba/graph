class ListElement extends HTMLElement {

    constructor() {

        super();

        this.list = './static/list.json';

    }

    getJson() {

        fetch( this.list )
        .then( res => res.json() )
        .then( data => { return data });

        return null;

    }

    getFilePath( type ) {

        return `${ this.getJson[ type ] }.html`;

    }

}

export { ListElement };