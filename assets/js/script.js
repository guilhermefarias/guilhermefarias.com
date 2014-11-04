'use strict';

var Guilherme = {
	sidebar: document.querySelector('aside'),
	section: document.querySelector('section'),
	mobileMenu: document.querySelector('.menu-mobile'),

	setup: function(){
		if(Guilherme.isOldBrowser()){
			Guilherme.oldBrowser();
		} else {
			var hash;
			document.addEventListener('submit', Guilherme.formSubmit);
			Guilherme.sidebar.addEventListener('click', Guilherme.handleMenuClick);
			Guilherme.mobileMenu.addEventListener('click', Guilherme.handleMenuMobile);
			hash = window.location.hash;

			if(hash){
				hash = hash.replace('#','');
				Guilherme.showPage(hash);
			}
		}
	},

	isOldBrowser: function(){
		return typeof document.addEventListener !== 'function';
	},

	oldBrowser: function(){
		var alertElement = document.createElement('div');
		Guilherme.section.innerText = '';
		alertElement.setAttribute('class','resp error');
		alertElement.innerText = 'You are using a very old browser, please upgrade.';
		Guilherme.section.appendChild(alertElement);
	},

	handleMenuClick: function(e){
		var tab, element = e.target;

		if(element && element.nodeName === 'LI') {
			tab = element.getAttribute('data-tab');
			Guilherme.showPage(tab);
			Guilherme.sidebar.className = '';
		}
	},

	handleMenuMobile: function(){
		var sidebarClass = Guilherme.sidebar.className;
		Guilherme.sidebar.className = (sidebarClass) ? '' : 'active';
	},

	activeTab: function(sidebarItem){
		Guilherme.removeActiveClass();
		Guilherme.addActiveClass(sidebarItem);
	},

	removeActiveClass: function(){
		var sidebarActiveItem,
			sidebarActiveItemClass;

		sidebarActiveItem = Guilherme.sidebar.querySelector('.active');
		if(sidebarActiveItem){
			sidebarActiveItemClass = sidebarActiveItem.className;
			sidebarActiveItem.className = sidebarActiveItemClass.replace('active', '');
		}
	},

	addActiveClass: function(tab){
		var sidebarItem;

		sidebarItem = Guilherme.sidebar.querySelector('.tab-'+tab);
		if(sidebarItem){
			sidebarItem.className += ' active';
		}
	},

	formSubmit: function(e){
		e.preventDefault();

		var submitRequest = new XMLHttpRequest(),
			formElement = document.querySelector('form').elements,
			respElement = document.createElement('div'),
			formData = ''+
				'name=' + encodeURIComponent(formElement.name.value)+'&'+
				'email=' + encodeURIComponent(formElement.email.value)+'&'+
				'subject=' + encodeURIComponent(formElement.subject.value)+'&'+
				'message=' + encodeURIComponent(formElement.message.value);

		submitRequest.open('POST','http://guilhermefarias.com.br/mail',true);
		submitRequest.setRequestHeader('Content-type','application/x-www-form-urlencoded');
		submitRequest.onreadystatechange = function(){
			if (submitRequest.readyState === 4 && submitRequest.status === 200 && submitRequest.responseText === 'OK'){
				respElement.setAttribute('class','resp');
				respElement.innerHTML = 'Message sent successfully!';
				Guilherme.section.appendChild(respElement);
				formElement.name.value = '';
				formElement.email.value = '';
				formElement.subject.value = '';
				formElement.message.value = '';
				setTimeout(function(){
					Guilherme.section.removeChild(respElement);
				},5000);
			} else if(submitRequest.readyState === 4){
				respElement.setAttribute('class','resp error');
				respElement.innerHTML = 'There was an error sending the message';
				Guilherme.section.appendChild(respElement);
				setTimeout(function(){
					Guilherme.section.removeChild(respElement);
				},5000);
			}
		};

		submitRequest.send(formData);
	},

	showPage: function(tab){
		Guilherme.section.innerHTML = Guilherme.Pages[tab];
		Guilherme.activeTab(tab);
		window.location.hash = tab;
		window.scrollTo(0,0);
	},

	Pages : {
		home: ''+
			'<h1>Guilherme Farias</h1>'+
			'<h2 class="home-role">Full Stack Web Developer</h2>'+
			'<p class="home-legend">I am a 20 year old web developer who lives in Recife, works at MGR Tecnologia and love JavaScript.</p>',
		about: ''+
			'<h2>About me</h2>'+

			'<p class="about">Hi there!<br/>'+
			'I\'m Guilherme, a Brazilian web developer living in Recife.<br/> I work mostly with JavaScript, but I\'m also very enthusiastic about all related technologies that can be used to create web stuff and make my job more fun :)</p>'+
			'<p class="about">I have 20 year old, am near to finish the Information System Bachelor\'s Degree and although my focus is client-side engineering and mobile, I also have knowledge in PHP, NodeJS (server-side JavaScript), Java, MySQL and other technologies.</p>'+
			'<p class="about">I\'m a Front-End Engineer at <a href="http://mgrtech.com.br" target="_blank">MGR Tecnologia</a>, which developed a corporate social network, I am the creator of the blog <a href="http://guiky.com.br" target="_blank">Guiky</a> technology that I update since 2008. In 2012, I co-founded with two other partners, a Digital Agency called <a href="http://chamacomunicacao.com.br/" target="_blank">Chama Comunicação</a>.</p>'+
			'<p class="about"> Since 2012 until today, I am responsible for all work involving web technologies at Chama Comunicação, in this period I participated in many projects, most of them are websites. And in my spare time I am involved with several projects, that you can check navigating the menus :)</p>',

		talks: ''+
			'<h2>Talks</h2>'+

			'<div class="talks item">'+
				'<div class="item-img"><img src="assets/img/talks/09.jpg" /></div>'+
				'<div class="item-description">'+
					'<h3 class="item-title">Congresso de Software Livre do NE</h3>'+
					'<p><b>Talk:</b> Como participar de projetos Open Source no Github?</p>'+
					'<p><b>Where:</b> Faculdade dos Guararapes, Jaboatão dos Guararapes - PE</p>'+
					'<p><b>When:</b> 26/04/2014</p>'+
					'<p><a href="https://speakerdeck.com/guilhermefarias/como-participar-de-projetos-open-source-no-github" target="_blank">Click here to view the slides from this talk</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="talks item">'+
				'<div class="item-img"><img src="assets/img/talks/08.jpg" /></div>'+
				'<div class="item-description">'+
					'<h3 class="item-title">Alagoas Dev Day</h3>'+
					'<p><b>Talk:</b> Aplicações Web Isomórficas</p>'+
					'<p><b>Where::</b> Arte Pajuçara, Maceió - AL</p>'+
					'<p><b>When:</b> 12/04/2014</p>'+
					'<p><a href="https://speakerdeck.com/guilhermefarias/aplicacoes-web-isomorficas" target="_blank">Click here to view the slides from this talk</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="talks item">'+
				'<div class="item-img"><img src="assets/img/talks/07.jpg" /></div>'+
				'<div class="item-description">'+
					'<h3 class="item-title">Front In Recife</h3>'+
					'<p><b>Talk:</b> HTML, CSS e JS: Olhando pra frente</p>'+
					'<p><b>Where::</b> Faculdade Marista, Recife - PE</p>'+
					'<p><b>When:</b> 14/12/2013</p>'+
					'<p><a href="http://pt.slideshare.net/luiztiago/html-css-js-olhando-pra-frente" target="_blank">Click here to view the slides from this talk</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="talks item">'+
				'<div class="item-img"><img src="assets/img/talks/06.jpg" /></div>'+
				'<div class="item-description">'+
					'<h3 class="item-title">FEEC Brazil - Recife - 2013</h3>'+
					'<p><b>Talk:</b> JavaScript em todos os lugares</p>'+
					'<p><b>Where:</b> Recife Palace Hotel</p>'+
					'<p><b>When:</b> 23/11/2013</p>'+
					'<p><a href="https://speakerdeck.com/guilhermefarias/javascript-em-todos-os-lugares" target="_blank">Click here to view the slides from this talk</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="talks item">'+
				'<div class="item-img"><img src="assets/img/talks/05.jpg" /></div>'+
				'<div class="item-description">'+
					'<h3 class="item-title">IV SECOMP AESO</h3>'+
					'<p><b>Talk:</b> Git e a importância de versionar um projeto</p>'+
					'<p><b>Where:</b> Faculdades Integradas Barros Melo - AESO, Olinda - PE</p>'+
					'<p><b>When:</b> 25/10/2013</p>'+
					'<p><a href="https://speakerdeck.com/guilhermefarias/git-e-a-importancia-de-versionar-um-projeto" target="_blank">Click here to view the slides from this talk</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="talks item">'+
				'<div class="item-img"><img src="assets/img/talks/03.jpg" /></div>'+
				'<div class="item-description">'+
					'<h3 class="item-title">2° Open Meeting - PernambucoJS</h3>'+
					'<p><b>Talk:</b> Getting Started with FirefoxOS</p>'+
					'<p><b>Where:</b> Faculdade Marista, Recife - PE</p>'+
					'<p><b>When:</b> 15/08/2013</p>'+
					'<p><a href="https://speakerdeck.com/guilhermefarias/firefoxos-a-plataforma-open-web" target="_blank">Click here to view the slides from this talk</a></p>'+
				'</div>'+

				'<div class="item-description">'+
					'<h3 class="item-title">FEEC Lite - Angicos</h3>'+
					'<p><b>Talk:</b> Getting Started with FirefoxOS</p>'+
					'<p><b>Where:</b> Universidade Federal Rural do Semiárido - UFERSA, Angicos - RN</p>'+
					'<p><b>When:</b> 30/08/2013</p>'+
					'<p><a href="https://speakerdeck.com/guilhermefarias/firefoxos-a-plataforma-open-web" target="_blank">Click here to view the slides from this talk</a></p>'+
				'</div>'+

				'<div class="item-description">'+
					'<h3 class="item-title">FEEC Lite - Recife</h3>'+
					'<p><b>Talk:</b> Getting Started with FirefoxOS</p>'+
					'<p><b>Where:</b> Livraria Cultura do Recife Antigo, Recife - PE</p>'+
					'<p><b>When:</b> 11/09/2013</p>'+
					'<p><a href="https://speakerdeck.com/guilhermefarias/firefoxos-a-plataforma-open-web" target="_blank">Click here to view the slides from this talk</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="talks item">'+
				'<div class="item-img"><img src="assets/img/talks/02.jpg" /></div>'+
				'<div class="item-description">'+
					'<h3 class="item-title">MobDev Alagoas</h3>'+
					'<p><b>Talk:</b> FirefoxOS - A web como plataforma, usando HTML5 e Web Standards</p>'+
					'<p><b>Where:</b> Centro Universitário CESMAC, Maceió - AL</p>'+
					'<p><b>When:</b> 22/03/2013</p>'+
					'<p><a href="https://speakerdeck.com/guilhermefarias/firefoxos-a-web-como-plataforma" target="_blank">Click here to view the slides from this talk</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="talks item">'+
				'<div class="item-img"><img src="assets/img/talks/01.jpg" /></div>'+
				'<div class="item-description">'+
					'<h3 class="item-title">FEEC Brazil - Recife</h3>'+
					'<p><b>Talk:</b> Aplicações hibridas usando Phonegap</p>'+
					'<p><b>Where:</b> Recife Palace Hotel</p>'+
					'<p><b>When:</b> 01/12/2012</p>'+
					'<p><a href="https://speakerdeck.com/guilhermefarias/aplicacoes-hibridas-usando-phonegap" target="_blank">Click here to view the slides from this talk</a></p>'+
				'</div>'+
			'</div>'+

			'<h2>Workshops</h2>'+

			'<div class="talks item">'+
				'<div class="item-img"><img src="assets/img/talks/04.jpg" /></div>'+
				'<div class="item-description">'+
					'<h3 class="item-title">Como criar seu primeiro site em wordpress</h3>'+
					'<p><b>Where:</b> Universidade Federal Rural do Semi-árido - UFERSA, Angicos - RN</p>'+
					'<p><b>When:</b> 31/08/2013</p>'+
				'</div>'+
			'</div>',
		projects: ''+
			'<h2>Systems</h2>'+

			'<div class="app item">'+
				'<div class="item-img"><img src="assets/img/projects/06.jpg" /></div>'+
				'<div class="item-description">'+
					'<h3 class="item-title">Educca</h3>'+
					'<p>It is an educational management system in order to modernize the way students relate to the institutions teachings. Facilitate and reduce communication costs, improve management of schools or colleges are some of the goals of the system.</p>'+
					'<p>Available on <a href="http://www.educca.com.br" target="_blank">Educca.com.br</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="app item">'+
				'<div class="item-img"><img src="assets/img/projects/04.jpg" /></div>'+
				'<div class="item-description">'+
					'<h3 class="item-title">Meus Gastos</h3>'+
					'<p>Meus Gastos is an online financial manager, where you can register your earnings and your expenses, taking greater control of your money.</p><br>'+
					'<p>Available on <a href="http://meusgastos.com" target="_blank">MeusGastos.com</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="app item">'+
				'<div class="item-img"><img src="assets/img/projects/03.jpg" /></div>'+
				'<div class="item-description">'+
					'<h3 class="item-title">Gnoteboard</h3>'+
					'<p>Application for organizing personal notes, you can organize your notes like a sticky notes board. (Written in PHP)</p><br>'+
					'<p>Available on <a href="https://play.google.com/store/apps/details?id=br.web.gnoteboard" target="_blank">Google Play</a> on <a href="https://chrome.google.com/webstore/detail/gnoteboard/fplbifbddpcmffmmgabkgchcjleginah" target="_blank">Chrome Web Store</a> and on <a href="http://gnoteboard.com" target="_blank">Gnoteboard.com</a></p>'+
					'<p>I also wrote an "alternative version" in Java, just to improve my skills, you can found at <a href="http://github.com/guilhermefarias/jnoteboard" target="_blank">Github</a>.</p>'+
				'</div>'+
			'</div>'+
			'<div class="clearfix"></div>'+

			'<h2>Other projects</h2>'+


			'<div class="app item">'+
				'<div class="item-img"><img src="assets/img/projects/14.jpg" /></div>'+
				'<div class="item-description">'+
					'<h3 class="item-title">Device Orientation Element</h3>'+
					'<p>It is a custom element that allows capture the current device orientation using just one tag and a little bit JS.</p><br>'+
					'<p>Available on <a href="https://github.com/guilhermefarias/device-orientation" target="_blank">Github</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="app item">'+
				'<div class="item-img"><img src="assets/img/projects/13.jpg" /></div>'+
				'<div class="item-description">'+
					'<h3 class="item-title">Cordova Exif</h3>'+
					'<p>This plugin, is the simplest way to get exif data of images at Cordova platform (Phonegap).</p><br>'+
					'<p>Available on <a href="https://github.com/guilhermefarias/cordova-exif" target="_blank">Github</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="app item">'+
				'<div class="item-img"><img src="assets/img/projects/15.jpg" /></div>'+
				'<div class="item-description">'+
					'<h3 class="item-title">Dark CMD</h3>'+
					'<p>It is a THEME for Windows Command Prompt (cmd.exe), yes, its possible :)</p><br>'+
					'<p>Available on <a href="https://github.com/guilhermefarias/Dark-CMD" target="_blank">Github</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="app item">'+
				'<div class="item-img"><img src="assets/img/projects/12.jpg" /></div>'+
				'<div class="item-description">'+
					'<h3 class="item-title">Joel Ipsum Sublime Snippet</h3>'+
					'<p>Lorem Ipsum is too mainstream, if you want fill something with text, use the new Joel Ipsum, now available as Sublime snippet.</p><br>'+
					'<p>Available on <a href="https://github.com/guilhermefarias/joel-ipsum-sublime-snippet/" target="_blank">Github</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="app item">'+
				'<div class="item-img"><img src="assets/img/projects/07.jpg" /></div>'+
				'<div class="item-description">'+
					'<h3 class="item-title">CSS Dice</h3>'+
					'<p>3D Dice done only with CSS3.<br/>See how it is possible to make a 3D Dice and animations using only CSS and some HTML</p><br>'+
					'<p>Available on <a href="http://guilhermefarias.github.io/CSS-Dice/" target="_blank">Github</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="app item">'+
				'<div class="item-img"><img src="assets/img/projects/05.jpg" /></div>'+
				'<div class="item-description">'+
					'<h3 class="item-title">Zoologico do Tico</h3>'+
					'<p>It is an educational game where children must recognize the animals displayed on the screen, the game was fully developed with the new features of HTML5 (no-flash). Due to the use of API Google voice recognition, the game is only available on Google Chrome</p><br>'+
					'<p>Available on <a href="http://guikylabs.com/zoologicodotico" target="_blank">Guiky Labs</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="app item">'+
				'<div class="item-img"><img src="assets/img/projects/09.jpg" /></div>'+
				'<div class="item-description">'+
					'<h3 class="item-title">CSSReload.JS</h3>'+
					'<p>Script that reloads all CSS files on page in a given time interval. Made only with JavaScript (no jQuery dependency)</p><br>'+
					'<p>Available on <a href="https://github.com/guilhermefarias/cssreload.js" target="_blank">Github</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="app item">'+
				'<div class="item-img"><img src="assets/img/projects/08.jpg" /></div>'+
				'<div class="item-description">'+
					'<h3 class="item-title">ZeptoJS BR</h3>'+
					'<p>Translation of ZeptoJS documentation into Portuguese. Zepto is a minimalist JavaScript library for modern browsers with a largely jQuery-compatible API.</p><br>'+
					'<p>Available on <a href="http://zeptojs.com.br" target="_blank">zeptojs.com.br</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="app item">'+
				'<div class="item-img"><img src="assets/img/projects/10.jpg" /></div>'+
				'<div class="item-description">'+
					'<h3 class="item-title">Fear Ant</h3>'+
					'<p>Example of use of Ambient Light Events, where ants (which were made ​​with only CSS3) move to be in an environment with low light (it is recommended that the device has light sensor for better experience)</p><br>'+
					'<p>Available on <a href="http://guilhermefarias.github.io/fear-ant/" target="_blank">Github</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="app item">'+
				'<div class="item-img"><img src="assets/img/projects/11.jpg" /></div>'+
				'<div class="item-description">'+
					'<h3 class="item-title">SimpleThumbnail.php</h3>'+
					'<p>Simple and lightweight PHP class to generate thumbnails.</p><br>'+
					'<p>Available on <a href="https://github.com/guilhermefarias/SimpleThumbnail" target="_blank">Github</a></p> and <a href="https://packagist.org/packages/simple-thumbnail/simple-thumbnail" target="_blank">Packagist</a> (this class can be used on Composer)</p>'+
				'</div>'+
			'</div>'+

			'<div class="app item">'+
				'<div class="item-img"><img src="assets/img/projects/02.jpg" /></div>'+
				'<div class="item-description">'+
					'<h3 class="item-title">NodeJS Chat</h3>'+
					'<p>Chat done in NodeJS where you can create chat rooms with multiple users and exchange messages in real time using Web Sockets.</p><br>'+
					'<p>Available on <a href="http://chat.guikylabs.com/" target="_blank">Guiky Labs</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="app item">'+
				'<div class="item-img"><img src="assets/img/projects/01.jpg" /></div>'+
				'<div class="item-description">'+
					'<h3 class="item-title">Tic-tac-toe</h3>'+
					'<p>This is the initial version of the Tic-tac-toe, for now the only 2 players can play on the same screen, will soon be possible to play alone and even play with another person who is on another computer, the game will be in real time, using WebSockets and NodeJS.</p><br>'+
					'<p>Available on <a href="http://www.guikylabs.com/jogodavelha" target="_blank">Guiky Labs</a></p>'+
				'</div>'+
			'</div>',
		sites: ''+
			'<h2>Sites</h2>'+

			'<div class="site-description">In 2012, I co-founded with two other partners, a Digital Agency called Chama Comunicação. Since 2012 until today, I am responsible for all work involving web technologies, in this period I participated in many projects, most of them are websites, which you can see below.</div>'+

			'<div class="clearfix"></div>'+

			'<div class="site item">'+
				'<div class="item-img"><img src="assets/img/sites/39.jpg" /></div>'+
				'<a class="item-title" href="http://oteatromagico.com.br" target="_blank">O Teatro Mágico</a>'+
			'</div>' +

			'<div class="site item">'+
				'<div class="item-img"><img src="assets/img/sites/15.jpg" /></div>'+
				'<a class="item-title" href="http://www.lcmbr.com.br" target="_blank">LCM Comunicação</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="item-img"><img src="assets/img/sites/14.jpg" /></div>'+
				'<a class="item-title" class="title" href="http://www.proservil.com.br" target="_blank">Proservil</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="item-img"><img src="assets/img/sites/27.jpg" /></div>'+
				'<a class="item-title" href="http://senar-pe.com.br" target="_blank">Senar</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="item-img"><img src="assets/img/sites/28.jpg" /></div>'+
				'<a class="item-title" href="http://faepe.com.br" target="_blank">Faepe</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="item-img"><img src="assets/img/sites/17.jpg" /></div>'+
				'<a class="item-title" href="http://www.revistadacidade.net" target="_blank">Revista da Cidade</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="item-img"><img src="assets/img/sites/22.jpg" /></div>'+
				'<a class="item-title" href="http://impertecne.com.br" target="_blank">Impertecne</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="item-img"><img src="assets/img/sites/13.jpg" /></div>'+
				'<a class="item-title" href="http://www.bonecadeplatina.com" target="_blank">Boneca de Platina</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="item-img"><img src="assets/img/sites/18.jpg" /></div>'+
				'<a class="item-title" href="http://www.cimentazzi.com" target="_blank">Cimentazzi</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="item-img"><img src="assets/img/sites/16.jpg" /></div>'+
				'<a class="item-title" href="http://www.bolomaster.com.br" target="_blank">Bolo Master</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="item-img"><img src="assets/img/sites/12.jpg" /></div>'+
				'<a class="item-title" href="http://www.inforlinecursos.com.br" target="_blank">Inforline Cursos</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="item-img"><img src="assets/img/sites/11.jpg" /></div>'+
				'<a class="item-title" href="http://www.pousadaolhodagua.com" target="_blank">Pousada Olho DAgua</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="item-img"><img src="assets/img/sites/10.jpg" /></div>'+
				'<a class="item-title" href="http://www.vidda.com.br" target="_blank">Vidda</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="item-img"><img src="assets/img/sites/25.jpg" /></div>'+
				'<a class="item-title" href="http://aquinoeestrela.adv.br/" target="_blank">Aquino e Estrela</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="item-img"><img src="assets/img/sites/09.jpg" /></div>'+
				'<a class="item-title" href="http://www.farmaervas.com.br" target="_blank">Farmaervas</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="item-img"><img src="assets/img/sites/08.jpg" /></div>'+
				'<a class="item-title" href="http://www.guiky.com.br" target="_blank">Guiky</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="item-img"><img src="assets/img/sites/19.jpg" /></div>'+
				'<a class="item-title" href="http://www.educca.com.br" target="_blank">Educca</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="item-img"><img src="assets/img/sites/32.jpg" /></div>'+
				'<a class="item-title" href="http://maisonroyal.com.br" target="_blank">Maison Royal</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="item-img"><img src="assets/img/sites/05.jpg" /></div>'+
				'<a class="item-title" href="http://www.fashionfun.com.br" target="_blank">Fashion Fun</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="item-img"><img src="assets/img/sites/07.jpg" /></div>'+
				'<a class="item-title" href="http://www.col.net.br" target="_blank">COL - Consultoria Online</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="item-img"><img src="assets/img/sites/20.jpg" /></div>'+
				'<a class="item-title" href="http://www.guikylabs.com" target="_blank">Guiky Labs Host</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="item-img"><img src="assets/img/sites/21.jpg" /></div>'+
				'<a class="item-title" href="http://www.clubedamata.com.br" target="_blank">Clube Damata</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="item-img"><img src="assets/img/sites/23.jpg" /></div>'+
				'<a class="item-title" href="http://www.realtef.com.br" target="_blank">Realtef</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="item-img"><img src="assets/img/sites/06.jpg" /></div>'+
				'<a class="item-title" href="http://www.multitaskgirl.com" target="_blank">Multitask Girl</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="item-img"><img src="assets/img/sites/04.jpg" /></div>'+
				'<a class="item-title" href="http://www.rbms.com.br" target="_blank">RBMS Representações</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="item-img"><img src="assets/img/sites/03.jpg" /></div>'+
				'<a class="item-title" href="http://www.powerkiteboat.com" target="_blank">Powerkiteboat</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="item-img"><img src="assets/img/sites/02.jpg" /></div>'+
				'<a class="item-title">Projeto Ecocidades</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="item-img"><img src="assets/img/sites/33.jpg" /></div>'+
				'<a class="item-title" href="http://embalarnordeste.com.br/">Embalar</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="item-img"><img src="assets/img/sites/26.jpg" /></div>'+
				'<a class="item-title" href="http://somdorio.com.br/" target="_blank">Festival Som do Rio</a>'+
			'</div>' +

			'<div class="site item">'+
				'<div class="item-img"><img src="assets/img/sites/01.jpg" /></div>'+
				'<a class="item-title">Portfolio de Anderson Santos</a>'+
			'</div>' +

			'<div class="site item">'+
				'<div class="item-img"><img src="assets/img/sites/38.jpg" /></div>'+
				'<a class="item-title">Casa Revest</a>'+
			'</div>' +

			'<div class="site item">'+
				'<div class="item-img"><img src="assets/img/sites/31.jpg" /></div>'+
				'<a class="item-title" href="http://maracatupromo.com.br" target="_blank">Maracatu Promo</a>'+
			'</div>' +

			'<div class="site item">'+
				'<div class="item-img"><img src="assets/img/sites/29.jpg" /></div>'+
				'<a class="item-title" href="http://cpjmaquinas.com.br" target="_blank">CPJ Máquinas</a>'+
			'</div>' +

			'<div class="site item">'+
				'<div class="item-img"><img src="assets/img/sites/35.jpg" /></div>'+
				'<a class="item-title" href="http://guaiamundo.com.br" target="_blank">Guaiamundo 17</a>'+
			'</div>' +

			'<div class="site item">'+
				'<div class="item-img"><img src="assets/img/sites/34.jpg" /></div>'+
				'<a class="item-title" href="http://jklstands.com.br" target="_blank">JKL Stands</a>'+
			'</div>' +

			'<div class="site item">'+
				'<div class="item-img"><img src="assets/img/sites/30.jpg" /></div>'+
				'<a class="item-title" href="http://mpn.adv.br" target="_blank">MPN Advogados</a>'+
			'</div>' +

			'<div class="site item">'+
				'<div class="item-img"><img src="assets/img/sites/37.jpg" /></div>'+
				'<a class="item-title" href="http://mgrtech.com.br" target="_blank">MGR Tecnologia</a>'+
			'</div>' +

			'<div class="site item">'+
				'<div class="item-img"><img src="assets/img/sites/40.jpg" /></div>'+
				'<a class="item-title" href="http://vempragoiana.com.br/" target="_blank">VemPraGoiana</a>'+
			'</div>' +

			'<div class="site item">'+
				'<div class="item-img"><img src="assets/img/sites/41.jpg" /></div>'+
				'<a class="item-title" href="http://snne.com.br/" target="_blank">SNNE</a>'+
			'</div>' +

			'<div class="site item">'+
				'<div class="item-img"><img src="assets/img/sites/43.jpg" /></div>'+
				'<a class="item-title" href="http://grupojbd.com.br/" target="_blank">Grupo JBD</a>'+
			'</div>' +

			'<div class="site item">'+
				'<div class="item-img"><img src="assets/img/sites/44.jpg" /></div>'+
				'<a class="item-title" href="http://p3eventos.com.br/" target="_blank">P3 Eventos</a>'+
			'</div>' +

			'<div class="site item">'+
				'<div class="item-img"><img src="assets/img/sites/45.jpg" /></div>'+
				'<a class="item-title" href="http://vgarden.com.br/" target="_blank">Villa Garden</a>'+
			'</div>' +

			'<div class="site item">'+
				'<div class="item-img"><img src="assets/img/sites/46.jpg" /></div>'+
				'<a class="item-title" href="http://soproverde.com.br/" target="_blank">Sopro Verde</a>'+
			'</div>' +

			'<div class="site item">'+
				'<div class="item-img"><img src="assets/img/sites/47.jpg" /></div>'+
				'<a class="item-title" href="http://saxbr.com/" target="_blank">SAX</a>'+
			'</div>' +

			'<div class="site item">'+
				'<div class="item-img"><img src="assets/img/sites/48.jpg" /></div>'+
				'<a class="item-title" href="http://csvonline.com.br/" target="_blank">CSV Cursos</a>'+
			'</div>' +

			'<div class="site item">'+
				'<div class="item-img"><img src="assets/img/sites/42.jpg" /></div>'+
				'<a class="item-title" href="http://chamacomunicacao.com.br/" target="_blank">Chama Comunicação</a>'+
			'</div>' +

			'<div class="site item">'+
				'<div class="item-img"><img src="assets/img/sites/36.jpg" /></div>'+
				'<a class="item-title" href="http://jetservicecomercial.com" target="_blank">Jet Service</a>'+
			'</div>' +

			'<div class="site item">'+
				'<div class="item-img"><img src="assets/img/sites/24.jpg" /></div>'+
				'<a class="item-title" href="http://autoescolapiloto.net.br" target="_blank">Auto Escola Piloto</a>'+
			'</div>',
		mobile: ''+
			'<h2>Mobile</h2>'+

			'<div class="mobile item">'+
				'<div class="item-img"><img src="assets/img/mobile/03-a.jpg" /></div>'+
				'<div class="item-img"><img src="assets/img/mobile/03-b.jpg" /></div>'+
				'<div class="item-description">'+
					'<h3 class="item-title">Cahier</h3>'+
					'<p>Application of a corporate social networking, made for iPhone, iPad and Android smartphones using the Phonegap framework, a project developed by me and <a href="http://luiztiago.com" target="_blank">Luiz Tiago</a></p><br>'+
					'<p>Available on <a href="https://itunes.apple.com/mg/app/cahier/id662294381" target="_blank">App Store</a> and on <a href="https://play.google.com/store/apps/details?id=com.mgr.cahier" target="_blank">Google Play</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="mobile item">'+
				'<div class="item-img"><img src="assets/img/mobile/02-a.jpg" /></div>'+
				'<div class="item-img"><img src="assets/img/mobile/02-b.jpg" /></div>'+
				'<div class="item-description">'+
					'<h3 class="item-title">LCM Comunicação</h3>'+
					'<p>WebApp of LCM Comunicação, where the user can know the company, view photos, portfolio and even contact with the team!</p><br>'+
					'<p>Available on <a href="http://lcmbr.com.br/" target="_blank">lcmbr.com.br/mobile</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="mobile item">'+
				'<div class="item-img"><img src="assets/img/mobile/01-a.jpg" /></div>'+
				'<div class="item-img"><img src="assets/img/mobile/01-b.jpg" /></div>'+
				'<div class="item-description">'+
					'<h3 class="item-title">Gnoteboard</h3>'+
					'<p>Application for organizing personal notes for Android, you can organize your notes like a sticky notes board.</p><br>'+
					'<p>Available on <a href="https://play.google.com/store/apps/details?id=br.web.gnoteboard" target="_blank">Google Play</a></p>'+
				'</div>'+
			'</div>',
		contact: ''+
				'<h2>Contact</h2>'+

				'<form method="post">'+
					'<label for="name">Name:</label>'+
					'<input type="text" name="name" required />'+
					'<label for="email">Email:</label>'+
					'<input type="email" name="email" required/>'+
					'<label for="subject">Subject:</label>'+
					'<input type="text" name="subject" required>'+
					'<label for="message">Message:</label>'+
					'<textarea name="message" required></textarea>'+
					'<input type="submit" class="submit" value="Send" />'+
				'</form>'
	}
};

Guilherme.setup();
