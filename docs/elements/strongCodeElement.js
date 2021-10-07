class StrongCodeElement extends HTMLElement {

    constructor() {

        super();

        this.innerHTML = this.getCrateTemplate( this.innerHTML );

    }

    getCrateTemplate( value ) {

        // The pointer say, that literal not spading to a strong code!
        const point = '*';

        const SC_L = '<code><span>';
        const SC_R = '</span></code>';

        if ( value.indexOf( '*' ) > -1 ) {

            value = value.replace( point, '' );

        } else {

            value = SC_L + value + SC_R;

        }

        return value;

    }

}

export { StrongCodeElement };