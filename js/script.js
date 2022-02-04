'use strict'
window.addEventListener('DOMContentLoaded', () => {
	const calc = require('./modules/calc'),
		cards = require('./modules/cards'),
		forms = require('./modules/forms'),
		modal = require('./modules/modal'),
		slides = require('./modules/slides'),
		tabs = require('./modules/tabs'),
		timer = require('./modules/timer')

	calc(), cards(), forms(), modal(), slides(), tabs(), timer()
})
