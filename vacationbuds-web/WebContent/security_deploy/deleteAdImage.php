<?php

ob_start();
session_start();
if ( !isset( $_SESSION['userid'])){
	header("location:../index.php");
}
try {
	$data=$_POST['img']; 
	$img= json_decode(utf8_encode($data),true);
	if(isset( $_SESSION['adId'])){
		$img['ad'] = array('id' => $_SESSION['adId'],'user' => array('id' => $_SESSION['userid']));
		$content = json_encode($img);
		$url = 'http://' . $_SERVER['SERVER_NAME'] . ':10385/vacationbuds-webservice/rest/dao/deleteAdImage';
    	$curl = curl_init($url);
    	curl_setopt($curl, CURLOPT_HEADER, false);
    	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    	curl_setopt($curl, CURLOPT_HTTPHEADER,
                array("Content-type: application/json"));
    	curl_setopt($curl, CURLOPT_POST, true);
    	curl_setopt($curl, CURLOPT_POSTFIELDS, $content);
		curl_exec($curl);
   		curl_close($curl);
	
	}
	
} catch (Exception $e) {
    echo 'Caught exception: ',  $e->getMessage(), "\n";
}
ob_end_flush();

?>