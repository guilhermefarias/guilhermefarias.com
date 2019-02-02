function formSubmit(e){
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
};
