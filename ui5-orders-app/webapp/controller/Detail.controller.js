sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("orders.controller.Detail", {

        onInit: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("detail").attachPatternMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function (oEvent) {
            var sId = decodeURIComponent(oEvent.getParameter("arguments").orderId);
            this.getView().bindElement({
                path: "/Orders('" + sId + "')"
            });
        },

        onNavBack: function () {
            this.getOwnerComponent().getRouter().navTo("orders");
        }

    });
});