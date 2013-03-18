<?php

ob_start();
session_start();
if ( !isset( $_SESSION['userid'])){
	header("location:../index.html");
}
try {
	$data=$_POST['message']; 
	$message= json_decode(utf8_encode($data),true);
	$message['sender'] = array('id' => $_SESSION['userid']);
	$content = json_encode($message);
	$url = 'http://localhost:8080/vacationbuds-webservice/rest/dao/saveOrUpdateMessage';
	$curl = curl_init($url);
	curl_setopt($curl, CURLOPT_HEADER, false);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, false);
	curl_setopt($curl, CURLOPT_HTTPHEADER, array("Content-type: application/json"));
	curl_setopt($curl, CURLOPT_POST, true);
	curl_setopt($curl, CURLOPT_POSTFIELDS, $content);
	curl_exec($curl);
	if(curl_errno($curl))
	{
	    echo 'Curl error: ' . curl_error($curl);
	}
	curl_close($curl);
	if($_SESSION['userid']  != null){
		header("location:../ads/view-ads.php");
	}
} catch (Exception $e) {
    echo 'Caught exception: ',  $e->getMessage(), "\n";
}
ob_end_flush();

?>