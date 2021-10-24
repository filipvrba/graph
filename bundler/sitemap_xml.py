from xml.etree import ElementTree
from xml.etree.ElementTree import Element, SubElement
from xml.dom import minidom

from datetime import datetime
from pathlib import Path

SCHEMAS = 'http://www.sitemaps.org/schemas/sitemap/0.9'

def prettify( elem ):
    """
    Return a pretty-printed XML string for the Element.
    """
    rough_string = ElementTree.tostring( elem, 'utf-8' )
    reparsed = minidom.parseString( rough_string,  )

    return reparsed.toprettyxml( indent="  " )


def get_time():

    dt = datetime.now()
    time = dt.strftime("%Y-%m-%d")  # YYYY-MM-DD

    return time


def get_schema( web_url, files ):

    urlset = Element( 'urlset', dict( xmlns=SCHEMAS ) )

    for file in files:
        url = SubElement( urlset, 'url' )

        loc = SubElement( url, 'loc' )
        loc.text = f'{ web_url }/?{ file }'

        lastmod = SubElement( url, 'lastmod' )
        lastmod.text = get_time()
    
    schema = prettify( urlset )
    return schema


def save_file( directory_path, file_name, text ):
    """ Create new file for change text """

    # Get absolute path for save file
    path = Path( directory_path ).absolute()

    # Create file
    file = open( f'{ path }/{ file_name }', 'w', encoding = 'utf-8' )

    file.write( text )

    file.close()

    print( f'The XML file was saved in "{ directory_path }" directory.' )
