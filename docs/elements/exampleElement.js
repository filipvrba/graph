class ExampleElement extends HTMLElement {

    constructor() {

        super();

        this.mediaChangeHandler = () => this.mediaChange();
        this.loadHandler = () => this.load();

        this.src = this.getAttribute( 'src' );
        this.media = window.matchMedia('(prefers-color-scheme: dark)');
        this.innerHTML = this.getDefaultTemplate();
        this.example = document.getElementById( 'example' );
    }

    load() {

        this.changeColorLabel();
    }

    getDefaultTemplate() {

        return `
        <iframe id="example" style="height: 740px;" id="exemple" src="${ this.src }" frameborder="0" allowtransparency="true"></iframe>
        `
    }

    mediaChange() {

        this.changeColorLabel();
    }

    changeColorLabel() {

        this.colorLabel = getComputedStyle( document.querySelector('p') ).color;

        // Post message
        this.example.contentWindow.postMessage( { color: this.colorLabel } );
    }

    connectedCallback() {

        this.example.addEventListener( 'load', this.loadHandler );
        this.media.addEventListener( 'change', this.mediaChangeHandler );
    }

    disconnectedCallback() {

        this.example.removeEventListener( 'load', this.loadHandler );
        this.media.removeEventListener( 'change', this.mediaChangeHandler );
    }

}

export { ExampleElement };