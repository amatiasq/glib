define(function(require) {

	var extend = require('core/extend');

	return extend(Object, {

		constructor: function() {
			if (this.$factory) {
				var value = this.$factory;
				if (value) return value;
			}

			this.init();
		},

		init: function() { }
	});

});
