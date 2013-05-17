define(function(require) {

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

			this.vel.set(
				this.input.get('left') ? -keyVelocity : this.input.get('right') ? keyVelocity : 0,
				this.input.get('up') ? -keyVelocity : this.input.get('down') ? keyVelocity : 0
			);

			if (this.input.get('up'))
				direction = 'up';
			else if (this.input.get('down'))
				direction = 'down';
			else if (this.input.get('left'))
				direction = 'left';
			else if (this.input.get('right'))
				direction = 'right';

			if (direction)
				this.animation = 'walk-' + direction;
			else if (this.direction)
				this.animation = 'stop-' + this.direction;

			this.direction = direction;
			this.base(collisions);
		}
	});
});
