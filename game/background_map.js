define(function(require) {

	var Vector = require('core/vector');
	var Image = require('asset/image');
	var Map = require('game/map');

	return Map.extend({

		get tiles() {
			return this._tiles;
		},
		set tiles(value) {
			this._tiles = new Image(value);
		},

		init: function(tilesize, data, tileset) {
			this.base(tilesize, data);
			this.scroll = new Vector(0, 0);
			this.tiles = tileset;
		},

		setScroll: function(x, y) {
			this.scroll.set(x, y);
		},

		draw: function(context, scale) {
			var tilesize = this.tilesize;
			var areaX = context.canvas.width / scale;
			var areaY = context.canvas.height / scale;

			var rowStart = Math.floor(this.scroll.y / tilesize);
			var rowEnd = Math.ceil((this.scroll.y + areaY) / tilesize);
			var colStart = Math.floor(this.scroll.x / tilesize);
			var colEnd = Math.ceil((this.scroll.x + areaX) / tilesize);

			if (rowStart < 0) rowStart = 0;
			if (rowEnd > this.height) rowEnd = this.height;
			if (colStart < 0) colStart = 0;
			if (colEnd > this.width) colEnd = this.width;

			for (var i = rowStart; i < rowEnd; i++)
				for (var j = colStart; j < colEnd; j++)
					this._tiles.drawTile(
						// basic draw data
						context, scale,
						// tile position
						j * tilesize, i * tilesize,
						// tile index
						this.data[i][j],
						// tile size
						tilesize, 1);
		}
	});
});
