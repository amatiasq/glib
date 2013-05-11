define(function(require) {

	var Base = require('core/base');
	var mainLoader = require('tools/loader').instance;

	var Image = Base.extend({

		get loaded() {
			return this.data.complete;
		},
		get width() {
			return '_width' in this ? this._width : this.data.width;
		},
		get height() {
			return '_height' in this ? this._height : this.data.height;
		},

		init: function(source) {
			this.path = source;
			this.data = mainLoader.addImage(source);
		},

		crop: function(x, y, width, height) {
			return new Cropped(this.path, x, y, width, height);
		},

		draw: function(context, scale, x, y) {
			if (!this.loaded)
				throw new Error('Image ' + this.path + ' is not loaded yet');

			context.drawImage(this.data, x, y, this.width * scale, this.height * scale);
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
				this.width * scale, this.height * scale);
		}
	});

	return Image;
});
