define(function(require) {

	var Vector = require('core/vector');
	var Sprite = require('asset/sprite');
	var Map = require('game/map');

	var count = 0;

	return Map.extend({

		get tiles() {
			return this._tiles;
		},
		set tiles(value) {
			if (typeof value === 'string')
				value = new Sprite(value, this.tilesize);

			this._tiles = value;
		},

		init: function(tilesize, data, tileset) {
			this.base(tilesize, data);
			this.scroll = Vector(0, 0);
			this.tiles = tileset;
		},

		dispose: function() {
			this.scroll.dispose();
		},

		setScroll: function(x, y) {
			this.scroll.set(x, y);
		},

		draw: function(context) {
			var tilesize = this.tilesize;
			var rowStart = Math.floor(this.scroll.y / tilesize);
			var rowEnd = Math.ceil((this.scroll.y + context.canvas.height) / tilesize);
			var colStart = Math.floor(this.scroll.x / tilesize);
			var colEnd = Math.ceil((this.scroll.x + context.canvas.width) / tilesize);

			if (rowStart < 0) rowStart = 0;
			if (rowEnd > this.height) rowEnd = this.height;
			if (colStart < 0) colStart = 0;
			if (colEnd > this.width) colEnd = this.width;

			context.save();

			var i, j;
			var rowWidth = (colEnd - colStart) * tilesize;

			for (i = rowStart; i < rowEnd; i++) {
				for (j = colStart; j < colEnd; j++) {
					this._tiles.draw(context, this.data[i][j]);
					context.translate(tilesize, 0);
				}
				context.translate(-rowWidth, tilesize);
			}

			context.restore();
		}
	});
});
