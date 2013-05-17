define(function(require) {
	'use strict';

	var Base = require('core/base');
	var Vector = require('core/vector');
	var Input = require('tools/input');
	var mainLoader = require('tools/loader').instance;

	var requestAnimFrame =
		window.requestAnimationFrame       ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame    ||
		function(callback) { window.setTimeout(callback, 1000 / 60) };

	//requestAnimFrame = function(callback) { window.setTimeout(callback, 1000 / 3) };

	var defCollisions = {
		trace: function(_x, _y, _width, _height, x, y) {
			return { pos: Vector(x, y) };
		}
	};

	var Game = Base.extend({

		init: function(canvas) {
			this.iteration = 0;
			this.running = false;
			this.input = new Input();
			this.entities = [];
			this.maps = [];
			this.collisions = defCollisions;
			this.canvas = canvas;
			this._needSort = false;
			this._run = this._run.bind(this);
		},

		spawn: function(Constructor, x, y) {
			this._needSort = true;
			var entity = new Constructor(this.input);
			entity.pos.x = x;
			entity.pos.y = y;
			this.entities.push(entity);
			return entity;
		},

		addMap: function(map) {
			this.maps.push(map);
		},

		start: function() {
			this.running = true;

			if (mainLoader.loaded)
				this._run();
			else
				mainLoader.onLoad(this._run);
		},

		stop: function() {
			this.running = false;
		},

		step: function() {
			var ctx = this.canvas.getContext('2d');
			this.iteration++;

			if (this.iteration === 1)
				console.profile();
			if (this.iteration === 600)
				console.profileEnd();

			if (this._needSort) {
				this.entities = this.entities;//.sort(function())
				this._needSort = false;
			}

			ctx.scale(2, 2);

			this.maps.forEach(function(map) {
				map.draw(ctx);
			});


			this.entities.forEach(function(entity) {
				entity.step(this.collisions);
				entity.draw(ctx);
			}, this);
		},

		_run: function() {
			if (this.running)
				requestAnimFrame(this._run);

			var now = Date.now();
			var frameDiff = now - this._lastFrame;
			this.fps = 1000 / frameDiff;
			this._lastFrame = now;

			this.canvas.width = this.canvas.width;
			this.step();

			if (this.a) this.a();
		}

	});

	return Game;

});
