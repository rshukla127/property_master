sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
	"sap/ui/core/Fragment"
], function(
    Controller,
    UIComponent,
	Fragment
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
	});
});