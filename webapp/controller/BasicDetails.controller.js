sap.ui.define([
	"com/public/storage/pao/utils/reusecontroller",
    "sap/m/BusyDialog",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
], function(
	BaseController, BusyDialog, MessageToast, JSONModel
) {
	"use strict";
    var _oController;

	return 	BaseController
    .extend("com.public.storage.pao.controller.BasicDetails", {

        onInit: function () {
            _oController = this;

            const oRouter = this.getRouter();
            oRouter.getRoute("basicDetails").attachMatched(this._onRouteMatched, this);
            this._oBusyDialog = new BusyDialog();
			this.getView().addDependent(this._oBusyDialog);

        },

        _onRouteMatched: function(oEvent){
            const Plant = this.getOwnerComponent().plant;
            const LegacyPropertyNumber= this.getOwnerComponent().LegacyPropertyNumber
            this._oModel = sap.ui.getCore().getModel("mainModel");
            const that = this;
            const oArgs = oEvent.getParameter("arguments");
            const oView = this.getView();
            this._Plant = oArgs.plant;
            this.readPropertyData(Plant, LegacyPropertyNumber)

        },

        onPressSaveBasicDetails: function(){
            const sPlant = this.getOwnerComponent().plant
            const LegacyPropertyNumber = this.getOwnerComponent().LegacyPropertyNumber
            const payload = {
                DirectPhoneNo: "90909090",
                FaxNumber: this.getView().byId("faxNo").getValue(),
                TollFreeNumber: this.getView().byId("tollFree").getValue(),
                Network1IpAddress: this.getView().byId("network1").getValue(),
                // KioskActiveDate: this.getView().byId("kisok").getValue(),
                KioskProperty: "Y",
                BuddyPropertyNumber: this.getView().byId("budProp").getValue(),
                RetailStoreSquareFootage: this.getView().byId("retailStoreSq").getValue(),
                HistoricalProperty: this.getView().byId("histProp").getValue(),
                PsaProperty: this.getView().byId("psaProp").getValue(),
                TransferFrom: this.getView().byId("transF").getValue(),
                PublishedPhoneNo: this.getView().byId("pubPhone").getValue(),
                PropertyEmailAddress: this.getView().byId("email").getValue(),
                LocalPhoneNumber: this.getView().byId("localPh").getValue(),
                Network2IpAddress: this.getView().byId("network2").getValue(),
                OfficeSquareFootage: this.getView().byId("offSq").getValue(),
                //DirectPhoneNo: this.getView().byId("").getValue(),
                RetailStorageSize:this.getView().byId("retailST").getValue(),
                HistoricalOwner:this.getView().byId("histOwner").getValue(),
                PsaOwner: this.getView().byId("PsaOwner").getValue(),
                GeoCode: this.getView().byId("geo").getValue()
            }
           // (`/GrantMasterSet('${sGrant}')`
           const uri= `/PropertyMasterSet(Plant='${sPlant}',LegacyPropertyNumber='${LegacyPropertyNumber}')`

            this._oModel.update(uri, payload, {
                // urlParameters: {
                //     "$filter": this._Plant
                // },
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