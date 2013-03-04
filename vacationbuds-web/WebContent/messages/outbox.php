<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Outbox</title>

<link rel="stylesheet"
	href="http://code.jquery.com/ui/1.10.0/themes/base/jquery-ui.css">
<link rel="stylesheet" href="../css/messages/messages.css">
<link rel="stylesheet" href="../css/navigation.css">
<link rel="stylesheet" href="../css/messages/inbox.css">
<link href='http://fonts.googleapis.com/css?family=Special+Elite'
	rel='stylesheet' type='text/css'>
</head>
<body>
<div id="drag-area">
	<div id="content">
		<?php include("../includes/navigation.html");?>
		<div class="hfeed">
			<article class="entry post overview">
				<table id="outbox-list">
					<thead>
						<tr>
							<th id="recipient-label">Recipient</th>
							<th id="title-label">Title</th>
							<th id="received-label">Received on</th>
						</tr>
					</thead>
					<tbody>

					</tbody>
				</table>
			</article>
			
			<article id="message" class="entry post">
				
				<fieldset>
					<legend>Message</legend>
					<div class="message-text">
						<label>Recipient :</label>
						<div>
							<div>
								<div id=recipient></div>
							</div>
						</div>
					</div>
					<div class="message-text">
						<label>Title :</label>
						<div >
							<div>
								<div id="title"></div>
								
							</div>
						</div>
					</div>
				</fieldset>
				<fieldset >
					<legend>Content</legend>
					<div class="body-content">
						<div class="editable-text">
							<div>
								<pre id="message-body"></pre>
							</div>
						</div>
					</div>
					
				</fieldset>
				
			</article>
		</div>
		<div class="trash">
			<img id="trashbin" src="../images/trash.png" height="150" alt="trash" />

			<div>Drag messages here to delete!</div>
		</div>
	</div>
	</div>
	<script
		src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.js"></script>
	<script
		src="//ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.js"></script>
	<script src="../script/general.js"></script>
	
	<script src="../script/navigation.js"></script>
	<script src="../script/messages/outbox.js"></script>

</body>
</html>