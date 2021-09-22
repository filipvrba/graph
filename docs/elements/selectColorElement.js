class SelectColorElement extends HTMLElement {

    constructor() {

        super();

        this.color = new Color();

        let template = `
            <select>
                ${ this.addColor() }
            </select>
        `;
        this.innerHTML = template;
        
    }

    addColor() {

        let palette = '';
        for (const color of this.color.colors) {

            palette += `<option value="${ color }">${ color }</option>\n`;

        }

        return palette;

    }

}

export { SelectColorElement };