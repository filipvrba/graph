// @ts-nocheck
/**
 *
 * Warehouse Graph User Event for injecting the inline Suitelet URL
 *
 * @module warehouseGraph_ue
 * @author Michal Tvrdy
 * @author Filip Vrba
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
 // @ts-ignore
 define(['N/record'],
 /**
  * @param {record}  record
  */
   // @ts-ignore
   function(record) {

    const suiteletUrl = "https://tstdrv2382769.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=116&deploy=1&compid=TSTDRV2382769&h=3e6b7cceb62b6bfaf912"

     /**
      * Executed whenever a read operation occurs on a record, and prior to returning the record or page.
      *
      * @param {Object} context
      * @param {Record} context.newRecord - New record
      * @param {string} context.type - Trigger type
      * @param {Form} context.form - Current form
      */
     function beforeLoad(context) {

	    // @ts-ignore
	    log.debug("RUUUN!");
        let objRecord = context.newRecord;
        let itemId = objRecord.getValue("id");
        // @ts-ignore
        log.debug("itemId", itemId);

        // Set the field value
        objRecord.setValue("custitem_warehouse_graph", '<iframe src=' + suiteletUrl + '&itemid=' + itemId + 'style="width: 1000px; height: 1000px;" />');

     };

        return {
            beforeLoad: beforeLoad
        };
    });
