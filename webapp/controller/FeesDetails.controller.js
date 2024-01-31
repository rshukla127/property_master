sap.ui.define([
	"com/public/storage/pao/utils/reusecontroller",
    "sap/m/BusyDialog",
    "sap/m/MessageToast",
    "com/public/storage/pao/utils/formatter",
    "sap/ui/core/Fragment"
], function(
	BaseController,
    BusyDialog,
    MessageToast,
    formatter,
    Fragment
) {
	"use strict";
    var _oController;

	return 	BaseController
    .extend("com.public.storage.pao.controller.FeesDetails", {
        formatter: formatter,
        onInit: function () {
            _oController = this;
            const oRouter = this.getRouter();
            oRouter.getRoute("feesDetails").attachMatched(this._onRouteMatched, this);
            this._oBusyDialog = new BusyDialog();
			this.getView().addDependent(this._oBusyDialog);

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
            this.readFeeType();

        },


        _onValueHelFeeType: function(oEvent){
            this.selectedField = oEvent.getSource().getCustomData()[0].getValue();
            const that =this;
            //var sInputValue = oEvent.getSource().getValue(),
              const oView = this.getView();

            if (!this._pValueHelpFeeType) {
                this._pValueHelpFeeType = Fragment.load({
                    id: oView.getId(),
                    name: "com.public.storage.pao.fragments.FeeType.FeeTypes",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            this._oBusyDialog.open()
            this._pValueHelpFeeType.then(function (oDialog) {
                //that.readPropertyMasterData();
                that._oBusyDialog.close();
                oDialog.open();
            });

        },

        onValueHelpDialogClose: function (oEvent) {
			let	oSelectedItem = oEvent.getParameter("selectedItem");
            let sTitle = oEvent.getSource().getTitle();
            //oEvent.getSource().getBinding("items").filter([]);
            if (!oSelectedItem) {
				return;
			}
            let sDescription = oSelectedItem.getDescription();
            let sCode =  oSelectedItem.getTitle();
            if (this.selectedField === 'ftype1'){
            this.getView().getModel("plantBasicDetailsModel").setProperty("/FeesType1", `(${sCode}) ${sDescription}`);
            //this.getView().getModel("plantBasicDetailsModel").setProperty("/feetypeDesc", `${sDescription}`);
            }
            if (this.selectedField === 'ftype2'){
            this.getView().getModel("plantBasicDetailsModel").setProperty("/FeesType2", `(${sCode}) ${sDescription}`);
            //this.getView().getModel("plantBasicDetailsModel").setProperty("/feetypeDesc", `${sDescription}`);
            }
            if (this.selectedField === 'ftype3'){
            this.getView().getModel("plantBasicDetailsModel").setProperty("/FeesType3", `(${sCode}) ${sDescription}`);
            //this.getView().getModel("plantBasicDetailsModel").setProperty("/feetypeDesc", `${sDescription}`);
            }
            if (this.selectedField === 'ftype4'){
            this.getView().getModel("plantBasicDetailsModel").setProperty("/FeesType4", `(${sCode}) ${sDescription}`);
            //this.getView().getModel("plantBasicDetailsModel").setProperty("/feetypeDesc", `${sDescription}`);
            }
            if (this.selectedField === 'ftype5'){
            this.getView().getModel("plantBasicDetailsModel").setProperty("/FeesType5", `(${sCode}) ${sDescription}`);
            //this.getView().getModel("plantBasicDetailsModel").setProperty("/feetypeDesc", `${sDescription}`);
            }
            if (this.selectedField === 'ftype6'){
            this.getView().getModel("plantBasicDetailsModel").setProperty("/FeesType6", `(${sCode}) ${sDescription}`);
            //this.getView().getModel("plantBasicDetailsModel").setProperty("/feetypeDesc", `${sDescription}`);
                }
            if (this.selectedField === 'ftype7'){
            this.getView().getModel("plantBasicDetailsModel").setProperty("/FeesType7", `(${sCode}) ${sDescription}`);
            //this.getView().getModel("plantBasicDetailsModel").setProperty("/feetypeDesc", `${sDescription}`);
            }
            if (this.selectedField === 'ftype8'){
            this.getView().getModel("plantBasicDetailsModel").setProperty("/FeesType8", `(${sCode}) ${sDescription}`);
            //this.getView().getModel("plantBasicDetailsModel").setProperty("/feetypeDesc", `${sDescription}`);
            }
            if (this.selectedField === 'ftype9'){
            this.getView().getModel("plantBasicDetailsModel").setProperty("/FeesType9", `(${sCode}) ${sDescription}`);
            //this.getView().getModel("plantBasicDetailsModel").setProperty("/feetypeDesc", `${sDescription}`);
            }
            if (this.selectedField === 'ftype10'){
            this.getView().getModel("plantBasicDetailsModel").setProperty("/FeesType10", `(${sCode}) ${sDescription}`);
            //this.getView().getModel("plantBasicDetailsModel").setProperty("/feetypeDesc", `${sDescription}`);
            }
              
         
            
		},

        onPressSaveFeeDetails: function(){
            const that = this;
            this._oBusyDialog.open();
            const sPlant = this.getOwnerComponent().plant
            const LegacyPropertyNumber = this.getOwnerComponent().LegacyPropertyNumber
            const payload = {
                FeesType1: this.getView().byId("ftype1").getValue(),
                //FeesDescription1: this.getView().byId("fDes1").getValue(),
                Amount1: this.getView().byId("am1").getValue(),
                FeesType2: this.getView().byId("ftype1").getValue(),
                //FeesDescription2: this.getView().byId("fDes2").getValue(),
                Amount2: this.getView().byId("am2").getValue(),
                FeesType3: this.getView().byId("ftype3").getValue(),
                //FeesDescription3: this.getView().byId("fDes3").getValue(),
                Amount3: this.getView().byId("am3").getValue(),
                FeesType4: this.getView().byId("ftype4").getValue(),
                //FeesDescription4: this.getView().byId("fDes4").getValue(),
                Amount4: this.getView().byId("am4").getValue(),
                FeesType5: this.getView().byId("ftype5").getValue(),
                //FeesDescription5: this.getView().byId("fDes5").getValue(),
                Amount5: this.getView().byId("am5").getValue(),

                FeesType6: this.getView().byId("ftype6").getValue(),
                //FeesDescription6: this.getView().byId("fDes6").getValue(),
                Amount6: this.getView().byId("am6").getValue(),

                FeesType7: this.getView().byId("ftype7").getValue(),
                //FeesDescription7: this.getView().byId("fDes7").getValue(),
                Amount7: this.getView().byId("am7").getValue(),

                FeesType8: this.getView().byId("ftype8").getValue(),
                //FeesDescription8: this.getView().byId("fDes8").getValue(),
                Amount8: this.getView().byId("am8").getValue(),

                FeesType9: this.getView().byId("ftype9").getValue(),
                //FeesDescription9: this.getView().byId("fDes9").getValue(),
                Amount9: this.getView().byId("am9").getValue(),

                FeesType10: this.getView().byId("ftype10").getValue(),
                //FeesDescription10: this.getView().byId("fDes10").getValue(),
                Amount10: this.getView().byId("am10").getValue(),
            }
           const uri= `/PropertyMasterSet(Plant='${sPlant}',LegacyPropertyNumber='${LegacyPropertyNumber}')`

            this._oModel.update(uri, payload, {
                success: function (oData) {
                    that._oBusyDialog.close();
                   MessageToast.show(that.getView().getModel("i18n").getResourceBundle().getText("successMsg"));
                },
                error: function (oData) {
                    that._oBusyDialog.close();
                    MessageToast.show(that.getView().getModel("i18n").getResourceBundle().getText("errorMsg"));
                }
            })

        }
	});
});