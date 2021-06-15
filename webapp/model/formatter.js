sap.ui.define([], function() {
  'use strict';
  return { 
  
    FormatterData: function( oDate ) {
      let secondi = oDate.slice(6);
      secondi = secondi.substr(0, 13);
      var nuovaData = new Date();
      nuovaData.setTime(secondi);
      return nuovaData.toUTCString().substr(0,25);
    }
  };
});