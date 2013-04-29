<?php
ob_start();
session_start();

$userdir = 'default';
if(isset($_SESSION['profileId'])){
	$userdir = $_SESSION['profileId'];
}
else if(isset( $_SESSION['userid'])){
	$userdir = $_SESSION['userid'];
}

$uploaddir = '/home/vacation/public_html/main/images/user-pics/' . $userdir . '/';
$uploadfileName = basename($_FILES['userfile']['name']);
$uploadfile = $uploaddir . $uploadfileName;

if (!file_exists($uploaddir)){
	mkdir($uploaddir);
}



if (is_file($uploadfile)){
	$uploadfileName = uniqid() . basename($_FILES['userfile']['name']);
	$uploadfile = $uploaddir . $uploadfileName;
}


if (move_uploaded_file($_FILES['userfile']['tmp_name'], $uploadfile)) {
    echo '../images/user-pics/' .$userdir . '/' . $uploadfileName;
} 

ob_end_flush();

?>