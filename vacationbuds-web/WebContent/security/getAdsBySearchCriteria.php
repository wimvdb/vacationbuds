<?php

ob_start();
session_start();
if ( !isset( $_SESSION['userid'])){
	//header("location:../index.php");
}
try {
$data=$_POST['searchCriteria']; 

	$url = 'http://localhost:8080/vacationbuds-webservice/rest/dao/search';
    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_HEADER, false);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HTTPHEADER,
                array("Content-type: application/json"));
    curl_setopt($curl, CURLOPT_POST, true);
	curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
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