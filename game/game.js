define(function(require) {

	var Base = require('core/base');
	var mainLoader = require('tools/loader').instance;

	var requestAnimFrame =
		window.requestAnimationFrame       ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame    ||
		function(callback) { window.setTimeout(callback, 1000 / 60) };

	var Game = Base.extend({

		init: function(canvas) {
			this.running = false;
			this.entities = [];
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

			if (this._needSort) {
				this.entities = this.entities;//.sort(function())
				this._needSort = false;
			}

			this.entities.forEach(function(entity) {
				entity.step();
				entity.draw(ctx);
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
