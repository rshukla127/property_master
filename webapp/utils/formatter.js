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
 
             },

             formatTime: function(sTime){
               if (sTime.ms !== 0){
               let ms = sTime.ms
                return new Date(ms).toISOString().slice(11, 19);
               } else {
               return "09:30:00"
               }

             },

             formatTimeSatandSunClose: function(sTime){
               if (sTime.ms !== 0){
               let ms = sTime.ms
                return new Date(ms).toISOString().slice(11, 19);
               } else {
               return "17:00:00"
               }
             },

             formatTimeOthersClose: function(sTime){
               if (sTime.ms !== 0){
               let ms = sTime.ms
                return new Date(ms).toISOString().slice(11, 19);
               } else {
               return "18:00:00"
               }
             },

             formatGateTimeOpen: function(sTime){
               if (sTime.ms !== 0){
                  let ms = sTime.ms
                   return new Date(ms).toISOString().slice(11, 19);
                  } else {
                  return "06:00:00"
                  }
             },

             formatGateTimeClose: function(sTime){
               if (sTime.ms !== 0){
                  let ms = sTime.ms
                   return new Date(ms).toISOString().slice(11, 19);
                  } else {
                  return "21:00:00"
                  }
             }
		};
	});