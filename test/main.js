define('main', function(require) {

	var loader = require('tools/loader').instance;
	var Entity = require('game/entity');

	var player = new Entity();
	player.canvas = $('canvas')[0];
	player.pos.x = 100;
	player.tile = 'cross.png'

	console.log('sending');
	loader.onLoad(function() {
		console.log('received');
		player.draw();
	});

});


requirejs.config({ baseUrl: '../' })(['main'])
