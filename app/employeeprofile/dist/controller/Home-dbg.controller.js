sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "../model/constants"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("employeeprofile.controller.Home", {
            onInit: function () {
                this.oModel = this.getOwnerComponent().getModel();
                this.oModel = this.getOwnerComponent().getModel("ReportInfoModel");

            },
            onItemPress:function(Controller){
                var o=Controller.getSource();if(o){
                    var t=o.getBindingContext();if(t){
                        var n=t.getProperty("userId");
                        console.log(n)}}
                        var r=sap.ui.core.UIComponent.getRouterFor(this);
                        r.navTo("Details",{userId:n})
                    },
                    






        });
    });
