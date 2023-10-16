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

        onAdd: function (oEvent) {        
            // const oModel = this.getOwnerComponent().getModel("currencyModel").getData();
            // const oNewModel = new JSONModel(oModel);
            // this.getView().setModel(oNewModel, "currModel");
            //                     //to add a new row
            // // @ts-ignore
            var oItem = new sap.m.ColumnListItem({
            // @ts-ignore
            cells: [ new sap.m.Input({change: [this.onChange, this]}), new sap.m.Input({change: [this.onChange, this]}),
                new sap.m.Input({change: [this.onChange, this]}),
                new sap.m.Input({change: [this.onChange, this]}),
                new sap.m.Input({change: [this.onChange, this]}),
                        new sap.m.Button({
                            icon: "sap-icon://delete",
                            type: "Reject",
                            press: [this.remove, this]
                        })
           ]
        });

        var oTable = this.getView().byId("idAttributestTab");
        // @ts-ignore
        oTable.addItem(oItem);
        if(oTable.getItems().length > 0){
            this.getView().byId("illusSection").setVisible(false);
        } else {
            this.getView().byId("illusSection").setVisible(true);
        }
        },

        remove: function (oEvent) {
            var oTable = this.getView().byId("idAttributestTab");
            oTable.removeItem(oEvent.getSource().getParent()).destroy();
            if(oTable.getItems().length > 0){
                this.getView().byId("illusSection").setVisible(false);
               } else {
                this.getView().byId("illusSection").setVisible(true);
               }

            }
	});
});