<?php

ob_start();

session_start();
if ( !isset( $_SESSION['userid'])){
header("location:../index.html");
}


$data=$_POST['user']; 
$user= json_decode(utf8_encode($data),true);

$user['id'] = $_SESSION['userid'];
$user['username'] = $_SESSION['username'];
$user['password'] = $_SESSION['password'];

$url = 'http://localhost:8080/vacationbuds-webservice/rest/dao/saveOrUpdateUser';


$content = json_encode($user);
        $curl = curl_init($url);
        curl_setopt($curl, CURLOPT_HEADER, false);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, false);
        curl_setopt($curl, CURLOPT_HTTPHEADER,
                array("Content-type: application/json"));
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $content);

         curl_exec($curl);


       curl_close($curl);

        

header("location:../profile/profile.php");


ob_end_flush();

?>