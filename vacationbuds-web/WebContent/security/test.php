<?php

ob_start();

session_start();

$data=$_POST['user']; 

echo 'data' . $data;



echo 'utf8_encode' . utf8_encode($data);

echo 'json_decode' . json_decode(utf8_encode($data),true);

if(isset($_SESSION['profileId'])){
$user['id'] = $_SESSION['profileId'];
}


$url = 'http://localhost:8080/vacationbuds-webservice/rest/dao/saveOrUpdateUser';



       $content = json_encode($user);
       
echo $content;




ob_end_flush();

?>