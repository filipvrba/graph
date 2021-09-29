class NoteElement extends HTMLElement {

    constructor() {

        super();

        this.template = `
        <div class="note">
            <div class="info-container">
                <p>${ this.innerHTML }</p>
            </div>
        </div>
        `;

        this.init();

    }

    init() {

        this.innerHTML = this.template;

    }

}

export { NoteElement };