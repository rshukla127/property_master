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
    .extend("com.public.storage.pao.controller.InsuranceDetails", {
        formatter: formatter,
        onInit: function () {
            _oController = this;
            const oRouter = this.getRouter();
            oRouter.getRoute("insDetails").attachMatched(this._onRouteMatched, this);
            this._oBusyDialog = new BusyDialog();
			this.getView().addDependent(this._oBusyDialog);
            this.model = new JSONModel();
            this.model.setData({
				InsPrem2000: "None",
				InsPrem3000: "None",
                InsPrem4000: "None",
                InsPrem5000: "None",
                ErentalMaxDays: "None",
                CddStartDate: "None"
			});
            this.getView().setModel(this.model);

        },

        _onRouteMatched: function(oEvent){
            const Plant = this.getOwnerComponent().plant;
            const LegacyPropertyNumber= this.getOwnerComponent().LegacyPropertyNumber
            this._oModel = sap.ui.getCore().getModel("mainModel");
            this.readPropertyData(Plant, LegacyPropertyNumber)

        },

        onPressSaveInsuranceDetails: function(){
            const sPlant = this.getOwnerComponent().plant
            const LegacyPropertyNumber = this.getOwnerComponent().LegacyPropertyNumber
            let sTime = "T00:00:00";
            var bValidation = true;
            
            let cddStartDate = this.byId("startdate").getValue();
            let finrepD3 = this.byId("finrepD3").getValue();
            let finrepD4 = this.byId("finrepD4").getValue();
            let finrepD5 = this.byId("finrepD5").getValue();
            let finrepD6 = this.byId("finrepD6").getValue();
            let finrepD7 = this.byId("finrepD7").getValue();
            let finrepD8 = this.byId("finrepD8").getValue();
            let finrepD9 = this.byId("finrepD9").getValue();
            let finrepD10 = this.byId("finrepD10").getValue();
            let formattedD3 = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(finrepD3)) + sTime;
            let formattedD4 = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(finrepD4)) + sTime;
            let formattedD5 = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(finrepD5)) + sTime;
            let formattedD6 = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(finrepD6)) + sTime;
            let formattedD7 = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(finrepD7)) + sTime;
            let formattedD8 = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(finrepD8)) + sTime;
            let formattedD9 = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(finrepD9)) + sTime;
            let formattedD10 = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(finrepD10)) + sTime;
            let formattedCddStartDate = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(cddStartDate)) + sTime;
            finrepD3 = formattedD3 === "T00:00:00" ? null : formattedD3 ;
            finrepD4 = formattedD4 === "T00:00:00" ? null : formattedD4 ;
            finrepD5 = formattedD5 === "T00:00:00" ? null : formattedD5 ;
            finrepD6 = formattedD6 === "T00:00:00" ? null : formattedD6 ;
            finrepD7 = formattedD7 === "T00:00:00" ? null : formattedD7 ;
            finrepD8 = formattedD8 === "T00:00:00" ? null : formattedD8 ;
            finrepD9 = formattedD9 === "T00:00:00" ? null : formattedD9 ;
            finrepD10 = formattedD10 === "T00:00:00" ? null : formattedD10 ;
            cddStartDate = formattedCddStartDate === "T00:00:00" ? null : formattedCddStartDate ;
            
            let InsPrem2000 =  this.getView().byId("insprem2").getValue();
            let InsPrem3000 = this.getView().byId("insprem3").getValue();
            let InsPrem4000 = this.getView().byId("insprem4").getValue();
            let InsPrem5000 =  this.getView().byId("insprem5").getValue();
            let ErentalMaxDays = this.getView().byId("eRental").getValue();

            if (InsPrem2000 === "") {
                this.model.setProperty("/InsPrem2000", "Error");
            } else {
                this.model.setProperty("/InsPrem2000", "None");
            }

            if (InsPrem3000 === "") {
                this.model.setProperty("/InsPrem3000", "Error");
            } else {
                this.model.setProperty("/InsPrem3000", "None");
            }

            if (InsPrem4000 === "") {
                this.model.setProperty("/InsPrem4000", "Error");
            } else {
                this.model.setProperty("/InsPrem4000", "None");
            }

            if (InsPrem5000 === "") {
                this.model.setProperty("/InsPrem5000", "Error");
            } else {
                this.model.setProperty("/InsPrem5000", "None");
            }

            if (ErentalMaxDays === null) {
                this.model.setProperty("/ErentalMaxDays", "Error");
            } else {
                this.model.setProperty("/ErentalMaxDays", "None");
            }

            if (cddStartDate === "" || cddStartDate === null) {
                this.model.setProperty("/CddStartDate", "Error");
            } else {
                this.model.setProperty("/CddStartDate", "None");
            }

            if (cddStartDate === "" || cddStartDate === "" || ErentalMaxDays === "" || InsPrem5000 === "" || InsPrem4000 === ""
            || InsPrem3000 === "" || InsPrem2000 === ""){
                bValidation = true ;
            } else {
                bValidation = false ;
            }

            if(bValidation === false){
            const payload = {
                FinrepNum1: this.getView().byId("finrep1").getValue(),
                FinerepNum2: this.getView().byId("finrep2").getValue(),
                InsPrem2000: InsPrem2000,
                InsPrem3000: InsPrem3000,
                InsPrem4000: InsPrem4000,
                InsPrem5000: InsPrem5000,
                FinrepNum7: this.getView().byId("finrep7").getValue(),
                FinrepNum8: this.getView().byId("finrep8").getValue(),
                FinrepNum9: this.getView().byId("finrep9").getValue(),
                ErentalMaxDays: ErentalMaxDays,
                CddStartDate: cddStartDate,
                FinrepDate3: finrepD3,
                FinrepDate4: finrepD4,
                FinrepDate5: finrepD5,
                FinrepDate6: finrepD6,
                FinrepDate7: finrepD7,
                FinrepDate8: finrepD8,
                FinrepDate9: finrepD9,
                FinrepDate10: finrepD10
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