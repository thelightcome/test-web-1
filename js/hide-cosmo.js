const fixedBlock = document.querySelector('.why__cosmo'),
			filters = document.querySelector('.why__cosmo-wrapper'),
			//gutter = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--gutter')),
			container = document.querySelector('.why__section'),
			//offsetLeft = container.offsetLeft + gutter,
			filtersOffsetTop = container.offsetTop,
            filtersWidth = fixedBlock.offsetWidth;
			smallOffset = 44;
const fixedScrollBlock = () => {
	let scrollDistance = window.scrollY;

	if (scrollDistance > (filtersOffsetTop + smallOffset) && scrollDistance <= (container.offsetHeight + filtersOffsetTop)) {
		fixedBlock.classList.remove('absolute');
		fixedBlock.classList.add('fixed');
        fixedBlock.style.width = `${filtersWidth}px`;
	} else {
		fixedBlock.classList.remove('fixed');
	}
	if (scrollDistance - 44 >= filtersOffsetTop + filters.offsetHeight - fixedBlock.offsetHeight) {
		fixedBlock.classList.add('absolute');
		//fixedBlock.style.width = `100%`;
		fixedBlock.classList.remove('fixed');
	}
};

window.addEventListener('scroll', fixedScrollBlock);