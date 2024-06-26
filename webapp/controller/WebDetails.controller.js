sap.ui.define([
	"com/public/storage/pao/utils/reusecontroller",
    "sap/m/BusyDialog",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "com/public/storage/pao/utils/formatter",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/FilterType"
], function(
	BaseController,
    BusyDialog,
    MessageToast,
    JSONModel,
    formatter,
    Fragment,
    Filter,
    FilterOperator,
    FilterType
) {
	"use strict";
    var _oController;

	return 	BaseController
    .extend("com.public.storage.pao.controller.WebDetails", {
        formatter: formatter,
        onInit: function () {
            
            _oController = this;
            const oRouter = this.getRouter();
            oRouter.getRoute("webDetails").attachMatched(this._onRouteMatched, this);
            this._oBusyDialog = new BusyDialog();
			this.getView().addDependent(this._oBusyDialog);
            this.model = new JSONModel();
			this.model.setData({
				PropertyLatitude: "None",
				PropertyLongitude: "None",
                PropertyAdminFee: "None",
                AdminFeeEffectiveDate: "None",
                PropertyWebsiteReservations: "None",
                WebsiteEnabledDate: "None",
                PropertyCallCenterReservati: "None",
                CallCenterEnabledDate: "None",
                PropertyNfsFee: "None",
                MaxReservationDays: "None",
                PropertyCallCenterReservati: "None",
                PropertyNfsAchFee: "None",
                PropertyInsuranceFrozen: "None",
                PropertyInsuranceCancelDay: "None",
                PreReservationDays: "None"
			});
            this.getView().setModel(this.model);

        },

        _onRouteMatched: function(oEvent){
            this.getOwnerComponent.hasChanges = false;
            const oRouter = this.getRouter();
            const Plant = this.getOwnerComponent().plant;
            if (Plant === undefined) {
                return  oRouter.navTo("home");
              }
            const LegacyPropertyNumber= this.getOwnerComponent().LegacyPropertyNumber
            this._oModel = sap.ui.getCore().getModel("mainModel");
            this.readPropertyChurnStatus();
            this.readClimateControl();
            this.readPropertyData(Plant, LegacyPropertyNumber);

        },

        onValueHelpDialogSearchChurnStatus: function(oEvent){
            let sValue = oEvent.getParameter("value");
			let oFilterDesc = new Filter("Description", FilterOperator.Contains, sValue);
            let oCodeFilter = new Filter("Code", FilterOperator.Contains, sValue);
            let oCombinedFilter = new Filter({
                filters: [oFilterDesc, oCodeFilter],
                and: false // Set to false for OR condition
            });
			oEvent.getSource().getBinding("items").filter([oCombinedFilter]);

        },

        onValueHelpDialogSearchClimateControl: function(oEvent){
            let sValue = oEvent.getParameter("value");
			let oFilterDesc = new Filter("Description", FilterOperator.Contains, sValue);
            let oCodeFilter = new Filter("Code", FilterOperator.Contains, sValue);
            let oCombinedFilter = new Filter({
                filters: [oFilterDesc, oCodeFilter],
                and: false // Set to false for OR condition
            });
			oEvent.getSource().getBinding("items").filter([oCombinedFilter]);

        },

        _onValueHelpChurnStatus: function(oEvent){
            this.getOwnerComponent.hasChanges = true;
            const that =this;
            //var sInputValue = oEvent.getSource().getValue(),
              const oView = this.getView();

            if (!this._pValueHelpChurnStatus) {
                this._pValueHelpChurnStatus = Fragment.load({
                    id: oView.getId(),
                    name: "com.public.storage.pao.fragments.WebDetails.ChurnStatus",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            this._oBusyDialog.open()
            this._pValueHelpChurnStatus.then(function (oDialog) {
                //that.readPropertyMasterData();
                that._oBusyDialog.close();
                // Create a filter for the binding
                //oDialog.getBinding("items").filter([new Filter("Name", FilterOperator.Contains, sInputValue)]);
                // Open ValueHelpDialog filtered by the input's value
                oDialog.open();
            });

        },

        _onValueHelpClimateControl: function(oEvent){
            this.getOwnerComponent.hasChanges = true;
            const that =this;
            //var sInputValue = oEvent.getSource().getValue(),
              const oView = this.getView();

            if (!this._pValueHelpClimateControl) {
                this._pValueHelpClimateControl = Fragment.load({
                    id: oView.getId(),
                    name: "com.public.storage.pao.fragments.WebDetails.ClimateControl",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            this._oBusyDialog.open()
            this._pValueHelpClimateControl.then(function (oDialog) {
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
            if (sTitle === "Property Churn Status"){
                this.getView().getModel("plantBasicDetailsModel").setProperty("/PropertyChurnStatus", `(${sCode}) ${sDescription}`);
                this.getView().getModel("plantBasicDetailsModel").setProperty("/churnStatusDesc", `${sDescription}`);
            
            } else if(sTitle === "Climate Control"){
                // this.byId("cCode").setValue(sDescription);
                // this._custCode = sCode
                this.getView().getModel("plantBasicDetailsModel").setProperty("/ClimateControl", `(${sCode}) ${sDescription}`);
                this.getView().getModel("plantBasicDetailsModel").setProperty("/climateControlDesc", `${sDescription}`);
            }
              
		},
        onDetectChange: function(oEvent){
            this.detectChanges();
        },

        onPressSaveWebDetails: function(){
            this._oBusyDialog.open();
            const that = this;
            const sPlant = this.getOwnerComponent().plant
            const LegacyPropertyNumber = this.getOwnerComponent().LegacyPropertyNumber;
            var bValidation = true;
            let sTime = "T00:00:00"
            
            let adminFeeEffectiveDate = this.byId("effDate").getValue().split(".").reverse().join("-");
            let websiteEnabledDate = this.byId("webenabled").getValue().split(".").reverse().join("-");
            let callCentDate = this.byId("callCenter").getValue().split(".").reverse().join("-");
            let nfsfeeeffectiveDate = this.byId("nsfFeeEff").getValue().split(".").reverse().join("-");
            let nfsAshfeeffectiveDate = this.byId("nfsAshfeeeff").getValue().split(".").reverse().join("-");
                
            let finaladminFeeEffectiveDate = adminFeeEffectiveDate === "" ? sTime : new Date(adminFeeEffectiveDate).toISOString().split("T")[0] + sTime;
            let finalwebsiteEnabledDate = websiteEnabledDate === "" ? sTime : new Date(websiteEnabledDate).toISOString().split("T")[0] + sTime;
            let finalcallCentDate = callCentDate === "" ? sTime : new Date(callCentDate).toISOString().split("T")[0] + sTime;
            let finalnnfsfeeeffectiveDate = nfsfeeeffectiveDate === "" ? sTime : new Date(nfsfeeeffectiveDate).toISOString().split("T")[0] + sTime;
            let finalnnfsAshfeeffectiveDate = nfsAshfeeffectiveDate === "" ? sTime : new Date(nfsAshfeeffectiveDate).toISOString().split("T")[0] + sTime;
           
            adminFeeEffectiveDate = finaladminFeeEffectiveDate === "T00:00:00" ? null : finaladminFeeEffectiveDate ;
            websiteEnabledDate = finalwebsiteEnabledDate === "T00:00:00" ? null : finalwebsiteEnabledDate ;
            callCentDate = finalcallCentDate === "T00:00:00" ? null : finalcallCentDate ;
            nfsfeeeffectiveDate = finalnnfsfeeeffectiveDate === "T00:00:00" ? null : finalnnfsfeeeffectiveDate ;
            nfsAshfeeffectiveDate = finalnnfsAshfeeffectiveDate === "T00:00:00" ? null : finalnnfsAshfeeffectiveDate ;

            let PropertyLatitude = this.getView().byId("propLat").getValue();
            let PropertyLongitude = this.getView().byId("propLong").getValue();
            let PropertyAdminFee = this.getView().byId("propAdmin").getValue();
            let PropertyWebsiteReservations = this.getView().byId("propWeb").getSelectedKey();
            let PropertyCallCenterReservati = this.getView().byId("propCall").getSelectedKey();
            let PropertyNfsFee = this.getView().byId("propNFS").getValue();
            let MaxReservationDays = this.getView().byId("maxRes").getValue();
            let PropertyNfsAchFee = this.getView().byId("propNFSACH").getValue();
            let PropertyInsuranceFrozen = this.getView().byId("propFrozen").getSelectedKey();
            let PropertyInsuranceCancelDay = this.getView().byId("propIns").getValue();
            let PreReservationDays = this.getView().byId("propResDay").getValue();

            if (PropertyLatitude === "") {
                this.model.setProperty("/PropertyLatitude", "Error");
            } else {
                this.model.setProperty("/PropertyLatitude", "None");
            }

            if (PropertyLongitude === "") {
                this.model.setProperty("/PropertyLongitude", "Error");
            
            } else {
                this.model.setProperty("/PropertyLongitude", "None");
             
            }

            if (PropertyAdminFee === "") {
                this.model.setProperty("/PropertyAdminFee", "Error");
            } else {
                this.model.setProperty("/PropertyAdminFee", "None");
            }

            if (PropertyWebsiteReservations === "" || PropertyWebsiteReservations === "B") {
                this.model.setProperty("/PropertyWebsiteReservations", "Error");
            } else {
                this.model.setProperty("/PropertyWebsiteReservations", "None");
            }

            if (PropertyCallCenterReservati === "" || PropertyCallCenterReservati === "B") {
                this.model.setProperty("/PropertyCallCenterReservati", "Error");
            } else {
              this.model.setProperty("/PropertyCallCenterReservati", "None"); 
            }

            if (PropertyNfsFee === "") {
                this.model.setProperty("/PropertyNfsFee", "Error");
            } else {
                this.model.setProperty("/PropertyNfsFee", "None");
            }

            if (MaxReservationDays === "") {
                this.model.setProperty("/MaxReservationDays", "Error");
            } else {
                this.model.setProperty("/MaxReservationDays", "None"); 
            }

            if (PropertyNfsAchFee === "") {
                this.model.setProperty("/PropertyNfsAchFee", "Error");
            } else {
                this.model.setProperty("/PropertyNfsAchFee", "None"); 
            }

            if (PropertyInsuranceFrozen === "") {
                this.model.setProperty("/PropertyInsuranceFrozen", "Error");
            } else {
                this.model.setProperty("/PropertyInsuranceFrozen", "None"); 
            }

            if (PropertyInsuranceCancelDay === "") {
                this.model.setProperty("/PropertyInsuranceCancelDay", "Error");
            } else {
                this.model.setProperty("/PropertyInsuranceCancelDay", "None"); 
            }

            if (PreReservationDays === "") {
                this.model.setProperty("/PreReservationDays", "Error");
            } else {
                this.model.setProperty("/PreReservationDays", "None"); 
            }


            if (PropertyLatitude === "" || PropertyLongitude === "" || PropertyAdminFee === "" || PropertyWebsiteReservations === "" || PropertyWebsiteReservations === "B" || PropertyCallCenterReservati === "" || PropertyCallCenterReservati === "B"
            || PropertyNfsFee === "" || MaxReservationDays === "" || PropertyNfsAchFee === "" || PropertyInsuranceFrozen === "" || PropertyInsuranceCancelDay === "" || PreReservationDays === ""){
                bValidation = true ;
            } else {
                bValidation = false ;
            }

            if(bValidation === false){
          
                const payload = {
                    PropertyLatitude: this.getView().byId("propLat").getValue(),
                    PropertyLongitude: this.getView().byId("propLong").getValue(),
                    PropertyAdminFee: this.getView().byId("propAdmin").getValue(),
                    AdminFeeEffectiveDate: adminFeeEffectiveDate,
                    PropertyChurnStatus: this.getView().byId("propChurn").getValue(),
                    ClimateControl: this.getView().byId("climControl").getValue(),
                    PropertyWebsiteReservations: this.getView().byId("propWeb").getSelectedKey(),
                    WebsiteEnabledDate: websiteEnabledDate,
                    PropertyCallCenterReservati: this.getView().byId("propCall").getSelectedKey(),
                    CallCenterEnabledDate: callCentDate,
                    PropertyNfsFee: this.getView().byId("propNFS").getValue(),
                    MaxReservationDays: this.getView().byId("maxRes").getValue(),
                    NsfFeeEffectiveDate: nfsfeeeffectiveDate,
                    PropertyNfsAchFee: this.getView().byId("propNFSACH").getValue(),
                    NfsAchFeeEffectiveDate: nfsAshfeeffectiveDate,
                    PropertyInsuranceFrozen: this.getView().byId("propFrozen").getSelectedKey(),
                    PropertyInsuranceCancelDay: this.getView().byId("propIns").getValue(),
                    PreReservationDays: this.getView().byId("propResDay").getValue()
                };
           const uri= `/PropertyMasterSet(Plant='${sPlant}',LegacyPropertyNumber='${LegacyPropertyNumber}')`
          
            this._oModel.update(uri, payload, {
                success: function (oData) {
                    that.getOwnerComponent.hasChanges = false;
                   MessageToast.show("Saved Successfully");
                   that._oBusyDialog.close();
                },
                error: function (oData) {
                    MessageToast.show("Something went wrong with Service");
                    that._oBusyDialog.close();
                }
            })
        } else {
            this._oBusyDialog.close();
            MessageToast.show("Please Fill all mandatory fields");
        }

        }
	});
});