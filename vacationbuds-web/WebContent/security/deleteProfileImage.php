<?php

ob_start();
session_start();
if ( !isset( $_SESSION['userid']) && !isset( $_SESSION['profileId'])){
	header("location:../index.html");
}
try {
	$data=$_POST['img']; 
	$img= json_decode(utf8_encode($data),true);
	if(isset( $_SESSION['profileId']) || isset($_SESSION['userid'])){
		if(isset( $_SESSION['profileId'])){
			$img['user'] = array('id' => $_SESSION['profileId']);
		}else{
			$img['user'] = array('id' => $_SESSION['userid']);
		}
		$content = json_encode($img);
		$url = 'http://localhost:8080/vacationbuds-webservice/rest/dao/deleteProfileImage';
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