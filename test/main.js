define('main', function(require) {

	var loader = require('tools/loader').instance;
	var Game = require('game/game');
	var Entity = require('game/entity');

	var viewport = $(window);
	var canvas = $('canvas')[0];
	canvas.width = viewport.width();
	canvas.height = viewport.height();

	var game = new Game(canvas);
	var player = game.spawn(Entity, 100, 0);
	player.accel.y = 0.05;
	player.tile = 'cross.png'

	game.start();
});


requirejs.config({
	baseUrl: '../',
	urlArgs: "nocache=" +  Date.now(),
})(['main'])
