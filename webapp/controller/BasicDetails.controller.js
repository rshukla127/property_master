sap.ui.define([
	"com/public/storage/pao/utils/reusecontroller"
], function(
	BaseController
) {
	"use strict";
    var _oController;

	return 	BaseController
    .extend("com.public.storage.pao.controller.BasicDetails", {

        onInit: function () {
            _oController = this;

        }
	});
});