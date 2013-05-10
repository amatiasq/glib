define(function(require) {

	var Base = require('core/base');
	var mainLoader = require('tools/loader').instance;

	var Image = Base.extend({

		get loaded() {
			return this.data.complete;
		},
		get width() {
			return this._width || this.data.width;
		},
		get height() {
			return this._height || this.data.height;
		},

		init: function(source) {
			this.path = source;
			if (!source) debugger;
			this.data = mainLoader.addImage(source);
		},

		crop: function(x, y, width, height) {
			width = width || this.width - x;
			height = height || this.height - y;
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
