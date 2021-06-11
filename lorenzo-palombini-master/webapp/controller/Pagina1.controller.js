sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/BindingMode"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
    function (Controller, JSONModel, BindingMode) {
        "use strict";

        return Controller.extend("binding.binding.controller.Pagina1", {
            onInit: function () {

                var oProductModel = new JSONModel()
                oProductModel.loadData("./model/Products.json")
                this.getView().setModel(oProductModel, "ciccio")

                var oView = this.getView();
                sap.ui.getCore().getMessageManager().registerObject(oView, true)

                var oData = {
                    nome: "Lorenzo",
                    cognome: "Palombini",
                    abilita: true,
                    indirizzo: {
                        via: "Vicolo del Pollo 254",
                        citta: "Roma",
                        codicepostale: "00100",
                        paese: "Italia"
                    },
                    importo: 123455.6789,
                    divisa: 'EUR'
                }
                var oModel = new JSONModel(oData)
                // oModel.setDefaultBindingMode(BindingMode.OneWay)
                this.getView().setModel(oModel, "utente")
            },
            formatMail: function (sNome, sCognome) {
                return sap.m.URLHelper.normalizeEmail(sNome + "." + sCognome + "@gmail.com")
            },
            onElementPress: function (oControlEvent) {
                var oSource = oControlEvent.getSource()
                var oContext = oSource.getBindingContext("ciccio")
                var sPath = oContext.getPath()
                var oPanel = this.byId("product")
                oPanel.bindElement({ path: sPath, model: "ciccio" })
            }
        });
    });