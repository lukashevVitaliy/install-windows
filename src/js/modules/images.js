const images = () => {
	const imgPopup = document.createElement('div'),
			workSection = document.querySelector('.works'),
			bigImage = document.createElement('img');

	imgPopup.classList.add('popup_img');
	workSection.appendChild(imgPopup);
	// стили для модального окна
	imgPopup.style.justifyContent = 'center';
	imgPopup.style.alignItems = 'center';
	imgPopup.style.display = 'none';

	imgPopup.appendChild(bigImage);

	workSection.addEventListener('click', (e) => {
		e.preventDefault();

		let target = e.target;

		if (target && target.classList.contains('preview')) {
			imgPopup.style.display = 'flex';
			document.body.style.overflow = 'hidden';
			bigImage.style.maxWidth = '70%';
			bigImage.style.maxHeight = '60%';
			bigImage.style.borderRadius = '5px';
			const path = target.parentNode.getAttribute('href');
			bigImage.setAttribute('src', path);
		}

		if (target && target.matches('div.popup_img')) {
			imgPopup.style.display = 'none';
			document.body.style.overflow = '';
		}
	});

};

export default images;