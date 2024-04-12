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
    .extend("com.public.storage.pao.controller.SupplementalDetails", {
        formatter: formatter,
        onInit: function () {
            _oController = this;
            const oRouter = this.getRouter();
            oRouter.getRoute("propSuppDeatils").attachMatched(this._onRouteMatched, this);
            this._oBusyDialog = new BusyDialog();
			this.getView().addDependent(this._oBusyDialog);
            this.model = new JSONModel();
            this.model.setData({
				JSONModel: "None"
				// DrivingDirections: "None",
                // SpecialNotes: "None",
                // Apartments: "None"
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
            this.readConstructionCode();
            this.readPropertyData(Plant, LegacyPropertyNumber)

        },

        _onValueHelpConstructionCode: function(oEvent){
            this.getOwnerComponent.hasChanges = true;
            this.selectedField = oEvent.getSource().getCustomData()[0].getValue();
            const that =this;
            //var sInputValue = oEvent.getSource().getValue(),
              const oView = this.getView();

            if (!this._pValueHelpClimateControl) {
                this._pValueHelpClimateControl = Fragment.load({
                    id: oView.getId(),
                    name: "com.public.storage.pao.fragments.Supplemental.ConstructionCode",
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
        onDetectChange: function(oEvent){
            this.detectChanges();
        },

        onValueHelpDialogClose: function (oEvent) {
			let	oSelectedItem = oEvent.getParameter("selectedItem");
            let sTitle = oEvent.getSource().getTitle();
            // oEvent.getSource().getBinding("items").filter([]);
            if (!oSelectedItem) {
				return;
			}
            let sDescription = oSelectedItem.getDescription();
            let sCode =  oSelectedItem.getTitle();
            if (sTitle === "Construction Code" && this.selectedField === "constCode"){
                this.getView().getModel("plantBasicDetailsModel").setProperty("/ConstructionCode", `(${sCode}) ${sDescription}`);
                //this.getView().getModel("plantBasicDetailsModel").setProperty("/cccodeDesc", `${sDescription}`);
            
            } 
            if(sTitle === "Construction Code" && this.selectedField === "constCode2"){
                // this.byId("cCode").setValue(sDescription);
                // this._custCode = sCode
                this.getView().getModel("plantBasicDetailsModel").setProperty("/ConstructionCode2", `(${sCode}) ${sDescription}`);
                //this.getView().getModel("plantBasicDetailsModel").setProperty("/cccodeDesc", `${sDescription}`);
            } if(sTitle === "Climate Control"){
                // this.byId("cCode").setValue(sDescription);
                // this._custCode = sCode
                this.getView().getModel("plantBasicDetailsModel").setProperty("/ClimateControl", `(${sCode}) ${sDescription}`);
                //this.getView().getModel("plantBasicDetailsModel").setProperty("/climateControlDesc", `${sDescription}`);
            }
            if(sTitle === "Year Built"){
                // this.byId("cCode").setValue(sDescription);
                // this._custCode = sCode
                this.getView().getModel("plantBasicDetailsModel").setProperty("/YearBuilt", `${sCode}`);
            }
              
		},

        _onValueHelpYearBuild: function(oEvent){
            this.getOwnerComponent.hasChanges = true;
            const that =this;
            //var sInputValue = oEvent.getSource().getValue(),
              const oView = this.getView();

            if (!this._pValueHelpYearBuilt) {
                this._pValueHelpYearBuilt = Fragment.load({
                    id: oView.getId(),
                    name: "com.public.storage.pao.fragments.Supplemental.YearBuilt",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            this._oBusyDialog.open()
            this._pValueHelpYearBuilt.then(function (oDialog) {
                //that.readPropertyMasterData();
                that._oBusyDialog.close();
                // Create a filter for the binding
                //oDialog.getBinding("items").filter([new Filter("Name", FilterOperator.Contains, sInputValue)]);
                // Open ValueHelpDialog filtered by the input's value
                oDialog.open();
            });
        },

        onValueHelpDialogYBuild: function(oEvent){
            let sValue = oEvent.getParameter("value");
			let oFilter = new Filter("year", FilterOperator.Contains, sValue);
			oEvent.getSource().getBinding("items").filter([oFilter]);

        },

        onValueHelpDialogSearchCC: function(oEvent){
            let sValue = oEvent.getParameter("value");
			let oFilterDesc = new Filter("Description", FilterOperator.Contains, sValue);
            let oCodeFilter = new Filter("Code", FilterOperator.Contains, sValue);
            let oCombinedFilter = new Filter({
                filters: [oFilterDesc, oCodeFilter],
                and: false // Set to false for OR condition
            });
			oEvent.getSource().getBinding("items").filter([oCombinedFilter]);

        },

        onPressSaveSuppDetails: function(){
            this._oBusyDialog.open();
            const sPlant = this.getOwnerComponent().plant
            const that = this;
            const LegacyPropertyNumber = this.getOwnerComponent().LegacyPropertyNumber;
            var bValidation = true;
            let sTime = "T00:00:00";
            let floodzoneEffdate = this.byId("floodeffdate").getValue().split(".").reverse().join("-");
            let finalfloodzoneEffdate = floodzoneEffdate === "" ? sTime : new Date(floodzoneEffdate).toISOString().split("T")[0] + sTime;
            floodzoneEffdate = finalfloodzoneEffdate === "T00:00:00" ? null : finalfloodzoneEffdate;
               
            // let PropertyFeatures =  this.getView().byId("propFeature").getValue();
            // let DrivingDirections = this.getView().byId("driDirection").getValue();
            // let SpecialNotes = this.getView().byId("spNotes").getValue();
            let Apartments =  this.getView().byId("apart").getSelectedKey();
            let yearbuild = this.byId("year").getValue();
            let officeCount = this.byId("officeCount").getValue();
            let restRoomCount = this.byId("restRoomCount").getValue();

            // if (PropertyFeatures === "") {
            //     this.model.setProperty("/PropertyFeatures", "Error");
            // } else {
            //     this.model.setProperty("/PropertyFeatures", "None");
            // }

            // if (DrivingDirections === "") {
            //     this.model.setProperty("/DrivingDirections", "Error");
            // } else {
            //     this.model.setProperty("/DrivingDirections", "None");
            // }

            // if (SpecialNotes === "") {
            //     this.model.setProperty("/SpecialNotes", "Error");
            // } else {
            //     this.model.setProperty("/SpecialNotes", "None");
            // }

            if (Apartments === "") {
                this.model.setProperty("/Apartments", "Error");
            } else {
                this.model.setProperty("/Apartments", "None");
            }

            if (Apartments === ""){
                bValidation = true ;
            } else {
                bValidation = false ;
            }

            if (bValidation === false){
            const payload = {
                // PropertyFeatures: PropertyFeatures,
                // DrivingDirections: DrivingDirections,
                // SpecialNotes: SpecialNotes,
                Lockers: this.getView().byId("lock").getSelectedKey(),
                LargeTruckAccess: this.getView().byId("truck").getSelectedKey(),
                FurnitureDollies: this.getView().byId("furniture").getSelectedKey(),
                Basement: this.getView().byId("base").getSelectedKey(),
                HandTrucks: this.getView().byId("hand").getSelectedKey(),
                Carts: this.getView().byId("cart").getSelectedKey(),
                YearBuilt: yearbuild,
                CapIndexRisk: this.getView().byId("capIndex").getValue(),
                NumberOfBuildings: this.getView().byId("noOfBuild").getValue(),
                ConstructionCode: this.getView().byId("constCode").getValue(),
                NumberOfStories: this.getView().byId("noOfStories").getValue(),
                ConstructionCode2: this.getView().byId("constCode2").getValue(),
                LotSize: this.getView().byId("lotSize").getValue(),
                BuildingClassification: this.getView().byId("buildClass").getValue(),
                GrossSquareFootage: this.getView().byId("grossSQFoot").getValue(),
                FloodZone: this.getView().byId("floodzone").getSelectedKey(),
                MilesOfCostalWater25: this.getView().byId("tfmilesCoastWater").getValue(),
                Sprinkler: this.getView().byId("sprink").getSelectedKey(),
                SprinklerRemark: this.getView().byId("sprinkRem").getValue(),
                FireAlarm: this.getView().byId("fireAlarm").getSelectedKey(),
                FireAlarmRemarks: this.getView().byId("fireAlarmRemark").getValue(),
                BuglerAlarm: this.getView().byId("bugalarm").getSelectedKey(),
                BuglerAlarmRemarks: this.getView().byId("bugAlarmRemark").getValue(),
                ParkingSpaces:this.getView().byId("park").getSelectedKey(),
                Elevators:this.getView().byId("elevater").getSelectedKey(),
                Apartments:Apartments,
                SurvellianceCamera:this.getView().byId("camera").getSelectedKey(),
                SurvellianceCameraRemarks:this.getView().byId("surCamRemarks").getValue(),
                OfficeCount: officeCount,
                RestroomCount: restRoomCount,
                FloodInsEffDate: floodzoneEffdate
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