import { ObjectsElement } from "./objectsElement.js";
import { NavigationElement } from "./navigationElement.js";
import { PagesElements } from "./pagesElement.js";
import { FooterElement } from "./footerElement.js"
import { ClassesElement } from "./classesElement.js"
import { HighlighterElement } from "./highlighterElement.js"
import { ExamplesElement } from "./examplesElement.js"
import { SelectColorElement } from './selectColorElement.js';
import { ListPagesElement } from './listPageElement.js';

window.customElements.define( 'obj-type', ObjectsElement );
window.customElements.define( 'nav-panel', NavigationElement );
window.customElements.define( 'root-page', PagesElements );
window.customElements.define( 'foo-panel', FooterElement );
window.customElements.define( 'class-type', ClassesElement );
window.customElements.define( 'light-code', HighlighterElement );
window.customElements.define( 'e-code', ExamplesElement );
window.customElements.define( 'select-color', SelectColorElement );
window.customElements.define( 'list-pages', ListPagesElement );