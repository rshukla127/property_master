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
	BaseController, BusyDialog, MessageToast, JSONModel, formatter, Fragment, Filter, FilterOperator, FilterType
) {
	"use strict";
    var _oController;

	return 	BaseController
    .extend("com.public.storage.pao.controller.BasicDetails", {
        formatter: formatter,
        onInit: function () {
            _oController = this;

            const oRouter = this.getRouter();
            oRouter.getRoute("basicDetails").attachMatched(this._onRouteMatched, this);
            this._oBusyDialog = new BusyDialog();
			this.getView().addDependent(this._oBusyDialog);
            this.model = new JSONModel();
			this.model.setData({
				publishedPhoneNo: "None",
				tollFreeNumber: "None",
                localPhoneNumber: "None",
                network1IpAddress: "None",
                network2IpAddress: "None",
                KioskActiveDate: "None",
                KioskProperty: "None",
                GeoCode: "None"
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
            this.readPlantData(Plant);

        },

       onDetectChange: function(oEvent){
            this.detectChanges();
        },

        readPlantData: function(Plant){
            const that = this;
            const uri= `/PlantMasterSet`
            this._oBusyDialog.open();
            this._oModel.read(uri, {
                success: function (oData) {
                    that._oBusyDialog.close();
                    const oModel = new JSONModel(oData.results);
                    const FilterData = oModel.getData().filter( item => item.Werks === Plant);
                    that.getOwnerComponent().getModel("plantsModel").setProperty("/Address", FilterData[0].Address);
                    that.getOwnerComponent().getModel("plantsModel").setProperty("/Email", FilterData[0].Email);
                    that.getOwnerComponent().getModel("plantsModel").setProperty("/Faxnumber", FilterData[0].Faxnumber);
                    that.getOwnerComponent().getModel("plantsModel").setProperty("/Telnumber", FilterData[0].Telnumber);
                },
                error: function (oData) {
                    that._oBusyDialog.close();
                    MessageToast.show("Something went wrong with Service")
                }
            })
        },

        _onValueHelpRequestProperty: function (oEvent) {
            this.getOwnerComponent.hasChanges = true;
            const that =this;
            var sInputValue = oEvent.getSource().getValue(),
                oView = this.getView();
            if (!this._pValueHelpDialogProp) {
                this._pValueHelpDialogProp = Fragment.load({
                    id: oView.getId(),
                    name: "com.public.storage.pao.fragments.BasicDetails.Property",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            this._oBusyDialog.open()
            this._pValueHelpDialogProp.then(function (oDialog) {
                that.readPropertyMasterBuddyData();
                that._oBusyDialog.close();
                
                oDialog.open(sInputValue);
            });
        },

        onValueHelpDialogSearchProperty: function(oEvent){
            var sValue = oEvent.getParameter("value");
			var oFilterPlant = new Filter("Werks", FilterOperator.Contains, sValue);
            // var oFilterProp = new Filter("Name1", FilterOperator.Contains, sValue);

			oEvent.getSource().getBinding("items").filter([oFilterPlant]);
        },

        onValueHelpDialogConfirmProperty: function (oEvent) {
            let oItem = oEvent.getParameter("selectedItem");
            let sProperty = oItem.getBindingContext("plantsBuddyModel").getObject().Name2
            this.getView().byId("budProp").setValue(sProperty);

        },


        readPropertyMasterBuddyData: function () {
            const that = this;
            this._oBusyDialog.open()
            return new Promise(function(){
                that._oModel.read(`/PlantMasterSet`, {
                    success: function (oData) {
                        that._oBusyDialog.close();
                        const oModel = new JSONModel(oData.results);
                        that.getOwnerComponent().setModel(oModel, "plantsBuddyModel")
                        sap.ui.getCore().setModel(oModel, "plantsBuddyModel");
                    },
                    error: function (oData) {
                        that._oBusyDialog.close();
                        MessageToast.show("Something went wrong with Service")
                    }
                });
            });

        },

        onPressSaveBasicDetails: function(){
            this._oBusyDialog.open();
            const that = this;
            const sPlant = this.getOwnerComponent().plant
            const LegacyPropertyNumber = this.getOwnerComponent().LegacyPropertyNumber
            var bValidation = true;
            let sTime = "T00:00:00";
            let sKioskProperty = this.getView().byId("kiskProp").getSelectedKey();
            let kisokACtivDate = this.getView().byId("kisok").getValue().split(".").reverse().join("-");
            let sGeoCode = this.getView().byId("geo").getValue();
            if (kisokACtivDate !== ""){
                let fromattedDate = new Date(kisokACtivDate).toISOString().split("T")[0] + sTime;
                kisokACtivDate = fromattedDate === "T00:00:00" ? null : fromattedDate ;
            } else {
                kisokACtivDate = null
            }

            if (sKioskProperty ==="Y" && (kisokACtivDate === "" || kisokACtivDate == null)){
                this._oBusyDialog.close();
                return MessageToast.show("Kiosk Active Date cannot be blank");
            } else {

            }
            

            if (sKioskProperty === "") {
                this.model.setProperty("/KioskProperty", "Error");
             
            } else {
                this.model.setProperty("/KioskProperty", "None");
               
            }

            if (sGeoCode === "") {
                this.model.setProperty("/GeoCode", "Error");
                
            } else {
                this.model.setProperty("/GeoCode", "None");
            }
            
            if (sGeoCode === "" ||  sKioskProperty === ""){
                bValidation = true ;
            } else {
                bValidation = false ;
            }
            if (bValidation === false){
            const payload = {
              
                KioskActiveDate: kisokACtivDate,
                KioskProperty: sKioskProperty,
                BuddyPropertyNumber: this.getView().byId("budProp").getValue(),
                RetailStoreSquareFootage: this.getView().byId("retailStoreSq").getValue(),
                HistoricalProperty: this.getView().byId("histProp").getValue(),
                PsaProperty: this.getView().byId("psaProp").getValue(),
                TransferFrom: this.getView().byId("transF").getValue(),
                //PublishedPhoneNo: sPublishedPhoneNo,
                PropertyEmailAddress: this.getView().byId("email").getValue(),
                //LocalPhoneNumber: sLocalPhoneNumber,
                //Network2IpAddress: sNetwork2IpAddress,
                OfficeSquareFootage: this.getView().byId("offSq").getValue(),
                //DirectPhoneNo: this.getView().byId("").getValue(),
                RetailStorageSize:this.getView().byId("retailST").getValue(),
                HistoricalOwner:this.getView().byId("histOwner").getValue(),
                PsaOwner: this.getView().byId("PsaOwner").getValue(),
                GeoCode: sGeoCode
            }


           const uri= `/PropertyMasterSet(Plant='${sPlant}',LegacyPropertyNumber='${LegacyPropertyNumber}')`
           
            this._oModel.update(uri, payload, {
                success: function (oData) {
                   MessageToast.show(that.getView().getModel("i18n").getResourceBundle().getText("successMsg"));
                   that.getOwnerComponent.hasChanges = false;
                   that._oBusyDialog.close();
                },
                error: function (error) {
                    MessageToast.show(that.getView().getModel("i18n").getResourceBundle().getText("errorMsg"))
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