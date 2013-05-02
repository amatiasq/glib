define(function(require) {

	var Base = require('core/base');

	var Input = Base.extend({

		init: function(element) {
			this.$el = element || document.body;
		},

		bind: function(event, signal) {

		}
	});

	function mouse() {

	}

	function key(num) {
		return function(event) {
			if (event.w)
		};
	}

	Input.KEY = {
		MOUSE1: mouse('MOUSE1')
		MOUSE2: mouse('MOUSE2')
		MWHEEL_UP: mouse('MWHEEL_UP')
		MWHEEL_DOWN: mouse('MWHEEL_DOWN')

		BACKSPACE: key('BACKSPACE')
		TAB: key('TAB')
		ENTER: key('ENTER')
		PAUSE: key('PAUSE')
		CAPS: key('CAPS')
		ESC: key('ESC')
		SPACE: key('SPACE')
		PAGE_UP: key('PAGE_UP')
		PAGE_DOWN: key('PAGE_DOWN')
		END: key('END')
		HOME: key('HOME')
		LEFT_ARROW: key('LEFT_ARROW')
		UP_ARROW: key('UP_ARROW')
		RIGHT_ARROW: key('RIGHT_ARROW')
		DOWN_ARROW: key('DOWN_ARROW')
		INSERT: key('INSERT')
		DELETE: key('DELETE')
		_0: key('_0')
		_1: key('_1')
		_2: key('_2')
		_3: key('_3')
		_4: key('_4')
		_5: key('_5')
		_6: key('_6')
		_7: key('_7')
		_8: key('_8')
		_9: key('_9')
		A: key('A')
		B: key('B')
		C: key('C')
		D: key('D')
		E: key('E')
		F: key('F')
		G: key('G')
		H: key('H')
		I: key('I')
		J: key('J')
		K: key('K')
		L: key('L')
		M: key('M')
		N: key('N')
		O: key('O')
		P: key('P')
		Q: key('Q')
		R: key('R')
		S: key('S')
		T: key('T')
		U: key('U')
		V: key('V')
		W: key('W')
		X: key('X')
		Y: key('Y')
		Z: key('Z')
		NUMPAD_0: key('NUMPAD_0')
		NUMPAD_1: key('NUMPAD_1')
		NUMPAD_2: key('NUMPAD_2')
		NUMPAD_3: key('NUMPAD_3')
		NUMPAD_4: key('NUMPAD_4')
		NUMPAD_5: key('NUMPAD_5')
		NUMPAD_6: key('NUMPAD_6')
		NUMPAD_7: key('NUMPAD_7')
		NUMPAD_8: key('NUMPAD_8')
		NUMPAD_9: key('NUMPAD_9')
		MULTIPLY: key('MULTIPLY')
		ADD: key('ADD')
		SUBSTRACT: key('SUBSTRACT')
		DECIMAL: key('DECIMAL')
		DIVIDE: key('DIVIDE')
		F1: key('F1')
		F2: key('F2')
		F3: key('F3')
		F4: key('F4')
		F5: key('F5')
		F6: key('F6')
		F7: key('F7')
		F8: key('F8')
		F9: key('F9')
		F10: key('F10')
		F11: key('F11')
		F12: key('F12')
		SHIFT: key('SHIFT')
		CTRL: key('CTRL')
		ALT: key('ALT')
		PLUS: key('PLUS')
		COMMA: key('COMMA')
		MINUS: key('MINUS')
		PERIOD: key('PERIOD')
	};

	return Input;

});
