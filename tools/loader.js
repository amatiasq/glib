define(function(require) {

	var Base = require('core/base');
	var toFalse = Boolean.bind(false);

	var Loader = Base.extend({

		init: function() {
			this.loaded = true;
			this.images = [];
			this._callbacks = [];
		},

		addImage: function(url) {
			this.loaded = false;
			this.images.push(url);
		},

		start: function() {
			var loaded = this.images.map(toFalse);
			var elements = this.images.map(function(url) {
				var el = new Image();
				el.src = url;
				Loader.cache[url] = el;
				return el;
			});

			function end() {
				console.log('end');
				this.loaded = true;
				this._callbacks.forEach(function(a) { a() });
			}

			end = end.bind(this);

			elements.forEach(function(element, index) {
				element.onload = function() {
					console.log('received');
					loaded[index] = true;
					if (loaded.every(Boolean))
						end();
				};
			});
		},

		onLoad: function(listener) {
			if (typeof listener === 'function')
				this._callbacks.push(listener);
		}
	});

	Loader.cache = {};

	Object.defineProperty(Loader, 'instance', function() {

	});

	return Loader;

});
