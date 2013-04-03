# DOMEventBridge
An event bridge for bridging DOM events to a JS event hub (for pubsub).

## Purpose
Instead of listening for DOM events (such as "click" and "mouseover") directly on DOM elements, DOMEventBridge can be instructed to listen for these events and fire (aka, bridge) them to a common JS event hub, for event-driven-architecture approaches like pubsub/etc.

Because this could involve a lot of events on a lot of elements, there's a variety of ways to specify which elements to listen for events on.

Importantly, **only elements which have a `rel` value of "dombridge" are eligible to have their events bridged.**

## API
### EventHub
The main-level API of DOMEventBridge is under the `EventHub` namespace.

`EventHub` is an instance of `EventEmitter` API, meaning it serves as a common event hub for your page/application. The basics of subscribing to events with `EventHub.on(..)` and publishing events with `EventHub.emit(..)` work as you'd expect. There are some extensions to the standard `EventEmitter`, however.

`EventHub.preserve(..)` and `EventHub.preserveOnce(..)` are two extensions which enable the event hub to preserve events which may be fired on it before any subscriptions are registered to handle those events.

The canonical example of this would be in the DOM world with the `DOMContentLoaded` (aka "DOM ready") event. If that event fires before you've attached a handler for it, like with jQuery's `$(document).ready(..)`, jQuery will realize the event fired already and call your event handler immediately.

You call `preserve(..)` or `preserveOnce(..)` to specify an event you want the hub to "remember" and "preserve", such that at a later time if you attach a listener for that same event name, that listener will be notified immediately of the previously fired and preserved event firing, complete with any data sent along with the data.

Beyond the DOM-ready example, other uses of this include delaying responding to events while parts of your framework are loading, but handling them once the framework finishes loading.

**NOTE:** all events fired as a result of DOMEventBridge will be fired on the main event hub under the namespace of "dombridge", such as "dombridge:dom-ready" and "dombridge:dom-event", among others. In addition, those events will be transmitted through filtered DOMBridge handling (see `filter(..)` below).

### EventHub.DOMBridge
The primary functionality of the DOMEventBridge utility is under `EventHub.DOMBridge`.

Setting up bridging (listening for event bubbling/delegation) is done with the `bridgeFrom(..)` API call.

For example, to set up bridging for an element with ID `#p1` and all its contents:

```js
EventHub.DOMBridge.bridgeFrom("#p1");
```

No bridging is done on a page by default, so you must call `bridgeFrom(..)` at least once on the page to set up bridging. You can call `bridgeFrom(..)` multiple times on a page, however you'll almost certainly want to make sure there's no DOM overlap between calls (multiple bridges from distinct separate elements, not nested elements), or you will get confusing behavior with duplicate event firings.

`EventHub.DOMBridge.bridgeFrom( ContainerSelector, TargetElements, Events )`

All three parameters are optional. Pass `null` in position if you want to skip specifying one of them.

* `ContainerSelector` [ string; default: "body" ]: a CSS selector string for the container element you want to handle bubbled/delegated events from all eligible elements inside it.

* `TargetElements` [ string; default: "a, input[type='button'], button" ]: a CSS selector specifying which of the eligible target elements to listen for events from. You can also pass an array of individual selectors (like `[ "a", "button" ]`) which will be joined into a combined CSS selector.

    **NOTE:** Regardless of the targeted elements, elements are only eligible for bridging if they have a `rel` value of "dombridge".

    Pass "*" if you want to listen for events from all eligible elements. If you pass `null` or some other falsy value, the value will be whatever is in `EventHub.DOMBridge.defaultTargets` array, which is defaulted to `[ "a", "input[type='button']", "button" ]`.

* `Events` [ string; default: "click mouseover mouseout mousedown mouseup keypress focus blur change" ]: a space-separated list of DOM events to listen for from targeted elements.

    **NOTE:** Some events cannot bubble by their definition, such as `focus`, `blur`, and `change`. The utility will detect if "capturing phase" event handling is available in the browser, and if so, attempt to detect these events in that phase, to preserve a semblance of "event delegation" at the container element.

--------

To remove a bridge that has previously been set up with a call to `bridgeFrom(..)`, call `removeBridge(..)`.

`EventHub.DOMBridge.removeBridge( ContainerSelector, TargetElements, Events )`

All three parameters are optional, and are identical in behavior to the `bridgeFrom(..)` call documented above.

**NOTE:** To get the results you expect, you'll want to make sure you pass identical values to `removeBridge(..)` as a previous call to `bridgeFrom(..)`, otherwise the removal of the bridge is not likely to succeed or operate as you would expect.

--------

If you want to remove all bridges currently set up and shut down all of the bridging mechanism, call `stopBridging()`. If you want to then, later, resume bridging, call `resumeBridging()`.

**NOTE:** a call to `resumeBridging()` will make sure the underlying bridging mechanisms are re-enabled, but you will still need to re-setup your bridging with calls to `bridgeFrom(..)` as documented above.

--------

Once you have a bridge set up, you may then want to set up listeners for events on a more fine-grained basis than the coarse event bubbling delegation. To do so, call `EventHub.DOMBridge.filter(..)`.

`filter(..)` will return an instance of the `EventEmitter` interface (including the extensions mentioned above), which you can then call `on(..)`, `emit(..)`, `preserve(..)`, etc. against, to set up listeners for various events you're interested in handling.

`EventHub.DOMBridge.filter( options )`

If you pass no `options` object, or an empty object, no filtering will be applied and you'll be notified of all events fired across the DOMBridge (all those which are "bridged" as specified above).

`options` is an object-hash that allows you to specify different filter options:

* `elementTypes` [ array ]: an array of one or more strings which are values found in the `rel` attribute of the DOM element. Multiple values in this setting are interpreted as "OR", meaning that you will listen to events from an element that has any or all of the values specified in its `rel` attribute. You can also pass a space-separated string with multiple values.

    **NOTE:** as noted above, all elements participating in DOMEventBridge must have a `rel` value of "dombridge". Additional values in a `rel` attribute should be separated by spaces, such as "dombridge popup nav", etc. You do **NOT** need to specify the "dombridge" value as that will already be applied in the filtering.

* `eventTypes` [ array ]: an array of one or more strings which are the names of DOMBridge-filtered events. These event names are **NOT** namespaced as they are when fired on the main `EventHub` object. The namespacing is suppressed in filtered event listening. For example, to specify only a few events you want to listen for, you might pass `[ "dom-ready", "do", "start-hover" ]`.

* `inSelector` [ string ]: a CSS selector which will be matched against any eligible element. This is how you control which DOM elements you actually care about for that listener.

--------

The following events are bridged by default: "dombridge:dom-ready", "dombridge:dom-event", "dombridge:do", "dombridge:start-hover", "dombridge:end-hover".

To register custom events that should be handled by the bridging mechanism, call `registerBridgeEventType(..)`. See the example "trackingelementevent.js" for how to use this extension.

## License
All this documentation and code is released under the MIT license and (c) Kyle Simpson.
