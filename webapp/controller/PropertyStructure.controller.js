sap.ui.define([
	"com/public/storage/pao/utils/reusecontroller",
    "sap/m/BusyDialog",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
    "com/public/storage/pao/utils/formatter",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/FilterType"
], function(
	BaseController,
    BusyDialog,
    MessageToast,
    Fragment,
    formatter,
    JSONModel,
    Filter,
    FilterOperator,
    FilterType
) {
	"use strict";
    var _oController;

	return 	BaseController
    .extend("com.public.storage.pao.controller.PropertyStructure", {
        formatter: formatter,
        onInit: function () {
            _oController = this;
            const oRouter = this.getRouter();
            oRouter.getRoute("propStructure").attachMatched(this._onRouteMatched, this);
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
            
            this.readPropertyData(Plant, LegacyPropertyNumber)
            this.readOrgStructure();
            this.readHierarachy();
            if (this.getView().getModel("treeModel")){
                this.getView().getModel("treeModel").setData([]);
            }
        },


        buildTree: function(data){
            var nestedData = {};

            data.forEach(function(item) {
              // Exclude __metadata property
              if (item.__metadata) {
                delete item.__metadata;
              }
          
              if (!nestedData[item.LevelId]) {
                nestedData[item.LevelId] = item;
                nestedData[item.LevelId].children = [];
              } else {
                nestedData[item.LevelId] = Object.assign(nestedData[item.LevelId], item);
              }
          
              var parentLevelId = parseInt(item.LevelId) - 1;
              if (parentLevelId >= 0) {
                if (!nestedData[parentLevelId].children) {
                  nestedData[parentLevelId].children = [];
                }
                nestedData[parentLevelId].children.push(nestedData[item.LevelId]);
              }
            });
          
            // Find the root nodes
            var rootNodes = Object.values(nestedData).filter(function(item) {
              return parseInt(item.LevelId) === 0;
            });
          
            return rootNodes;
        },

        onCollapseAll: function(oEvent){
            const oTree = this.byId("treeTable");
            const sState = oEvent.getSource().getState();
            if (sState){
                oTree.expandToLevel(10);
            } else {
                oTree.collapseAll();
            }

        },

        _onValueHelpOrgStruc: function(oEvent){
            const that =this;
            //var sInputValue = oEvent.getSource().getValue(),
              const oView = this.getView();

            if (!this._pValueHelpFieldSup) {
                this._pValueHelpFieldSup = Fragment.load({
                    id: oView.getId(),
                    name: "com.public.storage.pao.fragments.PropertyStructure.OrgStructure",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            this._oBusyDialog.open()
            this._pValueHelpFieldSup.then(function (oDialog) {
                //that.readPropertyMasterData();
                that._oBusyDialog.close();
                // Create a filter for the binding
                //oDialog.getBinding("items").filter([new Filter("Name", FilterOperator.Contains, sInputValue)]);
                // Open ValueHelpDialog filtered by the input's value
                oDialog.open();
            });

        },

        _onValueHelpHier: function(){
            const that =this;
            //var sInputValue = oEvent.getSource().getValue(),
              const oView = this.getView();

            if (!this._pValueHelpSupOff) {
                this._pValueHelpSupOff = Fragment.load({
                    id: oView.getId(),
                    name: "com.public.storage.pao.fragments.PropertyStructure.Hierarchy",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            this._oBusyDialog.open()
            this._pValueHelpSupOff.then(function (oDialog) {
                that._oBusyDialog.close();
                oDialog.open();
            });

        },

        onValueHelpDialogClose: function (oEvent) {
			var	oSelectedItem = oEvent.getParameter("selectedItem");
            let sTitle = oEvent.getSource().getTitle();
            oEvent.getSource().getBinding("items").filter([]);
            if (!oSelectedItem) {
				return;
			}

            if (sTitle === "Org Structure"){
                let sDescriptionOrg = oSelectedItem.getDescription();
                this._sCodeOrg =  oSelectedItem.getTitle();
                this.getView().getModel("plantBasicDetailsModel").setProperty("/OrgStruct", `(${this._sCodeOrg}) ${sDescriptionOrg}`);
                this.byId("hier").setEnabled(true);
                this.byId("hier").setValue("");
                
            } 
            if(sTitle === "Hierarchy Code"){
                let sDescriptionHier = oSelectedItem.getDescription();
                let sCodeHier =  oSelectedItem.getTitle();
                this.getView().getModel("plantBasicDetailsModel").setProperty("/HierCode", `(${sCodeHier}) ${sDescriptionHier}`);
                //this.byId("hier").setEnabled(false);
                this.callTreeService(sCodeHier, this._sCodeOrg);
            }
            
		},

        onValueHelpDialogSearchHierStruct:function(oEvent){
            let sValue = oEvent.getParameter("value");
			let oFilter = new Filter("Description", FilterOperator.Contains, sValue);
			oEvent.getSource().getBinding("items").filter([oFilter]);

        },

        onValueHelpDialogSearchOrgStruct:function(oEvent){
            let sValue = oEvent.getParameter("value");
			let oFilter = new Filter("Description", FilterOperator.Contains, sValue);
			oEvent.getSource().getBinding("items").filter([oFilter]);

        },

        callTreeService: function(CodeHier, CodeOrg){
                const that = this;
                let property = new sap.ui.model.Filter('LegacyPropertyNumber', 'EQ', this.getOwnerComponent().LegacyPropertyNumber);
                let sOrgStruct = new sap.ui.model.Filter('OrgStruct', 'EQ', CodeOrg);
                let sHierCode = new sap.ui.model.Filter('HierCode', 'EQ', CodeHier);
                this._oBusyDialog.open();
                this._oModel.read(`/PropertyHierarchySet`, {
                    filters: [property, sOrgStruct, sHierCode],
                    success: function (oData) {
                        that._oBusyDialog.close();
                        that.byId("treeTable").setVisible(true);
                        const aTree = that.buildTree(oData.results);
                        const sModel = new JSONModel(aTree[0]);
                        that.getView().setModel(sModel,"treeModel");
                        that.getView().getModel("treeModel").refresh();
                        if (!aTree.length){
                          return MessageToast.show("No Data Found");  
                        }
                        that.byId("treeTable").expandToLevel(10);
                      
                    },
                    error: function (oError) {
                        that._oBusyDialog.close();
                        that.byId("treeTable").setVisible(false);
                       // const sModelBlank = new JSONModel([]);
                        if (oError.responseText){
                        const sError = JSON.parse(oError.responseText).error.message.value
                        // that._oBusyDialog.close();
                        if (sError.includes("Cost Center Group")){
                            MessageToast.show(sError);
                            that.getView().getModel("treeModel").setData([]);
                        } else {
                            MessageToast.show("No Date Found");
                            that.getView().getModel().setData([]);
                        }
                        } else {
                            MessageToast.show("Something went wrong with the service");
                            that.getView().getModel().setData([]);
                        }
                        }
                })

        }

	});
});