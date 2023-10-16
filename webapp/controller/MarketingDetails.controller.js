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
    .extend("com.public.storage.pao.controller.MarketingDetails", {
        formatter: formatter,
        onInit: function () {
            _oController = this;
            const oRouter = this.getRouter();
            oRouter.getRoute("marketingDetails").attachMatched(this._onRouteMatched, this);
            this._oBusyDialog = new BusyDialog();
			this.getView().addDependent(this._oBusyDialog);
            this.model = new JSONModel();
            this.model.setData({
				MarketKey: "None",
                MetroStatisicalArea: "None",
                Neighborwood: "None",
                PsConsolidatedPropertygroup: "None"
			});
            this.getView().setModel(this.model);

        },

        _onRouteMatched: function(oEvent){
            const Plant = this.getOwnerComponent().plant;
            const LegacyPropertyNumber= this.getOwnerComponent().LegacyPropertyNumber
            this._oModel = sap.ui.getCore().getModel("mainModel");
            this.readPropertyData(Plant, LegacyPropertyNumber);
            this.readMarket();
            this.readMetroStatArea();
            this.readNeighborhood();
            this.readPSConsolidatedPropGroup();

        },

        _onValueHelpMarketKey: function(oEvent){
            const that =this;
            //var sInputValue = oEvent.getSource().getValue(),
              const oView = this.getView();

            if (!this._pValueHelpMarketKey) {
                this._pValueHelpMarketKey = Fragment.load({
                    id: oView.getId(),
                    name: "com.public.storage.pao.fragments.MarketingDetails.MarketKey",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            this._oBusyDialog.open()
            this._pValueHelpMarketKey.then(function (oDialog) {
                //that.readPropertyMasterData();
                that._oBusyDialog.close();
                oDialog.open();
            });

        },

        _onValueHelpMetroStats: function(){
            const that =this;
            //var sInputValue = oEvent.getSource().getValue(),
              const oView = this.getView();

            if (!this._pValueHelpMetroStats) {
                this._pValueHelpMetroStats = Fragment.load({
                    id: oView.getId(),
                    name: "com.public.storage.pao.fragments.MarketingDetails.MetroStats",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            this._oBusyDialog.open()
            this._pValueHelpMetroStats.then(function (oDialog) {
                //that.readPropertyMasterData();
                that._oBusyDialog.close();
                // Create a filter for the binding
                //oDialog.getBinding("items").filter([new Filter("Name", FilterOperator.Contains, sInputValue)]);
                // Open ValueHelpDialog filtered by the input's value
                oDialog.open();
            });

        },

        _onValueHelpNeigbour: function(oEvent){
            const that =this;
            //var sInputValue = oEvent.getSource().getValue(),
              const oView = this.getView();

            if (!this._pValueHelpNeigbour) {
                this._pValueHelpNeigbour = Fragment.load({
                    id: oView.getId(),
                    name: "com.public.storage.pao.fragments.MarketingDetails.Neighbour",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            this._oBusyDialog.open()
            this._pValueHelpNeigbour.then(function (oDialog) {
                //that.readPropertyMasterData();
                that._oBusyDialog.close();
                // Create a filter for the binding
                //oDialog.getBinding("items").filter([new Filter("Name", FilterOperator.Contains, sInputValue)]);
                // Open ValueHelpDialog filtered by the input's value
                oDialog.open();
            });

        },

        _onValueHelpConslidated: function(){
            const that =this;
            //var sInputValue = oEvent.getSource().getValue(),
              const oView = this.getView();

            if (!this._pValueHelpConslidated) {
                this._pValueHelpConslidated = Fragment.load({
                    id: oView.getId(),
                    name: "com.public.storage.pao.fragments.MarketingDetails.ConsolidatedGroup",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            this._oBusyDialog.open()
            this._pValueHelpConslidated.then(function (oDialog) {
                //that.readPropertyMasterData();
                that._oBusyDialog.close();
                // Create a filter for the binding
                //oDialog.getBinding("items").filter([new Filter("Name", FilterOperator.Contains, sInputValue)]);
                // Open ValueHelpDialog filtered by the input's value
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

            if (sTitle === "Market Key"){
                this.getView().getModel("plantBasicDetailsModel").setProperty("/MarketKey", `(${sCode}) ${sDescription}`);
                // this.byId("markKey").setValue(sDescription);
                // this.marketKey = sCode
            } else if(sTitle === "Metro Statistical Area"){
                this.getView().getModel("plantBasicDetailsModel").setProperty("/MetroStatisicalArea", `(${sCode}) ${sDescription}`);
                // this.byId("metroStats").setValue(sDescription);
                // this._MetroStats = sCode
            } else if(sTitle === "Neighbourhood"){
                this.getView().getModel("plantBasicDetailsModel").setProperty("/Neighborwood", `(${sCode}) ${sDescription}`);
                // this.byId("neighbourwood").setValue(sDescription);
                // this._neighbour = sCode
            } else if(sTitle === "Consolidated Property Group"){
                this.getView().getModel("plantBasicDetailsModel").setProperty("/PsConsolidatedPropertygroup", `(${sCode}) ${sDescription}`);
                // this.byId("psCons").setValue(sDescription);
                // this._consolidatedPGroup = sCode
            }
            
		},

        onPressSaveMarketingDetails: function(){
            const that = this;
            const sPlant = this.getOwnerComponent().plant
            const LegacyPropertyNumber = this.getOwnerComponent().LegacyPropertyNumber;
            let sMarketKey = this.byId("markKey").getValue();
            let sMetroStatus = this.byId("metroStats").getValue();
            let sNeighbourhood = this.byId("neighbourwood").getValue();
            let rankProp = this.byId("rankProp").getSelectedKey();
        

            let bValidation = true;

            if (sMarketKey === "" || sMarketKey === undefined ) {
                this.model.setProperty("/MarketKey", "Error");
            } else {
                this.model.setProperty("/MarketKey", "None");
            }

            if (sMetroStatus === "" || sMetroStatus === undefined ) {
                this.model.setProperty("/MetroStatisicalArea", "Error");
            } else {
                this.model.setProperty("/MetroStatisicalArea", "None");
            }

            if (sNeighbourhood === "" || sNeighbourhood === undefined ) {
                this.model.setProperty("/Neighborwood", "Error");
            } else {
                this.model.setProperty("/Neighborwood", "None");
            }

            if (sConslidatedGroup === "" || sConslidatedGroup === undefined ) {
                this.model.setProperty("/PsConsolidatedPropertygroup", "Error");
            } else {
                this.model.setProperty("/PsConsolidatedPropertygroup", "None");
            }

            if (sMarketKey === "" || sMetroStatus === "" || sNeighbourhood === "" || sConslidatedGroup === "" ||
            sMarketKey === undefined || sMetroStatus === undefined || sNeighbourhood === undefined || sConslidatedGroup === undefined){
                bValidation = true ;
            } else {
                bValidation = false ;
            }

            if (bValidation === false){
            const payload = {
                MarketKey: sMarketKey,
                MetroStatisicalArea: sMetroStatus,
                Neighborwood: sNeighbourhood,
                PsConsolidatedPropertygroup: sConslidatedGroup,
                Rank: rankProp
            }
           const uri= `/PropertyMasterSet(Plant='${sPlant}',LegacyPropertyNumber='${LegacyPropertyNumber}')`
           this._oBusyDialog.open();
            this._oModel.update(uri, payload, {
                success: function (oData) {
                    that._oBusyDialog.close();
                   MessageToast.show("Saved Successfully");
                },
                error: function (error) {
                    that._oBusyDialog.close();
                    MessageToast.show("Something went wrong with Service")
                }
            })
        } else {
            MessageToast.show("Please Fill all mandatory fields");
        }
        }
	});
});