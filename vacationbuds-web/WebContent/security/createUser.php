<?php

ob_start();

session_start();

$data=$_POST['user']; 
$user= json_decode($data,true);




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

       $username=$user['username']; 
$password=$user['password']; 


$url = 'http://localhost:8080/vacationbuds-webservice/rest/dao/login';
$data = array('username' => $username, 'password' => $password);

$options = array('http' => array('header'  => "Content-Type: application/json", 'method'  => 'POST','content' => http_build_query($data)));
$context  = stream_context_create($options);

$user_id = file_get_contents($url, false, $context);








if($user_id != null){
session_start();
$_SESSION['userid'] = $user_id;
$_SESSION['username'] = $username;
$_SESSION['password'] = $password;

header("location:../profile/profile.php?userid=" . $user_id);

}






ob_end_flush();

?>