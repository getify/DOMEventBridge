(function(global,$){

	// NOTE: this example uses jQuery only for demo purposes

	global.EventHub.DOMBridge.bridgeFromContainer("body");

	// example 1 (handling a 'nav' element)
	global.EventHub.DOMBridge
	.filter({ elementType: "nav" })
	.on("do",function(el,elementType,evt){
		evt.preventDefault();
		alert("Navigate to: " + $(el).attr("href"));
	});


	// example 2 (additional event types, for a 'popup' element)
	global.EventHub.DOMBridge
	.filter({ elementTypes: ["popup"], selector: "#p1" })
	.on("do",function(el,elementType,evt){
		alert("Popup '" + $(el).attr("data-val") + "'");
	})
	.on("start-hover",function(el,elementType,evt){
		$(el).css({"textTransform": "uppercase"});
	})
	.on("end-hover",function(el,elementType,evt){
		$(el).css({"textTransform": ""});
	});


	// example 3 (preserving deferred event handling)
	var filt = global.EventHub.DOMBridge
	.filter({ elementType: "popup", selector: "#p2" })
	.preserve("do")
	.preserveOnce("start-hover");

	// continuing example 3, deferred
	setTimeout(function(){
		filt
		.on("do",function(el,elementType,evt){
			alert("Popup '" + $(el).attr("data-val") + "'");
		})
		.once("start-hover",function(el,elementType,evt){
			$("#p2").append("hovered!");
		});
	},10000);


	// example 4 (handling dom-ready)
	global.EventHub.once("dombridge:dom-ready",function(){
		console.log("global: dom-ready");
	});
	global.EventHub.DOMBridge.filter(/*empty*/).once("dom-ready",function(){
		console.log("filtered: dom-ready");
	});


	// example 5 (handling 'tracking' elements found in DOM at page load)
	global.EventHub.on("dombridge:tracking",function(el,elementType){
		console.log("global: 'tracking' element found, '" + $(el).attr("data-val") + "'");
	});
	global.EventHub.DOMBridge.filter(/*empty*/).on("tracking",function(el,elementType){
		console.log("filtered: 'tracking' element found, '" + $(el).attr("data-val") + "'");
	});

})(window,jQuery);