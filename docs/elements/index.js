// Menu
import { TouchMenuElement } from './menu/touchMenuElement.js';
import { FilterElement } from './menu/filterElement.js'
import { LanguageElement } from "./menu/languageElement.js";
import { ContentElement } from "./menu/contentElement.js";

// Property
import { PropertyTableElement } from './property/propertyTableElement.js';
import { PropertyDescElement } from './property/propertyDescElement.js';

// Method
import { MethodDescElement } from './method/methodDescElement.js';
import { MethodsTableElement } from './method/methodsTableElement.js';

import { ObjectsElement } from "./objectsElement.js";
import { NavigationElement } from "./navigationElement.js";
import { PagesElements } from "./pagesElement.js";
import { FooterElement } from "./footerElement.js"
import { ClassesElement } from "./classesElement.js"
import { HighlighterElement } from "./highlighterElement.js"
import { ExamplesElement } from "./examplesElement.js"
import { SelectColorElement } from './selectColorElement.js';
import { ListPagesElement } from './listPageElement.js';
import { VersionElement } from "./versionElement.js";
import { NoteElement } from "./noteElement.js";
import { InheritsElement } from "./inheritsElement.js";
import { StrongCodeElement } from './strongCodeElement.js';
import { SignalDescElement } from './signal/signalDescElement.js';

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
window.customElements.define( 'menu-panel', TouchMenuElement );
window.customElements.define( 'filter-menu', FilterElement );
window.customElements.define( 'lang-menu', LanguageElement );
window.customElements.define( 'content-menu', ContentElement );
window.customElements.define( 'version-p', VersionElement );
window.customElements.define( 'note-info', NoteElement );
window.customElements.define( 'inhe-info', InheritsElement );
window.customElements.define( 's-c', StrongCodeElement );
window.customElements.define( 'sign-desc', SignalDescElement );