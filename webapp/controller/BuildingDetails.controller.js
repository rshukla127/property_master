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
            const oRouter = this.getRouter();
            this.getOwnerComponent.hasChanges = false;
            const Plant = this.getOwnerComponent().plant;
            if (Plant === undefined) {
              return  oRouter.navTo("home");
            }
            const LegacyPropertyNumber= this.getOwnerComponent().LegacyPropertyNumber
            this._oModel = sap.ui.getCore().getModel("mainModel");
            this.readPropertyData(Plant, LegacyPropertyNumber);
            this.readBuldingDetails(Plant, LegacyPropertyNumber);

        },

        onAdd: function (oEvent) {        
            // const oModel = this.getOwnerComponent().getModel("currencyModel").getData();
            // const oNewModel = new JSONModel(oModel);
            // this.getView().setModel(oNewModel, "currModel");
            //                     //to add a new row
            // // @ts-ignore
            var oItem = new sap.m.ColumnListItem({
            // @ts-ignore
            cells: [ new sap.m.Input({change: [this.onChange, this],  maxLength: 10}), new sap.m.Input({change: [this.onChange, this], maxLength: 30}),
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
                const that = this;
                this._oBusyDialog.open();
                const aODataPayload = [];
                let Plant = this.getOwnerComponent().plant;
                let LegacyPropertyNumber= this.getOwnerComponent().LegacyPropertyNumber
                const oTable = this.byId("idAttributestTab").getItems();
                var tmpModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZMM_PROPERTY_MASTER_SRV/", {
                    json: true,
                    defaultBindingMode: sap.ui.model.BindingMode.TwoWay,
                    useBatch: true
                  });
                   
                    this.getView().setModel(tmpModel, "tmpModel");
                    var aBatchRequests = [];
                    var groupId = "foo";
                    if (oTable.length){
                    for (var m = 0; m < oTable.length; m++) {
                        var requestPath = `/PropertyAddOnSet`;
                        var updatedEntity = {
                                    Plant : Plant,
                                    Property : LegacyPropertyNumber,
                                    KeyId : "BUILDING",
                                    Code : oTable[m].getCells()[0].getValue(),
                                    Value1 : oTable[m].getCells()[1].getValue(),
                                    Value2 : oTable[m].getCells()[2].getValue(),
                                    Description1 : oTable[m].getCells()[3].getValue(),
                                    Description2 : oTable[m].getCells()[4].getValue()
                          };

                          if (oTable[m].getCells()[0].getValue() === ""){
                            this._oBusyDialog.close();
                            return MessageToast.show("Building number cannot be blank");
                          }
                        var oChangeSet = tmpModel.createBatchOperation(requestPath, "POST", updatedEntity);
                        aBatchRequests.push(oChangeSet);
                      }
                        tmpModel.addBatchChangeOperations(aBatchRequests);
                        tmpModel.submitBatch(function(oData, oResponse){
                            that._oBusyDialog.close();
                            if(oResponse.statusCode === 202){
                           
                               MessageToast.show(that.getView().getModel("i18n").getResourceBundle().getText("successMsg"));
                            }
                             },
                             function(oError)
                             {
                                that._oBusyDialog.close();
                                MessageToast.show(that.getView().getModel("i18n").getResourceBundle().getText("errorMsg"));
                             });

            } else {
                MessageToast.show("Nothing to save");
            }

            }
            
	});
});