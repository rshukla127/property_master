sap.ui.define([
	"com/public/storage/pao/utils/reusecontroller",
    "sap/m/BusyDialog",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "com/public/storage/pao/utils/formatter"
], function(
	BaseController, BusyDialog, MessageToast, JSONModel, formatter
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
            const Plant = this.getOwnerComponent().plant;
            const LegacyPropertyNumber= this.getOwnerComponent().LegacyPropertyNumber
            this._oModel = sap.ui.getCore().getModel("mainModel");
            this.readPropertyData(Plant, LegacyPropertyNumber)
            this.readPropertyMasterData(Plant, LegacyPropertyNumber);

        },

        onPressSaveBasicDetails: function(){
            const sPlant = this.getOwnerComponent().plant
            const LegacyPropertyNumber = this.getOwnerComponent().LegacyPropertyNumber
            var bValidation = true;
            let sTime = "T00:00:00"
            let sTollFreeNumber = this.getView().byId("tollFree").getValue();
            let sNetwork1IpAddress = this.getView().byId("network1").getValue();
            let sKioskProperty = this.getView().byId("kiskProp").getSelectedKey();
            let sPublishedPhoneNo = this.getView().byId("pubPhone").getValue();
            let sLocalPhoneNumber = this.getView().byId("localPh").getValue();
            let sNetwork2IpAddress =  this.getView().byId("network2").getValue();
            let kisokACtivDate = this.getView().byId("kisok").getValue();
            let sGeoCode = this.getView().byId("geo").getValue();
            
            let fromattedDate = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }).format(new Date(kisokACtivDate)) + sTime;
            kisokACtivDate = fromattedDate === "T00:00:00" ? null : fromattedDate ;

            if (sTollFreeNumber === "") {
                this.model.setProperty("/tollFreeNumber", "Error");
               
            } else {
                this.model.setProperty("/tollFreeNumber", "None");
             
            }

            if (sNetwork1IpAddress === "") {
                this.model.setProperty("/network1IpAddress", "Error");
               
            } else {
                this.model.setProperty("/network1IpAddress", "None");
             
            }

            if (sNetwork2IpAddress === "") {
                this.model.setProperty("/network2IpAddress", "Error");
               
            } else {
                this.model.setProperty("/network2IpAddress", "None");
              
            }

            if (sKioskProperty === "") {
                this.model.setProperty("/KioskProperty", "Error");
             
            } else {
                this.model.setProperty("/KioskProperty", "None");
               
            }

            if (kisokACtivDate === null) {
                this.model.setProperty("/KioskActiveDate", "Error");
               
            } else {
                this.model.setProperty("/KioskActiveDate", "None");
               
            }

            if (sPublishedPhoneNo === "") {
                this.model.setProperty("/publishedPhoneNo", "Error");
            } else {
                this.model.setProperty("/publishedPhoneNo", "None");
            }

            if (sLocalPhoneNumber === "") {
                this.model.setProperty("/localPhoneNumber", "Error");
              
            } else {
                this.model.setProperty("/localPhoneNumber", "None");
               
            }

            if (sGeoCode === "") {
                this.model.setProperty("/GeoCode", "Error");
                
            } else {
                this.model.setProperty("/GeoCode", "None");
            }
            
            if (sTollFreeNumber === "" || sGeoCode === "" || sLocalPhoneNumber === "" || sPublishedPhoneNo === "" || kisokACtivDate === null
            || sKioskProperty === "" || sNetwork2IpAddress === "" || sNetwork1IpAddress === ""){
                bValidation = true ;
            } else {
                bValidation = false ;
            }
            if (bValidation === false){
            const payload = {
                DirectPhoneNo: this.getView().byId("dirPhoneNo").getValue(),
                FaxNumber: this.getView().byId("faxNo").getValue(),
                TollFreeNumber: sTollFreeNumber,
                Network1IpAddress: sNetwork1IpAddress,
                KioskActiveDate: kisokACtivDate,
                KioskProperty: sKioskProperty,
                BuddyPropertyNumber: this.getView().byId("budProp").getValue(),
                RetailStoreSquareFootage: this.getView().byId("retailStoreSq").getValue(),
                HistoricalProperty: this.getView().byId("histProp").getValue(),
                PsaProperty: this.getView().byId("psaProp").getValue(),
                TransferFrom: this.getView().byId("transF").getValue(),
                PublishedPhoneNo: sPublishedPhoneNo,
                PropertyEmailAddress: this.getView().byId("email").getValue(),
                LocalPhoneNumber: sLocalPhoneNumber,
                Network2IpAddress: sNetwork2IpAddress,
                OfficeSquareFootage: this.getView().byId("offSq").getValue(),
                //DirectPhoneNo: this.getView().byId("").getValue(),
                RetailStorageSize:this.getView().byId("retailST").getValue(),
                HistoricalOwner:this.getView().byId("histOwner").getValue(),
                PsaOwner: this.getView().byId("PsaOwner").getValue(),
                GeoCode: sGeoCode
            }


           const uri= `/PropertyMasterSet(Plant='${sPlant}',LegacyPropertyNumber='${LegacyPropertyNumber}')`

            this._oModel.update(uri, payload, {
                // urlParameters: {
                //     "$filter": this._Plant
                // },
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