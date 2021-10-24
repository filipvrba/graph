import json
import build
import sitemap_xml

DIR_PATH = 'docs/static/'
FILE = 'list.json'
SAVE_FILE = 'sitemap'
WEB_URL = 'https://filipvrba.github.io/graph'

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
            dir = f'{ values[ "dir" ] }/cs/{ values[ "path" ] }'
            files.append( dir )
    
    return files


def get_urls( files ):

    urls = [ ]
    new_line = '\n'

    for file in files:
        url = f'{ WEB_URL }/{ file }.html'
    
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
def main():
    dict = get_dictionary()
    files = get_files_name( dict )
    urls = get_urls( files )

    save_file( urls )

    # Google not loading XML file ( WTF? )
    # schema = sitemap_xml.get_schema( WEB_URL, files )
    # sitemap_xml.save_file( DIR_PATH, get_file_save( 'xml' ), schema )



if __name__ == "__main__":
    main()