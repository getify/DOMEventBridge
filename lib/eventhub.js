(function(global){

	// From: https://github.com/creationix/eventemitter-browser/blob/master/EventEmitter.js
	function EventEmitter(){}

	EventEmitter.prototype.on = function (name, callback) {
		if (!this.hasOwnProperty("_handlers")) this._handlers = {};
		var handlers = this._handlers;
		if (!handlers.hasOwnProperty(name)) handlers[name] = [];
		var list = handlers[name];
		list.push(callback);

		// extension: any already preserved event firings of this type?
		if (this._preserved && this._preserved[name]) {
			for (var i=0; i<this._preserved[name].length; i++) {
				callback.apply(this,this._preserved[name][i]);
			}
			this.off(name,this._preserved[name]._callback);
			this._preserved[name]._callback = null;
			delete this._preserved[name];
		}

		return this;
	};

	EventEmitter.prototype.addListener = EventEmitter.prototype.on;

	EventEmitter.prototype.once = function (name, callback) {
		var alreadyFired = (this._preserved && this._preserved[name] && this._preserved[name]._fired);
		this.on(name, callback);
		this.on(name, remove);
		if (alreadyFired) remove.call(this); // make sure a preserved "once" event only actually fires once
		function remove() {
			this.off(name, callback);
			this.off(name, remove);
		}
		return this;
	};

	EventEmitter.prototype.emit = function (name/*, args...*/) {
		if (!this.hasOwnProperty("_handlers")) return;
		var handlers = this._handlers;
		if (!handlers.hasOwnProperty(name)) return;
		var list = handlers[name];
		var args = Array.prototype.slice.call(arguments, 1);
		for (var i = 0, l = list.length; i < l; i++) {
			if (!list[i]) continue;
			list[i].apply(this, args);
		}
		return this;
	};

	EventEmitter.prototype.off = function (name, callback) {
		if (!this.hasOwnProperty("_handlers")) return;
		var handlers = this._handlers;
		if (!handlers.hasOwnProperty(name)) return;
		var list = handlers[name];
		var index = list.indexOf(callback);
		if (index < 0) return;
		list[index] = false;
		if (index === list.length - 1) {
			while (index >= 0 && !list[index]) {
				list.length--;
				index--;
			}
		}
		return this;
	};
	EventEmitter.prototype.removeListener = EventEmitter.prototype.off;

	// extension: pre-listen for events and cache/queue them until a handler is added for them
	EventEmitter.prototype.preserve = function (name) {
		this._preserved = this._preserved || {};
		if (this._preserved[name]) return;
		var cb = (function(){
			this._preserved[name]._fired = true;
			this._preserved[name].push([].slice.call(arguments));
		}).bind(this);
		this.on(name,cb);
		this._preserved[name] = [];
		this._preserved[name]._callback = cb;
		return this;
	};
	EventEmitter.prototype.preserveOnce = function (name) {
		this._preserved = this._preserved || {};
		if (this._preserved[name]) return;
		var cb = (function(){
			this._preserved[name]._fired = true;
			this._preserved[name].push([].slice.call(arguments));
		}).bind(this);
		this.once(name,cb);
		this._preserved[name] = [];
		this._preserved[name]._callback = cb;
		return this;
	};

	// create an EventEmitter event hub for components to share event messaging
	global.EventHub = new EventEmitter();

})(window);