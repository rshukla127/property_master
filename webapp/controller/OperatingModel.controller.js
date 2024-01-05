sap.ui.define([
	"com/public/storage/pao/utils/reusecontroller",
    "sap/m/BusyDialog",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    "com/public/storage/pao/utils/formatter"
], function(
	BaseController,
    BusyDialog,
    MessageToast,
    Fragment,
    JSONModel,
    formatter
) {
	"use strict";
    var _oController;

	return 	BaseController
    .extend("com.public.storage.pao.controller.OperatingModel", {
        formatter: formatter,
        onInit: function () {   
            _oController = this;
            const oRouter = this.getRouter();
            oRouter.getRoute("opmodel").attachMatched(this._onRouteMatched, this);
            this._oBusyDialog = new BusyDialog();
			this.getView().addDependent(this._oBusyDialog);

        },

        _onRouteMatched: function(oEvent){
            const oRouter = this.getRouter();
            this.getOwnerComponent.hasChanges = false;
            const Plant = this.getOwnerComponent().plant;
            if (Plant === undefined) {
                return  oRouter.navTo("home");
              }
            const LegacyPropertyNumber= this.getOwnerComponent().LegacyPropertyNumber
            this._oModel = sap.ui.getCore().getModel("mainModel");
            this.readPropertyData(Plant, LegacyPropertyNumber);
        },

        onDetectChange: function(oEvent){
            this.detectChanges();
        },
        onPressSaveOperatingModelDetails: function(){
            this._oBusyDialog.open();
            const that = this;
            const sPlant = this.getOwnerComponent().plant
            const LegacyPropertyNumber = this.getOwnerComponent().LegacyPropertyNumber;
            let sTime = "T00:00:00";
            let skioskmodel = this.byId("kioskmodel").getSelectedKey();
           
            let scddModel = this.byId("cddModel").getSelectedKey();
            let sSatelliteModel = this.byId("satelliteModel").getSelectedKey();
            let sconnectCareModel = this.byId("connectCareModel").getSelectedKey();
            let skioskGp = this.byId("kioskGp").getValue();
            let sconnectCareBuddy = this.byId("connectCareBuddy").getValue();
            let skioskBuddy = this.byId("kioskBuddy").getValue();
            let scddGroup = this.byId("cddGroup").getValue();
            let ssatelliteHub = this.byId("satelliteHub").getValue();
            let ssatelliteGroup = this.byId("satelliteGroup").getValue();
            let sconnectCareGroup = this.byId("connectCareGroup").getValue();
            let skioskDate = this.byId("kioskDate").getValue().split(".").reverse().join("-");
            let scddDate = this.byId("cddDate").getValue().split(".").reverse().join("-");
            let ssatelliteDate = this.byId("satelliteDate").getValue().split(".").reverse().join("-");
            let sconnectCareDate = this.byId("connectCareDate").getValue().split(".").reverse().join("-");

            let finalskioskDate = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(skioskDate)) + sTime;
            let finalcddDate = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(scddDate)) + sTime;
            let finalsatelliteDate = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(ssatelliteDate)) + sTime;
            let finalconnectCareDate = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sconnectCareDate)) + sTime;
            skioskDate =  finalskioskDate === "T00:00:00" ? null : finalskioskDate ;
            scddDate =  finalcddDate === "T00:00:00" ? null : finalcddDate ;
            ssatelliteDate =  finalsatelliteDate === "T00:00:00" ? null : finalsatelliteDate ;
            sconnectCareDate =  finalconnectCareDate === "T00:00:00" ? null : finalconnectCareDate ;

            const payload = {
                KioskModel: skioskmodel,
                KioskGroup: skioskGp,
                KioskDate: skioskDate,
                KioskBuddy: skioskBuddy,
                CddModel: scddModel,
                CddGroup: scddGroup,
                CddDate: scddDate,
                ConnectcareModel: sconnectCareModel,
                ConnectcareGroup: sconnectCareGroup,
                ConnectcareDate: sconnectCareDate,
                ConnectcareBuddy: sconnectCareBuddy,
                SatelliteModel: sSatelliteModel,
                SatelliteGroup: ssatelliteGroup,
                SatelliteDate: ssatelliteDate,
                SatelliteHub: ssatelliteHub
            }
           const uri= `/PropertyMasterSet(Plant='${sPlant}',LegacyPropertyNumber='${LegacyPropertyNumber}')`
           
            this._oModel.update(uri, payload, {
                success: function (oData) {
                    that._oBusyDialog.close();
                   MessageToast.show("Saved Successfully");
                   that.getOwnerComponent.hasChanges = false;
                },
                error: function (error) {
                    that._oBusyDialog.close();
                    MessageToast.show("Something went wrong with Service")
                }
            });
    }
	});
});