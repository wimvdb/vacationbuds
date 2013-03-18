<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>New Message</title>

<link rel="stylesheet"
	href="http://code.jquery.com/ui/1.10.0/themes/base/jquery-ui.css">
<link rel="stylesheet" href="../css/messages/messages.css">
<link rel="stylesheet" href="../css/navigation.css">
<link rel="stylesheet" href="../css/messages/new-message.css">
<link href='http://fonts.googleapis.com/css?family=Special+Elite'
	rel='stylesheet' type='text/css'>
</head>
<body>
	<div id="content">
		<?php include("../includes/navigation.html");?>
		<div class="hfeed">
			<article id="ad" class="entry post">
				<h1>New Message</h1>
				<fieldset>
					<legend>Message</legend>
					<div class="message-text">
						<label>Recipient :</label>
						<div class="editable-text">
							<div>
								<div data-type="editable" data-updatable='true'
									data-for="#recipient"></div>
								<input id="recipient" type="text" title="Recipient name" name="recipient" />
								<div class="error"></div>
							</div>
						</div>
					</div>
					<div class="message-text">
						<label>Title :</label>
						<div class="editable-text">
							<div>
								<div data-type="editable" data-updatable='true'
									data-for="#title"></div>
								<input id="title" type="text" title="Message title" name="title" />
							</div>
						</div>
					</div>
				</fieldset>
				<fieldset >
					<legend>Content</legend>
					<div class="body-content">
						<div class="editable-text">
							<div>
								<pre id="body-div" data-type="editable"
									data-updatable='true' data-for="#message-body"></pre>
							</div>
						</div>
					</div>
					<textarea id="message-body" rows="25" name="description"></textarea>
				</fieldset>
				<div id="send-div">
					<input id="send" type="submit" onclick="sendMessage();" value="Send">
				</div>
			</article>
		</div>


	</div>
	<script
		src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.js"></script>
	<script
		src="//ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.js"></script>
	<script src="../script/general.js"></script>
	<script src="../script/navigation.js"></script>
	<script src="../script/messages/new-message.js"></script>
	
	<script src="../script/jquery.editable-1.0.1.js"></script>

</body>
</html>