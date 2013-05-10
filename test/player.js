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
			var keyVelocity = 10;
			if (this.input.get('up'))    this.pos.y -= keyVelocity;
			if (this.input.get('down'))  this.pos.y += keyVelocity;
			if (this.input.get('left'))  this.pos.x -= keyVelocity;
			if (this.input.get('right')) this.pos.x += keyVelocity;
			this.base();
		}
	});
});
