define(function(require) {

	var Base = require('core/base');
	var Vector = require('core/vector');
	var Animation = require('asset/animation');
	var mainLoader = require('tools/loader').instance;

	var count = 0;
	return Base.extend({

		get tile() {
			return this._tile;
		},
		set tile(value) {
			if (typeof value === 'string')
				value = new Image(value);

			this._tile = value;
		},

		get animation() {
			return this._animation;
		},
		set animation(value) {
			if (typeof value === 'string')
				value = this.animations[value];

			this._animation = value;
		},

		init: function(input) {
			this.__id__ = count++;
			this._tile = null;
			this._animation = null;

			this.input = input;
			this.animations = {};
			//this.bounciness = 0;

			this.maxVel = new Vector(100, 100);
			this.friction = new Vector(0, 0);
			this.accel = new Vector(0, 0);
			this.vel = new Vector(0, 0);
			this.pos = new Vector(0, 0);
		},

		addAnimation: function(id, interval, animation) {
			this.animations[id] = new Animation(this.tile, interval, animation);
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
			this.updateLocation(this._nextPos());
			this.animation.step();
		},

		draw: function(context) {
			context.save();
			context.translate(this.pos.x, this.pos.y);
			this.animation.draw(context);
			context.restore();
		},

		debug: function() {
			console.log('Entity --[' + this.__id__ +
				'{ pos: ' + this.pos.round() +
				', vel: ' + this.vel.round() +
				', accel: ' + this.accel.round() + ' }');
		}
	});
});
