// example: custom event bridging
// add "tracking" event notifications for tracking 
// elements found in the DOM at page-load time.

(function(global,$){
	// register our own bridge event type for handling
	global.EventHub.DOMBridge.registerBridgeEventType("dombridge:tracking");

	// make sure to preserve the events if they fire before any handlers are listening
	global.EventHub.preserve("dombridge:tracking");

	// search the DOM, once it's ready, for any "tracking" elements
	global.EventHub.DOMBridge.events.on("dom-ready",function(){
		$("[rel*='dombridge']").filter("[rel*='tracking']").each(function(){
			global.EventHub.emit("dombridge:tracking",this,"tracking");
		});
	});
})(window,jQuery);