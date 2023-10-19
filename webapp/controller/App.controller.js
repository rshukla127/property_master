

sap.ui.define(["com/public/storage/pao/utils/reusecontroller",
    "sap/ui/model/json/JSONModel",
    'sap/m/ActionSheet',
    'sap/m/Button',
    'sap/m/MessageToast',
    'sap/ui/Device',
    'sap/ui/core/syncStyleClass',
    'sap/m/library',
    "sap/tnt/NavigationListItem",
    "sap/ui/core/Fragment",
    "sap/m/IllustrationPool",
    "sap/m/MessageBox"], function (BaseController, JSONModel, ActionSheet,
        Button,
        MessageToast,
        Device,
        syncStyleClass,
        mobileLibrary,
        NavigationListItem,
        Fragment,
        IllustrationPool,
        MessageBox) {
    "use strict";

    var _oController;
    // shortcut for sap.m.PlacementType
    const { PlacementType } = mobileLibrary;

    // shortcut for sap.m.VerticalPlacementType
    const { VerticalPlacementType } = mobileLibrary;

    // shortcut for sap.m.ButtonType
    const { ButtonType } = mobileLibrary;

    // shortcut for sap.m.URLHelper
    const { URLHelper } = mobileLibrary;

    return BaseController.extend("com.public.storage.pao.controller.App", {
        onInit: function () {
            _oController = this;

            const iOriginalBusyDelay = this.getView().getBusyIndicatorDelay();

            const oViewModel = new JSONModel({
                busy: false,
                delay: 0
            });

            this.getView().setModel(oViewModel, "appView");

            oViewModel.setProperty("/busy", false);
            oViewModel.setProperty("/delay", iOriginalBusyDelay);

            // apply content density mode to root view
            this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());

            if (Device.resize.width <= 1024) {
                this.onToggleSideNavPress();
            }
            Device.media.attachHandler(function (oDevice) {
                if ((oDevice.name === "Tablet" && this._bExpanded) ||
                    oDevice.name === "Desktop") {
                    this.onToggleSideNavPress();
                    // set the _bExpanded to false on tablet devices
                    // extending and collapsing of side navigation should be done when resizing from
                    // desktop to tablet screen sizes)
                    this._bExpanded = (oDevice.name === "Desktop");
                }
            }.bind(this));
            var oTntSet = {
                setFamily: "tnt",
                setURI: sap.ui.require.toUrl("sap/tnt/themes/base/illustrations")
            };
            IllustrationPool.registerIllustrationSet(oTntSet, false);

            var oRootPath = jQuery.sap.getModulePath("com.public.storage.pao"); // your resource root
		
                var oImageModel = new sap.ui.model.json.JSONModel({
                    path : oRootPath,
                });
                        
                this.getView().setModel(oImageModel, "imageModel");
        },

        /**
         * Toggle side navigation button event (Hamburger Button)
         *
         * @public
         */
        onToggleSideNavPress: function () {
            const oToolPage = this.byId("app");
            const bSideExpanded = oToolPage.getSideExpanded();
            this._setToggleButtonTooltip(bSideExpanded);

            oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
        },

        /**
         * Toggle side navigation button tooltip (Hamburger Button)
         *
         * @private
         * @param bSideExpanded boolean side menu expanded
         */
        _setToggleButtonTooltip: function (bSideExpanded) {
            const oToggleButton = this.byId('sideNavigationToggleButton');
            if (bSideExpanded) {
                oToggleButton.setTooltip('{i18n>sideNavToggleBtnTooltipLarge}');
            } else {
                oToggleButton.setTooltip('{i18n>sideNavToggleBtnTooltipSmall}');
            }
        },

        navItemFactory: function (sId, oContext) {
            return new NavigationListItem({
                text: oContext.getProperty("title"),
                icon: oContext.getProperty("icon"),
                key: oContext.getProperty("key"),
                expanded: oContext.getProperty("expanded"),
                visible: oContext.getProperty("visible") ?
                    oContext.getProperty("visible")
                    : true,
                items: {
                    path: 'sideNavigation>items',
                    factory: function (sNavItemID, oNavItemContext) {
                        return new NavigationListItem({
                            text: oNavItemContext.getProperty("title"),
                            key: oNavItemContext.getProperty("key"),
                            visible: true
                        });
                    }
                }
            });
        },

        /**
         * Convenience method for accessing the router.
         *
         * @public
         * @param {sap.ui.base.Event} oEvent The item select event
         */
        onItemSelect: function (oEvent) {
            const that = this;
            sap.ui.getCore().AppContext = {
                Source_NAME: "",
                Target_NAME: "",
                Source_DEPLOYMENT_ID: "",
                Target_DEPLOYMENT_ID: ""
            };

            const sKey = oEvent.getParameter('item').getKey();
            // if you click on home, settings or statistics button, call the navTo function
            if (sKey !== "noroute") {
                // if the device is phone, collaps the navigation side of the app to give more space
                if (Device.system.phone) {
                    this.onToggleSideNavPress();
                }
                else if (sKey === "home") {
                    this.getRouter().navTo(sKey);
                    
                } else if (this.getOwnerComponent().plant === "" || this.getOwnerComponent().LegacyPropertyNumber === "") {
                    return MessageBox.error("Enter the Plant/Property Details to proceed further!!",
                    {
                        title: "Error",
                        actions: [MessageBox.Action.OK],
                        onClose: function (oAction) {
                        }
                    }
                    );
                } else if (this.getOwnerComponent.hasChanges){
                    return MessageBox.confirm("You have unsaved changes. Do you want to Procced?",
                    {
                        title: "Confirmation",
                        actions: [MessageBox.Action.YES, MessageBox.Action.CANCEL],
                        emphasizedAction: MessageBox.Action.YES,
                        onClose: function (oAction) {
                            if (oAction === MessageBox.Action.YES) {
                                that.getRouter().navTo(sKey);
                            }                           
                        }
                    }
                    );

                } else {
                this.getRouter().navTo(sKey);
                oEvent.getSource().getItem().getItems().filter(item => item.setExpanded(false));
                oEvent.getParameter('item').getParent().setExpanded(true);
                }
            }
            else {
                // Menu item with submenu items change expanded state
                if (oEvent.getParameter('item').getExpanded()) {
                    oEvent.getParameter('item').setExpanded(false);
                } else {
                    oEvent.getSource().getItem().getItems().filter(
                        item => item.setExpanded(false));
                    //					oEvent.getSource().getFixedItem().getItems().filter(
                    //          							item => item.setExpanded(false));
                    oEvent.getParameter('item').setExpanded(true);
                }
            }
        }
    });
});


