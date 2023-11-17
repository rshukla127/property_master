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
    .extend("com.public.storage.pao.controller.TaxDetails", {
        formatter: formatter,
        onInit: function () {   
            _oController = this;
            const oRouter = this.getRouter();
            oRouter.getRoute("taxDetails").attachMatched(this._onRouteMatched, this);
            this._oBusyDialog = new BusyDialog();
			this.getView().addDependent(this._oBusyDialog);
            this.model = new JSONModel();
            this.model.setData({
				TaxOwner: "None",
                TaxOwnerFein: "None",
                LegalOwner: "None",
                LegalOwnerFein: "None",
                OwnerOfRecord: "None",
                solarEntity: "None",
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
            this.readPropertyData(Plant, LegacyPropertyNumber);
            this.readTaxOwner();
            //this.readTaxOwnerFein();
            this.readLegalOwner();
            //this.readLegalOwnerFein();
            //this.readOwnerOfRecord();
            //this.readTaxFillingEntity();
            this.readLegalOwner();
        },

        onValueHelpDialogSearchTaxOwner:function(oEvent){
            let sValue = oEvent.getParameter("value");
			let oFilter = new Filter("Description", FilterOperator.Contains, sValue);
			oEvent.getSource().getBinding("items").filter([oFilter]);

        },

        onValueHelpDialogSearchLegalOwner:function(oEvent){
            let sValue = oEvent.getParameter("value");
			let oFilter = new Filter("Description", FilterOperator.Contains, sValue);
			oEvent.getSource().getBinding("items").filter([oFilter]);

        },

        onValueHelpDialogSearchSolarENtity:function(oEvent){
            let sValue = oEvent.getParameter("value");
			let oFilter = new Filter("Description", FilterOperator.Contains, sValue);
			oEvent.getSource().getBinding("items").filter([oFilter]);
        },

        _onValueHelpTaxOwner: function(oEvent){
            this.getOwnerComponent.hasChanges = true;
            this.selectedField = oEvent.getSource().getCustomData()[0].getValue();
            const that =this;
            //var sInputValue = oEvent.getSource().getValue(),
              const oView = this.getView();

            if (!this._pValueHelpTaxOwner) {
                this._pValueHelpTaxOwner = Fragment.load({
                    id: oView.getId(),
                    name: "com.public.storage.pao.fragments.TaxDetails.TaxOwner",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            this._oBusyDialog.open()
            this._pValueHelpTaxOwner.then(function (oDialog) {
                //that.readPropertyMasterData();
                that._oBusyDialog.close();
                // Create a filter for the binding
                //oDialog.getBinding("items").filter([new Filter("Name", FilterOperator.Contains, sInputValue)]);
                // Open ValueHelpDialog filtered by the input's value
                oDialog.open();
            });

        },

        _onValueHelpTaxOwnerFein: function(oEvent){
            const that =this;
            //var sInputValue = oEvent.getSource().getValue(),
              const oView = this.getView();

            if (!this._pValueHelpTaxOwnerFein) {
                this._pValueHelpTaxOwnerFein = Fragment.load({
                    id: oView.getId(),
                    name: "com.public.storage.pao.fragments.TaxDetails.TaxOwnerFein",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            //this._oBusyDialog.open()
            this._pValueHelpTaxOwnerFein.then(function (oDialog) {
                //that.readBUType();
                //that._oBusyDialog.close();
                // Create a filter for the binding
                //oDialog.getBinding("items").filter([new Filter("Name", FilterOperator.Contains, sInputValue)]);
                // Open ValueHelpDialog filtered by the input's value
                oDialog.open();
            });

        },

        _onValueHelpLegalOwner: function(oEvent){
            this.getOwnerComponent.hasChanges = true;
            const that =this;
            //var sInputValue = oEvent.getSource().getValue(),
              const oView = this.getView();

            if (!this._pValueHelpLegalOwner) {
                this._pValueHelpLegalOwner = Fragment.load({
                    id: oView.getId(),
                    name: "com.public.storage.pao.fragments.TaxDetails.LegalOwner",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            this._oBusyDialog.open()
            this._pValueHelpLegalOwner.then(function (oDialog) {
                //that.readPropertyMasterData();
                that._oBusyDialog.close();
                oDialog.open();
            });

        },

        _onValueHelpLegalOwnerFein: function(oEvent){
            const that =this;
            //var sInputValue = oEvent.getSource().getValue(),
              const oView = this.getView();

            if (!this._pValueHelpLegalOwnerFein) {
                this._pValueHelpLegalOwnerFein = Fragment.load({
                    id: oView.getId(),
                    name: "com.public.storage.pao.fragments.TaxDetails.LegalOwnerFein",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            this._oBusyDialog.open()
            this._pValueHelpLegalOwnerFein.then(function (oDialog) {
                //that.readPropertyMasterData();
                that._oBusyDialog.close();
                // Create a filter for the binding
                //oDialog.getBinding("items").filter([new Filter("Name", FilterOperator.Contains, sInputValue)]);
                // Open ValueHelpDialog filtered by the input's value
                oDialog.open();
            });

        },

        _onValueHelOwnerRecord: function(oEvent){
            const that =this;
            //var sInputValue = oEvent.getSource().getValue(),
              const oView = this.getView();

            if (!this._pValueHelpOwnerRecord) {
                this._pValueHelpOwnerRecord = Fragment.load({
                    id: oView.getId(),
                    name: "com.public.storage.pao.fragments.TaxDetails.OwnerofRecord",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            this._oBusyDialog.open()
            this._pValueHelpOwnerRecord.then(function (oDialog) {
                //that.readPropertyMasterData();
                that._oBusyDialog.close();
                oDialog.open();
            });

        },

        _onValueHelpTaxFillingEntity: function(oEvent){
            const that =this;
            //var sInputValue = oEvent.getSource().getValue(),
              const oView = this.getView();

            if (!this._pValueHelpTaxFillingEntity) {
                this._pValueHelpTaxFillingEntity = Fragment.load({
                    id: oView.getId(),
                    name: "com.public.storage.pao.fragments.TaxDetails.TaxFillingEntity",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            this._oBusyDialog.open()
            this._pValueHelpTaxFillingEntity.then(function (oDialog) {
                //that.readPropertyMasterData();
                that._oBusyDialog.close();
                oDialog.open();
            });

        },

        onDetectChange: function(oEvent){
            this.detectChanges();
        },

        onValueHelpDialogClose: function (oEvent) {
			let	oSelectedItem = oEvent.getParameter("selectedItem");
            let sTitle = oEvent.getSource().getTitle();
            if (!oSelectedItem) {
				return;
			}
            let sDescription = oSelectedItem.getDescription();
            let sCode =  oSelectedItem.getTitle();
            let info = oSelectedItem.getInfo();

            if (sTitle === "Tax Owner" && this.selectedField === "taxOwner"){
                this.getView().getModel("plantBasicDetailsModel").setProperty("/TaxOwner", `(${sCode}) ${sDescription}`);
                this.getView().getModel("plantBasicDetailsModel").setProperty("/TaxOwnerFein", `${info}`);
            } if(sTitle === "Legal Owner"){
                this.getView().getModel("plantBasicDetailsModel").setProperty("/LegalOwner", `(${sCode}) ${sDescription}`);
                this.getView().getModel("plantBasicDetailsModel").setProperty("/LegalOwnerFein", `${info}`);
            } if(this.selectedField === "sentity" && sTitle === "Tax Owner"){
                this.getView().getModel("plantBasicDetailsModel").setProperty("/SolarEntity", `(${sCode}) ${sDescription}`);
                //this.getView().getModel("plantBasicDetailsModel").setProperty("/LegalOwnerFein", `${info}`);
            } 
		},

        onPressSaveTaxDetails: function(){
            const that = this;
            this._oBusyDialog.open();
            const sPlant = this.getOwnerComponent().plant
            const LegacyPropertyNumber = this.getOwnerComponent().LegacyPropertyNumber;
            const taxOwner = this.byId("taxOwner").getValue();
            const taxOwnerFein = this.byId("taxOwnerFein").getValue();
            const LegalOwner = this.byId("legalOwner").getValue();
            const LegalOwnerFein = this.byId("legalOwnerFein").getValue();
            const ownerofRecord = this.byId("ownerRecord").getValue();
            const solarEntity = this.byId("solarenitity").getValue();

            let bValidation = true;

            if (taxOwner === "" || taxOwner === undefined ) {
                this.model.setProperty("/TaxOwner", "Error");
            } else {
                this.model.setProperty("/TaxOwner", "None");
            }

            // if (this.taxOwnerFein === "" || this.taxOwnerFein === undefined ) {
            //     this.model.setProperty("/TaxOwnerFein", "Error");
            // } else {
            //     this.model.setProperty("/TaxOwnerFein", "None");
            // }

            if (LegalOwner === "" || LegalOwner === undefined ) {
                this.model.setProperty("/LegalOwner", "Error");
            } else {
                this.model.setProperty("/LegalOwner", "None");
            }

            // if (this.legalOwnerFein === "" || this.legalOwnerFein === undefined ) {
            //     this.model.setProperty("/LegalOwnerFein", "Error");
            // } else {
            //     this.model.setProperty("/LegalOwnerFein", "None");
            // }

            if (ownerofRecord === "" || ownerofRecord === undefined ) {
                this.model.setProperty("/OwnerOfRecord", "Error");
            } else {
                this.model.setProperty("/OwnerOfRecord", "None");
            }

            if (solarEntity === "" || solarEntity === undefined) {
                this.model.setProperty("/solarEntity", "Error");
            } else {
                this.model.setProperty("/solarEntity", "None");
            }

            if (taxOwner === "" ||  LegalOwner === "" ||  ownerofRecord === "" || ownerofRecord === undefined ||
            taxOwner === undefined  || LegalOwner === undefined || solarEntity === "" || solarEntity === undefined){
                bValidation = true ;
            } else {
                bValidation = false ;
            }

            if (bValidation === false){
            const payload = {
                TaxOwner: taxOwner,
                TaxOwnerFein: taxOwnerFein,
                LegalOwner: LegalOwner,
                LegalOwnerFein: LegalOwnerFein,
                OwnerOfRecord: ownerofRecord,
                SolarEntity: solarEntity, 
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
            MessageToast.show("Please Fill all mandatory fields");
        }
        }
	});
});