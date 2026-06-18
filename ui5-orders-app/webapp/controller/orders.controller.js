sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v4/ODataModel",
    "sap/ui/core/Fragment",
     "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, ODataModel, Fragment, Filter, FilterOperator) {
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

        onCreateOrder: function () {
            var oView = this.getView();
            if (!this._oDialog) {
                Fragment.load({
                    id: oView.getId(),
                    name: "orders.view.CreateOrder",
                    controller: this
                }).then(function (oDialog) {
                    this._oDialog = oDialog;
                    oView.addDependent(oDialog);
                    oDialog.open();
                }.bind(this));
            } else {
                this._oDialog.open();
            }
        },

        onSaveOrder: function () {
    var oView = this.getView();
    var sId       = Fragment.byId(oView.getId(), "inputId").getValue();
    var sCustomer = Fragment.byId(oView.getId(), "inputCustomer").getValue();
    var sStatus   = Fragment.byId(oView.getId(), "selectStatus").getSelectedKey();
    var nAmount   = parseFloat(Fragment.byId(oView.getId(), "inputAmount").getValue());
    var sDate     = Fragment.byId(oView.getId(), "inputDate").getValue();

    var oModel = this.getView().getModel();
    var oListBinding = oModel.bindList("/Orders", null, [], [], {
        $$updateGroupId: "$auto"
    });

    oListBinding.create({
        id: sId,
        customer: sCustomer,
        status: sStatus,
        amount: nAmount,
        date: sDate
    }, true);

    oModel.submitBatch("$auto").then(function () {
        oModel.refresh();
    });

    this._oDialog.close();
},

        onCancelOrder: function () {
            this._oDialog.close();
        },

        formatStatus: function (sStatus) {
            switch (sStatus) {
                case "Delivered":  return "Success";
                case "Shipped":    return "Information";
                case "Pending":    return "Warning";
                case "Cancelled":  return "Error";
                default:           return "None";
            }
        },
      onSearch: function (oEvent) {
    var sQuery = oEvent.getParameter("newValue").trim();
    var oList = this.byId("ordersList");
    var oBinding = oList.getBinding("items");

    if (sQuery) {
        var oFilterId = new Filter("id", FilterOperator.Contains, sQuery);
        var oFilterCustomer = new Filter("customer", FilterOperator.Contains, sQuery);
        var oCombined = new Filter({
            filters: [oFilterId, oFilterCustomer],
            and: false
        });
        oBinding.filter(oCombined);
    } else {
        oBinding.filter([]);
    }
}  

    });
});