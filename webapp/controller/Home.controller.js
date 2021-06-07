sap.ui.define([
    "cloudapp/cloudapp/controller/BaseController",
],
	
	function (BaseController) {
		"use strict";

        return BaseController.extend("cloudapp.cloudapp.controller.Home", {
			  onNavToValidRoute: function (){
                this.getRouter().navTo("Tabella")
                
            }
		});
	});
