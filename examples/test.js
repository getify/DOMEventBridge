(function(global,$){

	// NOTE: this example uses jQuery only for demo purposes

	global.EventHub.DOMBridge.bridgeFrom("body");

	// example 1 (handling a 'nav' element)
	global.EventHub.DOMBridge
	.filter({ elementTypes: "nav" })
	.on("do",function(el,elementType,evt){
		evt.preventDefault();
		alert("Navigate to: " + $(el).attr("href"));
	});


	// example 2 (additional event types, for a 'popup' element)
	global.EventHub.DOMBridge
	.filter({ elementTypes: ["popup"], inSelector: "#p1" })
	.on("do",function(el,elementType,evt){
		alert("Popup '" + $(el).attr("data-val") + "'");
	})
	.on("start-hover",function(el,elementType,evt){
		$(el).val("yes hovering");
	})
	.on("end-hover",function(el,elementType,evt){
		$(el).val("yes");
	});


	// example 3 (preserving deferred event handling)
	var filt = global.EventHub.DOMBridge
	.filter({ elementTypes: "popup", inSelector: "#p2" })
	.preserve("do")
	.preserveOnce("start-hover");

	// continuing example 3, deferred
	setTimeout(function(){
		filt
		.on("do",function(el,elementType,evt){
			alert("Popup '" + $(el).attr("data-val") + "'");
		})
		.once("start-hover",function(el,elementType,evt){
			$("#p2").append(" **BUTTON HOVERED**");
		});
	},10000);


	// example 4 (handling dom-ready)
	global.EventHub.on("dombridge:dom-ready",function(){
		console.log("global: dom-ready");
	});
	global.EventHub.DOMBridge.events.on("dom-ready",function(){
		console.log("DOMBridge: dom-ready");
	});


	// example 5 (handling 'tracking' elements found in DOM at page load)
	// NOTE: relies on custom bridge event type registered in "trackingelementevent.js"
	global.EventHub.on("dombridge:tracking",function(el,elementType){
		console.log("global: 'tracking' element found, '" + $(el).attr("data-val") + "'");
	});
	global.EventHub.DOMBridge.events.on("tracking",function(el,elementType){
		console.log("DOMBridge: 'tracking' element found, '" + $(el).attr("data-val") + "'");
	});

})(window,jQuery);