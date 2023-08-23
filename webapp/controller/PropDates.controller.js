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
    .extend("com.public.storage.pao.controller.PropDates", {
        formatter: formatter,
        onInit: function () {
            _oController = this;
            const oRouter = this.getRouter();
            oRouter.getRoute("propDates").attachMatched(this._onRouteMatched, this);
            this._oBusyDialog = new BusyDialog();
			this.getView().addDependent(this._oBusyDialog);
            this.model = new JSONModel();
            this.model.setData({
				ReStartDate: "None",
				NewOwnershipDate: "None",
                OriginalStartDate: "None",
                OriginalStartDate: "None",
                BuCreateDate: "None"
			});
            this.getView().setModel(this.model);

        },

        _onRouteMatched: function(oEvent){
            const Plant = this.getOwnerComponent().plant;
            const LegacyPropertyNumber= this.getOwnerComponent().LegacyPropertyNumber
            this._oModel = sap.ui.getCore().getModel("mainModel");
            this.readPropertyData(Plant, LegacyPropertyNumber)

        },

        onPressSavePropDates: function(){
            const sPlant = this.getOwnerComponent().plant
            const LegacyPropertyNumber = this.getOwnerComponent().LegacyPropertyNumber;
            var bValidation = true;
            let sTime = "T00:00:00";
            let valResstartdate = this.byId("restrtdate").getValue();
            let valnewOwnerdate = this.byId("newOwnerdate").getValue();
            let valorstartdate = this.byId("orstartdate").getValue();
            let valterminationdate = this.byId("terminationdate").getValue();
            let valbucreatedate = this.byId("bucreatedate").getValue();
            let finalStartDate = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(valResstartdate)) + sTime;
            let finalOwnerDate = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(valnewOwnerdate)) + sTime;
            let finalvalorstartdate = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(valorstartdate)) + sTime;
            let finalvalterminationdate = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(valterminationdate)) + sTime;
            let finalbucreatedate = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(valbucreatedate)) + sTime;
            valResstartdate = finalStartDate === "T00:00:00" ? null : finalStartDate ;
            valnewOwnerdate = finalOwnerDate === "T00:00:00" ? null : finalOwnerDate ;
            valorstartdate = finalvalorstartdate === "T00:00:00" ? null : finalvalorstartdate ;
            valterminationdate = finalvalterminationdate === "T00:00:00" ? null : finalvalterminationdate ;
            valbucreatedate = finalbucreatedate === "T00:00:00" ? null : finalbucreatedate ;


            if (valResstartdate === null) {
                this.model.setProperty("/ReStartDate", "Error");
            } else {
                this.model.setProperty("/ReStartDate", "None");
            }

            if (valnewOwnerdate === null) {
                this.model.setProperty("/NewOwnershipDate", "Error");
            } else {
                this.model.setProperty("/NewOwnershipDate", "None");
            }

            if (valorstartdate === null) {
                this.model.setProperty("/OriginalStartDate", "Error");
            } else {
                this.model.setProperty("/OriginalStartDate", "None");
            }

            if (valterminationdate === null) {
                this.model.setProperty("/TerminationDate", "Error");
            } else {
                this.model.setProperty("/TerminationDate", "None");
            }

            if (valbucreatedate === null) {
                this.model.setProperty("/BuCreateDate", "Error");
            } else {
                this.model.setProperty("/BuCreateDate", "None");
            }

            if (valResstartdate === null || valnewOwnerdate === null  || valorstartdate === null
            || valterminationdate === null || valbucreatedate === null){
                bValidation = true ;
            } else {
                bValidation = false ;
            }

            if(bValidation === false){
            const payload = {
                ReStartDate: valResstartdate,
                NewOwnershipDate: valnewOwnerdate,
                OriginalStartDate: valorstartdate,
                TerminationDate: valterminationdate,
                BuCreateDate: valbucreatedate
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