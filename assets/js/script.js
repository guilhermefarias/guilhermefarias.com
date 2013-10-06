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
		alertElement.innerHTML = 'Você está usando um navegador muito antigo, por favor atualize.';
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
				respElement.innerHTML = 'Mensagem enviada com sucesso!';
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
				respElement.innerHTML = 'Houve um erro durante o envio da mensagem';
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
			'<p class="about">Olá :)<br/>'+
			'Sou Desenvolvedor Web, moro em Recife, tenho 20 anos e estou cursando Sistemas de Informação. Apesar do meu foco ser client-side e mobile, também tenho conhecimentos em PHP, NodeJS, Java, MySQL e outras coisas.</p>'+
			'<p class="about">Sou Engenheiro Front-End na <a href="http://mgrtech.com.br" target="_blank">MGR Tecnologia</a>, onde desenvolvemos uma rede social corporativa, sou criador do blog de tecnologia <a href="http://guiky.com.br" target="_blank">Guiky</a>, que mantenho desde 2008 e nas horas vagas estou envolvido com vários projetos, que você pode conferir navegando no menu ao lado :)</p>'
		,
		talks: ''+
			'<h2>Palestras</h2>'+

			'<div class="talks">'+
				'<div class="img"><img src="assets/img/talks/03.jpg" /></div>'+
				'<div class="description">'+
					'<h3>2° Open Meeting - PernambucoJS</h3>'+
					'<p><b>Palestra:</b> Getting Started with FirefoxOS</p>'+
					'<p><b>Onde:</b> Faculdade Marista, Recife - PE</p>'+
					'<p><b>Data:</b> 15/08/2013</p>'+
					'<p><a href="http://www.slideshare.net/guiky/firefoxos-plataforma-open-web" target="_blank">Clique aqui para ver os slides dessa palestra</a></p>'+
				'</div>'+

				'<div class="description">'+
					'<h3>FEEC Lite - Angicos</h3>'+
					'<p><b>Palestra:</b> Getting Started with FirefoxOS</p>'+
					'<p><b>Onde:</b> Universidade Federal Rural do Semi-??rido - UFERSA, Angicos - RN</p>'+
					'<p><b>Data:</b> 30/08/2013</p>'+
					'<p><a href="http://www.slideshare.net/guiky/firefoxos-plataforma-open-web" target="_blank">Clique aqui para ver os slides dessa palestra</a></p>'+
				'</div>'+

				'<div class="description">'+
					'<h3>FEEC Lite - Recife</h3>'+
					'<p><b>Palestra:</b> Getting Started with FirefoxOS</p>'+
					'<p><b>Onde:</b> Livraria Cultura do Recife Antigo, Recife - PE</p>'+
					'<p><b>Data:</b> 11/09/2013</p>'+
					'<p><a href="http://www.slideshare.net/guiky/firefoxos-plataforma-open-web" target="_blank">Clique aqui para ver os slides dessa palestra</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="talks">'+
				'<div class="img"><img src="assets/img/talks/02.jpg" /></div>'+
				'<div class="description">'+
					'<h3>MobDev Alagoas</h3>'+
					'<p><b>Palestra:</b> FirefoxOS - A web como plataforma, usando HTML5 e Web Standards</p>'+
					'<p><b>Onde:</b> Centro Universitário CESMAC, Maceió - AL</p>'+
					'<p><b>Data:</b> 22/03/2013</p>'+
					'<p><a href="http://www.slideshare.net/guiky/firefoxos-a-web-como-plataforma" target="_blank">Clique aqui para ver os slides dessa palestra</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="talks">'+
				'<div class="img"><img src="assets/img/talks/01.jpg" /></div>'+
				'<div class="description">'+
					'<h3>FEEC Brazil - Recife</h3>'+
					'<p><b>Palestra:</b> Aplicações hibridas usando Phonegap</p>'+
					'<p><b>Onde:</b> Recife Palace Hotel</p>'+
					'<p><b>Data:</b> 01/12/2012</p>'+
					'<p><a href="http://www.slideshare.net/guiky/feec-brazil2012" target="_blank">Clique aqui para ver os slides dessa palestra</a></p>'+
				'</div>'+
			'</div>'+

			'<h2>Workshops</h2>'+

			'<div class="talks">'+
				'<div class="img"><img src="assets/img/talks/04.jpg" /></div>'+
				'<div class="description">'+
					'<h3>Como criar seu primeiro site em wordpress</h3>'+
					'<p><b>Onde:</b> Universidade Federal Rural do Semi-??rido - UFERSA, Angicos - RN</p>'+
					'<p><b>Data:</b> 31/08/2013</p>'+
				'</div>'+
			'</div>'
		,
		projects: ''+
			'<h2>Sistemas</h2>'+

			'<div class="app">'+
				'<div class="img"><img src="assets/img/projetos/06.jpg" /></div>'+
				'<div class="description">'+
					'<h3>Educca</h3>'+
					'<p>É um sistema de gestão educacional com o objetivo modernizar a maneira como os alunos se relacionam com as instituições de ensinos. Facilitar e diminuir custos com comunicação, melhorar a gestão das escolas ou faculdades são alguns dos objetivos do sistema.</p><br>'+
					'<p>Disponivel em <a href="http://www.educca.com.br" target="_blank">Educca.com.br</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="app">'+
				'<div class="img"><img src="assets/img/projetos/04.jpg" /></div>'+
				'<div class="description">'+
					'<h3>Meus Gastos</h3>'+
					'<p>Meus Gastos é um gerenciador financeiro online, onde você pode registrar seus ganhos e seus gastos, tendo um maior controle do seu dinheiro.</p><br>'+
					'<p>Disponivel em <a href="http://meusgastos.com" target="_blank">MeusGastos.com</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="app">'+
				'<div class="img"><img src="assets/img/projetos/03.jpg" /></div>'+
				'<div class="description">'+
					'<h3>Gnoteboard</h3>'+
					'<p>Aplicativo para organizar anotações pessoais, você pode organizar suas notas como um mural de post-it.</p><br>'+
					'<p>Disponivel no <a href="https://play.google.com/store/apps/details?id=br.web.gnoteboard" target="_blank">Google Play</a>, no <a href="https://chrome.google.com/webstore/detail/gnoteboard/fplbifbddpcmffmmgabkgchcjleginah" target="_blank">Chrome Web Store</a> e em <a href="http://gnoteboard.com" target="_blank">Gnoteboard.com</a></p>'+
				'</div>'+
			'</div>'+
			'<div class="clearfix"></div>'+

			'<h2>Outros projetos</h2>'+

			'<div class="app">'+
				'<div class="img"><img src="assets/img/projetos/07.jpg" /></div>'+
				'<div class="description">'+
					'<h3>Dado em CSS</h3>'+
					'<p>Dado feito apenas com CSS3.<br/> Veja como é possivel fazer um dado 3D e com animações usando apenas CSS e um pouco de HTML</p><br>'+
					'<p>Disponivel em <a href="http://guilhermefarias.github.io/CSS-Dice/" target="_blank">Github</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="app">'+
				'<div class="img"><img src="assets/img/projetos/05.jpg" /></div>'+
				'<div class="description">'+
					'<h3>Zoologico do Tico</h3>'+
					'<p>É um jogo educativo onde a criança deve reconher os animais exibidos na tela, o jogo foi totalmente desenvolvido com os novos recursos do HTML5. Devido ao uso da API de reconhecimento de voz do Google, o jogo só está disponivel para o Google Chrome</p><br>'+
					'<p>Disponivel em <a href="http://guikylabs.com/zoologicodotico" target="_blank">Guiky Labs</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="app">'+
				'<div class="img"><img src="assets/img/projetos/09.jpg" /></div>'+
				'<div class="description">'+
					'<h3>CSSReload.JS</h3>'+
					'<p>Script que recarrega todos os arquivos CSS da página em um determinado intervalo de tempo. Feito apenas com JavaScript (no jQuery dependency)</p><br>'+
					'<p>Disponivel em <a href="https://github.com/guilhermefarias/cssreload.js" target="_blank">Github</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="app">'+
				'<div class="img"><img src="assets/img/projetos/08.jpg" /></div>'+
				'<div class="description">'+
					'<h3>ZeptoJS BR</h3>'+
					'<p>Tradução da documentação do ZeptoJS para o português. Zepto é uma biblioteca JavaScript minimalista para navegadores modernos com uma API em grande parte compatível com jQuery.</p><br>'+
					'<p>Disponivel em <a href="http://guilhermefarias.github.io/zepto-br/" target="_blank">Github</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="app">'+
				'<div class="img"><img src="assets/img/projetos/10.jpg" /></div>'+
				'<div class="description">'+
					'<h3>Fear Ant</h3>'+
					'<p>Exemplo de uso dos Ambient Light Events, onde as formigas (que foram feitas apenas com CSS3) se movem ao estarem em um ambiente com pouca luz (é recomendado que o dispositivo tenha sensor de luminosidade para melhor experiência)</p><br>'+
					'<p>Disponivel em <a href="http://guilhermefarias.github.io/fear-ant/" target="_blank">Github</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="app">'+
				'<div class="img"><img src="assets/img/projetos/02.jpg" /></div>'+
				'<div class="description">'+
					'<h3>NodeJS Chat</h3>'+
					'<p>Chat feito em NodeJS onde é possivel criar salas de bate-papo com vários usuários e trocar mensagem em tempo real utilizando Web Sockets.</p><br>'+
					'<p>Disponivel em <a href="http://chat.guikylabs.com/" target="_blank">Guiky Labs</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="app">'+
				'<div class="img"><img src="assets/img/projetos/01.jpg" /></div>'+
				'<div class="description">'+
					'<h3>Jogo da Velha</h3>'+
					'<p> Esta é a versão inicial do jogo da velha, por enquanto os 2 jogadores só podem jogar na mesma tela, em breve será possivel jogar sozinho e até mesmo jogar com outra pessoa que está em outro computador, o jogo será em tempo real, utilizando WebSockets e NodeJS.</p><br>'+
					'<p>Disponivel em <a href="http://www.guikylabs.com/jogodavelha" target="_blank">Guiky Labs</a></p>'+
				'</div>'+
			'</div>'
		,
		sites: ''+
			'<h2>Sites</h2>'+

			'<div class="app">'+
				'<div class="img"><img src="assets/img/sites/15.jpg" /></div>'+
				'<div class="description">'+
					'<h3>LCM Comunicação</h3>'+
					'<p>Site da empresa LCM Comunicação, desenvolvido em WordPress, por mim no Estudio Zenit.</p><br>'+
					'<p>Site: <a href="http://www.lcmbr.com.br" target="_blank">www.lcmbr.com.br</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="app">'+
				'<div class="img"><img src="assets/img/sites/14.jpg" /></div>'+
				'<div class="description">'+
					'<h3>Proservil</h3>'+
					'<p>Site da empresa Proservil, desenvolvido em WordPress, por mim na Chama Comunicação.</p><br>'+
					'<p>Site: <a href="http://www.proservil.com.br" target="_blank">www.proservil.com.br</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="app">'+
				'<div class="img"><img src="assets/img/sites/17.jpg" /></div>'+
				'<div class="description">'+
					'<h3>Revista da Cidade</h3>'+
					'<p>Portal da Revista da Cidade, o guia comercial da cidade de São Lourenço da Mata e região, desenvolvido em WordPress, por mim na Chama Comunicação.</p><br>'+
					'<p>Site: <a href="http://www.revistadacidade.net" target="_blank">www.revistadacidade.net</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="app">'+
				'<div class="img"><img src="assets/img/sites/13.jpg" /></div>'+
				'<div class="description">'+
					'<h3>Boneca de Platina</h3>'+
					'<p>Blog Boneca de Platina, desenvolvido por mim e Dash e Dobbin no Estudio Zenit.</p><br>'+
					'<p>Site: <a href="http://www.bonecadeplatina.com" target="_blank">www.bonecadeplatina.com</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="app">'+
				'<div class="img"><img src="assets/img/sites/18.jpg" /></div>'+
				'<div class="description">'+
					'<h3>Cimentazzi</h3>'+
					'<p>Site da empresa Cimentazzi, desenvolvido em WordPress, por mim na Chama Comunicação.</p><br>'+
					'<p>Site: <a href="http://www.cimentazzi.com" target="_blank">www.cimentazzi.com</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="app">'+
				'<div class="img"><img src="assets/img/sites/16.jpg" /></div>'+
				'<div class="description">'+
					'<h3>Bolo Master</h3>'+
					'<p>Site da empresa de bolos Bolo Master, desenvolvido em WordPress, por mim na Chama Comunicação.</p><br>'+
					'<p>Site: <a href="http://www.bolomaster.com.br" target="_blank">www.bolomaster.com.br</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="app">'+
				'<div class="img"><img src="assets/img/sites/12.jpg" /></div>'+
				'<div class="description">'+
					'<h3>Inforline Cursos</h3>'+
					'<p>Site da Inforline Cursos, desenvolvido por mim na Chama Comunicação utilizando o CMS WordPress.</p><br>'+
					'<p>Site: <a href="http://www.inforlinecursos.com.br" target="_blank">www.inforlinecursos.com.br</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="app">'+
				'<div class="img"><img src="assets/img/sites/11.jpg" /></div>'+
				'<div class="description">'+
					'<h3>Pousada Olho DAgua</h3>'+
					'<p>Site da pousada Olho DAgua, Maragogi - AL. Desenvolvido em conjunto com Lucas Cavalcanti, utilizando o CMS WordPress.</p><br>'+
					'<p>Site: <a href="http://www.pousadaolhodagua.com" target="_blank">www.pousadaolhodagua.com</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="app">'+
				'<div class="img"><img src="assets/img/sites/10.jpg" /></div>'+
				'<div class="description">'+
					'<h3>Vidda</h3>'+
					'<p>Site da marca de cosmeticos Vidda, o layout foi feito pela agência COL e enviado em .PSD, o restante foi desenvolvido popor mim, utilizando o CMS WordPress.</p><br>'+
					'<p>Site: <a href="http://www.vidda.com.br" target="_blank">www.vidda.com.br</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="app">'+
				'<div class="img"><img src="assets/img/sites/09.jpg" /></div>'+
				'<div class="description">'+
					'<h3>Farmaervas</h3>'+
					'<p>Site instituicional da empresa de cosmeticos Farmaervas, o site inteiro foi feito em WordPress, a programação feita por mim e o design do site foi desenvolvido pela agência COL.</p><br>'+
					'<p>Site: <a href="http://www.farmaervas.com.br" target="_blank">www.farmaervas.com.br</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="app">'+
				'<div class="img"><img src="assets/img/sites/08.jpg" /></div>'+
				'<div class="description">'+
					'<h3>Guiky</h3>'+
					'<p>Nova versão do meu blog de Tecnologia Guiky, totalmente desenvolvido por mim, utilizando o CMS WordPress, HTML5, CSS3, Javascrtip/jQuery e etc.</p><br>'+
					'<p>Site: <a href="http://www.guiky.com.br" target="_blank">www.guiky.com.br</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="app">'+
				'<div class="img"><img src="assets/img/sites/19.jpg" /></div>'+
				'<div class="description">'+
					'<h3>Educca</h3>'+
					'<p>Site instituicional da startup Educca, responsável por criar um sistema de gestão educacional online voltado para escolas, faculdades e cursos técnicos.</p><br>'+
					'<p>Site: <a href="http://www.educca.com.br" target="_blank">www.educca.com.br</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="app">'+
				'<div class="img"><img src="assets/img/sites/05.jpg" /></div>'+
				'<div class="description">'+
					'<h3>Fashion Fun</h3>'+
					'<p>Layout foi enviado em .PSD, feito pela agência COL, o site foi desenvolvido por mim, utilizando o CMS WordPress.</p><br>'+
					'<p>Site: <a href="http://www.fashionfun.com.br" target="_blank">www.fashionfun.com.br</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="app">'+
				'<div class="img"><img src="assets/img/sites/07.jpg" /></div>'+
				'<div class="description">'+
					'<h3>COL - Consultoria Online</h3>'+
					'<p>Site da COL, empresa de consultoria de comunicação e imagem especializada em ambiente online.</p><br>'+
					'<p>Site: <a href="http://www.col.net.br" target="_blank">www.col.net.br</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="app">'+
				'<div class="img"><img src="assets/img/sites/20.jpg" /></div>'+
				'<div class="description">'+
					'<h3>Guiky Labs Host</h3>'+
					'<p>Site instituicional da minha empresa de hospedagem.</p><br>'+
					'<p>Site: <a href="http://www.guikylabs.com" target="_blank">www.guikylabs.com</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="app">'+
				'<div class="img"><img src="assets/img/sites/21.jpg" /></div>'+
				'<div class="description">'+
					'<h3>Clube Damata</h3>'+
					'<p>Site da revista Clube Damata, o guia comercial da cidade de São Lourenço da Mata. Além do site, também desenvolvi o sistema de gerenciamento de sócios da revista e o sistema que permite a impressão da carteira dos afiliados.</p><br>'+
					'<p>Site: <a href="http://www.clubedamata.com.br" target="_blank">www.clubedamata.com.br</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="app">'+
				'<div class="img"><img src="assets/img/sites/06.jpg" /></div>'+
				'<div class="description">'+
					'<h3>Multitask Girl</h3>'+
					'<p>Blog Multitask Girl desenvolvido em WordPress.</p><br>'+
					'<p>Site: <a href="http://www.multitaskgirl.com" target="_blank">www.multitaskgirl.com</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="app">'+
				'<div class="img"><img src="assets/img/sites/04.jpg" /></div>'+
				'<div class="description">'+
					'<h3>RBMS Representações</h3>'+
					'<p>Site da empresa RBMS Representações, desenvolvido em WordPress.</p><br>'+
					'<p>Site: <a href="http://www.rbms.com.br" target="_blank">www.rbms.com.br</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="app">'+
				'<div class="img"><img src="assets/img/sites/03.jpg" /></div>'+
				'<div class="description">'+
					'<h3>Powerkiteboat</h3>'+
					'<p>Projeto do barco Tucamarino, site desenvolvido em WordPress por mim e Yeltsin Lima</p><br>'+
					'<p>Site: <a href="http://www.powerkiteboat.com" target="_blank">www.powerkiteboat.com</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="app">'+
				'<div class="img"><img src="assets/img/sites/02.jpg" /></div>'+
				'<div class="description">'+
					'<h3>Projeto Ecocidades</h3>'+
					'<p>Site desenvolvido para conclusão do curso de webdesign no programa da Microsoft, Students to Business.</p><br>'+
				'</div>'+
			'</div>'+

			'<div class="app">'+
				'<div class="img"><img src="assets/img/sites/01.jpg" /></div>'+
				'<div class="description">'+
					'<h3>Portfolio de Anderson Santos</h3>'+
					'<p>Porfolio de Anderson Santos, estudante de Jogos Digitais</p><br>'+
				'</div>'+
			'</div>'
		,
		mobile: ''+
			'<h2>Mobile</h2>'+

			'<div class="mobile">'+
				'<div class="img"><img src="assets/img/mobile/03-a.jpg" /></div>'+
				'<div class="img"><img src="assets/img/mobile/03-b.jpg" /></div>'+
				'<div class="description">'+
					'<h3>Cahier</h3>'+
					'<p>Aplicativo da rede social corporativa Cahier, feito para iPhone, iPad e smartphones com Android, utilizando o framework Phonegap, projeto desenvolvido por mim e <a href="http://luiztiago.com" target="_blank">Luiz Tiago</a></p><br>'+
					'<p>Disponivel na <a href="https://itunes.apple.com/mg/app/cahier/id662294381" target="_blank">App Store</a> e no <a href="https://play.google.com/store/apps/details?id=com.mgr.cahier" target="_blank">Google Play</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="mobile">'+
				'<div class="img"><img src="assets/img/mobile/02-a.jpg" /></div>'+
				'<div class="img"><img src="assets/img/mobile/02-b.jpg" /></div>'+
				'<div class="description">'+
					'<h3>LCM Comunicação</h3>'+
					'<p>WebApp da LCM Comunicação, onde o usuário pode conhecer a empresa, além de poder ver fotos, portfolio e ainda entrar em contato com a equipe!</p><br>'+
					'<p>Disponivel em <a href="http://lcmbr.com.br/" target="_blank">lcmbr.com.br/mobile</a></p>'+
				'</div>'+
			'</div>'+

			'<div class="mobile">'+
				'<div class="img"><img src="assets/img/mobile/01-a.jpg" /></div>'+
				'<div class="img"><img src="assets/img/mobile/01-b.jpg" /></div>'+
				'<div class="description">'+
					'<h3>Gnoteboard</h3>'+
					'<p>Aplicativo para organizar anotações pessoais para Android, você pode organizar suas notas como um mural de post-it.</p><br>'+
					'<p>Disponivel no <a href="https://play.google.com/store/apps/details?id=br.web.gnoteboard" target="_blank">Google Play</a></p>'+
				'</div>'+
			'</div>'
		,
		contact: ''+
				'<form method="post">'+
					'<label for="name">Nome:</label>'+
					'<input type="text" name="name" required />'+
					'<label for="email">Email:</label>'+
					'<input type="email" name="email" required/>'+
					'<label for="subject">Assunto:</label>'+
					'<input type="text" name="subject" required>'+
					'<label for="message">Mensagem:</label>'+
					'<textarea name="message" required></textarea>'+
					'<input type="submit" class="submit" value="Enviar" />'+
				'</form>'
	}
}

Guilherme.setup();