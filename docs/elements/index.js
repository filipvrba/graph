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

// Signal
import { SignalTableElement } from './signal/signalTableElemen.js';

// Symbol
import { SymbolTableElement } from './symbol/symbolTableElement.js';

// Types
import { ObjectsElement } from "./types/objectsElement.js";
import { ClassesElement } from "./types/classesElement.js"
import { APIElement } from "./types/apiElement.js"

import { NavigationElement } from "./navigationElement.js";
import { FooterElement } from "./footerElement.js"
import { HighlighterElement } from "./highlighterElement.js"
import { ExamplesElement } from "./examplesElement.js"
import { SelectColorElement } from './selectColorElement.js';
import { ListPagesElement } from './listPageElement.js';
import { VersionElement } from "./versionElement.js";
import { NoteElement } from "./noteElement.js";
import { InheritsElement } from "./inheritsElement.js";
import { StrongCodeElement } from './strongCodeElement.js';
import { CustomizePiechartElement } from './customizePiechartElement.js';

// Exemple
import { ExampleElement } from './exampleElement.js';
window.customElements.define( 'example-custom', ExampleElement );


/**
 * Defines
 */
// Types
window.customElements.define( 'class-type', ClassesElement );
window.customElements.define( 'obj-type', ObjectsElement );
window.customElements.define( 'api-type', APIElement );

window.customElements.define( 'nav-panel', NavigationElement );
window.customElements.define( 'foo-panel', FooterElement );
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
window.customElements.define( 'cust-piechart', CustomizePiechartElement );

// Signal
window.customElements.define( 'sign-table', SignalTableElement );

// Symbol
window.customElements.define( 'symbol-table', SymbolTableElement );

import { PagesElements } from "./pagesElement.js";
window.customElements.define( 'root-page', PagesElements );