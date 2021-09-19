// @ts-nocheck
/**
 * Helper library for the Warehouse Graph
 *
 * @module warehouseGraphHelper
 * @author Michal Tvrdy
 * @author Filip Vrba
 * @NApiVersion 2.1
 * @NModuleScope Public
 */
 define([
    "require",
    "exports",
    "N/search",
    "N/log",
], function(require, exports) {
    const search = require("N/search");
    const log = require("N/log");
    /**
     * @type {import("./warehouseGraphHelper")}
     */
    const warehouseGraphHelper = exports;

    /**
     * The graph values model
     *
     * @class
     */
     exports.WarehouseGraphModel = function() {
        /**
         * The netsuield location name
         *
         * @type {string}
         */
        this.name = null;

        /**
         * The available location quantity
         *
         * @type {number}
         */
        this.value = null;
    };

    /*
     * Main function for searched data management
     *
     * @param {itemId} item internal id
     * @returns {array} warehouseGraphDataArray Array of the WarehouseGraphModel
     */

    exports.warehouseDataGraphManagement = function warehouseDataGraphManagement(itemId) {

        let warehouseGraphSearch = warehouseGraphHelper.loadWarehouseGraphSearch(itemId);
        let warehouseGraphDataArray = [];

        let searchResultCount = warehouseGraphSearch.runPaged().count;
        log.debug("itemSearchObj result count",searchResultCount);

        if(searchResultCount > 0) {
            warehouseGraphSearch.run().each(function(result){
                
                let warehouseGraphModel = new warehouseGraphHelper.WarehouseGraphModel();

                warehouseGraphModel.value = result.getValue("locationquantityonhand");
                warehouseGraphModel.name = result.getText("inventorylocation");
                warehouseGraphDataArray.push(warehouseGraphModel);
                return true;
                });

                return warehouseGraphDataArray;
        } else {
            return null;
        }
    };

    /*
     * Returns loaded Netsuite Data Search
     *
     * @param {number} setupRecordId item internal id
     * @returns {import("N/search").Search} warehouseGraph saved search
     */

    exports.loadWarehouseGraphSearch = function formatDate(itemId) {
        let warehouseGraphSearch = search.load({
            id:"customsearch_warehouse_graph_ss"
        });

        warehouseGraphSearch.filters.push(search.createFilter({
            name: "internalid",
            operator: search.Operator.ANYOF,
            values: itemId
        }));

        return warehouseGraphSearch;
    };
});