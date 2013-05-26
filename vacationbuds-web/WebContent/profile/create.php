

<?php 
session_start();
session_destroy();

?>

<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Create Profile</title>
<link rel="stylesheet" href="../css/profile/edit-profile.css">
<link rel="stylesheet" href="../css/logo.css">
<link rel="stylesheet" href="../css/profile/create.css">
<link href='http://fonts.googleapis.com/css?family=Crafty+Girls'
	rel='stylesheet' type='text/css'>
</head>
<body>
	<div id="drag-area">
		<div id="content">
			<?php include("../includes/logo.html");?>
			<ul id="create-profile-nav">
				<li><a id="profile-link" href="#profile">Profile</a></li>
				<li><a id="pictures-link" href="#pictures-frame">Pictures</a></li>
			</ul>


			<div id="create-profile">

				<div id="profile" class="tab">
					<div id="avatar-drop-zone">
						<div id="avatar-postit" class="postit">
							<span class="dragNdropMessage">Drag &amp; drop your photo
								here!</span>
							<form class="fallback ie-form-avatar"
								encType="multipart/form-data" method="POST"
								action="../security/file-upload.php">
								<input class="ie-file-avatar" name="userfile" type="file">

							</form>
						</div>
						<img id="avatar" src="" title="Drag your picture here!"
							height="187" class="hidden">

					</div>
					<h1>Profile</h1>
					<div class="profile-text">
						<label>Username :</label>
						<div class="editable-text">
							<div>
								<div class="hidden" data-type="editable" data-updatable='true'
									data-for="#username"></div>
								<input id="username" type="text" title="Your username"
									name="username" />
								<div class="error"></div>
							</div>
						</div>

					</div>
					<div class="profile-text">
						<label>Password :</label>
						<div class="editable-text">
							<div>
								<div id="password-value" class="hidden"></div>
								<div id="password-field" class="hidden" data-type="editable"
									data-updatable='true' data-for="#password"></div>
								<input id="password" type="password" title="A secure password"
									name="password" />
								<div class="error"></div>
							</div>
						</div>
					</div>
					<div class="profile-text">
						<label>E-mail :</label>
						<div class="editable-text">
							<div>
								<div class="hidden" data-type="editable" data-updatable='true'
									data-for="#email"></div>
								<input id="email" type="text" title="You email address"
									name="email" />
								<div class="error"></div>
							</div>
						</div>
					</div>
					<div class="profile-text">
						<label>Date of birth :</label>
						<div class="editable-text">
							<div>
								<div class="hidden" data-type="editable" data-updatable='true'
									data-for="#dateOfBirth"></div>
								<input id="dateOfBirth" placeholder="dd-MM-yyyy" type="text"
									title="dd-MM-yyyy" name="dateOfBirth" />
								<div class="error"></div>
							</div>
						</div>
					</div>
					<div class="profile-text">
						<label>Country :</label>
						<div class="editable-text">
							<div>
								<div class="hidden" data-type="editable" data-updatable='true'
									data-for="#country"></div>
								<input id="country" type="text"
									title="The country you're currently living in" name="country" />
								<div class="error"></div>
							</div>
						</div>
					</div>
					<div class="profile-text">
						<label>I am :</label> <input type="radio" name="gender" value="M">Male
						<input type="radio" name="gender" value="F">Female
						<div class="error"></div>

					</div>
					<div class="profile-textarea">
						<label class="text-area-label">Describe yourself in a few
							words :</label>
						<div class="editable-text">
							<div>
								<pre class="hidden description-label" data-type="editable"
									data-updatable='true' data-for="#short-description"
									class="description-label"></pre>
								<textarea id="short-description" rows="10"
									name="user-description"
									title="A short description of yourself. This description will be viewable by others when the find one of your ads."></textarea>
							</div>
						</div>
					</div>
				</div>
				<div id="pictures-frame" class="tab">
					<div id="pictures">
						<h1>Pictures</h1>
						<div class="image-drop-zone-left-parent">
							<div class="image-drop-zone-left">
								<div class="postit moveUp">
									<span class="dragNdropMessage">Drag &amp; drop your
										photo here!</span>
									<form class="fallback ie-form" encType="multipart/form-data"
										method="POST" action="../security/file-upload.php">
										<input class="ie-file" name="userfile" type="file">
									</form>

								</div>
								<img src="" title="Drag your picture here!" height="187"
									class="hidden image moveUp">
							</div>
							<div class="picture-text">
								<div class="editable-text">
									<div>
										<div data-type="editable" data-updatable='true'
											data-for="#description" class="description-label"></div>
										<textarea placeholder="Description"
											class="description-textarea" rows="5" cols="30"
											name="description"></textarea>
									</div>
								</div>
							</div>
						</div>
						<div class="image-drop-zone-right-parent">
							<div class="image-drop-zone-right">
								<div class="postit moveUp">
									<span class="dragNdropMessage">Drag &amp; drop your
										photo here!</span>
									<form class="fallback ie-form" encType="multipart/form-data"
										method="POST" action="../security/file-upload.php">
										<input class="ie-file" name="userfile" type="file">
									</form>

								</div>
								<img src="" title="Drag your picture here!" height="187"
									class="hidden image moveUp">

							</div>
							<div class="picture-text">

								<div class="editable-text">
									<div>
										<div data-type="editable" data-updatable='true'
											data-for="#description" class="description-label"></div>
										<textarea placeholder="Description"
											class="description-textarea" rows="5" cols="30"
											name="description"></textarea>
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
	<div class="modal"></div>



	<script
		src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.js"></script>
	<script
		src="//ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js"></script>

	<script src="../script/dropzone.js"></script>
	<script src="../script/jquery.form.js"></script>
	<script src="../script/general.js"></script>
	<script src="../script/profile/profile-func.js"></script>
	<script src="../script/profile/create.js"></script>
	<script src="../script/profile/edit-profile.js"></script>

	<script src="../script/jquery.editable-1.0.1.js"></script>
	<script src="../script/googleanalytics.js"></script>

</body>
</html>