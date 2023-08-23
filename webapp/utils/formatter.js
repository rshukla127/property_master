sap.ui.define(["sap/m/MessageToast",],
	function (MessageToast) {
		"use strict";
		return {

            getSelectedKeyYes: function(sValue){
               if (sValue){
                return sValue;
               } else {
                return "Y";
               }

            },

            getSelectedKeyNo: function(sValue){
                if (sValue){
                 return sValue;
                } else {
                 return "N";
                }
 
             },

             getSelectedKeyBlank: function(sValue){
                if (sValue){
                 return sValue;
                } else {
                 return "B";
                }
 
             }
		};
	});