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
              this.getView().setModel(new JSONModel(), "suppliers")
                var oRouter = UIComponent.getRouterFor(this);
                oRouter.getRoute("Suppliers").attachPatternMatched(this.onSuppliersInfo, this);
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
        }
        
     })
})
