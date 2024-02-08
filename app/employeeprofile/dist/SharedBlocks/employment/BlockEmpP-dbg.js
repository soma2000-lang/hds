sap.ui.define(['sap/uxap/BlockBase'], function (BlockBase) {
	"use strict";

	var BlockEmpP = BlockBase.extend("employeeprofile.SharedBlocks.employment.BlockEmpP", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "employeeprofile.SharedBlocks.employment.BlockEmpP",
					type: "XML"
				},
				Expanded: {
					viewName: "employeeprofile.SharedBlocks.employment.BlockEmpP",
					type: "XML"
				}
			}
		}
	});
	return BlockEmpP;
});
