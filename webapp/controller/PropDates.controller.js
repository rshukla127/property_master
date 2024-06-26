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
            const oRouter = this.getRouter();
            this.getOwnerComponent.hasChanges = false;
            const Plant = this.getOwnerComponent().plant;
            if (Plant === undefined) {
                return  oRouter.navTo("home");
              }
            const LegacyPropertyNumber= this.getOwnerComponent().LegacyPropertyNumber
            this._oModel = sap.ui.getCore().getModel("mainModel");
            this.readPropertyData(Plant, LegacyPropertyNumber)

        },
        onDetectChange: function(oEvent){
            this.detectChanges();
        },

        onPressSavePropDates: function(){
            this._oBusyDialog.open();
            const that = this;
            const sPlant = this.getOwnerComponent().plant
            const LegacyPropertyNumber = this.getOwnerComponent().LegacyPropertyNumber;
            var bValidation = true;
            let sTime = "T00:00:00";
            let valResstartdate = this.byId("restrtdate").getValue().split(".").reverse().join("-");
            let valnewOwnerdate = this.byId("newOwnerdate").getValue().split(".").reverse().join("-");
            let valorstartdate = this.byId("orstartdate").getValue().split(".").reverse().join("-");
            let valterminationdate = this.byId("terminationdate").getValue().split(".").reverse().join("-");
            let valbucreatedate = this.byId("bucreatedate").getValue().split(".").reverse().join("-");
            let finalStartDate = valResstartdate === "" ? sTime : new Date(valResstartdate).toISOString().split("T")[0] + sTime;
            let finalOwnerDate = valnewOwnerdate === "" ? sTime : new Date(valnewOwnerdate).toISOString().split("T")[0] + sTime;
            let finalvalorstartdate = valorstartdate === "" ? sTime : new Date(valorstartdate).toISOString().split("T")[0] + sTime;
            let finalvalterminationdate = valterminationdate === "" ? sTime : new Date(valterminationdate).toISOString().split("T")[0] + sTime;
            let finalbucreatedate = valbucreatedate === "" ? sTime : new Date(valbucreatedate).toISOString().split("T")[0] + sTime;
            valResstartdate = finalStartDate === "T00:00:00" ? null : finalStartDate ;
            valnewOwnerdate = finalOwnerDate === "T00:00:00" ? null : finalOwnerDate ;
            valorstartdate = finalvalorstartdate === "T00:00:00" ? null : finalvalorstartdate ;
            valterminationdate = finalvalterminationdate === "T00:00:00" ? null : finalvalterminationdate ;
            valbucreatedate = finalbucreatedate === "T00:00:00" ? null : finalbucreatedate ;


            // if (valResstartdate === null || valResstartdate === "") {
            //     this.model.setProperty("/ReStartDate", "Error");
            // } else {
            //     this.model.setProperty("/ReStartDate", "None");
            // }

            // if (valnewOwnerdate === null || valnewOwnerdate === "" ) {
            //     this.model.setProperty("/NewOwnershipDate", "Error");
            // } else {
            //     this.model.setProperty("/NewOwnershipDate", "None");
            // }

            // if (valorstartdate === null || valorstartdate === "") {
            //     this.model.setProperty("/OriginalStartDate", "Error");
            // } else {
            //     this.model.setProperty("/OriginalStartDate", "None");
            // }

            // if (valterminationdate === null || valterminationdate === "") {
            //     this.model.setProperty("/TerminationDate", "Error");
            // } else {
            //     this.model.setProperty("/TerminationDate", "None");
            // }

            // if (valbucreatedate === null || valbucreatedate === "") {
            //     this.model.setProperty("/BuCreateDate", "Error");
            // } else {
            //     this.model.setProperty("/BuCreateDate", "None");
            // }

            // if (valResstartdate === null || valnewOwnerdate === null  || valorstartdate === null
            // || valterminationdate === null || valbucreatedate === null){
            //     bValidation = true ;
            // } else {
            //     bValidation = false ;
            // }

            // if(bValidation === false){
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
                    that._oBusyDialog.close();
                    that.getOwnerComponent.hasChanges = false;
                   MessageToast.show("Saved Successfully");
                },
                error: function (oData) {
                    that._oBusyDialog.close();
                    MessageToast.show("Something went wrong with Service")
                }
            })
        } 
        // else {
        //     this._oBusyDialog.close();
        //     MessageToast.show("Please Fill all mandatory fields");
        // }
        //}

	});
});