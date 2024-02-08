sap.ui.define(['sap/uxap/BlockBase'], function (BlockBase) {
	"use strict";

	var BlockJobInfoPart1 = BlockBase.extend("employeeprofile.SharedBlocks.employment.BlockJobInfoPart1", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "employeeprofile.SharedBlocks.employment.BlockJobInfoPart1",
					type: "XML"
				},
				Expanded: {
					viewName: "employeeprofile.SharedBlocks.employment.BlockJobInfoPart1",
					type: "XML"
				}
			}
		}
	});

	return BlockJobInfoPart1;
});