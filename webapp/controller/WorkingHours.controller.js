sap.ui.define([
	"com/public/storage/pao/utils/reusecontroller",
    "sap/m/BusyDialog",
    "sap/m/MessageToast"
], function(
	BaseController,
    BusyDialog,
    MessageToast
) {
	"use strict";
    var _oController;

	return 	BaseController
    .extend("com.public.storage.pao.controller.WorkingHours", {

        onInit: function () {
            _oController = this;
            const oRouter = this.getRouter();
            oRouter.getRoute("workingHours").attachMatched(this._onRouteMatched, this);
            this._oBusyDialog = new BusyDialog();
			this.getView().addDependent(this._oBusyDialog);

        },

        _onRouteMatched: function(oEvent){
            const Plant = this.getOwnerComponent().plant;
            const LegacyPropertyNumber= this.getOwnerComponent().LegacyPropertyNumber;
            this.setDefaultValues();
            this._oModel = sap.ui.getCore().getModel("mainModel");
            this.readPropertyData(Plant, LegacyPropertyNumber)

        },

        setDefaultValues:function(){
            this.byId("sunOpen").setValue("09:30:00");
            this.byId("monOpen").setValue("09:30:00");
            this.byId("tueOpen").setValue("09:30:00");
            this.byId("wedOpen").setValue("09:30:00");
            this.byId("thuOpen").setValue("09:30:00");
            this.byId("friOpen").setValue("09:30:00");
            this.byId("satOpen").setValue("09:30:00");
            this.byId("sunClose").setValue("17:00:00");
            this.byId("monClose").setValue("18:00:00");
            this.byId("tueClose").setValue("18:00:00");
            this.byId("wedClose").setValue("18:00:00");
            this.byId("thuClose").setValue("18:00:00");
            this.byId("friClose").setValue("18:00:00");
            this.byId("satClose").setValue("17:00:00");
            //this.byId("daylight").setSelectedKey("N");
        },

        onPressSaveWorkingHours: function(){
            const sPlant = this.getOwnerComponent().plant
            const LegacyPropertyNumber = this.getOwnerComponent().LegacyPropertyNumber
            // let sTime = "T00:00:00";
                let sunOpen = this.byId("sunOpen").getValue().split(':').map(Number);
                let monOpen = this.byId("monOpen").getValue().split(':').map(Number);
                let tueOpen = this.byId("tueOpen").getValue().split(':').map(Number);
                let wedOpen = this.byId("wedOpen").getValue().split(':').map(Number);
                let thuOpen = this.byId("thuOpen").getValue().split(':').map(Number);
                let friOpen = this.byId("friOpen").getValue().split(':').map(Number);
                let satOpen = this.byId("satOpen").getValue().split(':').map(Number);
                let sunClose = this.byId("sunClose").getValue().split(':').map(Number);
                let monClose = this.byId("monClose").getValue().split(':').map(Number);
                let tueClose = this.byId("tueClose").getValue().split(':').map(Number);
                let wedClose = this.byId("wedClose").getValue().split(':').map(Number);
                let thuClose = this.byId("thuClose").getValue().split(':').map(Number);
                let friClose = this.byId("friClose").getValue().split(':').map(Number);
                let satClose = this.byId("satClose").getValue().split(':').map(Number);

                // let hours = sunOpen[0]
                // let minutes = sunOpen[1]
                // let seconds = sunOpen[2]
                let finalSunOpen = "PT" + sunOpen[0] + "H" + sunOpen[1] + "M" + sunOpen[2] + "S";
                let finalMonOpen = "PT" + monOpen[0] + "H" + monOpen[1] + "M" + monOpen[2] + "S";
                let finalTueOpen = "PT" + tueOpen[0] + "H" + tueOpen[1] + "M" + tueOpen[2] + "S";
                let finalWedOpen = "PT" + wedOpen[0] + "H" + wedOpen[1] + "M" + wedOpen[2] + "S";
                let finalThuOpen = "PT" + thuOpen[0] + "H" + thuOpen[1] + "M" + thuOpen[2] + "S";
                let finalFriOpen = "PT" + friOpen[0] + "H" + friOpen[1] + "M" + friOpen[2] + "S";
                let finalSatOpen = "PT" + satOpen[0] + "H" + satOpen[1] + "M" + satOpen[2] + "S";
                let finalSunClosed = "PT" + sunClose[0] + "H" + sunClose[1] + "M" + sunClose[2] + "S";
                let finalMonClosed = "PT" + monClose[0] + "H" + monClose[1] + "M" + monClose[2] + "S";
                let finalTueClosed = "PT" + tueClose[0] + "H" + tueClose[1] + "M" + tueClose[2] + "S";
                let finalWedClosed = "PT" + wedClose[0] + "H" + wedClose[1] + "M" + wedClose[2] + "S";
                let finalThuClosed = "PT" + thuClose[0] + "H" + thuClose[1] + "M" + thuClose[2] + "S";
                let finalFriClosed = "PT" + friClose[0] + "H" + friClose[1] + "M" + friClose[2] + "S";
                let finalSatClosed = "PT" + satClose[0] + "H" + satClose[1] + "M" + satClose[2] + "S";

            // let finrepD3 = this.byId("finrepD3").getValue();
            // let finrepD4 = this.byId("finrepD4").getValue();
            // let finrepD5 = this.byId("finrepD5").getValue();
            // let finrepD6 = this.byId("finrepD6").getValue();
            // let finrepD7 = this.byId("finrepD7").getValue();
            // let finrepD8 = this.byId("finrepD8").getValue();
            // let finrepD9 = this.byId("finrepD9").getValue();
            // let finrepD10 = this.byId("finrepD10").getValue();
            // let formattedD3 = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(finrepD3)) + sTime;
            // let formattedD4 = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(finrepD4)) + sTime;
            // let formattedD5 = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(finrepD5)) + sTime;
            // let formattedD6 = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(finrepD6)) + sTime;
            // let formattedD7 = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(finrepD7)) + sTime;
            // let formattedD8 = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(finrepD8)) + sTime;
            // let formattedD9 = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(finrepD9)) + sTime;
            // let formattedD10 = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(finrepD10)) + sTime;
            // let formattedCddStartDate = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(cddStartDate)) + sTime;
            // finrepD3 = formattedD3 === "T00:00:00" ? null : formattedD3 ;
            // finrepD4 = formattedD4 === "T00:00:00" ? null : formattedD4 ;
            // finrepD5 = formattedD5 === "T00:00:00" ? null : formattedD5 ;
            // finrepD6 = formattedD6 === "T00:00:00" ? null : formattedD6 ;
            // finrepD7 = formattedD7 === "T00:00:00" ? null : formattedD7 ;
            // finrepD8 = formattedD8 === "T00:00:00" ? null : formattedD8 ;
            // finrepD9 = formattedD9 === "T00:00:00" ? null : formattedD9 ;
            // finrepD10 = formattedD10 === "T00:00:00" ? null : formattedD10 ;
            // cddStartDate = formattedCddStartDate === "T00:00:00" ? null : formattedCddStartDate ;
            const payload = {
                OfficeSundayOpenHr: finalSunOpen,
                OfficeSundayCloseHr: finalMonOpen,
                OfficeMondayOpenHr: finalTueOpen,
                OfficeMondayCloseHr: finalWedOpen,
                // OfficeTuesdayOpenHr: this.getView().byId("tueOpen").getValue(),
                // OfficeTuesdayCloseHr: this.getView().byId("tueClose").getValue(),
                // OfficeWednessdayOpenHr: this.getView().byId("wedOpen").getValue(),
                // OfficeWednessdayCloseHr: this.getView().byId("wedClose").getValue(),
                // OfficeThursdayOpenHr: this.getView().byId("thuOpen").getValue(),
                // OfficeThursdayCloseHr: this.getView().byId("thuClose").getValue(),
                // OfficeFridayOpenHr: this.getView().byId("friOpen").getValue(),
                // OfficeFridayCloseHr: this.getView().byId("friClose").getValue(),
                // OfficeSaturdayOpenHr: this.getView().byId("satOpen").getValue(),
                // OfficeSaturdayCloseHr: this.getView().byId("satClose").getValue(),
            }
           const uri= `/PropertyMasterSet(Plant='${sPlant}',LegacyPropertyNumber='${LegacyPropertyNumber}')`

            this._oModel.update(uri, payload, {
                success: function (oData) {
                   MessageToast.show("Saved Successfully");
                },
                error: function (oData) {
                    MessageToast.show("Something went wrong with Service")
                }
            })

        }
	});
});