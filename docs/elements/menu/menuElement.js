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

    }

    connectedCallback() {

        this.clickHomeHandler = () => { this.clickHome() };
        document.addEventListener('clickHome', this.clickHomeHandler);

        this.animation.init();

    }

    disconnectedCallback() {

        document.removeEventListener('clickHome', this.clickHomeHandler);

        this.animation.free();

    }


    clickHome() {

        if (this.animation.getIsActivate()) return;

        this.isVisible = !this.isVisible;
        this.animation.visible(this.isVisible);

    }

}

export { MenuElement };