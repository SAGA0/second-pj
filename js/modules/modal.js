function closeModal(modalSelector) {
	modal = document.querySelector(modalSelector)
	modal.classList.add('hide')
	modal.classList.remove('show')
	document.body.style.overflow = ''
}

function openModal(modalSelector, modalTimerId) {
	modal = document.querySelector(modalSelector)
	modal.classList.add('show')
	modal.classList.remove('hide')
	document.body.style.overflow = 'hidden'
	if (modalTimerId) {
		clearInterval(modalTimerId)
	}
}

function modal(trigger, modalSelector, modalTimerId) {
	const modalTrigger = document.querySelectorAll(trigger),
		modal = document.querySelector(modalSelector)

	modalTrigger.forEach((btn) => {
		btn.addEventListener('click', () =>
			openModal(modalSelector, modalTimerId),
		)
	})

	modal.addEventListener('click', (e) => {
		if (e.target === modal || e.target.getAttribute('data-close') == '') {
			closeModal(modalSelector)
		}
	})

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal(modalSelector)
		}
	})
}

export default modal
export { closeModal, openModal }
