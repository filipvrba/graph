import { AnimationComponent } from "../src/menu/animationComponent.js";

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
                    <div id="inputWraper">
                        <button onclick="document.dispatchEvent( clickSearchEvent );">
                            <p class="fa fa-search"></p>
                        </button>
                        <input class="fa fa-search" placeholder type="text" id="filterInput"
                        autocorrect="off", autocapitalize="off"
                        spellcheck="false" maxlength="50">
                        <select id="language">
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
        this.isLangChanged = false;
        this.files = null;

        this.languages = document.getElementById( 'language' );

        this.init();

        this.filterInput = document.getElementById('filterInput');
        this.content = document.getElementById('content');

    }

    async init() {

        this.languages.innerHTML = await this.addLanguagesTemplate();

        this.files = await getFiles();

        this.createCategories( this.files );

    }

    createCategories( files ) {

        files.forEach((values, file) => {

            if (file !== ERROR) {

                const docsCategory = this.createCategory('h2', 'docs', values.dir);

                let category = values.path.split('/');

                if (category.length > 1) {

                    category = category[category.length - 2];

                } else {

                    category = values.path;

                }

                const docCategory = this.createCategory('h3', 'doc', category);

                docsCategory.appendChild(docCategory);

                this.createDocTemplate(file, values, docCategory);

            }

        });

    }

    createCategory(node, type, category) {

        const categoryID = `${type}-${category}`;
        let divCategory = document.getElementById(categoryID);

        const isExist = divCategory === null;

        if (isExist) {

            divCategory = document.createElement("div");
            divCategory.setAttribute('id', categoryID)
            this.content.appendChild(divCategory);

            if (node === "h2") {

                divCategory.innerHTML = `<${node}>${capitalized(category)}</${node}>`;

            } else {

                divCategory.innerHTML = `
                <ul>
                    <li>
                        ${this.docTemplate(node, category)}
                    </li>
                </ul>
                `;

            }

            return divCategory;

        }

        return divCategory;

    }

    createDocTemplate(file, values, docCategory) {

        const categories = values.path.split('/');
        const length = categories.length;

        if (categories[categories.length - 1] !== INDEX) {

            if (categories.length > 1) {

                docCategory.innerHTML += `
                <ul>
                    <ul>
                        <li>
                            ${this.docTemplate('p', file)}
                        </li>
                    </ul>
                </ul>
                `;

            }

        }

    }

    docTemplate(node, name) {

        const template = `
        <${node}>
            <a onclick="clickDoc( '${name}' )">${capitalized(name)}</a>
        </${node}>
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

        this.clickSearchHandler = () => {

            this.filterEnteredSearch();

        }
        document.addEventListener( 'clickSearch', this.clickSearchHandler );

        this.animation.init();

        this.filterInput.oninput = () => {

            this.updateCategories();

        }

        this.filterKeyUpHandler = ( event ) => {

            if ( event.key === 'Enter' ) {
                
                this.filterEnteredSearch();

            }

        }
        this.filterInput.addEventListener( 'keyup', this.filterKeyUpHandler );

        this.languages.onchange = () => {

            changeLang( this.languages.value );
            this.clickHome();
            this.isLangChanged = true;

        }

    }

    async filterEnteredSearch() {

        if ( this.filterInput.value === '' ) return;

        const inputResult = await this.getInputResult();

        if ( inputResult.size <= 0 ) return;

        let name = null;
        if ( inputResult.size === 1 ) {

            name = Array.from( inputResult.keys() )[ 0 ];

        } else {
            
            name = smallestText( inputResult.keys() );

        }

        window.location.replace( `?${ name }` );

    }

    async getInputResult() {

        const value = this.filterInput.value;
        const files = await getFiles();
        const resultFiles = new Map();

        files.forEach( ( values, name ) => {

            const result = name.search( value );

            if ( result > -1 ) {

                resultFiles.set( name, values );

            }

        })

        return resultFiles;

    }

    async updateCategories() {

        const resultFiles = await this.getInputResult();
        this.resetCategories( resultFiles );

    }

    resetCategories( files ) {

        this.content.innerHTML = '';
        this.createCategories( files );

    }

    disconnectedCallback() {

        document.removeEventListener('clickHome', this.clickHomeHandler);
        document.removeEventListener('clickDoc', this.clickDocHandler);
        document.removeEventListener( 'clickSearch', this.clickSearchHandler );

        this.animation.free();

        this.filterInput.removeEventListener( 'keyup', this.filterKeyUpHandler );

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

        // Reload page for change language.
        if ( this.isLangChanged ) {

            this.isLangChanged = false;
            document.location.reload();
            return;

        }

        if (this.docNameClick === null) {

            this.filterInput.value = '';
            this.resetCategories( this.files );
            return;

        }

        window.location.replace(`?${this.docNameClick}`);

        this.docNameClick = null;

    }



    async addLanguagesTemplate() {

        const languages = await getLanguages();
        let template = '';

        for ( const lang of languages ) {

            let selected = '';
            if ( lang === language ) {

                selected = 'selected';

            }

            template += `<option value="${ lang }" ${ selected }>${ lang }</option>\n`;

        }

        return template;

    }

}

export { MenuElement };