sap.ui.define([
    "sap/ui/core/mvc/Controller"],
   

    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";
        
        return Controller.extend("employeeprofile.controller.Details", {
            
            onInit: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);  
               this.oModel = this.getOwnerComponent().getModel("ReportInfoModel");
               oRouter.getRoute("Details");
            },
    

            
           
            fetchusersReport : async function (oEvent) {
                return new Promise(function (resolve, reject) {
                    this.oModel.setProperty("/busy", false);
                    var args = oEvent.getParameter("arguments");
                    console.log('arguments',args);
                    var userId=args.userId;
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
                        batchGroupId: "batchuserjobinfo",
                        urlParameters: {
                            userId: userId
                          
                        }
                    });

                    this.oSFModel.callFunction("/usersPhoto", {
                        method: "GET",
                        batchGroupId: "batchusersPhoto",
                        urlParameters: {
                            userId: userId,
                           
                        }
                    });
                    this.oSFModel.callFunction("/compensationinfo", {
                        method: "GET",
                        batchGroupId: "batchcompensationinfo",
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
                                aUsers = oData.__batchResponses[0].data.results;
                            
                                }
                            

                            if (oData.__batchResponses[2].statusCode == '200') {
                                if (aUsers.length) {
                                    aUsers.forEach(each => {
                                        oData.__batchResponses[2].data.results.forEach((image) => {
                                            if (each.userId == image.userId) {
                                                image.photo = image.photo ? ("data:image/jpeg;base64," + image.photo.replaceAll("\r\n", "")) : "";
                                                each["photo"] = image;
                                            }
                                        });
                                    })
                                }
                               // this.oModel.setProperty("/Users", aUsers);
                        
                            }

                            if (oData.__batchResponses[3].statusCode == '200') {
                                aUsers = oData.__batchResponses[3].data.results;
                
                        
                            }
                        
                        
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