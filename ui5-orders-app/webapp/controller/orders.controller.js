sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v4/ODataModel",
    "sap/ui/core/Fragment",
     "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
     "sap/m/MessageBox",
    "sap/m/MessageToast"

], function (Controller, ODataModel, Fragment, Filter, FilterOperator, MessageBox, MessageToast) {
    "use strict";

    return Controller.extend("orders.controller.Orders", {

        onInit: function () {
    var oModel = new ODataModel({
        serviceUrl: "/odata/v4/orders/",
        synchronizationMode: "None",
        operationMode: "Server"
    });
    this.getView().setModel(oModel);

    var oRouter = this.getOwnerComponent().getRouter();
    oRouter.getRoute("orders").attachPatternMatched(this._onRouteMatched, this);
},

_onRouteMatched: function () {
    var oBinding = this.byId("ordersList").getBinding("items");
    if (oBinding) {
        oBinding.refresh();
    }
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
    var oInputId       = Fragment.byId(oView.getId(), "inputId");
    var oInputCustomer = Fragment.byId(oView.getId(), "inputCustomer");
    var oSelectStatus  = Fragment.byId(oView.getId(), "selectStatus");
    var oInputAmount   = Fragment.byId(oView.getId(), "inputAmount");
    var oInputDate     = Fragment.byId(oView.getId(), "inputDate");

    var sId       = oInputId.getValue().trim();
    var sCustomer = oInputCustomer.getValue().trim();
    var sStatus   = oSelectStatus.getSelectedKey();
    var nAmount   = parseFloat(oInputAmount.getValue());
    var sDate     = oInputDate.getValue();

    var bValid = true;

    // Reset de estados previos
    [oInputId, oInputCustomer, oInputAmount, oInputDate].forEach(function (oInput) {
        oInput.setValueState("None");
    });

    if (!sId) {
        oInputId.setValueState("Error");
        oInputId.setValueStateText("El ID es obligatorio");
        bValid = false;
    }

    if (!sCustomer) {
        oInputCustomer.setValueState("Error");
        oInputCustomer.setValueStateText("El cliente es obligatorio");
        bValid = false;
    }

    if (isNaN(nAmount) || nAmount <= 0) {
        oInputAmount.setValueState("Error");
        oInputAmount.setValueStateText("Introduce un importe válido mayor que 0");
        bValid = false;
    }

    if (!sDate) {
        oInputDate.setValueState("Error");
        oInputDate.setValueStateText("La fecha es obligatoria");
        bValid = false;
    }

    if (!bValid) {
        return;
    }

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

    
},
onDeleteOrder: function (oEvent) {
    var oItem = oEvent.getParameter("listItem");
    var oContext = oItem.getBindingContext();
    var sId = oContext.getProperty("id");

    MessageBox.confirm(
        "¿Seguro que quieres eliminar la orden " + sId + "?",
        {
            title: "Confirmar eliminación",
            onClose: function (sAction) {
                if (sAction === MessageBox.Action.OK) {
                    oContext.delete().then(function () {
                        MessageToast.show("Orden eliminada");
                    }).catch(function (oError) {
                        MessageToast.show("Error al eliminar");
                    });
                }
            }
        }
    );
}

    });
});