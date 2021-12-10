'use strict'
// Tabs
window.addEventListener('DOMContentLoaded', () => {
	const tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items')

	function hideTabContent() {
		tabsContent.forEach((item) => {
			item.classList.add('hide')
			item.classList.remove('show')
		})

		tabs.forEach((item) => {
			item.classList.remove('tabheader__item_active')
		})
	}

	function showTabContent(i = 0) {
		tabsContent[i].classList.add('show')
		tabsContent[i].classList.add('fade')
		tabsContent[i].classList.remove('hide')
		tabs[i].classList.add('tabheader__item_active')
	}

	hideTabContent()
	showTabContent()

	tabsParent.addEventListener('click', (event) => {
		const target = event.target

		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabContent()
					showTabContent(i)
				}
			})
		}
	})

	// Timer

	const deadline = '2021-12-23'

	function getTimeRemaining(endtime) {
		const t = Date.parse(endtime) - Date.parse(new Date()),
			days = Math.floor(t / (1000 * 60 * 60 * 24)),
			seconds = Math.floor((t / 1000) % 60),
			minutes = Math.floor((t / 1000 / 60) % 60),
			hours = Math.floor((t / (1000 * 60 * 60)) % 24)

		return {
			total: t,
			days: days,
			hours: hours,
			minutes: minutes,
			seconds: seconds,
		}
	}

	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `${0}` + num
		} else return num
	}

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000)

		updateClock()

		function updateClock() {
			const t = getTimeRemaining(endtime)

			days.innerHTML = getZero(t.days)
			hours.innerHTML = getZero(t.hours)
			minutes.innerHTML = getZero(t.minutes)
			seconds.innerHTML = getZero(t.seconds)

			if (t.total <= 0) {
				clearInterval(timeInterval)
			}
		}
	}

	setClock('.timer', deadline)

	//Modal

	const modalTrigger = document.querySelectorAll('[data-modal]'),
		modalCloser = document.querySelector('[data-close]'),
		modal = document.querySelector('.modal')

	function showModal() {
		modal.classList.add('show')
		modal.classList.remove('hide')
		clearInterval(modalTimer)
	}

	function hideModal() {
		modal.classList.add('hide')
		modal.classList.remove('show')
	}

	modalTrigger.forEach((item) => {
		item.addEventListener('click', () => {
			showModal()
		})
	})
	modalCloser.addEventListener('click', () => {
		hideModal()
	})

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape') {
			hideModal()
		}
	})

	//const modalTimer = setTimeout(showModal, 10000)

	function showModalByScroll() {
		if (
			window.pageYOffset + document.documentElement.clientHeight >=
			document.documentElement.scrollHeight
		) {
			showModal()
			window.removeEventListener('scroll', showModalByScroll)
		}
	}
	window.addEventListener('scroll', showModalByScroll)

	// Классы конструкторы

	class MenuCard {
		constructor(
			src,
			alt,
			tittle,
			descr,
			price,
			parentSelector,
			...classes
		) {
			this.src = src
			this.alt = alt
			this.tittle = tittle
			this.descr = descr
			this.price = price
			this.classes = classes
			this.parent = document.querySelector(parentSelector)
			this.transfer = 27
			this.changeToUAH()
		}

		changeToUAH() {
			this.price = this.price * this.transfer
		}

		render() {
			const element = document.createElement('div')
			if (this.classes.length === 0) {
				this.classes = 'menu__item'
				element.classList.add(this.classes)
			} else {
				this.classes.forEach((className) =>
					element.classList.add(className),
				)
			}
			element.innerHTML = `
            <img src=${this.src} alt=${this.alt} />
            <h3 class="menu__item-subtitle">${this.tittle}</h3>
            <div class="menu__item-descr">
                ${this.descr}
            </div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total">
                    <span>${this.price}</span> грн/день
                </div>
            </div>`
			this.parent.append(element)
		}
	}

	new MenuCard(
		'img/tabs/vegy.jpg',
		'vegy',
		'Меню "Фитнес"',
		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
		5,
		'.menu .container',
	).render()

	new MenuCard(
		'img/tabs/post.jpg',
		'post',
		'Меню "Постное"',
		'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
		14,
		'.menu .container',
	).render()

	new MenuCard(
		'img/tabs/elite.jpg',
		'elite',
		'Меню “Премиум”',
		'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
		21,
		'.menu .container',
	).render()

	// функция конструктор
	// function Auto(brand, litrs) {
	// 	;(this.brand = brand),
	// 		(this.litrs = litrs),
	// 		(this.auto = true),
	// 		(this.cubs = function () {
	// 			console.log(`У ${this.brand} объем двигателя ${this.litrs}`)
	// 		})
	// }

	// const Bmw = new Auto('BMW', 2.8)
	// const Audi = new Auto('AUDI', 2.4)

	// console.log(Bmw)
	// console.log(Audi)

	// Auto.prototype.Power = function () {
	// 	console.log(`${this.brand} мощнее чем Тойота`)
	// }

	// Bmw.Power()
	// Audi.cubs()

	// Forms

	const forms = document.querySelectorAll('form')

	const message = {
		loading: 'Загрузка',
		success: 'Спасибо! Мы вам перезвоним',
		failure: 'Что-то не так...',
	}

	forms.forEach((item) => {
		postData(item)
	})

	function postData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault()

			const statusMessage = document.createElement('div')
			statusMessage.classList.add('status')
			statusMessage.textContent = message.loading
			form.append(statusMessage)

			const request = new XMLHttpRequest()
			request.open('POST', 'server.php')

			// request.setRequestHeader('Content-type', 'application/json')
			const formData = new FormData(form)

			const object = {}
			formData.forEach(function (value, key) {
				object[key] = value
			})

			const json = JSON.stringify(object)

			request.send(json)

			request.addEventListener('load', () => {
				if (request.status === 200) {
					console.log(request.response)
					statusMessage.textContent = message.success
					form.reset()
					setTimeout(() => {
						statusMessage.remove()
					}, 2000)
				} else {
					statusMessage.textContent = message.failure
				}
			})
		})
	}
})
