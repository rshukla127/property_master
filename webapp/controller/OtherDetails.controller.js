sap.ui.define([
	"com/public/storage/pao/utils/reusecontroller",
    "sap/m/BusyDialog",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
], function(
	BaseController,
    BusyDialog,
    MessageToast,
    Fragment
) {
	"use strict";
    var _oController;

	return 	BaseController
    .extend("com.public.storage.pao.controller.OtherDetails", {

        onInit: function () {
            _oController = this;
            const oRouter = this.getRouter();
            oRouter.getRoute("propOtherDetails").attachMatched(this._onRouteMatched, this);
            //this._oBusyDialog = new BusyDialog();
			this.getView().addDependent(this._oBusyDialog);

        },

        _onRouteMatched: function(oEvent){
            const Plant = this.getOwnerComponent().plant;
            const LegacyPropertyNumber= this.getOwnerComponent().LegacyPropertyNumber
            this._oModel = sap.ui.getCore().getModel("mainModel");
            this._oBusyDialog = new BusyDialog();
            this.readPropertyData(Plant, LegacyPropertyNumber)

        },

        _onValueHelpKeyTraining: function(oEvent){
            const that =this;
            //var sInputValue = oEvent.getSource().getValue(),
              const oView = this.getView();

            if (!this._pValueHelpDialogTraining) {
                this._pValueHelpDialogTraining = Fragment.load({
                    id: oView.getId(),
                    name: "com.public.storage.pao.fragments.OtherDetails.Training",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            this._oBusyDialog.open()
            this._pValueHelpDialogTraining.then(function (oDialog) {
                //that.readPropertyMasterData();
                that._oBusyDialog.close();
                // Create a filter for the binding
                //oDialog.getBinding("items").filter([new Filter("Name", FilterOperator.Contains, sInputValue)]);
                // Open ValueHelpDialog filtered by the input's value
                oDialog.open();
            });

        },

        _onValueHelpMarketClass: function(){
            const that =this;
            //var sInputValue = oEvent.getSource().getValue(),
              const oView = this.getView();

            if (!this._pValueHelpDialogMarket) {
                this._pValueHelpDialogMarket = Fragment.load({
                    id: oView.getId(),
                    name: "com.public.storage.pao.fragments.OtherDetails.Market",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            this._oBusyDialog.open()
            this._pValueHelpDialogMarket.then(function (oDialog) {
                //that.readPropertyMasterData();
                that._oBusyDialog.close();
                // Create a filter for the binding
                //oDialog.getBinding("items").filter([new Filter("Name", FilterOperator.Contains, sInputValue)]);
                // Open ValueHelpDialog filtered by the input's value
                oDialog.open();
            });

        },


        onPressSaveOtherDetails: function(){
            const sPlant = this.getOwnerComponent().plant
            const LegacyPropertyNumber = this.getOwnerComponent().LegacyPropertyNumber
            const payload = {
                Active: this.getView().byId("keyTrain").getValue(),
                BusinessUnitType: this.getView().byId("mClass").getValue()
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