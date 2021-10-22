class HighlighterElement extends HTMLElement {

    constructor() {

        super();

        let code = this.innerHTML.trim();

        this.className = "prettyprint";
        this.setAttribute( "translate", "no" );
        this.innerHTML = code;

        if ( this.hasAttribute( 'nocompile' ) ) return;
        prettyPrint();

    }

}

export { HighlighterElement };