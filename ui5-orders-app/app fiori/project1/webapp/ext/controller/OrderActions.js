sap.ui.define([
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (MessageToast, MessageBox) {
    "use strict";

    return {
        confirmarOrden: function (oBindingContext, aSelectedContexts) {
            if (!aSelectedContexts || aSelectedContexts.length === 0) {
                MessageBox.error("Selecciona una orden primero");
                return;
            }

            var oContext = aSelectedContexts[0];
            var sId = oContext.getProperty("id");
            var oModel = oContext.getModel();

            var oAction = oModel.bindContext("/confirmOrder(...)");
            oAction.setParameter("orderId", sId);

            oAction.execute().then(function () {
                MessageToast.show("Orden " + sId + " confirmada correctamente");
                oModel.refresh();
            }).catch(function (oError) {
                MessageBox.error("Error: " + oError.message);
            });
        }
    };
});