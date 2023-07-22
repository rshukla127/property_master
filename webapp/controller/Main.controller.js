sap.ui.define([
    "com/public/storage/pao/utils/reusecontroller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/FilterType",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController, JSONModel, Fragment, Filter, FilterOperator, FilterType) {
        "use strict";
        var _oController;

        return BaseController.extend("com.public.storage.pao.controller.Main", {
            onInit: function () {
                _oController = this;

                const oVisibilityModel = new JSONModel({
                    visibliltyForThirdParty: false,
                    visibliltyForOwner     : false,
                    visibilityForPTypeBlock: true
                })
                this.getView().setModel(oVisibilityModel, "oVisModel");
                const jsonModel = this.getOwnerComponent().getModel("plantModel")
                this.getView().setModel(jsonModel, "plantModel");

                const oModel = sap.ui.getCore().getModel("mainModel");
                oModel.read(`/PropertyMasterSet`,{
                    success: function(oData){
                        console.log("success");
                    },
                    error: function(oData){
                        console.log("error");
                    }
                })

            },

            _onValueHelpPlant: function (oEvent) {
                var sInputValue = oEvent.getSource().getValue(),
                    oView = this.getView();
    
                if (!this._pValueHelpDialog) {
                    this._pValueHelpDialog = Fragment.load({
                        id: oView.getId(),
                        name: "com.public.storage.pao.fragments.Property",
                        controller: this
                    }).then(function (oDialog) {
                        oView.addDependent(oDialog);
                        return oDialog;
                    });
                }
                this._pValueHelpDialog.then(function (oDialog) {
                    // Create a filter for the binding
                    oDialog.getBinding("items").filter([new Filter("Name", FilterOperator.Contains, sInputValue)]);
                    // Open ValueHelpDialog filtered by the input's value
                    oDialog.open(sInputValue);
                });     
            },

		onSelectTP: function(oEvent) {
			this.getView().getModel("oVisModel").setProperty("/visibliltyForOwner", false);
            this.getView().getModel("oVisModel").setProperty("/visibliltyForThirdParty", true);
		},

		onSelectOwner: function(oEvent) {
			this.getView().getModel("oVisModel").setProperty("/visibliltyForOwner", true);
            this.getView().getModel("oVisModel").setProperty("/visibliltyForThirdParty", false);
		},

        onValueHelpDialogClose: function (oEvent) {
			var sDescription,
				oSelectedItem = oEvent.getParameter("selectedItem");
			oEvent.getSource().getBinding("items").filter([]);
			if (!oSelectedItem) {
				return;
			}
			sDescription = oSelectedItem.getDescription();
			this.getView().byId("plantInput").setSelectedKey(sDescription);

		},

        onValueHelpDialogSearchPlant: function (oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("Name", FilterOperator.Contains, sValue);

			oEvent.getSource().getBinding("items").filter([oFilter]);
		}

        });
    });
