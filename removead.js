(function() {
	(function removeAdsInAllPage() {
		var iframes = document.getElementsByTagName("iframe");
		var docs = [document];

		for (var i = 0, il = iframes.length; i < il; i++) {
			try {
				docs.push(iframes[i].contentWindow.document);
			} catch (e) {}
		}
		
		for (var i = 0, il = docs.length; i < il; i++) {
			removeDirectKeywordLink(docs[i]);
			removeRealFooterAd(docs[i]);
		}
	})();

	function removeDirectKeywordLink(doc) {
		var links = doc.getElementsByTagName("a");
		
		for (var j = links.length - 1; j >= 0; j--) {
			var item = links[j];
			
			if (!/dklink/.test(item.className)) {
				continue;
			} else {
				item.parentNode.replaceChild(doc.createTextNode(item.innerHTML), item);
			}
		}
	};

	function removeRealFooterAd(doc) {
		var head = doc.getElementsByTagName("head")[0];
		var style = doc.createElement("style");
		var rule = "#RealFooterAd { display:none !important; }";
		style.type = "text/css";
		
		if (!!(window.attachEvent && !window.opera)) {
			style.styleSheet.cssText = rule;
		} else {
			style.appendChild(doc.createTextNode(rule));
		}
		
		head.appendChild(style);
	}
})();
