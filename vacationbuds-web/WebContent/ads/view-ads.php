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
<title>Manage ads</title>
<link rel="stylesheet" href="../css/ads/view-ads.css">


<link rel="stylesheet"
	href="http://code.jquery.com/ui/1.10.0/themes/base/jquery-ui.css">
<link rel="stylesheet" href="../css/ads/ads.css">
<link rel="stylesheet" href="../css/navigation.css">
<link rel="stylesheet" href="../css/ads/new-ad.css">
<link href='http://fonts.googleapis.com/css?family=Special+Elite'
	rel='stylesheet' type='text/css'>

</head>

<div id="content">
	<?php include("../includes/navigation.html");?>
	<div class="hfeed">

		<article id="ad" class="entry post overview">
			<table id="ad-list">
				<thead>
					<tr>
						<th id="type-label">Type</th>
						<th id="title-label">Title</th>
						<th id="placeOn-label">Place On</th>
						<th id="removeOn-label">Remove On</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Vacation type</td>
						<td>Title goes here</td>
						<td>14-12-2012</td>
						<td>15-12-2012</td>
					</tr>
					<tr>
						<td>Hosting type</td>
						<td>Title goes here</td>
						<td>22-12-2012</td>
						<td>11-02-2012</td>
					</tr>
				</tbody>
			</table>
		</article>
		<article id="ad" class="entry post">
			<h1 id="title"></h1>
			<div id="images-fieldset">
				<img id="prev" class="arrow hidden" src="../images/prev.gif" />
				<div id="image-drop-zone">

					<img id="new-image" src="" title="" class="images hidden">
				</div>
				<img id="next" class="arrow hidden" src="../images/next.gif" />
			</div>
			<fieldset>
				<legend>Advertisement</legend>
				<div class="ad-text">
					<label>Type :</label>
					<div class="editable-text">
						<div>
							<div id="type"></div>

						</div>
					</div>
				</div>
				<div class="ad-text">
					<label>Place on :</label>
					<div class="editable-text">
						<div>
							<div id="placeOn"></div>

						</div>
					</div>
				</div>
				<div class="ad-text">
					<label>Remove on :</label>
					<div class="editable-text">
						<div>
							<div id="expireOn"></div>

						</div>
					</div>
				</div>
			</fieldset>

			<fieldset id="vacation">
				<legend>Vacation advertisement</legend>
				<div class="ad-text">
					<label>Destination :</label>
					<div class="editable-text">
						<div>
							<div id="destination"></div>

						</div>
					</div>
				</div>
				<div class="ad-text">
					<label>Leave on :</label>
					<div class="editable-text">
						<div>
							<div id="dateOfDeparture"></div>

						</div>
					</div>
				</div>
				<div class="ad-text">
					<label>Duration :</label>
					<div class="editable-text">
						<div>
							<div id="duration"></div>

						</div>
					</div>
				</div>
				<div class="ad-text">
					<label>Expenses :</label>
					<div class="editable-text">
						<div>
							<div id="vacation-expenses"></div>

						</div>
					</div>
				</div>
			</fieldset>

			<fieldset id="hosting" class="hidden">
				<legend>Hosting advertisement</legend>
				<div class="ad-text">
					<label>Location :</label>
					<div class="editable-text">
						<div>
							<div id="location"></div>

						</div>
					</div>
				</div>
				<div class="ad-text">
					<label>Expenses :</label>
					<div class="editable-text">
						<div>
							<div id="hosting-expenses"></div>

						</div>
					</div>
				</div>

			</fieldset>


			<fieldset id="description-fieldset">
				<legend>Content</legend>
				<div class="entry-content">
					<div class="editable-text">
						<div>
							<div id="description-div"></div>
						</div>
					</div>
				</div>

			</fieldset>

		</article>
	</div>
	<div class="trash">
		<img id="trashbin" src="../images/trash.png" height="150" alt="trash" />

		<div>Drag ads here to delete!</div>
	</div>

</div>

<script
	src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.js"></script>
<script
	src="//ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.js"></script>
<script src="../script/general.js"></script>

<script src="../script/navigation.js"></script>
<script src="../script/ads/view-ads.js"></script>


<body>

</body>
</html>