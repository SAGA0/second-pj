'use strict'

import calc from './modules/calc'
import cards from './modules/cards'
import forms from './modules/forms'
import modal from './modules/modal'
import slides from './modules/slides'
import tabs from './modules/tabs'
import timer from './modules/timer'
import { openModal } from './modules/modal'

window.addEventListener('DOMContentLoaded', () => {
	const modalTimerId = setTimeout(
		() => openModal(modalSelector, modalTimerId),
		300000,
	)
	calc()
	cards()
	forms(modalTimerId)
	modal('[data-modal]', '.modal', modalTimerId)
	slides({
		container: '.offer__slider',
		slide: '.offer__slide',
		prevButton: '.offer__slider-prev',
		nextButton: '.offer__slider-next',
		totalCounter: '#total',
		currentCounter: '#current',
		wrapper: '.offer__slider-wrapper',
		field: '.offer__slider-inner',
	})
	tabs({
		tabItem: '.tabheader__item',
		tabMain: '.tabcontent',
		tabItems: '.tabheader__items',
		activeClass: 'tabheader__item_active',
	})
	timer('.timer', '2022-02-25')
})
