sap.ui.define([
	"com/public/storage/pao/utils/reusecontroller",
    "sap/m/BusyDialog",
    "sap/m/MessageToast",
    "com/public/storage/pao/utils/formatter",
    "sap/ui/model/json/JSONModel"
], function(
	BaseController,
    BusyDialog,
    MessageToast,
    formatter,
    JSONModel
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
            this.model = new JSONModel();
			this.model.setData({
				sunOpenHR: "None",
				monOpenHR: "None",
                tueOpenHR: "None",
                wedOpenHR: "None",
                thuOpenHR: "None",
                friOpenHR: "None",
                satOpenHR: "None",
                sunCloseHR: "None",
                monCloseHR: "None",
                tueCloseHR: "None",
                wedCloseHR: "None",
                thuCloseHR: "None",
                friCloseHR: "None",
                satCloseHR: "None"
			});
            this.getView().setModel(this.model);

        },

        onDetectChange: function(oEvent){
            this.detectChanges();
        },

        _onRouteMatched: function(oEvent){
            const oRouter = this.getRouter();
            this.getOwnerComponent.hasChanges = false;
            const Plant = this.getOwnerComponent().plant;
            if (Plant === undefined) {
                return  oRouter.navTo("home");
              }
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
            this._oBusyDialog.open();
            const that = this;
            var bValidation = true;
            const sPlant = this.getOwnerComponent().plant
            const LegacyPropertyNumber = this.getOwnerComponent().LegacyPropertyNumber
            // let sTime = "T00:00:00";
            let sunOpenN = this.byId("sunOpen").getValue();
            let monOpenN = this.byId("monOpen").getValue();
            let tueOpenN = this.byId("tueOpen").getValue();
            let wedOpenN = this.byId("wedOpen").getValue();
            let thuOpenN = this.byId("thuOpen").getValue();
            let friOpenN= this.byId("friOpen").getValue();
            let satOpenN = this.byId("satOpen").getValue();
            let sunCloseN = this.byId("sunClose").getValue();
            let monCloseN = this.byId("monClose").getValue();
            let tueCloseN = this.byId("tueClose").getValue();
            let wedCloseN = this.byId("wedClose").getValue();
            let thuCloseN = this.byId("thuClose").getValue();
            let friCloseN = this.byId("friClose").getValue();
            let satCloseN = this.byId("satClose").getValue();

            if (sunOpenN === "" || sunOpenN == null) {
                this.model.setProperty("/sunOpenHR", "Error");
            } else {
                this.model.setProperty("/sunOpenHR", "None");
            }
            if (monOpenN === "" || monOpenN === "") {
                this.model.setProperty("/monOpenHR", "Error");
            } else {
                this.model.setProperty("/monOpenHR", "None");
            }

            if (tueOpenN === "" || tueOpenN == null) {
                this.model.setProperty("/tueOpenHR", "Error");
            } else {
                this.model.setProperty("/tueOpenHR", "None");
            }
            if (wedOpenN === "" || wedOpenN === "") {
                this.model.setProperty("/wedOpenHR", "Error");
            } else {
                this.model.setProperty("/wedOpenHR", "None");
            }

            if (thuOpenN === "" || thuOpenN == null) {
                this.model.setProperty("/thuOpenHR", "Error");
            } else {
                this.model.setProperty("/wedOpenHR", "None");
            }
            if (friOpenN === "" || friOpenN === "") {
                this.model.setProperty("/friOpenHR", "Error");
            } else {
                this.model.setProperty("/friOpenHR", "None");
            }
            if (satOpenN === "" || satOpenN === "") {
                this.model.setProperty("/satOpenHR", "Error");
            } else {
                this.model.setProperty("/satOpenHR", "None");
            }
            if (sunCloseN === "" || sunCloseN === "") {
                this.model.setProperty("/sunCloseHR", "Error");
            } else {
                this.model.setProperty("/sunCloseHR", "None");
            }

            if (monCloseN === "" || monCloseN === "") {
                this.model.setProperty("/monCloseHR", "Error");
            } else {
                this.model.setProperty("/monCloseHR", "None");
            }
            if (tueCloseN === "" || tueCloseN === "") {
                this.model.setProperty("/tueCloseHR", "Error");
            } else {
                this.model.setProperty("/tueCloseHR", "None");
            }
            if (wedCloseN === "" || wedCloseN === "") {
                this.model.setProperty("/wedCloseHR", "Error");
            } else {
                this.model.setProperty("/wedCloseHR", "None");
            }
            if (thuCloseN === "" || thuCloseN === "") {
                this.model.setProperty("/thuCloseHR", "Error");
            } else {
                this.model.setProperty("/thuCloseHR", "None");
            }
            if (friCloseN === "" || friCloseN === "") {
                this.model.setProperty("/friCloseHR", "Error");
            } else {
                this.model.setProperty("/friCloseHR", "None");
            }
            if (satCloseN === "" || satCloseN === "") {
                this.model.setProperty("/satCloseHR", "Error");
            } else {
                this.model.setProperty("/satCloseHR", "None");
            }
            if (sunOpenN === "" || monOpenN === "" || tueOpenN === "" || wedOpenN === "" || thuOpenN === ""
            ||  friOpenN === "" || satOpenN === "" ||  sunCloseN ==="" || monCloseN === "" || tueCloseN === "" || wedCloseN === "" || thuCloseN === "" || friCloseN === ""
            || satCloseN === ""){
                bValidation = true ;
            } else {
                bValidation = false ;
            }

                if (bValidation === false){

                let sunOpen = sunOpenN.split(':').map(Number);
                let monOpen = monOpenN.split(':').map(Number);
                let tueOpen = tueOpenN.split(':').map(Number);
                let wedOpen = wedOpenN.split(':').map(Number);
                let thuOpen = thuOpenN.split(':').map(Number);
                let friOpen = friOpenN.split(':').map(Number);
                let satOpen = satOpenN.split(':').map(Number);
                let sunClose = sunCloseN.split(':').map(Number);
                let monClose = monCloseN.split(':').map(Number);
                let tueClose = tueCloseN.split(':').map(Number);
                let wedClose = wedCloseN.split(':').map(Number);
                let thuClose = thuCloseN.split(':').map(Number);
                let friClose = friCloseN.split(':').map(Number);
                let satClose = satCloseN.split(':').map(Number);

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
                    that._oBusyDialog.close();
                    that.getOwnerComponent.hasChanges = false;
                   MessageToast.show("Saved Successfully");
                },
                error: function (error) {
                    that._oBusyDialog.close();
                    MessageToast.show("Something went wrong with Service")
                }
            })
        }else {
            this._oBusyDialog.close();
            MessageToast.show("Please Fill all mandatory fields");
        }
        }
	});
});