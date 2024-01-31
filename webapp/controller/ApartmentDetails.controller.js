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
    .extend("com.public.storage.pao.controller.ApartmentDetails", {
        formatter: formatter,
        onInit: function () {
            _oController = this;
            const oRouter = this.getRouter();
            oRouter.getRoute("apartDetails").attachMatched(this._onRouteMatched, this);
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

        onPressSaveApartmentDetails: function(){
            const that = this;
            const sPlant = this.getOwnerComponent().plant
            const LegacyPropertyNumber = this.getOwnerComponent().LegacyPropertyNumber
            const payload = {
                AppartmentNumber1: this.getView().byId("apart1").getValue(),
                AppartmentName1: this.getView().byId("apartName1").getValue(),
                NumberOfStories_1: this.getView().byId("apartstories1").getValue(),
                NumberOfBedRoom1: this.getView().byId("bedroom2").getValue(),
                NumberOfBathRoom1: this.getView().byId("bathroom1").getValue(),
                AppartmentNumber2: this.getView().byId("apart2").getValue(),
                AppartmentName2: this.getView().byId("apartName2").getValue(),
                NumberOfStories_2: this.getView().byId("noOfStories2").getValue(),
                NumberOfBedRoom2: this.getView().byId("bedroom2").getValue(),
                NumberOfBathRoom2: this.getView().byId("bathroom2").getValue()
            }
           const uri= `/PropertyMasterSet(Plant='${sPlant}',LegacyPropertyNumber='${LegacyPropertyNumber}')`
           this._oBusyDialog.open();
            this._oModel.update(uri, payload, {
                success: function (oData) {
                    that._oBusyDialog.close()
                    that.getOwnerComponent.hasChanges = false;
                   MessageToast.show(that.getView().getModel("i18n").getResourceBundle().getText("successMsg"));
                },
                error: function (oError) {
                    that._oBusyDialog.close();
                    MessageToast.show(that.getView().getModel("i18n").getResourceBundle().getText("errorMsg"));
                }
            })

        }
	});
});