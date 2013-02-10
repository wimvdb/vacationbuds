<?php

session_start();
unset($_SESSION['profileId']);
?>


<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Create Profile</title>
<link rel="stylesheet" href="../css/profile/edit-profile.css">
<link rel="stylesheet" href="../css/profile/create.css">
<link href='http://fonts.googleapis.com/css?family=Crafty+Girls'
	rel='stylesheet' type='text/css'>
</head>
<body>
	<div id="drag-area">
		<div id="content">
			<?php include("../includes/edit-profile.html");?>
		</div>
		<div class="trash">
			<img id="trashbin" src="../images/trash.png" height="150" alt="trash" />

			<div>Drag photos here to delete!</div>
		</div>
	</div>


	<script
		src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.js"></script>
	<script
		src="//ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js"></script>
		 
		 
		<script src="../script/general.js"></script>
	<script src="../script/profile/profile-func.js"></script>
	<script src="../script/profile/create.js"></script>
	<script src="../script/profile/edit-profile.js"></script>
	
	<script src="../script/jquery.editable-1.0.1.js"></script>

</body>
</html>