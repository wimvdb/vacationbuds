<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<link rel="stylesheet" href="css/index.css">
<meta name="keywords"
	content="travel companion, vacation friend, host travellers" />
<meta name="description"
	content="Find a travel companion and travel the world. Meet people from around the world by hosting fellow travellers.">
<title>Vacationbuds home</title>
</head>
<body>
	<div id="content">
		<div class="hfeed">
			<article id="login-post" class="post">
				<div id="login">
					<form method="POST" action="security/checklogin.php">
						<table>
							<tbody>
								<tr>
									<td><label>Username</label></td>
									<td><label>Password</label></td>
								</tr>
								<tr>
									<td><input id="username" type="text" name="username"></td>
									<td><input id="password" type="password" name="password"></td>
								</tr>
								<tr>
									<td><input id="login-button" class="button" type="submit" value="Log In"></td>
									<td><a  id="register-button" class="button" href="profile/create.php">Register</a></td>
								</tr>
							</tbody>
						</table>
					</form>
				</div>
				<div class="logo">
					<img id="logo" alt="beach" src="images/logo.jpg">
				</div>
				
				
			</article>
		</div>
		<div class="hfeed">

			<article id="search-article" class="entry post search">

				<fieldset>
					<legend>Search</legend>
					<table id="search-table">
						<tr>
							<td><label>Type :</label></td>
							<td><select  id="search-type" title="Type" name="type">
									<option value="V">Vacation advertisement</option>
									<option value="H">Hosting advertisement</option>
							</select></td>
							<td><label>Sex :</label></td>
							<td><select id="search-sex" title="Sex" name="sex">
									<option value="E">I'm not picky</option>
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
									<option value="0">Doesn't matter</option>
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
					
				</fieldset>
				<input class="button" id="search-button" type="submit" onclick="search();"
						value="Search">
				<fieldset id="results" class="hidden">
					<legend>Results</legend>
					<div id="noResults">No results found</div>
					<div class="table-wrapper">
						<div class="wrapper-paging">
							<ul>
								<li><a class="paging-back">&lt;</a></li>
								<li><a class="paging-this"><strong>0</strong> of <span>x</span></a></li>
								<li><a class="paging-next">&gt;</a></li>
							</ul>
						</div>

					</div>


				</fieldset>
			</article>

			<div id="found-ads"></div>

			<div id="found-ad-template" class="found-ad floatLeft width49 hidden">
				<article class="entry post">
					<div class="title"></div>
					<div>
						<div class="floatLeft">
							<img class="user-image" height="100">
						</div>
						<div>
							<div class="wrapper">
								<div class="first paddingLeft">Name</div>
								<div class="second name"></div>
							</div>
							<div class="wrapper paddingLeft">
								<div class="first">From</div>
								<div class="second from"></div>
							</div>

							<div class="wrapper paddingLeft vacation">
								<fieldset class="autoWidth">
									<legend>Vacation ad</legend>
									<div class="wrapper">
										<div class="first">Destination</div>
										<div class="second destination"></div>
									</div>
									<div class="wrapper">
										<div class="first">Leave on</div>
										<div class="second dateOfDeparture"></div>
									</div>
									<div class="wrapper">
										<div class="first">Duration</div>
										<div class="second duration"></div>
									</div>

								</fieldset>
							</div>
							<div class="wrapper paddingLeft hosting">
								<fieldset class="autoWidth">
									<legend>Hosting ad</legend>
									<div class="wrapper">
										<div class="first">Location</div>
										<div class="second location"></div>
									</div>
								</fieldset>
							</div>
							<div class="clear">
								<fieldset class="autoWidth">
									<legend>Content</legend>
									<div class="content-div"></div>
								</fieldset>
							</div>

						</div>
					</div>
					<div id="message-container">
						<a class="lightbox" href=""><img id="magnifying"
							src="images/magnifying.png" title="View ad"> View ad</a>


					</div>


				</article>
			</div>

			<div id="lightbox">

				<article id="ad" class="entry post hidden">
					<a class="close" href="#"><img class="close-image"
						src="images/close.jpg" /></a>
					<h1 id="title"></h1>
					<div id="images-fieldset">

						<img id="prev" class="arrow hidden" src="images/prev.gif" />
						<div id="image-drop-zone">

							<img id="new-image" src="" title="" class="images hidden">
						</div>
						<img id="next" class="arrow hidden" src="images/next.gif" />
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
	<script src="script/index.js"></script>
	<script src="script/googleanalytics.js"></script>

</body>
</html>