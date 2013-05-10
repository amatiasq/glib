define(function(require) {

	var Sprite = require('asset/sprite');
	var loader = require('tools/loader').instance;
	var Game = require('game/game');
	var Player = require('test/player');
	var Background = require('game/background_map');

	var tiles = new Sprite('terrain.png', 16, 16, 1).crop(1, 1, 1019, 371);

	var count = 0;
	var a = [ ];
	for (var i = 0; i < 22; i++) {
		a[i] = [];
		for (var j = 0; j < 60; j++)
			a[i][j] = i * 60 + j + 1;
	}

	console.log(a[0]);
	console.log(a[1]);

	// [
	// 	[  71, 190, 190,  72 ],
	// 	[ 371, 130, 130, 372 ],
	// 	[  71, 130, 130,  72 ],
	// 	[ 371, 250, 250, 372 ],
	// ]

	window.cosa = tiles;

	var map = new Background(16, a, tiles);

	var viewport = $(window);
	var canvas = $('canvas')[0];
	canvas.width = viewport.width();
	canvas.height = viewport.height();

	var game = new Game(canvas);
	var player = game.spawn(Player, 100, 0);
	player.friction.y = 0.1;
	player.accel.y = 0.05;
	player.tile = 'cross.png'

	game.addMap(map);
	game.start();

	setTimeout(function() {
		player.accel.y = 0;
	}, 2000);
	window.player = player;
});
