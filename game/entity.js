define(function(require) {

	var Base = require('core/base');
	var mainLoader = require('tools/loader').instance;

	return Base.extend({

		get tile() {
			return this._tile.src;
		},
		set tile(value) {
			this._tile = mainLoader.addImage(value);
		},

		init: function() {
			this.pos = { x: 0, y: 0 };
			this.canvas = null;
			this._tile = null;
		},

		draw: function() {
			var ctx = this.canvas.getContext('2d');
			console.log(this._tile.src);
			ctx.drawImage(this._tile, this.pos.x, this.pos.y);
		}

	});

});
