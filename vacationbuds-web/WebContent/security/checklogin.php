<?php

ob_start();

// Define $myusername and $mypassword 
$username=$_POST['username']; 
$password=$_POST['password']; 


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

header("location:../search/search.php");

}
else {
echo "Wrong Username or Password";
header("location:../index.php");
}

ob_end_flush();
?>