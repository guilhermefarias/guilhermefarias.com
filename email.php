<?php

$nome = $_POST['nome'];
$email = $_POST['email'];
$assunto = $_POST['assunto'];
$msg = $_POST['mensagem'];

$para = "guilherme@guiky.com.br";
$headers = $email;


$enviar = mail($para, $assunto,"
Nome: $nome
Email: $email
Mensagem: $msg",$headers);

?>

<script>
alert('Sua mensagem foi enviada com sucesso!');
</script>


<script>
window.location.href='http://www.guilhermefarias.com.br/#contato';
</script>