class VersionElement extends HTMLElement {

    constructor() {

        super();

        this.init();
    }

    async init() {

        const values = await this.getValues();

        this.innerHTML = `
        <p id="version">
            <a href="${ values.html_url }">${ values.version }</a>
        </p>
        `;

    }

    async getValues() {

        let version = '0000000'  // No connected
        let html_url = ''

        try {

            const reponse = await fetch( `https://api.github.com/repos/filipvrba/${ DOCUMENT }/commits?sha=master` )
            const commits = await reponse.json();

            version = commits[ 0 ].sha.substr( 0, 7 );
            html_url = commits[ 0 ].html_url

        } catch { }

        return { version, html_url };

    }

}

export { VersionElement };