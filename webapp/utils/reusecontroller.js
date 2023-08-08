sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
	"sap/ui/core/Fragment",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
], function(
    Controller,
    UIComponent,
	Fragment,
	MessageToast,
	JSONModel
) {
	"use strict";

	return Controller.extend("com.public.storage.pao.utils.reusecontroller", {

        /**
		 * Get the Component
		 *
		 * @public
		 * @returns {object} The Component
		 */
		getComponent: function () {
			return this.getOwnerComponent();
		},

		getRouter: function () {
			return UIComponent.getRouterFor(this);
		},

		readPropertyData: function(Plant, LegacyPropertyNumber){
            const that = this;
            const uri= `/PropertyMasterSet(Plant='${Plant}',LegacyPropertyNumber='${LegacyPropertyNumber}')`
            //this.BusyDialog.open()
            this._oModel.read(uri, {
                // urlParameters: {
                //     "$filter": this._Plant
                // },
                success: function (oData) {
                    //that.BusyDialog.close();
                    const oModel = new JSONModel(oData);
                    that.getView().setModel(oModel, "plantBasicDetailsModel")
                    sap.ui.getCore().setModel(oModel, "plantBasicDetailsModel");
                    that.getView().getModel("plantBasicDetailsModel").refresh();
                },
                error: function (oData) {
                    MessageToast.show("Something went wrong with Service")
                }
            })

        }
	});
});