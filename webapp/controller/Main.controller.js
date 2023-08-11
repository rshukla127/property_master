sap.ui.define([
    "com/public/storage/pao/utils/reusecontroller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/FilterType",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/m/BusyDialog"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController, JSONModel, Fragment, Filter, FilterOperator, FilterType, MessageToast, MessageBox, BusyDialog) {
        "use strict";
        var _oController;

        return BaseController.extend("com.public.storage.pao.controller.Main", {
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
                    enabledForProperty: true
                })
                this.getView().setModel(oVisibilityModel, "oVisModel");
                // const jsonModel = this.getOwnerComponent().getModel("plantModel")
                // this.getView().setModel(jsonModel, "plantModel");

                this.BusyDialog = new BusyDialog();
                this.readPropertyMasterData();
                this.getLoggedInUser();
                this.readRetailPC();
                this.readStoragePC();
                this.readTennentPC();
                this.readManagementPC();
                this.readCommPC();
                

            },

            readPropertyMasterData: function () {
                const that = this;
                this._oModel.setHeaders({
                    "X-Requested-With": "XMLHttpRequest",
                    "Content-Type": "application/atom+xml",
                    "X-CSRF-Token": "Fetch"
                });
                this.BusyDialog.open()
                return new Promise(function(){
                    that._oModel.read(`/PlantMasterSet`, {
                        success: function (oData) {
                            that.BusyDialog.close();
                            const oModel = new JSONModel(oData.results);
                            that.getView().setModel(oModel, "plantsModel")
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
                    //that.readPropertyMasterData();
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
                    //that.readPropertyMasterData();
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
                    //that.readPropertyMasterData();
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
                    //that.readPropertyMasterData();
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
                    //that.readPropertyMasterData();
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
                const that = this;
                const oSelectedItem = oEvent.getSource('selectedItem').getValue();

                if (oSelectedItem) {
                    MessageBox.confirm(
                        `Property Details for the property ${sInputValue} is available. Do you want to change?`,
                        {
                            title: "Confirmation",
                            actions: [MessageBox.Action.YES, MessageBox.Action.CANCEL],
                            emphasizedAction: MessageBox.Action.YES,
                            onClose: function (oAction) {
                                if (oAction === MessageBox.Action.YES) {
                                    
                                   
                                } else {
                                    // Handle the "Cancel" button action or do nothing if canceled
                                }
                            }
                        }
                    );
                } else {
                    // Handle the case when the operation is not successful
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
                const sRegion = oItem.getBindingContext("plantsModel").getObject().Regio
                const sPin = oItem.getBindingContext("plantsModel").getObject().Pstlz
                const concatedAddress = `${sSelectedPlantStreet} ${sOrt01} ${sRegion} ${sLand} ${sRegion} ${sPin}`
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
                                                        that.getView().getModel("plantsModel").setProperty("/street", concatedAddress)
                                                        that.getView().getModel("plantsModel").setProperty("/property", sProperty)
                                                      
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

            onCheckPropertyTable:async function(){
               //var response = this.readPropertyMasterData();
               const that = this;
               this.getOwnerComponent().LegacyPropertyNumber = this.getView().byId("propertyInput").getValue();
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
                           MessageToast.show("Something went wrong with Service")
                       }
                   });
               });
            //    await new Promise(function(resolve){setTimeout(resolve, 2000)});
            //    alert('You have waited 2 seconds');

            },

            onResetField: function(){
                this.getView().getModel("oVisModel").setProperty("/enabledForPlant", true);
                this.getView().getModel("oVisModel").setProperty("/enabledForProperty", true);
                this.getView().getModel("oVisModel").setProperty("/visibilityForPTypeBlock", false);
                this.getView().byId("plantInput").setValue("");
                this.getView().byId("propertyInput").setValue("");
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
                oEvent.getSource().getBinding("items").filter([]);
    
                if (!oItem) {
                    return;
                }
                sTitle = oItem.getTitle();
                this.getView().byId("plantInput").setValue(sTitle);
                this.getView().byId("address").setText("");
                
                //var oText = oItem ? oItem.getKey() : "";
               
                const sSelectedPlantStreet = oItem.getBindingContext("plantsModel").getObject().Stras
                const sOrt01 = oItem.getBindingContext("plantsModel").getObject().Ort01
                const sLand = oItem.getBindingContext("plantsModel").getObject().Land1
                const sRegion = oItem.getBindingContext("plantsModel").getObject().Regio
                const sPin = oItem.getBindingContext("plantsModel").getObject().Pstlz
                const concatedAddress = `${sSelectedPlantStreet} ${sOrt01} ${sRegion} ${sLand} ${sRegion} ${sPin}`
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
                                                        that.getView().getModel("plantsModel").setProperty("/street", concatedAddress)
                                                        that.getView().getModel("plantsModel").setProperty("/property", sProperty)
                                                      
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
                var sDescription,
                    oSelectedItem = oEvent.getParameter("selectedItem");
                oEvent.getSource().getBinding("items").filter([]);
                if (!oSelectedItem) {
                    return;
                }
                sDescription = oSelectedItem.getTitle();
                this.getView().byId("propertyInput").setValue(sDescription);
            },

            onValueHelpDialogSearchPlant: function (oEvent) {
                var sValue = oEvent.getParameter("value");
                var oFilter = new Filter("Werks", FilterOperator.Contains, sValue);

                oEvent.getSource().getBinding("items").filter([oFilter]);
            },

            onValueHelpDialogSearchProperty: function (oEvent) {
                var sValue = oEvent.getParameter("value");
                var oFilter = new Filter("Name2", FilterOperator.Contains, sValue);

                oEvent.getSource().getBinding("items").filter([oFilter]);
            },

            onPressSave:function(){
                const oRouter = this.getRouter();
                //oRouter.navTo("basicDetails");
                oRouter.navTo("basicDetails", {
                    plant: this.getOwnerComponent().plant
                });

            }

        });
    });
