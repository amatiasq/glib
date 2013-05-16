define(function(require) {

	var Image = require('asset/image');
	var Sprite = require('asset/sprite');
	var loader = require('tools/loader').instance;
	var Game = require('game/game');
	var Player = require('test/player');
	var Background = require('game/background_map');

	var a = [ ];
	for (var i = 0; i < 22; i++) {
		a[i] = [];
		for (var j = 0; j < 60; j++)
			a[i][j] = 130//i * 60 + j + 1;
	}

	//a[1][1] = 71;

	// [
	// 	[  71, 190, 190,  72 ],
	// 	[ 371, 130, 130, 372 ],
	// 	[  71, 130, 130,  72 ],
	// 	[ 371, 250, 250, 372 ],
	// ]


	var viewport = $(window);
	var canvas = $('canvas')[0];
	var fps = $('.fps')[0];
	viewport.on('resize', function() {
		canvas.width = viewport.width();
		canvas.height = viewport.height();
	});
	viewport.trigger('resize');

	var map = new Background(16, a, new Sprite('terrain.png', 16, 16, 1).crop(1, 1));
	var game = new Game(canvas);
	var player = game.spawn(Player, 100, 0);

	player.friction.set(0.1, 0.1);
	player.accel.y = 0.05;
	player.tile = new Sprite('hero.png', 16, 32).crop(8, 24, 48, 96)
	player.addAnimation('stop-down', 1, [ 2 ]);
	player.addAnimation('stop-up', 1,   [ 5 ]);
	player.addAnimation('stop-left', 1, [ 8 ]);
	player.addAnimation('stop-right', 1, [ -8 ]);
	player.addAnimation('walk-down', 0.1, [ 1, 2, 3 ]);
	player.addAnimation('walk-up', 0.1,   [ 4, 5, 6 ]);
	player.addAnimation('walk-left', 0.1, [ 7, 8, 9 ]);
	player.addAnimation('walk-right', 0.1, [ -7, -8, -9 ]);

	game.addMap(map);
	game.start();

	setTimeout(function() { player.accel.y = 0 }, 1000);
	setInterval(function() { fps.innerHTML = Math.round(game.fps) + 'fps' }, 300);

	window.game = game;
	window.player = player;
});
