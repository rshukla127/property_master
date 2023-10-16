sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
	"sap/ui/core/Fragment",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/FilterType",
], function(
    Controller,
    UIComponent,
	Fragment,
	MessageToast,
	JSONModel,
    Filter,
    FilterOperator,
    FilterType

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
            // this._oBusyDialog.open()
            this._oModel.read(uri, {
                success: function (oData) {
                    // that._oBusyDialog.close();
                    const oModel = new JSONModel(oData);
                    that.getView().setModel(oModel, "plantBasicDetailsModel")
                    sap.ui.getCore().setModel(oModel, "plantBasicDetailsModel");
                    that.getView().getModel("plantBasicDetailsModel").refresh();
                },
                error: function (oData) {
                    // that._oBusyDialog.close();
                    MessageToast.show("Something went wrong with Service")
                }
            })

        },

        // readPropertyMasterData: function(Plant, LegacyPropertyNumber){
        //     const that = this;
        //     // var FilterPlant = new sap.ui.model.Filter('Werks', 'EQ', Plant);
        //     // var FilterProperty = new sap.ui.model.Filter('Name2', 'EQ', LegacyPropertyNumber);
        //     const uri= `/PlantMasterSet(Werks='${Plant}')`
        //     this._oBusyDialog.open()
        //     this._oModel.read(uri, {
        //         success: function (oData) {
        //             that._oBusyDialog.close();
        //             const oModel = new JSONModel(oData);
        //             that.getView().setModel(oModel, "basicDetailPlantModel")
        //             sap.ui.getCore().setModel(oModel, "basicDetailPlantModel");
        //             that.getView().getModel("basicDetailPlantModel").refresh();
        //         },
        //         error: function (oData) {
        //             that._oBusyDialog.close();
        //             MessageToast.show("Something went wrong with Service")
        //         }
        //     })

        // },

        readBUType:function(){
            const that = this;
            var keyFilter = new sap.ui.model.Filter('keyfield', 'EQ', 'BUTYPE');
            this._oBusyDialog.open()
            that._oModel.read(`/ButypeSet?$filter = keyfield eq ${keyFilter}`, {
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
            var keyFilter = new sap.ui.model.Filter('keyfield', 'EQ', 'CUSTCODES');
            this._oBusyDialog.open()
            that._oModel.read(`/CustCodesSet?$filter = keyfield eq ${keyFilter}`, {
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
            var keyFilter = new sap.ui.model.Filter('keyfield', 'EQ', 'ENTITYTYPES');
            this._oBusyDialog.open();
            that._oModel.read(`/EntityTypesSet?$filter = keyfield eq ${keyFilter}`, {
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
            var keyFilter = new sap.ui.model.Filter('keyfield', 'EQ', 'ATYPEPROPERTIES');
            this._oBusyDialog.open();
            that._oModel.read(`/ATypePropertiesSet?$filter = keyfield eq ${keyFilter}`, {
                //filters: [keyFilter],
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

        readMarket: function(){
            const that = this;
            var keyFilter = new sap.ui.model.Filter('keyfield', 'EQ', 'AVAILABLECLASSIFICATION');
            that._oModel.read(`/MarketSet?$filter = keyfield eq ${keyFilter}`, {
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

        // KeyTrainingProfessional: function(){
        //     const that = this;
            
        //     that._oModel.read(`/KeyTrainingProfessionalSet`, {
        //             success: function (oData) {
                       
        //                 const oModel = new JSONModel(oData.results);
        //                 that.getView().setModel(oModel, "keyTrainingModel")
        //                 sap.ui.getCore().setModel(oModel, "keyTrainingModel");
        //             },
        //             error: function (oData) {
                       
        //                 MessageToast.show("Something went wrong with Service")
        //             }
        //         });
        // },

        readMetroStatArea: function(){
            const that = this;
            var keyFilter = new sap.ui.model.Filter('keyfield', 'EQ', 'METROSTATAREA');
            that._oModel.read(`/MetroStatAreaSet?$filter = keyfield eq ${keyFilter}`, {
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
            var keyFilter = new sap.ui.model.Filter('keyfield', 'EQ', 'NEIGHBORHOOD');
            that._oModel.read(`/NeighborhoodSet?$filter = keyfield eq ${keyFilter}`, {
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
            var keyFilter = new sap.ui.model.Filter('keyfield', 'EQ', 'PSCONSOLIDATEDPROPGROUP');
            that._oModel.read(`/PSConsolidatedPropGroupSet?$filter = keyfield eq ${keyFilter}`, {
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
        },

        // Tax detail tab started
        readTaxOwner: function(){
            const that = this;
            
            that._oModel.read(`/TaxOwnerSet`, {
                    success: function (oData) {
                       
                        const oModel = new JSONModel(oData.results);
                        that.getView().setModel(oModel, "taxOwnerModel")
                        sap.ui.getCore().setModel(oModel, "taxOwnerModel");
                    },
                    error: function (oData) {
                       
                        MessageToast.show("Something went wrong with Service")
                    }
                });
        },

        readTaxOwnerFein: function(){
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
        },

        readLegalOwner: function(){
            const that = this;
            
            that._oModel.read(`/LegalOwnerSet`, {
                    success: function (oData) {
                       
                        const oModel = new JSONModel(oData.results);
                        that.getView().setModel(oModel, "LegalOwnerModel")
                        sap.ui.getCore().setModel(oModel, "LegalOwnerModel");
                    },
                    error: function (oData) {
                       
                        MessageToast.show("Something went wrong with Service")
                    }
                });
        },

        readLegalOwnerFein: function(){
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
        },

        readOwnerOfRecord: function(){
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
        },

        readTaxFillingEntity: function(){
            const that = this;
            
            that._oModel.read(`/TaxFilingEntitySet`, {
                    success: function (oData) {
                       
                        const oModel = new JSONModel(oData.results);
                        that.getView().setModel(oModel, "taxFilingModel")
                        sap.ui.getCore().setModel(oModel, "taxFilingModel");
                    },
                    error: function (oData) {
                       
                        MessageToast.show("Something went wrong with Service")
                    }
                });
        }

        // Tax detail tab finished
	});
});