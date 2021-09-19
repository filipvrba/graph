import { ObjectsElement } from "./objectsElement.js";
import { NavigationElement } from "./navigationElement.js";
import { PagesElements } from "./pagesElement.js";
import { FooterElement } from "./footerElement.js"
import { ClassesElement } from "./classesElement.js"

window.customElements.define( 'obj-type', ObjectsElement );
window.customElements.define( 'nav-panel', NavigationElement );
window.customElements.define( 'root-page', PagesElements );
window.customElements.define( 'foo-panel', FooterElement );
window.customElements.define( 'class-type', ClassesElement );