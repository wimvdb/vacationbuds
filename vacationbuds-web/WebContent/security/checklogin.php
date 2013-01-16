<?php

ob_start();

// Define $myusername and $mypassword 
$username=$_POST['username']; 
$password=$_POST['password']; 


$url = 'http://localhost:8080/vacationbuds-webservice/rest/dao/login';
$data = array('username' => $username, 'password' => $password);

$options = array('http' => array('header'  => "Content-Type: application/json", 'method'  => 'POST','content' => http_build_query($data)));
$context  = stream_context_create($options);

$json = file_get_contents($url, false, $context);








if($json != null){
session_start();
$_SESSION['username'] = $username;
$_SESSION['password'] = $password;
$_SESSION['userId'] = $json;
//session_register("username");
//session_register("password"); 

header("location:../profile/profile.php?userid=" . $json);

}
else {
echo "Wrong Username or Password";
}

ob_end_flush();
?>