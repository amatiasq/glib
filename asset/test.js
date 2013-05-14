define(function(require) {

	var Base = require('core/base');
	var mainLoader = require('tools/loader').instance;

	var helperCanvas = document.createElement('canvas').context;
	var helperVector = new Vector();

	var Image = Base.extend({

		get loaded() {
			return this.data.complete;
		},
		get width() {
			return this._crop ? this._width : this.data.width;
		},
		get height() {
			return this._crop ? this._height : this.data.height;
		},

		init: function(source) {
			this.path = source;
			this.data = mainLoader.addImage(source);

			this._flipX = false;
			this._fliyY = false;
			this._cache = null;

			this._crop = false;
			this._x = 0;
			this._y = 0;
			this._width = null;
			this._height = null;
		},

		flipX: function() {
			this._cache = null;
			this._flipX = !this._flipX;
			return this;
		},
		flipY: function() {
			this._cache = null;
			this._flipY = !this._flipY;
			return this;
		},

		crop: function(x, y, width, height) {
			return this._cropInto(new Image(this.path));
		},

		_cropInto: function(child) {
			child._crop = true;
			child._x = this._x + x || 0;
			child._y = this._y + y || 0;
			child._width = width || null;
			child._height = height || null;
			return child;
		},

		_drawInContext: function(context, scale, x, y) {
			if (!this._crop)
				return context.drawImage(this.data, x, y, this.width * scale, this.height * scale);

			context.drawImage(this.data, this._x, this._y, this._width, this._height,
				x, y, this._width * scale, this._height * scale);
		},

		_createCache: function() {
			helperCanvas.width = this.width;
			helperCanvas.height = this.height;

			this._drawInContext(helperCanvas, 1, 0, 0);
			helperCanvas.scale(this._flipX ? -1 : 1, this._flipY ? -1 : 1);
			this._cache = helperCanvas.getImageData(0, 0, this.width, this.height);
		}

		draw: function(context, scale, x, y) {
			if (this._crop) {
				if (!this._width)  this._width  = this.data.width -  this._x;
				if (!this._height) this._height = this.data.height - this._y;
			}

			if (!this._flipY && !this._flipX) {
				this._drawInContext(context, scale, x, y);
			} else {
				if (!this._cache) this._cache = this._createCache();
				// KNOWN BUG: With flip enabled scale is disabled
				context.putImageData(this._cache, x, y);
			}
		}
	});

	var Sprite = Image.extend({

		get width() {
			return this.tilesize.x;
		},
		get height() {
			return this.tilesize.y;
		},

		init: function(source, tileWidth, tileHeight, gapX, gapY) {
			this.base();
			this.tilesize = new Vector(tileWidth, tileHeight);
			this.gap = new Vector(gapX || 0, gapY || gapX || 0);
			this.square = this.tilesize.clone().merge(this.gap);
		},

		crop: function() {
			this._cropInto(new Sprite(this.path, this.tilesize.x, this.tilesize.y, this.gap.x, this.gap.y));
		},

		_tileCoords: function(tile) {
			if (!tile) throw new Error('Invalid tile index "0"');
			if (!this.loaded) throw new Error('Image ' + this.path + ' is not loaded yet');
			if (!this.tilesPerRow) this.tilesPerRow = Math.floor((this.width + this.gap.x) / this.square.x);

			tile--;
			var row = Math.floor(tile / this.tilesPerRow);
			var col = tile % this.tilesPerRow;
			return helperVector.set(col * this.square.x, row * this.square.y);
		},

		draw: function(context, scale, x, y, tile) {
			if (this._tileCache[tile]) {
				var coords = this._tileCoords(Math.abs(tile));
				var tileData = this.crop(coords.x, coords.y, this.tilesize.x, this.tilesize.y);
				if (tile < 0) tileData.flipX();
				this._titleCache[tile] = tileData;
			}

			this._tileCache[tile].draw(context, scale, x, y);
		}
	});

	var Cropped = Image.extend({

		init: function(source, x, y, width, height) {
			this.base(source);
			this.cropX = x;
			this.cropY = y;
			this._width = width;
			this._height = height;
		},

		crop: function(x, y, width, height) {
			return new Cropped(this.path, this.cropX + x, this.cropY + y, width, height);
		},

		draw: function(context, scale, x, y) {

			// KNOWN BUG: If no width or height are passed they will be undefined until .draw() is invoked

			if (this._width == null)
				this._width = this.data.width - this.cropX;
			if (this._height == null)
				this._height = this.data.height - this.cropY;

			context.drawImage(
				this.data,
				this.cropX, this.cropY,
				this.width, this.height,
				x, y,
				width, height);
		}
	});

	return Image;
});
