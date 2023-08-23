sap.ui.define([
	"com/public/storage/pao/utils/reusecontroller",
    "sap/m/BusyDialog",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "com/public/storage/pao/utils/formatter"
], function(
	BaseController,
    BusyDialog,
    MessageToast,
    JSONModel,
    formatter
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
            const Plant = this.getOwnerComponent().plant;
            const LegacyPropertyNumber= this.getOwnerComponent().LegacyPropertyNumber
            this._oModel = sap.ui.getCore().getModel("mainModel");
            this.readPropertyData(Plant, LegacyPropertyNumber)

        },

        onPressSaveWebDetails: function(){
            const sPlant = this.getOwnerComponent().plant
            const LegacyPropertyNumber = this.getOwnerComponent().LegacyPropertyNumber;
            var bValidation = true;
            let sTime = "T00:00:00"
            let adminFeeEffectiveDate = this.byId("effDate").getValue();
            let websiteEnabledDate = this.byId("webenabled").getValue();
            let callCentDate = this.byId("callCenter").getValue();
            let nfsfeeeffectiveDate = this.byId("nsfFeeEff").getValue();
            let nfsAshfeeffectiveDate = this.byId("nfsAshfeeeff").getValue();
          
            let finaladminFeeEffectiveDate = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(adminFeeEffectiveDate)) + sTime;
            let finalwebsiteEnabledDate = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(websiteEnabledDate)) + sTime;
            let finalcallCentDate = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(callCentDate)) + sTime;
            let finalnnfsfeeeffectiveDate = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(nfsfeeeffectiveDate)) + sTime;
            let finalnnfsAshfeeffectiveDate = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(nfsAshfeeffectiveDate)) + sTime;
           
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

            if (PropertyWebsiteReservations === "") {
                this.model.setProperty("/PropertyWebsiteReservations", "Error");
            } else {
                this.model.setProperty("/PropertyWebsiteReservations", "None");
            }

            if (PropertyCallCenterReservati === "") {
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

            
            if (adminFeeEffectiveDate === null) {
                this.model.setProperty("/AdminFeeEffectiveDate", "Error");
            } else {
                this.model.setProperty("/AdminFeeEffectiveDate", "None"); 
            }

            if (websiteEnabledDate === null) {
                this.model.setProperty("/WebsiteEnabledDate", "Error");
            } else {
                this.model.setProperty("/WebsiteEnabledDate", "None"); 
            }

            if (nfsfeeeffectiveDate === null) {
                this.model.setProperty("/NsfFeeEffectiveDate", "Error");
            } else {
                this.model.setProperty("/NsfFeeEffectiveDate", "None"); 
            }

            if (callCentDate === null) {
                this.model.setProperty("/CallCenterEnabledDate", "Error");
            } else {
                this.model.setProperty("/CallCenterEnabledDate", "None"); 
            }

            if (PropertyLatitude === "" || PropertyLongitude === "" || PropertyAdminFee === "" || PropertyWebsiteReservations === "" || PropertyCallCenterReservati === ""
            || PropertyNfsFee === "" || MaxReservationDays === "" || PropertyNfsAchFee === "" || PropertyInsuranceFrozen === "" || PropertyInsuranceCancelDay === "" || PreReservationDays === ""
            || websiteEnabledDate === null  || nfsfeeeffectiveDate === null || callCentDate === null){
                bValidation = true ;
            } else {
                bValidation = false ;
            }

            if(bValidation === false){
          
            const payload = {
                PropertyLatitude: PropertyLatitude,
                PropertyLongitude: PropertyLongitude,
                PropertyAdminFee: PropertyAdminFee,
                AdminFeeEffectiveDate: adminFeeEffectiveDate,
                PropertyChurnStatus: this.getView().byId("propChurn").getValue(),
                ClimateControl: this.getView().byId("climControl").getSelectedKey(),
                PropertyWebsiteReservations: PropertyWebsiteReservations,
                WebsiteEnabledDate: websiteEnabledDate,
                PropertyCallCenterReservati: PropertyCallCenterReservati,
                CallCenterEnabledDate: callCentDate,
                PropertyNfsFee: PropertyNfsFee,
                MaxReservationDays: this.getView().byId("maxRes").getValue(),
                NsfFeeEffectiveDate: nfsfeeeffectiveDate,
                PropertyNfsAchFee: PropertyNfsAchFee,
                NfsAchFeeEffectiveDate: nfsAshfeeffectiveDate,
                PropertyInsuranceFrozen: PropertyInsuranceFrozen,
                PropertyInsuranceCancelDay: PropertyInsuranceCancelDay,
                PreReservationDays: PreReservationDays
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
        } else {
            MessageToast.show("Please Fill all mandatory fields");
        }

        }
	});
});