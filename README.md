# DOMEventBridge
An event bridge for bridging DOM events to a JS event hub (for pubsub).

## Purpose
Instead of listening for DOM events (such as "click" and "mouseover") directly on DOM elements, DOMEventBridge can be instructed to listen for these events and fire (aka, bridge) them to a common JS event hub, for event-driven-architecture approaches like pubsub/etc.

Because this could involve a lot of events on a lot of elements, there's a variety of ways to specify which elements to listen for events on, and you can listen either through event delegation (bubbling) or directly on elements.

Importantly, only elements which have a `rel` value of "dombridge" will have their events bridged.

In addition, you can call `bridgeFromContainer(..)` to listen for and filter delegated (bubbled) events from children up to a container (parent) element, or you can call `bridgeFromElement` to listen to all events (unfiltered) on an element.
