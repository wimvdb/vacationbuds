package com.vacationbuds.util;

import java.util.*;
import javax.mail.*;
import javax.mail.Message.RecipientType;
import javax.mail.internet.*;
import javax.activation.*;

public class MailUtil {

	

	public void sendMail(String sender,String recipiant,String subject, String body) throws MessagingException {

		Message message = new MimeMessage(getSession());

		message.addFrom(new InternetAddress[] { new InternetAddress(
				sender) });
		
		message.addRecipient(RecipientType.TO, new InternetAddress(
				recipiant));
		
		message.setSubject(subject);

		message.setContent(body, "text/plain");

		Transport.send(message);

	}

	private Session getSession() {

		Authenticator authenticator = new Authenticator();

		Properties properties = new Properties();

		properties.setProperty("mail.smtp.submitter", authenticator
				.getPasswordAuthentication().getUserName());

		properties.setProperty("mail.smtp.auth", "true");

		properties.setProperty("mail.smtp.host", "mail.vacationbuds.hostjava.net");

		properties.setProperty("mail.smtp.port", "25");

		return Session.getInstance(properties, authenticator);

	}

	private class Authenticator extends javax.mail.Authenticator {

		private PasswordAuthentication authentication;

		public Authenticator() {

			String username = "vacation";

			String password = "8gzDX8k27m";

			authentication = new PasswordAuthentication(username, password);

		}

		protected PasswordAuthentication getPasswordAuthentication() {

			return authentication;

		}

	

}
	
	

}



	
