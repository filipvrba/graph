class FilterElement extends HTMLElement {

    constructor() {

        super();

        this.template = `
        <div id="inputWraper">
            <button onclick="document.dispatchEvent( clickSearchEvent );">
                <p class="fa fa-search"></p>
            </button>
            <input class="fa fa-search" placeholder type="text" id="filterInput"
            autocorrect="off", autocapitalize="off"
            spellcheck="false" maxlength="50">
            <lang-menu></lang-menu>
        </div>
        `;

        this.innerHTML = this.template;

        this.filterInput = document.getElementById('filterInput');

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

            const result = name.toUpperCase().search( value.toUpperCase() );

            if ( result > -1 ) {

                resultFiles.set( name, values );

            }

        })

        return resultFiles;

    }

    reset() {

        this.filterInput.value = '';

    }

    async valueChange() {

        const resultFiles = await this.getInputResult();

        const event = new CustomEvent( 'filterValChange', {

            detail: {

                files: resultFiles

            }

        });
        document.dispatchEvent( event );

    }

    connectedCallback() {

        // ClickSearch
        this.clickSearchHandler = () => {

            this.filterEnteredSearch();

        }
        document.addEventListener( 'clickSearch', this.clickSearchHandler );

        // ClosedMenu
        this.resetFilterHandler = () => {

            this.reset();

        }
        document.addEventListener( 'resetFilter', this.resetFilterHandler );


        // Filter
        this.filterInputHandler = () => { this.valueChange(); }
        this.filterInput.addEventListener( 'input', this.filterInputHandler );

        this.filterKeyUpHandler = ( event ) => {

            if ( event.key === 'Enter' ) {
                
                this.filterEnteredSearch();

            }

        }
        this.filterInput.addEventListener( 'keyup', this.filterKeyUpHandler );

    }

    disconnectedCallback() {

        document.removeEventListener( 'clickSearch', this.clickSearchHandler );
        document.removeEventListener( 'resetFilter', this.resetFilterHandler );

        this.filterInput.removeEventListener( 'input', this.filterInputHandler );
        this.filterInput.removeEventListener( 'keyup', this.filterKeyUpHandler );

    }

}

export { FilterElement };