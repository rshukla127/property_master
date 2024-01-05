sap.ui.define(["sap/m/MessageToast"], function (MessageToast) {
  "use strict";
  return {
    getSelectedKeyYes: function (sValue) {
      if (sValue) {
        return sValue;
      } else {
        return "Y";
      }
    },

    getSelectedKeyNo: function (sValue) {
      if (sValue) {
        return sValue;
      } else {
        return "N";
      }
    },

    getSelectedRankProp: function (sValue) {
      if (sValue) {
        return sValue;
      } else {
        return "Y";
      }
    },

    getKeyTrainingProffesional: function (sValue) {
      if (sValue) {
        return sValue;
      } else {
        return "Y";
      }
    },

    formatRiskScore: function (sValue) {
     
      if (sValue === "1") {
        return "On";
      } else if (sValue === "2"){
        return "Tw";
      } else if (sValue === "3"){
        return "Th";
      } else if (sValue === "4"){
        return "Fo";
      }else if (sValue === "5"){
        return "Fi";
      } else {
        return "B"
      }
    },

    formatRiskRating: function (sValue) {
      if (sValue === "Low") {
        return 'L';
      } else if (sValue === "Medium") {
        return 'M';
      } else if (sValue === "High") {
        return 'H';
      } else {
        return 'B'
      }
    },

    formatCas: function (sValue) {
      if (sValue === 'Y') {
        return 'Y';
      } else {
        return 'N';
      }
    },

    formatFCstage: function (sValue) {

      if (sValue === "Temp Closed(102)") {
        return "102";
      } else if (sValue === "Future Open(102)"){
        return "100";
      }else if (sValue === "Current Open(101)"){
        return "101";
      } else {
        return "103"
      }
    },

    getCommType: function (sValue) {

      if (sValue === "Not Assigned") {
        return "NA";
      } else if (sValue === "Urban Centers"){
        return "UC";
      } else if (sValue === "Urban Suburbs"){
        return "US";
      } else if (sValue === "Middle Suburbs"){
        return "MS";
      }else if(sValue === "Exurbs") {
        return "EX";
      } else {
        return "B";
      }
    },

    formatSatelliteModel: function (sValue) {
      if (sValue) {
        return sValue;
      } else {
        return "N";
      }
    },

    formatSatModel: function (sValue) {
      if (sValue) {
        return sValue;
      } else {
        return "N";
      }
    },

    formatCDDModel: function (sValue) {
      if (sValue) {
        return sValue;
      } else {
        return "N";
      }
    },

    formatTrafficMonitoring: function (sValue) {
      if (sValue) {
        return sValue;
      } else {
        return "N";
      }
    },


    formatKiskModel: function (sValue) {
      if (sValue) {
        return sValue;
      } else {
        return "N";
      }
    },

    formatGetAccess0: function (sValue) {
      if (sValue) {
        return sValue;
      } else {
        return "00";
      }
    },

    formatGetAccess1: function (sValue) {
      if (sValue) {
        return sValue;
      } else {
        return "01";
      }
    },

    formatGetAccess2: function (sValue) {
      if (sValue) {
        return sValue;
      } else {
        return "02";
      }
    },

    formatGetAccess3: function (sValue) {
      if (sValue) {
        return sValue;
      } else {
        return "03";
      }
    },

    formatGetAccess4: function (sValue) {
      if (sValue) {
        return sValue;
      } else {
        return "04";
      }
    },

    formatGetAccess5: function (sValue) {
      if (sValue) {
        return sValue;
      } else {
        return "05";
      }
    },

    formatGetAccess6: function (sValue) {
      if (sValue) {
        return sValue;
      } else {
        return "06";
      }
    },

    formatGetAccess7: function (sValue) {
      if (sValue) {
        return sValue;
      } else {
        return "07";
      }
    },

    formatGetAccess8: function (sValue) {
      if (sValue) {
        return sValue;
      } else {
        return "08";
      }
    },

    formatGetAccess9: function (sValue) {
      if (sValue) {
        return sValue;
      } else {
        return "09";
      }
    },

    formatGetAcces10: function (sValue) {
      if (sValue) {
        return sValue;
      } else {
        return "10";
      }
    },

    getSelectedKeyBlank: function (sValue) {
      if (sValue) {
        return sValue;
      } else {
        return "N";
      }
    },

    formatTime: function (sTime) {
      if (sTime.ms !== 0) {
        let ms = sTime.ms;
        return new Date(ms).toISOString().slice(11, 19);
      } else {
        return "09:30:00";
      }
    },

    formatTimeSatandSunClose: function (sTime) {
      if (sTime.ms !== 0) {
        let ms = sTime.ms;
        return new Date(ms).toISOString().slice(11, 19);
      } else {
        return "17:00:00";
      }
    },

    formatTimeOthersClose: function (sTime) {
      if (sTime.ms !== 0) {
        let ms = sTime.ms;
        return new Date(ms).toISOString().slice(11, 19);
      } else {
        return "18:00:00";
      }
    },

    formatGateTimeOpen: function (sTime) {
      if (sTime.ms !== 0) {
        let ms = sTime.ms;
        return new Date(ms).toISOString().slice(11, 19);
      } else {
        return "06:00:00";
      }
    },

    formatGateTimeClose: function (sTime) {
      if (sTime.ms !== 0) {
        let ms = sTime.ms;
        return new Date(ms).toISOString().slice(11, 19);
      } else {
        return "21:00:00";
      }
    },
    formatDate: function (sDate) {
      if (sDate) {
        return sap.ui.core.format.DateFormat.getDateInstance({
          pattern: "yyyy-MM-dd",
        }).format(new Date(sDate));
      }
    },

    formatAmount1: function (sValue) {
      if (sValue === "" || sValue === "0.00") {
        return 500;
      } else if (sValue === "0000"){
        return 500;
      }else {
        return parseInt(sValue);;
      }
    },

    formatAmount2: function (sValue) {
      if (sValue === "" || sValue === "0.00") {
        return 250;
      } else if (sValue === "0000"){
        return 250;
      }else {
        return parseInt(sValue);;
      }
    },

    formatAmount3: function (sValue) {
      if (sValue === "" || sValue === "0.00") {
        return 75;
      } else if (sValue === "0000"){
        return 75;
      }else {
        return parseInt(sValue);;
      }
    },

    formatAmount4: function (sValue) {
      if (sValue === "" || sValue === "0.00") {
        return 75;
      } else if (sValue === "0000"){
        return 75;
      }else {
        return parseInt(sValue);;
      }
    },

    formatAmount5: function (sValue) {
      if (sValue === "" || sValue === "0.00") {
        return 75;
      } else if (sValue === "0000"){
        return 75;
      }else {
        return parseInt(sValue);;
      }
    },

    formatAmount6: function (sValue) {
      if (sValue === "" || sValue === "0.00") {
        return sValue;
      } else if (sValue === "0000"){
        return sValue = "";
      }else {
        return parseInt(sValue);;
      }
    },

    formatAmount7: function (sValue) {
      if (sValue === "" || sValue === "0.00") {
        return sValue;
      } else if (sValue === "0000"){
        return sValue = "";
      }else {
        return parseInt(sValue);;
      }
    },

    formatAmount8: function (sValue) {
      if (sValue === "" || sValue === "0.00") {
        return sValue;
      } else if (sValue === "0000"){
        return sValue = "";
      }else {
        return parseInt(sValue);;
      }
    },

    formatAmount9: function (sValue) {
      if (sValue === "" || sValue === "0.00") {
        return sValue;
      } else if (sValue === "0000"){
        return sValue = "";
      }else {
        return parseInt(sValue);;
      }
    },

    formatAmount10: function (sValue) {
      if (sValue === "" || sValue === "0.00") {
        return sValue;
      } else if (sValue === "0000"){
        return sValue = "";
      }else {
        return parseInt(sValue);
      }
    },


    removeLeadingZeros: function (sValue) {
      return parseInt(sValue);
    },
  };
});
