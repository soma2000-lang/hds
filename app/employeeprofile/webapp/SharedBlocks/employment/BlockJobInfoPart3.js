sap.ui.define(['sap/uxap/BlockBase'], function (BlockBase) {
	"use strict";

	var BlockJobInfoPart3 = BlockBase.extend("employeeprofile.SharedBlocks.employment.BlockJobInfoPart3", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "employeeprofile.SharedBlocks.employment.BlockJobInfoPart3",
					type: "XML"
				},
				Expanded: {
					viewName: "employeeprofile.SharedBlocks.employment.BlockJobInfoPart3",
					type: "XML"
				}
			}
		}
	});

	return BlockJobInfoPart3;

});