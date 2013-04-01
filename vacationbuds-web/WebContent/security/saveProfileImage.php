<?php

ob_start();
session_start();

	$data=$_POST['profileImg']; 
	$profileImg= json_decode(utf8_encode($data),true);
	if(isset( $_SESSION['profileId'])){
		$profileImg['user'] = array('id' => $_SESSION['profileId']);

	}
	else if(isset( $_SESSION['userid'])){
		$profileImg['user'] = array('id' => $_SESSION['userid']);

	}
	$content = json_encode($profileImg);
	$url = 'http://localhost:8080/vacationbuds-webservice/rest/dao/saveProfileImage';
    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_HEADER, false);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HTTPHEADER,
                array("Content-type: application/json"));
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $content);
	$response = curl_exec($curl);
    $_SESSION['profileId'] = json_decode(utf8_encode($response),true)['profileId'];
	if(curl_errno($curl))
	{
	    echo 'Curl error: ' . curl_error($curl);
	}
    curl_close($curl);
	
echo $response;
ob_end_flush();

?>