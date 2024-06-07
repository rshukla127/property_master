sap.ui.define([
	"com/public/storage/pao/utils/reusecontroller",
    "sap/m/BusyDialog",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    "com/public/storage/pao/utils/formatter"
], function(
	BaseController,
    BusyDialog,
    MessageToast,
    Fragment,
    JSONModel,
    formatter
) {
	"use strict";
    var _oController;

	return 	BaseController
    .extend("com.public.storage.pao.controller.PropertyNotes", {
        formatter: formatter,
        onInit: function () {
            _oController = this;
            const oRouter = this.getRouter();
            oRouter.getRoute("propNotes").attachMatched(this._onRouteMatched, this);
            this._oBusyDialog = new BusyDialog();
			this.getView().addDependent(this._oBusyDialog);
            this.model = new JSONModel();
            this.model.setData({
                DrivingDirections: "None",
                SpecialNotes: "None",
                Apartments: "None"
			});
            this.getView().setModel(this.model);


        },

        onDetectChange: function(oEvent){
            this.detectChanges();
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
            this.readPropertyData(Plant, LegacyPropertyNumber);

        },

        onPressSavePropertyNotes: function(){
            this._oBusyDialog.open();
            const that = this;
            const sPlant = this.getOwnerComponent().plant
            const LegacyPropertyNumber = this.getOwnerComponent().LegacyPropertyNumber;
            let PropertyFeatures =  this.getView().byId("propFeature").getValue();
                PropertyFeatures = PropertyFeatures?.replace(/[\n\r]/g, '');
            let DrivingDirections = this.getView().byId("driDirection").getValue();
                DrivingDirections = DrivingDirections?.replace(/[\n\r]/g, '');
            let SpecialNotes = this.getView().byId("spNotes").getValue();
                SpecialNotes = SpecialNotes?.replace(/[\n\r]/g, '');
        //     let bValidation = true;

        //    if (PropertyFeatures === "") {
        //         this.model.setProperty("/PropertyFeatures", "Error");
        //     } else {
        //         this.model.setProperty("/PropertyFeatures", "None");
        //     }

        //     if (DrivingDirections === "") {
        //         this.model.setProperty("/DrivingDirections", "Error");
        //     } else {
        //         this.model.setProperty("/DrivingDirections", "None");
        //     }

        //     if (SpecialNotes === "") {
        //         this.model.setProperty("/SpecialNotes", "Error");
        //     } else {
        //         this.model.setProperty("/SpecialNotes", "None");
        //     }

        //     if (PropertyFeatures === "" || DrivingDirections === "" || SpecialNotes === ""){
        //         bValidation = true ;
        //     } else {
        //         bValidation = false ;
        //     }

            const payload = {
                PropertyFeatures: PropertyFeatures,
                DrivingDirections: DrivingDirections,
                SpecialNotes: SpecialNotes,
            }
           const uri= `/PropertyMasterSet(Plant='${sPlant}',LegacyPropertyNumber='${LegacyPropertyNumber}')`
           
            this._oModel.update(uri, payload, {
                success: function (oData) {
                    that._oBusyDialog.close();
                    that.getOwnerComponent.hasChanges = false;
                   MessageToast.show("Saved Successfully");
                },
                error: function (error) {
                    that._oBusyDialog.close();
                    MessageToast.show("Something went wrong with Service")
                }
            })
       
        }
	});
});