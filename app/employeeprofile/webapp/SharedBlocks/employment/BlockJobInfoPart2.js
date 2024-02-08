sap.ui.define(['sap/uxap/BlockBase'], function (BlockBase) {
	"use strict";

	var BlockJobInfoPart2 = BlockBase.extend("employeeprofile.SharedBlocks.employment.BlockJobInfoPart2", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "employeeprofile.SharedBlocks.employment.BlockJobInfoPart2",
					type: "XML"
				},
				Expanded: {
					viewName: "employeeprofile.SharedBlocks.employment.BlockJobInfoPart2",
					type: "XML"
				}
			}
		}
	});
	return BlockJobInfoPart2;
});