import json
import sitemap_xml

DIR_PATH = 'docs/static/'
FILE = 'list.json'
FILE_XML = 'sitemap.xml'
WEB_URL = 'https://filipvrba.github.io/graph'

# Open JSON file
def get_path():
    return DIR_PATH + FILE

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


# Main
def main():
    dict = get_dictionary()
    files = get_files_name( dict )

    schema = sitemap_xml.get_schema( WEB_URL, files )
    sitemap_xml.save_file( DIR_PATH, FILE_XML, schema )



if __name__ == "__main__":
    main()