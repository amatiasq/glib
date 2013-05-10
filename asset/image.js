define(function(require) {

	var Base = require('core/base');

	var ImageHandler = Base.extend({

		get loaded() {
			return this.data.complete;
		},
		get width() {
			return this.data.width;
		},
		get height() {
			return this.data.height;
		},

		init: function(source) {
			this.path = source;
			this.data = new Image();
			this.data.src = source;
		},

		crop: function(x, y, width, height) {
			return new Cropped(this.data, x, y, width, height);
		},

		tile: function(tile, tilesize, offset) {
			offset = offset || 0;
			var square = tilesize + offset;
			var tilesPerRow = Math.floor(this.width / square);
			var row = Math.floor(tile / tilesPerRow);
			var col = tile % tilesPerRow;
			return this.crop(col * square + offset, row * square + offset, tilesize, tilesize);
		},

		draw: function(context, scale, x, y) {
			context.drawImage(this.data, x, y, this.width * scale, this.height * scale);
		},

		drawTile: function(context, scale, x, y, tile, tilesize, offset) {
			this.tile(tile, tilesize, offset).draw(context, scale, x, y);

			// var tilesPerRow = Math.floor(this.width / tilesize);
			// var row = Math.floor(tile / tilesPerRow);
			// var col = tile % tilesPerRow;
			// var finalSize = tilesize * scale;

			// context.drawImage(
			// 	this.data,
			// 	// tile source position
			// 	col * tilesize, row * tilesize,
			// 	// tile source size
			// 	tilesize, tilesize
			// 	// target location
			// 	x, y,
			// 	// target tile size
			// 	finalSize, finalSize);
		}
	});

	var Cropped = ImageHandler.extend({

		init: function(data, x, y, width, height) {
			this.data = data;
			this.cropX = x;
			this.cropY = y;
			this.cropWidth = width;
			this.cropHeight = height;
		},

		draw: function(context, scale, x, y) {
			context.drawImage(
				this.data,
				this.cropX, this.cropY,
				this.cropWidth, this.cropHeight,
				x, y,
				this.cropWidth * scale, this.cropHeight * scale);
		}
	});

	return ImageHandler;
});
