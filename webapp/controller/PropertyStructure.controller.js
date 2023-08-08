sap.ui.define([
	"com/public/storage/pao/utils/reusecontroller"
], function(
	BaseController
) {
	"use strict";
    var _oController;

	return 	BaseController
    .extend("com.public.storage.pao.controller.PropertyStructure", {

        onInit: function () {
            _oController = this;

        }
	});
});