import { ObjectsElement } from "./objectsElement.js";
import { NavigationElement } from "./navigationElement.js";
import { PagesElements } from "./pagesElement.js";
import { FooterElement } from "./footerElement.js"
import { ClassesElement } from "./classesElement.js"
import { HighlighterElement } from "./highlighterElement.js"
import { ExamplesElement } from "./examplesElement.js"
import { SelectColorElement } from './selectColorElement.js';
import { ListPagesElement } from './listPageElement.js';
import { PropertyTableElement } from './propertyTableElement.js';
import { MethodsTableElement } from './methodsTableElement.js';
import { PropertyDescElement } from './propertyDescElement.js'
import { MethodDescElement } from './methodDescElement.js'

window.customElements.define( 'obj-type', ObjectsElement );
window.customElements.define( 'nav-panel', NavigationElement );
window.customElements.define( 'root-page', PagesElements );
window.customElements.define( 'foo-panel', FooterElement );
window.customElements.define( 'class-type', ClassesElement );
window.customElements.define( 'light-code', HighlighterElement );
window.customElements.define( 'e-code', ExamplesElement );
window.customElements.define( 'select-color', SelectColorElement );
window.customElements.define( 'list-pages', ListPagesElement );
window.customElements.define( 'prop-table', PropertyTableElement );
window.customElements.define( 'meth-table', MethodsTableElement );
window.customElements.define( 'prop-desc', PropertyDescElement );
window.customElements.define( 'meth-desc', MethodDescElement );