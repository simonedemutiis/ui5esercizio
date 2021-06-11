sap.ui.define([
    "cloudapp/cloudapp/controller/BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter",
    "sap/ui/core/ValueState",
    "sap/m/Dialog",
    "sap/m/DialogType",
    "sap/m/Button",
    "sap/m/ButtonType",
    "sap/m/Text",
    "sap/m/MessageBox"
],

    function (BaseController, Filter, FilterOperator, Sorter, ValueState, Dialog, DialogType, Button, ButtonType, Text, MessageBox) {
        "use strict";

        return BaseController.extend("cloudapp.cloudapp.controller.Tabella", {
            onInit: function () {

            },
            onSearch: function (oEvent) {
                var sQuery = oEvent.getParameters().query;
                var aFilter = [];
                if (sQuery) {
                    var oFilter = new Filter({
                        path: "ProductName",
                        operator: FilterOperator.Contains,
                        value1: sQuery
                    });
                    aFilter.push(oFilter);
                }
                var oList = this.getView().byId("tabella");
                var oBinding = oList.getBinding("items");
                oBinding.filter(aFilter);
            },

            onSort: function () {
                var oSort = new Sorter({
                    path: "ProductID",
                    descending: this.ordine,
                    group: false
                });

                var oTable = this.byId("tabella");
                oTable.getBinding("items").sort(oSort);
                this.ordine = !this.ordine
            },



            onDialog: function (oEvent) {
                var product = oEvent.getSource().getBindingContext("mprod").getObject();
                var d = product.Discontinued;

                if (d == true) {
                    if (!this.oSuccessMessageDialog) {
                        this.oSuccessMessageDialog = new Dialog({
                            type: DialogType.Message,
                            title: "Success",
                            state: ValueState.Success,
                            content: new Text({ text: "Prodotto disponibile" }),
                            beginButton: new Button({
                                type: ButtonType.Emphasized,
                                text: "OK",
                                press: function () {
                                    this.oSuccessMessageDialog.close();
                                }.bind(this)
                            })
                        });
                    }

                    this.oSuccessMessageDialog.open();
                } else {
                    if (!this.oErrorMessageDialog) {
                        this.oErrorMessageDialog = new Dialog({
                            type: DialogType.Message,
                            title: "Error",
                            state: ValueState.Error,
                            content: new Text({ text: "Prodotto non più disponibile" }),
                            beginButton: new Button({
                                type: ButtonType.Emphasized,
                                text: "OK",
                                press: function () {
                                    this.oErrorMessageDialog.close();
                                }.bind(this)
                            })
                        });
                    }

                    this.oErrorMessageDialog.open();
                }
            },


            onClick: function (oEvent) {
                // var dettagli = this.getOwnerComponent().getModel("Dettagli");
                var oSource = oEvent.getSource();
                var oContext = oSource.getBindingContext("mprod")
                var pID = oContext.getProperty("ProductID")

                var suppliers = this.getOwnerComponent().getModel("Suppliers");
                var s = suppliers.getData();
                var fil = s.Suppliers.filter(function (el) {
                    return el.ProductID === pID;
                })
                if (fil.length > 0) {
                    // dettagli.setData(fil[0])
                    this.getRouter().navTo("DettaglioFornitori", {productID: pID} )
                } else {
                 MessageBox.error("Nessun fornitore associato")
                }
               // dettagli.updateBindings();
             },
           

           
        })
    });
