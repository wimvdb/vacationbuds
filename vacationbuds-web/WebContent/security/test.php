<?php

ob_start();

session_start();


 echo $_SESSION['adId'];

ob_end_flush();

?>