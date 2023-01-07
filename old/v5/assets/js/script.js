function init() {
	var isShow = false;
	var lastCheck;

	window.onFocus = function(e) {
		e.target.parentElement.classList.add('focus');
	}

	window.onBlur = function(e) {
		e.target.parentElement.classList.remove('focus');
	}

	window.goTo = function(id) {
		window.scrollTo(0, document.querySelector('#' + id).offsetTop - 50);
	}

	function updateHeaderNavClass() {
		document.querySelector('header nav .active').classList.remove('active');

		if (window.pageYOffset < 500) {
			document.querySelector('header li[data-id="aboutme"]').classList.add('active');
		} else if (window.pageYOffset < 2500) {
			document.querySelector('header li[data-id="talks"]').classList.add('active');
		} else if (window.pageYOffset < 3200) {
			document.querySelector('header li[data-id="projects"]').classList.add('active');
		} else if (window.pageYOffset < 7050) {
			document.querySelector('header li[data-id="timeline"]').classList.add('active');
		} else {
			document.querySelector('header li[data-id="contact"]').classList.add('active');
		}
	}

	function formSubmit(e) {
		e.preventDefault();

		var submitRequest = new XMLHttpRequest();
		var formElement = document.querySelector('form');
		var respElement = document.createElement('div');
		var formData = new FormData();

		formData.append('name', formElement.elements.name.value);
		formData.append('email', formElement.elements.email.value);
		formData.append('subject', formElement.elements.subject.value);
		formData.append('message', formElement.elements.message.value);

		submitRequest.open('POST', 'https://guilhermefarias.com.br/mail-contact');
		submitRequest.onreadystatechange = function(){
			if (submitRequest.readyState === 4 && submitRequest.status === 200 && submitRequest.responseText === 'OK'){
				respElement.setAttribute('class','resp');
				respElement.innerHTML = 'Mensagem enviada com sucesso!'; // Message sent successfully!
				formElement.appendChild(respElement);
				formElement.elements.name.value = '';
				formElement.elements.email.value = '';
				formElement.elements.subject.value = '';
				formElement.elements.message.value = '';
				setTimeout(function(){
					formElement.removeChild(respElement);
				},5000);
			} else if(submitRequest.readyState === 4){
				respElement.setAttribute('class','resp error');
				respElement.innerHTML = 'Houve um erro ao enviar a mensagem'; // There was an error sending the message
				formElement.appendChild(respElement);
				setTimeout(function(){
					formElement.removeChild(respElement);
				},5000);
			}
		};

		submitRequest.send(formData);
	};

	document.querySelector('.contact-form').addEventListener('submit', formSubmit);

	setInterval(function() {
		if (window.pageYOffset === lastCheck) {
			return;
		}

		lastCheck = window.pageYOffset;
		updateHeaderNavClass();

		if (window.pageYOffset && isShow) {
			return;
		}

		if (!window.pageYOffset && !isShow) {
			return;
		}

		if (window.pageYOffset && !isShow) {
			isShow = true;
			document.querySelector('header').classList.add('show');
			return;
		}

		if (!window.pageYOffset && isShow) {
			isShow = false;
			document.querySelector('header').classList.remove('show');
			return;
		}
	}, 200);
}

init();
