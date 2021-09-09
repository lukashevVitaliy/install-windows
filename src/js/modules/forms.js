import checkNumInputs from './checkNumInputs';

const forms = (state) => {
	const form = document.querySelectorAll('form'),
		inputs = document.querySelectorAll('input'),
		windows = document.querySelectorAll('[data-modal]');

	checkNumInputs('input[name="user_phone"]');

	const message = {
		loading: 'Загрузка...',
		success: 'Спасибо! Скоро мы с вами свяжемся',
		failure: 'Что-то пошло не так :('
	};

	//3 формирование запроса Fetch
	const postData = async (url, data) => {
		//4 - сообщение о загрузке
		document.querySelector('.status').textContent = message.loading;
		//5 настройка запроса
		let res = await fetch(url, {
			method: 'POST',
			body: data
		});

		return await res.text();
	};
	//9 очистка input
	const clearInputs = () => {
		inputs.forEach(item => {
			item.value = '';
		});
	};
	const clearState = () => {
		for (let key in state) {
			delete state[key];
		}
	};
	//0
	form.forEach(item => {
		item.addEventListener('submit', (e) => {
			e.preventDefault();
			//1 создаем блок с сообщением
			let statusMessage = document.createElement('div');
			statusMessage.classList.add('status');
			item.appendChild(statusMessage);
			//2 собираем все данные с формы
			const formData = new FormData(item);
			// 2.1 отправка данных расчета замеров
			if (item.getAttribute('data-calc') === 'end') {
				for (let key in state) {
					formData.append(key, state[key]);
				}
				clearState();
			}
			//6 отправка на сервер
			postData('assets/server.php', formData)
				.then(res => {
					console.log(res);
					//7 уведомление пользователя
					statusMessage.textContent = message.success;
				})
				//8
				.catch(() => statusMessage.textContent = message.failure)
				//10
				.finally(() => {
					clearInputs();
					setTimeout(() => {
						statusMessage.remove();
						windows.forEach(item => {
							item.style.display = 'none';
						});
						document.body.style.overflow = '';
						console.log(state);
					}, 3000);
				});
		});
	});
};

export default forms;