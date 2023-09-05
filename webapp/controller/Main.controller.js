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

        return BaseController.extend("com.public.storage.pao.controller.Main", {
            formatter: formatter,
            onInit: function () {
                _oController = this;
                this.getOwnerComponent().plant = ""
                const that = this;
                this._oModel = sap.ui.getCore().getModel("mainModel");
                const oVisibilityModel = new JSONModel({
                    visibliltyForThirdParty: false,
                    visibliltyForOwner: false,
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
                this.readRetailPC();
                this.readStoragePC();
                this.readTennentPC();
                this.readManagementPC();
                this.readCommPC();
                
            },

            readRetailPC: function(){
                const that = this;
                this.BusyDialog.open();
                this._oModel.read(`/RetailProfitCenter2Set`, {
                        success: function (oData) {
                            that.BusyDialog.close();
                            const oModel = new JSONModel(oData.results);
                            that.getView().setModel(oModel, "retailpcModel")
                            sap.ui.getCore().setModel(oModel, "retailpcModel");
                        },
                        error: function (oData) {
                            that.BusyDialog.close();
                            MessageToast.show("Something went wrong with Service")
                        }
                    });
            },
    
            readStoragePC: function(){
                const that = this;
                this.BusyDialog.open();
                this._oModel.read(`/StorageProfitCenter2Set`, {
                        success: function (oData) {
                            that.BusyDialog.close();
                            const oModel = new JSONModel(oData.results);
                            that.getView().setModel(oModel, "storageModel")
                            sap.ui.getCore().setModel(oModel, "storageModel");
                        },
                        error: function (oData) {
                            that.BusyDialog.close();
                            MessageToast.show("Something went wrong with Service")
                        }
                    });
            },
    
            readTennentPC: function(){
                const that = this;
                this.BusyDialog.open();
                this._oModel.read(`/TenentInsProfitCenter2Set`, {
                        success: function (oData) {
                            that.BusyDialog.close();
                            const oModel = new JSONModel(oData.results);
                            that.getView().setModel(oModel, "tennentModel")
                            sap.ui.getCore().setModel(oModel, "tennentModel");
                        },
                        error: function (oData) {
                            that.BusyDialog.close();
                            MessageToast.show("Something went wrong with Service")
                        }
                    });
            },
    
            readManagementPC: function(){
                const that = this;
                this.BusyDialog.open();
                this._oModel.read(`/ManagementProfitCenter2Set`, {
                        success: function (oData) {
                            that.BusyDialog.close();
                            const oModel = new JSONModel(oData.results);
                            that.getView().setModel(oModel, "mgmtModel")
                            sap.ui.getCore().setModel(oModel, "mgmtModel");
                        },
                        error: function (oData) {
                            that.BusyDialog.close();
                            MessageToast.show("Something went wrong with Service")
                        }
                    });
            },
    
            readCommPC: function(){
                const that = this;
                this.BusyDialog.open();
                this._oModel.read(`/CommercialProfitCenter2Set`, {
                        success: function (oData) {
                            that.BusyDialog.close();
                            const oModel = new JSONModel(oData.results);
                            that.getView().setModel(oModel, "commPcModel")
                            sap.ui.getCore().setModel(oModel, "commPcModel");
                        },
                        error: function (oData) {
                            that.BusyDialog.close();
                            MessageToast.show("Something went wrong with Service")
                        }
                    });
            },

            _onRouteMatched: function(oEvent){
                const Plant = this.getOwnerComponent().plant;
                const LegacyPropertyNumber= this.getOwnerComponent().LegacyPropertyNumber
                this._oModel = sap.ui.getCore().getModel("mainModel");
                //this.readPropertyData(Plant, LegacyPropertyNumber)
            },

            readPropertyMasterData: function () {
                const that = this;
                this.BusyDialog.open()
                return new Promise(function(){
                    that._oModel.read(`/PlantMasterSet`, {
                        success: function (oData) {
                            that.BusyDialog.close();
                            const oModel = new JSONModel(oData.results);
                            that.getOwnerComponent().setModel(oModel, "plantsModel")
                            sap.ui.getCore().setModel(oModel, "plantsModel");
                        },
                        error: function (oData) {
                            MessageToast.show("Something went wrong with Service")
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
                   
                    that.readPropertyMasterData();
                    that.BusyDialog.close();
                    // Create a filter for the binding
                    oDialog.getBinding("items").filter([new Filter("Name", FilterOperator.Contains, sInputValue)]);
                    // Open ValueHelpDialog filtered by the input's value
                    oDialog.open(sInputValue);
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
                    that.readPropertyMasterData();
                    that.BusyDialog.close();
                    oDialog.getBinding("items").filter([new Filter("Name", FilterOperator.Contains, sInputValue)]);
                    // Open ValueHelpDialog filtered by the input's value
                    oDialog.open(sInputValue);
                });
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

            onValueHelpRequestReatilPC: function (oEvent) {
                const that =this;
                var sInputValue = oEvent.getSource().getValue(),
                    oView = this.getView();

                if (!this._pValueHelpDialogPropery) {
                    this._pValueHelpDialogPropery = Fragment.load({
                        id: oView.getId(),
                        name: "com.public.storage.pao.fragments.Main.RetailPC",
                        controller: this
                    }).then(function (oDialog) {
                        oView.addDependent(oDialog);
                        return oDialog;
                    });
                }
                //this.BusyDialog.open()
                this._pValueHelpDialogPropery.then(function (oDialog) {
                    that.readRetailPC();
                    //that.BusyDialog.close();
                    // Create a filter for the binding
                   // oDialog.getBinding("items").filter([new Filter("Name", FilterOperator.Contains, sInputValue)]);
                    // Open ValueHelpDialog filtered by the input's value
                    oDialog.open(sInputValue);
                });
            },

            onValueHelpRequestStoragePC: function (oEvent) {
                const that =this;
                var sInputValue = oEvent.getSource().getValue(),
                    oView = this.getView();

                if (!this._pValueHelpStoragePC) {
                    this._pValueHelpStoragePC = Fragment.load({
                        id: oView.getId(),
                        name: "com.public.storage.pao.fragments.Main.StoragePC",
                        controller: this
                    }).then(function (oDialog) {
                        oView.addDependent(oDialog);
                        return oDialog;
                    });
                }
                //this.BusyDialog.open()
                this._pValueHelpStoragePC.then(function (oDialog) {
                    that.readStoragePC();
                    //that.BusyDialog.close();
                    // Create a filter for the binding
                    //oDialog.getBinding("items").filter([new Filter("Name", FilterOperator.Contains, sInputValue)]);
                    // Open ValueHelpDialog filtered by the input's value
                    oDialog.open(sInputValue);
                });
            },

            onValueHelpRequestTennentPC: function (oEvent) {
                const that =this;
                var sInputValue = oEvent.getSource().getValue(),
                    oView = this.getView();

                if (!this._pValueHelpTennentPC) {
                    this._pValueHelpTennentPC = Fragment.load({
                        id: oView.getId(),
                        name: "com.public.storage.pao.fragments.Main.TennantPC",
                        controller: this
                    }).then(function (oDialog) {
                        oView.addDependent(oDialog);
                        return oDialog;
                    });
                }
                //this.BusyDialog.open()
                this._pValueHelpTennentPC.then(function (oDialog) {
                    that.readTennentPC();
                    //that.BusyDialog.close();
                    // Create a filter for the binding
                    //oDialog.getBinding("items").filter([new Filter("Name", FilterOperator.Contains, sInputValue)]);
                    // Open ValueHelpDialog filtered by the input's value
                    oDialog.open(sInputValue);
                });
            },

            onValueHelpRequestCommPC: function (oEvent) {
                const that =this;
                var sInputValue = oEvent.getSource().getValue(),
                    oView = this.getView();

                if (!this._pValueHelpCommPC) {
                    this._pValueHelpCommPC = Fragment.load({
                        id: oView.getId(),
                        name: "com.public.storage.pao.fragments.Main.CommercialPC",
                        controller: this
                    }).then(function (oDialog) {
                        oView.addDependent(oDialog);
                        return oDialog;
                    });
                }
                //this.BusyDialog.open()
                this._pValueHelpCommPC.then(function (oDialog) {
                    that.readCommPC();
                    //that.BusyDialog.close();
                    // Create a filter for the binding
                    //oDialog.getBinding("items").filter([new Filter("Name", FilterOperator.Contains, sInputValue)]);
                    // Open ValueHelpDialog filtered by the input's value
                    oDialog.open(sInputValue);
                });
            },

            onValueHelpRequestMgmtPC: function (oEvent) {
                const that =this;
                var sInputValue = oEvent.getSource().getValue(),
                    oView = this.getView();

                if (!this._pValueHelpMgmtPC) {
                    this._pValueHelpMgmtPC = Fragment.load({
                        id: oView.getId(),
                        name: "com.public.storage.pao.fragments.Main.ManagementPC",
                        controller: this
                    }).then(function (oDialog) {
                        oView.addDependent(oDialog);
                        return oDialog;
                    });
                }
                //this.BusyDialog.open()
                this._pValueHelpMgmtPC.then(function (oDialog) {
                    that.readManagementPC();
                    //that.BusyDialog.close();
                    // Create a filter for the binding
                    //oDialog.getBinding("items").filter([new Filter("Name", FilterOperator.Contains, sInputValue)]);
                    // Open ValueHelpDialog filtered by the input's value
                    oDialog.open(sInputValue);
                });
            },



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
                var oItem = oEvent.getParameter("selectedItem");
                var oText = oItem ? oItem.getKey() : "";
                this.getView().byId("propertyInput").setValue(oText);
               
                const sSelectedPlantStreet = oItem.getBindingContext("plantsModel").getObject().Stras
                const sOrt01 = oItem.getBindingContext("plantsModel").getObject().Ort01
                const sLand = oItem.getBindingContext("plantsModel").getObject().Land1
                const sName1 = oItem.getBindingContext("plantsModel").getObject().Name1;
                const sName2 = oItem.getBindingContext("plantsModel").getObject().Name2;
                const sRegion = oItem.getBindingContext("plantsModel").getObject().Regio
                const sPin = oItem.getBindingContext("plantsModel").getObject().Pstlz
                const concatedAddress = `${sName1} ${sName2} ${sSelectedPlantStreet} ${sOrt01} ${sRegion} ${sPin}`
                const titleAddress = `${sName1} ${sName2} ${sSelectedPlantStreet}`
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
                var oItem = oEvent.getParameter("selectedItem");
                var oText = oItem ? oItem.getKey() : "";
                this.getView().byId("plantInput").setValue(oText);
               
                const sSelectedPlantStreet = oItem.getBindingContext("plantsModel").getObject().Stras
                const sOrt01 = oItem.getBindingContext("plantsModel").getObject().Ort01
                const sLand = oItem.getBindingContext("plantsModel").getObject().Land1
                const sName1 = oItem.getBindingContext("plantsModel").getObject().Name1;
                const sName2 = oItem.getBindingContext("plantsModel").getObject().Name2;
                const sRegion = oItem.getBindingContext("plantsModel").getObject().Regio
                const sPin = oItem.getBindingContext("plantsModel").getObject().Pstlz
                const concatedAddress = `${sName1} ${sName2} ${sSelectedPlantStreet} ${sOrt01} ${sRegion} ${sPin}`
                const titleAddress = `${sName1} ${sName2} ${sSelectedPlantStreet}`
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

            onSuggestionItemSelected: function (oEvent) {
                const that = this;
                let sCompanyCodeRetail, sDatabRetail, finalStartDateRetail, sPCRetail;
                let sCompanyCodeStorage,sDatabStorage, finalStartDateStorage,sPCStorage;
                let sCompanyCodeCommPc,sDatabCommPc, finalStartDateCommPc,sPCComm;
                let sCompanyCodeTennent,sDatabTennet, finalStartDateTennet,sPCTennet;

                let sCompanyCodeRetailTP, sDatabRetailTP, finalStartDateRetailTP, sPCRetailTP;
                let sCompanyCodeStorageTP,sDatabStorageTP, finalStartDateStorageTP,sPCStorageTP;
                let sCompanyCodeMgmtPcTP,sDatabMgmtPcTP, finalStartDateMgmtPcTP,sPCMgmtTP;
                let sCompanyCodeTennentTP,sDatabTennetTP, finalStartDateTennetTP,sPCTennetTP;
                var oSelectedItem = oEvent.getParameter("selectedItem");
                if (oSelectedItem){
                    
                }
                //var sCode = oEvent.getSource().getValue();
                var oText = oSelectedItem ? oSelectedItem.getKey() : "";
                const sSelectedRBButton = this.getView().byId("rbg1").getSelectedButton().getText();
                const sIDRetail = oEvent.getSource().getId().includes("retailPc");
                const sIDStorage = oEvent.getSource().getId().includes("storagePc");
                const sIDTent = oEvent.getSource().getId().includes("tenPc");
                const sIDcommPC = oEvent.getSource().getId().includes("commPc");
                const sIDRetailTP = oEvent.getSource().getId().includes("retailPcTP");
                const sIDStorageTP = oEvent.getSource().getId().includes("storagePcTP");
                const sIDTentTP = oEvent.getSource().getId().includes("tenPcTP");
                const sIDmgmtPCTP = oEvent.getSource().getId().includes("mgmtPcTP");
                if (sSelectedRBButton ==="Own"){
                    if (sIDRetail === true){
                        this.byId("retailPc").setValueState(sap.ui.core.ValueState.None);
                        sPCRetail = oSelectedItem.getBindingContext("retailpcModel").getObject().Prctr;
                        sCompanyCodeRetail = oSelectedItem.getBindingContext("retailpcModel").getObject().Bukrs;
                        sDatabRetail = oSelectedItem.getBindingContext("retailpcModel").getObject().Datab;
                        finalStartDateRetail = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDatabRetail));
                        // this.byId("retailPc").setValue(sPCRetail);
                        // this.byId("ccCode").setValue(sCompanyCodeRetail);
                        // this.byId("startdate").setValue(finalStartDateRetail);

                        this.getView().getModel("plantBasicDetailsModel").setProperty("/0/RetailPc", sPCRetail);
                        this.getView().getModel("plantBasicDetailsModel").setProperty("/0/CompanyCode1", sCompanyCodeRetail);
                        //this.getView().getModel("plantBasicDetailsModel").setProperty("/0/RetailPCAdate", finalStartDateRetail);
                        this.byId("startdate").setValue(finalStartDateRetail);
                        
                        //this.rtailPC = sCode
                    }
                    if(sIDStorage === true){
                        this.byId("storagePc").setValueState(sap.ui.core.ValueState.None);
                        sPCStorage = oSelectedItem.getBindingContext("storageModel").getObject().Prctr;
                        sCompanyCodeStorage = oSelectedItem.getBindingContext("storageModel").getObject().Bukrs;
                        sDatabStorage = oSelectedItem.getBindingContext("storageModel").getObject().Datab;
                        finalStartDateStorage = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDatabStorage));
                        // this.byId("storagePc").setValue(sPCStorage);
                        // this.byId("ccCode1").setValue(sCompanyCodeStorage);
                        // this.byId("startdate1").setValue(finalStartDateStorage);

                        this.getView().getModel("plantBasicDetailsModel").setProperty("/0/StoragePc", sPCStorage);
                        this.getView().getModel("plantBasicDetailsModel").setProperty("/0/CompanyCode2", sCompanyCodeStorage);
                        this.getView().getModel("plantBasicDetailsModel").setProperty("/0/StoragePcAdate", finalStartDateStorage);
                        //this.getView().getModel("plantBasicDetailsModel").setProperty("/0/startdate1", CddStartDate)
                        this.byId("startdate1").setValue(finalStartDateStorage);
                        //this.storagePC = sCode
                    } 
                    if(sIDcommPC === true){
                        this.byId("commPc").setValueState(sap.ui.core.ValueState.None);
                        sPCComm = oSelectedItem.getBindingContext("commPcModel").getObject().Prctr;
                        sCompanyCodeCommPc = oSelectedItem.getBindingContext("commPcModel").getObject().Bukrs;
                        sDatabCommPc = oSelectedItem.getBindingContext("commPcModel").getObject().Datab;
                        finalStartDateCommPc = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDatabCommPc));
                        // this.byId("commPc").setValue(sPCComm);
                        // this.byId("ccCode3").setValue(sCompanyCodeCommPc);
                        this.byId("startdate3").setValue(finalStartDateCommPc);

                        this.getView().getModel("plantBasicDetailsModel").setProperty("/0/CommercialPc", sPCComm);
                        this.getView().getModel("plantBasicDetailsModel").setProperty("/0/CompanyCode4", sCompanyCodeCommPc);
                        //this.getView().getModel("plantBasicDetailsModel").setProperty("/0/CommercialPcAdate", finalStartDateCommPc);
                        //this.commPC = sCode
                    } 
                    if(sIDTent === true){
                        this.byId("tenPc").setValueState(sap.ui.core.ValueState.None);
                        sPCTennet = oSelectedItem.getBindingContext("tennentModel").getObject().Prctr;
                        sCompanyCodeTennent = oSelectedItem.getBindingContext("tennentModel").getObject().Bukrs;
                        sDatabTennet = oSelectedItem.getBindingContext("tennentModel").getObject().Datab;
                        finalStartDateTennet = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDatabTennet));
                        

                        this.getView().getModel("plantBasicDetailsModel").setProperty("/0/TennentInsPc", sPCTennet);
                        this.getView().getModel("plantBasicDetailsModel").setProperty("/0/CompanyCode3", sCompanyCodeTennent);
                        //this.getView().getModel("plantBasicDetailsModel").setProperty("/0/TennentinPcAdate", finalStartDateTennet);
                        // this.byId("tenPc").setValue(sPCTennet);
                        // this.byId("ccCode2").setValue(sCompanyCodeTennent);
                         this.byId("startdate2").setValue(finalStartDateTennet);
                        //this.tennentPC = sCode
                    }

                } else {
                    
                    if (sIDRetailTP === true){
                        this.byId("retailPcTP").setValueState(sap.ui.core.ValueState.None);
                        sPCRetailTP = oSelectedItem.getBindingContext("retailpcModel").getObject().Prctr;
                        sCompanyCodeRetailTP = oSelectedItem.getBindingContext("retailpcModel").getObject().Bukrs;
                        sDatabRetailTP = oSelectedItem.getBindingContext("retailpcModel").getObject().Datab;
                        finalStartDateRetailTP = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDatabRetailTP));
                        
                        this.getView().getModel("plantBasicDetailsModel").setProperty("/0/RetailPc", sPCRetailTP);
                        this.getView().getModel("plantBasicDetailsModel").setProperty("/0/CompanyCode1", sCompanyCodeRetailTP);
                        //this.getView().getModel("plantBasicDetailsModel").setProperty("/0/RetailPCAdate", finalStartDateRetailTP);
                        // this.byId("ccCodePcTp").setValue(sCompanyCodeRetailTP);
                         this.byId("startdatereatilPcTp").setValue(finalStartDateRetailTP);
                        // this.byId("retailPcTP").setValue(sCode);
                        //this.rtailPCTP = sCode
                    } 
                    if(sIDStorageTP === true){
                        this.byId("storagePcTP").setValueState(sap.ui.core.ValueState.None);
                        sPCStorageTP = oSelectedItem.getBindingContext("storageModel").getObject().Prctr;
                        sCompanyCodeStorageTP = oSelectedItem.getBindingContext("storageModel").getObject().Bukrs;
                        sDatabStorageTP = oSelectedItem.getBindingContext("storageModel").getObject().Datab;
                        finalStartDateStorageTP = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDatabStorageTP));

                        this.getView().getModel("plantBasicDetailsModel").setProperty("/0/StoragePc", sPCStorageTP);
                        this.getView().getModel("plantBasicDetailsModel").setProperty("/0/CompanyCode2", sCompanyCodeStorageTP);
                        //this.getView().getModel("plantBasicDetailsModel").setProperty("/0/StoragePcAdate", finalStartDateStorageTP);
                        this.byId("startdateStoragePcTp").setValue(finalStartDateStorageTP);
                    } 
                    if(sIDTentTP === true){
                        this.byId("tenPcTP").setValueState(sap.ui.core.ValueState.None);
                        sPCTennetTP = oSelectedItem.getBindingContext("tennentModel").getObject().Prctr;
                        sCompanyCodeTennentTP = oSelectedItem.getBindingContext("tennentModel").getObject().Bukrs;
                        sDatabTennetTP = oSelectedItem.getBindingContext("tennentModel").getObject().Datab;
                        finalStartDateTennetTP = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDatabTennetTP));
                        // this.byId("tenPcTP").setValue(sPCTennetTP);
                        // this.byId("ccCodeTenTp").setValue(sCompanyCodeTennentTP);
                       
                        //this.managmentPCTP = sCode

                        this.getView().getModel("plantBasicDetailsModel").setProperty("/0/TennentInsPc", sPCTennetTP);
                        this.getView().getModel("plantBasicDetailsModel").setProperty("/0/CompanyCode3", sCompanyCodeTennentTP);
                        this.byId("startdateTanentPcTp").setValue(finalStartDateTennetTP);
                        //this.getView().getModel("plantBasicDetailsModel").setProperty("/0/TennentinPcAdate", finalStartDateTennetTP);
                    } 
                    if(sIDmgmtPCTP === true){
                        this.byId("mgmtPcTP").setValueState(sap.ui.core.ValueState.None);
                        sPCMgmtTP = oSelectedItem.getBindingContext("mgmtModel").getObject().Prctr;
                        sCompanyCodeMgmtPcTP = oSelectedItem.getBindingContext("mgmtModel").getObject().Bukrs;
                        sDatabMgmtPcTP = oSelectedItem.getBindingContext("mgmtModel").getObject().Datab;
                        finalStartDateMgmtPcTP = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDatabMgmtPcTP));

                        this.getView().getModel("plantBasicDetailsModel").setProperty("/0/ManagmentPc", sPCMgmtTP);
                        this.getView().getModel("plantBasicDetailsModel").setProperty("/0/CompanyCode5", sCompanyCodeMgmtPcTP);
                        //this.getView().getModel("plantBasicDetailsModel").setProperty("/0/ManagementPcAdate", finalStartDateMgmtPcTP);
                        
                        this.byId("startdateMgmtPcTp").setValue(finalStartDateMgmtPcTP);
                    }
                } 
               
            },

            onChangePCs: function(oEvent){
                const input = oEvent.getSource();
                const isInvalid = !input.getSelectedKey() && input.getValue().trim();
                input.setValueState(isInvalid ? "Error" : "None");

            },

            onValueHelpDialogClosePC: function (oEvent) {
                let sCompanyCodeRetail,sDatabRetail, finalStartDateRetail,sPCRetail
                let sCompanyCodeStorage,sDatabStorage, finalStartDateStorage,sPCStorage
                let sCompanyCodeCommPc,sDatabCommPc, finalStartDateCommPc,sPCComm
                let sCompanyCodeTennent,sDatabTennet, finalStartDateTennet,sPCTennet

                let sCompanyCodeRetailTP, sDatabRetailTP, finalStartDateRetailTP, sPCRetailTP;
                let sCompanyCodeStorageTP,sDatabStorageTP, finalStartDateStorageTP,sPCStorageTP;
                let sCompanyCodeMgmtPcTP,sDatabMgmtPcTP, finalStartDateMgmtPcTP,sPCMgmtTP;
                let sCompanyCodeTennentTP,sDatabTennetTP, finalStartDateTennetTP,sPCTennetTP;
                const sSelectedRBButton = this.getView().byId("rbg1").getSelectedButton().getText();
                let	oSelectedItem = oEvent.getParameter("selectedItem");
                //let oModel = oSelectedItem.getBindingContext()
               
                let sTitle = oEvent.getSource().getTitle();
                // oEvent.getSource().getBinding("items").filter([]);
                // if (!oSelectedItem) {
                //     return;
                // }
                if (!oSelectedItem) {
                    //oInput.resetProperty("value");
                    return;
                }
                //let sDescription = oSelectedItem.getDescription();
                //let sCode =  oSelectedItem.getTitle();

                if (sSelectedRBButton ==="Own"){
                    if (sTitle === "Retail PC"){
                        sPCRetail = oSelectedItem.getBindingContext("retailpcModel").getObject().Prctr;
                        sCompanyCodeRetail = oSelectedItem.getBindingContext("retailpcModel").getObject().Bukrs;
                        sDatabRetail = oSelectedItem.getBindingContext("retailpcModel").getObject().Datab;
                        finalStartDateRetail = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDatabRetail));
                       
                        this.getView().getModel("plantBasicDetailsModel").setProperty("/0/RetailPc", sPCRetail);
                        this.getView().getModel("plantBasicDetailsModel").setProperty("/0/CompanyCode1", sCompanyCodeRetail);
                        //this.getView().getModel("plantBasicDetailsModel").setProperty("/0/RetailPCAdate", finalStartDateRetail);
                        this.byId("startdate").setValue(finalStartDateRetail);
                        
                        //this.rtailPC = sCode
                    }
                    if(sTitle === "Storage PC"){
                        sPCStorage = oSelectedItem.getBindingContext("storageModel").getObject().Prctr;
                        sCompanyCodeStorage = oSelectedItem.getBindingContext("storageModel").getObject().Bukrs;
                        sDatabStorage = oSelectedItem.getBindingContext("storageModel").getObject().Datab;
                        finalStartDateStorage = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDatabStorage));
                       

                        this.getView().getModel("plantBasicDetailsModel").setProperty("/0/StoragePc", sPCStorage);
                        this.getView().getModel("plantBasicDetailsModel").setProperty("/0/CompanyCode2", sCompanyCodeStorage);
                        //this.getView().getModel("plantBasicDetailsModel").setProperty("/0/StoragePcAdate", finalStartDateStorage);
                        this.byId("startdate1").setValue(finalStartDateStorage);
                    }
                    if(sTitle === "Commercial PC"){
                        sPCComm = oSelectedItem.getBindingContext("commPcModel").getObject().Prctr;
                        sCompanyCodeCommPc = oSelectedItem.getBindingContext("commPcModel").getObject().Bukrs;
                        sDatabCommPc = oSelectedItem.getBindingContext("commPcModel").getObject().Datab;
                        finalStartDateCommPc = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDatabCommPc));
                      
                        this.getView().getModel("plantBasicDetailsModel").setProperty("/0/CommercialPc", sPCComm);
                        this.getView().getModel("plantBasicDetailsModel").setProperty("/0/ccCode3", sCompanyCodeCommPc);
                        //this.getView().getModel("plantBasicDetailsModel").setProperty("/0/CommercialPcAdate", finalStartDateCommPc);
                        this.byId("startdate3").setValue(finalStartDateCommPc);

                    } 
                    if(sTitle === "Tennent PC"){
                        sPCTennet = oSelectedItem.getBindingContext("tennentModel").getObject().Prctr;
                        sCompanyCodeTennent = oSelectedItem.getBindingContext("tennentModel").getObject().Bukrs;
                        sDatabTennet = oSelectedItem.getBindingContext("tennentModel").getObject().Datab;
                        finalStartDateTennet = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDatabTennet));
                     

                        this.getView().getModel("plantBasicDetailsModel").setProperty("/0/TennentInsPc", sPCTennet);
                        this.getView().getModel("plantBasicDetailsModel").setProperty("/0/CompanyCode3", sCompanyCodeTennent);
                        //this.getView().getModel("plantBasicDetailsModel").setProperty("/0/TennentinPcAdate", finalStartDateTennet);
                        this.byId("startdate2").setValue(finalStartDateTennet);
                    }

                } else {
                    if (sTitle === "Retail PC"){
                       
                        sPCRetailTP = oSelectedItem.getBindingContext("retailpcModel").getObject().Prctr;
                        sCompanyCodeRetailTP = oSelectedItem.getBindingContext("retailpcModel").getObject().Bukrs;
                        sDatabRetailTP = oSelectedItem.getBindingContext("retailpcModel").getObject().Datab;
                        finalStartDateRetailTP = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDatabRetailTP));
                        
                        this.getView().getModel("plantBasicDetailsModel").setProperty("/0/RetailPc", sPCRetailTP);
                        this.getView().getModel("plantBasicDetailsModel").setProperty("/0/CompanyCode1", sCompanyCodeRetailTP);
                        //this.getView().getModel("plantBasicDetailsModel").setProperty("/0/RetailPCAdate", finalStartDateRetailTP);
                        this.byId("startdatereatilPcTp").setValue(finalStartDateRetailTP);
                    } else if(sTitle === "Storage PC"){
                       
                        sPCStorageTP = oSelectedItem.getBindingContext("storageModel").getObject().Prctr;
                        sCompanyCodeStorageTP = oSelectedItem.getBindingContext("storageModel").getObject().Bukrs;
                        sDatabStorageTP = oSelectedItem.getBindingContext("storageModel").getObject().Datab;
                        finalStartDateStorageTP = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDatabStorageTP));
                        this.getView().getModel("plantBasicDetailsModel").setProperty("/0/StoragePc", sPCStorageTP);
                        this.getView().getModel("plantBasicDetailsModel").setProperty("/0/CompanyCode2", sCompanyCodeStorageTP);
                        //this.getView().getModel("plantBasicDetailsModel").setProperty("/0/StoragePcAdate", finalStartDateStorageTP);

                        this.byId("startdateStoragePcTp").setValue(finalStartDateRetailTP);
                    } 
                    else if(sTitle === "Tennent PC"){
                        
                        sPCTennetTP = oSelectedItem.getBindingContext("tennentModel").getObject().Prctr;
                        sCompanyCodeTennentTP = oSelectedItem.getBindingContext("tennentModel").getObject().Bukrs;
                        sDatabTennetTP = oSelectedItem.getBindingContext("tennentModel").getObject().Datab;
                        finalStartDateTennetTP = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(finalStartDateTennetTP));
                        this.getView().getModel("plantBasicDetailsModel").setProperty("/0/TennentInsPc", sPCTennetTP);
                        this.getView().getModel("plantBasicDetailsModel").setProperty("/0/CompanyCode3", sCompanyCodeTennentTP);
                        //this.getView().getModel("plantBasicDetailsModel").setProperty("/0/TennentinPcAdate", finalStartDateTennetTP);
                        this.byId("startdateTanentPcTp").setValue(finalStartDateTennetTP);
                        //this.tennentPCTP = sCode
                    } else if(sTitle === "Management PC"){

                       
                        sPCMgmtTP = oSelectedItem.getBindingContext("mgmtModel").getObject().Prctr;
                        sCompanyCodeMgmtPcTP = oSelectedItem.getBindingContext("mgmtModel").getObject().Bukrs;
                        sDatabMgmtPcTP = oSelectedItem.getBindingContext("mgmtModel").getObject().Datab;
                        finalStartDateMgmtPcTP = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDatabMgmtPcTP));
                        this.getView().getModel("plantBasicDetailsModel").setProperty("/0/ManagmentPc", sPCMgmtTP);
                        this.getView().getModel("plantBasicDetailsModel").setProperty("/0/CompanyCode5", sCompanyCodeMgmtPcTP);
                        this.byId("startdateMgmtPcTp").setValue(finalStartDateMgmtPcTP);
                        //this.getView().getModel("plantBasicDetailsModel").setProperty("/0/ManagementPcAdate", finalStartDateMgmtPcTP);
                    } 
                }  
            },

                    oncheckRetailPc: function(oEvent){
                            var oInput = oEvent.getSource();
                            var sValue = oInput.getValue();
                            const sId = oInput.getId();
                            // var oSuggestionModelRetail = this.getView().getModel("retailpcModel").getData();
                            // var oSuggestionModelStorage = this.getView().getModel("storageModel").getData();
                            // var oSuggestionModelTenant = this.getView().getModel("tennentModel").getData();
                            // var oSuggestionModelComm = this.getView().getModel("commPcModel").getData();
                            // var oSuggestionModelMgmt = this.getView().getModel("mgmtModel").getData();

                            // if (sId.includes() == ""){

                            // }
                            var oSuggestionModel = this.getView().getModel("retailpcModel").getData();
                
                            if (oSuggestionModel.indexOf(sValue) !== -1) {
                                oInput.setValueState(sap.ui.core.ValueState.None);
                            } else {
                                oInput.setValueState(sap.ui.core.ValueState.Error);
                            }

                        },
                    oncheckStoragePc: function(oEvent){
                        var oInput = oEvent.getSource();
                        var sValue = oInput.getValue();
                        var oSuggestionModel = this.getView().getModel("storageModel").getData();
                        if (oSuggestionModel.indexOf(sValue) !== -1 ) {
                            oInput.setValueState(sap.ui.core.ValueState.None);
                        } else {
                            oInput.setValueState(sap.ui.core.ValueState.Error);
                        }
                    },
                    
                    oncheckTentPc: function(oEvent){
                        var oInput = oEvent.getSource();
                        var sValue = oInput.getValue();
                        var oSuggestionModel = this.getView().getModel("tennentModel").getData();
                        if (oSuggestionModel.indexOf(sValue) !== -1 ) {
                            oInput.setValueState(sap.ui.core.ValueState.None);
                        } else {
                            oInput.setValueState(sap.ui.core.ValueState.Error);
                        }
                    },

                    oncheckCommPc: function(oEvent){
                        var oInput = oEvent.getSource();
                        var sValue = oInput.getValue();
                        var oSuggestionModel = this.getView().getModel("commPcModel").getData();
                        if (oSuggestionModel.indexOf(sValue) !== -1 ) {
                            oInput.setValueState(sap.ui.core.ValueState.None);
                        } else {
                            oInput.setValueState(sap.ui.core.ValueState.Error);
                        }

                    },

                    oncheckMgmtPc: function(oEvent){
                        var oInput = oEvent.getSource();
                        var sValue = oInput.getValue();
                        var oSuggestionModel = this.getView().getModel("mgmtModel").getData();
                        if (oSuggestionModel.indexOf(sValue) !== -1 ) {
                            oInput.setValueState(sap.ui.core.ValueState.None);
                        } else {
                            oInput.setValueState(sap.ui.core.ValueState.Error);
                        }

                    },

            onCheckPropertyTable:async function(){
               //var response = this.readPropertyMasterData();
               const that = this;
               this.getOwnerComponent().LegacyPropertyNumber = this.getView().byId("propertyInput").getValue();

               if (this.getOwnerComponent().LegacyPropertyNumber === "" || this.getOwnerComponent().plant === "") {

                return MessageToast.show("Please fill the Plant/Property Details");
               }
               var FilterPlant = new sap.ui.model.Filter('Plant', 'EQ', this.getOwnerComponent().plant);
               var FilterProperty = new sap.ui.model.Filter('Plant', 'EQ', this.getOwnerComponent().LegacyPropertyNumber);
               this.BusyDialog.open()
               return new Promise(function(){
                   that._oModel.read(`/PropertyMasterSet`, {
                    filters: [FilterPlant, FilterProperty],
                       success: function (oData) {
                           that.BusyDialog.close();
                           const oModel = new JSONModel(oData.results);
                           //const filterData = oModel.getData().filter(item => (item.LegacyPropertyNumber === that.getOwnerComponent().LegacyPropertyNumber))
                           if(oData.results.length){
                            that.getView().setModel(oModel, "plantBasicDetailsModel")
                            sap.ui.getCore().setModel(oModel, "plantBasicDetailsModel");
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
                                                                
                                                              
                                                            } else {
                                                                // Handle the "Cancel" button action or do nothing if canceled
                                                            }
                                                        }
                                                    }
                                                );
                                            } else {
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
                                                                    that.getView().getModel("oVisModel").setProperty("/visibliltyForOwner", true);
                                                                    that.getView().getModel("oVisModel").setProperty("/enabledForPlant", false);
                                                                    that.getView().getModel("oVisModel").setProperty("/enabledForProperty", false);
                                                                    that.getView().byId("idReset").setEnabled(true);
                                                                    that.createNewProperty();
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

            onResetField: function(){
                this.getView().getModel("oVisModel").setProperty("/enabledForPlant", true);
                this.getView().getModel("oVisModel").setProperty("/enabledForProperty", true);
                this.getView().getModel("oVisModel").setProperty("/visibilityForPTypeBlock", false);
                this.getView().getModel("oVisModel").setProperty("/visibliltyForOwner", false);
                this.getView().getModel("oVisModel").setProperty("/visibliltyForThirdParty", false);
                this.byId("idReset").setEnabled(false);
                this.byId("rb1").setSelected(true);
              
                this.getOwnerComponent().plant = "";
                this.getOwnerComponent().LegacyPropertyNumber = "";
                this.byId("rbg1").setSelectedIndex(0);
                this.byId("retailPc").setValue("");
                this.byId("storagePc").setValue("");
                this.byId("tenPc").setValue("");
                this.byId("commPc").setValue("");

                this.byId("retailPc").setValueState("None");
                this.byId("storagePc").setValueState("None");
                this.byId("tenPc").setValueState("None");
                this.byId("commPc").setValueState("None");
                this.byId("ccCode").setValue("");
                this.byId("ccCode1").setValue("");
                this.byId("ccCode2").setValue("");
                this.byId("ccCode3").setValue("");

                this.byId("retailPcTP").setValue("");
                this.byId("storagePcTP").setValue("");
                this.byId("tenPcTP").setValue("");
                this.byId("mgmtPcTP").setValue("");
                this.getView().byId("plantInput").setValue("");
                this.getView().byId("address").setText("");
                this.getView().byId("propertyInput").setValue("");
                this.byId("ccCode1").setValue("");
                this.byId("ccCodeTp1").setValue("");
                this.byId("ccCodeTp2").setValue("");
                this.byId("ccCodeTp3").setValue("");
                this.byId("retailPcTP").setValueState("None");
                this.byId("storagePcTP").setValueState("None");
                this.byId("tenPcTP").setValueState("None");
                this.byId("mgmtPcTP").setValueState("None");

                this.byId("startdate").setValue("");
                this.byId("startdate1").setValue("");
                this.byId("startdate2").setValue("");
                this.byId("startdate3").setValue("");
                this.byId("startdateTp").setValue("");
                this.byId("startdateTp1").setValue("");
                this.byId("startdateTp2").setValue("");
                this.byId("startdateTp3").setValue("");
              
                //that.getOwnerComponent().getModel("plantsModel")
              
                
            },

            createNewProperty: function(){
                const sPlant = this.getOwnerComponent().plant
                const LegacyPropertyNumber = this.getOwnerComponent().LegacyPropertyNumber
                const payload = {
                    Plant: sPlant,
                    LegacyPropertyNumber: LegacyPropertyNumber
                }
                this._oModel.create(`/PropertyMasterSet`, payload,{
                    success: function(){
                        MessageToast.show("Success");
                    },
                    error: function (oData) {
                        MessageToast.show("Something went wrong with Service")
                    }

                })

            },

            onSelectTP: function (oEvent) {
                this.getView().getModel("oVisModel").setProperty("/visibliltyForOwner", false);
                this.getView().getModel("oVisModel").setProperty("/visibliltyForThirdParty", true);
            },

            onSelectOwner: function (oEvent) {
                this.getView().getModel("oVisModel").setProperty("/visibliltyForOwner", true);
                this.getView().getModel("oVisModel").setProperty("/visibliltyForThirdParty", false);
            },
            // onValueHelpDialogCloseRetailPC: function(){
            //     this.getView().byId("retailPC").close();
            // },

            onValueHelpDialogClosePlant: function (oEvent) {
                const that = this;
                var sTitle,
                oItem = oEvent.getParameter("selectedItem");
                let sPlant = oItem.getBindingContext("plantsModel").getObject().Werks
                oEvent.getSource().getBinding("items").filter([]);
    
                if (!oItem) {
                    return;
                }
                sTitle = sPlant;
                this.getView().byId("plantInput").setValue(sTitle);
                this.getView().byId("address").setText("");
                
                const sSelectedPlantStreet = oItem.getBindingContext("plantsModel").getObject().Stras
                const sOrt01 = oItem.getBindingContext("plantsModel").getObject().Ort01
                const sLand = oItem.getBindingContext("plantsModel").getObject().Land1
                const sName1 = oItem.getBindingContext("plantsModel").getObject().Name1;
                const sName2 = oItem.getBindingContext("plantsModel").getObject().Name2;
                const sRegion = oItem.getBindingContext("plantsModel").getObject().Regio
                const sPin = oItem.getBindingContext("plantsModel").getObject().Pstlz
                const concatedAddress = `${sName1} ${sName2} ${sSelectedPlantStreet} ${sOrt01} ${sRegion} ${sPin}`;
                const titleAddress = `${sName1} ${sName2} ${sSelectedPlantStreet}`;
                
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
                oEvent.getSource().getBinding("items").filter([]);
    
                if (!oItem) {
                    return;
                }
                sTitle = sProperty;
                this.getView().byId("propertyInput").setValue(sTitle);
                this.getView().byId("address").setText("");
                
                const sSelectedPlantStreet = oItem.getBindingContext("plantsModel").getObject().Stras
                const sOrt01 = oItem.getBindingContext("plantsModel").getObject().Ort01
                const sLand = oItem.getBindingContext("plantsModel").getObject().Land1
                const sName1 = oItem.getBindingContext("plantsModel").getObject().Name1;
                const sName2 = oItem.getBindingContext("plantsModel").getObject().Name2;
                const sRegion = oItem.getBindingContext("plantsModel").getObject().Regio
                const sPin = oItem.getBindingContext("plantsModel").getObject().Pstlz
                const concatedAddress = `${sName1} ${sName2} ${sSelectedPlantStreet} ${sOrt01} ${sRegion} ${sPin}`
                const titleAddress = `${sName1} ${sName2} ${sSelectedPlantStreet}`
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


            onPressSave:function(){
                let payload;
                // const oRouter = this.getRouter();
                // //oRouter.navTo("basicDetails");
                // oRouter.navTo("basicDetails", {
                //     plant: this.getOwnerComponent().plant
                // });
                let sTime = "T00:00:00";
                const oModel = this.getOwnerComponent().getModel("plantsModel").getData();
                const sProperty = this.getOwnerComponent().getModel("plantsModel").getProperty("/plant");
                const sFIlterModel = oModel.filter((item)=> item.Werks === sProperty)
                const sOrt01 = sFIlterModel[0].Ort01
                const sLand = sFIlterModel[0].Land1
                const sName1 = sFIlterModel[0].Name1;
                const sName2 = sFIlterModel[0].Name2;
                const sRegion = sFIlterModel[0].Regio
                const sPin = sFIlterModel[0].Pstlz

                let sDateRetailPc = this.byId("startdate").getValue();
                let sDateStoragePc = this.byId("startdate1").getValue();
                let sDateTenantPc = this.byId("startdate2").getValue();
                let sDateCommPc = this.byId("startdate3").getValue();

                let sDateRetailPcTp = this.byId("startdatereatilPcTp").getValue();
                let sDateStoragePcTp = this.byId("startdateStoragePcTp").getValue();
                let sDateTenantPcTp = this.byId("startdateTanentPcTp").getValue();
                let sDateMgmtPcTp = this.byId("startdateMgmtPcTp").getValue();

                let formattedRetail = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDateRetailPc)) + sTime;
                let formattedStorage = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDateStoragePc)) + sTime;
                let formattedTenant = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDateTenantPc)) + sTime;
                let formattedComm = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDateCommPc)) + sTime;
                let formattedReatilTp = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDateRetailPcTp)) + sTime;
                let formattedStorageTp = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDateStoragePcTp)) + sTime;
                let formattedTenantPc = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDateTenantPcTp)) + sTime;
                let formattedMgmtPc = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDateMgmtPcTp)) + sTime;
                

                sDateRetailPc = formattedRetail === "T00:00:00" ? null : formattedRetail ;
                sDateStoragePc = formattedStorage === "T00:00:00" ? null : formattedStorage ;
                sDateTenantPc = formattedTenant === "T00:00:00" ? null : formattedTenant ;
                sDateCommPc = formattedComm === "T00:00:00" ? null : formattedComm ;
                sDateRetailPcTp = formattedReatilTp === "T00:00:00" ? null : formattedReatilTp ;
                sDateStoragePcTp = formattedStorageTp === "T00:00:00" ? null : formattedStorageTp ;
                sDateTenantPcTp = formattedTenantPc === "T00:00:00" ? null : formattedTenantPc ;
                sDateMgmtPcTp = formattedMgmtPc === "T00:00:00" ? null : formattedMgmtPc ;

                    const sSelectedRBButton = this.getView().byId("rbg1").getSelectedButton().getText();
                    const sPlant = this.getOwnerComponent().plant
                    const LegacyPropertyNumber = this.getOwnerComponent().LegacyPropertyNumber
                    var bValidation = true;

                    if (sSelectedRBButton === "Own"){
                        payload = {
                            RetailPc: this.byId("retailPc").getValue(),
                            StoragePc:  this.byId("storagePc").getValue(),
                            TennentInsPc: this.byId("tenPc").getValue(),
                            CommercialPc: this.byId("commPc").getValue(),
                            CompanyCode1 : this.byId("ccCode").getValue(),
                            CompanyCode2 : this.byId("ccCode1").getValue(),
                            CompanyCode3 : this.byId("ccCode2").getValue(),
                            CompanyCode4 : this.byId("ccCode3").getValue(),
                            PropertyType: "O",
                            City: sOrt01,
                            Street: sLand,
                            MailingName: sName1,
                            MailingName2: sName2,
                            Country: sRegion,
                            PostalCode: sPin,
                            RetailPCAdate: sDateRetailPc,
                            StoragePcAdate: sDateStoragePc,
                            TennentinPcAdate: sDateTenantPc,
                            CommercialPcAdate: sDateCommPc

                        }
                        if (this.byId("retailPc").getValue() === "" || this.byId("storagePc").getValue() === ""){
                            return MessageToast.show("Please fill all mandatory fields");
                        }
                        if (this.byId("retailPc").getValueState() === "Error" || this.byId("storagePc").getValueState() === "Error"
                        || this.byId("tenPc").getValueState() === "Error" || this.byId("commPc").getValueState() === "Error" ){
                            return MessageToast.show("Please Enter valid value's for PC's");
                        }

                    } else {
                        payload = {
                            RetailPc: this.byId("retailPcTP").getValue(),
                            StoragePc:  this.byId("storagePcTP").getValue(),
                            TennentInsPc: this.byId("tenPcTP").getValue(),
                            ManagmentPc: this.byId("mgmtPcTP").getValue(),
                            CompanyCode1 : this.byId("ccCodePcTp").getValue(),
                            CompanyCode2 : this.byId("ccCodeStTp").getValue(),
                            CompanyCode3 : this.byId("ccCodeTenTp").getValue(),
                            CompanyCode5 : this.byId("ccCodeMgTp").getValue(),
                            PropertyType: "T",
                            City: sOrt01,
                            Street: sLand,
                            MailingName: sName1,
                            MailingName2: sName2,
                            Country: sRegion,
                            PostalCode: sPin,
                            RetailPCAdate: sDateRetailPcTp,
                            StoragePcAdate: sDateStoragePcTp,
                            TennentinPcAdate: sDateTenantPcTp,
                            ManagementPcAdate: sDateMgmtPcTp
                        }
                        if (this.byId("retailPcTP").getValue() === "" || this.byId("storagePcTP").getValue() === ""){
                            return MessageToast.show("Please fill all mandatory fields");
                        }
                        if (this.byId("retailPcTP").getValueState() === "Error" || this.byId("storagePcTP").getValueState() === "Error"
                        || this.byId("tenPcTP").getValueState() === "Error" || this.byId("mgmtPcTP").getValueState() === "Error" ){
                            return MessageToast.show("Please Enter valid value's for PC's");
                        }
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
                } 

        });
    });
