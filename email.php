<?php
$name = $_POST['name'];
$email = $_POST['email'];
$msg = $_POST['message'];
$subject = $_POST['subject'];
$to  = 'guilherme@guiky.com.br';
$message = '
<html>
	<head>
		<title>EMAIL BOILERPLATE</title>
	</head>
	<body>
		<table cellspacing="0" cellpadding="0" style="width:100%;border-bottom:1px solid #eee;font-size:12px;line-height:135%;font-family:Helvetica,Arial, sans-serif">
			<tr style="background-color:#F5F5F5">
				<th style="vertical-align:top;color:#222;text-align:left;padding:7px 9px 7px 9px;border-top:1px solid #eee;">
					<span>Nome: </span>
					<span style="color:red">*</span>
				</th>
				<td style="vertical-align:top;color:#333;width:60%;padding:7px 9px 7px 0;border-top:1px solid #eee;">
					<div>' . $name . '</div>
				</td>
			</tr>
			<tr style="background-color:#FFFFFF">
				<th style="vertical-align:top;color:#222;text-align:left;padding:7px 9px 7px 9px;border-top:1px solid #eee;">
					<span>E-mail para contato: </span>
					<span style="color:red;">*</span>
				</th>
				<td style="vertical-align:top;color:#333;width:60%;padding:7px 9px 7px 0;border-top:1px solid #eee;">
					<div>'. $email . '</div>
				</td>
			</tr>
			<tr style="background-color:#F5F5F5">
				<th style="vertical-align:top;color:#222;text-align:left;padding:7px 9px 7px 9px;border-top:1px solid #eee;">
					<span>Assunto: </span>
					<span style="color:red">*</span>
				</th>
				<td style="vertical-align:top;color:#333;width:60%;padding:7px 9px 7px 0;border-top:1px solid #eee;">
					<div>'. $subject . '</div>
				</td>
			</tr>
			<tr style="background-color:#FFFFFF">
				<th style="vertical-align:top;color:#222;text-align:left;padding:7px 9px 7px 9px;border-top:1px solid #eee;">
					<span>Mensagem: </span>
					<span style="color:red">*</span>
				</th>
				<td style="vertical-align:top;color:#333;width:60%;padding:7px 9px 7px 0;border-top:1px solid #eee;">
					<div>'. $msg . '</div>
				</td>
			</tr>
		</table>
	</body>
</html>
';


$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";

$headers .= 'To: Guilherme Farias <'. $to .'>' . "\r\n";
$headers .= 'From: ' . $name . '<'. $email . '>' . "\r\n";


if(!empty($name) && !empty($email) && !empty($msg) && !empty($subject)){
	$emailSent = mail($to, $subject, $message, $headers);
	if($emailSent){
		echo 'OK';
	} else {
		echo 'FAIL';
	}
} else {
	echo 'FAIL';
}
?>