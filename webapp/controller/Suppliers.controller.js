sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox",
    "sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel"
], function (Controller, UIComponent, Fragment, Filter, FilterOperator, MessageBox, History, JSONModel) {
    "use strict";

    return Controller.extend("cloudapp.cloudapp.controller.Suppliers", {

        onInit: function () {

            var oRouter = UIComponent.getRouterFor(this);
            oRouter.getRoute("Suppliers").attachPatternMatched(this.onRouteMatched, this);

        },

        onNavForn: function () {

            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("Fornitori", true);
            }
        },

        onRouteMatched: function (oEvent) {
            var sId = oEvent.getParameter("arguments").SupplierID;
            var c = this.onCheck(sId)
            if (!c) {
                this.getView().bindElement({
                    path: "/Suppliers/" + (sId - 1),
                    model: "Suppliers"
                })
            } else {
                this.getView().bindElement({
                    path: "/Suppliers/" + (c - 1),
                    model: "Suppliers"
                })
            }


        },
        onCheck: function (sId) {
            if (sId >= 4) {
                return sId - 1;
            }
        },
      

        onMicroChart: function () {
            var sCountry = this.byId("country").getProperty("text")
            var modify = sCountry.substr(9)
            var id = this.byId("MicroChart")
            switch (modify) {
                case "USA":
                    id.setPercentage(95)
                    break;
                case 'UK':
                    id.setPercentage(10);
                    break;
                case 'Canada':
                    id.setPercentage(50);
                    break;
                case 'Germany':
                    id.setPercentage(75);
                    break;
                default:
                    break;
            }
           
        }

    })
})
