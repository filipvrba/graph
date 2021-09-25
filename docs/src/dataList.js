const LIST_PATH = './static/list.json'; 

let _dataList = null;

function getPath( dir ) {

    return `${ dir }/${ language }`;

}

async function getData() {

    if ( _dataList === null ) {

        _dataList = await ( await fetch( LIST_PATH ) ).json();

    }

    return _dataList;

}

async function getFiles() {

    const data = await getData();
    const files = data.files;

    // Object convet to map;
    const filesMap = new Map();
    Object.keys( files ).forEach( key => {

        filesMap.set( key, files[ key ] );

    });

    return filesMap;

}

async function getFile( type ) {

    let file = await getData();
    file = file.files[ type ];

    if ( type === null || file === undefined ) {

        return null;

    }

    return file;

}

async function getPage() {

    let file = await getFile( getMark() );

        if ( file === null ) {

            // File Error page
            file = await getFile( 'error' );

        }
    
    return file;

}

async function getLanguages() {

    const data = await getData();
    const languages = data.languages;

    return languages;

}