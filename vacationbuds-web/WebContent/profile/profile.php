
<?php

session_start();
if ( !isset( $_SESSION['userid'])){
header("location:../index.php");
}
?>

<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>My Profile</title>
<link rel="stylesheet" href="../css/profile/profile.css">
<link rel="stylesheet" href="../css/logo.css">
<link rel="stylesheet" href="../css/navigation.css">
<link href='http://fonts.googleapis.com/css?family=Crafty+Girls'
	rel='stylesheet' type='text/css'>
</head>
<body>

	<div id="content">
		<?php include("../includes/logo.html");?>

		<?php include("../includes/navigation.html");?>

		<div id="photos-right"></div>
		<div>

			<div id="profile" class="paper">

				<div id="avatar-div">
					<img id="avatar" src="" title="" height="187">

				</div>
				<h1>Profile</h1>
				<div id="username-container" class="profile-text">
					<label>Username :</label>
				</div>
				<div id="age-container" class="profile-text">
					<label>Age :</label>

				</div>
				<div id="country-container" class="profile-text">
					<label>Lives in :</label>

				</div>
				<div id="short-description-container" class="profile-textarea">
					<label class="text-area-label"></label>

				</div>


			</div>

		</div>

	</div>
	<script
		src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.js"></script>



	<script src="../script/jquery.easing.1.3.js"></script>
	<script src="../script/general.js"></script>
	<script src="../script/profile/profile-func.js"></script>
	<script src="../script/navigation.js"></script>
	<script src="../script/profile/profile.js"></script>
	<script src="../script/googleanalytics.js"></script>



</body>
</html>