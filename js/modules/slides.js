function slides() {
	let slideIndex = 1
	let offset = 0
	const dots = []

	const slides = document.querySelectorAll('.offer__slide'),
		slider = document.querySelector('.offer__slider'),
		prev = document.querySelector('.offer__slider-prev'),
		next = document.querySelector('.offer__slider-next'),
		curr = document.querySelector('#current'),
		total = document.querySelector('#total'),
		slidesWrapper = document.querySelector('.offer__slider-wrapper'),
		width = window.getComputedStyle(slidesWrapper).width,
		slidesField = document.querySelector('.offer__slider-inner')

	slidesField.style.width = 100 * slides.length + '%'
	slidesField.style.display = 'flex'
	slidesField.style.transition = '0.8s all'

	slidesWrapper.style.overflow = 'hidden'

	total.innerHTML = getZero(`${slides.length}`)
	curr.innerHTML = getZero(`${slideIndex}`)

	slides.forEach((slide) => {
		slide.style.width = width
	})

	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `${0}` + num
		} else return num
	}

	function changeDotStyle() {
		dots.forEach((dot) => (dot.style.opacity = '.5'))
		dots[slideIndex - 1].style.opacity = 1
	}

	function moveSlade(wth) {
		return +wth.replace(/\D/g, '')
	}

	slider.style.position = 'relative'

	const indicators = document.createElement('ol')
	indicators.classList.add('carousel-indicators')
	indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
    `
	slider.append(indicators)

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement('li')
		dot.setAttribute('date-slide-to', i + 1)
		dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
        `
		if (i == 0) {
			dot.style.opacity = 1
		}
		indicators.append(dot)
		dots.push(dot)
	}

	next.addEventListener('click', () => {
		if (offset == moveSlade(width) * (slides.length - 1)) {
			offset = 0
		} else {
			offset += moveSlade(width)
		}

		slidesField.style.transform = `translateX(-${offset}px)`

		if (slideIndex == slides.length) {
			slideIndex = 1
		} else {
			slideIndex++
		}

		curr.innerHTML = getZero(`${slideIndex}`)

		changeDotStyle()
	})

	prev.addEventListener('click', () => {
		if (offset == 0) {
			offset = moveSlade(width) * (slides.length - 1)
		} else {
			offset -= moveSlade(width)
		}

		slidesField.style.transform = `translateX(-${offset}px)`

		if (slideIndex == 1) {
			slideIndex = slides.length
		} else {
			slideIndex--
		}

		curr.innerHTML = getZero(`${slideIndex}`)

		changeDotStyle()
	})

	dots.forEach((dot) => {
		dot.addEventListener('click', (e) => {
			const slideTo = e.target.getAttribute('date-slide-to')

			slideIndex = slideTo
			offset = +width.replace(/\D/g, '') * (slideTo - 1)
			slidesField.style.transform = `translateX(-${offset}px)`

			total.innerHTML = getZero(`${slides.length}`)
			curr.innerHTML = getZero(`${slideIndex}`)

			changeDotStyle()
		})
	})
}

module.exports = slides
