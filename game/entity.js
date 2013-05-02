define(function(require) {

	var Base = require('core/base');
	var Loader = require('tools/loader');

	var Entity = Base.extend({

		get tile() {
			return this._tile.src;
		},
		set tile(value) {
			this._tile = Loader.cache[value];
			if (!this._tile)
				throw new Error('Asset --[' + value + ']-- is not loaded yet');
		},

		init: function() {
			this.canvas = null;
			this._tile = new Image();
			this.pos = { x: 0, y: 0 };
		},

		draw: function() {
			var ctx = this.canvas.getContext('2d');
			console.log(this._tile.src);
			ctx.drawImage(this._tile, this.pos.x, this.pos.y);
		}

	});

	return Entity;

});
