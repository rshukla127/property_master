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
    .extend("com.public.storage.pao.controller.BuildingDetails", {
        formatter: formatter,
        onInit: function () {
            _oController = this;
            const oRouter = this.getRouter();
            oRouter.getRoute("buildDetails").attachMatched(this._onRouteMatched, this);
            this._oBusyDialog = new BusyDialog();
			this.getView().addDependent(this._oBusyDialog);

        },

        _onRouteMatched: function(oEvent){
            const Plant = this.getOwnerComponent().plant;
            const LegacyPropertyNumber= this.getOwnerComponent().LegacyPropertyNumber
            this._oModel = sap.ui.getCore().getModel("mainModel");
            this.readPropertyData(Plant, LegacyPropertyNumber)

        },

        onPressSaveBuildingDetails: function(){
            const that = this;
            const sPlant = this.getOwnerComponent().plant
            const LegacyPropertyNumber = this.getOwnerComponent().LegacyPropertyNumber
            const payload = {
                BuildingNumber: this.getView().byId("num1").getValue(),
                BuildingName1: this.getView().byId("name1").getValue(),
                NumberOfStories1: this.getView().byId("stories1").getValue(),
                BuildingNumber1: this.getView().byId("num2").getValue(),
                BuildingName2: this.getView().byId("name2").getValue(),
                NumberOfStories2: this.getView().byId("stories2").getValue(),
                BuildingNumber2: this.getView().byId("num3").getValue(),
                BuildingName3: this.getView().byId("name3").getValue(),
                NumberOfStories3: this.getView().byId("stories3").getValue(),
                BuildingNumber3: this.getView().byId("num4").getValue(),
                BuildingName4: this.getView().byId("name4").getValue(),
                NumberOfStories4: this.getView().byId("stories4").getValue(),
                BuildingNumber4: this.getView().byId("num5").getValue(),
                BuildingName5: this.getView().byId("name5").getValue(),

                NumberOfStories5: this.getView().byId("stories5").getValue(),
                AppartmentNumber5: this.getView().byId("apart1").getValue(),
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
                   MessageToast.show("Saved Successfully");
                },
                error: function (oData) {
                    that._oBusyDialog.close();
                    MessageToast.show("Something went wrong with Service")
                }
            })

        }
	});
});