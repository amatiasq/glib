define(function(require) {
	'use strict';

	var Sprite = require('asset/sprite');
	var Game = require('game/game');
	var Player = require('test/player');
	var Background = require('game/background_map');
	var Collisions = require('game/collision_map');

	var a = [ ];
	for (var i = 0; i < 22; i++) {
		a[i] = [];
		for (var j = 0; j < 60; j++)
			a[i][j] = 130;//i * 60 + j + 1;
	}

	var mapTiles = [
		[ 605, 605, 605, 605, 605, 605, 605, 605, 605],
		[ 546, 548, 548, 548, 548, 548, 548, 548, 550],
		[ 606, 608, 608, 608, 608, 608, 608, 608, 610],
		[ 606, 608, 608, 482, 490, 491, 608, 608, 610],
		[ 606, 608, 608, 542, 605, 551, 608, 608, 610],
		[ 606, 608, 608, 542, 605, 551, 608, 608, 610],
		[ 606, 608, 608, 548, 548, 548, 608, 608, 610],
		[ 606, 608, 608, 608, 608, 608, 608, 608, 610],
		[ 666, 667, 667, 667, 667, 667, 667, 667, 670]
	];

	var data = mapTiles.map(function(row) {
		return row.map(function(value) {
			return value === 608 || value === 548 ? 0 : 1;
		});
	});

	var viewport = $(window);
	var canvas = $('canvas')[0];
	var fps = $('.fps')[0];
	viewport.on('resize', function() {
		canvas.width = viewport.width();
		canvas.height = viewport.height();
	});
	viewport.trigger('resize');

	var map = new Background(16, mapTiles, new Sprite('terrain.png', 16, 16, 1).crop(1, 1));
	var game = new Game(canvas);
	var player = game.spawn(Player, 100, 16);

	player.friction.set(0.1, 0.1);
	player.accel.y = 0.05;
	player.tile = new Sprite('hero.png', 16, 20, 0, 12).crop(8, 36, 48, 84);
	player.addAnimation('stop-down', 1, [ 2 ]);
	player.addAnimation('stop-up', 1,   [ 5 ]);
	player.addAnimation('stop-left', 1, [ 8 ]);
	player.addAnimation('stop-right', 1, [ -8 ]);
	player.addAnimation('walk-down', 0.1, [ 1, 2, 3 ]);
	player.addAnimation('walk-up', 0.1,   [ 4, 5, 6 ]);
	player.addAnimation('walk-left', 0.1, [ 7, 8, 9 ]);
	player.addAnimation('walk-right', 0.1, [ -7, -8, -9 ]);

	player.color = 'red';
	game.collisions = new Collisions(16, data);

	window.context = game.canvas.getContext('2d');
	window.game = game;
	window.player = player;

	game.addMap(map);
	game.start();

	setTimeout(function() { player.accel.y = 0 }, 1000);
	setInterval(function() { fps.innerHTML = Math.round(game.fps) + 'fps' }, 300);

});
