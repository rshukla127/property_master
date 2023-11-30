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
    .extend("com.public.storage.pao.controller.OtherDetails", {
        formatter: formatter,
        onInit: function () {
            _oController = this;
            const oRouter = this.getRouter();
            oRouter.getRoute("propOtherDetails").attachMatched(this._onRouteMatched, this);
            //this._oBusyDialog = new BusyDialog();
			this.getView().addDependent(this._oBusyDialog);
            this.model = new JSONModel();
            this.model.setData({
				KeyTrainingProfessional: "None"
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
            this._oBusyDialog = new BusyDialog();
            this.readPropertyData(Plant, LegacyPropertyNumber);
            this.readMarketClass();
            //this.KeyTrainingProfessional();

        },

        onValueHelpDialogSearchMarketClass:function(oEvent){
            let sValue = oEvent.getParameter("value");
			let oFilter = new Filter("Description", FilterOperator.Contains, sValue);
			oEvent.getSource().getBinding("items").filter([oFilter]);

        },


        _onValueHelpKeyTraining: function(oEvent){
            const that =this;
            //var sInputValue = oEvent.getSource().getValue(),
              const oView = this.getView();

            if (!this._pValueHelpDialogTraining) {
                this._pValueHelpDialogTraining = Fragment.load({
                    id: oView.getId(),
                    name: "com.public.storage.pao.fragments.OtherDetails.Training",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            this._oBusyDialog.open()
            this._pValueHelpDialogTraining.then(function (oDialog) {
                //that.readPropertyMasterData();
                that._oBusyDialog.close();
                oDialog.open();
            });

        },

        _onValueHelpMarketClass: function(){
            this.getOwnerComponent.hasChanges = true;
            const that =this;
            //var sInputValue = oEvent.getSource().getValue(),
              const oView = this.getView();

            if (!this._pValueHelpDialogMarket) {
                this._pValueHelpDialogMarket = Fragment.load({
                    id: oView.getId(),
                    name: "com.public.storage.pao.fragments.OtherDetails.Market",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            this._oBusyDialog.open()
            this._pValueHelpDialogMarket.then(function (oDialog) {
                //that.readPropertyMasterData();
                that._oBusyDialog.close();
                // Create a filter for the binding
                //oDialog.getBinding("items").filter([new Filter("Name", FilterOperator.Contains, sInputValue)]);
                // Open ValueHelpDialog filtered by the input's value
                oDialog.open();
            });

        },

        _onValueHelpLfSTatus: function(){
            this.getOwnerComponent.hasChanges = true;
            const that =this;
            //var sInputValue = oEvent.getSource().getValue(),
              const oView = this.getView();

            if (!this._pValueLFSTage) {
                this._pValueLFSTage = Fragment.load({
                    id: oView.getId(),
                    name: "com.public.storage.pao.fragments.OtherDetails.Lifecyclestatus",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            this._oBusyDialog.open()
            this._pValueLFSTage.then(function (oDialog) {
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
            oEvent.getSource().getBinding("items").filter([]);
            if (!oSelectedItem) {
				return;
			}
            let sDescription = oSelectedItem.getDescription();
            let sCode =  oSelectedItem.getTitle();

            if (sTitle === "Market Class"){
                // this.byId("mClass").setValue(sDescription);
                // this._mClass = sCode
                this.getView().getModel("plantBasicDetailsModel").setProperty("/MartketClass", `(${sCode}) ${sDescription}`);
            } else if(sTitle === "Training Proffesionals"){
                // this.byId("keyTrain").setValue(sDescription);
                // this._trainingProff = sCode
                this.getView().getModel("plantBasicDetailsModel").setProperty("/KeyTraniningProfessional", `(${sCode}) ${sDescription}`); 
            } else if (sTitle === "Life Cycle Stage"){
                this.getView().getModel("plantBasicDetailsModel").setProperty("/LifecycleStage", `(${sCode}) ${sDescription}`);
                //this.getView().getModel("plantBasicDetailsModel").setProperty("/YearBuilt", `${sCode}`);
            }
		},


        onPressSaveOtherDetails: function(){
            this._oBusyDialog.open();
            const that = this;
            const sPlant = this.getOwnerComponent().plant
            const LegacyPropertyNumber = this.getOwnerComponent().LegacyPropertyNumber
            let sKeyTraining = this.byId("keyTrain").getSelectedKey();
            let sMarketClass = this.byId("mClass").getValue();
            let sriskScore = this.byId("riskScore").getSelectedItem().getText();
            let sriskRating = this.byId("riskRating").getSelectedItem().getText();
            let sCas = this.byId("cas").getSelectedKey() === "Y" ? true : false;
            let sMajorAquisition = this.byId("majorAquisition").getValue();
            let sLifecycleStage = this.byId("lifecycleStage").getValue();
            //let sLifecycleText = this.byId("lifecycleStage").getSelectedItem().getText();

            let bValidation = true;

            if (sKeyTraining === "" || sKeyTraining === undefined ) {
                this.model.setProperty("/KeyTrainingProfessional", "Error");
                bValidation = true;
            } else {
                this.model.setProperty("/KeyTrainingProfessional", "None");
                bValidation = false;
            }

            if (bValidation === false){
            const payload = {
                MartketClass: sMarketClass,
                KeyTraniningProfessional: sKeyTraining,
                RiskScore: sriskScore,
                RiskRating: sriskRating,
                Cas: sCas,
                MajorAcqisitions: sMajorAquisition,
                LifecycleStage: sLifecycleStage
            }
           const uri= `/PropertyMasterSet(Plant='${sPlant}',LegacyPropertyNumber='${LegacyPropertyNumber}')`
           
            this._oModel.update(uri, payload, {
                success: function (oData) {
                    that._oBusyDialog.close();
                   MessageToast.show("Saved Successfully");
                   that.getOwnerComponent.hasChanges = false;
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