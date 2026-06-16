sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v4/ODataModel"
], function (Controller, ODataModel) {
    "use strict";

    return Controller.extend("orders.controller.Orders", {

        onInit: function () {
            var oModel = new ODataModel({
                serviceUrl: "http://localhost:4004/odata/v4/orders/",
                synchronizationMode: "None",
                operationMode: "Server"
            });

            this.getView().setModel(oModel);
        }

    });
});