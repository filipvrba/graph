import { AnimationComponent } from "../../src/menu/animationComponent.js";

class MenuElement extends HTMLElement {

    constructor() {

        super();

        this.isVisible;

        this.template = `
        <div class="menu" id="menu">
            <div class="scroll">
                <div id="header">
                    <h1>${DOCUMENT}</h1>
                </div>
                <hr>
                <div id="contentWraper">
                    <filter-menu></filter-menu>
                    <hr>
                    <content-menu></content-menu>
                </div>
            </div>
        </div>
        <div id="fade" class="fade" onclick="document.dispatchEvent( clickHomeEvent );"></div>
        `;

        this.innerHTML = this.template;
        this.animation = new AnimationComponent(this);
        this.docNameClick = null;

        this.version = document.getElementById( 'version' );

    }

    /**
    * Reset content & filter values.
    */
    resetContentFilter() {

        document.dispatchEvent( resetFilterEvent );
        document.dispatchEvent( resetContentEvent );

    }

    applyPage() {

        window.location.replace(`?${ this.docNameClick }`);
        this.docNameClick = null;

    }

    closeMenu() {

        if (this.docNameClick === null) {

            this.resetContentFilter();
            return;

        }

        this.applyPage();

    }

    clickDocument( name ) {

        this.docNameClick = name;
        document.dispatchEvent( clickHomeEvent );

    }

    connectedCallback() {

        this.clickHomeHandler = () => { this.clickHome() };
        document.addEventListener('clickHome', this.clickHomeHandler);

        this.animation.init();

        this.closeMenuHandler = () => { this.closeMenu(); }
        document.addEventListener( 'closedMenu', this.closeMenuHandler );

        this.clickDocHandler = (event) => {

            this.clickDocument( event.detail.doc );

        }
        document.addEventListener('clickDoc', this.clickDocHandler);

    }

    disconnectedCallback() {

        document.removeEventListener('clickHome', this.clickHomeHandler);

        this.animation.free();

        document.removeEventListener( 'closedMenu', this.closeMenuHandler );
        document.removeEventListener('clickDoc', this.clickDocHandler);

    }


    clickHome() {

        if (this.animation.getIsActivate()) return;

        this.isVisible = !this.isVisible;
        this.animation.visible(this.isVisible);

    }

}

export { MenuElement };