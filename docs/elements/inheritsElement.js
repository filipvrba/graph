class InheritsElement extends HTMLElement {

    constructor() {

        super();

        this.leftArrow = '&lArr;';

        this.init();

    }

    getDefaultTemplate() {

        return `
        <div class="section row center" id="inherits">
            <p class="fa fa-sitemap"></p>
            <div class="row">
                *
            </div>
        </div>
        `;

    }

    getCustomTemplate( name ) {

        return `
        <p>
            <a href="?${ name }">${ capitalized( name ) }</a>
        </p>
        `;

    }

    getNames() {

        const valueNames = this.innerText;
        return valueNames.split( '-' );

    }

    createTemplateNames( names ) {

        const customTemplateNames = [];
        for ( const name of names ) {

            const customTemplate = this.getCustomTemplate( name );
            customTemplateNames.push( customTemplate );

        }

        return customTemplateNames.join( `<p class="fa fa-chevron-left"></p>` );

    }

    init() {

        const names = this.getNames();
        const templateNames = this.createTemplateNames( names );
        const template = this.getDefaultTemplate().replace( '*', templateNames );

        this.innerHTML = template;

    }

}

export { InheritsElement };