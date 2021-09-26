class VersionElement extends HTMLElement {

    constructor() {

        super();

        this.init();
    }

    async init() {

        const version = await this.getVersion();

        this.innerHTML = `<p id="version">${ version }</p>`;

    }

    async getVersion() {

        let version = '0000000'  // No connected

        try {

            const reponse = await fetch( `https://api.github.com/repos/filipvrba/${ DOCUMENT }/commits?sha=master` )
            const commits = await reponse.json();

            version = commits[ 0 ].sha.substr( 0, 7 );

        } catch { }

        return version;

    }

}

export { VersionElement };