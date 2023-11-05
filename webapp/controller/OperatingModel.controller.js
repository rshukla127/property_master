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
            //this.model = new JSONModel();
            // this.model.setData({
			// 	TaxOwner: "None",
            //     TaxOwnerFein: "None",
            //     LegalOwner: "None",
            //     LegalOwnerFein: "None",
            //     OwnerOfRecord: "None",
            //     solarEntity: "None",
			// });
            // this.getView().setModel(this.model);

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
        }
	});
});