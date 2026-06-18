sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("orders.controller.Detail", {

        onInit: function () {
            var oUiModel = new JSONModel({ editMode: false });
            this.getView().setModel(oUiModel, "ui");

            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("detail").attachPatternMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function (oEvent) {
            var sId = decodeURIComponent(oEvent.getParameter("arguments").orderId);
            this.getView().bindElement({
                path: "/Orders('" + sId + "')"
            });
            this.getView().getModel("ui").setProperty("/editMode", false);
        },

        onEditPress: function () {
            this.getView().getModel("ui").setProperty("/editMode", true);
        },

        onCancelEdit: function () {
            // Descarta cambios no guardados
            this.getView().getModel().resetChanges();
            this.getView().getModel("ui").setProperty("/editMode", false);
        },

        onSavePress: function () {
            var oModel = this.getView().getModel();

            oModel.submitBatch("$auto").then(function () {
                MessageToast.show("Orden actualizada");
                this.getView().getModel("ui").setProperty("/editMode", false);
            }.bind(this)).catch(function () {
                MessageToast.show("Error al guardar los cambios");
            });
        },

        onNavBack: function () {
            this.getOwnerComponent().getRouter().navTo("orders");
        }

    });
});