sap.ui.define([
    "cloudapp/cloudapp/controller/BaseController",
    "cloudapp/cloudapp/model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    'sap/ui/model/Sorter',
    "sap/ui/core/routing/History",
],

    function (BaseController, formatter, Filter, FilterOperator, Sorter, History) {
        "use strict";

        return BaseController.extend("cloudapp.cloudapp.controller.Meetups", {
            formatter: formatter,

            onInit: function () {
                

            },

            onFilter: function (oEvent) {
                var sQuery = oEvent.getParameters().newValue
                var aFilter = [];
                if (sQuery) {
                    var oFilter = new Filter({
                        path: "Title",
                        path: "Description",
                        operator: FilterOperator.Contains,
                        value1: sQuery
                    }) 
                    aFilter.push(oFilter);
                } 
                var oList = this.getView().byId("tabellaMeet");
                var oBinding = oList.getBinding("items");
                oBinding.filter(aFilter);
            },


            onSortId: function () {
                var oSort = new Sorter({
                    path: "MeetupID",
                    descending: this.ordine,
                    group: false
                });
                var oTable = this.byId("tabellaMeet");
                oTable.getBinding("items").sort(oSort);
                this.ordine = !this.ordine
            },
            
            onNaviga: function () {
                 var oHistory, sPreviousHash
                oHistory = History.getInstance();
                sPreviousHash = oHistory.getPreviousHash();
                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    this.getRouter().navTo("Home", {}, true)
                }
            },
            
            onPressDett: function( oEvent ) {
      
    let sPath = oEvent.getSource().getBindingContext("Meetups").getPath()
      let oModel = this.getOwnerComponent().getModel("Meetups").getProperty(sPath)
      let id =  oModel.MeetupID;
      
     this.getRouter().navTo("DettaglioMeetups" , { MeetupID: id })
            }
    });
        


    });
