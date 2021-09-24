class MenuElement extends HTMLElement {

    constructor() {

        super();

        this.isVisible;

        this.template = `
        <div class="menu" id="menu">
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
        <div id="fade" class="fade" onclick="document.dispatchEvent( clickHomeEvent );"></div>
        `;

        this.innerHTML = this.template;

        this.menu = document.getElementById( 'menu' );
        this.menuWidth = 300;

        this.fade = document.getElementById( 'fade' );

    }

    connectedCallback() {

        this.clickHomeHandler = () => { this.clickHome() };
        document.addEventListener( 'clickHome', this.clickHomeHandler );

    }

    disconnectedCallback() {

        document.removeEventListener( 'clickHome', this.clickHomeHandler );

    }

    clickHome() {

        this.isVisible = !this.isVisible;
        this.visible( this.isVisible );

    }

    visible( isVisible ) {

        if ( isVisible ) {

            // Menu in
            this.menu.style.left = "0px";

            // Fade in
            this.fade.style.zIndex = 10;
            this.fade.style.opacity = 0.5;


        } else {

            // Menu out
            this.menu.style.left = `-${ this.menuWidth }px`;

            // Fade out
            this.fade.style.zIndex = -10;
            this.fade.style.opacity = 0;

        }

    }

}

export { MenuElement };