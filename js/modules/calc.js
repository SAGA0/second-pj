function calc() {
	const result = document.querySelector('.calculating__result span')
	let sex, weight, height, age, ratio

	if (localStorage.getItem('sex')) {
		sex = localStorage.getItem('sex')
	} else sex = 'female'

	if (localStorage.getItem('ratio')) {
		ratio = localStorage.getItem('ratio')
	} else ratio = 1.375

	function calcTotal() {
		if (!sex || !weight || !height || !age || !ratio) {
			result.textContent = '____'
			return
		}

		if (sex === 'female') {
			result.textContent = Math.round(
				(447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio,
			)
		}

		if (sex === 'male') {
			result.textContent = Math.round(
				(88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio,
			)
		}
	}
	calcTotal()

	function checkLocal(selector, activeClass) {
		const elements = document.querySelectorAll(selector)

		elements.forEach((elem) => {
			elem.classList.remove(activeClass)

			if (elem.getAttribute('id') === localStorage.getItem('sex')) {
				elem.classList.add(activeClass)
			}

			if (
				elem.getAttribute('data-ratio') ===
				localStorage.getItem('ratio')
			) {
				elem.classList.add(activeClass)
			}
		})
	}

	checkLocal('#gender div', 'calculating__choose-item_active')
	checkLocal(
		'.calculating__choose_big div',
		'calculating__choose-item_active',
	)

	function getStaticInfo(parentSelector, activeClass) {
		const elements = document.querySelectorAll(`${parentSelector} div`)

		elements.forEach((elem) => {
			elem.addEventListener('click', (e) => {
				if (e.target.getAttribute('data-ratio')) {
					ratio = +e.target.getAttribute('data-ratio')
					localStorage.setItem('ratio', ratio)
				} else {
					sex = e.target.getAttribute('id')
					localStorage.setItem('sex', sex)
				}

				elements.forEach((elem) => {
					elem.classList.remove(activeClass)
				})

				e.target.classList.add(activeClass)

				calcTotal()
			})
		})
	}

	getStaticInfo('#gender', 'calculating__choose-item_active')
	getStaticInfo('.calculating__choose_big', 'calculating__choose-item_active')

	function getDynamicInfo(selector) {
		const input = document.querySelector(selector)

		input.addEventListener('input', () => {
			if (input.value.match(/\D/g)) {
				input.style.border = '2px solid red'
			} else {
				input.style.border = 'none'
			}

			switch (input.getAttribute('id')) {
				case 'weight':
					weight = +input.value
					break
				case 'height':
					height = +input.value
					break
				case 'age':
					age = +input.value
					break
			}
			calcTotal()
		})
	}

	getDynamicInfo('#weight')
	getDynamicInfo('#height')
	getDynamicInfo('#age')
}

export default calc
