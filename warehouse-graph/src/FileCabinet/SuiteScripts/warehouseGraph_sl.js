// @ts-nocheck
/**
 *
 * Warehouse Graph Suitelet for graphical depicting of the available inventory
 *
 * @module warehouseGraph_sl
 * @author Michal Tvrdy
 * @author Filip Vrba
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 * @NModuleScope Public
 */
// @ts-ignore
define(['N/ui/serverWidget', 'N/runtime', "require", "./warehouseGraphHelper"],

    // @ts-ignore
    function(serverWidget, runtime, require) {

        function onRequest(context) {

            const warehouseGraphHelper = require("./warehouseGraphHelper");
            const urlGraphEngine = 'https://tstdrv2382769.app.netsuite.com/core/media/media.nl?id=2573&c=TSTDRV2382769&h=upmP7DQdsRF_vFQ-D4mmzPgtd_kyk2Icl2aX7D4SZR3jz7rh&_xt=.js';

            if (context.request.method === 'GET') {

                //let html = '<!DOCTYPE html>'+'<html>'+'<head>'+'</head>'+'<body>'+'<h2>HTML Forms</h2>'+'<form action="/action_page.php">'+' First name:<br>'+'<input type="text" name="firstname" value="Mickey">'+'<br>'+'Last name:<br>'+'<input type="text" name="lastname" value="Mouse">'+'<br><br>'+'<input type="submit" value="Submit">'+'</form>'+'<p>If you click the "Submit" button, the form-data will be sent to a page called "/action_page.php".</p>'+'</body>'+'</html>';
                //let html = "<html><head></head><body>" + "<canvas class='webgl'></canvas><script src='https://tstdrv2382769.app.netsuite.com/core/media/media.nl?id=2568&c=TSTDRV2382769&h=Uon93ykbRo2KZwwvpyKTY36OchnVPgnIby7cqUT2bgBmDUEo&_xt=.js'></script><script src='https://tstdrv2382769.app.netsuite.com/core/media/media.nl?id=2567&c=TSTDRV2382769&h=SgSW3ekV01qRHr3LA6Qyx_dYcE6cIevZvh9iqDCbERoOsc3B&_xt=.js'></script></body></html>";
                //let html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Graph</title><style type="text/css">canvas {border: 1px solid black;position: fixed;}body {margin: 0;}</style></head><body><canvas></canvas><script src="https://tstdrv2382769.app.netsuite.com/core/media/media.nl?id=2571&c=TSTDRV2382769&h=e5GKJmgCv6v9eZDX_nnwb8DcnLdqcQ1frh-D9Lpf4i6nnwBB&_xt=.js"></script><script src="https://tstdrv2382769.app.netsuite.com/core/media/media.nl?id=2570&c=TSTDRV2382769&h=lVzRXU6t26sSkVGRsmuug3StKctsN0cWL2r25LWQlqi2O6it&_xt=.js"></script></body></html>';
                
                // Here we will get the data array...

                let warehouseGraphDataArray = null;
                // @ts-ignore
                try {
                    if(context.request.parameters.itemid) {
                        log.debug("internal Params", context.request.parameters.itemid);
                        let itemId = parseInt(context.request.parameters.itemid, 10);
                        warehouseGraphDataArray = warehouseGraphHelper.warehouseDataGraphManagement(itemId);
                    }
                } catch (error) {
                    log.error("ERROR!", error);
                }

                if(warehouseGraphDataArray !== null) {

                    // TODO FV: Do the magic floppy....

                    const data = JSON.stringify( warehouseGraphDataArray );

                    const html = `
                        <!DOCTYPE html>
                        <html lang="en">
                            <head>
                                <meta charset="UTF-8">
                                <title>Graphs</title>
                            </head>
                            <body>
                                <pie-chart data='${ data }' widthRadius="200"></pie-chart>
                        
                                <script src="${ urlGraphEngine }"></script>
                            </body>
                        </html>
                    `;
                    
                    // @ts-ignore
                    log.debug("html", html);

                    context.response.write(html);
                    // log.debug('GET context.response', {responseGET: context.response});

                }

            } else {


            }
        }

        return {
            onRequest: onRequest
        };
    });
