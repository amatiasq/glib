define(function(require) {

	var Base = require('core/base');
	var Vector = require('core/vector');
	var mainLoader = require('tools/loader').instance;

	var count = 0;
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

		init: function(input) {
			this.__id__ = count++;
			this.input = input;
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
				this.vel.toZero(this.friction);

			this.maxVel.negate();
			this.vel.min(this.maxVel);
			this.maxVel.negate();
			this.vel.max(this.maxVel);
			return this.pos.clone().merge(this.vel);
		},

		updateLocation: function(calc) {
			this.pos.x = calc.x;
			this.pos.y = calc.y;
		},

		step: function() {
			//this.debug();
			this.updateLocation(this._nextPos());
		},

		debug: function() {
			console.log('Entity --[' + this.__id__ +
				'{ pos: ' + this.pos.round() +
				', vel: ' + this.vel.round() +
				', accel: ' + this.accel.round() + ' }');
		}
	});
});
