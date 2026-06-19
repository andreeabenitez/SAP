sap.ui.define([], function () {
    "use strict";

    return {
        defaultRenderer: "fiori2",
        bootstrapPlugins: {},
        applications: {
            "orders-display": {
                additionalInformation: "SAPUI5.Component=orders",
                applicationType: "URL",
                url: "../../",
                description: "Orders App",
                title: "Órdenes"
            }
        }
    };
});