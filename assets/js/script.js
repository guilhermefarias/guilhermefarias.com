var Guilherme = {
	sidebar: document.getElementsByTagName('aside')[0],
	section: document.getElementsByTagName('section')[0],
	setup: function(){
		if(document.addEventListener){
			document.addEventListener('submit', Guilherme.formSubmit);
			Guilherme.sidebar.addEventListener('click', function(e){
				if(e.target && e.target.nodeName == "LI") {
					var tab = e.target.getAttribute('data-tab');
					Guilherme.showPage(tab);
				}
			});

			if(window.location.hash){
				var hash = window.location.hash;
				hash = hash.replace('#','');
				Guilherme.showPage(hash);
			}
		} else {
			Guilherme.oldBrowser();
		}
	},
	oldBrowser: function(){
		var alertElement = document.createElement('div');
		Guilherme.section.innerHTML = '';
		alertElement.setAttribute('class','resp error');
		alertElement.innerHTML = 'You are using a very old browser, please upgrade.';
		Guilherme.section.appendChild(alertElement);
	},
	formSubmit: function(e){
		e.preventDefault();

		var submitRequest = new XMLHttpRequest(),
			formElement = document.getElementsByTagName('form')[0].elements,
			respElement = document.createElement('div');
			formData = ''+
				'name=' + encodeURIComponent(formElement.name.value)+'&'+
				'email=' + encodeURIComponent(formElement.email.value)+'&'+
				'subject=' + encodeURIComponent(formElement.subject.value)+'&'+
				'message=' + encodeURIComponent(formElement.message.value);

		submitRequest.open("POST","assets/php/email.php",true);
		submitRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		submitRequest.onreadystatechange = function(){
			if (submitRequest.readyState == 4 && submitRequest.status == 200 && submitRequest.responseText == 'OK'){
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
			} else if(submitRequest.readyState == 4){
				respElement.setAttribute('class','resp error');
				respElement.innerHTML = 'There was an error sending the message';
				Guilherme.section.appendChild(respElement);
				setTimeout(function(){
					Guilherme.section.removeChild(respElement);
				},5000);
			}
		}

		submitRequest.send(formData);
	},
	showPage: function(tab){
		if(tab == 'about'){
			Guilherme.section.innerHTML = Guilherme.Pages.about;
		} else if(tab == 'talks'){
			Guilherme.section.innerHTML = Guilherme.Pages.talks;
		} else if(tab == 'projects'){
			Guilherme.section.innerHTML = Guilherme.Pages.projects;
		} else if(tab == 'sites'){
			Guilherme.section.innerHTML = Guilherme.Pages.sites;
		} else if(tab == 'mobile'){
			Guilherme.section.innerHTML = Guilherme.Pages.mobile;
		} else if(tab == 'contact'){
			Guilherme.section.innerHTML = Guilherme.Pages.contact;
		}
		window.location.hash = tab;
		window.scrollTo(0,0);
	},
	Pages : {
		about: ''+
			'<p class="about">Hello :)<br/>'+
			'I\'m a Web Developer who lives in Recife and love JavaScript.<br/>'+
			'I have 20 year old, am near to finish the Information System Bachelor\'s Degree and although my focus is client-side engineering and mobile, I also have knowledge in PHP, NodeJS (server-side JavaScript), Java, MySQL and other technologies.</p>'+
			'<p class="about">I\'m a Front-End Engineer at <a href="http://mgrtech.com.br" target="_blank">MGR Tecnologia</a>, which developed a corporate social network, I am the creator of the blog <a href="http://guiky.com.br" target="_blank">Guiky</a> technology that I update since 2008 and in my spare time I am involved with several projects, you can check navigating the menus :)</p>'
		,
		talks: ''+
			'<h2>Talks</h2>'+

			'<div class="talks">'+
				'<div class="img"><img src="assets/img/talks/07.jpg" /></div>'+
				'<div class="description">'+
					'<h3>Front In Recife</h3>'+
					'<p><b>Talk:</b> HTML, CSS e JS: Olhando pra frente</p>'+
					'<p><b>Where::</b> Faculdade Marista, Recife - PE</p>'+
					'<p><b>When:</b> 14/12/2013</p>'+
					'<p><a href="http://pt.slideshare.net/luiztiago/html-css-js-olhando-pra-frente" target="_blank">Click here to view the slides from this talk</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="talks">'+
				'<div class="img"><img src="assets/img/talks/06.jpg" /></div>'+
				'<div class="description">'+
					'<h3>FEEC Brazil - Recife - 2013</h3>'+
					'<p><b>Talk:</b> JavaScript em todos os lugares</p>'+
					'<p><b>Where:</b> Recife Palace Hotel</p>'+
					'<p><b>When:</b> 23/11/2013</p>'+
					'<p><a href="https://speakerdeck.com/guilhermefarias/javascript-em-todos-os-lugares" target="_blank">Click here to view the slides from this talk</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="talks">'+
				'<div class="img"><img src="assets/img/talks/05.jpg" /></div>'+
				'<div class="description">'+
					'<h3>IV SECOMP AESO</h3>'+
					'<p><b>Talk:</b> Git e a importância de versionar um projeto</p>'+
					'<p><b>Where:</b> Faculdades Integradas Barros Melo - AESO, Olinda - PE</p>'+
					'<p><b>When:</b> 25/10/2013</p>'+
					'<p><a href="https://speakerdeck.com/guilhermefarias/git-e-a-importancia-de-versionar-um-projeto" target="_blank">Click here to view the slides from this talk</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="talks">'+
				'<div class="img"><img src="assets/img/talks/03.jpg" /></div>'+
				'<div class="description">'+
					'<h3>2° Open Meeting - PernambucoJS</h3>'+
					'<p><b>Talk:</b> Getting Started with FirefoxOS</p>'+
					'<p><b>Where:</b> Faculdade Marista, Recife - PE</p>'+
					'<p><b>When:</b> 15/08/2013</p>'+
					'<p><a href="https://speakerdeck.com/guilhermefarias/firefoxos-a-plataforma-open-web" target="_blank">Click here to view the slides from this talk</a></p>'+
				'</div>'+

				'<div class="description">'+
					'<h3>FEEC Lite - Angicos</h3>'+
					'<p><b>Talk:</b> Getting Started with FirefoxOS</p>'+
					'<p><b>Where:</b> Universidade Federal Rural do Semiárido - UFERSA, Angicos - RN</p>'+
					'<p><b>When:</b> 30/08/2013</p>'+
					'<p><a href="https://speakerdeck.com/guilhermefarias/firefoxos-a-plataforma-open-web" target="_blank">Click here to view the slides from this talk</a></p>'+
				'</div>'+

				'<div class="description">'+
					'<h3>FEEC Lite - Recife</h3>'+
					'<p><b>Talk:</b> Getting Started with FirefoxOS</p>'+
					'<p><b>Where:</b> Livraria Cultura do Recife Antigo, Recife - PE</p>'+
					'<p><b>When:</b> 11/09/2013</p>'+
					'<p><a href="https://speakerdeck.com/guilhermefarias/firefoxos-a-plataforma-open-web" target="_blank">Click here to view the slides from this talk</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="talks">'+
				'<div class="img"><img src="assets/img/talks/02.jpg" /></div>'+
				'<div class="description">'+
					'<h3>MobDev Alagoas</h3>'+
					'<p><b>Talk:</b> FirefoxOS - A web como plataforma, usando HTML5 e Web Standards</p>'+
					'<p><b>Where:</b> Centro Universitário CESMAC, Maceió - AL</p>'+
					'<p><b>When:</b> 22/03/2013</p>'+
					'<p><a href="https://speakerdeck.com/guilhermefarias/firefoxos-a-web-como-plataforma" target="_blank">Click here to view the slides from this talk</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="talks">'+
				'<div class="img"><img src="assets/img/talks/01.jpg" /></div>'+
				'<div class="description">'+
					'<h3>FEEC Brazil - Recife</h3>'+
					'<p><b>Talk:</b> Aplicações hibridas usando Phonegap</p>'+
					'<p><b>Where:</b> Recife Palace Hotel</p>'+
					'<p><b>When:</b> 01/12/2012</p>'+
					'<p><a href="https://speakerdeck.com/guilhermefarias/aplicacoes-hibridas-usando-phonegap" target="_blank">Click here to view the slides from this talk</a></p>'+
				'</div>'+
			'</div>'+

			'<h2>Workshops</h2>'+

			'<div class="talks">'+
				'<div class="img"><img src="assets/img/talks/04.jpg" /></div>'+
				'<div class="description">'+
					'<h3>Como criar seu primeiro site em wordpress</h3>'+
					'<p><b>Where:</b> Universidade Federal Rural do Semi-árido - UFERSA, Angicos - RN</p>'+
					'<p><b>When:</b> 31/08/2013</p>'+
				'</div>'+
			'</div>'
		,
		projects: ''+
			'<h2>Sistemas</h2>'+

			'<div class="app">'+
				'<div class="img"><img src="assets/img/projetos/06.jpg" /></div>'+
				'<div class="description">'+
					'<h3>Educca</h3>'+
					'<p>It is an educational management system in order to modernize the way students relate to the institutions teachings. Facilitate and reduce communication costs, improve management of schools or colleges are some of the goals of the system.</p>'+
					'<p>Available on <a href="http://www.educca.com.br" target="_blank">Educca.com.br</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="app">'+
				'<div class="img"><img src="assets/img/projetos/04.jpg" /></div>'+
				'<div class="description">'+
					'<h3>Meus Gastos</h3>'+
					'<p>Meus Gastos is an online financial manager, where you can register your earnings and your expenses, taking greater control of your money.</p><br>'+
					'<p>Available on <a href="http://meusgastos.com" target="_blank">MeusGastos.com</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="app">'+
				'<div class="img"><img src="assets/img/projetos/03.jpg" /></div>'+
				'<div class="description">'+
					'<h3>Gnoteboard</h3>'+
					'<p>Application for organizing personal notes, you can organize your notes like a sticky notes board.</p><br>'+
					'<p>Available on <a href="https://play.google.com/store/apps/details?id=br.web.gnoteboard" target="_blank">Google Play</a> on <a href="https://chrome.google.com/webstore/detail/gnoteboard/fplbifbddpcmffmmgabkgchcjleginah" target="_blank">Chrome Web Store</a> and on <a href="http://gnoteboard.com" target="_blank">Gnoteboard.com</a></p>'+
				'</div>'+
			'</div>'+
			'<div class="clearfix"></div>'+

			'<h2>Outros projetos</h2>'+

			'<div class="app">'+
				'<div class="img"><img src="assets/img/projetos/07.jpg" /></div>'+
				'<div class="description">'+
					'<h3>CSS Dice</h3>'+
					'<p>3D Dice done only with CSS3.<br/>See how it is possible to make a 3D Dice and animations using only CSS and some HTML</p><br>'+
					'<p>Available on <a href="http://guilhermefarias.github.io/CSS-Dice/" target="_blank">Github</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="app">'+
				'<div class="img"><img src="assets/img/projetos/05.jpg" /></div>'+
				'<div class="description">'+
					'<h3>Zoologico do Tico</h3>'+
					'<p>It is an educational game where children must recognize the animals displayed on the screen, the game was fully developed with the new features of HTML5 (no-flash). Due to the use of API Google voice recognition, the game is only available on Google Chrome</p><br>'+
					'<p>Available on <a href="http://guikylabs.com/zoologicodotico" target="_blank">Guiky Labs</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="app">'+
				'<div class="img"><img src="assets/img/projetos/09.jpg" /></div>'+
				'<div class="description">'+
					'<h3>CSSReload.JS</h3>'+
					'<p>Script that reloads all CSS files on page in a given time interval. Made only with JavaScript (no jQuery dependency)</p><br>'+
					'<p>Available on <a href="https://github.com/guilhermefarias/cssreload.js" target="_blank">Github</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="app">'+
				'<div class="img"><img src="assets/img/projetos/08.jpg" /></div>'+
				'<div class="description">'+
					'<h3>ZeptoJS BR</h3>'+
					'<p>Translation of ZeptoJS documentation into Portuguese. Zepto is a minimalist JavaScript library for modern browsers with a largely jQuery-compatible API.</p><br>'+
					'<p>Available on <a href="http://zeptojs.com.br" target="_blank">zeptojs.com.br</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="app">'+
				'<div class="img"><img src="assets/img/projetos/10.jpg" /></div>'+
				'<div class="description">'+
					'<h3>Fear Ant</h3>'+
					'<p>Example of use of Ambient Light Events, where ants (which were made ​​with only CSS3) move to be in an environment with low light (it is recommended that the device has light sensor for better experience)</p><br>'+
					'<p>Available on <a href="http://guilhermefarias.github.io/fear-ant/" target="_blank">Github</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="app">'+
				'<div class="img"><img src="assets/img/projetos/11.jpg" /></div>'+
				'<div class="description">'+
					'<h3>SimpleThumbnail.php</h3>'+
					'<p>Simple and lightweight PHP class to generate thumbnails.</p><br>'+
					'<p>Available on <a href="https://github.com/guilhermefarias/SimpleThumbnail" target="_blank">Github</a></p> and <a href="https://packagist.org/packages/simple-thumbnail/simple-thumbnail" target="_blank">Packagist</a> (this class can be used on Composer)</p>'+
				'</div>'+
			'</div>'+

			'<div class="app">'+
				'<div class="img"><img src="assets/img/projetos/02.jpg" /></div>'+
				'<div class="description">'+
					'<h3>NodeJS Chat</h3>'+
					'<p>Chat done in NodeJS where you can create chat rooms with multiple users and exchange messages in real time using Web Sockets.</p><br>'+
					'<p>Available on <a href="http://chat.guikylabs.com/" target="_blank">Guiky Labs</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="app">'+
				'<div class="img"><img src="assets/img/projetos/01.jpg" /></div>'+
				'<div class="description">'+
					'<h3>Tic-tac-toe</h3>'+
					'<p>This is the initial version of the Tic-tac-toe, for now the only 2 players can play on the same screen, will soon be possible to play alone and even play with another person who is on another computer, the game will be in real time, using WebSockets and NodeJS.</p><br>'+
					'<p>Available on <a href="http://www.guikylabs.com/jogodavelha" target="_blank">Guiky Labs</a></p>'+
				'</div>'+
			'</div>'
		,
		sites: ''+
			'<h2>Sites</h2>'+

			'<div class="site item">'+
				'<div class="img"><img src="assets/img/sites/15.jpg" /></div>'+
				'<a class="title" href="http://www.lcmbr.com.br" target="_blank">LCM Comunicação</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="img"><img src="assets/img/sites/14.jpg" /></div>'+
				'<a class="title" class="title" href="http://www.proservil.com.br" target="_blank">Proservil</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="img"><img src="assets/img/sites/27.jpg" /></div>'+
				'<a class="title" href="http://senar-pe.com.br" target="_blank">Senar</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="img"><img src="assets/img/sites/28.jpg" /></div>'+
				'<a class="title" href="http://faepe.com.br" target="_blank">Faepe</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="img"><img src="assets/img/sites/17.jpg" /></div>'+
				'<a class="title" href="http://www.revistadacidade.net" target="_blank">Revista da Cidade</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="img"><img src="assets/img/sites/22.jpg" /></div>'+
				'<a class="title" href="http://impertecne.com.br" target="_blank">Impertecne</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="img"><img src="assets/img/sites/13.jpg" /></div>'+
				'<a class="title" href="http://www.bonecadeplatina.com" target="_blank">Boneca de Platina</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="img"><img src="assets/img/sites/18.jpg" /></div>'+
				'<a class="title" href="http://www.cimentazzi.com" target="_blank">Cimentazzi</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="img"><img src="assets/img/sites/16.jpg" /></div>'+
				'<a class="title" href="http://www.bolomaster.com.br" target="_blank">Bolo Master</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="img"><img src="assets/img/sites/12.jpg" /></div>'+
				'<a class="title" href="http://www.inforlinecursos.com.br" target="_blank">Inforline Cursos</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="img"><img src="assets/img/sites/11.jpg" /></div>'+
				'<a class="title" href="http://www.pousadaolhodagua.com" target="_blank">Pousada Olho DAgua</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="img"><img src="assets/img/sites/10.jpg" /></div>'+
				'<a class="title" href="http://www.vidda.com.br" target="_blank">Vidda</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="img"><img src="assets/img/sites/25.jpg" /></div>'+
				'<a class="title" href="http://aquinoeestrela.adv.br/" target="_blank">Aquino e Estrela</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="img"><img src="assets/img/sites/09.jpg" /></div>'+
				'<a class="title" href="http://www.farmaervas.com.br" target="_blank">Farmaervas</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="img"><img src="assets/img/sites/08.jpg" /></div>'+
				'<a class="title" href="http://www.guiky.com.br" target="_blank">Guiky</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="img"><img src="assets/img/sites/19.jpg" /></div>'+
				'<a class="title" href="http://www.educca.com.br" target="_blank">Educca</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="img"><img src="assets/img/sites/05.jpg" /></div>'+
				'<a class="title" href="http://www.fashionfun.com.br" target="_blank">Fashion Fun</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="img"><img src="assets/img/sites/07.jpg" /></div>'+
				'<a class="title" href="http://www.col.net.br" target="_blank">COL - Consultoria Online</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="img"><img src="assets/img/sites/20.jpg" /></div>'+
				'<a class="title" href="http://www.guikylabs.com" target="_blank">Guiky Labs Host</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="img"><img src="assets/img/sites/21.jpg" /></div>'+
				'<a class="title" href="http://www.clubedamata.com.br" target="_blank">Clube Damata</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="img"><img src="assets/img/sites/23.jpg" /></div>'+
				'<a class="title" href="http://www.realtef.com.br" target="_blank">Realtef</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="img"><img src="assets/img/sites/06.jpg" /></div>'+
				'<a class="title" href="http://www.multitaskgirl.com" target="_blank">Multitask Girl</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="img"><img src="assets/img/sites/04.jpg" /></div>'+
				'<a class="title" href="http://www.rbms.com.br" target="_blank">RBMS Representações</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="img"><img src="assets/img/sites/03.jpg" /></div>'+
				'<a class="title" href="http://www.powerkiteboat.com" target="_blank">Powerkiteboat</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="img"><img src="assets/img/sites/02.jpg" /></div>'+
				'<a class="title"> Projeto Ecocidades</a>'+
			'</div>'+

			'<div class="site item">'+
				'<div class="img"><img src="assets/img/sites/26.jpg" /></div>'+
				'<a class="title" href="http://somdorio.com.br/" target="_blank">Festival Som do Rio</a>'+
			'</div>' +

			'<div class="site item">'+
				'<div class="img"><img src="assets/img/sites/01.jpg" /></div>'+
				'<a class="title"> Portfolio de Anderson Santos</a>'+
			'</div>' +

			'<div class="site item">'+
				'<div class="img"><img src="assets/img/sites/24.jpg" /></div>'+
				'<a class="title" href="http://autoescolapiloto.net.br" target="_blank">Auto Escola Piloto</a>'+
			'</div>'
		,
		mobile: ''+
			'<h2>Mobile</h2>'+

			'<div class="mobile">'+
				'<div class="img"><img src="assets/img/mobile/03-a.jpg" /></div>'+
				'<div class="img"><img src="assets/img/mobile/03-b.jpg" /></div>'+
				'<div class="description">'+
					'<h3>Cahier</h3>'+
					'<p>Application of a corporate social networking, made for iPhone, iPad and Android smartphones using the Phonegap framework, a project developed by me and <a href="http://luiztiago.com" target="_blank">Luiz Tiago</a></p><br>'+
					'<p>Available on <a href="https://itunes.apple.com/mg/app/cahier/id662294381" target="_blank">App Store</a> and on <a href="https://play.google.com/store/apps/details?id=com.mgr.cahier" target="_blank">Google Play</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="mobile">'+
				'<div class="img"><img src="assets/img/mobile/02-a.jpg" /></div>'+
				'<div class="img"><img src="assets/img/mobile/02-b.jpg" /></div>'+
				'<div class="description">'+
					'<h3>LCM Comunicação</h3>'+
					'<p>WebApp of LCM Comunicação, where the user can know the company, view photos, portfolio and even contact with the team!</p><br>'+
					'<p>Available on <a href="http://lcmbr.com.br/" target="_blank">lcmbr.com.br/mobile</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="mobile">'+
				'<div class="img"><img src="assets/img/mobile/01-a.jpg" /></div>'+
				'<div class="img"><img src="assets/img/mobile/01-b.jpg" /></div>'+
				'<div class="description">'+
					'<h3>Gnoteboard</h3>'+
					'<p>Application for organizing personal notes for Android, you can organize your notes like a sticky notes board.</p><br>'+
					'<p>Available on <a href="https://play.google.com/store/apps/details?id=br.web.gnoteboard" target="_blank">Google Play</a></p>'+
				'</div>'+
			'</div>'
		,
		contact: ''+
				'<h2>Contato</h2>'+

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
}

Guilherme.setup();