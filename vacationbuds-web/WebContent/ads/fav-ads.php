

<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Favorites</title>

<link rel="stylesheet" href="../css/ads/ads.css">
<link rel="stylesheet" href="../css/navigation.css">
<link href='http://fonts.googleapis.com/css?family=Special+Elite'
	rel='stylesheet' type='text/css'>

</head>
<body>
<div id="drag-area">
	<div id="content">
		<?php include("../includes/navigation.html");?>
		<div class="hfeed">

			<article class="entry post overview">
				<table id="ad-list">
					<thead>
						<tr>
							<th id="type-label">Type</th>
							<th id="title-label">Title</th>
							<th id="placeOn-label">Place On</th>
							<th id="removeOn-label">Remove On</th>
							<th id="remove-label"></th>
						</tr>
					</thead>
					<tbody>

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
						<div >
							<div>
								<div id="type"></div>

							</div>
						</div>
					</div>
					<div class="ad-text">
						<label>Place on :</label>
						<div >
							<div>
								<div id="placeOn"></div>

							</div>
						</div>
					</div>
					<div class="ad-text">
						<label>Remove on :</label>
						<div >
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
						<div >
							<div>
								<div id="destination"></div>

							</div>
						</div>
					</div>
					<div class="ad-text">
						<label>Leave on :</label>
						<div >
							<div>
								<div id="dateOfDeparture"></div>

							</div>
						</div>
					</div>
					<div class="ad-text">
						<label>Duration :</label>
						<div >
							<div>
								<div id="duration"></div>

							</div>
						</div>
					</div>
					<div class="ad-text">
						<label>Expenses :</label>
						<div >
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
						<div >
							<div>
								<div id="location"></div>

							</div>
						</div>
					</div>
					<div class="ad-text">
						<label>Expenses :</label>
						<div >
							<div>
								<div id="hosting-expenses"></div>

							</div>
						</div>
					</div>

				</fieldset>


				<fieldset id="description-fieldset">
					<legend>Content</legend>
					<div class="entry-content">
						<div >
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
		<!-- <div class="modal"></div> -->

	</div>
</div>
<script
	src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.js"></script>
<script
	src="//ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.js"></script>
<script src="../script/general.js"></script>

<script src="../script/navigation.js"></script>
<script src="../script/ads/fav-ads.js"></script>
<script src="../script/googleanalytics.js"></script>




</body>
</html>