import { AnimationComponent } from "../src/menu/animationComponent.js";

class MenuElement extends HTMLElement {

    constructor() {

        super();

        this.isVisible;

        this.template = `
        <div class="menu" id="menu">
            <div class="scroll">
                <div id="header">
                    <h1>${ DOCUMENT }</h1>
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
                    </div>
                </div>
            </div>
        </div>
        <div id="fade" class="fade" onclick="document.dispatchEvent( clickHomeEvent );"></div>
        `;

        this.innerHTML = this.template;
        this.animation = new AnimationComponent(this);
        this.docNameClick = null;

        this.init();

    }

    async init() {

        const files = await getFiles();

        this.menuFiles = [];

        files.forEach((values, file) => {

            if (file !== ERROR ) {

                const docsCategory = this.createCategory( 'h2', 'docs', values.dir );

                let category = values.path.split( '/' );

                if ( category.length > 1 ) {

                    category = category[ category.length - 2 ];

                } else {

                    category = values.path;

                }

                const docCategory = this.createCategory( 'h3', 'doc', category );

                docsCategory.appendChild( docCategory );

                this.createDocTemplate( file, values, docCategory );

            }

        });

    }

    createCategory( node, type, category ) {

        const content = document.getElementById('content');
        const categoryID = `${ type }-${ category }`;
        let divCategory = document.getElementById( categoryID );

        const isExist = divCategory === null;

        if (isExist) {

            divCategory = document.createElement("div");
            divCategory.setAttribute('id', categoryID)
            content.appendChild(divCategory);

            if ( node === "h2" ) {

                divCategory.innerHTML = `<${ node }>${ capitalized( category ) }</${ node }>`;
            
            } else {

                divCategory.innerHTML = `
                <ul>
                    <li>
                        ${ this.docTemplate( node, category ) }
                    </li>
                </ul>
                `;

            }

            return divCategory;

        }

        return divCategory;

    }

    createDocTemplate( file, values, docCategory ) {

        const categories = values.path.split('/');
        const length = categories.length;

        if ( categories[ categories.length - 1 ] !== INDEX ) {

            if ( categories.length > 1 ) {

                docCategory.innerHTML += `
                <ul>
                    <ul>
                        <li>
                            ${ this.docTemplate( 'p', file ) }
                        </li>
                    </ul>
                </ul>
                `;

            }

        }

    }

    docTemplate( node, name ) {

        const template = `
        <${ node }>
            <a onclick="clickDoc( '${ name }' )">${ capitalized(name) }</a>
        </${ node }>
        `;

        return template;

    }

    connectedCallback() {

        this.clickHomeHandler = () => { this.clickHome() };
        document.addEventListener('clickHome', this.clickHomeHandler);

        this.clickDocHandler = (event) => {

            const docName = event.detail.doc;
            this.docNameClick = docName;
            this.clickHome();

        }
        document.addEventListener('clickDoc', this.clickDocHandler);

        this.animation.init();

    }

    disconnectedCallback() {

        document.removeEventListener('clickHome', this.clickHomeHandler);
        document.removeEventListener('clickDoc', this.clickDocHandler);

        this.animation.free();

    }

    clickHome() {

        if (this.animation.getIsActivate()) return;

        this.isVisible = !this.isVisible;
        this.animation.visible(this.isVisible);

    }

    /**
     * Animation 'animationend' call this function.
     */
    closedMenu() {

        if (this.docNameClick === null) return;

        window.location.replace(`?${this.docNameClick}`);

        this.docNameClick = null;

    }

}

export { MenuElement };