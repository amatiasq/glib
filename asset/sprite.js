define(function(require) {

	var Vector = require('core/vector');
	var Image = require('asset/image');

	// var Sprite = CocaCola.extend({ transparent: true });

	var tmp = new Vector();

	var Sprite = Image.extend({

		init: function(source, tileWidth, tileHeight, gapX, gapY) {
			this.base(source);
			this.tilesize = new Vector(tileWidth, tileHeight || tileWidth);
			this.gap = new Vector(gapX || 0, gapY || gapX || 0)
			this.square = this.tilesize.clone().merge(this.gap);
		},

		_tileCoords: function(tile) {
			if (!tile)
				throw new Error('Invalid tile index "0"');
			if (!this.loaded)
				throw new Error('Image ' + this.path + ' is not loaded yet');

			if (!this.tilesPerRow)
				this.tilesPerRow = Math.floor((this.width + this.gap.x) / this.square.x);

			tile--;
			var row = Math.floor(tile / this.tilesPerRow);
			var col = tile % this.tilesPerRow// - row;
			return tmp.set(col * this.square.x, row * this.square.y);
		},

		crop: function(x, y, width, height) {
			return new SpriteCropped(this.path, this.tilesize.x, this.tilesize.y,
				this.gap.x, this.gap.y, x, y, width, height);
		},

		tile: function(tile) {
			var coords = this._tileCoords(tile);
			return this.crop(coords.x, coords.y, this.tilesize.x, this.tilesize.y);
		},

		draw: function(context, scale, x, y, tile) {
			var coords = this._tileCoords(tile);
			context.drawImage(
				this.data,
				// tile source position
				coords.x, coords.y,
				// tile source size
				this.tilesize.x, this.tilesize.y,
				// target location
				x, y,
				// target tile size
				this.tilesize.x * scale, this.tilesize.y * scale);
		}
	});

	var SpriteCropped = Sprite.extend({
		init: function(source, tileWidth, tileHeight, gapX, gapY, x, y, width, height) {
			this.base(source, tileWidth, tileHeight, gapX, gapY);
			this.cropX = x;
			this.cropY = y;
			this._width = width;
			this._height = height;
		},

		_tileCoords: function(tile) {
			var coords = this.base(tile);
			coords.x += this.cropX;
			coords.y += this.cropY;
			return coords;
		},

		crop: function(x, y, width, height) {
			return new SpriteCropped(this.path, this.tilesize.x, this.tilesize.y,
				this.gap.x, this.gap.y, this.cropX + x, this.cropY + y, width, height);
		},

		draw: function(context, scale, x, y, tile) {
			if (this._width == null)
				this._width = this.data.width - this.cropX;
			if (this._height == null)
				this._height = this.data.height - this.cropY;

			this.draw = this.base;
			this.base(context, scale, x, y, tile);
		}
	});

	return Sprite;
});
