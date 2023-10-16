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
    .extend("com.public.storage.pao.controller.Internet", {
        formatter: formatter,
        onInit: function () {
            _oController = this;
            const oRouter = this.getRouter();
            oRouter.getRoute("internet").attachMatched(this._onRouteMatched, this);
            this._oBusyDialog = new BusyDialog();
			this.getView().addDependent(this._oBusyDialog);
            this.model = new JSONModel();
            this.model.setData({
                n1ip: "None",
				n2ip: "None",
			});
            this.getView().setModel(this.model);


        },

        _onRouteMatched: function(oEvent){
            const Plant = this.getOwnerComponent().plant;
            const LegacyPropertyNumber= this.getOwnerComponent().LegacyPropertyNumber
            this._oModel = sap.ui.getCore().getModel("mainModel");
            this.readPropertyData(Plant, LegacyPropertyNumber);

        },

        onPressSaveInternetDetails: function(){

            const that = this;
            const sPlant = this.getOwnerComponent().plant
            const LegacyPropertyNumber = this.getOwnerComponent().LegacyPropertyNumber;
            let n1ip = this.byId("n1ip").getValue();
            let n2ip = this.byId("n2ip").getValue();
            let ntype = this.byId("ntype").getValue();
            let nvendor = this.byId("nvendor").getValue();
            let nrouteradd = this.byId("nrouteradd").getValue();

            let bValidation = true;

            if (n1ip === "") {
                this.model.setProperty("/n1ip", "Error");
            } else {
                this.model.setProperty("/n1ip", "None");
            }
            if (n2ip === "") {
                this.model.setProperty("/n2ip", "Error");
            } else {
                this.model.setProperty("/n2ip", "None");
            }

            if (n2ip === "" || n1ip === ""){
                bValidation = true ;
            } else {
                bValidation = false ;
            }

            if (bValidation === false){
            const payload = {
                Network1IpAddress: n1ip,
                Network2IpAddress: n2ip,
                NetworkType: ntype,
                NetworkVendor: nvendor,
                NetworkRouterAddress: nrouteradd
            }
           const uri= `/PropertyMasterSet(Plant='${sPlant}',LegacyPropertyNumber='${LegacyPropertyNumber}')`
           this._oBusyDialog.open();
            this._oModel.update(uri, payload, {
                success: function (oData) {
                    that._oBusyDialog.close();
                   MessageToast.show("Saved Successfully");
                },
                error: function (error) {
                    that._oBusyDialog.close();
                    MessageToast.show("Something went wrong with Service")
                }
            })
        } else {
            MessageToast.show("Please Fill all mandatory fields");
        }
        }
	});
});