class LanguageElement extends HTMLElement {

    constructor() {

        super();

        this.template = `<select id="language"></select>`;

        this.innerHTML = this.template;
        this.isLangChanged = false;

        this.languages = document.getElementById( 'language' );

        this.init();

    }

    async init() {

        this.languages.innerHTML = await this.addLanguagesTemplate();

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

    change() {

        // This method is global from script.js
        changeLang( this.languages.value );

        this.isLangChanged = true;

        document.dispatchEvent( clickHomeEvent );

    }

    /**
     * Reload page for change language.
     */
    applyChange() {

        if ( this.isLangChanged ) {

            this.isLangChanged = false;
            document.location.reload();

        }

    }

    connectedCallback() {

        this.languagesChangeHandler = () => { this.change(); }
        this.languages.addEventListener( 'change', this.languagesChangeHandler );

        this.closeMenuHandler = () => { this.applyChange(); }
        document.addEventListener( 'closedMenu', this.closeMenuHandler );

    }

    disconnectedCallback() {

        this.languages.removeEventListener( 'change', this.languagesChangeHandler );
        document.removeEventListener( 'closedMenu', this.closeMenuHandler );

    }

}

export { LanguageElement };