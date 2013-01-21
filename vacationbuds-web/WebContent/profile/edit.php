<?php

session_start();
if ( !isset( $_SESSION['userid']) || htmlspecialchars($_GET["userid"]) != $_SESSION['userid']){
header("location:../index.html");
}
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Edit Profile</title>
<link rel="stylesheet" href="../css/profile/edit-profile.css">
<link rel="stylesheet" href="../css/profile/edit.css">
<link rel="stylesheet" href="../css/navigation.css">
<link href='http://fonts.googleapis.com/css?family=Crafty+Girls'
	rel='stylesheet' type='text/css'>
</head>
<body>
	<div id="drag-area">
		<div id="content">
			<?php include("../includes/navigation.html");?>

			<ul id="create-profile-nav">
				<li><a href="#profile">Profile</a></li>
				<li><a href="#pictures-frame">Pictures</a></li>
			</ul>


			<div id="create-profile">

				<div id="profile" class="tab">
					<div id="avatar-drop-zone">
						<div id="avatar-postit" class="postit">Drag &amp; drop your
							photo here!</div>
						<img id="avatar" src="#" title="Drag your picture here!"
							height="187" class="hidden">

					</div>
					<h1>Profile</h1>
					<div class="profile-text">
						<label>E-mail :</label>
						<div class="editable-text">
							<div>
								<div data-type="editable" data-updatable='true'
									data-for="#email"></div>
								<input class="hidden" id="email" type="text" title="You email address"
									name="email" />
							</div>
						</div>
					</div>
					<div class="profile-text">
						<label>Age :</label>
						<div class="editable-text">
							<div>
								<div data-type="editable" data-updatable='true' data-for="#age"></div>
								<input class="hidden"  id="age" type="text" title="Your age" name="age" />
							</div>
						</div>
					</div>
					<div class="profile-text">
						<label>Country :</label>
						<div class="editable-text">
							<div>
								<div data-type="editable" data-updatable='true'
									data-for="#country"></div>
								<input class="hidden"  id="country" type="text"
									title="The country you're currently living in" name="country" />
							</div>
						</div>
					</div>
					<div class="profile-text">
						<label>I am :</label>
						 <input type="radio" name="gender" value="M">Male
						<input type="radio" name="gender" value="F">Female

					</div>
					<div class="profile-textarea">
						<label class="text-area-label">Describe yourself in a few
							words :</label>
						<div class="editable-text">
							<div>
								<div data-type="editable" data-updatable='true'
									data-for="#short-description" class="description-label"></div>
								<textarea class="hidden"  id="short-description" rows="3"
									name="user-description"
									title="A short description of yourself. This description will be viewable by others when the find one of your ads."></textarea>
							</div>
						</div>
					</div>
					<div class="profile-textarea">
						<label class="text-area-label">Describe yourself in more
							than a few words :</label>
						<div class="editable-text">
							<div>
								<div data-type="editable" data-updatable='true'
									data-for="#long-description" class="description-label"></div>
								<textarea class="hidden"  id="long-description" rows="10" name="profile-text"
									title="A more elaborate description of yourself. This description will be viewable by others when they look at your profile."></textarea>
							</div>
						</div>
					</div>
				</div>
				<div id="pictures-frame" class="tab">
					<div id="pictures">
						<h1>Pictures</h1>
						<div id="image-drop-zone-left">
							<div class="image-drop-zone-left">
								<div class="postit">Drag &amp; drop your photo here!</div>
								<img src="#" title="Drag your picture here!" height="187"
									class="hidden image">
							</div>
							<div class="picture-text">

								<div class="editable-text">
									<div>
										<div data-type="editable" data-updatable='true'
											data-for="#title">Title</div>
										<input type="text" name="title" />
									</div>
								</div>
							</div>
							<div class="picture-text">

								<div class="editable-text">
									<div>
										<div data-type="editable" data-updatable='true'
											data-for="#description" class="description-label">Description</div>
										<textarea rows="5" cols="35" name="description"></textarea>
									</div>
								</div>
							</div>

						</div>
						<div id="image-drop-zone-right">
							<div class="image-drop-zone-right">
								<div class="postit">Drag &amp; drop your photo here!</div>
								<img src="#" title="Drag your picture here!" height="187"
									class="hidden image">
							</div>
							<div class="picture-text">

								<div class="editable-text">
									<div>
										<div data-type="editable" data-updatable='true'
											data-for="#title">Title</div>
										<input type="text" name="title" />
									</div>
								</div>
							</div>
							<div class="picture-text">

								<div class="editable-text">
									<div>
										<div data-type="editable" data-updatable='true'
											data-for="#description" class="description-label">Description</div>
										<textarea rows="5" cols="35" name="description"></textarea>
									</div>
								</div>
							</div>

						</div>
					</div>

				</div>
				<input id="save" type="submit" onclick="saveOrUpdateUser();"
					value="Save">
			</div>

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
	<script src="../script/slides.min.jquery.js"></script>
	<script src="../script/navigation.js"></script>
	<script src="../script/profile/profile-func.js"></script>
	<script src="../script/profile/edit.js"></script>
	<script src="../script/profile/edit-profile.js"></script>


	<script src="../script/jquery.editable-1.0.1.js"></script>

</body>
</html>