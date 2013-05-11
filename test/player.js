define(function(require) {

	var Entity = require('game/entity');

	return Entity.extend({

		init: function(input) {
			this.base(input);
			input.bind(input.KEY.UP, 'up');
			input.bind(input.KEY.DOWN, 'down');
			input.bind(input.KEY.LEFT, 'left');
			input.bind(input.KEY.RIGHT, 'right');
		},

		step: function() {
			var keyVelocity = 1;
			if (this.input.get('up'))    this.vel.y -= keyVelocity;
			if (this.input.get('down'))  this.vel.y += keyVelocity;
			if (this.input.get('left'))  this.vel.x -= keyVelocity;
			if (this.input.get('right')) this.vel.x += keyVelocity;
			this.base();
		}
	});
});
