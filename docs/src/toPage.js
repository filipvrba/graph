const ogUrlElement = document.querySelector('meta[property="og:url"]');
const url = ogUrlElement.getAttribute( 'content' );

location.assign( url );