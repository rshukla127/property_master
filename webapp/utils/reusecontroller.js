sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
	"sap/ui/core/Fragment",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
], function(
    Controller,
    UIComponent,
	Fragment,
	MessageToast,
	JSONModel
) {
	"use strict";

	return Controller.extend("com.public.storage.pao.utils.reusecontroller", {

        /**
		 * Get the Component
		 *
		 * @public
		 * @returns {object} The Component
		 */
		getComponent: function () {
			return this.getOwnerComponent();
		},

		getRouter: function () {
			return UIComponent.getRouterFor(this);
		},

		readPropertyData: function(Plant, LegacyPropertyNumber){
            const that = this;
            const uri= `/PropertyMasterSet(Plant='${Plant}',LegacyPropertyNumber='${LegacyPropertyNumber}')`
            //this.BusyDialog.open()
            this._oModel.read(uri, {
                // urlParameters: {
                //     "$filter": this._Plant
                // },
                success: function (oData) {
                    //that.BusyDialog.close();
                    const oModel = new JSONModel(oData);
                    that.getView().setModel(oModel, "plantBasicDetailsModel")
                    sap.ui.getCore().setModel(oModel, "plantBasicDetailsModel");
                    that.getView().getModel("plantBasicDetailsModel").refresh();
                },
                error: function (oData) {
                    MessageToast.show("Something went wrong with Service")
                }
            })

        },

        readBUType:function(){
            const that = this;
            this._oBusyDialog.open()
            that._oModel.read(`/ButypeSet`, {
                    success: function (oData) {
                        that._oBusyDialog.close();
                        const oModel = new JSONModel(oData.results);
                        that.getView().setModel(oModel, "bTypeModel")
                        sap.ui.getCore().setModel(oModel, "bTypeModel");
                    },
                    error: function (oData) {
                        that._oBusyDialog.close();
                        MessageToast.show("Something went wrong with Service")
                    }
                });

        },

        readCustomerCode:function(){
            const that = this;
            this._oBusyDialog.open()
            that._oModel.read(`/CustCodesSet`, {
                    success: function (oData) {
                        that._oBusyDialog.close();
                        const oModel = new JSONModel(oData.results);
                        that.getView().setModel(oModel, "custCodeModel")
                        sap.ui.getCore().setModel(oModel, "custCodeModel");
                    },
                    error: function (oData) {
                        that._oBusyDialog.close();
                        MessageToast.show("Something went wrong with Service")
                    }
                });

        },

        readEntityType:function(){
            const that = this;
            this._oBusyDialog.open()
            that._oModel.read(`/EntityTypesSet`, {
                    success: function (oData) {
                        that._oBusyDialog.close();
                        const oModel = new JSONModel(oData.results);
                        that.getView().setModel(oModel, "entityTypeModel")
                        sap.ui.getCore().setModel(oModel, "entityTypeModel");
                    },
                    error: function (oData) {
                        that._oBusyDialog.close();
                        MessageToast.show("Something went wrong with Service")
                    }
                });

        },

        readATypeProp:function(){
            const that = this;
            this._oBusyDialog.open()
            that._oModel.read(`/ATypePropertiesSet`, {
                    success: function (oData) {
                        that._oBusyDialog.close();
                        const oModel = new JSONModel(oData.results);
                        that.getView().setModel(oModel, "aTypePropModel")
                        sap.ui.getCore().setModel(oModel, "aTypePropModel");
                    },
                    error: function (oData) {
                        that._oBusyDialog.close();
                        MessageToast.show("Something went wrong with Service")
                    }
                });

        },

        readAvailable3rdpDistribution: function(){
            const that = this;
            this._oBusyDialog.open()
            that._oModel.read(`/Available3rdpDistributionSet`, {
                    success: function (oData) {
                        that._oBusyDialog.close();
                        const oModel = new JSONModel(oData.results);
                        that.getView().setModel(oModel, "availableDistModel")
                        sap.ui.getCore().setModel(oModel, "availableDistModel");
                    },
                    error: function (oData) {
                        that._oBusyDialog.close();
                        MessageToast.show("Something went wrong with Service")
                    }
                });
        },

        readRetailPC: function(){
            const that = this;
            that._oModel.read(`/RetailProfitCenterSet`, {
                    success: function (oData) {
                        
                        const oModel = new JSONModel(oData.results);
                        that.getView().setModel(oModel, "retailpcModel")
                        sap.ui.getCore().setModel(oModel, "retailpcModel");
                    },
                    error: function (oData) {
                        
                        MessageToast.show("Something went wrong with Service")
                    }
                });
        },

        readStoragePC: function(){
            const that = this;
           
            that._oModel.read(`/StorageProfitCenterSet`, {
                    success: function (oData) {
                       
                        const oModel = new JSONModel(oData.results);
                        that.getView().setModel(oModel, "storageModel")
                        sap.ui.getCore().setModel(oModel, "storageModel");
                    },
                    error: function (oData) {
                    
                        MessageToast.show("Something went wrong with Service")
                    }
                });
        },

        readTennentPC: function(){
            const that = this;
           
            that._oModel.read(`/StorageProfitCenterSet`, {
                    success: function (oData) {
                       
                        const oModel = new JSONModel(oData.results);
                        that.getView().setModel(oModel, "tennentModel")
                        sap.ui.getCore().setModel(oModel, "tennentModel");
                    },
                    error: function (oData) {
                        
                        MessageToast.show("Something went wrong with Service")
                    }
                });
        },

        readManagementPC: function(){
            const that = this;
           
            that._oModel.read(`/ManagementProfitCenterSet`, {
                    success: function (oData) {
                       
                        const oModel = new JSONModel(oData.results);
                        that.getView().setModel(oModel, "mgmtModel")
                        sap.ui.getCore().setModel(oModel, "mgmtModel");
                    },
                    error: function (oData) {
                      
                        MessageToast.show("Something went wrong with Service")
                    }
                });
        },

        readCommPC: function(){
            const that = this;
            
            that._oModel.read(`/CommercialProfitCenterSet`, {
                    success: function (oData) {
                       
                        const oModel = new JSONModel(oData.results);
                        that.getView().setModel(oModel, "commPcModel")
                        sap.ui.getCore().setModel(oModel, "commPcModel");
                    },
                    error: function (oData) {
                       
                        MessageToast.show("Something went wrong with Service")
                    }
                });
        }
	});
});