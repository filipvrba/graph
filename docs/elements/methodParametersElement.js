class MethodParametersElement extends HTMLElement {

    constructor() {

        super();

        this.template = `
        <ul>
            <ul>
                <li class="p-default">
                    <code><span>min</span></code> je číslo, které reprezentuje aktuální hodnotu.
                </li>
                <li class="p-default">
                    <code><span>max</span></code> je číslem veličiny.
                </li>
            </ul>
        </ul>
        `;

        for ( const child of this.children ) {

            console.log( child );

        }
    }

}

export { MethodParametersElement };