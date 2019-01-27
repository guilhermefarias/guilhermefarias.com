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
		} else if (window.pageYOffset < 3100) {
			document.querySelector('header li[data-id="projects"]').classList.add('active');
		} else if (window.pageYOffset < 4800) {
			document.querySelector('header li[data-id="timeline"]').classList.add('active');
		} else if (window.pageYOffset < 6000) {
			document.querySelector('header li[data-id="contact"]').classList.add('active');
		}
	}

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
