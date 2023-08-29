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
    .extend("com.public.storage.pao.controller.BUDetails", {
        formatter: formatter,
        onInit: function () {
            _oController = this;
            const oRouter = this.getRouter();
            oRouter.getRoute("buDetails").attachMatched(this._onRouteMatched, this);
            this._oBusyDialog = new BusyDialog();
			this.getView().addDependent(this._oBusyDialog);
            this.model = new JSONModel();
			this.model.setData({
				Active: "None",
				BusinessUnitType: "None",
                CustomerCode: "None",
                EntityType: "None",
                CombinedSurvivingNumber: "None",
                ATypeProperty: "None"
			});
            this.getView().setModel(this.model);
        },

        _onRouteMatched: function(oEvent){
            const Plant = this.getOwnerComponent().plant;
            const LegacyPropertyNumber= this.getOwnerComponent().LegacyPropertyNumber
            this._oModel = sap.ui.getCore().getModel("mainModel");
            const that = this;
            const oArgs = oEvent.getParameter("arguments");
            const oView = this.getView();
            this._Plant = oArgs.plant;
            this.readPropertyData(Plant, LegacyPropertyNumber);
            this.readBUType();
            that.readCustomerCode();
            that.readEntityType();
            that.readATypeProp();
            that.readAvailable3rdpDistribution();

        },

        _onValueHelpActive: function(oEvent){
            const that =this;
            //var sInputValue = oEvent.getSource().getValue(),
              const oView = this.getView();

            if (!this._pValueHelpActivey) {
                this._pValueHelpActivey = Fragment.load({
                    id: oView.getId(),
                    name: "com.public.storage.pao.fragments.BUDetails.Active",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            this._oBusyDialog.open()
            this._pValueHelpActivey.then(function (oDialog) {
                //that.readPropertyMasterData();
                that._oBusyDialog.close();
                // Create a filter for the binding
                //oDialog.getBinding("items").filter([new Filter("Name", FilterOperator.Contains, sInputValue)]);
                // Open ValueHelpDialog filtered by the input's value
                oDialog.open();
            });

        },

        _onValueHelpBUnit: function(oEvent){
            const that =this;
            //var sInputValue = oEvent.getSource().getValue(),
              const oView = this.getView();

            if (!this._pValueHelpBUnit) {
                this._pValueHelpBUnit = Fragment.load({
                    id: oView.getId(),
                    name: "com.public.storage.pao.fragments.BUDetails.Businessunit",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            //this._oBusyDialog.open()
            this._pValueHelpBUnit.then(function (oDialog) {
                //that.readBUType();
                //that._oBusyDialog.close();
                // Create a filter for the binding
                //oDialog.getBinding("items").filter([new Filter("Name", FilterOperator.Contains, sInputValue)]);
                // Open ValueHelpDialog filtered by the input's value
                oDialog.open();
            });

        },

        _onValueHelpCustCode: function(oEvent){
            const that =this;
            //var sInputValue = oEvent.getSource().getValue(),
              const oView = this.getView();

            if (!this._pValueHelpCustCode) {
                this._pValueHelpCustCode = Fragment.load({
                    id: oView.getId(),
                    name: "com.public.storage.pao.fragments.BUDetails.Customercode",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            this._oBusyDialog.open()
            this._pValueHelpCustCode.then(function (oDialog) {
                //that.readPropertyMasterData();
                that._oBusyDialog.close();
                oDialog.open();
            });

        },

        _onValueHelpEntityType: function(oEvent){
            const that =this;
            //var sInputValue = oEvent.getSource().getValue(),
              const oView = this.getView();

            if (!this._pValueHelpEntityType) {
                this._pValueHelpEntityType = Fragment.load({
                    id: oView.getId(),
                    name: "com.public.storage.pao.fragments.BUDetails.Entitytype",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            this._oBusyDialog.open()
            this._pValueHelpEntityType.then(function (oDialog) {
                //that.readPropertyMasterData();
                that._oBusyDialog.close();
                // Create a filter for the binding
                //oDialog.getBinding("items").filter([new Filter("Name", FilterOperator.Contains, sInputValue)]);
                // Open ValueHelpDialog filtered by the input's value
                oDialog.open();
            });

        },

        _onValueHelpComSurvNumber: function(oEvent){
            const that =this;
            //var sInputValue = oEvent.getSource().getValue(),
              const oView = this.getView();

            if (!this._pValueHelpComSurvNumber) {
                this._pValueHelpComSurvNumber = Fragment.load({
                    id: oView.getId(),
                    name: "com.public.storage.pao.fragments.BUDetails.Comsurvivingnumber",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            this._oBusyDialog.open()
            this._pValueHelpComSurvNumber.then(function (oDialog) {
                //that.readPropertyMasterData();
                that._oBusyDialog.close();
                oDialog.open();
            });

        },

        _onValueHelpComATypeProp: function(oEvent){
            const that =this;
            //var sInputValue = oEvent.getSource().getValue(),
              const oView = this.getView();

            if (!this._pValueHelpTypeProp) {
                this._pValueHelpTypeProp = Fragment.load({
                    id: oView.getId(),
                    name: "com.public.storage.pao.fragments.BUDetails.ATypeProperty",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            this._oBusyDialog.open()
            this._pValueHelpTypeProp.then(function (oDialog) {
                //that.readPropertyMasterData();
                that._oBusyDialog.close();
                oDialog.open();
            });

        },

        _onValueHelpComThirdParty: function(){
            const that =this;
            //var sInputValue = oEvent.getSource().getValue(),
              const oView = this.getView();

            if (!this._pValueHelpThirdParty) {
                this._pValueHelpThirdParty = Fragment.load({
                    id: oView.getId(),
                    name: "com.public.storage.pao.fragments.BUDetails.AquiredThirdParty",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            this._oBusyDialog.open()
            this._pValueHelpThirdParty.then(function (oDialog) {
                //that.readPropertyMasterData();
                that._oBusyDialog.close();
                oDialog.open();
            });

        },

        onValueHelpDialogClose: function (oEvent) {
			let	oSelectedItem = oEvent.getParameter("selectedItem");
            let sTitle = oEvent.getSource().getTitle();
            oEvent.getSource().getBinding("items").filter([]);
            if (!oSelectedItem) {
				return;
			}
            let sDescription = oSelectedItem.getDescription();
            let sCode =  oSelectedItem.getTitle();

            if (sTitle === "Business Unit"){
                this.byId("bType").setValue(sDescription);
                this._bType = sCode
            } else if(sTitle === "Customer Code"){
                this.byId("cCode").setValue(sDescription);
                this._custCode = sCode
            } else if(sTitle === "Active"){
                this.byId("active").setValue(sDescription);
                this._custCode = sCode
            } else if(sTitle === "Entity Type"){
                this.byId("entityType").setValue(sDescription);
                this._entityType = sCode
            } else if(sTitle === "Property Type Model"){
                this.byId("atypeProp").setValue(sDescription);
                this._aTypeProp = sCode
            } else if(sTitle === "Combined Surviving Number"){
                this.byId("combinedServ").setValue(sDescription);
                this._comSurvNumer = sCode
            } else if(sTitle === "Aquired Third Party"){
                this.byId("aquiredFromTP").setValue(sDescription);
                this._aquiredTP = sCode
            }

            
		},

        onPressSaveBUDetails: function(){
            let bValidation = true;
            const sPlant = this.getOwnerComponent().plant
            const LegacyPropertyNumber = this.getOwnerComponent().LegacyPropertyNumber
            let sActive = this.getView().byId("active").getSelectedKey();
            if (sActive === "") {
                this.model.setProperty("/Active", "Error");
               
            } else {
                this.model.setProperty("/Active", "None");
            }

            if (this._bType === "" || this._bType === undefined) {
                this.model.setProperty("/BusinessUnitType", "Error");
            } else {
                this.model.setProperty("/BusinessUnitType", "None");
            }

            if (this._custCode === "" || this._custCode === undefined) {
                this.model.setProperty("/CustomerCode", "Error");
            } else {
                this.model.setProperty("/CustomerCode", "None");
            }

            if (this._entityType === "" || this._entityType === undefined) {
                this.model.setProperty("/EntityType", "Error");
            } else {
                this.model.setProperty("/EntityType", "None");
            }

            if (this._comSurvNumer === "" || this._comSurvNumer === undefined) {
                this.model.setProperty("/CombinedSurvivingNumber", "Error");
            } else {
                this.model.setProperty("/CombinedSurvivingNumber", "None");
            }

            if (this._aTypeProp === "" || this._aTypeProp === undefined) {
                this.model.setProperty("/ATypeProperty", "Error");
            } else {
                this.model.setProperty("/ATypeProperty", "None");
            }
            if (sActive === "" || this._bType === "" || this._custCode === "" || this._entityType === "" || this._aTypeProp === ""){
                bValidation = true;
            } else {
                bValidation = false;
            }

            if(bValidation === false){
            const payload = {
                Active: sActive,
                BusinessUnitType: this._bType,
                CustomerCode: this._custCode,
                EntityType: this._entityType,
                CombinedSurvivingNumber: this._comSurvNumer,
                Note1: this.getView().byId("note1").getValue(),
                Note2: this.getView().byId("note2").getValue(),
                Note3: this.getView().byId("note3").getValue(),
                ATypeProperty: this._aTypeProp, 
                BillBoard: this.getView().byId("bill").getSelectedKey(),
                Comercial: this.getView().byId("comm").getSelectedKey(),
                CellTower: this.getView().byId("cell").getSelectedKey(),
                Solar: this.getView().byId("solar").getSelectedKey(),
                AcquiredFrom: this.getView().byId("aquiredFrom").getValue(),
                AcquiredDevelopedThirdP:this._aquiredTP, 
                Psd:this.getView().byId("psd").getValue()
            }
           const uri= `/PropertyMasterSet(Plant='${sPlant}',LegacyPropertyNumber='${LegacyPropertyNumber}')`

            this._oModel.update(uri, payload, {
                success: function (oData) {
                   MessageToast.show("Saved Successfully");
                },
                error: function (oData) {
                    MessageToast.show("Something went wrong with Service")
                }
            })
        } else {
        MessageToast.show("Fill in all mandatory fields")
    }
    }
	});
});