// shim for Object.keys() in non-ES5
// From: https://gist.github.com/atk/1034464
if(!Object.keys){Object.keys=function(o,k,r){r=[];for(k in o)r.hasOwnProperty.call(o,k)&&r.push(k);return r}}

// shim for Array#indexOf() in non-ES5
if(!Array.prototype.indexOf){Array.prototype.indexOf=function(e){var d=Object(this);var c=d.length>>>0;if(c===0){return-1}var a=0;if(arguments.length>1){a=Number(arguments[1]);if(a!=a){a=0}else if(a!=0&&a!=Infinity&&a!=-Infinity){a=(a>0||-1)*Math.floor(Math.abs(a))}}if(a>=c){return-1}var b=a>=0?a:Math.max(c-Math.abs(a),0);for(;b<c;b++){if(b in d&&d[b]===e){return b}}return-1}}

// shim for Function#bind() in non-ES5
if(!Function.prototype.bind){Function.prototype.bind=function(b){var d=Array.prototype.slice.call(arguments,1),e=this,a=function(){},c=function(){return e.apply(this instanceof a&&b?this:b,d.concat(Array.prototype.slice.call(arguments)))};a.prototype=this.prototype;c.prototype=new a();return c}}


// DOMBridge
(function(global){

	/**
	 * A thin facade for the DOM CSS-selector functionality
	 *
	 * @return the facade API object. @see find()
	 */
	function __selects__() {
		var engine, publicAPI;
		/*!
		  * @preserve Qwery - A Blazing Fast query selector engine
		  * https://github.com/ded/qwery
		  * copyright Dustin Diaz 2012
		  * MIT License
		  */
		(function(e,t,n){typeof module!="undefined"&&module.exports?module.exports=n():typeof define=="function"&&define.amd?define(n):t[e]=n()})("qwery",this,function(){function L(){this.c={}}function D(e){return A.g(e)||A.s(e,"(^|\\s+)"+e+"(\\s+|$)",1)}function P(e,t){var n=0,r=e.length;for(;n<r;n++)t(e[n])}function H(e){for(var t=[],n=0,r=e.length;n<r;++n)$(e[n])?t=t.concat(e[n]):t[t.length]=e[n];return t}function B(e){var t=0,n=e.length,r=[];for(;t<n;t++)r[t]=e[t];return r}function j(e){while(e=e.previousSibling)if(e[u]==1)break;return e}function F(e){return e.match(C)}function I(e,t,n,r,i,s,a,c,h,p,d){var v,m,g,y,b;if(this[u]!==1)return!1;if(t&&t!=="*"&&this[o]&&this[o].toLowerCase()!==t)return!1;if(n&&(m=n.match(f))&&m[1]!==this.id)return!1;if(n&&(b=n.match(l)))for(v=b.length;v--;)if(!D(b[v].slice(1)).test(this.className))return!1;if(h&&Q.pseudos[h]&&!Q.pseudos[h](this,d))return!1;if(r&&!a){y=this.attributes;for(g in y)if(Object.prototype.hasOwnProperty.call(y,g)&&(y[g].name||g)==i)return this}return r&&!R(s,Z(this,i)||"",a)?!1:this}function q(e){return O.g(e)||O.s(e,e.replace(b,"\\$1"))}function R(e,t,n){switch(e){case"=":return t==n;case"^=":return t.match(M.g("^="+n)||M.s("^="+n,"^"+q(n),1));case"$=":return t.match(M.g("$="+n)||M.s("$="+n,q(n)+"$",1));case"*=":return t.match(M.g(n)||M.s(n,q(n),1));case"~=":return t.match(M.g("~="+n)||M.s("~="+n,"(?:^|\\s+)"+q(n)+"(?:\\s+|$)",1));case"|=":return t.match(M.g("|="+n)||M.s("|="+n,"^"+q(n)+"(-|$)",1))}return 0}function U(e,t){var n=[],i=[],s,a,f,l,h,p,d,v,m=t,g=_.g(e)||_.s(e,e.split(N)),y=e.match(T);if(!g.length)return n;l=(g=g.slice(0)).pop(),g.length&&(f=g[g.length-1].match(c))&&(m=K(t,f[1]));if(!m)return n;d=F(l),p=m!==t&&m[u]!==9&&y&&/^[+~]$/.test(y[y.length-1])?function(e){while(m=m.nextSibling)m[u]==1&&(d[1]?d[1]==m[o].toLowerCase():1)&&(e[e.length]=m);return e}([]):m[r](d[1]||"*");for(s=0,a=p.length;s<a;s++)if(v=I.apply(p[s],d))n[n.length]=v;return g.length?(P(n,function(e){W(e,g,y)&&(i[i.length]=e)}),i):n}function z(e,t,n){if(X(t))return e==t;if($(t))return!!~H(t).indexOf(e);var r=t.split(","),i,s;while(t=r.pop()){i=_.g(t)||_.s(t,t.split(N)),s=t.match(T),i=i.slice(0);if(I.apply(e,F(i.pop()))&&(!i.length||W(e,i,s,n)))return!0}return!1}function W(e,t,n,r){function s(e,r,o){while(o=k[n[r]](o,e))if(X(o)&&I.apply(o,F(t[r]))){if(!r)return o;if(i=s(o,r-1,o))return i}}var i;return(i=s(e,t.length-1,e))&&(!r||Y(i,r))}function X(e,t){return e&&typeof e=="object"&&(t=e[u])&&(t==1||t==9)}function V(e){var t=[],n,r;e:for(n=0;n<e.length;++n){for(r=0;r<t.length;++r)if(t[r]==e[n])continue e;t[t.length]=e[n]}return t}function $(e){return typeof e=="object"&&isFinite(e.length)}function J(t){return t?typeof t=="string"?Q(t)[0]:!t[u]&&$(t)?t[0]:t:e}function K(e,t,n){return e[u]===9?e.getElementById(t):e.ownerDocument&&((n=e.ownerDocument.getElementById(t))&&Y(n,e)&&n||!Y(e,e.ownerDocument)&&a('[id="'+t+'"]',e)[0])}function Q(e,t){var i,s,o=J(t);if(!o||!e)return[];if(e===window||X(e))return!t||e!==window&&X(o)&&Y(e,o)?[e]:[];if(e&&$(e))return H(e);if(i=e.match(x)){if(i[1])return(s=K(o,i[1]))?[s]:[];if(i[2])return B(o[r](i[2]));if(et&&i[3])return B(o[n](i[3]))}return a(e,o)}function G(e,t){return function(n){var r,i;if(v.test(n)){e[u]!==9&&((i=r=e.getAttribute("id"))||e.setAttribute("id",i="__qwerymeupscotty"),n='[id="'+i+'"]'+n,t(e.parentNode||e,n,!0),r||e.removeAttribute("id"));return}n.length&&t(e,n,!1)}}var e=document,t=e.documentElement,n="getElementsByClassName",r="getElementsByTagName",i="querySelectorAll",s="useNativeQSA",o="tagName",u="nodeType",a,f=/#([\w\-]+)/,l=/\.[\w\-]+/g,c=/^#([\w\-]+)$/,h=/^\.([\w\-]+)$/,p=/^([\w\-]+)$/,d=/^([\w]+)?\.([\w\-]+)$/,v=/(^|,)\s*[>~+]/,m=/^\s+|\s*([,\s\+\~>]|$)\s*/g,g=/[\s\>\+\~]/,y=/(?![\s\w\-\/\?\&\=\:\.\(\)\!,@#%<>\{\}\$\*\^'"]*\]|[\s\w\+\-]*\))/,b=/([.*+?\^=!:${}()|\[\]\/\\])/g,w=/^(\*|[a-z0-9]+)?(?:([\.\#]+[\w\-\.#]+)?)/,E=/\[([\w\-]+)(?:([\|\^\$\*\~]?\=)['"]?([ \w\-\/\?\&\=\:\.\(\)\!,@#%<>\{\}\$\*\^]+)["']?)?\]/,S=/:([\w\-]+)(\(['"]?([^()]+)['"]?\))?/,x=new RegExp(c.source+"|"+p.source+"|"+h.source),T=new RegExp("("+g.source+")"+y.source,"g"),N=new RegExp(g.source+y.source),C=new RegExp(w.source+"("+E.source+")?"+"("+S.source+")?"),k={" ":function(e){return e&&e!==t&&e.parentNode},">":function(e,t){return e&&e.parentNode==t.parentNode&&e.parentNode},"~":function(e){return e&&e.previousSibling},"+":function(e,t,n,r){return e?(n=j(e))&&(r=j(t))&&n==r&&n:!1}};L.prototype={g:function(e){return this.c[e]||undefined},s:function(e,t,n){return t=n?new RegExp(t):t,this.c[e]=t}};var A=new L,O=new L,M=new L,_=new L,Y="compareDocumentPosition"in t?function(e,t){return(t.compareDocumentPosition(e)&16)==16}:"contains"in t?function(e,n){return n=n[u]===9||n==window?t:n,n!==e&&n.contains(e)}:function(e,t){while(e=e.parentNode)if(e===t)return 1;return 0},Z=function(){var t=e.createElement("p");return(t.innerHTML='<a href="#x">x</a>')&&t.firstChild.getAttribute("href")!="#x"?function(e,t){return t==="class"?e.className:t==="href"||t==="src"?e.getAttribute(t,2):e.getAttribute(t)}:function(e,t){return e.getAttribute(t)}}(),et=!!e[n],tt=e.querySelector&&e[i],nt=function(e,t){var n=[],r,s;try{return t[u]===9||!v.test(e)?B(t[i](e)):(P(r=e.split(","),G(t,function(e,t){s=e[i](t),s.length==1?n[n.length]=s.item(0):s.length&&(n=n.concat(B(s)))})),r.length>1&&n.length>1?V(n):n)}catch(o){}return rt(e,t)},rt=function(e,t){var n=[],i,s,o,a,f,l;e=e.replace(m,"$1");if(s=e.match(d)){f=D(s[2]),i=t[r](s[1]||"*");for(o=0,a=i.length;o<a;o++)f.test(i[o].className)&&(n[n.length]=i[o]);return n}return P(l=e.split(","),G(t,function(e,r,i){f=U(r,e);for(o=0,a=f.length;o<a;o++)if(e[u]===9||i||Y(f[o],t))n[n.length]=f[o]})),l.length>1&&n.length>1?V(n):n},it=function(e){typeof e[s]!="undefined"&&(a=e[s]?tt?nt:rt:rt)};return it({useNativeQSA:!0}),Q.configure=it,Q.uniq=V,Q.is=z,Q.pseudos={},Q});
		engine = this.qwery || global.$;

		// qwery only
		if (engine.configure) engine.configure({
			useNativeQSA: false
		});

		publicAPI = {
			/**
			 * finds one or more DOM elements based on the CSS selector(s) provided
			 *
			 * @param {string[, string...]} selector 
			 */
			find: function find() {
				return engine.apply(publicAPI,arguments);
			},

			// checks if an element matches a selector
			is: function is() {
				return engine.is.apply(publicAPI,arguments);
			},

			_engine: engine
		};

		return publicAPI;
	}
	var selects = new __selects__();

	/**
	 * A thin facade for the DOM event functionality
	 *
	 * @return the facade API object. @see handle()
	 */
	function __events__() {
		var engine, publicAPI;
		/*!
		  * Bean - copyright (c) Jacob Thornton 2011-2012
		  * https://github.com/fat/bean
		  * MIT license
		  */
		(function(e,t,n){typeof module!="undefined"&&module.exports?module.exports=n():typeof define=="function"&&define.amd?define(n):t[e]=n()})("bean",this,function(e,t){e=e||"bean",t=t||this;var n=window,r=t[e],i=/[^\.]*(?=\..*)\.|.*/,s=/\..*/,o="addEventListener",u="removeEventListener",a=document||{},f=a.documentElement||{},l=f[o],c=l?o:"attachEvent",h={},p=Array.prototype.slice,d=function(e,t){return e.split(t||" ")},v=function(e){return typeof e=="string"},m=function(e){return typeof e=="function"},g="click dblclick mouseup mousedown contextmenu mousewheel mousemultiwheel DOMMouseScroll mouseover mouseout mousemove selectstart selectend keydown keypress keyup orientationchange focus blur change reset select submit load unload beforeunload resize move DOMContentLoaded readystatechange message error abort scroll ",y="show input invalid touchstart touchmove touchend touchcancel gesturestart gesturechange gestureend textinputreadystatechange pageshow pagehide popstate hashchange offline online afterprint beforeprint dragstart dragenter dragover dragleave drag drop dragend loadstart progress suspend emptied stalled loadmetadata loadeddata canplay canplaythrough playing waiting seeking seeked ended durationchange timeupdate play pause ratechange volumechange cuechange checking noupdate downloading cached updateready obsolete ",b=function(e,t,n){for(n=0;n<t.length;n++)t[n]&&(e[t[n]]=1);return e}({},d(g+(l?y:""))),w=function(){var e="compareDocumentPosition"in f?function(e,t){return t.compareDocumentPosition&&(t.compareDocumentPosition(e)&16)===16}:"contains"in f?function(e,t){return t=t.nodeType===9||t===window?f:t,t!==e&&t.contains(e)}:function(e,t){while(e=e.parentNode)if(e===t)return 1;return 0},t=function(t){var n=t.relatedTarget;return n?n!==this&&n.prefix!=="xul"&&!/document/.test(this.toString())&&!e(n,this):n==null};return{mouseenter:{base:"mouseover",condition:t},mouseleave:{base:"mouseout",condition:t},mousewheel:{base:/Firefox/.test(navigator.userAgent)?"DOMMouseScroll":"mousewheel"}}}(),E=function(){var e=d("altKey attrChange attrName bubbles cancelable ctrlKey currentTarget detail eventPhase getModifierState isTrusted metaKey relatedNode relatedTarget shiftKey srcElement target timeStamp type view which propertyName"),t=e.concat(d("button buttons clientX clientY dataTransfer fromElement offsetX offsetY pageX pageY screenX screenY toElement")),r=t.concat(d("wheelDelta wheelDeltaX wheelDeltaY wheelDeltaZ axis")),i=e.concat(d("char charCode key keyCode keyIdentifier keyLocation location")),s=e.concat(d("data")),o=e.concat(d("touches targetTouches changedTouches scale rotation")),u=e.concat(d("data origin source")),l=e.concat(d("state")),c=/over|out/,h=[{reg:/key/i,fix:function(e,t){return t.keyCode=e.keyCode||e.which,i}},{reg:/click|mouse(?!(.*wheel|scroll))|menu|drag|drop/i,fix:function(e,n,r){n.rightClick=e.which===3||e.button===2,n.pos={x:0,y:0};if(e.pageX||e.pageY)n.clientX=e.pageX,n.clientY=e.pageY;else if(e.clientX||e.clientY)n.clientX=e.clientX+a.body.scrollLeft+f.scrollLeft,n.clientY=e.clientY+a.body.scrollTop+f.scrollTop;return c.test(r)&&(n.relatedTarget=e.relatedTarget||e[(r=="mouseover"?"from":"to")+"Element"]),t}},{reg:/mouse.*(wheel|scroll)/i,fix:function(){return r}},{reg:/^text/i,fix:function(){return s}},{reg:/^touch|^gesture/i,fix:function(){return o}},{reg:/^message$/i,fix:function(){return u}},{reg:/^popstate$/i,fix:function(){return l}},{reg:/.*/,fix:function(){return e}}],p={},v=function(e,t,r){if(!arguments.length)return;e=e||((t.ownerDocument||t.document||t).parentWindow||n).event,this.originalEvent=e,this.isNative=r,this.isBean=!0;if(!e)return;var i=e.type,s=e.target||e.srcElement,o,u,a,f,l;this.target=s&&s.nodeType===3?s.parentNode:s;if(r){l=p[i];if(!l)for(o=0,u=h.length;o<u;o++)if(h[o].reg.test(i)){p[i]=l=h[o].fix;break}f=l(e,this,i);for(o=f.length;o--;)!((a=f[o])in this)&&a in e&&(this[a]=e[a])}};return v.prototype.preventDefault=function(){this.originalEvent.preventDefault?this.originalEvent.preventDefault():this.originalEvent.returnValue=!1},v.prototype.stopPropagation=function(){this.originalEvent.stopPropagation?this.originalEvent.stopPropagation():this.originalEvent.cancelBubble=!0},v.prototype.stop=function(){this.preventDefault(),this.stopPropagation(),this.stopped=!0},v.prototype.stopImmediatePropagation=function(){this.originalEvent.stopImmediatePropagation&&this.originalEvent.stopImmediatePropagation(),this.isImmediatePropagationStopped=function(){return!0}},v.prototype.isImmediatePropagationStopped=function(){return this.originalEvent.isImmediatePropagationStopped&&this.originalEvent.isImmediatePropagationStopped()},v.prototype.clone=function(e){var t=new v(this,this.element,this.isNative);return t.currentTarget=e,t},v}(),S=function(e,t){return!l&&!t&&(e===a||e===n)?f:e},x=function(){var e=function(e,t,n,r){var i=function(n,i){return t.apply(e,r?p.call(i,n?0:1).concat(r):i)},s=function(n,r){return t.__beanDel?t.__beanDel.ft(n.target,e):r},o=n?function(e){var t=s(e,this);if(n.apply(t,arguments))return e&&(e.currentTarget=t),i(e,arguments)}:function(e){return t.__beanDel&&(e=e.clone(s(e))),i(e,arguments)};return o.__beanDel=t.__beanDel,o},t=function(t,n,r,i,s,o,u){var a=w[n],f;n=="unload"&&(r=A(O,t,n,r,i)),a&&(a.condition&&(r=e(t,r,a.condition,o)),n=a.base||n),this.isNative=f=b[n]&&!!t[c],this.customType=!l&&!f&&n,this.element=t,this.type=n,this.original=i,this.namespaces=s,this.eventType=l||f?n:"propertychange",this.target=S(t,f),this[c]=!!this.target[c],this.root=u,this.handler=e(t,r,null,o)};return t.prototype.inNamespaces=function(e){var t,n,r=0;if(!e)return!0;if(!this.namespaces)return!1;for(t=e.length;t--;)for(n=this.namespaces.length;n--;)e[t]==this.namespaces[n]&&r++;return e.length===r},t.prototype.matches=function(e,t,n){return this.element===e&&(!t||this.original===t)&&(!n||this.handler===n)},t}(),T=function(){var e={},t=function(n,r,i,s,o,u){var a=o?"r":"$";if(!r||r=="*")for(var f in e)f.charAt(0)==a&&t(n,f.substr(1),i,s,o,u);else{var l=0,c,h=e[a+r],p=n=="*";if(!h)return;for(c=h.length;l<c;l++)if((p||h[l].matches(n,i,s))&&!u(h[l],h,l,r))return}},n=function(t,n,r,i){var s,o=e[(i?"r":"$")+n];if(o)for(s=o.length;s--;)if(!o[s].root&&o[s].matches(t,r,null))return!0;return!1},r=function(e,n,r,i){var s=[];return t(e,n,r,null,i,function(e){return s.push(e)}),s},i=function(t){var n=!t.root&&!this.has(t.element,t.type,null,!1),r=(t.root?"r":"$")+t.type;return(e[r]||(e[r]=[])).push(t),n},s=function(n){t(n.element,n.type,null,n.handler,n.root,function(t,n,r){return n.splice(r,1),t.removed=!0,n.length===0&&delete e[(t.root?"r":"$")+t.type],!1})},o=function(){var t,n=[];for(t in e)t.charAt(0)=="$"&&(n=n.concat(e[t]));return n};return{has:n,get:r,put:i,del:s,entries:o}}(),N,C=function(e){arguments.length?N=e:N=a.querySelectorAll?function(e,t){return t.querySelectorAll(e)}:function(){throw new Error("Bean: No selector engine installed")}},k=function(e,t){if(!l&&t&&e&&e.propertyName!="_on"+t)return;var n=T.get(this,t||e.type,null,!1),r=n.length,i=0;e=new E(e,this,!0),t&&(e.type=t);for(;i<r&&!e.isImmediatePropagationStopped();i++)n[i].removed||n[i].handler.call(this,e)},L=l?function(e,t,n){e[n?o:u](t,k,!1)}:function(e,t,n,r){var i;n?(T.put(i=new x(e,r||t,function(t){k.call(e,t,r)},k,null,null,!0)),r&&e["_on"+r]==null&&(e["_on"+r]=0),i.target.attachEvent("on"+i.eventType,i.handler)):(i=T.get(e,r||t,k,!0)[0],i&&(i.target.detachEvent("on"+i.eventType,i.handler),T.del(i)))},A=function(e,t,n,r,i){return function(){r.apply(this,arguments),e(t,n,i)}},O=function(e,t,n,r){var i=t&&t.replace(s,""),o=T.get(e,i,null,!1),u={},a,f;for(a=0,f=o.length;a<f;a++)(!n||o[a].original===n)&&o[a].inNamespaces(r)&&(T.del(o[a]),!u[o[a].eventType]&&o[a][c]&&(u[o[a].eventType]={t:o[a].eventType,c:o[a].type}));for(a in u)T.has(e,u[a].t,null,!1)||L(e,u[a].t,!1,u[a].c)},M=function(e,t){var n=function(t,n){var r,i=v(e)?N(e,n):e;for(;t&&t!==n;t=t.parentNode)for(r=i.length;r--;)if(i[r]===t)return t},r=function(e){var r=n(e.target,this);r&&t.apply(r,arguments)};return r.__beanDel={ft:n,selector:e},r},_=l?function(e,t,r){var i=a.createEvent(e?"HTMLEvents":"UIEvents");i[e?"initEvent":"initUIEvent"](t,!0,!0,n,1),r.dispatchEvent(i)}:function(e,t,n){n=S(n,e),e?n.fireEvent("on"+t,a.createEventObject()):n["_on"+t]++},D=function(e,t,n){var r=v(t),o,u,a,f;if(r&&t.indexOf(" ")>0){t=d(t);for(f=t.length;f--;)D(e,t[f],n);return e}u=r&&t.replace(s,""),u&&w[u]&&(u=w[u].base);if(!t||r){if(a=r&&t.replace(i,""))a=d(a,".");O(e,u,n,a)}else if(m(t))O(e,null,t);else for(o in t)t.hasOwnProperty(o)&&D(e,o,t[o]);return e},P=function(e,t,n,r){var o,u,a,f,l,v,g;if(n===undefined&&typeof t=="object"){for(u in t)t.hasOwnProperty(u)&&P.call(this,e,u,t[u]);return}m(n)?(l=p.call(arguments,3),r=o=n):(o=r,l=p.call(arguments,4),r=M(n,o,N)),a=d(t),this===h&&(r=A(D,e,t,r,o));for(f=a.length;f--;)g=T.put(v=new x(e,a[f].replace(s,""),r,o,d(a[f].replace(i,""),"."),l,!1)),v[c]&&g&&L(e,v.eventType,!0,v.customType);return e},H=function(e,t,n,r){return P.apply(null,v(n)?[e,n,t,r].concat(arguments.length>3?p.call(arguments,5):[]):p.call(arguments))},B=function(){return P.apply(h,arguments)},j=function(e,t,n){var r=d(t),o,u,a,f,l;for(o=r.length;o--;){t=r[o].replace(s,"");if(f=r[o].replace(i,""))f=d(f,".");if(!f&&!n&&e[c])_(b[t],t,e);else{l=T.get(e,t,null,!1),n=[!1].concat(n);for(u=0,a=l.length;u<a;u++)l[u].inNamespaces(f)&&l[u].handler.apply(e,n)}}return e},F=function(e,t,n){var r=T.get(t,n,null,!1),i=r.length,s=0,o,u;for(;s<i;s++)r[s].original&&(o=[e,r[s].type],(u=r[s].handler.__beanDel)&&o.push(u.selector),o.push(r[s].original),P.apply(null,o));return e},I={on:P,add:H,one:B,off:D,remove:D,clone:F,fire:j,setSelectorEngine:C,noConflict:function(){return t[e]=r,this}};if(n.attachEvent){var q=function(){var e,t=T.entries();for(e in t)t[e].type&&t[e].type!=="unload"&&D(t[e].element,t[e].type);n.detachEvent("onunload",q),n.CollectGarbage&&n.CollectGarbage()};n.attachEvent("onunload",q)}return C(),I});
		engine = this.bean;
	
		engine.setSelectorEngine(selects._engine);

		publicAPI = {
			/**
			 * attaches an event handler to an element
			 *
			 * @param {DOMElement} element
			 * @param {string} events
			 * @param {function} handler
			 */
			handle: function handle(){
				return engine.on.apply(publicAPI,arguments);
			},

			/**
			 * attaches an event handler to an element, but where it will only run once and then unbind itself
			 *
			 * @param {DOMElement} element
			 * @param {string} events
			 * @param {function} handler
			 */
			handleOnce: function handleOnce() {
				return engine.one.apply(publicAPI,arguments);
			},

			/**
			 * removes an event handler from an element
			 *
			 * @param {DOMElement} element
			 * @param {string} events
			 * @param {function} handler
			 */
			remove: function remove() {
				return engine.off.apply(publicAPI,arguments);
			},

			/**
			 * fires all bound event handler(s) on an element
			 *
			 * @param {DOMElement} element
			 * @param {string} events
			 */
			 trigger: function trigger() {
			 	return engine.fire.apply(publicAPI,arguments);
			 },

			_engine: engine
		};

		return publicAPI;
	}
	var events = new __events__();

	/**
	 * A thin facade for the DOM functionality
	 *
	 * @return the facade API object. @see $()
	 */
	function __dom__() {
		var engine, publicAPI;

		/*!
		  * Bonzo: DOM Utility (c) Dustin Diaz 2012
		  * https://github.com/ded/bonzo
		  * License MIT
		  */
		(function(e,t,n){typeof module!="undefined"&&module.exports?module.exports=t():typeof n["define"]=="function"&&n.define.amd?define(e,t):n[e]=t()})("bonzo",function(){function M(e){return new RegExp("(^|\\s+)"+e+"(\\s+|$)")}function _(e,t,n,r){var i,s=0,o=e.length;for(;s<o;s++)i=r?e.length-s-1:s,t.call(n||e[i],e[i],i,e);return e}function D(e,t,n){for(var r=0,i=e.length;r<i;r++)I(e[r])&&(D(e[r].childNodes,t,n),t.call(n||e[r],e[r],r,e));return e}function P(e){return e.replace(/-(.)/g,function(e,t){return t.toUpperCase()})}function H(e){return e?e.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase():e}function B(e){e[x]("data-node-uid")||e[S]("data-node-uid",++y);var t=e[x]("data-node-uid");return g[t]||(g[t]={})}function j(e){var t=e[x]("data-node-uid");t&&delete g[t]}function F(e){var t;try{return e===null||e===undefined?undefined:e==="true"?!0:e==="false"?!1:e==="null"?null:(t=parseFloat(e))==e?t:e}catch(n){}return undefined}function I(e){return e&&e.nodeName&&(e.nodeType==1||e.nodeType==11)}function q(e,t,n){for(var r=0,i=e.length;r<i;++r)if(t.call(n||null,e[r],r,e))return!0;return!1}function R(e){return e=="transform"&&(e=N.transform)||/^transform-?[Oo]rigin$/.test(e)&&(e=N.transform+"Origin")||e=="float"&&(e=N.cssFloat),e?P(e):null}function z(e,t,n,r){var s=0,o=t||this,u=[],a=i&&typeof e=="string"&&e.charAt(0)!="<"?i(e):e;return _($(a),function(e,t){_(o,function(r){n(e,u[s++]=t>0?J(o,r):r)},null,r)},this,r),o.length=s,_(u,function(e){o[--s]=e},null,!r),o}function W(e,t,n){var r=Y(e),i=r.css("position"),s=r.offset(),o="relative",u=i==o,a=[parseInt(r.css("left"),10),parseInt(r.css("top"),10)];i=="static"&&(r.css("position",o),i=o),isNaN(a[0])&&(a[0]=u?0:e.offsetLeft),isNaN(a[1])&&(a[1]=u?0:e.offsetTop),t!=null&&(e.style.left=t-s.left+a[0]+E),n!=null&&(e.style.top=n-s.top+a[1]+E)}function X(e,t){return typeof t=="function"?t(e):t}function V(e){this.length=0;if(e){e=typeof e!="string"&&!e.nodeType&&typeof e.length!="undefined"?e:[e],this.length=e.length;for(var t=0;t<e.length;t++)this[t]=e[t]}}function $(e,t,n){var r,i,s;if(typeof e=="string")return Y.create(e);I(e)&&(e=[e]);if(n){s=[];for(r=0,i=e.length;r<i;r++)s[r]=J(t,e[r]);return s}return e}function J(e,t){var n=t.cloneNode(!0),r,i;if(e.$&&typeof e.cloneEvents=="function"){e.$(n).cloneEvents(t),r=e.$(n).find("*"),i=e.$(t).find("*");for(var s=0;s<i.length;s++)e.$(r[s]).cloneEvents(i[s])}return n}function K(t,n,r){var i=this[0];return i?t==null&&n==null?(Q(i)?G():{x:i.scrollLeft,y:i.scrollTop})[r]:(Q(i)?e.scrollTo(t,n):(t!=null&&(i.scrollLeft=t),n!=null&&(i.scrollTop=n)),this):this}function Q(t){return t===e||/^(?:body|html)$/i.test(t.tagName)}function G(){return{x:e.pageXOffset||n.scrollLeft,y:e.pageYOffset||n.scrollTop}}function Y(e){return new V(e)}var e=window,t=e.document,n=t.documentElement,r="parentNode",i=null,s=/^(checked|value|selected|disabled)$/i,o=/^(select|fieldset|table|tbody|tfoot|td|tr|colgroup)$/i,u=["<table>","</table>",1],a=["<table><tbody><tr>","</tr></tbody></table>",3],f=["<select>","</select>",1],l=["_","",0,1],c={thead:u,tbody:u,tfoot:u,colgroup:u,caption:u,tr:["<table><tbody>","</tbody></table>",2],th:a,td:a,col:["<table><colgroup>","</colgroup></table>",2],fieldset:["<form>","</form>",1],legend:["<form><fieldset>","</fieldset></form>",2],option:f,optgroup:f,script:l,style:l,link:l,param:l,base:l},h=/^(checked|selected|disabled)$/,p=/msie/i.test(navigator.userAgent),d,v,m,g={},y=0,b=/^-?[\d\.]+$/,w=/^data-(.+)$/,E="px",S="setAttribute",x="getAttribute",T="getElementsByTagName",N=function(){var e=t.createElement("p");return e.innerHTML='<a href="#x">x</a><table style="float:left;"></table>',{hrefExtended:e[T]("a")[0][x]("href")!="#x",autoTbody:e[T]("tbody").length!==0,computedStyle:t.defaultView&&t.defaultView.getComputedStyle,cssFloat:e[T]("table")[0].style.styleFloat?"styleFloat":"cssFloat",transform:function(){var t=["transform","webkitTransform","MozTransform","OTransform","msTransform"],n;for(n=0;n<t.length;n++)if(t[n]in e.style)return t[n]}(),classList:"classList"in e,opasity:function(){return typeof t.createElement("a").style.opacity!="undefined"}()}}(),C=/(^\s*|\s*$)/g,k=/\s+/,L=String.prototype.toString,A={lineHeight:1,zoom:1,zIndex:1,opacity:1,boxFlex:1,WebkitBoxFlex:1,MozBoxFlex:1},O=String.prototype.trim?function(e){return e.trim()}:function(e){return e.replace(C,"")},U=N.computedStyle?function(e,n){var r=null,i=t.defaultView.getComputedStyle(e,"");return i&&(r=i[n]),e.style[n]||r}:p&&n.currentStyle?function(e,t){if(t=="opacity"&&!N.opasity){var n=100;try{n=e.filters["DXImageTransform.Microsoft.Alpha"].opacity}catch(r){try{n=e.filters("alpha").opacity}catch(i){}}return n/100}var s=e.currentStyle?e.currentStyle[t]:null;return e.style[t]||s}:function(e,t){return e.style[t]};return N.classList?(d=function(e,t){return e.classList.contains(t)},v=function(e,t){e.classList.add(t)},m=function(e,t){e.classList.remove(t)}):(d=function(e,t){return M(t).test(e.className)},v=function(e,t){e.className=O(e.className+" "+t)},m=function(e,t){e.className=O(e.className.replace(M(t)," "))}),V.prototype={get:function(e){return this[e]||null},each:function(e,t){return _(this,e,t)},deepEach:function(e,t){return D(this,e,t)},map:function(e,t){var n=[],r,i;for(i=0;i<this.length;i++)r=e.call(this,this[i],i),t?t(r)&&n.push(r):n.push(r);return n},html:function(e,t){var r=t?n.textContent===undefined?"innerText":"textContent":"innerHTML",i=this,s=function(t,n){_($(e,i,n),function(e){t.appendChild(e)})},u=function(n,i){try{if(t||typeof e=="string"&&!o.test(n.tagName))return n[r]=e}catch(u){}s(n,i)};return typeof e!="undefined"?this.empty().each(u):this[0]?this[0][r]:""},text:function(e){return this.html(e,!0)},append:function(e){var t=this;return this.each(function(n,r){_($(e,t,r),function(e){n.appendChild(e)})})},prepend:function(e){var t=this;return this.each(function(n,r){var i=n.firstChild;_($(e,t,r),function(e){n.insertBefore(e,i)})})},appendTo:function(e,t){return z.call(this,e,t,function(e,t){e.appendChild(t)})},prependTo:function(e,t){return z.call(this,e,t,function(e,t){e.insertBefore(t,e.firstChild)},1)},before:function(e){var t=this;return this.each(function(n,i){_($(e,t,i),function(e){n[r].insertBefore(e,n)})})},after:function(e){var t=this;return this.each(function(n,i){_($(e,t,i),function(e){n[r].insertBefore(e,n.nextSibling)},null,1)})},insertBefore:function(e,t){return z.call(this,e,t,function(e,t){e[r].insertBefore(t,e)})},insertAfter:function(e,t){return z.call(this,e,t,function(e,t){var n=e.nextSibling;n?e[r].insertBefore(t,n):e[r].appendChild(t)},1)},replaceWith:function(e){return Y($(e)).insertAfter(this),this.remove()},addClass:function(e){return e=L.call(e).split(k),this.each(function(t){_(e,function(e){e&&!d(t,X(t,e))&&v(t,X(t,e))})})},removeClass:function(e){return e=L.call(e).split(k),this.each(function(t){_(e,function(e){e&&d(t,X(t,e))&&m(t,X(t,e))})})},hasClass:function(e){return e=L.call(e).split(k),q(this,function(t){return q(e,function(e){return e&&d(t,e)})})},toggleClass:function(e,t){return e=L.call(e).split(k),this.each(function(n){_(e,function(e){e&&(typeof t!="undefined"?t?v(n,e):m(n,e):d(n,e)?m(n,e):v(n,e))})})},show:function(e){return e=typeof e=="string"?e:"",this.each(function(t){t.style.display=e})},hide:function(){return this.each(function(e){e.style.display="none"})},toggle:function(e,t){return t=typeof t=="string"?t:"",typeof e!="function"&&(e=null),this.each(function(n){n.style.display=n.offsetWidth||n.offsetHeight?"none":t,e&&e.call(n)})},first:function(){return Y(this.length?this[0]:[])},last:function(){return Y(this.length?this[this.length-1]:[])},next:function(){return this.related("nextSibling")},previous:function(){return this.related("previousSibling")},parent:function(){return this.related(r)},related:function(e){return this.map(function(t){t=t[e];while(t&&t.nodeType!==1)t=t[e];return t||0},function(e){return e})},focus:function(){return this.length&&this[0].focus(),this},blur:function(){return this.length&&this[0].blur(),this},css:function(n,r){function o(e,t,n){for(var r in s)if(s.hasOwnProperty(r)){n=s[r],(t=R(r))&&b.test(n)&&!(t in A)&&(n+=E);try{e.style[t]=X(e,n)}catch(i){}}}var i,s=n;return r===undefined&&typeof n=="string"?(r=this[0],r?r===t||r===e?(i=r===t?Y.doc():Y.viewport(),n=="width"?i.width:n=="height"?i.height:""):(n=R(n))?U(r,n):null:null):(typeof n=="string"&&(s={},s[n]=r),p&&s.opacity&&(s.filter="alpha(opacity="+s.opacity*100+")",s.zoom=n.zoom||1,delete s.opacity),this.each(o))},offset:function(e,n){if(typeof e=="number"||typeof n=="number")return this.each(function(t){W(t,e,n)});if(!this[0])return{top:0,left:0,height:0,width:0};var r=this[0],i=r.offsetWidth,s=r.offsetHeight,o=r.offsetTop,u=r.offsetLeft;while(r=r.offsetParent)o+=r.offsetTop,u+=r.offsetLeft,r!=t.body&&(o-=r.scrollTop,u-=r.scrollLeft);return{top:o,left:u,height:s,width:i}},dim:function(){if(!this.length)return{height:0,width:0};var e=this[0],t=!e.offsetWidth&&!e.offsetHeight?function(t){var n={position:e.style.position||"",visibility:e.style.visibility||"",display:e.style.display||""};return t.first().css({position:"absolute",visibility:"hidden",display:"block"}),n}(this):null,n=e.offsetWidth,r=e.offsetHeight;return t&&this.first().css(t),{height:r,width:n}},attr:function(e,t){var n=this[0];if(typeof e=="string"||e instanceof String)return typeof t=="undefined"?n?s.test(e)?h.test(e)&&typeof n[e]=="string"?!0:n[e]:e!="href"&&e!="src"||!N.hrefExtended?n[x](e):n[x](e,2):null:this.each(function(n){s.test(e)?n[e]=X(n,t):n[S](e,X(n,t))});for(var r in e)e.hasOwnProperty(r)&&this.attr(r,e[r]);return this},removeAttr:function(e){return this.each(function(t){h.test(e)?t[e]=!1:t.removeAttribute(e)})},val:function(e){return typeof e=="string"?this.attr("value",e):this.length?this[0].value:null},data:function(e,t){var n=this[0],r,i;return typeof t=="undefined"?n?(r=B(n),typeof e=="undefined"?(_(n.attributes,function(e){(i=(""+e.name).match(w))&&(r[P(i[1])]=F(e.value))}),r):(typeof r[e]=="undefined"&&(r[e]=F(this.attr("data-"+H(e)))),r[e])):null:this.each(function(n){B(n)[e]=t})},remove:function(){return this.deepEach(j),this.each(function(e){e[r]&&e[r].removeChild(e)})},empty:function(){return this.each(function(e){D(e.childNodes,j);while(e.firstChild)e.removeChild(e.firstChild)})},detach:function(){return this.each(function(e){e[r].removeChild(e)})},scrollTop:function(e){return K.call(this,null,e,"y")},scrollLeft:function(e){return K.call(this,e,null,"x")}},Y.setQueryEngine=function(e){i=e,delete Y.setQueryEngine},Y.aug=function(e,t){for(var n in e)e.hasOwnProperty(n)&&((t||V.prototype)[n]=e[n])},Y.create=function(e){return typeof e=="string"&&e!==""?function(){var n=/^\s*<([^\s>]+)/.exec(e),i=t.createElement("div"),s=[],o=n?c[n[1].toLowerCase()]:null,u=o?o[2]+1:1,a=o&&o[3],f=r,l=N.autoTbody&&o&&o[0]=="<table>"&&!/<tbody/i.test(e);i.innerHTML=o?o[0]+e+o[1]:e;while(u--)i=i.firstChild;a&&i&&i.nodeType!==1&&(i=i.nextSibling);do(!n||i.nodeType==1)&&(!l||i.tagName.toLowerCase()!="tbody")&&s.push(i);while(i=i.nextSibling);return _(s,function(e){e[f]&&e[f].removeChild(e)}),s}():I(e)?[e.cloneNode(!0)]:[]},Y.doc=function(){var e=Y.viewport();return{width:Math.max(t.body.scrollWidth,n.scrollWidth,e.width),height:Math.max(t.body.scrollHeight,n.scrollHeight,e.height)}},Y.firstChild=function(e){for(var t=e.childNodes,n=0,r=t&&t.length||0,i;n<r;n++)t[n].nodeType===1&&(i=t[r=n]);return i},Y.viewport=function(){return{width:p?n.clientWidth:self.innerWidth,height:p?n.clientHeight:self.innerHeight}},Y.isAncestor="compareDocumentPosition"in n?function(e,t){return(e.compareDocumentPosition(t)&16)==16}:"contains"in n?function(e,t){return e!==t&&e.contains(t)}:function(e,t){while(t=t[r])if(t===e)return!0;return!1},Y},this);
		engine = this.bonzo;

		engine.setQueryEngine(selects._engine);

		publicAPI = {
			/**
			 * creates a new DOM element based on the markup string passed
			 *
			 * @param {string} markup
			 */
			create: function(){
				return engine.create.apply(publicAPI,arguments);
			},

			/**
			 * wraps an object in a bonzo wrapper
			 *
			 * @param {DOMElement} element
			 */
			$: function() {
				return engine.apply(publicAPI,arguments);
			},

			_engine: engine
		};

		return publicAPI;
	}
	var dom = new __dom__();

	function __domready__() {
		/*!
		  * domready (c) Dustin Diaz 2012 - License MIT
		  */
		!function(a,ctx,b){typeof module!="undefined"?module.exports=b():typeof define=="function"&&typeof define.amd=="object"?define(b):ctx[a]=b()}("domready",this,function(a){function m(a){l=1;while(a=b.shift())a()}var b=[],c,d=!1,e=document,f=e.documentElement,g=f.doScroll,h="DOMContentLoaded",i="addEventListener",j="onreadystatechange",k="readyState",l=/^loade|c/.test(e[k]);return e[i]&&e[i](h,c=function(){e.removeEventListener(h,c,d),m()},d),g&&e.attachEvent(j,c=function(){/^c/.test(e[k])&&(e.detachEvent(j,c),m())}),a=g?function(c){self!=top?l?c():b.push(c):function(){try{f.doScroll("left")}catch(b){return setTimeout(function(){a(c)},50)}c()}()}:function(a){l?a():b.push(a)}});
		return this.domready;
	};
	var domready = new __domready__();


	// dispatch events to the main event hub
	function emitEvents() {
		var args = [].slice.call(arguments), evt = args[2];

		args.unshift("dombridge:dom-event");
		global.EventHub.emit.apply(global.EventHub,args);

		if (evt.type === "click" ||
			(evt.type === "keypress" &&
				(evt.which === 13 || evt.which === 32)
			)
		) {
			args[0] = "dombridge:do";
		}
		else if (evt.type === "mouseover") {
			args[0] = "dombridge:start-hover";
		}
		else if (evt.type === "mouseout") {
			args[0] = "dombridge:end-hover";
		}

		global.EventHub.emit.apply(global.EventHub,args);
	}

	// DOM event listener
	function DOMEventHandler(evt) {
		var $el = dom.$(evt.target), elementType = $el.attr("rel"), elementTypes;

		// make sure we're only responding to "dombridge"-opted elements
		if (elementType && elementType.match(/\bdombridge\b/)) {
			elementTypes = elementType.replace(/\bdombridge\b/g,"").split(/\s+/);
			for (var i=0; i<elementTypes.length; i++) {
				if (elementTypes[i] && elementTypes[i].match(/[^\s]/)) {
					emitEvents($el[0],elementTypes[i],evt);
				}
			}

			evt.stopPropagation();
			evt.stopImmediatePropagation();
		}
	}

	// base bridge event handler
	function bridgeEventHandler() {
		var i, args = [].slice.call(arguments);
		for (i=0; i<filters.length; i++) {
			filters[i].listener.emit.apply(filters[i].listener,args);
		}
	}

	// add or remove bridge event handlers from main event hub
	function manageBridgeEventHandlers(bind) {
		for (var i in bridge_event_handlers) {
			global.EventHub[(bind ? "on" : "off")](i,bridge_event_handlers[i]);
		}
	}

	// bridge events from a DOM container(s) using event delegation
	function bridgeFromContainer(sel,evts,elems) {
		if (evts && typeof evts !== "string") evts = evts.join(" ");
		if (elems && typeof elems !== "string") elems = elems.join(", ");
		if (!evts || !evts.match(/[^\s]/)) evts = "click mouseover mouseout mousedown mouseup keypress";
		if (!sel) sel = "body";
		if (!elems) elems = global.EventHub.DOMBridge.defaultTargets.join(", ");

		if (!(sel in bridges) ||
			!(evts in bridges[sel]) ||
			!(elems in bridges[sel][evts])
		) {
			bridges[sel] = bridges[sel] || {};
			bridges[sel][evts] = bridges[sel][evts] || {};
			bridges[sel][evts][elems] = bridges[sel][evts][elems] || true;

			events.handle(selects.find(sel)[0],evts,elems,DOMEventHandler);
		}
	}

	// bridge events from a specific DOM element(s)
	function bridgeFromElement(sel,evts) {
		if (evts && typeof evts !== "string") evts = evts.join(" ");
		if (!evts || !evts.match(/[^\s]/)) evts = "click mouseover mouseout mousedown mouseup keypress";
		if (!sel) sel = "body";

		if (!(sel in bridges) ||
			!(evts in bridges[sel])
		) {
			bridges[sel] = bridges[sel] || {};
			bridges[sel][evts] = bridges[sel][evts] || {};
			bridges[sel][evts]["."] = bridges[sel][evts]["."] || true;

			events.handle(selects.find(sel)[0],evts,DOMEventHandler);
		}
	}

	// shut down a specific element/container bridging
	// NOTE: for `elems` param, if you don't pass it at all, it defaults to the `defaultTargets` setting
	//       if you pass a falsy value, it assumes "." to remove a bridge from the `sel` element itself.
	//       otherwise, any truthy value is assumed to be the delegated elements selector
	function removeBridge(sel,evts,elems) {
		if (evts && typeof evts !== "string") evts = evts.join(" ");
		if (elems && typeof elems !== "string") elems = elems.join(", ");
		if (!evts || !evts.match(/[^\s]/)) evts = "click mouseover mouseout mousedown mouseup keypress";
		if (!sel) sel = "body";
		if (typeof elems === "undefined") elems = global.EventHub.DOMBridge.defaultTargets.join(", ");
		else if (!elems) elems = ".";

		if (bridges[sel] && bridges[sel][evts] && bridges[sel][evts][elems]) {
			if (elems === ".") {
				events.remove(selects.find(sel)[0],evts,DOMEventHandler);
			}
			else {
				events.remove(selects.find(sel)[0],evts,elems,DOMEventHandler);
			}
			delete bridges[sel][evts][elems];
		}
	}

	// start up the event bridge handling
	function startBridging() {
		if (!bridging) {
			bridging = true;
			manageBridgeEventHandlers(/*bind=*/true);
		}
	}

	// shut down the event bridge handling
	function stopBridging() {
		var i, j, k, sels = Object.keys(bridges),
			evts, elems
		;

		if (bridging) {
			bridging = false;

			// remove all the registered bridges
			for (i=0; i<sels.length; i++) {
				evts = Object.keys(bridges[sels[i]]);
				for (j=0; j<evts.length; j++) {
					elems = Object.keys(bridges[sels[i]][evts[j]]);
					for (k=0; k<elems.length; k++) {
						removeBridge(sels[i],evts[j],elems[k]);
					}
				}
			}
			bridges = {};

			manageBridgeEventHandlers(/*bind=*/false);

			for (i=0; i<filters.length; i++) {
				filters[i].listener.destroy();
			}
			filters = [];
		}
	}

	// filter events based on several options:
	// * elementType: string; value appearing in element's `rel` attribute
	// * elementTypes: [string, ...]; values appearing in element's `rel` attribute
	// * eventType: string; representing the DOM event type ("click", "mouseover", etc)
	// * eventTypes: [string, ...]; values appearing in element's `rel` attribtue value
	// * selector: string; value is a DOM CSS selector which must select either the event's target element,
	//      or one of the target element's ancestors (parents)
	function filter(opts) {

		// check an event against the filter options to see if it should be allowed or not
		function checkFilter(el,elementType,evt) {
			var ok = true, $el = dom.$(el);

			// `elementType` filter specified but not matched?
			if (ok && ("elementType" in opts) && opts.elementType !== elementType) {
				ok = false;
			}
			// `elementTypes` filter specified but none matched?
			// ~indexOf explanation: http://webreflection.blogspot.com/2008/06/two-simple-tricks-in-javascript-olds.html
			if (ok && "elementTypes" in opts && !~opts.elementTypes.indexOf(elementType)) {
				ok = false;
			}

			// `eventType` filter specified but not matched?
			if (ok && "eventType" in opts && opts.eventType !== evt.type) {
				ok = false;
			}
			// `eventTypes` filter specified but none matched?
			if (ok && "eventTypes" in opts && !~opts.eventTypes.indexOf(evt.type)) {
				ok = false;
			}

			// `selector` filter specified but not matched?
			if (ok && "selector" in opts && !selects.is(el,opts.selector + "," + opts.selector + " *")) {
				ok = false;
			}

			return ok;
		}

		var i, filter, listener = new EventEmitter();

		// normalize the filter options passed in
		opts = opts || {};
		if (opts.elementTypes && Object.prototype.toString.call(opts.elementTypes) !== "[object Array]") {
			opts.elementTypes = (opts.elementTypes || "").split(/\s+/);
		}
		if (opts.eventTypes && Object.prototype.toString.call(opts.eventTypes) !== "[object Array]") {
			opts.eventTypes = (opts.eventTypes || "").split(/\s+/);
		}

		// clean up memory for a filter-listener when done with it
		listener.destroy = function(){
			delete filter.listener;
			for (var i in filter) {
				this.off(i,filter[i]);
				filter[i] = null;
			}
		};

		// set up filter handlers for each bridge event type
		filter = {};
		for (i=0; i<bridge_event_types.length; i++) {
			(function(evtNameNS,evtName){
				filter[evtNameNS] = function(el,elementType,evt){
					// handle event?
					if (checkFilter(el,elementType,evt)) {
						listener.emit(evtName,el,elementType,evt);
					}
				};
			})(bridge_event_types[i],bridge_event_types[i].replace(/^.*?:/,""));
		}

		// set up listening bindings for filter handlers
		for (i in filter) {
			listener.on(i,filter[i]);
		}

		filter.listener = listener;

		filters.push(filter);

		return filter.listener;
	}

	// register another bridge event type for handling
	function registerBridgeEventType(bridgeEvtType) {
		if (!~bridge_event_types.indexOf(bridgeEvtType)) {
			bridge_event_types.push(bridgeEvtType);
			bridge_event_handlers[bridgeEvtType] = bridgeEventHandler.bind(null,bridgeEvtType);
			global.EventHub.on(bridgeEvtType,bridge_event_handlers[bridgeEvtType]);
		}
	}

	if (!global.EventHub) {
		throw new Error("Missing event hub.");
	}

	var bridge_event_handlers = {}, i,

		// extract the EventEmitter object so we can make more of them!
		EventEmitter = global.EventHub.constructor,

		// built-in bridge event types (add more with `registerBridgeEventType()`)
		bridge_event_types = [
			"dombridge:dom-ready",
			"dombridge:dom-event",
			"dombridge:do",
			"dombridge:start-hover",
			"dombridge:end-hover"
		],

		bridging = false,
		bridges = {},
		filters = []
	;

	// set up the bound bridge event handlers
	for (i=0; i<bridge_event_types.length; i++) {
		bridge_event_handlers[bridge_event_types[i]] = bridgeEventHandler.bind(null,bridge_event_types[i]);
	}

	// the public interface
	global.EventHub.DOMBridge = {
		defaultTargets: [ "a", "button", "input[type='button']" ],
		bridgeFromContainer: bridgeFromContainer,
		bridgeFromElement: bridgeFromElement,
		removeBridge: removeBridge,
		startBridging: startBridging,
		stopBridging: stopBridging,
		filter: filter,
		registerBridgeEventType: registerBridgeEventType
	};

	// initialize the bridging
	startBridging();

	// special dom-ready event handling
	global.EventHub.preserveOnce("dombridge:dom-ready");
	domready(function(){
		global.EventHub.emit("dombridge:dom-ready");
	});

})(window);