sap.ui.define([
	"com/public/storage/pao/utils/reusecontroller",
    "sap/m/BusyDialog",
    "sap/m/MessageToast"
], function(
	BaseController,
    BusyDialog,
    MessageToast
) {
	"use strict";
    var _oController;

	return 	BaseController
    .extend("com.public.storage.pao.controller.SupplementalDetails", {

        onInit: function () {
            _oController = this;

        }
	});
});