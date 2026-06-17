sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v4/ODataModel"
], function (Controller, ODataModel) {
    "use strict";

    return Controller.extend("orders.controller.Orders", {

        onInit: function () {
            var oModel = new ODataModel({
                serviceUrl: "/odata/v4/orders/",
                synchronizationMode: "None",
                operationMode: "Server"
            });
            this.getView().setModel(oModel);
        },

        onOrderPress: function (oEvent) {
            var sId = oEvent.getSource().getBindingContext().getProperty("id");
            this.getOwnerComponent().getRouter().navTo("detail", {
                orderId: encodeURIComponent(sId)
            });
        },

        formatStatus: function (sStatus) {
            switch (sStatus) {
                case "Delivered":  return "Success";
                case "Shipped":    return "Information";
                case "Pending":    return "Warning";
                case "Cancelled":  return "Error";
                default:           return "None";
            }
        }

    });
});