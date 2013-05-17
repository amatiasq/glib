define(function(require) {

	var Vector = require('core/vector');
	var Map = require('game/map');

	function getX(item) { return item.x };
	function getY(item) { return item.y };
	function dispose(item) { item.dispose() };

	return Map.extend({
		fits: function(fromX, fromY, toX, toY, width, height) {
			this.getTile(fromX, fromY)
		},

		trace: function(fromX, fromY, width, height, destX, destY) {
			var areaX = Math.min(fromX, destX);
			var areaY = Math.min(fromY, destY);
			var areaEndX = Math.max(fromX, destX) + width;
			var areaEndY = Math.max(fromY, destY) + height;
			var tileStartX = Math.floor(areaX / this.tilesize);
			var tileStartY = Math.floor(areaY / this.tilesize);
			var tileEndX = Math.ceil(areaEndX / this.tilesize);
			var tileEndY = Math.ceil(areaEndY / this.tilesize);

			var tiles = [];
			var result = {
				pos: Vector(destX, destY),
				collisionX: false,
				collisionY: false
			};

			for (var i = tilesStartY; i <= tileEndY; i++)
				for (var j = tileStartX; j <= tileEndX; j++)
					if (this.data[i][j])
						tiles.push(Vector(i, j));

			if (!tiles.length)
				return result;

			if (fromX === destX) {
				result.collisionY = true;
				result.pos.y = fromY < destY ?
					Math.min.apply(null, tiles.map(getY)) - height :
					Math.max.apply(null, tiles.map(getY)) + this.tilesize;

				tiles.forEach(dispose);
				return result;
			}

			if (fromY === destY) {
				result.collisionX = true;
				result.pos.x = fromX < destX ?
					Math.min.apply(null, tiles.map(getX)) - width :
					Math.max.apply(null, tiles.map(getX)) + this.tilesize;

				tiles.forEach(dispose);
				return result;
			}
		}
	});
});


























/*

1 1 1 1 1 1 1 1 1
1 0 0 0 0 0 0 0 1
1 0 0 0 0 0 0 0 1
1 0 0 1 1 1 0 0 1
1 0 0 1 0 1 0 0 1
1 0 0 1 1 1 0 0 1
1 0 0 0 0 0 0 0 1
1 0 0 0 0 0 0 0 1
1 1 1 1 1 1 1 1 1

*/
