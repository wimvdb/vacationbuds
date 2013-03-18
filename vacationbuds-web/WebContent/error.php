<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Error</title>
</head>
<body>
<h1>Ooops something went wrong!</h1>




</body>
</html>


<?php

ob_start();

$data=$_POST['data']; 
$result= json_decode(utf8_encode($data),true);

echo $result;

ob_end_flush();
?>

