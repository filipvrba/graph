const HOME = 'home';
const DOCUMENT = 'graph';
const INDEX = 'index';
const STATIC = 'fa fa-flash';

let language = 'cs';  // Default language

const hash = window.location.hash;
const title = document.querySelector('title');
const html = document.querySelector( 'html' );

// Change language in document
html.setAttribute( 'lang', language );

function getMark() {

    let mark = window.location.search.replace( '?', '' );

    if ( mark === '' ) mark = 'home';

    return mark;

}

function getPageName() {

    const mark = getMark();
    const name = capitalized( mark );

    return name;

}

function capitalized( name ) {

    const nameCapitalized = name.charAt( 0 ).toUpperCase() + name.slice( 1 );

    return nameCapitalized;

}

function setTitle( name ) {

    title.innerHTML = name;

}