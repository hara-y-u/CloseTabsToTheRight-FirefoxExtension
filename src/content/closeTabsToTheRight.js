var closeTabsToTheRight = {};

closeTabsToTheRight.getRightUnpinnedTabsOf = function _getRightUnpinnedTabsOf(aTab) {
	var tabs = gBrowser.visibleTabs,
		ret = [];

	for (var i = tabs.length - 1; i >= 0; --i) {
		var t = tabs[i];
		if (t === aTab) { break; }
		if (t.pinned) { continue; }
		ret.unshift(t);
	}

	return ret;
};

closeTabsToTheRight.removeRightTabsOf = function _removeRightTabsOf(aTab) {
	if (gBrowser.warnAboutClosingTabs(false)) {
		var rtabs = closeTabsToTheRight.getRightUnpinnedTabsOf(aTab);

		for (var i = rtabs.length - 1; i >= 0; --i) {
			gBrowser.removeTab(rtabs[i], {animate:true});
		}
	}
};

//Set menuitem's state
window.addEventListener("load", function() {
		document.getElementById("tabContextMenu").addEventListener("popupshowing", function(ev){
			//Must be called after TabContextMenu.updateContextMenu(menupopup)
			if (ev.target !== this) { return; }

			var rtabs = closeTabsToTheRight.getRightUnpinnedTabsOf(TabContextMenu.contextTab);
			document.getElementById("context_closeTabsToTheRight").disabled = !rtabs.length;
			}, false);
		}, false);

