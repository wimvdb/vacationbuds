<?php

session_start();
if ( !isset( $_SESSION['userid']) || htmlspecialchars($_GET["userid"]) != $_SESSION['userid']){
header("location:../index.html");
}
unset($_SESSION['adId']);
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>New Advertisement</title>

<link rel="stylesheet"
	href="http://code.jquery.com/ui/1.10.0/themes/base/jquery-ui.css">
<link rel="stylesheet" href="../css/ads/ads.css">
<link rel="stylesheet" href="../css/navigation.css">
<link rel="stylesheet" href="../css/ads/new-ad.css">
<link href='http://fonts.googleapis.com/css?family=Special+Elite'
	rel='stylesheet' type='text/css'>

</head>
<body>
	<div id="drag-area">
		<div id="content">
			<?php include("../includes/navigation.html");?>
			<div class="hfeed">
				<article id="ad" class="entry post">
					<h1>New Advertisement</h1>
					<div id="images-fieldset">
						<img id="prev" class="arrow hidden" src="../images/prev.gif" />
						<div id="image-drop-zone">
							<div class="postit">Drag &amp; drop your photos here!</div>
							<img id="new-image" src="" title="Drag your photos here!"
								class="images hidden">
						</div>
						<img id="next" class="arrow hidden" src="../images/next.gif" />
					</div>
					<fieldset>
						<legend>Advertisement</legend>
						<div class="ad-text">
							<label>Type :</label>
							<div class="editable-text">
								<div>
									<div data-type="editable" data-updatable='true'
										data-for="#type">Vacation advertisement</div>
									<select id="type" title="Type" name="type">
										<option value="V">Vacation advertisement</option>
										<option value="H">Hosting advertisement</option>
									</select>
								</div>
							</div>
						</div>
						<div class="ad-text">
							<label>Title :</label>
							<div class="editable-text">
								<div>
									<div data-type="editable" data-updatable='true'
										data-for="#title">Your amazing advertisement title here!</div>
									<input id="title" type="text" title="Title" name="title" />
								</div>
							</div>
						</div>
						<div class="ad-text">
							<label>Place on :</label>
							<div class="editable-text">
								<div>
									<div data-type="editable" data-updatable='true'
										data-for="#placeOn">This ad will be placed on...</div>
									<input id="placeOn" type="text"
										title="This ad will be placed on..." name="placeOn" />
								</div>
							</div>
						</div>
						<div class="ad-text">
							<label>Remove on :</label>
							<div class="editable-text">
								<div>
									<div data-type="editable" data-updatable='true'
										data-for="#expireOn">This ad will be removed on...</div>
									<input id="expireOn" type="text"
										title="This ad will be removed on..." name="expireOn" />
								</div>
							</div>
						</div>
					</fieldset>

					<fieldset id="vacation">
						<legend>Vacation advertisement</legend>
						<div class="ad-text">
							<label>Country :</label>
							<div class="editable-text">
								<div>
									<div data-type="editable" data-updatable='true'
										data-for="#country">Anywhere but here!</div>
									<input id="country" type="text" title="Country" name="country" />
								</div>
							</div>
						</div>
						<div class="ad-text">
							<label>City :</label>
							<div class="editable-text">
								<div>
									<div data-type="editable" data-updatable='true'
										data-for="#city">Anywhere!</div>
									<input id="city" type="text" title="city" name="city" />
								</div>
							</div>
						</div>
						<div class="ad-text">
							<label>Leave on :</label>
							<div class="editable-text">
								<div>
									<div data-type="editable" data-updatable='true'
										data-for="#dateOfDeparture">I' m Flexible!</div>
									<input id="dateOfDeparture" type="text" title="Duration"
										name="dateOfDeparture" />
								</div>
							</div>
						</div>
						<div class="ad-text">
							<label>Duration :</label>
							<div class="editable-text">
								<div>
									<div data-type="editable" data-updatable='true'
										data-for="#duration">2 weeks!</div>
									<input id="duration" type="text" title="Duration"
										name="duration" />
								</div>
							</div>
						</div>
						<div class="ad-text">
							<label>Expenses :</label>
							<div class="editable-text">
								<div>
									<div data-type="editable" data-updatable='true'
										data-for="#vacation-expenses">I will pay my fair share!</div>
									<select id="vacation-expenses" title="Expenses"
										name="vacation-expenses">
										<option value="50">I will pay my fair share!</option>
										<option value="100">I will pay for everything!</option>
										<option value="0">My company is payment enough! :-)</option>
									</select>
								</div>
							</div>
						</div>
					</fieldset>

					<fieldset id="hosting" class="hidden">
						<legend>Hosting advertisement</legend>
						<div class="ad-text">
							<label>Country :</label>
							<div class="editable-text">
								<div>
									<div data-type="editable" data-updatable='true'
										data-for="#host-country"></div>
									<input id="host-country" type="text" title="Country"
										name="host-country" />
								</div>
							</div>
						</div>
						<div class="ad-text">
							<label>City :</label>
							<div class="editable-text">
								<div>
									<div data-type="editable" data-updatable='true'
										data-for="#host-city"></div>
									<input id="host-city" type="text" title="city" name="host-city" />
								</div>
							</div>
						</div>
						<div class="ad-text">
							<label>Expenses :</label>
							<div class="editable-text">
								<div>
									<div data-type="editable" data-updatable='true'
										data-for="#hosting-expenses">We 'll work something out</div>
									<select id="hosting-expenses" title="Expenses"
										name="hosting-expenses">
										<option value="100">We 'll work something out</option>
										<option value="0">Your money is no good here!</option>
									</select>
								</div>
							</div>
						</div>

					</fieldset>


					<fieldset id="description-fieldset">
						<legend>Content</legend>
						<div class="entry-content">
							<div class="editable-text">
								<div>
									<div id="description-div" data-type="editable"
										data-updatable='true' data-for="#description">Details go
										here...</div>
								</div>
							</div>
						</div>
						<textarea id="description" rows="5" name="description"></textarea>
					</fieldset>
					<div id="save-div">
						<input id="save" type="submit" onclick="saveAd();" value="Save">
					</div>
				</article>
			</div>
			<div class="trash">
				<img id="trashbin" src="../images/trash.png" height="150"
					alt="trash" />

				<div>Drag photos here to delete!</div>
			</div>

		</div>

	</div>


	<script
		src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.js"></script>
	<script
		src="//ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.js"></script>


	<script src="../script/general.js"></script>
	<script src="../script/navigation.js"></script>
	<script src="../script/ads/new-ad.js"></script>
	
	<script src="../script/jquery.editable-1.0.1.js"></script>

</body>
</html>