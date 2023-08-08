sap.ui.define([
	"com/public/storage/pao/utils/reusecontroller",
    "sap/m/BusyDialog",
    "sap/m/MessageToast"
], function(
	BaseController,
    BusyDialog,
    MessageToast
) {
	"use strict";
    var _oController;

	return 	BaseController
    .extend("com.public.storage.pao.controller.BUDetails", {

        onInit: function () {
            _oController = this;
            const oRouter = this.getRouter();
            oRouter.getRoute("buDetails").attachMatched(this._onRouteMatched, this);
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
                Active: this.getView().byId("active").getValue(),
                BusinessUnitType: this.getView().byId("bType").getValue(),
                CustomerCode: this.getView().byId("cCode").getValue(),
                EntityType: this.getView().byId("entityType").getValue(),
                CombinedSurvivingNumber: this.getView().byId("combinedServ").getValue(),
                Note1: this.getView().byId("note1").getValue(),
                Note2: this.getView().byId("note2").getValue(),
                Note3: this.getView().byId("note3").getValue(),
                ATypeProperty: this.getView().byId("atypeProp").getValue(),
                BillBoard: this.getView().byId("bill").getSelectedKey(),
                Comercial: this.getView().byId("comm").getSelectedKey(),
                CellTower: this.getView().byId("cell").getSelectedKey(),
                Solar: this.getView().byId("solar").getSelectedKey(),
                AcquiredFrom: this.getView().byId("aquiredFrom").getValue(),
                AcquiredDevelopedThirdP:this.getView().byId("aquiredFromTP").getValue(),
                Psd:this.getView().byId("psd").getValue()
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