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
    .extend("com.public.storage.pao.controller.Phone", {
        formatter: formatter,
        onInit: function () {
            _oController = this;
            const oRouter = this.getRouter();
            oRouter.getRoute("phone").attachMatched(this._onRouteMatched, this);
            this._oBusyDialog = new BusyDialog();
			this.getView().addDependent(this._oBusyDialog);
            this.model = new JSONModel();
            this.model.setData({
                direPhoneNo: "None",
				faxNumber: "None",
                publishedPhNo: "None",
				tollfreeNo: "None",
                localPhoneNo: "None"
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
            this.readPropertyData(Plant, LegacyPropertyNumber);
            this.readPlantData(Plant);

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
                    //that.getOwnerComponent().getModel("plantsModel").setProperty("/Email", FilterData[0].Email);
                    that.getOwnerComponent().getModel("plantsModel").setProperty("/Faxnumber", FilterData[0].Faxnumber);
                    that.getOwnerComponent().getModel("plantsModel").setProperty("/Telnumber", FilterData[0].Telnumber);
                    // that.getView().setModel(oModel, "plantModelNew")
                    // sap.ui.getCore().setModel(oModel, "plantModelNew");
                    // that.getView().getModel("plantModelNew").refresh();
                },
                error: function (oData) {
                    that._oBusyDialog.close();
                    MessageToast.show("Something went wrong with Service")
                }
            })
        },

        onFormatPhoneNumber: function (oEvent) {
            const customData = oEvent.getSource().getCustomData()[0].getValue();
            const sValue = oEvent.getSource().getValue();
            // Remove non-numeric characters from the phone number
            let numericPhoneNumber = sValue.replace(/\D/g, '');
            // Format the phone number
            let formattedPhoneNumber = `(${numericPhoneNumber.substring(0, 3)})-${numericPhoneNumber.substring(3, 6)}-${numericPhoneNumber.substring(6)}`;
            // Set the formatted phone number based on custom data
            const model = this.getView().getModel("plantBasicDetailsModel");
        
            switch (customData) {
                case 'publishedPhNo1':
                    model.setProperty("/PublishedPhoneNo", formattedPhoneNumber);
                    break;
                case 'tollfreeNo':
                    model.setProperty("/TollFreeNumber", formattedPhoneNumber);
                    break;
                case 'localPhoneNo':
                    model.setProperty("/LocalPhoneNumber", formattedPhoneNumber);
                    break;
                case 'tollfreeNumber2':
                    model.setProperty("/TollFreeNumber2", formattedPhoneNumber);
                    break;
                case 'tollfreeNumber3':
                    model.setProperty("/TollFreeNumber3", formattedPhoneNumber);
                    break;
                case 'tollfreeNumber4':
                    model.setProperty("/TollFreeNumber4", formattedPhoneNumber);
                    break;
                case 'alarmPhoneNo1':
                    model.setProperty("/AlarmPhoneNumber1", formattedPhoneNumber);
                    break;
                case 'alarmPhoneNo2':
                    model.setProperty("/AlarmPhoneNumber2", formattedPhoneNumber);
                    break;
                case 'alarmPhoneNumber':
                    model.setProperty("/AlarmPhoneNumber", formattedPhoneNumber);
                    break;
                case 'burglarPhoneNo':
                    model.setProperty("/BurgAlarmPhoneNumber", formattedPhoneNumber);
                    break;
                case 'cellphoneNumber':
                    model.setProperty("/CellPhoneNumber", formattedPhoneNumber);
                    break;
                case 'directphoneNumber2':
                    model.setProperty("/DirectPhoneNo2", formattedPhoneNumber);
                    break;
                case 'directphoneNumber3':
                    model.setProperty("/DirectPhoneNo3", formattedPhoneNumber);
                    break;
                case 'extensionNumber':
                    model.setProperty("/ExtensionNumber", formattedPhoneNumber);
                    break;
                case 'officePhoneNumber':
                    model.setProperty("/OfficePhoneNumber", formattedPhoneNumber);
                    break;
                case 'publishedPhoneNo2':
                    model.setProperty("/PublishedPhoneNo2", formattedPhoneNumber);
                    break;
                case 'elevatprNo1':
                    model.setProperty("/ElevatorPhoneNo1", formattedPhoneNumber);
                    break;
                case 'elevatprNo2':
                    model.setProperty("/ElevatorPhoneNo2", formattedPhoneNumber);
                    break;
                case 'elevatprNo3':
                    model.setProperty("/ElevatorPhoneNo3", formattedPhoneNumber);
                    break;
                default:
                    break;
            }
            this.detectChanges();
        },
        

        onPressSavePhoneDetails: function(){
            this._oBusyDialog.open();
            const that = this;
            const sPlant = this.getOwnerComponent().plant
            const LegacyPropertyNumber = this.getOwnerComponent().LegacyPropertyNumber;
            let direPhoneNo = this.byId("direPhoneNo").getValue();
            let faxNumber = this.byId("faxNumber").getValue();
            let publishedPhNo = this.byId("publishedPhNo1").getValue();
            let tollfreeNo = this.byId("tollfreeNo").getValue();
            let localPhoneNo = this.byId("localPhoneNo").getValue();
            let tollfreeNumber2 = this.byId("tollfreeNumber2").getValue();
            let tollfreeNumber3 = this.byId("tollfreeNumber3").getValue();
            let tollfreeNumber4 = this.byId("tollfreeNumber4").getValue();
            let alarmPhoneNumber = this.byId("alarmPhoneNumber").getValue();
            let alarmPhoneNo1 = this.byId("alarmPhoneNo1").getValue();
            let alarmPhoneNo2 = this.byId("alarmPhoneNo2").getValue();
            let burglarPhoneNo = this.byId("burglarPhoneNo").getValue();
            let cellphoneNumber = this.byId("cellphoneNumber").getValue();
            let directphoneNumber2 = this.byId("directphoneNumber2").getValue();
            let directphoneNumber3 = this.byId("directphoneNumber3").getValue();
            let elevatprNo1 = this.byId("elevatprNo1").getValue();
            let elevatprNo2 = this.byId("elevatprNo2").getValue();
            let elevatprNo3 = this.byId("elevatprNo3").getValue();
            let extensionNumber = this.byId("extensionNumber").getValue();
            let officePhoneNumber = this.byId("officePhoneNumber").getValue();
            let publishedPhoneNo2 = this.byId("publishedPhoneNo2").getValue();


            let bValidation = true;

            // if (direPhoneNo === "") {
            //     this.model.setProperty("/direPhoneNo", "Error");
            // } else {
            //     this.model.setProperty("/direPhoneNo", "None");
            // }

            // if (faxNumber === "") {
            //     this.model.setProperty("/faxNumber", "Error");
            // } else {
            //     this.model.setProperty("/faxNumber", "None");
            // }

            if (publishedPhNo === "") {
                this.model.setProperty("/publishedPhNo", "Error");
            } else {
                this.model.setProperty("/publishedPhNo", "None");
            }

            if (tollfreeNo === "") {
                this.model.setProperty("/tollfreeNo", "Error");
            } else {
                this.model.setProperty("/tollfreeNo", "None");
            }

            if (localPhoneNo === "") {
                this.model.setProperty("/localPhoneNo", "Error");
            } else {
                this.model.setProperty("/localPhoneNo", "None");
            }

            if (publishedPhNo === "" || tollfreeNo === "" || localPhoneNo === ""){
                bValidation = true ;
            } else {
                bValidation = false ;
            }

            if (bValidation === false){
            const payload = {
                DirectPhoneNo: direPhoneNo,
                FaxNumber: faxNumber,
                PublishedPhoneNo: publishedPhNo,
                TollFreeNumber: tollfreeNo,
                LocalPhoneNumber: localPhoneNo,
                TollFreeNumber2: tollfreeNumber2,
                TollFreeNumber3: tollfreeNumber3,
                TollFreeNumber4: tollfreeNumber4,
                AlarmPhoneNumber: alarmPhoneNumber,
                AlarmPhoneNumber1: alarmPhoneNo1,
                AlarmPhoneNumber2: alarmPhoneNo2,
                BurgAlarmPhoneNumber:burglarPhoneNo,
                CellPhoneNumber: cellphoneNumber,
                DirectPhoneNo2: directphoneNumber2,
                DirectPhoneNo3: directphoneNumber3,
                ElevatorPhoneNo1: elevatprNo1,
                ElevatorPhoneNo2: elevatprNo2,
                ElevatorPhoneNo3:elevatprNo3,
                ExtensionNumber: extensionNumber,
                OfficePhoneNumber: officePhoneNumber,
                PublishedPhoneNo2: publishedPhoneNo2
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
        } else {
            this._oBusyDialog.close();
            MessageToast.show("Please Fill all mandatory fields");
        }
        }
	});
});