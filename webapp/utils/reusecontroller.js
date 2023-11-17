sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
	"sap/ui/core/Fragment",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/FilterType",
    "sap/m/MessageBox"
], function(
    Controller,
    UIComponent,
	Fragment,
	MessageToast,
	JSONModel,
    Filter,
    FilterOperator,
    FilterType,
    MessageBox

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
            const oRouter = this.getRouter();
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
                error: function (error) {
                    // that._oBusyDialog.close();
                    const parseError = JSON.parse(error.responseText).error.message.value;
                    if (parseError.includes("Resource not found for segment")){
                        MessageBox.error("Please Save Plant and Property details to procced further.",
                    {
                        title: "Error",
                        actions: [MessageBox.Action.OK],
                        onClose: function (oAction) {
                            oRouter.navTo("home");
                        }
                    }
                    );
                    
                } else {
                    MessageToast.show("Something went wrong with the service");
                }
            }
            })

        },

        readBuldingDetails: function(Plant, LegacyPropertyNumber){
            const oTable = this.byId("idAttributestTab");
            const that = this;
            let plant = new sap.ui.model.Filter('Plant', 'EQ', Plant);
            let property = new sap.ui.model.Filter('Property', 'EQ', LegacyPropertyNumber);
            let keyId = new sap.ui.model.Filter('KeyId', 'EQ', 'BUILDING');
            //const uri= `/PropertyAddOnSet?$filter=Plant eq '${Plant}' and Property eq '${LegacyPropertyNumber}' and KeyId eq 'BUILDING'`
            // this._oBusyDialog.open()
            this._oModel.read(`/PropertyAddOnSet`, {
                filters: [plant, property, keyId],
                success: function (oData) {
                    // that._oBusyDialog.close();
                    const oModel = new JSONModel(oData.results);
                    that.getView().setModel(oModel, "buildingModel")
                    sap.ui.getCore().setModel(oModel, "buildingModel");
                    that.getView().getModel("buildingModel").refresh();
                    oTable.bindAggregation("items", {
                        path: "buildingModel>/", // Replace with the actual path to your data
                        template: new sap.m.ColumnListItem({
                          cells: [
                            new sap.m.Input({ value: "{buildingModel>Code}" }),
                            new sap.m.Input({ value: "{buildingModel>Value1}" }),
                            new sap.m.Input({ value: "{buildingModel>Value2}" }),
                            new sap.m.Input({ value: "{buildingModel>Description1}" }),
                            new sap.m.Input({ value: "{buildingModel>Description2}" }),
                            new sap.m.Button({
                                icon: "sap-icon://delete",
                                type: "Reject",
                                press: that.removeBuilding.bind(that)
                            })
                            // Add similar lines for other properties
                          ],
                        }),
                      });
                    if(oData.results.length){
                        that.getView().byId("illusSection").setVisible(false);
                        
                    } 
                    else {
                        that.getView().byId("illusSection").setVisible(true);
                    }
                },
                error: function (oData) {
                    // that._oBusyDialog.close();
                    MessageToast.show("Something went wrong with Service")
                }
            })

        },

        MiscBuildingDetails: function(Plant, LegacyPropertyNumber){
            const oTable = this.byId("isMiscTab");
            const that = this;
            let plant = new sap.ui.model.Filter('Plant', 'EQ', Plant);
            let property = new sap.ui.model.Filter('Property', 'EQ', LegacyPropertyNumber);
            let keyId = new sap.ui.model.Filter('KeyId', 'EQ', 'MISC');
            this._oModel.read(`/PropertyAddOnSet`, {
                filters: [plant, property, keyId],
                success: function (oData) {
                    // that._oBusyDialog.close();
                    const oModel = new JSONModel(oData.results);
                    that.getView().setModel(oModel, "miscModel")
                    sap.ui.getCore().setModel(oModel, "miscModel");
                    that.getView().getModel("miscModel").refresh();
                    oTable.bindAggregation("items", {
                        path: "miscModel>/", // Replace with the actual path to your data
                        template: new sap.m.ColumnListItem({
                          cells: [
                            new sap.m.Input({ value: "{miscModel>Code}" }),
                            new sap.m.Input({ value: "{miscModel>Value1}" }),
                            new sap.m.Input({ value: "{miscModel>Value2}" }),
                            new sap.m.Input({ value: "{miscModel>Description1}" }),
                            new sap.m.Input({ value: "{miscModel>Description2}" }),
                            new sap.m.Button({
                                icon: "sap-icon://delete",
                                type: "Reject",
                                press: that.removeMiscBuilding.bind(that)
                            })
                            // Add similar lines for other properties
                          ],
                        }),
                      });
                    if(oData.results.length){
                        that.getView().byId("illusSectionMisc").setVisible(false);
                    } else {
                        that.getView().byId("illusSectionMisc").setVisible(true);
                    }
                   
                },
                error: function (oData) {
                    // that._oBusyDialog.close();
                    MessageToast.show("Something went wrong with Service")
                }
            })

        },

        removeBuilding: function(oEvent){
            this._oModel = sap.ui.getCore().getModel("mainModel");
            const that = this;
            const oData = oEvent.getSource().getBindingContext("buildingModel").getObject();
            const uri= `/PropertyAddOnSet(Plant='${oData.Plant}',Property='${oData.Property}',KeyId='${oData.KeyId}',Code='${oData.Code}')`
            this._oModel.remove(uri, {
                method: "DELETE",
                success: function(data) {
                 MessageToast.show("Deleted Successfully");
                 sap.ui.getCore().getModel("buildingModel").refresh();
                 that.readBuldingDetails(oData.Plant, oData.Property)
                 //that.byId("idAttributestTab").getBindings("items").refresh();
                },
                error: function(e) {
                MessageToast.show("Something went wrong with the Service");
                }
               });
        },

        removeMiscBuilding: function(oEvent){
            const that = this;
            this._oModel = sap.ui.getCore().getModel("mainModel");
            const oData = oEvent.getSource().getBindingContext("miscModel").getObject();
            const uri= `/PropertyAddOnSet(Plant='${oData.Plant}',Property='${oData.Property}',KeyId='${oData.KeyId}',Code='${oData.Code}')`
            this._oModel.remove(uri, {
                method: "DELETE",
                success: function(data) {
                 MessageToast.show("Deleted Successfully");
                 sap.ui.getCore().getModel("miscModel").refresh();
                 that.MiscBuildingDetails(oData.Plant, oData.Property)
                 //that.byId("isMiscTab").getBindings("items").refresh();
                },
                error: function(e) {
                MessageToast.show("Something went wrong with the Service");
                }
               });
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
            var keyFilter = new sap.ui.model.Filter('Keyfield', 'EQ', 'BUTYPE');
            this._oBusyDialog.open()
            that._oModel.read(`/HelpDataSet`, {
                filters: [keyFilter],
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

        readOrgStructure:function(){
            const that = this;
            var keyFilter = new sap.ui.model.Filter('Keyfield', 'EQ', 'ORGSTRUCT');
            this._oBusyDialog.open()
            that._oModel.read(`/HelpDataSet`, {
                filters: [keyFilter],
                    success: function (oData) {
                        that._oBusyDialog.close();
                        const oModel = new JSONModel(oData.results);
                        that.getView().setModel(oModel, "orgStructureModel")
                        sap.ui.getCore().setModel(oModel, "orgStructureModel");
                    },
                    error: function (oData) {
                        that._oBusyDialog.close();
                        MessageToast.show("Something went wrong with Service")
                    }
                });

        },

        readHierarachy:function(){
            const that = this;
            var keyFilter = new sap.ui.model.Filter('Keyfield', 'EQ', 'HIERCODE');
            this._oBusyDialog.open()
            that._oModel.read(`/HelpDataSet`, {
                filters: [keyFilter],
                    success: function (oData) {
                        that._oBusyDialog.close();
                        const oModel = new JSONModel(oData.results);
                        that.getView().setModel(oModel, "hierModel")
                        sap.ui.getCore().setModel(oModel, "hierModel");
                    },
                    error: function (oData) {
                        that._oBusyDialog.close();
                        MessageToast.show("Something went wrong with Service")
                    }
                });

        },

        readFeeType:function(){
            const that = this;
            var keyFilter = new sap.ui.model.Filter('Keyfield', 'EQ', 'FEEDETAIL');
            this._oBusyDialog.open()
            that._oModel.read(`/HelpDataSet`, {
                filters: [keyFilter],
                    success: function (oData) {
                        if (oData.results){
                        that._oBusyDialog.close();
                        const oModel = new JSONModel(oData.results);
                        that.getView().setModel(oModel, "feeTypeModel")
                        sap.ui.getCore().setModel(oModel, "feeTypeModel");
                        that.getView().getModel("plantBasicDetailsModel").setProperty("/FeesType1", `(${oData.results[0].Code}) ${oData.results[0].Description}`);
                        that.getView().getModel("plantBasicDetailsModel").setProperty("/FeesType2", `(${oData.results[1].Code}) ${oData.results[1].Description}`);
                        that.getView().getModel("plantBasicDetailsModel").setProperty("/FeesType3", `(${oData.results[2].Code}) ${oData.results[2].Description}`);
                        that.getView().getModel("plantBasicDetailsModel").setProperty("/FeesType4", `(${oData.results[3].Code}) ${oData.results[3].Description}`);
                        that.getView().getModel("plantBasicDetailsModel").setProperty("/FeesType5", `(${oData.results[4].Code}) ${oData.results[4].Description}`);
                        }
                    },
                    error: function (oData) {
                        that._oBusyDialog.close();
                        MessageToast.show("Something went wrong with Service")
                    }
                });

        },


        readTaxOwner: function(){
            const that = this;
            var keyFilter = new sap.ui.model.Filter('Action', 'EQ', 'TA');
            this._oBusyDialog.open()
            that._oModel.read(`/CompanyDetailSet`, {
                filters: [keyFilter],
                    success: function (oData) {
                        if (oData.results){
                        that._oBusyDialog.close();
                        const oModel = new JSONModel(oData.results);
                        that.getView().setModel(oModel, "feeTypeModel")
                        sap.ui.getCore().setModel(oModel, "feeTypeModel");
                        }
                    },
                    error: function (oData) {
                        that._oBusyDialog.close();
                        MessageToast.show("Something went wrong with Service")
                    }
                });

        },

        readLegalOwner: function(){
            const that = this;
            var keyFilter = new sap.ui.model.Filter('Action', 'EQ', 'LE');
            this._oBusyDialog.open();
            that._oModel.read(`/CompanyDetailSet`, {
                filters: [keyFilter],
                    success: function (oData) {
                        if (oData.results){
                        that._oBusyDialog.close();
                        const oModel = new JSONModel(oData.results);
                        that.getView().setModel(oModel, "feeTypeModel")
                        sap.ui.getCore().setModel(oModel, "feeTypeModel");
                        }
                    },
                    error: function (oData) {
                        that._oBusyDialog.close();
                        MessageToast.show("Something went wrong with Service")
                    }
                });

        },



        readAquiredDeveloperTP:function(){
            const that = this;
            var keyFilter = new sap.ui.model.Filter('Keyfield', 'EQ', 'ACQUIREDDEVELOPEDTHIRDPARTY');
            this._oBusyDialog.open();
            that._oModel.read(`/HelpDataSet`, {
                filters: [keyFilter],
                    success: function (oData) {
                        that._oBusyDialog.close();
                        const oModel = new JSONModel(oData.results);
                        that.getView().setModel(oModel, "aquiredTpModel")
                        sap.ui.getCore().setModel(oModel, "aquiredTpModel");
                    },
                    error: function (oData) {
                        that._oBusyDialog.close();
                        MessageToast.show("Something went wrong with Service")
                    }
                });

        },

        readCustomerCode:function(){
            const that = this;
            var keyFilter = new sap.ui.model.Filter('Keyfield', 'EQ', 'CUSTCODES');
            this._oBusyDialog.open();
            that._oModel.read(`/HelpDataSet`, {
                filters: [keyFilter],
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
            var keyFilter = new sap.ui.model.Filter('Keyfield', 'EQ', 'ENTITYTYPES');
            this._oBusyDialog.open();
            that._oModel.read(`/HelpDataSet`, {
                filters: [keyFilter],
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
            var keyFilter = new sap.ui.model.Filter('Keyfield', 'EQ', 'ATYPEPROPERTIES');
            this._oBusyDialog.open();
            that._oModel.read(`/HelpDataSet`, {
                filters: [keyFilter],
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

        readMarketClass: function(){
            const that = this;
            var keyFilter = new sap.ui.model.Filter('Keyfield', 'EQ', 'MARKETCLASS');
            that._oModel.read(`/HelpDataSet`, {
                filters: [keyFilter],
                    success: function (oData) {
                       
                        const oModel = new JSONModel(oData.results);
                        that.getView().setModel(oModel, "marketClassSetModel")
                        sap.ui.getCore().setModel(oModel, "marketClassSetModel");
                    },
                    error: function (oData) {
                       
                        MessageToast.show("Something went wrong with Service")
                    }
                });
        },

        readMarketKey: function(){
            const that = this;
            var keyFilter = new sap.ui.model.Filter('Keyfield', 'EQ', 'MARKET');
            that._oModel.read(`/HelpDataSet`, {
                filters: [keyFilter],
                    success: function (oData) {
                       
                        const oModel = new JSONModel(oData.results);
                        that.getView().setModel(oModel, "markeykeyModel")
                        sap.ui.getCore().setModel(oModel, "markeykeyModel");
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
            var keyFilter = new sap.ui.model.Filter('Keyfield', 'EQ', 'METROSTATAREA');
            that._oModel.read(`/HelpDataSet`, {
                filters: [keyFilter],
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
            var keyFilter = new sap.ui.model.Filter('Keyfield', 'EQ', 'NEIGHBORHOOD');
            that._oModel.read(`/HelpDataSet`, {
                filters: [keyFilter],
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

        readPropertyChurnStatus: function(){
            const that = this;
            var keyFilter = new sap.ui.model.Filter('Keyfield', 'EQ', 'PROPERTYCHURNSTATUS');
            that._oModel.read(`/HelpDataSet`, {
                filters: [keyFilter],
                    success: function (oData) {
                       
                        const oModel = new JSONModel(oData.results);
                        that.getView().setModel(oModel, "churnStatusModel")
                        sap.ui.getCore().setModel(oModel, "churnStatusModel");
                    },
                    error: function (oData) {
                       
                        MessageToast.show("Something went wrong with Service")
                    }
                });
        },

        readClimateControl: function(){
            const that = this;
            var keyFilter = new sap.ui.model.Filter('Keyfield', 'EQ', 'CLIMATECONTROL');
            that._oModel.read(`/HelpDataSet`, {
                filters: [keyFilter],
                    success: function (oData) {
                       
                        const oModel = new JSONModel(oData.results);
                        that.getView().setModel(oModel, "climateControlModel")
                        sap.ui.getCore().setModel(oModel, "climateControlModel");
                    },
                    error: function (oData) {
                       
                        MessageToast.show("Something went wrong with Service")
                    }
                });
        },

        readConstructionCode: function(){
            const that = this;
            var keyFilter = new sap.ui.model.Filter('Keyfield', 'EQ', 'CONSTRUCTIONCODE');
            that._oModel.read(`/HelpDataSet`, {
                filters: [keyFilter],
                    success: function (oData) {
                        const oModel = new JSONModel(oData.results);
                        that.getView().setModel(oModel, "ccodeModel")
                        sap.ui.getCore().setModel(oModel, "ccodeModel");
                    },
                    error: function (oData) {
                        MessageToast.show("Something went wrong with Service")
                    }
                });
        },

        readPSConsolidatedPropGroup: function(){
            const that = this;
            var keyFilter = new sap.ui.model.Filter('Keyfield', 'EQ', 'PSCONSOLIDATED');
            that._oModel.read(`/HelpDataSet`, {
                filters: [keyFilter],
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
            var keyFilter = new sap.ui.model.Filter('Action', 'EQ', 'TA');
            this._oBusyDialog.open();
            that._oModel.read(`/CompanyDetailSet`, {
                filters: [keyFilter],
                    success: function (oData) {
                        that._oBusyDialog.close();
                        const oModel = new JSONModel(oData.results);
                        that.getView().setModel(oModel, "taxOwnerModel")
                        sap.ui.getCore().setModel(oModel, "taxOwnerModel");
                    },
                    error: function (oData) {
                        that._oBusyDialog.close();
                        MessageToast.show("Something went wrong with Service")
                    }
                });
        },

        // readTaxOwnerFein: function(){
        //     const that = this;
            
        //     that._oModel.read(`/SrDistrictSet`, {
        //             success: function (oData) {
                       
        //                 const oModel = new JSONModel(oData.results);
        //                 that.getView().setModel(oModel, "SrDistrictSetModel")
        //                 sap.ui.getCore().setModel(oModel, "SrDistrictSetModel");
        //             },
        //             error: function (oData) {
                       
        //                 MessageToast.show("Something went wrong with Service")
        //             }
        //         });
        // },

        readLegalOwner: function(){
            const that = this;
            var keyFilter = new sap.ui.model.Filter('Action', 'EQ', 'LE');
            this._oBusyDialog.open();
            that._oModel.read(`/CompanyDetailSet`, {
                filters: [keyFilter],
                    success: function (oData) {
                        that._oBusyDialog.close();
                        const oModel = new JSONModel(oData.results);
                        that.getView().setModel(oModel, "LegalOwnerModel")
                        sap.ui.getCore().setModel(oModel, "LegalOwnerModel");
                    },
                    error: function (oData) {
                        that._oBusyDialog.close();
                        MessageToast.show("Something went wrong with Service");
                    }
                });
        },

        // readLegalOwnerFein: function(){
        //     const that = this;
            
        //     that._oModel.read(`/SrDistrictSet`, {
        //             success: function (oData) {
                       
        //                 const oModel = new JSONModel(oData.results);
        //                 that.getView().setModel(oModel, "SrDistrictSetModel")
        //                 sap.ui.getCore().setModel(oModel, "SrDistrictSetModel");
        //             },
        //             error: function (oData) {
                       
        //                 MessageToast.show("Something went wrong with Service")
        //             }
        //         });
        // },

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
        },

        detectChanges: function(){
            this.getOwnerComponent.hasChanges = true;
        }

        // Tax detail tab finished
	});
});