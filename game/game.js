define(function(require) {

	var Base = require('core/base');
	var Image = require('asset/image');
	var mainLoader = require('tools/loader').instance;

	var requestAnimFrame =
		window.requestAnimationFrame       ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame    ||
		function(callback) { window.setTimeout(callback, 1000 / 60) };

	var i = 0;

	var Game = Base.extend({

		init: function(canvas) {
			this.running = false;
			this.entities = [];
			this.maps = [];
			this.canvas = canvas;
			this._needSort = false;
			this._run = this._run.bind(this);
		},

		spawn: function(Constructor, x, y) {
			this._needSort = true;
			var entity = new Constructor();
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
			var scale = 1;
			var ctx = this.canvas.getContext('2d');

			if (this._needSort) {
				this.entities = this.entities;//.sort(function())
				this._needSort = false;
			}

			this.maps.forEach(function(map) {
				map.draw(ctx, scale, 0, 0)
			});

			this.entities.forEach(function(entity) {
				entity.step();
				entity.draw(ctx, scale);
			});
		},

		_run: function() {
			if (this.running)
				requestAnimFrame(this._run);

			this.canvas.width = this.canvas.width;
			this.step();
		}

	});

	return Game;

});
