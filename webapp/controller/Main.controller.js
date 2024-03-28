sap.ui.define([
    "com/public/storage/pao/utils/reusecontroller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/FilterType",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/m/BusyDialog",
    "com/public/storage/pao/utils/formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController, JSONModel, Fragment, Filter, FilterOperator, FilterType, MessageToast, MessageBox, BusyDialog, formatter) {
        "use strict";
        var _oController;
        let cachedData = null;
        let dataFetched = false;

        return BaseController.extend("com.public.storage.pao.controller.Main", {
            formatter: formatter,
            onInit: function () {
                _oController = this;
                this.getOwnerComponent().plant = ""
                const that = this;
                this._oModel = sap.ui.getCore().getModel("mainModel");
                const oVisibilityModel = new JSONModel({
                    visibliltyForThirdParty: false,
                    //visibliltyForOwner: false,
                    visibilityForPTypeBlock: false,
                    enabledForPlant: true,
                    enabledForProperty: true,
                    visForRetailPCBlock: true,
                    visForStoragePCBlock: true,
                    visForTennentPCBlock: true,
                    visForManagementPCBlock: true,
                    visForCommPCBlock: true
                })
                this.getView().setModel(oVisibilityModel, "oVisModel");
                // const jsonModel = this.getOwnerComponent().getModel("plantModel")
                // this.getView().setModel(jsonModel, "plantModel");
                const oRouter = this.getRouter();
                oRouter.getRoute("home").attachMatched(this._onRouteMatched, this);

                this.BusyDialog = new BusyDialog();
                this.readPropertyMasterData();
                this.getLoggedInUser();
                // this.readRetailPC();
                // this.readStoragePC();
                // this.readTennentPC();
                // this.readManagementPC();
                // this.readCommPC();
                
            },

            // readRetailPC: function(){
            //     const that = this;
            //     this.BusyDialog.open();
            //     this._oModel.read(`/RetailProfitCenter2Set`, {
            //             success: function (oData) {
            //                 that.BusyDialog.close();
            //                 const oModel = new JSONModel(oData.results);
            //                 that.getView().setModel(oModel, "retailpcModel")
            //                 sap.ui.getCore().setModel(oModel, "retailpcModel");
            //             },
            //             error: function (oData) {
            //                 that.BusyDialog.close();
            //                 MessageToast.show("Something went wrong with Service")
            //             }
            //         });
            // },
    
            // readStoragePC: function(){
            //     const that = this;
            //     this.BusyDialog.open();
            //     this._oModel.read(`/StorageProfitCenter2Set`, {
            //             success: function (oData) {
            //                 that.BusyDialog.close();
            //                 const oModel = new JSONModel(oData.results);
            //                 that.getView().setModel(oModel, "storageModel")
            //                 sap.ui.getCore().setModel(oModel, "storageModel");
            //             },
            //             error: function (oData) {
            //                 that.BusyDialog.close();
            //                 MessageToast.show("Something went wrong with Service")
            //             }
            //         });
            // },
    
            // readTennentPC: function(){
            //     const that = this;
            //     this.BusyDialog.open();
            //     this._oModel.read(`/TenentInsProfitCenter2Set`, {
            //             success: function (oData) {
            //                 that.BusyDialog.close();
            //                 const oModel = new JSONModel(oData.results);
            //                 that.getView().setModel(oModel, "tennentModel")
            //                 sap.ui.getCore().setModel(oModel, "tennentModel");
            //             },
            //             error: function (oData) {
            //                 that.BusyDialog.close();
            //                 MessageToast.show("Something went wrong with Service")
            //             }
            //         });
            // },
    
            // readManagementPC: function(){
            //     const that = this;
            //     this.BusyDialog.open();
            //     this._oModel.read(`/ManagementProfitCenter2Set`, {
            //             success: function (oData) {
            //                 that.BusyDialog.close();
            //                 const oModel = new JSONModel(oData.results);
            //                 that.getView().setModel(oModel, "mgmtModel")
            //                 sap.ui.getCore().setModel(oModel, "mgmtModel");
            //             },
            //             error: function (oData) {
            //                 that.BusyDialog.close();
            //                 MessageToast.show("Something went wrong with Service")
            //             }
            //         });
            // },
    
            // readCommPC: function(){
            //     const that = this;
            //     this.BusyDialog.open();
            //     this._oModel.read(`/CommercialProfitCenter2Set`, {
            //             success: function (oData) {
            //                 that.BusyDialog.close();
            //                 const oModel = new JSONModel(oData.results);
            //                 that.getView().setModel(oModel, "commPcModel")
            //                 sap.ui.getCore().setModel(oModel, "commPcModel");
            //             },
            //             error: function (oData) {
            //                 that.BusyDialog.close();
            //                 MessageToast.show("Something went wrong with Service")
            //             }
            //         });
            // },

            _onRouteMatched: function(oEvent){
                const Plant = this.getOwnerComponent().plant;
                const LegacyPropertyNumber= this.getOwnerComponent().LegacyPropertyNumber
                this._oModel = sap.ui.getCore().getModel("mainModel");
                //this.readPropertyData(Plant, LegacyPropertyNumber)
            },

            readPropertyMasterData: function () {
                const that = this;
                return new Promise(function(resolve, reject) {
                    that._oModel.read(`/PlantMasterSet`, {
                        success: function(oData) {
                            that.BusyDialog.close();
                            const oModel = new JSONModel(oData.results);
                            oModel.setSizeLimit(oData.results.length);
                            that.getOwnerComponent().setModel(oModel, "plantsModel");
                            sap.ui.getCore().setModel(oModel, "plantsModel");
                
                            // Resolve with the data if successful
                            resolve(oData.results);
                        },
                        error: function(error) {
                            // Show or log a more meaningful error message
                            MessageToast.show("Error fetching data from the service. Please try again.");
                
                            // Reject with the error object for further handling if needed
                            reject(error);
                        }
                    });
                });
                

            },

            getLoggedInUser: function(){
                const oUser = sap.ushell.Container.getService("UserInfo").getFullName();
                const oModel = new JSONModel({
                    user: oUser
                });
                this.getView().setModel(oModel, "userModel")

            
            },

            _onValueHelpPlant: function (oEvent) {
                const that =this;
                var sInputValue = oEvent.getSource().getValue(),
                    oView = this.getView();

                if (!this._pValueHelpDialog) {
                    this._pValueHelpDialog = Fragment.load({
                        id: oView.getId(),
                        name: "com.public.storage.pao.fragments.Main.Plant",
                        controller: this
                    }).then(function (oDialog) {
                        oView.addDependent(oDialog);
                        return oDialog;
                    });
                }
                this.BusyDialog.open()
                this._pValueHelpDialog.then(function (oDialog) {
                   
                    that.readPropertyMasterData().then(function () {
                        // Close the busy indicator dialog when the data is fetched
                        that.BusyDialog.close();
            
                        // Create a filter for the binding
                        oDialog.getBinding("items").getModel("plantsModel").getData().filter((item => item.Name !== ""));
                        // Open ValueHelpDialog filtered by the input's value
                        oDialog.open();
                    }).catch(function (error) {
                        // Handle errors if necessary and close the busy indicator dialog
                        that.BusyDialog.close();
                    });
                });
            },

            _onValueHelpRequestProperty: function (oEvent) {
                const that =this;
                var sInputValue = oEvent.getSource().getValue(),
                    oView = this.getView();
                if (!this._pValueHelpDialogProp) {
                    this._pValueHelpDialogProp = Fragment.load({
                        id: oView.getId(),
                        name: "com.public.storage.pao.fragments.Main.Property",
                        controller: this
                    }).then(function (oDialog) {
                        oView.addDependent(oDialog);
                        return oDialog;
                    });
                }
                this.BusyDialog.open()
                this._pValueHelpDialogProp.then(function (oDialog) {
                    that.readPropertyMasterData().then(function () {
                        // Close the busy indicator dialog when the data is fetched
                        that.BusyDialog.close();
            
                        // Create a filter for the binding
                        //oDialog.getBinding("items").filter([new Filter("Name", FilterOperator.Contains, sInputValue)]);
                        oDialog.getBinding("items").getModel("plantsModel").getData().filter((item => item.Name !== ""))
                        // Open ValueHelpDialog filtered by the input's value
                        oDialog.open();
                    }).catch(function (error) {
                        // Handle errors if necessary and close the busy indicator dialog
                        that.BusyDialog.close();
                    });
                });
            },

            onPlantSuggest: function(oEvent){
                const sInputValue = oEvent.getSource().getValue();
                const sFIlter = new Filter("Werks", FilterOperator.Contains, sInputValue);
                oEvent.getSource().getBinding("suggestionRows").filter(sFIlter);
                
            },

            onPropertySuggest: function(oEvent){
                const sInputValue = oEvent.getSource().getValue();
                const sFIlter = new Filter("Name2", FilterOperator.Contains, sInputValue);
                oEvent.getSource().getBinding("suggestionRows").filter(sFIlter);
            },


            _onValueHelpMarketClass: function (oEvent) {
                const that =this;
                var sInputValue = oEvent.getSource().getValue(),
                    oView = this.getView();

                if (!this._pValueHelpDialogPropery) {
                    this._pValueHelpDialogPropery = Fragment.load({
                        id: oView.getId(),
                        name: "com.public.storage.pao.fragments.Main.Property",
                        controller: this
                    }).then(function (oDialog) {
                        oView.addDependent(oDialog);
                        return oDialog;
                    });
                }
                this.BusyDialog.open()
                this._pValueHelpDialogPropery.then(function (oDialog) {
                    that.readPropertyMasterData();
                    that.BusyDialog.close();
                    // Create a filter for the binding
                    oDialog.getBinding("items").filter([new Filter("Name", FilterOperator.Contains, sInputValue)]);
                    // Open ValueHelpDialog filtered by the input's value
                    oDialog.open(sInputValue);
                });
            },

            // onValueHelpRequestReatilPC: function (oEvent) {
            //     const that =this;
            //     var sInputValue = oEvent.getSource().getValue(),
            //         oView = this.getView();

            //     if (!this._pValueHelpDialogPropery) {
            //         this._pValueHelpDialogPropery = Fragment.load({
            //             id: oView.getId(),
            //             name: "com.public.storage.pao.fragments.Main.RetailPC",
            //             controller: this
            //         }).then(function (oDialog) {
            //             oView.addDependent(oDialog);
            //             return oDialog;
            //         });
            //     }
            //     //this.BusyDialog.open()
            //     this._pValueHelpDialogPropery.then(function (oDialog) {
            //         that.readRetailPC();
            //         //that.BusyDialog.close();
            //         // Create a filter for the binding
            //        // oDialog.getBinding("items").filter([new Filter("Name", FilterOperator.Contains, sInputValue)]);
            //         // Open ValueHelpDialog filtered by the input's value
            //         oDialog.open(sInputValue);
            //     });
            // },

            // onValueHelpRequestStoragePC: function (oEvent) {
            //     const that =this;
            //     var sInputValue = oEvent.getSource().getValue(),
            //         oView = this.getView();

            //     if (!this._pValueHelpStoragePC) {
            //         this._pValueHelpStoragePC = Fragment.load({
            //             id: oView.getId(),
            //             name: "com.public.storage.pao.fragments.Main.StoragePC",
            //             controller: this
            //         }).then(function (oDialog) {
            //             oView.addDependent(oDialog);
            //             return oDialog;
            //         });
            //     }
            //     //this.BusyDialog.open()
            //     this._pValueHelpStoragePC.then(function (oDialog) {
            //         that.readStoragePC();
            //         //that.BusyDialog.close();
            //         // Create a filter for the binding
            //         //oDialog.getBinding("items").filter([new Filter("Name", FilterOperator.Contains, sInputValue)]);
            //         // Open ValueHelpDialog filtered by the input's value
            //         oDialog.open(sInputValue);
            //     });
            // },

            // onValueHelpRequestTennentPC: function (oEvent) {
            //     const that =this;
            //     var sInputValue = oEvent.getSource().getValue(),
            //         oView = this.getView();

            //     if (!this._pValueHelpTennentPC) {
            //         this._pValueHelpTennentPC = Fragment.load({
            //             id: oView.getId(),
            //             name: "com.public.storage.pao.fragments.Main.TennantPC",
            //             controller: this
            //         }).then(function (oDialog) {
            //             oView.addDependent(oDialog);
            //             return oDialog;
            //         });
            //     }
            //     //this.BusyDialog.open()
            //     this._pValueHelpTennentPC.then(function (oDialog) {
            //         that.readTennentPC();
            //         //that.BusyDialog.close();
            //         // Create a filter for the binding
            //         //oDialog.getBinding("items").filter([new Filter("Name", FilterOperator.Contains, sInputValue)]);
            //         // Open ValueHelpDialog filtered by the input's value
            //         oDialog.open(sInputValue);
            //     });
            // },

            // onValueHelpRequestCommPC: function (oEvent) {
            //     const that =this;
            //     var sInputValue = oEvent.getSource().getValue(),
            //         oView = this.getView();

            //     if (!this._pValueHelpCommPC) {
            //         this._pValueHelpCommPC = Fragment.load({
            //             id: oView.getId(),
            //             name: "com.public.storage.pao.fragments.Main.CommercialPC",
            //             controller: this
            //         }).then(function (oDialog) {
            //             oView.addDependent(oDialog);
            //             return oDialog;
            //         });
            //     }
            //     //this.BusyDialog.open()
            //     this._pValueHelpCommPC.then(function (oDialog) {
            //         that.readCommPC();
            //         //that.BusyDialog.close();
            //         // Create a filter for the binding
            //         //oDialog.getBinding("items").filter([new Filter("Name", FilterOperator.Contains, sInputValue)]);
            //         // Open ValueHelpDialog filtered by the input's value
            //         oDialog.open(sInputValue);
            //     });
            // },

            // onValueHelpRequestMgmtPC: function (oEvent) {
            //     const that =this;
            //     var sInputValue = oEvent.getSource().getValue(),
            //         oView = this.getView();

            //     if (!this._pValueHelpMgmtPC) {
            //         this._pValueHelpMgmtPC = Fragment.load({
            //             id: oView.getId(),
            //             name: "com.public.storage.pao.fragments.Main.ManagementPC",
            //             controller: this
            //         }).then(function (oDialog) {
            //             oView.addDependent(oDialog);
            //             return oDialog;
            //         });
            //     }
            //     //this.BusyDialog.open()
            //     this._pValueHelpMgmtPC.then(function (oDialog) {
            //         that.readManagementPC();
            //         //that.BusyDialog.close();
            //         // Create a filter for the binding
            //         //oDialog.getBinding("items").filter([new Filter("Name", FilterOperator.Contains, sInputValue)]);
            //         // Open ValueHelpDialog filtered by the input's value
            //         oDialog.open(sInputValue);
            //     });
            // },



            // onSubmitPlant: function (oEvent) {
            //     const that = this;
            //     const sInputValue = oEvent.getSource('value').getValue();
            //     const sModel = oEvent.getSource().getModel("plantsModel").getData().filter(item => (item.Werks === sInputValue))
            //     const sProperty = sModel[0].Name2
            //     // Some logic to check for success, and if successful, show the message box
            //     //var bSuccess = true; // Set this to true if the operation is successful, false otherwise

            //     if(sProperty !== ""){
            //         MessageBox.confirm(
            //                     `Property Details for the plant ${oText} is available. Do you want to change?`,
            //                     {
            //                         title: "Confirmation",
            //                         actions: [MessageBox.Action.YES, MessageBox.Action.CANCEL],
            //                         emphasizedAction: MessageBox.Action.YES,
            //                          onClose: function (oAction) {
            //                                         if (oAction === MessageBox.Action.YES) {
            //                                             that.getView().getModel("plantsModel").setProperty("/street", sSelectedPlantAddress)
            //                                             that.getView().getModel("plantsModel").setProperty("/property", sProperty)
                                                      
            //                                         } else {
            //                                             // Handle the "Cancel" button action or do nothing if canceled
            //                                         }
            //                                     }
            //                                 }
            //                             );
            //                         } else {
            //                                 MessageBox.error(
            //                                     `Property Details does not exist for the plant ${oText}`,
            //                                     {
            //                                         title: "Error",
            //                                         actions: [MessageBox.Action.OK],
            //                                         onClose: function (oAction) {
            //                                             if (oAction === MessageBox.Action.OK) {
                                                          
            //                                             } else {
            //                                                 // Handle the "Cancel" button action or do nothing if canceled
            //                                             }
            //                                         }
            //                                     }
            //                                 );
            //                         }
            //     },

            onSuggestionPropertySelected: function(oEvent){
               
                this.getView().byId("propertyInput").setValue("");
                const that = this;
                var oItem = oEvent.getParameter("selectedRow");
                //var oText = oItem ? oItem.getKey() : "";
                //this.getView().byId("propertyInput").setValue(oText);
               
                const sSelectedPlantStreet = oItem.getBindingContext("plantsModel").getObject().Street
                const sOrt01 = oItem.getBindingContext("plantsModel").getObject().Ort01
               // const sPlant = oItem.getBindingContext("plantsModel").getObject().Werks;
                const sLand = oItem.getBindingContext("plantsModel").getObject().Land1
                const sName1T001 = oItem.getBindingContext("plantsModel").getObject().Name2Adrc;
                const sName2 = oItem.getBindingContext("plantsModel").getObject().Name2;
                const sRegion = oItem.getBindingContext("plantsModel").getObject().Regio;
                this.getView().byId("propertyInput").setValue(sName2);
                const sPin = oItem.getBindingContext("plantsModel").getObject().Pstlz
                const concatedAddress = `${sName1T001} ${sSelectedPlantStreet} ${sOrt01} ${sRegion} ${sPin}`
                const titleAddress = `${sName1T001} ${sSelectedPlantStreet} ${sOrt01} ${sRegion} ${sPin}`
                //const sProperty = oItem.getBindingContext("plantsModel").getObject().LegacyPropertyNumber;
                this.getOwnerComponent().plant = oItem.getBindingContext("plantsModel").getObject().Werks;
                const sProperty = oItem.getBindingContext("plantsModel").getObject().Name2;
                if(this.getOwnerComponent().plant !== ""){
                    that.getOwnerComponent().getModel("plantsModel").setProperty("/street", concatedAddress);
                    that.getOwnerComponent().getModel("plantsModel").setProperty("/address", titleAddress);
                    that.getOwnerComponent().getModel("plantsModel").setProperty("/plant", this.getOwnerComponent().plant)
                                                       
                        } else {
                             MessageBox.error(
                                 `Property Details does not exist for the Property ${oText}`,
                                    {
                                        title: "Error",
                                        actions: [MessageBox.Action.OK],
                                         onClose: function (oAction) {
                                            if (oAction === MessageBox.Action.OK) {
                                            that.getView().getModel("oVisModel").setProperty("/visibilityForPTypeBlock", false);
                                            } else {
                                                            // Handle the "Cancel" button action or do nothing if canceled
                                            }
                                         }
                                    }
                             );

                }

            },

            onSuggestionPlantSelected: function (oEvent) {
                this.getView().byId("propertyInput").setValue("");
                const that = this;
                var oItem = oEvent.getParameter("selectedRow");
                //var oText = oItem ? oItem.getKey() : "";
                
               
                const sSelectedPlantStreet = oItem.getBindingContext("plantsModel").getObject().Street;
                const sPlant = oItem.getBindingContext("plantsModel").getObject().Werks;
                const sOrt01 = oItem.getBindingContext("plantsModel").getObject().Ort01
                const sLand = oItem.getBindingContext("plantsModel").getObject().Land1
                const sName1T001 = oItem.getBindingContext("plantsModel").getObject().Name2Adrc;
                const sRegion = oItem.getBindingContext("plantsModel").getObject().Regio
                const sPin = oItem.getBindingContext("plantsModel").getObject().Pstlz;
                this.getView().byId("plantInput").setValue(sPlant);
                const concatedAddress = `${sName1T001}  ${sSelectedPlantStreet} ${sOrt01} ${sRegion} ${sPin}`
                const titleAddress = `${sName1T001} ${sSelectedPlantStreet} ${sOrt01} ${sRegion} ${sPin}`
                //const sProperty = oItem.getBindingContext("plantsModel").getObject().LegacyPropertyNumber;
                this.getOwnerComponent().plant = oItem.getBindingContext("plantsModel").getObject().Werks;
                const sProperty = oItem.getBindingContext("plantsModel").getObject().Name2;
                if(sProperty !== ""){
                    // MessageBox.confirm(
                    //             `Property Details for the plant ${oText} is available. Do you want to change?`,
                    //             {
                    //                 title: "Confirmation",
                    //                 actions: [MessageBox.Action.YES, MessageBox.Action.CANCEL],
                    //                 emphasizedAction: MessageBox.Action.YES,
                    //                  onClose: function (oAction) {
                    //                                 if (oAction === MessageBox.Action.YES) {
                                                        that.getOwnerComponent().getModel("plantsModel").setProperty("/street", concatedAddress);
                                                        that.getOwnerComponent().getModel("plantsModel").setProperty("/address", titleAddress);
                                                        that.getOwnerComponent().getModel("plantsModel").setProperty("/property", sProperty)
                                                      
                                        //             } else {
                                        //                 // Handle the "Cancel" button action or do nothing if canceled
                                        //             }
                                        //         }
                                        //     }
                                        // );
                                    } else {
                                            MessageBox.error(
                                                `Property Details does not exist for the plant ${oText}`,
                                                {
                                                    title: "Error",
                                                    actions: [MessageBox.Action.OK],
                                                    onClose: function (oAction) {
                                                        if (oAction === MessageBox.Action.OK) {
                                                            that.getView().getModel("oVisModel").setProperty("/visibilityForPTypeBlock", false);
                                                        } else {
                                                            // Handle the "Cancel" button action or do nothing if canceled
                                                        }
                                                    }
                                                }
                                            );

                }
            },

            // onSuggestionItemSelected: function (oEvent) {
            //     const that = this;
            //     let sCompanyCodeRetail, sDatabRetail, finalStartDateRetail, sPCRetail;
            //     let sCompanyCodeStorage,sDatabStorage, finalStartDateStorage,sPCStorage;
            //     let sCompanyCodeCommPc,sDatabCommPc, finalStartDateCommPc,sPCComm;
            //     let sCompanyCodeTennent,sDatabTennet, finalStartDateTennet,sPCTennet;

            //     let sCompanyCodeRetailTP, sDatabRetailTP, finalStartDateRetailTP, sPCRetailTP;
            //     let sCompanyCodeStorageTP,sDatabStorageTP, finalStartDateStorageTP,sPCStorageTP;
            //     let sCompanyCodeMgmtPcTP,sDatabMgmtPcTP, finalStartDateMgmtPcTP,sPCMgmtTP;
            //     let sCompanyCodeTennentTP,sDatabTennetTP, finalStartDateTennetTP,sPCTennetTP;
            //     var oSelectedItem = oEvent.getParameter("selectedItem");
            //     if (oSelectedItem){
                    
            //     }
            //     //var sCode = oEvent.getSource().getValue();
            //     var oText = oSelectedItem ? oSelectedItem.getKey() : "";
            //     const sSelectedRBButton = this.getView().byId("rbg1").getSelectedButton().getText();
            //     const sIDRetail = oEvent.getSource().getId().includes("retailPc");
            //     const sIDStorage = oEvent.getSource().getId().includes("storagePc");
            //     const sIDTent = oEvent.getSource().getId().includes("tenPc");
            //     const sIDcommPC = oEvent.getSource().getId().includes("commPc");
            //     const sIDRetailTP = oEvent.getSource().getId().includes("retailPcTP");
            //     const sIDStorageTP = oEvent.getSource().getId().includes("storagePcTP");
            //     const sIDTentTP = oEvent.getSource().getId().includes("tenPcTP");
            //     const sIDmgmtPCTP = oEvent.getSource().getId().includes("mgmtPcTP");
            //     if (sSelectedRBButton ==="Own"){
            //         if (sIDRetail === true){
            //             this.byId("retailPc").setValueState(sap.ui.core.ValueState.None);
            //             sPCRetail = oSelectedItem.getBindingContext("retailpcModel").getObject().Prctr;
            //             sCompanyCodeRetail = oSelectedItem.getBindingContext("retailpcModel").getObject().Bukrs;
            //             sDatabRetail = oSelectedItem.getBindingContext("retailpcModel").getObject().Datab;
            //             finalStartDateRetail = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDatabRetail));
            //             // this.byId("retailPc").setValue(sPCRetail);
            //             // this.byId("ccCode").setValue(sCompanyCodeRetail);
            //             // this.byId("startdate").setValue(finalStartDateRetail);

            //             this.getView().getModel("plantBasicDetailsModel").setProperty("/0/RetailPc", sPCRetail);
            //             this.getView().getModel("plantBasicDetailsModel").setProperty("/0/CompanyCode1", sCompanyCodeRetail);
            //             //this.getView().getModel("plantBasicDetailsModel").setProperty("/0/RetailPCAdate", finalStartDateRetail);
            //             this.byId("startdate").setValue(finalStartDateRetail);
                        
            //             //this.rtailPC = sCode
            //         }
            //         if(sIDStorage === true){
            //             this.byId("storagePc").setValueState(sap.ui.core.ValueState.None);
            //             sPCStorage = oSelectedItem.getBindingContext("storageModel").getObject().Prctr;
            //             sCompanyCodeStorage = oSelectedItem.getBindingContext("storageModel").getObject().Bukrs;
            //             sDatabStorage = oSelectedItem.getBindingContext("storageModel").getObject().Datab;
            //             finalStartDateStorage = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDatabStorage));
            //             // this.byId("storagePc").setValue(sPCStorage);
            //             // this.byId("ccCode1").setValue(sCompanyCodeStorage);
            //             // this.byId("startdate1").setValue(finalStartDateStorage);

            //             this.getView().getModel("plantBasicDetailsModel").setProperty("/0/StoragePc", sPCStorage);
            //             this.getView().getModel("plantBasicDetailsModel").setProperty("/0/CompanyCode2", sCompanyCodeStorage);
            //             this.getView().getModel("plantBasicDetailsModel").setProperty("/0/StoragePcAdate", finalStartDateStorage);
            //             //this.getView().getModel("plantBasicDetailsModel").setProperty("/0/startdate1", CddStartDate)
            //             this.byId("startdate1").setValue(finalStartDateStorage);
            //             //this.storagePC = sCode
            //         } 
            //         if(sIDcommPC === true){
            //             this.byId("commPc").setValueState(sap.ui.core.ValueState.None);
            //             sPCComm = oSelectedItem.getBindingContext("commPcModel").getObject().Prctr;
            //             sCompanyCodeCommPc = oSelectedItem.getBindingContext("commPcModel").getObject().Bukrs;
            //             sDatabCommPc = oSelectedItem.getBindingContext("commPcModel").getObject().Datab;
            //             finalStartDateCommPc = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDatabCommPc));
            //             // this.byId("commPc").setValue(sPCComm);
            //             // this.byId("ccCode3").setValue(sCompanyCodeCommPc);
            //             this.byId("startdate3").setValue(finalStartDateCommPc);

            //             this.getView().getModel("plantBasicDetailsModel").setProperty("/0/CommercialPc", sPCComm);
            //             this.getView().getModel("plantBasicDetailsModel").setProperty("/0/CompanyCode4", sCompanyCodeCommPc);
            //             //this.getView().getModel("plantBasicDetailsModel").setProperty("/0/CommercialPcAdate", finalStartDateCommPc);
            //             //this.commPC = sCode
            //         } 
            //         if(sIDTent === true){
            //             this.byId("tenPc").setValueState(sap.ui.core.ValueState.None);
            //             sPCTennet = oSelectedItem.getBindingContext("tennentModel").getObject().Prctr;
            //             sCompanyCodeTennent = oSelectedItem.getBindingContext("tennentModel").getObject().Bukrs;
            //             sDatabTennet = oSelectedItem.getBindingContext("tennentModel").getObject().Datab;
            //             finalStartDateTennet = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDatabTennet));
                        

            //             this.getView().getModel("plantBasicDetailsModel").setProperty("/0/TennentInsPc", sPCTennet);
            //             this.getView().getModel("plantBasicDetailsModel").setProperty("/0/CompanyCode3", sCompanyCodeTennent);
            //             //this.getView().getModel("plantBasicDetailsModel").setProperty("/0/TennentinPcAdate", finalStartDateTennet);
            //             // this.byId("tenPc").setValue(sPCTennet);
            //             // this.byId("ccCode2").setValue(sCompanyCodeTennent);
            //              this.byId("startdate2").setValue(finalStartDateTennet);
            //             //this.tennentPC = sCode
            //         }

            //     } else {
                    
            //         if (sIDRetailTP === true){
            //             this.byId("retailPcTP").setValueState(sap.ui.core.ValueState.None);
            //             sPCRetailTP = oSelectedItem.getBindingContext("retailpcModel").getObject().Prctr;
            //             sCompanyCodeRetailTP = oSelectedItem.getBindingContext("retailpcModel").getObject().Bukrs;
            //             sDatabRetailTP = oSelectedItem.getBindingContext("retailpcModel").getObject().Datab;
            //             finalStartDateRetailTP = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDatabRetailTP));
                        
            //             this.getView().getModel("plantBasicDetailsModel").setProperty("/0/RetailPc", sPCRetailTP);
            //             this.getView().getModel("plantBasicDetailsModel").setProperty("/0/CompanyCode1", sCompanyCodeRetailTP);
            //             //this.getView().getModel("plantBasicDetailsModel").setProperty("/0/RetailPCAdate", finalStartDateRetailTP);
            //             // this.byId("ccCodePcTp").setValue(sCompanyCodeRetailTP);
            //              this.byId("startdatereatilPcTp").setValue(finalStartDateRetailTP);
            //             // this.byId("retailPcTP").setValue(sCode);
            //             //this.rtailPCTP = sCode
            //         } 
            //         if(sIDStorageTP === true){
            //             this.byId("storagePcTP").setValueState(sap.ui.core.ValueState.None);
            //             sPCStorageTP = oSelectedItem.getBindingContext("storageModel").getObject().Prctr;
            //             sCompanyCodeStorageTP = oSelectedItem.getBindingContext("storageModel").getObject().Bukrs;
            //             sDatabStorageTP = oSelectedItem.getBindingContext("storageModel").getObject().Datab;
            //             finalStartDateStorageTP = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDatabStorageTP));

            //             this.getView().getModel("plantBasicDetailsModel").setProperty("/0/StoragePc", sPCStorageTP);
            //             this.getView().getModel("plantBasicDetailsModel").setProperty("/0/CompanyCode2", sCompanyCodeStorageTP);
            //             //this.getView().getModel("plantBasicDetailsModel").setProperty("/0/StoragePcAdate", finalStartDateStorageTP);
            //             this.byId("startdateStoragePcTp").setValue(finalStartDateStorageTP);
            //         } 
            //         if(sIDTentTP === true){
            //             this.byId("tenPcTP").setValueState(sap.ui.core.ValueState.None);
            //             sPCTennetTP = oSelectedItem.getBindingContext("tennentModel").getObject().Prctr;
            //             sCompanyCodeTennentTP = oSelectedItem.getBindingContext("tennentModel").getObject().Bukrs;
            //             sDatabTennetTP = oSelectedItem.getBindingContext("tennentModel").getObject().Datab;
            //             finalStartDateTennetTP = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDatabTennetTP));
            //             // this.byId("tenPcTP").setValue(sPCTennetTP);
            //             // this.byId("ccCodeTenTp").setValue(sCompanyCodeTennentTP);
                       
            //             //this.managmentPCTP = sCode

            //             this.getView().getModel("plantBasicDetailsModel").setProperty("/0/TennentInsPc", sPCTennetTP);
            //             this.getView().getModel("plantBasicDetailsModel").setProperty("/0/CompanyCode3", sCompanyCodeTennentTP);
            //             this.byId("startdateTanentPcTp").setValue(finalStartDateTennetTP);
            //             //this.getView().getModel("plantBasicDetailsModel").setProperty("/0/TennentinPcAdate", finalStartDateTennetTP);
            //         } 
            //         if(sIDmgmtPCTP === true){
            //             this.byId("mgmtPcTP").setValueState(sap.ui.core.ValueState.None);
            //             sPCMgmtTP = oSelectedItem.getBindingContext("mgmtModel").getObject().Prctr;
            //             sCompanyCodeMgmtPcTP = oSelectedItem.getBindingContext("mgmtModel").getObject().Bukrs;
            //             sDatabMgmtPcTP = oSelectedItem.getBindingContext("mgmtModel").getObject().Datab;
            //             finalStartDateMgmtPcTP = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDatabMgmtPcTP));

            //             this.getView().getModel("plantBasicDetailsModel").setProperty("/0/ManagmentPc", sPCMgmtTP);
            //             this.getView().getModel("plantBasicDetailsModel").setProperty("/0/CompanyCode5", sCompanyCodeMgmtPcTP);
            //             //this.getView().getModel("plantBasicDetailsModel").setProperty("/0/ManagementPcAdate", finalStartDateMgmtPcTP);
                        
            //             this.byId("startdateMgmtPcTp").setValue(finalStartDateMgmtPcTP);
            //         }
            //     } 
               
            // },

            // onChangePCs: function(oEvent){
            //     const input = oEvent.getSource();
            //     const isInvalid = !input.getSelectedKey() && input.getValue().trim();
            //     input.setValueState(isInvalid ? "Error" : "None");

            // },

            // onValueHelpDialogClosePC: function (oEvent) {
            //     let sCompanyCodeRetail,sDatabRetail, finalStartDateRetail,sPCRetail
            //     let sCompanyCodeStorage,sDatabStorage, finalStartDateStorage,sPCStorage
            //     let sCompanyCodeCommPc,sDatabCommPc, finalStartDateCommPc,sPCComm
            //     let sCompanyCodeTennent,sDatabTennet, finalStartDateTennet,sPCTennet

            //     let sCompanyCodeRetailTP, sDatabRetailTP, finalStartDateRetailTP, sPCRetailTP;
            //     let sCompanyCodeStorageTP,sDatabStorageTP, finalStartDateStorageTP,sPCStorageTP;
            //     let sCompanyCodeMgmtPcTP,sDatabMgmtPcTP, finalStartDateMgmtPcTP,sPCMgmtTP;
            //     let sCompanyCodeTennentTP,sDatabTennetTP, finalStartDateTennetTP,sPCTennetTP;
            //     const sSelectedRBButton = this.getView().byId("rbg1").getSelectedButton().getText();
            //     let	oSelectedItem = oEvent.getParameter("selectedItem");
            //     //let oModel = oSelectedItem.getBindingContext()
               
            //     let sTitle = oEvent.getSource().getTitle();
            //     // oEvent.getSource().getBinding("items").filter([]);
            //     // if (!oSelectedItem) {
            //     //     return;
            //     // }
            //     if (!oSelectedItem) {
            //         //oInput.resetProperty("value");
            //         return;
            //     }
            //     //let sDescription = oSelectedItem.getDescription();
            //     //let sCode =  oSelectedItem.getTitle();

            //     if (sSelectedRBButton ==="Own"){
            //         if (sTitle === "Retail PC"){
            //             sPCRetail = oSelectedItem.getBindingContext("retailpcModel").getObject().Prctr;
            //             sCompanyCodeRetail = oSelectedItem.getBindingContext("retailpcModel").getObject().Bukrs;
            //             sDatabRetail = oSelectedItem.getBindingContext("retailpcModel").getObject().Datab;
            //             finalStartDateRetail = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDatabRetail));
                       
            //             this.getView().getModel("plantBasicDetailsModel").setProperty("/0/RetailPc", sPCRetail);
            //             this.getView().getModel("plantBasicDetailsModel").setProperty("/0/CompanyCode1", sCompanyCodeRetail);
            //             //this.getView().getModel("plantBasicDetailsModel").setProperty("/0/RetailPCAdate", finalStartDateRetail);
            //             this.byId("startdate").setValue(finalStartDateRetail);
                        
            //             //this.rtailPC = sCode
            //         }
            //         if(sTitle === "Storage PC"){
            //             sPCStorage = oSelectedItem.getBindingContext("storageModel").getObject().Prctr;
            //             sCompanyCodeStorage = oSelectedItem.getBindingContext("storageModel").getObject().Bukrs;
            //             sDatabStorage = oSelectedItem.getBindingContext("storageModel").getObject().Datab;
            //             finalStartDateStorage = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDatabStorage));
                       

            //             this.getView().getModel("plantBasicDetailsModel").setProperty("/0/StoragePc", sPCStorage);
            //             this.getView().getModel("plantBasicDetailsModel").setProperty("/0/CompanyCode2", sCompanyCodeStorage);
            //             //this.getView().getModel("plantBasicDetailsModel").setProperty("/0/StoragePcAdate", finalStartDateStorage);
            //             this.byId("startdate1").setValue(finalStartDateStorage);
            //         }
            //         if(sTitle === "Commercial PC"){
            //             sPCComm = oSelectedItem.getBindingContext("commPcModel").getObject().Prctr;
            //             sCompanyCodeCommPc = oSelectedItem.getBindingContext("commPcModel").getObject().Bukrs;
            //             sDatabCommPc = oSelectedItem.getBindingContext("commPcModel").getObject().Datab;
            //             finalStartDateCommPc = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDatabCommPc));
                      
            //             this.getView().getModel("plantBasicDetailsModel").setProperty("/0/CommercialPc", sPCComm);
            //             this.getView().getModel("plantBasicDetailsModel").setProperty("/0/ccCode3", sCompanyCodeCommPc);
            //             //this.getView().getModel("plantBasicDetailsModel").setProperty("/0/CommercialPcAdate", finalStartDateCommPc);
            //             this.byId("startdate3").setValue(finalStartDateCommPc);

            //         } 
            //         if(sTitle === "Tennent PC"){
            //             sPCTennet = oSelectedItem.getBindingContext("tennentModel").getObject().Prctr;
            //             sCompanyCodeTennent = oSelectedItem.getBindingContext("tennentModel").getObject().Bukrs;
            //             sDatabTennet = oSelectedItem.getBindingContext("tennentModel").getObject().Datab;
            //             finalStartDateTennet = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDatabTennet));
                     

            //             this.getView().getModel("plantBasicDetailsModel").setProperty("/0/TennentInsPc", sPCTennet);
            //             this.getView().getModel("plantBasicDetailsModel").setProperty("/0/CompanyCode3", sCompanyCodeTennent);
            //             //this.getView().getModel("plantBasicDetailsModel").setProperty("/0/TennentinPcAdate", finalStartDateTennet);
            //             this.byId("startdate2").setValue(finalStartDateTennet);
            //         }

            //     } else {
            //         if (sTitle === "Retail PC"){
                       
            //             sPCRetailTP = oSelectedItem.getBindingContext("retailpcModel").getObject().Prctr;
            //             sCompanyCodeRetailTP = oSelectedItem.getBindingContext("retailpcModel").getObject().Bukrs;
            //             sDatabRetailTP = oSelectedItem.getBindingContext("retailpcModel").getObject().Datab;
            //             finalStartDateRetailTP = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDatabRetailTP));
                        
            //             this.getView().getModel("plantBasicDetailsModel").setProperty("/0/RetailPc", sPCRetailTP);
            //             this.getView().getModel("plantBasicDetailsModel").setProperty("/0/CompanyCode1", sCompanyCodeRetailTP);
            //             //this.getView().getModel("plantBasicDetailsModel").setProperty("/0/RetailPCAdate", finalStartDateRetailTP);
            //             this.byId("startdatereatilPcTp").setValue(finalStartDateRetailTP);
            //         } else if(sTitle === "Storage PC"){
                       
            //             sPCStorageTP = oSelectedItem.getBindingContext("storageModel").getObject().Prctr;
            //             sCompanyCodeStorageTP = oSelectedItem.getBindingContext("storageModel").getObject().Bukrs;
            //             sDatabStorageTP = oSelectedItem.getBindingContext("storageModel").getObject().Datab;
            //             finalStartDateStorageTP = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDatabStorageTP));
            //             this.getView().getModel("plantBasicDetailsModel").setProperty("/0/StoragePc", sPCStorageTP);
            //             this.getView().getModel("plantBasicDetailsModel").setProperty("/0/CompanyCode2", sCompanyCodeStorageTP);
            //             //this.getView().getModel("plantBasicDetailsModel").setProperty("/0/StoragePcAdate", finalStartDateStorageTP);

            //             this.byId("startdateStoragePcTp").setValue(finalStartDateRetailTP);
            //         } 
            //         else if(sTitle === "Tennent PC"){
                        
            //             sPCTennetTP = oSelectedItem.getBindingContext("tennentModel").getObject().Prctr;
            //             sCompanyCodeTennentTP = oSelectedItem.getBindingContext("tennentModel").getObject().Bukrs;
            //             sDatabTennetTP = oSelectedItem.getBindingContext("tennentModel").getObject().Datab;
            //             finalStartDateTennetTP = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(finalStartDateTennetTP));
            //             this.getView().getModel("plantBasicDetailsModel").setProperty("/0/TennentInsPc", sPCTennetTP);
            //             this.getView().getModel("plantBasicDetailsModel").setProperty("/0/CompanyCode3", sCompanyCodeTennentTP);
            //             //this.getView().getModel("plantBasicDetailsModel").setProperty("/0/TennentinPcAdate", finalStartDateTennetTP);
            //             this.byId("startdateTanentPcTp").setValue(finalStartDateTennetTP);
            //             //this.tennentPCTP = sCode
            //         } else if(sTitle === "Management PC"){

                       
            //             sPCMgmtTP = oSelectedItem.getBindingContext("mgmtModel").getObject().Prctr;
            //             sCompanyCodeMgmtPcTP = oSelectedItem.getBindingContext("mgmtModel").getObject().Bukrs;
            //             sDatabMgmtPcTP = oSelectedItem.getBindingContext("mgmtModel").getObject().Datab;
            //             finalStartDateMgmtPcTP = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDatabMgmtPcTP));
            //             this.getView().getModel("plantBasicDetailsModel").setProperty("/0/ManagmentPc", sPCMgmtTP);
            //             this.getView().getModel("plantBasicDetailsModel").setProperty("/0/CompanyCode5", sCompanyCodeMgmtPcTP);
            //             this.byId("startdateMgmtPcTp").setValue(finalStartDateMgmtPcTP);
            //             //this.getView().getModel("plantBasicDetailsModel").setProperty("/0/ManagementPcAdate", finalStartDateMgmtPcTP);
            //         } 
            //     }  
            // },

                    // oncheckRetailPc: function(oEvent){
                    //         var oInput = oEvent.getSource();
                    //         var sValue = oInput.getValue();
                    //         const sId = oInput.getId();
                    //         // var oSuggestionModelRetail = this.getView().getModel("retailpcModel").getData();
                    //         // var oSuggestionModelStorage = this.getView().getModel("storageModel").getData();
                    //         // var oSuggestionModelTenant = this.getView().getModel("tennentModel").getData();
                    //         // var oSuggestionModelComm = this.getView().getModel("commPcModel").getData();
                    //         // var oSuggestionModelMgmt = this.getView().getModel("mgmtModel").getData();

                    //         // if (sId.includes() == ""){

                    //         // }
                    //         var oSuggestionModel = this.getView().getModel("retailpcModel").getData();
                
                    //         if (oSuggestionModel.indexOf(sValue) !== -1) {
                    //             oInput.setValueState(sap.ui.core.ValueState.None);
                    //         } else {
                    //             oInput.setValueState(sap.ui.core.ValueState.Error);
                    //         }

                    //     },
                    // oncheckStoragePc: function(oEvent){
                    //     var oInput = oEvent.getSource();
                    //     var sValue = oInput.getValue();
                    //     var oSuggestionModel = this.getView().getModel("storageModel").getData();
                    //     if (oSuggestionModel.indexOf(sValue) !== -1 ) {
                    //         oInput.setValueState(sap.ui.core.ValueState.None);
                    //     } else {
                    //         oInput.setValueState(sap.ui.core.ValueState.Error);
                    //     }
                    // },
                    
                    // oncheckTentPc: function(oEvent){
                    //     var oInput = oEvent.getSource();
                    //     var sValue = oInput.getValue();
                    //     var oSuggestionModel = this.getView().getModel("tennentModel").getData();
                    //     if (oSuggestionModel.indexOf(sValue) !== -1 ) {
                    //         oInput.setValueState(sap.ui.core.ValueState.None);
                    //     } else {
                    //         oInput.setValueState(sap.ui.core.ValueState.Error);
                    //     }
                    // },

                    // oncheckCommPc: function(oEvent){
                    //     var oInput = oEvent.getSource();
                    //     var sValue = oInput.getValue();
                    //     var oSuggestionModel = this.getView().getModel("commPcModel").getData();
                    //     if (oSuggestionModel.indexOf(sValue) !== -1 ) {
                    //         oInput.setValueState(sap.ui.core.ValueState.None);
                    //     } else {
                    //         oInput.setValueState(sap.ui.core.ValueState.Error);
                    //     }

                    // },

                    // oncheckMgmtPc: function(oEvent){
                    //     var oInput = oEvent.getSource();
                    //     var sValue = oInput.getValue();
                    //     var oSuggestionModel = this.getView().getModel("mgmtModel").getData();
                    //     if (oSuggestionModel.indexOf(sValue) !== -1 ) {
                    //         oInput.setValueState(sap.ui.core.ValueState.None);
                    //     } else {
                    //         oInput.setValueState(sap.ui.core.ValueState.Error);
                    //     }

                    // },

            onCheckPropertyTable:async function(){
               //var response = this.readPropertyMasterData();
               const that = this;
               this.getOwnerComponent().LegacyPropertyNumber = this.getView().byId("propertyInput").getValue();

               if (this.getOwnerComponent().LegacyPropertyNumber === "" || this.getOwnerComponent().plant === "") {

                return MessageToast.show("Please fill the Plant/Property Details");
               }
               var FilterPlant = new sap.ui.model.Filter('Plant', 'EQ', this.getOwnerComponent().plant);
               var FilterProperty = new sap.ui.model.Filter('LegacyPropertyNumber', 'EQ', this.getOwnerComponent().LegacyPropertyNumber);
               var FinalFIlter = new sap.ui.model.Filter([FilterPlant, FilterProperty], true);
               this.BusyDialog.open()
               return new Promise(function(){
                   that._oModel.read(`/PropertyMasterSet`, {
                    filters: [FinalFIlter],
                    and: false,
                       success: function (oData) {
                           that.BusyDialog.close();
                           //const filterData = oModel.getData().filter(item => (item.LegacyPropertyNumber === that.getOwnerComponent().LegacyPropertyNumber))
                           if(oData.results.length){
                            const oModel = new JSONModel(oData.results);
                            that.getView().setModel(oModel, "pResultModel");
                            
                            MessageBox.confirm(
                                                    `Property Details for the property ${that.getOwnerComponent().LegacyPropertyNumber} is available. Do you want to change?`,
                                                    {
                                                        title: "Confirmation",
                                                        actions: [MessageBox.Action.YES, MessageBox.Action.CANCEL],
                                                        emphasizedAction: MessageBox.Action.YES,
                                                        onClose: function (oAction) {
                                                            if (oAction === MessageBox.Action.YES) {
                                                                //that.getView().getModel("plantsModel").setProperty("/street", sSelectedPlantAddress)
                                                               
                                                               
                                                                that.getView().getModel("plantsModel").setProperty("/property", that.getOwnerComponent().LegacyPropertyNumber)
                                                                that.getView().getModel("oVisModel").setProperty("/visibilityForPTypeBlock", true);
                                                                that.getView().getModel("oVisModel").setProperty("/visibliltyForOwner", true);
                                                                that.getView().getModel("oVisModel").setProperty("/enabledForPlant", false);
                                                                that.getView().getModel("oVisModel").setProperty("/enabledForProperty", false);
                                                                that.getView().byId("idReset").setEnabled(true);
                                                                //that.getView().byId("savandcontmain").setEnabled(false);
                                                                if (that.getOwnerComponent().plant.includes("A") || that.getOwnerComponent().plant.includes("a")){
                                                                    that.byId("rb1").setSelected(true);
                                                                    //that.getView().getModel("oVisModel").setProperty("/visibliltyForOwner", true);
                                                                } else {
                                                                    that.byId("rb2").setSelected(true);
                                                                    //that.getView().getModel("oVisModel").setProperty("/visibliltyForThirdParty", true);
                                                                }
                                                                that.readProfitCenters();
                                                                
                                                            } else {
                                                                // Handle the "Cancel" button action or do nothing if canceled
                                                            }
                                                        }
                                                    }
                                                );
                                            } else {
                                                const oModel = new JSONModel(oData.results);
                                                that.getView().setModel(oModel, "pResultModel");
                                                    MessageBox.confirm(
                                                        `Property Details for the property ${that.getOwnerComponent().LegacyPropertyNumber} is not available. Do you want to create new?`,
                                                        {
                                                            title: "Confirmation",
                                                            actions: [MessageBox.Action.YES, MessageBox.Action.CANCEL],
                                                            emphasizedAction: MessageBox.Action.YES,
                                                            onClose: function (oAction) {
                                                                if (oAction === MessageBox.Action.YES) {
                                                                    // Handle the "Confirm" button action
                                                                    that.getView().getModel("plantsModel").setProperty("/property", that.getOwnerComponent().LegacyPropertyNumber);
                                                                    that.getView().getModel("oVisModel").setProperty("/visibilityForPTypeBlock", true);
                                                                   // that.getView().getModel("oVisModel").setProperty("/visibliltyForOwner", true);
                                                                    that.getView().getModel("oVisModel").setProperty("/enabledForPlant", false);
                                                                    that.getView().getModel("oVisModel").setProperty("/enabledForProperty", false);
                                                                    that.getView().byId("idReset").setEnabled(true);
                                                                    //that.getView().byId("savandcontmain").setEnabled(true);
                                                                    if (that.getOwnerComponent().plant.includes("A") || that.getOwnerComponent().plant.includes("a")){
                                                                        that.byId("rb1").setSelected(true);
                                                                        //that.getView().getModel("oVisModel").setProperty("/visibliltyForOwner", true);
                                                                        
                                                                    } else {
                                                                        that.byId("rb2").setSelected(true)
                                                                        
                                                                        //that.getView().getModel("oVisModel").setProperty("/visibliltyForThirdParty", true);
                                                                    }
                                                                    that.readProfitCenters();
                                                                } else {
                                                                    // Handle the "Cancel" button action or do nothing if canceled
                                                                }
                                                            }
                                                        }
                                                    );
                                            }
                       },
                       error: function (oData) {
                            that.BusyDialog.close();
                           MessageToast.show("Something went wrong with Service")
                       }
                   });
               });

            },

            readProfitCenters: function(){
                const that = this;
                var FilterPlant = new sap.ui.model.Filter('Plant', 'EQ', this.getOwnerComponent().plant);
                var FilterProperty = new sap.ui.model.Filter('LegacyPropertyNumber', 'EQ', this.getOwnerComponent().LegacyPropertyNumber);
                var FinalFIlter = new sap.ui.model.Filter([FilterPlant, FilterProperty], true);
                this._oModel.read(`/ProfitCenterSet`,{
                    filters: [FinalFIlter],
                    and: false,
                    success: function(oData){
                        const oModel = new JSONModel(oData.results);
                        that.getView().setModel(oModel, "profitCenterModel");
                        sap.ui.getCore().setModel(oModel, "profitCenterModel");
                        that.getView().getModel("profitCenterModel").refresh();
                    },
                    error: function (oData) {
                        MessageToast.show("Something went wrong with Service")
                    }

                })
                
            },

            onResetField: function(){
                this.getView().getModel("oVisModel").setProperty("/enabledForPlant", true);
                this.getView().getModel("oVisModel").setProperty("/enabledForProperty", true);
                this.getView().getModel("oVisModel").setProperty("/visibilityForPTypeBlock", false);
                //this.getView().getModel("oVisModel").setProperty("/visibliltyForOwner", false);
                this.getView().getModel("oVisModel").setProperty("/visibliltyForThirdParty", false);
                this.byId("idReset").setEnabled(false);
                this.byId("rb1").setSelected(true);
              
                this.getOwnerComponent().plant = "";
                this.getOwnerComponent().LegacyPropertyNumber = "";
                this.byId("rbg1").setSelectedIndex(0);
                // this.byId("retailPc").setValue("");
                // this.byId("storagePc").setValue("");
                // this.byId("tenPc").setValue("");
                // this.byId("commPc").setValue("");

                // this.byId("retailPc").setValueState("None");
                // this.byId("storagePc").setValueState("None");
                // this.byId("tenPc").setValueState("None");
                // this.byId("commPc").setValueState("None");
                // this.byId("ccCode").setValue("");
                // this.byId("ccCode1").setValue("");
                // this.byId("ccCode2").setValue("");
                // this.byId("ccCode3").setValue("");

                // this.byId("retailPcTP").setValue("");
                // this.byId("storagePcTP").setValue("");
                // this.byId("tenPcTP").setValue("");
                // this.byId("mgmtPcTP").setValue("");
                
                this.getView().byId("address").setText("");
                this.getView().byId("plantInput").setValue("");
                this.getView().byId("propertyInput").setValue("");
                // this.byId("ccCode1").setValue("");
                // this.byId("ccCodeTp1").setValue("");
                // this.byId("ccCodeTp2").setValue("");
                // this.byId("ccCodeTp3").setValue("");
                // this.byId("retailPcTP").setValueState("None");
                // this.byId("storagePcTP").setValueState("None");
                // this.byId("tenPcTP").setValueState("None");
                // this.byId("mgmtPcTP").setValueState("None");

                // this.byId("startdate").setValue("");
                // this.byId("startdate1").setValue("");
                // this.byId("startdate2").setValue("");
                // this.byId("startdate3").setValue("");
                // this.byId("startdateTp").setValue("");
                // this.byId("startdateTp1").setValue("");
                // this.byId("startdateTp2").setValue("");
                // this.byId("startdateTp3").setValue("");
              
                //that.getOwnerComponent().getModel("plantsModel")
              
                
            },

            createNewProperty: function(){
                const that = this;
                const sPlant = this.getOwnerComponent().plant
                const LegacyPropertyNumber = this.getOwnerComponent().LegacyPropertyNumber
                const payload = {
                    Plant: sPlant,
                    LegacyPropertyNumber: LegacyPropertyNumber
                }

                //const sPlantModel = this.getView().getModel("plantsModel").getData().filter((items) => items.Werks === payload.Plant);
                const sPlantModel = this.getView().getModel("pResultModel").getData();
                if (sPlantModel?.length){
                    this.SavePCTableData();
                } else {
                this._oModel.create(`/PropertyMasterSet`, payload,{
                    success: function(){
                       //MessageToast.show("Saved Successfully");
                       that.SavePCTableData();
                    },
                    error: function (oData) {
                        MessageToast.show("Something went wrong with Service")
                    }

                })
                }
            },
            onPressSave: function(){
                this.BusyDialog.open();
                //const that = this;
                //let payload;
                //let propType;
                const groupedData = {};
                let ungroupedData = [];
                //let sTime = "T00:00:00";
                // oModel = this.getOwnerComponent().getModel("plantsModel").getData();
                //const sProperty = this.getOwnerComponent().getModel("plantsModel").getProperty("/plant");
                //const sFIlterModel = oModel.filter((item)=> item.Werks === sProperty)
                // const sOrt01 = sFIlterModel[0].Ort01
                // const sLand = sFIlterModel[0].Land1
                // const sName1 = sFIlterModel[0].Name1;
                // const sName2 = sFIlterModel[0].Name2;
                // const sRegion = sFIlterModel[0].Regio;
                // const sPin = sFIlterModel[0].Pstlz;

                // let sRadioButtonSelectedOwn = this.byId("rb1").getSelected();
                // //let sRadioButtonSelectedTP = this.byId("rb2").getSelected();
                


                // if (sRadioButtonSelectedOwn === true) {
                //     propType = "O"
                // } else {
                //     propType = "T"
                // }

                //     const sPlant = this.getOwnerComponent().plant
                //     const LegacyPropertyNumber = this.getOwnerComponent().LegacyPropertyNumber
                     var bValidation = true;
                    const oModelPC = this.byId("idPCTable").getModel("profitCenterModel");
                    if (oModelPC){
                    const oModelData = oModelPC.getData();
                    //var regex = '/\d/g';
                    oModelData.forEach((item) => {
                        // Extract the suffix from the Prctr value
                        const suffix = item.Prctr.slice(-1);

                        if (/\d/.test(suffix)) {
                            bValidation = false
                            ungroupedData.push(item)
                        } else {
                            //bValidation = true
                        }
                        
                        // Check if the suffix key exists in groupedData, if not, create it
                        if (!groupedData[suffix]) {
                          groupedData[suffix] = [];
                        }
                        
                        // Push the item into the corresponding suffix group
                        groupedData[suffix].push(item);
                      });


                    if (groupedData.R === undefined && bValidation === true){
                    this.BusyDialog.close();
                    return MessageToast.show("Missing Storage Profit Center");
                    } else {
                        this.createNewProperty();
                      }
                    }

            },
            SavePCTableData: function(){

                const that = this;
                let payload;
                let propType;
                const groupedData = {};
                let ungroupedData = [];
                let sTime = "T00:00:00";
                const oModel = this.getOwnerComponent().getModel("plantsModel").getData();
                const sProperty = this.getOwnerComponent().getModel("plantsModel").getProperty("/plant");
                const sFIlterModel = oModel.filter((item)=> item.Werks === sProperty)
                const sOrt01 = sFIlterModel[0].Ort01
                const sCountry = sFIlterModel[0].Land1
                const sName1T001w = sFIlterModel[0].Name2Adrc;
                const sName1 = sFIlterModel[0].Name1;
                const sState = sFIlterModel[0].Regio;
                const sPin = sFIlterModel[0].Pstlz;
                const sCounty = sFIlterModel[0].City2;
                const sStreet = sFIlterModel[0].Street;

                let sRadioButtonSelectedOwn = this.byId("rb1").getSelected();
                //let sRadioButtonSelectedTP = this.byId("rb2").getSelected();
                


                if (sRadioButtonSelectedOwn === true) {
                    propType = "O"
                } else {
                    propType = "T"
                }

                    const sPlant = this.getOwnerComponent().plant
                    const LegacyPropertyNumber = this.getOwnerComponent().LegacyPropertyNumber
                    //var bValidation = true;
                    const oModelPC = this.byId("idPCTable").getModel("profitCenterModel");
                    if (oModelPC){
                    const oModelData = oModelPC.getData();
                    //var regex = '/\d/g';
                    oModelData.forEach((item) => {
                        // Extract the suffix from the Prctr value
                        const suffix = item.Prctr.slice(-1);

                        if (/\d/.test(suffix)) {
                            //bValidation = false
                            ungroupedData.push(item)
                        } else {
                            //bValidation = true
                        }
                        
                        // Check if the suffix key exists in groupedData, if not, create it
                        if (!groupedData[suffix]) {
                          groupedData[suffix] = [];
                        }
                        // Push the item into the corresponding suffix group
                        groupedData[suffix].push(item);
                      });

                    if (groupedData.R){
                      var sStoragePCPrctr = groupedData.R[0].Prctr;
                      var sStoragePCLongText = groupedData.R[0].LongText;
                      var sStoragePCBukrs = groupedData.R[0].Bukrs;
                      var sStoragePCValidFrom = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(groupedData.R[0].Datab)) + sTime;
                      var sStoragePCValidTo = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(groupedData.R[0].Datbi)) + sTime;
                      var sStoragePCSegment = groupedData.R[0].Segment;
                        // if storage pc is more than one pick from here
                      if (groupedData.R.length > 1){
                          var sStorage2PCPrctr = groupedData.R[1].Prctr;
                          var sStorage2PCLongText = groupedData.R[1].LongText;
                          var sStorage2PCBukrs = groupedData.R[1].Bukrs;
                          var sStorage2PCValidFrom = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(groupedData.R[0].Datab)) + sTime;
                          var sStorage2PCValidTo = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(groupedData.R[0].Datbi)) + sTime;
                          var sStorage2PCSegment = groupedData.R[1].Segment;
                          
                        }
                      
                    }
                    // if storage pc is one pick from here
                    if (ungroupedData.length){
                      var sStorage2PCPrctr = ungroupedData[0].Prctr;
                      var sStorage2PCLongText = ungroupedData[0].LongText;
                      var sStorage2PCBukrs = ungroupedData[0].Bukrs;
                      var sStorage2PCValidFrom = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(ungroupedData[0].Datab)) + sTime;
                      var sStorage2PCValidTo = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(ungroupedData[0].Datbi)) + sTime;
                      var sStorage2PCSegment = ungroupedData[0].Segment;
                      
                    }

                    if (groupedData.T){
                      var sTennentPCPrctr = groupedData.T[0].Prctr;
                      var sTennentPCLongText = groupedData.T[0].LongText;
                      var sTennentPCBukrs = groupedData.T[0].Bukrs;
                      var sTennentPCValidFrom = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(groupedData.T[0].Datab)) + sTime;
                      var sTennentPCValidTo = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(groupedData.T[0].Datbi)) + sTime;
                      var sTennentPCSegment = groupedData.T[0].Segment;
                      
                    }
                    if (groupedData.A){
                      var sRetailPCPrctr = groupedData.A[0].Prctr;
                      var sRetailPCLongText = groupedData.A[0].LongText;
                      var sRetailPCBukrs = groupedData.A[0].Bukrs;
                      var sRetailPCValidFrom = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(groupedData.A[0].Datab)) + sTime;
                      var sRetailPCValidTo = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(groupedData.A[0].Datbi)) + sTime;
                      var sRetailPCSegment = groupedData.A[0].Segment;
                      
                    }


                    if (groupedData.E){
                      var sSolarPCPrctr = groupedData.E[0].Prctr;
                      var sSolarPCLongText = groupedData.E[0].LongText;
                      var sSolarPCBukrs = groupedData.E[0].Bukrs;
                      var sSolarPCValidFrom = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(groupedData.E[0].Datab)) + sTime;
                      var sSolarPCValidTo = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(groupedData.E[0].Datbi)) + sTime;
                      var sSolarPCSegment = groupedData.E[0].Segment;
                      
                    }

                    if (groupedData.M){
                      var sMgmtPCPrctr = groupedData.M[0].Prctr;
                      var sMgmtPCLongText = groupedData.M[0].LongText;
                      var sMgmtPCBukrs = groupedData.M[0].Bukrs;
                      var sMgmtPCValidFrom = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(groupedData.M[0].Datab)) + sTime;
                      var sMgmtPCValidTo = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(groupedData.M[0].Datbi)) + sTime;
                      var sMgmtPCSegment = groupedData.M[0].Segment;
                      
                    }
                    if (groupedData.C){
                      var sCommPCPrctr = groupedData.C[0].Prctr;
                      var sCommPCLongText = groupedData.C[0].LongText;
                      var sCommPCBukrs = groupedData.C[0].Bukrs;
                      var sCommPCValidFrom = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(groupedData.C[0].Datab)) + sTime;
                      var sCommPCValidTo = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(groupedData.C[0].Datbi)) + sTime;
                      var sCommPCSegment = groupedData.C[0].Segment;
                    }
                
                      payload = {
                          RetailPc: sRetailPCPrctr,
                          RetailPcLtext:  sRetailPCLongText,
                          RetailPcCc: sRetailPCBukrs,
                          RetailPcFromDate: sRetailPCValidFrom,
                          RetailPcToDate : sRetailPCValidTo,
                          RetailPcSegment : sRetailPCSegment,

                          StoragePc : sStoragePCPrctr,
                          StoragePcLtext : sStoragePCLongText,
                          StoragePcCc: sStoragePCBukrs,
                          StoragePcFromDate: sStoragePCValidFrom,
                          StoragePcToDate: sStoragePCValidTo,
                          StoragePcSegment: sStoragePCSegment,
                        
                          StorageCbtPc: sStorage2PCPrctr,
                          StorageCbtPcLtext: sStorage2PCLongText,
                          StorageCbtPcCc: sStorage2PCBukrs,
                          StorageCbtPcFromDate: sStorage2PCValidFrom,
                          StorageCbtPcToDate: sStorage2PCValidTo,
                          StorageCbtPcSegment: sStorage2PCSegment,

                          CommercialPc: sCommPCPrctr,
                          CommercialPcLtext: sCommPCLongText,
                          CommercialPcCc: sCommPCBukrs,
                          CommercialPcFromDate: sCommPCValidFrom,
                          CommercialPcToDate: sCommPCValidTo,
                          CommercialPcSegment: sCommPCSegment,

                          TennentInsPc: sTennentPCPrctr,
                          TennentInsPcLtext: sTennentPCLongText,
                          TennentInsPcCc: sTennentPCBukrs,
                          TennentInsPcFromDate: sTennentPCValidFrom,
                          TennentInsPcToDate: sTennentPCValidTo,
                          TennentInsPcSegment: sTennentPCSegment,

                          ManagmentPc: sMgmtPCPrctr,
                          ManagmentPcLtext: sMgmtPCLongText,
                          ManagmentPcCc: sMgmtPCBukrs,
                          ManagmentPcFromDate: sMgmtPCValidFrom,
                          ManagmentPcToDate: sMgmtPCValidTo,
                          ManagmentPcSegment: sMgmtPCSegment,

                          SolarEnergyPc: sSolarPCPrctr,
                          SolarEnergyPcLtext: sSolarPCLongText,
                          SolarEnergyPcCc: sSolarPCBukrs,
                          SolarEnergyPcFromDate: sSolarPCValidFrom,
                          SolarEnergyPcToDate: sSolarPCValidTo,
                          SolarEnergyPcSegment: sSolarPCSegment,

                          City: sOrt01,
                          Street: sStreet,
                          Description: sName1T001w,
                          MailingName: sName1,
                          Country: sCountry,
                          County: sCounty,
                          PostalCode: sPin,
                          State: sState,
                          PropertyType: propType

                      }
                    

                 const uri= `/PropertyMasterSet(Plant='${sPlant}',LegacyPropertyNumber='${LegacyPropertyNumber}')`
      
                  this._oModel.update(uri, payload, {
                      success: function (oData) {
                          that.BusyDialog.close();
                          //that.getView().byId("savandcontmain").setEnabled(false);
                          
                         MessageToast.show("Saved Successfully");
                      },
                      error: function (error) {
                          that.BusyDialog.close();
                          MessageToast.show("Something went wrong with Service")
                      }
                  })
                }

            },


            onValueHelpDialogClosePlant: function (oEvent) {
                const that = this;
                var sTitle,
                oItem = oEvent.getParameter("selectedItem");
                let sPlant = oItem.getBindingContext("plantsModel").getObject().Werks
                //oEvent.getSource().getBinding("items").filter([]);
    
                if (!oItem) {
                    return;
                }
                sTitle = sPlant;
                this.getView().byId("plantInput").setValue(sTitle);
                this.getView().byId("address").setText("");
                
                const sSelectedPlantStreet = oItem.getBindingContext("plantsModel").getObject().Street
                const sOrt01 = oItem.getBindingContext("plantsModel").getObject().Ort01
                const sLand = oItem.getBindingContext("plantsModel").getObject().Land1
                const sName1T001 = oItem.getBindingContext("plantsModel").getObject().Name2Adrc;
                const sName2 = oItem.getBindingContext("plantsModel").getObject().Name2;
                const sRegion = oItem.getBindingContext("plantsModel").getObject().Regio
                const sPin = oItem.getBindingContext("plantsModel").getObject().Pstlz
                const concatedAddress = `${sName1T001} ${sSelectedPlantStreet} ${sOrt01} ${sRegion} ${sPin}`;
                const titleAddress = `${sName1T001} ${sSelectedPlantStreet} ${sOrt01} ${sRegion} ${sPin}`;
                
                //const sProperty = oItem.getBindingContext("plantsModel").getObject().LegacyPropertyNumber;
                this.getOwnerComponent().plant = oItem.getBindingContext("plantsModel").getObject().Werks;
                const sProperty = oItem.getBindingContext("plantsModel").getObject().Name2;
                if(sProperty !== ""){
                    // MessageBox.confirm(
                    //             `Property Details for the plant ${sTitle} is available. Do you want to change?`,
                    //             {
                    //                 title: "Confirmation",
                    //                 actions: [MessageBox.Action.YES, MessageBox.Action.CANCEL],
                    //                 emphasizedAction: MessageBox.Action.YES,
                    //                  onClose: function (oAction) {
                    //                                 if (oAction === MessageBox.Action.YES) {
                                                        that.getOwnerComponent().getModel("plantsModel").setProperty("/street", concatedAddress);
                                                        that.getOwnerComponent().getModel("plantsModel").setProperty("/address", titleAddress);
                                                        that.getOwnerComponent().getModel("plantsModel").setProperty("/property", sProperty)
                                                      
                                        //             } else {
                                        //                 // Handle the "Cancel" button action or do nothing if canceled
                                        //             }
                                        //         }
                                        //     }
                                        // );
                                    } else {
                                            MessageBox.error(
                                                `Property Details does not exist for the plant ${sTitle}`,
                                                {
                                                    title: "Error",
                                                    actions: [MessageBox.Action.OK],
                                                    onClose: function (oAction) {
                                                        if (oAction === MessageBox.Action.OK) {
                                                            that.getView().getModel("oVisModel").setProperty("/visibilityForPTypeBlock", false);
                        
                                                        } else {
                                                            // Handle the "Cancel" button action or do nothing if canceled
                                                        }
                                                    }
                                                }
                                            );

                }
            },

            onValueHelpDialogCloseProperty: function (oEvent) {
                const that = this;
                var sTitle,
                oItem = oEvent.getParameter("selectedItem");
                let sProperty = oItem.getBindingContext("plantsModel").getObject().Name2
                //oEvent.getSource().getBinding("items").filter([]);
    
                if (!oItem) {
                    return;
                }
                sTitle = sProperty;
                this.getView().byId("propertyInput").setValue(sTitle);
                this.getView().byId("address").setText("");
                
                const sSelectedPlantStreet = oItem.getBindingContext("plantsModel").getObject().Street
                const sOrt01 = oItem.getBindingContext("plantsModel").getObject().Ort01
                const sLand = oItem.getBindingContext("plantsModel").getObject().Land1
                const sName1T001 = oItem.getBindingContext("plantsModel").getObject().Name2Adrc;
                const sName2 = oItem.getBindingContext("plantsModel").getObject().Name2;
                const sRegion = oItem.getBindingContext("plantsModel").getObject().Regio
                const sPin = oItem.getBindingContext("plantsModel").getObject().Pstlz
                const concatedAddress = `${sName1T001} ${sSelectedPlantStreet} ${sOrt01} ${sRegion} ${sPin}`
                const titleAddress = `${sName1T001} ${sSelectedPlantStreet} ${sOrt01} ${sRegion} ${sPin}`
                //const sProperty = oItem.getBindingContext("plantsModel").getObject().LegacyPropertyNumber;
                this.getOwnerComponent().plant = oItem.getBindingContext("plantsModel").getObject().Werks;
                const sPlant = oItem.getBindingContext("plantsModel").getObject().Werks;
                if(sPlant !== ""){
                  
                    that.getOwnerComponent().getModel("plantsModel").setProperty("/street", concatedAddress);
                    that.getOwnerComponent().getModel("plantsModel").setProperty("/address", titleAddress);
                    that.getOwnerComponent().getModel("plantsModel").setProperty("/plant", sPlant)
                                     
                        } else {
                             MessageBox.error(
                             `Property Details does not exist for the Property ${sTitle}`,
                                {
                                     title: "Error",
                                    actions: [MessageBox.Action.OK],
                                    onClose: function (oAction) {
                                        if (oAction === MessageBox.Action.OK) {
                                            that.getView().getModel("oVisModel").setProperty("/visibilityForPTypeBlock", false);
                        
                                        } else {
                                                // Handle the "Cancel" button action or do nothing if canceled
                                            }
                                        }
                                     }
                            );

                }
            },


            onValueHelpDialogSearchPlant: function (oEvent) {
                var sValue = oEvent.getParameter("value");
                var oFilter = new Filter("Werks", FilterOperator.Contains, sValue);

                oEvent.getSource().getBinding("items").filter([oFilter]);
            },
            onValueHelpDialogSearchPC: function (oEvent) {
                var sValue = oEvent.getParameter("value");
                var oFilter = new Filter("Prctr", FilterOperator.Contains, sValue);

                oEvent.getSource().getBinding("items").filter([oFilter]);
            },

            onValueHelpDialogSearchProperty: function (oEvent) {
                var sValue = oEvent.getParameter("value");
                var oFilter = new Filter("Name2", FilterOperator.Contains, sValue);

                oEvent.getSource().getBinding("items").filter([oFilter]);
            },

            onRefresPCs: function(){
                const that = this;
                var FilterPlant = new sap.ui.model.Filter('Plant', 'EQ', this.getOwnerComponent().plant);
                var FilterProperty = new sap.ui.model.Filter('LegacyPropertyNumber', 'EQ', this.getOwnerComponent().LegacyPropertyNumber);
                var sActioFilter = new sap.ui.model.Filter('Action', 'EQ', 'REFRESH');
                var FinalFIlter = new sap.ui.model.Filter([FilterPlant, FilterProperty, sActioFilter], true);
                this.BusyDialog.open();
                    that._oModel.read(`/ProfitCenterSet`, {
                     filters: [FinalFIlter],
                     and: false,
                        success: function (oData) {
                            that.BusyDialog.close();
                            const oModel = new JSONModel(oData.results);
                            //const filterData = oModel.getData().filter(item => (item.LegacyPropertyNumber === that.getOwnerComponent().LegacyPropertyNumber))
                            if(oData.results.length){
                             that.getView().setModel(oModel, "profitCenterModel");
                             sap.ui.getCore().setModel(oModel, "profitCenterModel");
                             that.getView().getModel("profitCenterModel").refresh();
                         }
                        },
                        error: function (oData) {
                             that.BusyDialog.close();
                            MessageToast.show("Something went wrong with Service")
                        }
                    });
               
 

            }

        });
    });
