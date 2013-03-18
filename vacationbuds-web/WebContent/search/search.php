<?php

session_start();
if ( !isset( $_SESSION['userid']) ){
header("location:../index.html");
}
unset($_SESSION['profileId']);
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Search</title>
<link rel="stylesheet" href="../css/search/search.css">
<link rel="stylesheet" href="../css/navigation.css">
<link href='http://fonts.googleapis.com/css?family=Special+Elite'
	rel='stylesheet' type='text/css'>
</head>
<body>
	<div id="content">
		<?php include("../includes/navigation.html");?>
		<div class="hfeed">

			<article class="entry post search">
				<fieldset>
					<legend>Search</legend>
					<table id="search-table">
						<tr>
							<td><label>Type :</label></td>
							<td><select id="search-type" title="Type" name="type">
									<option value="V">Vacation advertisement</option>
									<option value="H">Hosting advertisement</option>
							</select></td>
							<td><label>Sex :</label></td>
							<td><select id="search-sex" title="Sex" name="sex">
									<option value="E">I'm not picky!</option>
									<option value="M">Male</option>
									<option value="F">Female</option>
							</select></td>
						</tr>
						<tr>
							<td><label>Destination :</label></td>
							<td><input id="search-destination" type="text"
								title="Destination" name="destination" /></td>
							<td><label>Age :</label></td>
							<td><select id="search-age" title="Age" name="age">
									<option value="0">Doesn't matter!</option>
									<option value="1">Younger than 20</option>
									<option value="2">Between 20 and 30</option>
									<option value="3">Older than 20</option>
									<option value="4">Younger than 30</option>
									<option value="5">Between 30 and 40</option>
									<option value="6">Older than 30</option>
									<option value="7">Younger than 40</option>
									<option value="8">Between 40 and 50</option>
									<option value="9">Older than 40</option>
									<option value="10">Younger than 50</option>
									<option value="11">Older than 50</option>
							</select></td>
						</tr>
					</table>
					<input id="search-button" type="submit" onclick="search();"
						value="Search">
				</fieldset>
				<fieldset>
					<legend>Results</legend>

					<div class="table-wrapper">
						<div class="wrapper-paging">
							<ul>
								<li><a class="paging-back">&lt;</a></li>
								<li><a class="paging-this"><strong>0</strong> of <span>x</span></a></li>
								<li><a class="paging-next">&gt;</a></li>
							</ul>
						</div>
						<div class="wrapper-panel">

							<table id="results">
								<thead>
									<tr>
										<th id="type-label">Type</th>
										<th id="user-label">User</th>
										<th>Title</th>
										<th id="destination-label">Destination/Location</th>
									</tr>
								</thead>
								<tbody>
								</tbody>
							</table>
						</div>
					</div>


				</fieldset>
			</article>


			<div>
			
				<article id="ad" class="entry post hidden">
					<h1 id="title"></h1>
					<div id="images-fieldset">
					
						<img id="prev" class="arrow hidden" src="../images/prev.gif" />
						<div id="image-drop-zone">

							<img id="new-image" src="" title="" class="images hidden">
						</div>
						<img id="next" class="arrow hidden" src="../images/next.gif" />
					</div>
					<fieldset>
						<legend>User</legend>
						<div class="ad-text">
							<label>Name :</label>
							<div>
								<div>
									<div id="name"></div>
								</div>
							</div>
						</div>
						<div class="ad-text">
							<label>Age :</label>
							<div>
								<div>
									<div id="age"></div>
								</div>
							</div>
						</div>
						<div class="ad-text">
							<label>From :</label>
							<div>
								<div>
									<div id="from"></div>
								</div>
							</div>
						</div>
						<div id="message-container">
							<img id="favorites" src="../images/favorites.jpg"
								onclick="addToFavorites();" title="Add to favorites"><a
								id="send-message-link" href="#" onclick="addToFavorites();">Add
								to favorites </a> <img id="message" src="../images/mail.png"
								onclick="sendMessage();" title="Send message"> <a
								id="send-message-link" href="#" onclick="sendMessage();">Send
								Message</a>
						</div>
					</fieldset>

					<fieldset id="vacation">
						<legend>Vacation advertisement</legend>
						<div class="ad-text">
							<label>Destination :</label>
							<div>
								<div>
									<div id="destination"></div>

								</div>
							</div>
						</div>
						<div class="ad-text">
							<label>Leave on :</label>
							<div>
								<div>
									<div id="dateOfDeparture"></div>

								</div>
							</div>
						</div>
						<div class="ad-text">
							<label>Duration :</label>
							<div>
								<div>
									<div id="duration"></div>

								</div>
							</div>
						</div>
						<div class="ad-text">
							<label>Expenses :</label>
							<div>
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
							<div>
								<div>
									<div id="location"></div>

								</div>
							</div>
						</div>
						<div class="ad-text">
							<label>Expenses :</label>
							<div>
								<div>
									<div id="hosting-expenses"></div>

								</div>
							</div>
						</div>

					</fieldset>



					<fieldset id="description-fieldset">
						<legend>Content</legend>
						<div class="entry-content">
							<div>
								<div>
									<div id="description-div"></div>
								</div>
							</div>
						</div>

					</fieldset>


				</article>
				
			</div>

		</div>
		
	</div>
	<script
		src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.js"></script>
	<script
		src="//ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.js"></script>
	<script src="../script/general.js"></script>
	<script src="../script/navigation.js"></script>
	<script src="../script/search/search.js"></script>

</body>
</html>