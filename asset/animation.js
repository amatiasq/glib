define(function(require) {

	var Base = require('core/base');

	return Base.extend({

		get interval() {
			return this._interval / 1000;
		},
		set interval(value) {
			this._interval = value * 1000;
		},

		init: function(sprite, sequence, interval) {
			this.sprite = sprite;
			this.sequence = sequence;
			this.interval = interval;
			this._current = 0;
			this._lastChange = 0;
		},

		step: function() {
			if (Date.now() - this._lastChange > this._interval) {
				this._lastChange = Date.now();
				this._current = (this._current + 1) % this.sequence.length;
			}
		},

		draw: function(context, scale, x, y) {
			this.sprite.draw(context, scale, x, y, this.sequence[this._current]);
		}
	});
});
