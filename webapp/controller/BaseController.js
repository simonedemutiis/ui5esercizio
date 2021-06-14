sap.ui.define(
    ["sap/ui/core/mvc/Controller", "sap/ui/core/routing/History", "sap/ui/core/UIComponent"],
    function (Controller, History, UIComponent) {
        "use strict";

        return Controller.extend("cloudapp.cloudapp.controller.BaseController", {
            getRouter: function () {
                return UIComponent.getRouterFor(this);
            },
            onNavToValidRoute: function () {
                this.getRouter().navTo("Tabella")
            },

            onNavSup: function () {
                this.getRouter().navTo("Fornitori")
            },

            onNavBack: function () {
                var oHistory, sPreviousHash

                oHistory = History.getInstance();
                sPreviousHash = oHistory.getPreviousHash();
                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    this.getRouter().navTo("Home", {}, true)
                }
            },
          

            onBack: function () {
                var oModel = this.getOwnerComponent().getModel("Dettagli");
                oModel.setData([])
                var oHistory, sPreviousHash
                oHistory = History.getInstance();
                sPreviousHash = oHistory.getPreviousHash();
                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    this.getRouter().navTo("Tabella", {}, true)
                }
            },


        });
    }
);
