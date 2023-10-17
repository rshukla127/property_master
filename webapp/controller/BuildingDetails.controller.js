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
            cells: [ new sap.m.Input({change: [this.onChange, this], maxLength: 10}), new sap.m.Input({change: [this.onChange, this], maxLength: 30}),
                new sap.m.Input({change: [this.onChange, this], maxLength: 30}),
                new sap.m.Input({change: [this.onChange, this],  maxLength: 50}),
                new sap.m.Input({change: [this.onChange, this],  maxLength: 50}),
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

            },

            onPressSaveBuldingDetails: function(oEvent){
                const aODataPayload = [];
                let Plant = this.getOwnerComponent().plant;
                let LegacyPropertyNumber= this.getOwnerComponent().LegacyPropertyNumber
                const oTable = this.byId("idAttributestTab").getItems();

                oTable.forEach(function(item) {
                    var oEntry = {};
                    //var oPayload = {
                        oEntry.Plant = Plant,
                        oEntry.Property = LegacyPropertyNumber,
                        oEntry.keyId = "Building",
                        oEntry.Code = item.getCells()[0].getValue(),
                        oEntry.Value1 = item.getCells()[1].getValue(),
                        oEntry.Value2 = item.getCells()[2].getValue(),
                        oEntry.Description1 = item.getCells()[3].getValue(),
                        oEntry.Description2 = item.getCells()[4].getValue()
                    //};
                   // aODataPayload.push(oPayload);

                    var oJModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZMM_PROPERTY_MASTER_SRV",true);
                    aODataPayload.push(oJModel.createBatchOperation("/PropertyAddOnSet", "POST", oEntry, null));
                  });

                  oJModel.addBatchChangeOperations(aODataPayload); 
			      oJModel.setUseBatch(true);
			      oJModel.submitBatch(function(oData, oResponse){
				
			   /* if (oRespone.Msg = 'S'){*/
				  MessageToast.show("Saved Successfully");
				},
				function(oError)
                {
                MessageToast.show("Something went wrong with the server");
                });

            },

            generateRandomGuid: function(){
                var lastGeneratedNumber = 0;
                lastGeneratedNumber++;
                return this.padNumber(lastGeneratedNumber, 3);
               
            },

            padNumber: function(number, width) {
                var numberString = number + '';
                return numberString.length >= width ? numberString : new Array(width - numberString.length + 1).join('0') + numberString;
              }
            
	});
});