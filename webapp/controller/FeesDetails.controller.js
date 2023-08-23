sap.ui.define([
	"com/public/storage/pao/utils/reusecontroller",
    "sap/m/BusyDialog",
    "sap/m/MessageToast",
    "com/public/storage/pao/utils/formatter"
], function(
	BaseController,
    BusyDialog,
    MessageToast,
    formatter
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
            const Plant = this.getOwnerComponent().plant;
            const LegacyPropertyNumber= this.getOwnerComponent().LegacyPropertyNumber
            this._oModel = sap.ui.getCore().getModel("mainModel");
            this.readPropertyData(Plant, LegacyPropertyNumber)

        },

        onPressSaveFeeDetails: function(){
            const sPlant = this.getOwnerComponent().plant
            const LegacyPropertyNumber = this.getOwnerComponent().LegacyPropertyNumber
            const payload = {
                FeesType1: this.getView().byId("ftype1").getValue(),
                FeesDescription1: this.getView().byId("fDes1").getValue(),
                Amount1: this.getView().byId("am1").getValue(),
                FeesType2: this.getView().byId("ftype1").getValue(),
                FeesDescription2: this.getView().byId("fDes2").getValue(),
                Amount2: this.getView().byId("am2").getValue(),
                FeesType3: this.getView().byId("ftype3").getValue(),
                FeesDescription3: this.getView().byId("fDes3").getValue(),
                Amount3: this.getView().byId("am3").getValue(),
                FeesType4: this.getView().byId("ftype4").getValue(),
                FeesDescription4: this.getView().byId("fDes4").getValue(),
                Amount4: this.getView().byId("am4").getValue(),
                FeesType5: this.getView().byId("ftype5").getValue(),
                FeesDescription5: this.getView().byId("fDes5").getValue(),
                Amount5: this.getView().byId("am5").getValue(),

                FeesType6: this.getView().byId("ftype6").getValue(),
                FeesDescription6: this.getView().byId("fDes6").getValue(),
                Amount6: this.getView().byId("am6").getValue(),

                FeesType7: this.getView().byId("ftype7").getValue(),
                FeesDescription7: this.getView().byId("fDes7").getValue(),
                Amount7: this.getView().byId("am7").getValue(),

                FeesType8: this.getView().byId("ftype8").getValue(),
                FeesDescription8: this.getView().byId("fDes8").getValue(),
                Amount8: this.getView().byId("am8").getValue(),

                FeesType9: this.getView().byId("ftype9").getValue(),
                FeesDescription9: this.getView().byId("fDes9").getValue(),
                Amount9: this.getView().byId("am9").getValue(),

                FeesType10: this.getView().byId("ftype10").getValue(),
                FeesDescription10: this.getView().byId("fDes10").getValue(),
                Amount10: this.getView().byId("am10").getValue(),
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

        }
	});
});