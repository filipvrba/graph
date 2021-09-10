from pathlib import Path

DIR_PATH = './src'
FILE_TYPE = 'js'

DIR_PATH_BUILD = './dist'
FILE_NAME = 'graph-engine'


def is_unnecessary_file( name, file_type ):
    index = name == f'index.{ file_type }'
    script = name == f'script.{ file_type }'

    return index or script


def find_all_files( directory_path, file_type ):
    """ Find all files for custom directory """

    file_list = [ ]

    for path in Path( directory_path ).rglob(f'*.{ file_type }'):

        if ( not is_unnecessary_file( path.name, file_type ) ):

            # Continue for write files to list
            file_list.append( path.absolute() )
    
    return file_list


def is_unnecessary_line( line ):

    _import = line.find( 'import' ) != -1
    _export = line.find( 'export' ) != -1

    return _import or _export


def is_unnecessary_type( line ):

    _export = line.find( 'export const' ) != -1

    return _export


def remove_line( lines: list ):
    """ Delete the unnecessary line for the list ( file ) and return back list changed. """

    _lines = lines.copy()

    # Find line for deleted
    for line in lines:

        if ( is_unnecessary_type( line ) ):
            id = _lines.index( line )
            _lines[ id ] = line.replace( 'export const', 'const' )

        elif ( is_unnecessary_line( line ) ):
            _lines.remove( line )

    return _lines


def get_file_lines( path ):
    """
        Open file from path and safe this close the open file.
        Return all lines of the file.
    """

    open_file = open( path, 'rt' )
    lines = open_file.readlines()
    open_file.close()

    return lines


def read_and_change( files ):
    """ Read all files and remove unnecessary an header & footer code """

    files_lines = [ ]

    for file in files:

        # Write lines to list
        lines = get_file_lines( file )
        change_lines = remove_line( lines )
        files_lines.extend( change_lines )
    
    return files_lines


def save_lines_to_file( directory_path, file_name, lines ):
    """ Create new file for change text """

    # Get absolute path for save file
    path = Path( directory_path ).absolute()

    # Create file
    file = open( f'{ path }/{ file_name }', 'w', encoding = 'utf-8' )

    file.writelines( lines )

    file.close()


def chnage_priority_files( files: list ):
    """ Change priority on the files for the build file, due to class inheritance."""

    _files = files.copy()

    for file in files:

        # Find elements file
        if str(file).find( f'Element.{ FILE_TYPE }' ) == -1:

            # Get last line for id position
            lines = get_file_lines( file )
            end_line = lines[ len( lines ) - 1 ].split( '// ' )
            
            if len( end_line ) >= 2:

                # Remove file from list and add custom line from id position
                _files.remove( file )
                _files.insert( int( end_line[ 1 ] ), file )
        else:

            # Remove file from list and add on last position
            _files.remove( file )
            _files.insert( len( _files ), file )    
    
    return _files


def main():

    files = find_all_files( DIR_PATH, FILE_TYPE )
    files = chnage_priority_files( files )

    new_file_lines = read_and_change( files )
    save_lines_to_file( DIR_PATH_BUILD, f'{ FILE_NAME }.{ FILE_TYPE }', new_file_lines )

    print( 'Graph engine is build!' )


if __name__ == "__main__":
    main()