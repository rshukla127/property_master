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

        },


        onPressSaveGateDetails: function(){
            const sPlant = this.getOwnerComponent().plant
            const LegacyPropertyNumber = this.getOwnerComponent().LegacyPropertyNumber
            // let sTime = "T00:00:00";
                let sunOpen = this.byId("gateSunOpen").getValue().split(':').map(Number);
                let monOpen = this.byId("gateMonOpen").getValue().split(':').map(Number);
                let tueOpen = this.byId("gateTueOpen").getValue().split(':').map(Number);
                let wedOpen = this.byId("gateWedOpen").getValue().split(':').map(Number);
                let thuOpen = this.byId("gateThuOpen").getValue().split(':').map(Number);
                let friOpen = this.byId("gateFriOpen").getValue().split(':').map(Number);
                let satOpen = this.byId("gateSatOpen").getValue().split(':').map(Number);

                let gateThanksOpen = this.byId("gateThanksOpen").getValue().split(':').map(Number);
                let gateChrisOpen = this.byId("gateChrisOpen").getValue().split(':').map(Number);
                let gateNewYearOpen = this.byId("gateNewYearOpen").getValue().split(':').map(Number);

                let sunClose = this.byId("gateSunClose").getValue().split(':').map(Number);
                let monClose = this.byId("gateMonClose").getValue().split(':').map(Number);
                let tueClose = this.byId("gateTueClose").getValue().split(':').map(Number);
                let wedClose = this.byId("gateWedClose").getValue().split(':').map(Number);
                let thuClose = this.byId("gateThuClose").getValue().split(':').map(Number);
                let friClose = this.byId("gateFriClose").getValue().split(':').map(Number);
                let satClose = this.byId("gateSatClose").getValue().split(':').map(Number);

                let geteThanksClosed = this.byId("gateThanksClose").getValue().split(':').map(Number);
                let gateChrisClosed = this.byId("gateChrisClose").getValue().split(':').map(Number);
                let gateNewYearClosed = this.byId("gateNewYearClose").getValue().split(':').map(Number);

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
                GateSundayOpenHr: finalSunOpen,
                GateSundayCloseHr: finalSunClosed,
                GateMondayOpenHr: finalMonOpen,
                GateMondayCloseHr: finalMonClosed,
                GateTuesdayOpenHr: finalTueOpen,
                GateTuesdayCloseHr: finalTueClosed,
                GateWednessdayOpenHr: finalWedOpen,
                GateWednessdayCloseHr: finalWedClosed,
                GateThursdayOpenHr: finalThuOpen,
                GateThursdayCloseHr: finalThuClosed,
                GateFridayOpenHr: finalFriOpen,
                GateFridayCloseHr: finalFriClosed,
                GateSaturdayOpenHr: finalSatOpen,
                GateSaturdayCloseHr: finalSatClosed,
                //GateThanksgivingOpenHr: gateThanksOpen,
                // GateThanksgivingCloseHr: geteThanksClosed,
                // GateChristmasOpenHr: gateChrisOpen,
                // GateChristmasCloseHr: gateChrisClosed,
                // GateNewyearOpenHr: gateNewYearOpen,
                // GateNewyearCloseHr: gateNewYearClosed,
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