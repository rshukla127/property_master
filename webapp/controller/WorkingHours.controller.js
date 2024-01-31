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

        onPressSaveWorkingHours: function(){
            this._oBusyDialog.open();
            const that = this;
            var bValidation = true;
            const sPlant = this.getOwnerComponent().plant
            const LegacyPropertyNumber = this.getOwnerComponent().LegacyPropertyNumber
            // let sTime = "T00:00:00";
            let sDayLight = this.byId("daylight").getSelectedKey();
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

            const validateAndSetProperty = (value, path) => {
                if (value === "" || value == null) {
                    this.model.setProperty(path, "Error");
                } else {
                    this.model.setProperty(path, "None");
                }
            };
        
            const setValidationProperties = () => {
                validateAndSetProperty(sunOpenN, "/sunOpenHR");
                validateAndSetProperty(monOpenN, "/monOpenHR");
                validateAndSetProperty(tueOpenN, "/tueOpenHR");
                validateAndSetProperty(wedOpenN, "/wedOpenHR");
                validateAndSetProperty(thuOpenN, "/thuOpenHR");
                validateAndSetProperty(friOpenN, "/friOpenHR");
                validateAndSetProperty(satOpenN, "/satOpenHR");
                validateAndSetProperty(sunCloseN, "/sunCloseHR");
                validateAndSetProperty(monCloseN, "/monCloseHR");
                validateAndSetProperty(tueCloseN, "/tueCloseHR");
                validateAndSetProperty(wedCloseN, "/wedCloseHR");
                validateAndSetProperty(thuCloseN, "/thuCloseHR");
                validateAndSetProperty(friCloseN, "/friCloseHR");
                validateAndSetProperty(satCloseN, "/satCloseHR");
            };
            setValidationProperties();
            
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
                OfficeSaturdayCloseHr: finalSatClosed,
                DayLightSavingsApplicable: sDayLight
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