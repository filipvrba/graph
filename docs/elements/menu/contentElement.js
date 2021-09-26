class ContentElement extends HTMLElement {

    constructor() {

        super();

        this.template = '<div id="content"></div>';

        this.innerHTML = this.template;
        this.docNameClick = null;
        this.files = null;
        this.content = document.getElementById('content');

        this.init();

    }

    async init() {

        this.files = await getFiles();

        this.createCategories( this.files );

    }

    getCategory( values ) {
    
        let category = values.path.split('/');

        if (category.length > 1) {

            category = category[ category.length - 2 ];

        } else {

            category = values.path;

        }

        return category;

    }

    createCategories( files ) {

        files.forEach((values, file) => {

            if (file !== ERROR) {

                const docsCategory = this.createCategory('h2', 'docs', values.dir);

                let category = this.getCategory( values );
                const docCategory = this.createCategory('h3', 'doc', category);
                docsCategory.appendChild(docCategory);

                this.createDocTemplate(file, values, docCategory);

            }

        });

    }

    docTemplate(node, name) {

        const template = `
        <${node}>
            <a onclick="clickDoc( '${name}' )">${capitalized(name)}</a>
        </${node}>
        `;

        return template;

    }

    createCategory(node, type, category) {

        const categoryID = `${type}-${category}`;
        let divCategory = document.getElementById(categoryID);

        const isExist = divCategory === null;

        if (isExist) {

            divCategory = document.createElement("div");
            divCategory.setAttribute( 'id', categoryID );
            this.content.appendChild(divCategory);

            if (node === "h2") {

                divCategory.innerHTML = `<${node}>${ capitalized( category ) }</${node}>`;

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

    createDocTemplate(file, values, docCategory) {

        const categories = values.path.split('/');

        if ( categories[ categories.length - 1 ] !== INDEX ) {

            if ( categories.length > 1 ) {

                docCategory.innerHTML += `
                <ul>
                    <ul>
                        <li>
                            ${ this.docTemplate('p', file) }
                        </li>
                    </ul>
                </ul>
                `;

            }
        }
    }

    closeMenu() {

        if (this.docNameClick === null) {

            this.resetContentFilter();
            return;

        }

        this.applyPage();

    }

    updateCategories( files ) {

        this.resetCategories( files );

    }

    resetCategories( files ) {

        this.content.innerHTML = '';
        this.createCategories( files );

    }

    /**
     * Reset content & filter values.
     */
    resetContentFilter() {

        document.dispatchEvent( resetFilterEvent );
        this.resetCategories( this.files );

    }

    applyPage() {

        window.location.replace(`?${ this.docNameClick }`);
        this.docNameClick = null;

    }

    clickDocument( name ) {

        this.docNameClick = name;
        document.dispatchEvent( clickHomeEvent );

    }

    connectedCallback() {

        this.closeMenuHandler = () => { this.closeMenu(); }
        document.addEventListener( 'closedMenu', this.closeMenuHandler );

        this.clickDocHandler = (event) => {

            this.clickDocument( event.detail.doc );

        }
        document.addEventListener('clickDoc', this.clickDocHandler);

        this.filterValChangeHandler = ( event ) => { this.updateCategories( event.detail.files ); }
        document.addEventListener( 'filterValChange', this.filterValChangeHandler );

    }

    disconnectedCallback() {

        document.removeEventListener( 'closedMenu', this.closeMenuHandler );
        document.removeEventListener('clickDoc', this.clickDocHandler);
        document.removeEventListener( 'filterValChange', this.filterValChangeHandler );

    }

}

export { ContentElement };