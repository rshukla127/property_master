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
        },

        readMarket: function(){
            const that = this;
            
            that._oModel.read(`/MarketSet`, {
                    success: function (oData) {
                       
                        const oModel = new JSONModel(oData.results);
                        that.getView().setModel(oModel, "marketSetModel")
                        sap.ui.getCore().setModel(oModel, "marketSetModel");
                    },
                    error: function (oData) {
                       
                        MessageToast.show("Something went wrong with Service")
                    }
                });
        },

        KeyTrainingProfessional: function(){
            const that = this;
            
            that._oModel.read(`/KeyTrainingProfessionalSet`, {
                    success: function (oData) {
                       
                        const oModel = new JSONModel(oData.results);
                        that.getView().setModel(oModel, "keyTrainingModel")
                        sap.ui.getCore().setModel(oModel, "keyTrainingModel");
                    },
                    error: function (oData) {
                       
                        MessageToast.show("Something went wrong with Service")
                    }
                });
        },

        readMetroStatArea: function(){
            const that = this;
            
            that._oModel.read(`/MetroStatAreaSet`, {
                    success: function (oData) {
                       
                        const oModel = new JSONModel(oData.results);
                        that.getView().setModel(oModel, "metroStatModel")
                        sap.ui.getCore().setModel(oModel, "metroStatModel");
                    },
                    error: function (oData) {
                       
                        MessageToast.show("Something went wrong with Service")
                    }
                });
        },

        readNeighborhood: function(){
            const that = this;
            
            that._oModel.read(`/NeighborhoodSet`, {
                    success: function (oData) {
                       
                        const oModel = new JSONModel(oData.results);
                        that.getView().setModel(oModel, "NeighborhoodModel")
                        sap.ui.getCore().setModel(oModel, "NeighborhoodModel");
                    },
                    error: function (oData) {
                       
                        MessageToast.show("Something went wrong with Service")
                    }
                });
        },

        readPSConsolidatedPropGroup: function(){
            const that = this;
            
            that._oModel.read(`/PSConsolidatedPropGroupSet`, {
                    success: function (oData) {
                       
                        const oModel = new JSONModel(oData.results);
                        that.getView().setModel(oModel, "psConsildatePropGroupModel")
                        sap.ui.getCore().setModel(oModel, "psConsildatePropGroupModel");
                    },
                    error: function (oData) {
                       
                        MessageToast.show("Something went wrong with Service")
                    }
                });
        },

        readFacMgr: function(){
            const that = this;
            
            that._oModel.read(`/readFacMgrSet`, {
                    success: function (oData) {
                       
                        const oModel = new JSONModel(oData.results);
                        that.getView().setModel(oModel, "FacilitiesMgrModel")
                        sap.ui.getCore().setModel(oModel, "FacilitiesMgrModel");
                    },
                    error: function (oData) {
                       
                        MessageToast.show("Something went wrong with Service")
                    }
                });
        },

        readRegion: function(){
            const that = this;
            
            that._oModel.read(`/RegionSet`, {
                    success: function (oData) {
                       
                        const oModel = new JSONModel(oData.results);
                        that.getView().setModel(oModel, "RegionSetModel")
                        sap.ui.getCore().setModel(oModel, "RegionSetModel");
                    },
                    error: function (oData) {
                       
                        MessageToast.show("Something went wrong with Service")
                    }
                });
        },

        readSeniorDistrict: function(){
            const that = this;
            
            that._oModel.read(`/SrDistrictSet`, {
                    success: function (oData) {
                       
                        const oModel = new JSONModel(oData.results);
                        that.getView().setModel(oModel, "SrDistrictSetModel")
                        sap.ui.getCore().setModel(oModel, "SrDistrictSetModel");
                    },
                    error: function (oData) {
                       
                        MessageToast.show("Something went wrong with Service")
                    }
                });
        }
	});
});