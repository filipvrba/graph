from xml.etree import ElementTree
from xml.etree.ElementTree import Element, SubElement
from xml.dom import minidom

from datetime import datetime
from pathlib import Path

SCHEMAS = 'http://www.sitemaps.org/schemas/sitemap/0.9'
SCHEMAS_LOCATION = 'http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd'
XSI = 'http://www.w3.org/2001/XMLSchema-instance'

ENCODING = 'UTF-8'

def prettify( elem ):
    """
    Return a pretty-printed XML string for the Element.
    """
    rough_string = ElementTree.tostring( elem, ENCODING )
    reparsed = minidom.parseString( rough_string,  )

    return reparsed.toprettyxml( indent="  ", encoding=ENCODING ).decode( ENCODING )


def get_time():

    dt = datetime.now()
    time = dt.strftime("%Y-%m-%d")  # YYYY-MM-DD

    return time


def get_schema( web_url, files ):

    attr_qname = ElementTree.QName(XSI, "schemaLocation")
    urlset = Element( 'urlset', { attr_qname: SCHEMAS_LOCATION}, xmlns=SCHEMAS )

    for file in files:
        url = SubElement( urlset, 'url' )

        loc = SubElement( url, 'loc' )
        loc.text = f'{ web_url }/?{ file }'

        lastmod = SubElement( url, 'lastmod' )
        lastmod.text = get_time()

        priority = SubElement( url, 'priority' )
        priority.text = '0.80'

    schema = prettify( urlset )
    return schema


def save_file( directory_path, file_name, text ):
    """ Create new file for change text """

    # Get absolute path for save file
    path = Path( directory_path ).absolute()

    # # Create file
    file = open( f'{ path }/{ file_name }', 'w', encoding = ENCODING )

    file.write( text )

    file.close()

    print( f'The XML file was by saved in "{ directory_path }" directory.' )
