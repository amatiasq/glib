define(function(require) {
	'use strict';

	var Vector = require('core/vector');
	var Map = require('game/map');

	function getX(item) { return item.x }
	function getY(item) { return item.y }
	function dispose(item) { item.dispose() }

	return Map.extend({
		fits: function(fromX, fromY) { //, toX, toY, width, height) {
			this.getTile(fromX, fromY);
		},

		trace: function(fromX, fromY, width, height, destX, destY) {

			var areaX = Math.min(fromX, destX);
			var areaY = Math.min(fromY, destY);
			var areaEndX = Math.max(fromX, destX) + width;
			var areaEndY = Math.max(fromY, destY) + height;
			var tileStartX = Math.max(Math.floor(areaX / this.tilesize), 0);
			var tileStartY = Math.max(Math.floor(areaY / this.tilesize), 0);
			var tileEndX = Math.min(Math.floor(areaEndX / this.tilesize), this.width);
			var tileEndY = Math.min(Math.floor(areaEndY / this.tilesize), this.height);

			var tiles = [];
			var result = {
				pos: Vector(destX, destY),
				collisionX: false,
				collisionY: false
			};

			for (var i = tileStartY; i <= tileEndY; i++)
				for (var j = tileStartX; j <= tileEndX; j++)
					if (this.data[i][j])
						tiles.push(Vector(j, i));

			if (!tiles.length)
				return result;

			if (fromX === destX) {
				result.collisionY = true;
				result.pos.y = fromY < destY ?
					Math.min.apply(null, tiles.map(getY)) * this.tilesize - height - 0.1:
					Math.max.apply(null, tiles.map(getY)) * this.tilesize + this.tilesize;

				tiles.forEach(dispose);
				return result;
			}

			if (fromY === destY) {
				result.collisionX = true;
				result.pos.x = fromX < destX ?
					Math.min.apply(null, tiles.map(getX)) * this.tilesize - width - 0.1:
					Math.max.apply(null, tiles.map(getX)) * this.tilesize + this.tilesize;

				tiles.forEach(dispose);
				return result;
			}

			console.log('Diagonal movement detection not implemented!');
			result.pos.set(fromX, fromY);
			return result;
		}
	});
});
