class ContentElement extends HTMLElement {

    constructor() {

        super();

        this.template = '<div id="content"></div>';

        this.innerHTML = this.template;
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

    resetCategories( files ) {

        this.content.innerHTML = '';
        this.createCategories( files );

    }

    connectedCallback() {

        this.filterValChangeHandler = ( event ) => { this.resetCategories( event.detail.files ); }
        document.addEventListener( 'filterValChange', this.filterValChangeHandler );

        this.resetContentHandler = () => { this.resetCategories( this.files ); }
        document.addEventListener( 'resetContent', this.resetContentHandler );

    }

    disconnectedCallback() {

        document.removeEventListener( 'filterValChange', this.filterValChangeHandler );
        document.removeEventListener( 'resetContent', this.resetContentHandler );

    }

}

export { ContentElement };