sap.ui.define([
	"com/public/storage/pao/utils/reusecontroller",
    "sap/m/BusyDialog",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    "com/public/storage/pao/utils/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/FilterType"
], function(
	BaseController,
    BusyDialog,
    MessageToast,
    Fragment,
    JSONModel,
    formatter,
    Filter,
    FilterOperator,
    FilterType
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
            const oRouter = this.getRouter();
            this.getOwnerComponent.hasChanges = false;
            const Plant = this.getOwnerComponent().plant;
            if (Plant === undefined) {
                return  oRouter.navTo("home");
              }
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
            that.readAquiredDeveloperTP();
            //that.readAvailable3rdpDistribution();

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

        onValueHelpDialogSearchBuType: function(oEvent){
            let sValue = oEvent.getParameter("value");
			let oFilter = new Filter("Description", FilterOperator.Contains, sValue);

			oEvent.getSource().getBinding("items").filter([oFilter]);

        },

        onValueHelpDialogSearchCCcode:function(oEvent){
            let sValue = oEvent.getParameter("value");
			let oFilter = new Filter("Description", FilterOperator.Contains, sValue);

			oEvent.getSource().getBinding("items").filter([oFilter]);

        },

        onValueHelpDialogSearchEntityType:function(oEvent){
            let sValue = oEvent.getParameter("value");
			let oFilter = new Filter("Description", FilterOperator.Contains, sValue);

			oEvent.getSource().getBinding("items").filter([oFilter]);

        },

        onValueHelpDialogSearchCombinedSno:function(oEvent){
            let sValue = oEvent.getParameter("value");
			let oFilter = new Filter("Description", FilterOperator.Contains, sValue);
			oEvent.getSource().getBinding("items").filter([oFilter]);

        },

        onValueHelpDialogSearchAtypeProp:function(oEvent){
            let sValue = oEvent.getParameter("value");
			let oFilter = new Filter("Description", FilterOperator.Contains, sValue);
			oEvent.getSource().getBinding("items").filter([oFilter]);

        },

        onValueHelpDialogSearchAquiredTp:function(oEvent){
            let sValue = oEvent.getParameter("value");
			let oFilter = new Filter("Description", FilterOperator.Contains, sValue);
			oEvent.getSource().getBinding("items").filter([oFilter]);

        },

        _onValueHelpBUnit: function(oEvent){
            this.getOwnerComponent.hasChanges = true;
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
            this.getOwnerComponent.hasChanges = true;
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
            this.getOwnerComponent.hasChanges = true;
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
            this.getOwnerComponent.hasChanges = true;
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
            this.getOwnerComponent.hasChanges = true;
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
            this.getOwnerComponent.hasChanges = true;
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
                this.getView().getModel("plantBasicDetailsModel").setProperty("/BusinessUnitType", `(${sCode}) ${sDescription}`);
                this.getView().getModel("plantBasicDetailsModel").setProperty("/bTypeDesc", `${sDescription}`);
                //this.byId("bType").setValue(sDescription);
                //this._bType = sCode
            } else if(sTitle === "Customer Code"){
                // this.byId("cCode").setValue(sDescription);
                // this._custCode = sCode
                this.getView().getModel("plantBasicDetailsModel").setProperty("/CustomerCode", `(${sCode}) ${sDescription}`);
                this.getView().getModel("plantBasicDetailsModel").setProperty("/custCodeDesc", `${sDescription}`);
            } else if(sTitle === "Active"){
                // this.byId("active").setValue(sDescription);
                // this._custCode = sCode
                this.getView().getModel("plantBasicDetailsModel").setProperty("/TennentInsPc", sCode);
            } else if(sTitle === "Entity Type"){
                // this.byId("entityType").setValue(sDescription);
                // this._entityType = sCode
                this.getView().getModel("plantBasicDetailsModel").setProperty("/EntityType", `(${sCode}) ${sDescription}`);
                this.getView().getModel("plantBasicDetailsModel").setProperty("/entityTypeDesc", `${sDescription}`);
            } else if(sTitle === "Property Type Model"){
                // this.byId("atypeProp").setValue(sDescription);
                // this._aTypeProp = sCode
                this.getView().getModel("plantBasicDetailsModel").setProperty("/ATypeProperty", `(${sCode}) ${sDescription}`);
                this.getView().getModel("plantBasicDetailsModel").setProperty("/aTypeDesc", `${sDescription}`);
            } else if(sTitle === "Combined Surviving Number"){
                // this.byId("combinedServ").setValue(sDescription);
                // this._comSurvNumer = sCode
                this.getView().getModel("plantBasicDetailsModel").setProperty("/CombinedSurvivingNumber", sCode);
            } else if(sTitle === "Aquired Third Party"){
                // this.byId("aquiredFromTP").setValue(sDescription);
                // this._aquiredTP = sCode
                this.getView().getModel("plantBasicDetailsModel").setProperty("/AcquiredDevelopedThirdP", `(${sCode}) ${sDescription}`);
                this.getView().getModel("plantBasicDetailsModel").setProperty("/aquiredTpDesc", `${sDescription}`);
            }

            
		},

        onDetectChange: function(oEvent){
            this.detectChanges();
        },


        onPressSaveBUDetails: function(){
            this._oBusyDialog.open();
            const that = this;
            let bValidation = true;
            const sPlant = this.getOwnerComponent().plant
            const LegacyPropertyNumber = this.getOwnerComponent().LegacyPropertyNumber;
            let sActive = this.getView().byId("active").getSelectedKey();
            var regExp = "/\(([^)]+)\)/";
            let sUnitType = this.byId("bType").getValue();
            let custCode = this.byId("cCode").getValue();
            let sEntityType = this.byId("entityType").getValue();
            let combinedServ = this.byId("combinedServ").getValue();
            let aTypeProp = this.byId("atypeProp").getValue();
            let bType = this.byId("bType").getValue();
            let aquiredFromTP = this.byId("aquiredFromTP").getValue();
            let trafficMoni = this.getView().byId("trafficMonitoring").getSelectedKey() === "Y" ? true : false;

            
            if (sActive === "") {
                this.model.setProperty("/Active", "Error");
               
            } else {
                this.model.setProperty("/Active", "None");
            }

            if (sUnitType === "" || sUnitType === undefined) {
                this.model.setProperty("/BusinessUnitType", "Error");
            } else {
                this.model.setProperty("/BusinessUnitType", "None");
            }

            if (custCode === "" || custCode === undefined) {
                this.model.setProperty("/CustomerCode", "Error");
            } else {
                this.model.setProperty("/CustomerCode", "None");
            }

            if (sEntityType === "" || sEntityType === undefined) {
                this.model.setProperty("/EntityType", "Error");
            } else {
                this.model.setProperty("/EntityType", "None");
            }

            if (combinedServ === "" || combinedServ === undefined) {
                this.model.setProperty("/CombinedSurvivingNumber", "Error");
            } else {
                this.model.setProperty("/CombinedSurvivingNumber", "None");
            }

            if (aTypeProp === "" || aTypeProp=== undefined) {
                this.model.setProperty("/ATypeProperty", "Error");
            } else {
                this.model.setProperty("/ATypeProperty", "None");
            }
            if (sUnitType === "" || sActive === "" || custCode === "" || sEntityType === "" || combinedServ === "" || aTypeProp === ""){
                bValidation = true;
            } else {
                bValidation = false;
            }

            if(bValidation === false){
            const payload = {
                Active: sActive,
                BusinessUnitType: bType,
                CustomerCode: custCode,
                EntityType: sEntityType,
                CombinedSurvivingNumber: combinedServ,
                Note1: this.getView().byId("note1").getValue(),
                Note2: this.getView().byId("note2").getValue(),
                Note3: this.getView().byId("note3").getValue(),
                ATypeProperty: aTypeProp, 
                BillBoard: this.getView().byId("bill").getSelectedKey(),
                Comercial: this.getView().byId("comm").getSelectedKey(),
                CellTower: this.getView().byId("cell").getSelectedKey(),
                Solar: this.getView().byId("solar").getSelectedKey(),
                AcquiredFrom: this.getView().byId("aquiredFrom").getValue(),
                AcquiredDevelopedThirdP: aquiredFromTP, 
                Psd:this.getView().byId("psd").getValue(),
                TrafticMonitoring: trafficMoni
            }
           const uri= `/PropertyMasterSet(Plant='${sPlant}',LegacyPropertyNumber='${LegacyPropertyNumber}')`
           
            this._oModel.update(uri, payload, {
                success: function (oData) {
                    that._oBusyDialog.close();
                    that.getOwnerComponent.hasChanges = false;
                   MessageToast.show("Saved Successfully");
                },
                error: function (error) {
                    that._oBusyDialog.close();
                    MessageToast.show("Something went wrong with Service")
                }
            })
        } else {
            this._oBusyDialog.close();
        MessageToast.show("Fill in all mandatory fields")
    }
    }
	});
});