sap.ui.define([
    "sap/ui/core/mvc/Controller",
    ],
   

    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";
        
        return Controller.extend("employeeprofile.controller.Details", {
            
            onInit: function () {
                this.oSFModel = this.getOwnerComponent().getModel();
                this.oModel = this.getOwnerComponent().getModel("ReportInfoModel");
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("Details").attachPatternMatched(this._onObjectMatched, this);
            },
    
            _onObjectMatched: async function (oEvent) {
                this.fetchusersReport(oEvent).then((oData) => {
                    this.oModel.setProperty("/busy", false);
                }).catch((oErr) => {
                    this.oModel.setProperty("/busy", false);
                });
            },

            

            
           
            fetchusersReport : async function (oEvent) {
                return new Promise(function (resolve, reject) {
                    var args = oEvent.getParameter("arguments");
                    console.log('arguments',args);
                    var userId=args.userId;
                    console.log("Please trigger:", userId);
                    this.oModel.setProperty("/busy", true);
                    this.oSFModel.setDeferredGroups(["batchuserpersonalinfo"]);
                    this.oSFModel.callFunction("/userpersonalinfo", {
                        method: "GET",
                        batchGroupId: "batchuserpersonalinfo",
                        urlParameters: {
            
                            userId: userId
                           
                        }
                    });

                    this.oSFModel.callFunction("/userjobinfo", {
                        method: "GET",
                        batchGroupId: "batchuserpersonalinfo",
                        urlParameters: {
                            userId: userId
                          
                        }
                    });

                    this.oSFModel.callFunction("/usersPhoto", {
                        method: "GET",
                        batchGroupId: "batchuserpersonalinfo",
                        urlParameters: {
                            userId: userId,
                           
                        }
                    });
                    this.oSFModel.callFunction("/compensationinfo", {
                        method: "GET",
                        batchGroupId: "batchuserpersonalinfo",
                        urlParameters: {
                            userId: userId,
                            
                        }
                    });

                    

                    this.oSFModel.submitChanges({
                        batchGroupId: "batchuserpersonalinfo",
                        success: function (oData) {
                            var aUsers = []
                            if (oData.__batchResponses[0].statusCode == '200') {
                                aUsers = oData.__batchResponses[0].data.results;
                            }

                           
                    
                            if (oData.__batchResponses[1].statusCode == '200') {
                                aUsers = oData.__batchResponses[1].data.results;
                            
                                }
                            

                            if (oData.__batchResponses[2].statusCode == '200') {
                              
                                    aUsers = oData.__batchResponses[2].data.results;
                                }
                             

                            if (oData.__batchResponses[3].statusCode == '200') {
                                aUsers = oData.__batchResponses[3].data.results;
                
                        
                            }
                        
                            console.log("aUsers",aUsers);
                            this.oModel.setProperty("/Users", aUsers);
                            
                                            resolve(true);
                                        }.bind(this),
                                        error: function (oError) {
                                            reject(oError);
                                        }.bind(this)
                                    });
                                }.bind(this));
                            },
                    
        });
    });