<?php

ob_start();
session_start();
if ( !isset( $_SESSION['userid'])){
	header("location:../index.html");
}
try {
	$data=$_POST['adImg']; 
	$adImg= json_decode(utf8_encode($data),true);
	if(isset( $_SESSION['adId'])){
		$adImg['ad'] = array('id' => $_SESSION['adId'], '@type' =>'com.vacationbuds.model.Ad','user' => array('id' => $_SESSION['userid']));
	}else{
		$adImg['ad'] = array('@type' =>'com.vacationbuds.model.Ad','user' => array('id' => $_SESSION['userid']));
	}
	$content = json_encode($adImg);
	$url = 'http://localhost:8080/vacationbuds-webservice/rest/dao/saveAdImage';
    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_HEADER, false);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HTTPHEADER,
                array("Content-type: application/json"));
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $content);
	$response = curl_exec($curl);
	$_SESSION['adId'] = $response;
	echo $_SESSION['adId'];
	if(curl_errno($curl))
	{
	    echo 'Curl error: ' . curl_error($curl);
	}
    curl_close($curl);
} catch (Exception $e) {
    echo 'Caught exception: ',  $e->getMessage(), "\n";
}
ob_end_flush();

?>