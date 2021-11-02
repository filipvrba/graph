import { AnimationComponent } from "../../src/menu/animationComponent.js";

class MenuElement extends HTMLElement {

    constructor() {

        super();

        this.menuLogoClickHandler = () => this.menuLogoClick();

        this.isVisible;

        this.template = `
        <div class="menu" id="menu">
            <div class="scroll">
                <div id="header" onclick="document.dispatchEvent( menuLogoClickEvent );">
                    <div class="row">
                        <img src="./static/pictures/logo.png"
                            loading="lazy" alt="logo graph">
                        <h1>${DOCUMENT}</h1>
                    </div>
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

    menuLogoClick() {

        this.clickDocument( HOME );

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
        document.addEventListener( 'menuLogoClick', this.menuLogoClickHandler );

    }

    disconnectedCallback() {

        document.removeEventListener('clickHome', this.clickHomeHandler);

        this.animation.free();

        document.removeEventListener( 'closedMenu', this.closeMenuHandler );
        document.removeEventListener('clickDoc', this.clickDocHandler);
        document.removeEventListener( 'menuLogoClick', this.menuLogoClickHandler );

    }


    clickHome() {

        if (this.animation.getIsActivate()) return;

        this.isVisible = !this.isVisible;
        this.animation.visible(this.isVisible);

        const event = new CustomEvent( 'homeFocus', {
            detail: {
                isVisibleMenu: this.isVisible
            }
        } );
        document.dispatchEvent( event );

    }

}

export { MenuElement };