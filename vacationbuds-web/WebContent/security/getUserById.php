<?php

ob_start();
session_start();
if ( !isset( $_SESSION['userid'])){
	header("location:../index.html");
}
try {

	

	if(isset($_POST['user'])){
		$data=$_POST['user']; 
		$user= json_decode(utf8_encode($data),true);
		$userid = $user['id'];
	}else{
		$userid = $_SESSION['userid'];
	}



	$url = 'http://localhost:8080/vacationbuds-webservice/rest/dao/getUserById';
    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_HEADER, false);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HTTPHEADER,
                array("Content-type: application/json"));
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $userid);
	$response = curl_exec($curl);
	if(curl_errno($curl))
	{
	    echo 'Curl error: ' . curl_error($curl);
	}
    curl_close($curl);
	
} catch (Exception $e) {
    echo 'Caught exception: ',  $e->getMessage(), "\n";
}
ob_end_flush();
echo $response;
?>