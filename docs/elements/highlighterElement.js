class HighlighterElement extends HTMLElement {

    constructor() {

        super();

        const code = this.innerText.trim();

        this.className = "prettyprint";
        this.setAttribute( "translate", "no" );

        this.innerHTML = code;

        prettyPrint();

    }

}

export { HighlighterElement };