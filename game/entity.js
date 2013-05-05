define(function(require) {

	var Base = require('core/base');
	var Vector = require('core/vector');
	var mainLoader = require('tools/loader').instance;

	return Base.extend({

		_tile: null,
		canvas: null,
		bounciness: 0,

		get tile() {
			return this._tile.src;
		},
		set tile(value) {
			this._tile = mainLoader.addImage(value);
		},

		init: function() {
			this.maxVel = new Vector(100, 100);
			this.friction = new Vector(0, 0);
			this.accel = new Vector(0, 0);
			this.vel = new Vector(0, 0);
			this.pos = new Vector(0, 0);
		},

		draw: function(ctx) {
			ctx.drawImage(this._tile, this.pos.x, this.pos.y);
		},

		_nextPos: function() {
			if (!this.accel.isZero)
				this.vel.merge(this.accel);
			else
				this.vel.sustract(this.friction);

			this.vel.max(this.maxVel).min(Vector.zero);
			return this.pos.clone().merge(this.vel);
		},

		updateLocation: function(calc) {
			this.pos.x = calc.x;
			this.pos.y = calc.y;
		},

		step: function() {
			this.updateLocation(this._nextPos());
		}
	});
});
