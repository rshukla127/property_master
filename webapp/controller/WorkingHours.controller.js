sap.ui.define([
	"com/public/storage/pao/utils/reusecontroller",
    "sap/m/BusyDialog",
    "sap/m/MessageToast",
    "com/public/storage/pao/utils/formatter"
], function(
	BaseController,
    BusyDialog,
    MessageToast,
    formatter
) {
	"use strict";
    var _oController;

	return 	BaseController
    .extend("com.public.storage.pao.controller.WorkingHours", {
        formatter: formatter,
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
            //this.setDefaultValues();
            this._oModel = sap.ui.getCore().getModel("mainModel");
            this.readPropertyData(Plant, LegacyPropertyNumber)

        },

        // setDefaultValues:function(){
        //     this.byId("sunOpen").setValue("09:30:00");
        //     this.byId("monOpen").setValue("09:30:00");
        //     this.byId("tueOpen").setValue("09:30:00");
        //     this.byId("wedOpen").setValue("09:30:00");
        //     this.byId("thuOpen").setValue("09:30:00");
        //     this.byId("friOpen").setValue("09:30:00");
        //     this.byId("satOpen").setValue("09:30:00");
        //     this.byId("sunClose").setValue("17:00:00");
        //     this.byId("monClose").setValue("18:00:00");
        //     this.byId("tueClose").setValue("18:00:00");
        //     this.byId("wedClose").setValue("18:00:00");
        //     this.byId("thuClose").setValue("18:00:00");
        //     this.byId("friClose").setValue("18:00:00");
        //     this.byId("satClose").setValue("17:00:00");
        //     //this.byId("daylight").setSelectedKey("N");
        // },

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

            const payload = {
                OfficeSundayOpenHr: finalSunOpen,
                OfficeSundayCloseHr: finalSunClosed,
                OfficeMondayOpenHr: finalMonOpen,
                OfficeMondayCloseHr: finalMonClosed,
                OfficeTuesdayOpenHr: finalTueOpen,
                OfficeTuesdayCloseHr: finalTueClosed,
                OfficeWednessdayOpenHr: finalWedOpen,
                OfficeWednessdayCloseHr: finalWedClosed,
                OfficeThursdayOpenHr: finalThuOpen,
                OfficeThursdayCloseHr: finalThuClosed,
                OfficeFridayOpenHr: finalFriOpen,
                OfficeFridayCloseHr: finalFriClosed,
                OfficeSaturdayOpenHr: finalSatOpen,
                OfficeSaturdayCloseHr: finalSatClosed
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