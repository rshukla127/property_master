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
                
                this._oModel.read(`/RetailProfitCenterSet`, {
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
               
                this._oModel.read(`/StorageProfitCenterSet`, {
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
               
                this._oModel.read(`/StorageProfitCenterSet`, {
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
               
                this._oModel.read(`/ManagementProfitCenterSet`, {
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
                
                this._oModel.read(`/CommercialProfitCenterSet`, {
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

            _onRouteMatched: function(oEvent){
                const Plant = this.getOwnerComponent().plant;
                const LegacyPropertyNumber= this.getOwnerComponent().LegacyPropertyNumber
                this._oModel = sap.ui.getCore().getModel("mainModel");
                this.readPropertyData(Plant, LegacyPropertyNumber)
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
                this.BusyDialog.open()
                this._pValueHelpDialogPropery.then(function (oDialog) {
                    that.readRetailPC();
                    that.BusyDialog.close();
                    // Create a filter for the binding
                    oDialog.getBinding("items").filter([new Filter("Name", FilterOperator.Contains, sInputValue)]);
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
                this.BusyDialog.open()
                this._pValueHelpStoragePC.then(function (oDialog) {
                    that.readStoragePC();
                    that.BusyDialog.close();
                    // Create a filter for the binding
                    oDialog.getBinding("items").filter([new Filter("Name", FilterOperator.Contains, sInputValue)]);
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
                this.BusyDialog.open()
                this._pValueHelpTennentPC.then(function (oDialog) {
                    that.readTennentPC();
                    that.BusyDialog.close();
                    // Create a filter for the binding
                    oDialog.getBinding("items").filter([new Filter("Name", FilterOperator.Contains, sInputValue)]);
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
                this.BusyDialog.open()
                this._pValueHelpCommPC.then(function (oDialog) {
                    that.readCommPC();
                    that.BusyDialog.close();
                    // Create a filter for the binding
                    oDialog.getBinding("items").filter([new Filter("Name", FilterOperator.Contains, sInputValue)]);
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
                this.BusyDialog.open()
                this._pValueHelpMgmtPC.then(function (oDialog) {
                    that.readManagementPC();
                    that.BusyDialog.close();
                    // Create a filter for the binding
                    oDialog.getBinding("items").filter([new Filter("Name", FilterOperator.Contains, sInputValue)]);
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
                let sCompanyCode, sDatab, finalStartDate;
                var oSelectedItem = oEvent.getParameter("selectedItem");
                var sCode = oEvent.getSource().getValue();
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

                        sCompanyCode = oSelectedItem.getBindingContext("retailpcModel").getObject().Bukrs;
                        sDatab = oSelectedItem.getBindingContext("retailpcModel").getObject().Datab;
                        finalStartDate = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDatab));
                        this.byId("retailPc").setValue(sCode);
                        this.byId("ccCode").setValue(sCompanyCode);
                        this.byId("startdate").setValue(finalStartDate);
                        
                        //this.rtailPC = sCode
                    } else if(sIDStorage === true){
                        sCompanyCode = oSelectedItem.getBindingContext("storageModel").getObject().Bukrs;
                        sDatab = oSelectedItem.getBindingContext("storageModel").getObject().Datab;
                        finalStartDate = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDatab));
                        this.byId("storagePc").setValue(sCode);
                        this.byId("ccCode1").setValue(sCompanyCode);
                        this.byId("startdate1").setValue(finalStartDate);
                        //this.storagePC = sCode
                    } else if(sIDcommPC === true){
                        sCompanyCode = oSelectedItem.getBindingContext("commPcModel").getObject().Bukrs;
                        sDatab = oSelectedItem.getBindingContext("commPcModel").getObject().Datab;
                        finalStartDate = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDatab));
                        this.byId("commPc").setValue(sCode);
                        this.byId("ccCode3").setValue(sCompanyCode);
                        this.byId("startdate3").setValue(finalStartDate);
                        //this.commPC = sCode
                    } else if(sIDTent === true){
                        sCompanyCode = oSelectedItem.getBindingContext("tennentModel").getObject().Bukrs;
                        sDatab = oSelectedItem.getBindingContext("tennentModel").getObject().Datab;
                        finalStartDate = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDatab));
                        this.byId("tenPc").setValue(sCode);
                        this.byId("ccCode2").setValue(sCompanyCode);
                        this.byId("startdate2").setValue(finalStartDate);
                        //this.tennentPC = sCode
                    }

                } else {
                    if (sIDRetailTP === true){
                        sCompanyCode = oSelectedItem.getBindingContext("retailpcModel").getObject().Bukrs;
                        sDatab = oSelectedItem.getBindingContext("retailpcModel").getObject().Datab;
                        finalStartDate = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDatab));
                        this.byId("ccCodeTp").setValue(sCompanyCode);
                        this.byId("startdateTp").setValue(finalStartDate);
                        this.byId("retailPcTP").setValue(sCode);
                        //this.rtailPCTP = sCode
                    } else if(sIDStorageTP === true){
                        sCompanyCode = oSelectedItem.getBindingContext("storageModel").getObject().Bukrs;
                        sDatab = oSelectedItem.getBindingContext("storageModel").getObject().Datab;
                        finalStartDate = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDatab));
                        this.byId("storagePcTP").setValue(sCode);
                        this.byId("ccCodeTp1").setValue(sCompanyCode);
                        this.byId("startdateTp1").setValue(finalStartDate);
                        //this.storagePCTP = sCode
                    } else if(sIDTentTP === true){
                        sCompanyCode = oSelectedItem.getBindingContext("mgmtModel").getObject().Bukrs;
                        sDatab = oSelectedItem.getBindingContext("mgmtModel").getObject().Datab;
                        finalStartDate = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDatab));
                        this.byId("mgmtPcTP").setValue(sCode);
                        this.byId("ccCodeTp3").setValue(sCompanyCode);
                        this.byId("startdateTp3").setValue(finalStartDate);
                        //this.managmentPCTP = sCode
                    } else if(sIDmgmtPCTP === true){
                        sCompanyCode = oSelectedItem.getBindingContext("tennentModel").getObject().Bukrs;
                        sDatab = oSelectedItem.getBindingContext("tennentModel").getObject().Datab;
                        finalStartDate = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDatab));
                        this.byId("tenPcTP").setValue(sCode);
                        this.byId("ccCodeTp2").setValue(sCompanyCode);
                        this.byId("startdateTp2").setValue(finalStartDate);
                    }
                } 
               
            },

            onValueHelpDialogClosePC: function (oEvent) {
                let sCompanyCode,sDatab, finalStartDate
                const sSelectedRBButton = this.getView().byId("rbg1").getSelectedButton().getText();
                let	oSelectedItem = oEvent.getParameter("selectedItem");
                //let oModel = oSelectedItem.getBindingContext()
               
                let sTitle = oEvent.getSource().getTitle();
                oEvent.getSource().getBinding("items").filter([]);
                if (!oSelectedItem) {
                    return;
                }
                let sDescription = oSelectedItem.getDescription();
                let sCode =  oSelectedItem.getTitle();

                if (sSelectedRBButton ==="Own"){
                    if (sTitle === "Retail PC"){

                        sCompanyCode = oSelectedItem.getBindingContext("retailpcModel").getObject().Bukrs;
                        sDatab = oSelectedItem.getBindingContext("retailpcModel").getObject().Datab;
                        finalStartDate = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDatab));
                        this.byId("retailPc").setValue(sCode);
                        this.byId("ccCode").setValue(sCompanyCode);
                        this.byId("startdate").setValue(finalStartDate);
                        
                        //this.rtailPC = sCode
                    } else if(sTitle === "Storage PC"){
                        sCompanyCode = oSelectedItem.getBindingContext("storageModel").getObject().Bukrs;
                        sDatab = oSelectedItem.getBindingContext("storageModel").getObject().Datab;
                        finalStartDate = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDatab));
                        this.byId("storagePc").setValue(sCode);
                        this.byId("ccCode1").setValue(sCompanyCode);
                        this.byId("startdate1").setValue(finalStartDate);
                        //this.storagePC = sCode
                    } else if(sTitle === "Commercial PC"){
                        sCompanyCode = oSelectedItem.getBindingContext("commPcModel").getObject().Bukrs;
                        sDatab = oSelectedItem.getBindingContext("commPcModel").getObject().Datab;
                        finalStartDate = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDatab));
                        this.byId("commPc").setValue(sCode);
                        this.byId("ccCode3").setValue(sCompanyCode);
                        this.byId("startdate3").setValue(finalStartDate);
                        //this.commPC = sCode
                    } else if(sTitle === "Tennent PC"){
                        sCompanyCode = oSelectedItem.getBindingContext("tennentModel").getObject().Bukrs;
                        sDatab = oSelectedItem.getBindingContext("tennentModel").getObject().Datab;
                        finalStartDate = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDatab));
                        this.byId("tenPc").setValue(sCode);
                        this.byId("ccCode2").setValue(sCompanyCode);
                        this.byId("startdate2").setValue(finalStartDate);
                        //this.tennentPC = sCode
                    }

                } else {
                    if (sTitle === "Retail PC"){
                        sCompanyCode = oSelectedItem.getBindingContext("retailpcModel").getObject().Bukrs;
                        sDatab = oSelectedItem.getBindingContext("retailpcModel").getObject().Datab;
                        finalStartDate = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDatab));
                        this.byId("ccCodeTp").setValue(sCompanyCode);
                        this.byId("startdateTp").setValue(finalStartDate);
                        this.byId("retailPcTP").setValue(sCode);
                        //this.rtailPCTP = sCode
                    } else if(sTitle === "Storage PC"){
                        sCompanyCode = oSelectedItem.getBindingContext("storageModel").getObject().Bukrs;
                        sDatab = oSelectedItem.getBindingContext("storageModel").getObject().Datab;
                        finalStartDate = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDatab));
                        this.byId("storagePcTP").setValue(sCode);
                        this.byId("ccCodeTp1").setValue(sCompanyCode);
                        this.byId("startdateTp1").setValue(finalStartDate);
                        //this.storagePCTP = sCode
                    } else if(sTitle === "Management PC"){
                        sCompanyCode = oSelectedItem.getBindingContext("mgmtModel").getObject().Bukrs;
                        sDatab = oSelectedItem.getBindingContext("mgmtModel").getObject().Datab;
                        finalStartDate = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDatab));
                        this.byId("mgmtPcTP").setValue(sCode);
                        this.byId("ccCodeTp3").setValue(sCompanyCode);
                        this.byId("startdateTp3").setValue(finalStartDate);
                        //this.managmentPCTP = sCode
                    } else if(sTitle === "Tennent PC"){
                        sCompanyCode = oSelectedItem.getBindingContext("tennentModel").getObject().Bukrs;
                        sDatab = oSelectedItem.getBindingContext("tennentModel").getObject().Datab;
                        finalStartDate = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(sDatab));
                        this.byId("tenPcTP").setValue(sCode);
                        this.byId("ccCodeTp2").setValue(sCompanyCode);
                        this.byId("startdateTp2").setValue(finalStartDate);
                        //this.tennentPCTP = sCode
                    }
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
                this.getView().byId("plantInput").setValue("");
                this.getView().byId("address").setText("");
                this.getView().byId("propertyInput").setValue("");
                this.getOwnerComponent().plant = "";
                this.getOwnerComponent().LegacyPropertyNumber = "";
                this.byId("rbg1").setSelectedIndex(0);
                this.byId("retailPc").setValue("");
                this.byId("storagePc").setValue("");
                this.byId("tenPc").setValue("");
                this.byId("commPc").setValue("");
                this.byId("ccCode").setValue("");
                this.byId("ccCode1").setValue("");
                this.byId("ccCode2").setValue("");
                this.byId("ccCode3").setValue("");

                this.byId("retailPcTP").setValue("");
                this.byId("startdateTp1").setValue("");
                this.byId("tenPcTP").setValue("");
                this.byId("mgmtPcTP").setValue("");
                this.byId("ccCode1").setValue("");
                this.byId("ccCodeTp1").setValue("");
                this.byId("ccCodeTp2").setValue("");
                this.byId("ccCodeTp3").setValue("");

                this.byId("startdate").setValue("");
                this.byId("startdate1").setValue("");
                this.byId("startdate2").setValue("");
                this.byId("startdate3").setValue("");
                this.byId("startdateTp").setValue("");
                this.byId("startdateTp1").setValue("");
                this.byId("startdateTp2").setValue("");
                this.byId("startdateTp3").setValue("");
                
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
                    const sSelectedRBButton = this.getView().byId("rbg1").getSelectedButton().getText();
                    const sPlant = this.getOwnerComponent().plant
                    const LegacyPropertyNumber = this.getOwnerComponent().LegacyPropertyNumber
                    var bValidation = true;

                    if (sSelectedRBButton === "Own"){
                        payload = {
                            RetailPc: this.byId("retailPc").getValue(),
                            StoragePc:  this.byId("storagePc").getValue(),
                            TennentInsPc: this.byId("tenPc").getValue,
                            CommercialPc: this.byId("commPc").getValue(),
                            CompanyCode1 : this.byId("ccCode").getValue(),
                            CompanyCode2 : this.byId("ccCode1").getValue(),
                            CompanyCode3 : this.byId("ccCode2").getValue(),
                            CompanyCode4 : this.byId("ccCode3").getValue()
                        }

                    } else {
                        payload = {
                            RetailPc: this.byId("retailPcTP").getValue(),
                            StoragePc:  this.byId("startdateTp1").getValue(),
                            TennentInsPc: this.byId("tenPcTP").getValue(),
                            ManagmentPc: this.byId("mgmtPcTP").getValue(),
                            CompanyCode1 : this.byId("ccCode1").getValue(),
                            CompanyCode2 : this.byId("ccCodeTp1").getValue(),
                            CompanyCode3 : this.byId("ccCodeTp2").getValue(),
                            CompanyCode5 : this.byId("ccCodeTp3").getValue()
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
