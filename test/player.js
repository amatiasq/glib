/*globals context*/

define(function(require) {
	'use strict';

	var Entity = require('game/entity');

	return Entity.extend({

		init: function(input) {
			this.base(input);
			this.direction = 'down';
			input.bind(input.KEY.UP, 'up');
			input.bind(input.KEY.DOWN, 'down');
			input.bind(input.KEY.LEFT, 'left');
			input.bind(input.KEY.RIGHT, 'right');
		},

		step: function(collisions) {
			var keyVelocity = 2;
			var direction;

			if (this.input.get('up')) {
				direction = 'up';
				this.vel.set(0, -keyVelocity);
			} else if (this.input.get('down')) {
				direction = 'down';
				this.vel.set(0, keyVelocity);
			} else if (this.input.get('left')) {
				direction = 'left';
				this.vel.set(-keyVelocity, 0);
			} else if (this.input.get('right')) {
				direction = 'right';
				this.vel.set(keyVelocity, 0);
			} else {
				this.vel.set(0, 0);
			}

			if (direction)
				this.animation = 'walk-' + direction;
			else if (this.direction)
				this.animation = 'stop-' + this.direction;

			if (this.color) {
				context.fillStyle = this.color;
				context.fillRect(this.pos.x, this.pos.y, this.animation.width, this.animation.height);
			}

			this.direction = direction;
			this.base(collisions);
		}
	});
});
