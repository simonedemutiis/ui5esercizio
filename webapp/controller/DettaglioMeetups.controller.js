sap.ui.define([
    "cloudapp/cloudapp/controller/BaseController",
    "sap/m/MessageBox",
    
    "sap/ui/core/routing/History",
    "sap/m/MessageBox"
],

    function (BaseController, MessageBox, History) {
        "use strict";

        return BaseController.extend("cloudapp.cloudapp.controller.DettaglioMeetups", {

            onInit: function () {
                let oRouter = this.getRouter();
                oRouter.getRoute("DettaglioMeetups").attachPatternMatched(this._onRouteMatch, this)
            },


            onNavInd: function () {
                var oHistory, sPreviousHash

                oHistory = History.getInstance();
                sPreviousHash = oHistory.getPreviousHash();
                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    this.getRouter().navTo("Meetups", {}, true)
                }
            },

            _onRouteMatch: function (oControlEvent) {
                let id = oControlEvent.getParameter("arguments").MeetupID;
                let sPath = (id - 1);
                this.getView().bindElement({
                    path: "/" + sPath,
                    model: "Meetups"
                });
            },


            onDettaglioFornitore: function () {
                let id = parseInt(this.getView().getBindingContext("Meetups").sPath.substr(1, 2)) + 1;
                debugger
                if (this.onCheck(id)) {
                    let oRouter = this.getRouter();
                    oRouter.navTo("Suppliers", { SupplierID: id });
                } else {
                    	MessageBox.error("Nessun incontro trovato per il fornitore");
                   
                }
            },

            onCheck: function (id) {
                debugger
                let sup = this.getOwnerComponent().getModel("Suppliers").getData().Suppliers;
                
                let meetups = this.getOwnerComponent().getModel("Meetups").getData()[id - 1];
                let controllo = false;
                sup.forEach(obj => {
                    if (obj.ProductID === meetups.MeetupID) {
                        controllo = true;
                    }
                })
                return controllo;
            }

        });
    });
