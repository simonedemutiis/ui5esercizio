sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
    function (Controller, History) {
        "use strict";

        return Controller.extend("binding.binding.controller.NotFound", {
            onInit: function () {

            },
            onBack: function () {
                var oHistory = History.getInstance();
                var sHash = oHistory.getPreviousHash();
                if (sHash !== undefined) {
                    window.history.go(-1);
                } else {
                    var oRouter = this.getOwnerComponent().getRouter();
                    oRouter.navTo("Pagina1", {}, true);
                }
            }
        });
    });