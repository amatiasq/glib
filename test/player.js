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

		step: function() {
			var keyVelocity = 1;
			this.animation = 'stop-' + this.direction;

			if (this.input.get('up')) {
				this.pos.y -= keyVelocity;
				this.direction = 'up';
				this.animation = 'walk-up';

			} else if (this.input.get('down')) {
				this.pos.y += keyVelocity;
				this.direction = 'down';
				this.animation = 'walk-down';

			} else if (this.input.get('left')) {
				this.pos.x -= keyVelocity;
				this.direction = 'left';
				this.animation = 'walk-left';

			} else if (this.input.get('right')) {
				this.pos.x += keyVelocity;
				this.direction = 'right';
				this.animation = 'walk-right';
			}

			this.base();
		}
	});
});
