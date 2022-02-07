function tabs({ tabItem, tabMain, tabItems, activeClass }) {
	const tabs = document.querySelectorAll(tabItem),
		tabsContent = document.querySelectorAll(tabMain),
		tabsParent = document.querySelector(tabItems)

	function hideTabContent() {
		tabsContent.forEach((item) => {
			item.classList.add('hide')
			item.classList.remove('show')
		})

		tabs.forEach((item) => {
			item.classList.remove(activeClass)
		})
	}

	function showTabContent(i = 0) {
		tabsContent[i].classList.add('show')
		tabsContent[i].classList.add('fade')
		tabsContent[i].classList.remove('hide')
		tabs[i].classList.add(activeClass)
	}

	hideTabContent()
	showTabContent()

	tabsParent.addEventListener('click', (event) => {
		const target = event.target

		if (target && target.classList.contains(tabItem.slice(1))) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabContent()
					showTabContent(i)
				}
			})
		}
	})
}

export default tabs
