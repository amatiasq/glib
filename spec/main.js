requirejs.config({ baseUrl: '../' })([

	'test/game/entity.spec',

], function() {
	mocha.run();
});
