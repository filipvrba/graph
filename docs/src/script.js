const HOME = 'home';
const DOCUMENT = 'graph';
const INDEX = 'index';
const ERROR = 'error';
const STATIC = 'fa fa-flash';
const AUTHOR = 'Filip Vrba';
const GITHUB_URL = 'https://github.com/filipvrba/';
const CIRCLES = 'circles';

let language = getLocalLanguage();
let andURL = '';

const hash = window.location.hash;
const title = document.querySelector('title');
const html = document.querySelector( 'html' );

// Change language in document
html.setAttribute( 'lang', language );


// Events
const clickHomeEvent = new CustomEvent( 'clickHome' );
const clickSearchEvent = new CustomEvent( 'clickSearch' );
const closedMenuEvent = new CustomEvent( 'closedMenu' );
const resetFilterEvent = new CustomEvent( 'resetFilter' );
const filterValChangeEvent = new CustomEvent( 'filterValChange' );
const resetContentEvent = new CustomEvent( 'resetContent' );
const clickMinCircleEvent = new CustomEvent( 'clickMinCircle' );
const clickPlusCircleEvent = new CustomEvent( 'clickPlusCircle' );
const menuLogoClickEvent = new CustomEvent( 'menuLogoClick' );

function clickDoc( name ) {

    const event = new CustomEvent( 'clickDoc', {
        
        detail: {

            doc: `${ name }`

        }

    });
    document.dispatchEvent( event );

}

function getMark() {

    let mark = window.location.search.replace( '?', '' );

    const andIndex = mark.indexOf( '&' )
    if ( andIndex > -1 ) {

        andURL = mark.substring( andIndex, mark.length );
        mark = mark.replace( andURL, '' );

    }

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

function changeLang( lang ) {

    language = lang;
    setLocalLanguage( lang );

}

function setLocalLanguage( lang ) {

    window.localStorage.setItem( 'language', lang );

}

function getLocalLanguage() {

    let langLocal = window.localStorage.getItem( 'language' );

    if ( langLocal === null ) {

        langLocal = 'cs';  // Default language
        setLocalLanguage( langLocal );

    }

    return langLocal;

}

function smallestText( values ) {

    const smallest = {

        length: Infinity,
        text: ''

    };

    for ( const text of values ) {

        const length = text.length;

        if ( smallest.length > length ) {

            smallest.length = length;
            smallest.text = text

        }

    }

    return smallest.text;

}