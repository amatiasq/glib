define('main', function(require) {

	var Loader = require('tools/loader');
	var Entity = require('game/entity');

	var loader = new Loader();
	loader.addImage('cross.png');
	loader.start();

	console.log('sending');
	loader.onLoad(function() {
		console.log('received');
		var player = new Entity();
		player.canvas = $('canvas')[0];
		player.pos.x = 100;
		player.tile = 'cross.png'
		player.draw();
	});
});


requirejs.config({ baseUrl: '../' })(['main'])
