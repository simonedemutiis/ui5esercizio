sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/core/Fragment",
   "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "sap/m/MessageBox",
  "sap/ui/core/routing/History",
 

], function (Controller, UIComponent, Fragment, Filter, FilterOperator, MessageBox, History) {
    "use strict";

    return Controller.extend("cloudapp.cloudapp.controller.Fornitori", {

        onInit: function () {
            
        },
  

        onDefaultDialogPress: function () {
 
                var oView = this.getView();

                if (!this.byId("dialog")) {
                    Fragment.load({
                        id: oView.getId(),
                        name: "cloudapp.cloudapp.view.Dialog",
                        controller: this
                    }).then(function (oDialog) {
                        oView.addDependent(oDialog)
                        oDialog.open();
                    });
                } else {
                    this.byId("dialog").open();
                }
            },
            

        onValueHelpSearch: function (oEvent) {
            var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("CompanyName", FilterOperator.Contains, sValue);
			oEvent.getSource().getBinding("items").filter([oFilter]);
        },
        


		onValueHelpClose: function (oEvent) {
			var oSelectedItem = oEvent.getParameter("selectedItem");
			oEvent.getSource().getBinding("items").filter([]);

			if (!oSelectedItem) {
				return;
			}

			this.byId("input").setValue(oSelectedItem.getTitle());
        },
        onError: function () {
                 var input = this.byId("input").getValue();
                 debugger
                var oForm = this.getOwnerComponent().getModel("Suppliers");
                var fornitori = oForm.getData().Suppliers
                var filtro = fornitori.filter((element) => { return element.SupplierID == input })

                if (!filtro.length) {
                    return MessageBox.error("Fornitore non esistente")
}
        },
        onNavHome: function () {
              
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("Home", true);
			}
		}
     })
})
