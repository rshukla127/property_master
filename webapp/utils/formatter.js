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
        return "B";
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

    removeLeadingZeros: function (sValue) {
      return parseInt(sValue);
    },
  };
});
