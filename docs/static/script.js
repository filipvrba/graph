const HOME = 'home';
const DOCUMENT = 'graph'

let language = 'cs';  // Default language

const hash = window.location.hash.replace( '#', '' );
const title = document.querySelector('title');

function getMark() {

    const hrefArray = window.location.href.split( '?' );

    const rawMark = hrefArray[ hrefArray.length - 1 ];
    const mark = rawMark.split( '#' );
    return mark[ 0 ];

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