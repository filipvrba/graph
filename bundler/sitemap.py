import json
import build
import sitemap_xml

import sys, getopt

DIR_PATH = 'docs/static/'
FILE = 'list.json'
SAVE_FILE = 'sitemap'
WEB_URL = 'https://filipvrba.github.io/graph'
SAVE_MODE = None

# Open JSON file
def get_path():
    return DIR_PATH + FILE


def get_file_save( type ):
    return f'{ SAVE_FILE }.{ type }'


def get_dictionary():
    """Open file from the file path and return dictionary object."""

    dictionary = { }

    file = open( get_path(), 'rt' )
    dictionary = get_json( file )
    file.close()

    return dictionary


def get_json( file ):
    """Load JSON file from module and return dictionary object."""

    dictionary = json.load( file )
    return dictionary


# Dictionary manipulation
def get_files_name( dict ):
    """
        Filtering visible files from dictionary.
        @ return files names to list.
    """

    files = [ ]
    for file, values in dict[ 'files' ].items():
        if values[ 'visible' ]:  # What files to use.
            files.append( file )
    
    return files


def get_urls( files ):

    urls = [ ]
    new_line = '\n'

    for file in files:
        url = f'{ WEB_URL }/?{ file }'
    
        if len( urls ) < len( files ) - 1:
            url += new_line

        urls.append( url )
    
    return urls


def save_file( urls ):

    type_file = 'txt'
    file_save = get_file_save( type_file )
    build.save_lines_to_file( DIR_PATH, file_save, urls )

    print( f'The { type_file.upper() } file was saved in "{ DIR_PATH }" directory.' )


# Main
def set_arguments( argv ):
    opts, args = getopt.getopt(argv,"ho:s:",["ofile=", "save="])
    if ( len( opts ) > 0 ):

        for opt, arg in opts:
            if opt == '-o':
                global DIR_PATH
                DIR_PATH = arg

            if opt == '-s' or opt == '--save':
                global SAVE_MODE
                SAVE_MODE = arg

def main( argv ):
    set_arguments( argv )

    dict = get_dictionary()
    files = get_files_name( dict )
    urls = get_urls( files )

    if SAVE_MODE == 'txt':
        save_file( urls )
    elif SAVE_MODE == 'xml':
        schema = sitemap_xml.get_schema( WEB_URL, files )
        sitemap_xml.save_file( DIR_PATH, get_file_save( 'xml' ), schema )
    elif SAVE_MODE == None:
        print( 'Please set the save mode by -s command.' )
    else:
        print( 'Not accepted in this save mode!' )



if __name__ == "__main__":
    main( sys.argv[1:] )