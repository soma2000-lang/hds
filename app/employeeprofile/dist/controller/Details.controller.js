sap.ui.define(["sap/ui/core/mvc/Controller","../model/constants"],function(e,t){"use strict";return e.extend("employeeprofile.controller.Details",{onInit:function(){this.oSFModel=this.getOwnerComponent().getModel();this.oModel=this.getOwnerComponent().getModel("ReportInfoModel");var e=sap.ui.core.UIComponent.getRouterFor(this);e.getRoute("Details").attachPatternMatched(this._onObjectMatched,this)},_onObjectMatched:async function(e){this.fetchusersReport(e).then(e=>{this.oModel.setProperty("/busy",false)}).catch(e=>{this.oModel.setProperty("/busy",false)})},fetchusersReport:async function(e){try{return new Promise(function(t,s){var o=e.getParameter("arguments");console.log("arguments",o);var r=o.userId;console.log("Please trigger:",r);this.oModel.setProperty("/busy",true);this.oSFModel.setDeferredGroups(["batchfetchEmpDetails"]);this.oSFModel.callFunction("/fetchEmpDetails",{method:"GET",batchGroupId:"batchfetchEmpDetails",urlParameters:{userId:r}});this.oSFModel.submitChanges({batchGroupId:"batchfetchEmpDetails",success:function(e){var s=[];if(e.__batchResponses[0].statusCode=="200"){s=e.__batchResponses[0].data.results}console.log("aUsers",s);this.oModel.setProperty("/Users",s);t(true)}.bind(this),error:function(e){s(e)}.bind(this)})}.bind(this))}catch(e){reject(e);this.oModel.setProperty("/busy",false)}}})});