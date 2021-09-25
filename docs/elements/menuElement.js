import { AnimationComponent } from "../src/menu/animationComponent.js";

class MenuElement extends HTMLElement {

    constructor() {

        super();

        this.isVisible;

        this.template = `
        <div class="menu" id="menu">
            <div class="scroll">
                <div id="header">
                    <h1>graph</h1>
                </div>
                <hr>
                <div id="contentWraper">
                    <div id="inputWraper">
                        <p class="fa fa-search"></p>
                        <input class="fa fa-search" placeholder type="text" id="filterInput"
                        autocorrect="off", autocapitalize="off"
                        spellcheck="false" maxlength="50">
                        <select id="language">
                            <option value="en">en</option>
                        </select>
                    </div>
                    <hr>
                    <div id="content">
                        <h2>API</h2>
                    </div>
                </div>
            </div>
        </div>
        <div id="fade" class="fade" onclick="document.dispatchEvent( clickHomeEvent );"></div>
        `;

        this.innerHTML = this.template;
        this.animation = new AnimationComponent( this );
        this.docNameClick = null;

        this.init();

    }

    async init() {

        const files = await getFiles();

        this.menuFiles = [ ];

        files.forEach( ( values, file ) =>{

            if ( file !== ERROR ) {

                const docsCategory = this.createDocsCategory( values.dir );
                this.createDocsTemplate( file, values, docsCategory );
                
            }

        });

    }

    createDocsCategory( dir ) {

        const docsCategory = dir;
        const content = document.getElementById( 'content' );
        const categoryID = `docs-${ docsCategory }`;
        let divCategory = document.getElementById( categoryID );

        const isExist = divCategory === null;

        if ( isExist ) {

            divCategory = document.createElement("div");
            divCategory.setAttribute( 'id', categoryID )
            content.appendChild( divCategory );

            divCategory.innerHTML = `<h2>${ docsCategory }</h2>`;

            return divCategory;

        }

        return divCategory;

    }

    createDocsTemplate( file, values, docsCategory ) {

        const categories = values.path.split( '/' );
        const length = categories.length;


        if ( docsCategory.getAttribute( 'id' ).search( values.dir ) > -1 ) {

            docsCategory.innerHTML += `
            <p>
                <a onclick="clickDoc( '${ file }' )">${ file }</a>
            <p>
            `;

        }

    }

    connectedCallback() {

        this.clickHomeHandler = () => { this.clickHome() };
        document.addEventListener( 'clickHome', this.clickHomeHandler );

        this.clickDocHandler = ( event ) => {

            const docName = event.detail.doc;
            this.docNameClick = docName;
            this.clickHome();

        }
        document.addEventListener( 'clickDoc', this.clickDocHandler );

        this.animation.init();

    }

    disconnectedCallback() {

        document.removeEventListener( 'clickHome', this.clickHomeHandler );
        document.removeEventListener( 'clickDoc', this.clickDocHandler );

        this.animation.free();

    }

    clickHome() {

        if ( this.animation.getIsActivate() ) return;

        this.isVisible = !this.isVisible;
        this.animation.visible( this.isVisible );

    }

    /**
     * Animation 'animationend' call this function.
     */
    closedMenu() {

        if ( this.docNameClick === null ) return;

        window.location.replace( `?${ this.docNameClick }` );

        this.docNameClick = null;

    }

}

export { MenuElement };