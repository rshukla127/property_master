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
                TaxFilingEntity: "None",
			});
            this.getView().setModel(this.model);

        },

        _onRouteMatched: function(oEvent){
            const Plant = this.getOwnerComponent().plant;
            const LegacyPropertyNumber= this.getOwnerComponent().LegacyPropertyNumber
            this._oModel = sap.ui.getCore().getModel("mainModel");
            this.readPropertyData(Plant, LegacyPropertyNumber);
            this.readTaxOwner();
            this.readTaxOwnerFein();
            this.readLegalOwner();
            this.readLegalOwnerFein();
            this.readOwnerOfRecord();
            this.readTaxFillingEntity();
        },

        _onValueHelpTaxOwner: function(oEvent){
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

        onValueHelpDialogClose: function (oEvent) {
			let	oSelectedItem = oEvent.getParameter("selectedItem");
            let sTitle = oEvent.getSource().getTitle();
            if (!oSelectedItem) {
				return;
			}
            let sDescription = oSelectedItem.getDescription();
            let sCode =  oSelectedItem.getTitle();

            if (sTitle === "Tax Owner"){
                this.byId("taxOwner").setValue(sDescription);
                this.taxOwner = sCode
            } else if(sTitle === "Tax Owner FEIN"){
                this.byId("taxOwnerFein").setValue(sDescription);
                this.taxOwnerFein = sCode
            } else if(sTitle === "Legal Owner"){
                this.byId("legalOwner").setValue(sDescription);
                this.legalOwner = sCode
            } else if(sTitle === "Legal Owner FEIN"){
                this.byId("legalOwnerFein").setValue(sDescription);
                this.legalOwnerFein = sCode
            } else if(sTitle === "Owner of Record"){
                this.byId("ownerRecord").setValue(sDescription);
                this.ownerRecord = sCode
            } else if(sTitle === "Tax Filling Entity"){
                this.byId("taxFiling").setValue(sDescription);
                this.taxFiling = sCode
            }
		},

        onPressSaveTaxDetails: function(){
            const sPlant = this.getOwnerComponent().plant
            const LegacyPropertyNumber = this.getOwnerComponent().LegacyPropertyNumber;

            let bValidation = true;

            if (this.taxOwner === "" || this.taxOwner === undefined ) {
                this.model.setProperty("/TaxOwner", "Error");
            } else {
                this.model.setProperty("/TaxOwner", "None");
            }

            if (this.taxOwnerFein === "" || this.taxOwnerFein === undefined ) {
                this.model.setProperty("/TaxOwnerFein", "Error");
            } else {
                this.model.setProperty("/TaxOwnerFein", "None");
            }

            if (this.legalOwner === "" || this.legalOwner === undefined ) {
                this.model.setProperty("/LegalOwner", "Error");
            } else {
                this.model.setProperty("/LegalOwner", "None");
            }

            if (this.legalOwnerFein === "" || this.legalOwnerFein === undefined ) {
                this.model.setProperty("/LegalOwnerFein", "Error");
            } else {
                this.model.setProperty("/LegalOwnerFein", "None");
            }

            if (this.ownerRecord === "" || this.ownerRecord === undefined ) {
                this.model.setProperty("/OwnerOfRecord", "Error");
            } else {
                this.model.setProperty("/OwnerOfRecord", "None");
            }

            if (this.taxFiling === "" || this.taxFiling === undefined) {
                this.model.setProperty("/TaxFilingEntity", "Error");
            } else {
                this.model.setProperty("/TaxFilingEntity", "None");
            }

            if (this.taxOwner === "" || this.taxOwnerFein === "" || this.legalOwner === "" || this.legalOwnerFein === "" || this.ownerRecord === "" || this.ownerRecord === undefined ||
            this.taxOwner === undefined || this.taxOwnerFein === undefined || this.legalOwner === undefined || this.legalOwnerFein === undefined || this.taxFiling === "" || this.taxFiling === undefined){
                bValidation = true ;
            } else {
                bValidation = false ;
            }

            if (bValidation === false){
            const payload = {
                TaxOwner: this.taxOwner,
                TaxOwnerFein: this.legalOwner,
                LegalOwner: this.legalOwner,
                LegalOwnerFein: this.legalOwnerFein,
                OwnerOfRecord: this.ownerRecord,
                TaxFilingEntity: this.taxFiling, 
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
            MessageToast.show("Please Fill all mandatory fields");
        }
        }
	});
});