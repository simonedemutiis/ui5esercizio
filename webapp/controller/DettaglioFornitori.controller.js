sap.ui.define([
    "cloudapp/cloudapp/controller/BaseController",
    "sap/ui/core/UIComponent",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel"
],

    function (BaseController, UIComponent, MessageBox, JSONModel) {
        "use strict";

        return BaseController.extend("cloudapp.cloudapp.controller.DettaglioFornitori", {

            onInit: function () {
                // creao un modello JSON locale
                this.getView().setModel(new JSONModel(), "products")
                var oRouter = UIComponent.getRouterFor(this);
                oRouter.getRoute("DettaglioFornitori").attachPatternMatched(this.onMatched, this);
            },

            onMatched: function (oEvent) {
                var sId = oEvent.getParameter("arguments").productID;
            
                var oModel = this.getOwnerComponent().getModel("mprod");
                  sId -= 1
                var bDiscontinued = oModel.getContext("/Products/" + sId).getObject().Discontinued
                var dettagli = this.getOwnerComponent().getModel("Dettagli");
                if (Object.keys(dettagli.getData()).length === 0) {
                    var suppliers = this.getOwnerComponent().getModel("Suppliers");
                    var s = suppliers.getData();
                    var fil = s.Suppliers.filter(function (el) {
                        return el.ProductID == (sId + 1);
                    });
                    if (fil.length > 0) {
                        dettagli.setData(fil[0])
                        // prendo il modello JSON creato in precedenza e lo setto con la proprietà discontinued.
                        this.getView().getModel("products").setProperty("/Discontinued", bDiscontinued)
                    } else {
                        MessageBox.error("Nessun fornitore associato")
                     scrollbars: false
                    }
                    dettagli.updateBindings();
                } else {
                }
            }
        });
    });
