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