sap.ui.define([
	"com/public/storage/pao/utils/reusecontroller",
    "sap/m/BusyDialog",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "com/public/storage/pao/utils/formatter"
], function(
	BaseController,
    BusyDialog,
    MessageToast,
    JSONModel,
    formatter
    
) {
	"use strict";
    var _oController;

	return 	BaseController
    .extend("com.public.storage.pao.controller.GateDetails", {
        formatter: formatter,
        onInit: function () {
            _oController = this;
            const oRouter = this.getRouter();
            oRouter.getRoute("gateDetails").attachMatched(this._onRouteMatched, this);
            this._oBusyDialog = new BusyDialog();
			this.getView().addDependent(this._oBusyDialog);

        },

        _onRouteMatched: function(oEvent){
            const Plant = this.getOwnerComponent().plant;
            const LegacyPropertyNumber= this.getOwnerComponent().LegacyPropertyNumber;
            this._oModel = sap.ui.getCore().getModel("mainModel");
            this.readPropertyData(Plant, LegacyPropertyNumber);
            this.setDefaultValues();


        },

        setDefaultValues: function(){
            this.getView().byId("gateSunOpen").setValue("09:30:00");
            this.getView().byId("gateMonOpen").setValue("09:30:00");
            this.getView().byId("gateTueOpen").setValue("09:30:00");
            this.getView().byId("gateWedOpen").setValue("09:30:00");
            this.getView().byId("gateThuOpen").setValue("09:30:00");
            this.getView().byId("gateFriOpen").setValue("09:30:00");
            this.getView().byId("gateSatOpen").setValue("09:30:00");
            this.getView().byId("gateThanksOpen").setValue("09:30:00");
            this.getView().byId("gateChrisOpen").setValue("09:30:00");
            this.getView().byId("gateNewYearOpen").setValue("09:30:00");
            this.getView().byId("gateSunClose").setValue("17:00:00");
            this.getView().byId("gateMonClose").setValue("17:00:00");
            this.getView().byId("gateTueClose").setValue("17:00:00");
            this.getView().byId("gateWedClose").setValue("17:00:00");
            this.getView().byId("gateThuClose").setValue("17:00:00");
            this.getView().byId("gateFriClose").setValue("17:00:00");
            this.getView().byId("gateSatClose").setValue("17:00:00");
            this.getView().byId("gateThanksClose").setValue("17:00:00");
            this.getView().byId("gateChrisClose").setValue("17:00:00");
            this.getView().byId("gateNewYearClose").setValue("17:00:00");
        },

        onPressSaveGateDetails: function(){
            const sPlant = this.getOwnerComponent().plant
            const LegacyPropertyNumber = this.getOwnerComponent().LegacyPropertyNumber
            // let sTime = "T00:00:00";
                let sunOpen = this.byId("sunOpen").getValue().split(':').map(Number);
                let hours = sunOpen[0]
                let minutes = sunOpen[1]
                let seconds = sunOpen[2]
                let finalSunOpen = "PT" + hours + "H" + minutes + "M" + seconds + "S";
            const payload = {
                GateSundayOpenHr: this.getView().byId("gateSunOpen").getValue(),
                GateSundayCloseHr: this.getView().byId("gateSunClose").getValue(),
                GateMondayOpenHr: this.getView().byId("gateMonOpen").getValue(),
                GateMondayCloseHr: this.getView().byId("gateMonClose").getValue(),
                GateTuesdayOpenHr: this.getView().byId("gateTueOpen").getValue(),
                GateTuesdayCloseHr: this.getView().byId("gateTueClose").getValue(),
                GateWednessdayOpenHr: this.getView().byId("gateWedOpen").getValue(),
                GateWednessdayCloseHr: this.getView().byId("gateWedClose").getValue(),
                GateThursdayOpenHr: this.getView().byId("gateThuOpen").getValue(),
                GateThursdayCloseHr: this.getView().byId("gateThuClose").getValue(),
                GateFridayOpenHr: this.getView().byId("gateFriOpen").getValue(),
                GateFridayCloseHr: this.getView().byId("gateFriClose").getValue(),
                GateSaturdayOpenHr: this.getView().byId("gateSatOpen").getValue(),
                GateSaturdayCloseHr: this.getView().byId("satClose").getValue(),

                GateThanksgivingOpenHr: this.getView().byId("gateThanksOpen").getValue(),
                GateThanksgivingCloseHr: this.getView().byId("gateThanksClose").getValue(),
                GateChristmasOpenHr: this.getView().byId("gateChrisOpen").getValue(),
                GateChristmasCloseHr: this.getView().byId("gateChrisClose").getValue(),
                GateNewyearOpenHr: this.getView().byId("gateNewYearOpen").getValue(),
                GateNewyearCloseHr: this.getView().byId("gateNewYearClose").getValue(),
                GateAccessZone01: this.getView().byId("gateac1").getValue(),
                GateAccessZone02: this.getView().byId("gateac2").getValue(),
                GateAccessZone03: this.getView().byId("gateac3").getValue(),
                GateAccessZone04: this.getView().byId("gateac4").getValue(),
                GateAccessZone05: this.getView().byId("gateac5").getValue(),
                GateAccessZone06: this.getView().byId("gateac6").getValue(),
                GateAccessZone07: this.getView().byId("gateac7").getValue(),
                GateAccessZone08: this.getView().byId("gateac8").getValue(),
                GateAccessZone09: this.getView().byId("gateac9").getValue(),
                GateAccessZone10: this.getView().byId("gateac10").getValue(),
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