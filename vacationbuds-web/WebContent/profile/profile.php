
<?php

session_start();
if ( !isset( $_SESSION['username']) || htmlspecialchars($_GET["userid"]) != $_SESSION['userId']){
header("location:../index.html");
}
?>

<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>My Profile</title>
<link rel="stylesheet" href="../css/profile/profile.css">
<link href='http://fonts.googleapis.com/css?family=Crafty+Girls'
	rel='stylesheet' type='text/css'>
</head>
<body>

		<div id="content">
			<div id="profile" class="paper">
				<div id="avatar-div">
					<img id="avatar" src="#" title=""
						height="187" >

				</div>
				<h1>Profile</h1>
				<div class="profile-text">
					<label>Username :</label>
				</div>
				<div class="profile-text">
					<label>Age :</label>
					
				</div>
				<div class="profile-text">
					<label>Country :</label>
					
				</div>
				<div class="profile-text">
					<label>I am :</label>
					

				</div>
				<div class="profile-textarea">
					<label class="text-area-label">Describe yourself in a few
						words :</label>
					
				</div>
				<div class="profile-textarea">
					<label class="text-area-label">Describe yourself in more
						than a few words :</label>
					
				</div>
			</div>
	</div>

	<script
		src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.js"></script>
	
	<script src="../script/profile/profile.js"></script>


</body>

<!--<body>
 <img src="../images/avatar.jpg"/>
	<nav>
		<ul id="menu">
			<li><a href="#">Manage profile</a></li>
			<li><a href="#">My messages</a></li>
			<li><a href="#">Chat</a></li>
			<li><a href="#">Search</a></li>
			<li><a href="#">Forum</a></li>
		</ul>
	</nav> 
</body>-->
</html>