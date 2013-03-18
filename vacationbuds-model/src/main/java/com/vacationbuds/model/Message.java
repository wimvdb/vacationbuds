package com.vacationbuds.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.codehaus.jackson.map.annotate.JsonDeserialize;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.hibernate.annotations.GenericGenerator;

import com.vacationbuds.util.CustomDateTimeDeSerializer;
import com.vacationbuds.util.CustomDateTimeSerializer;

@Entity
public class Message {

	public Message() {

	}

	public Message(Long id, String title, String text, Date sendDate,
			String recipient, Long recipientId, String sender, Long senderId) {
		this.id = id;
		this.title = title;
		this.text = text;
		this.sendDate = sendDate;
		this.recipient = new User(recipientId, recipient);
		this.sender = new User(senderId,sender);

	}

	@Id
	@GeneratedValue(generator = "increment")
	@GenericGenerator(name = "increment", strategy = "increment")
	private Long id;

	@Column(length = 125)
	private String title;
	@Column(columnDefinition = "text")
	private String text;

	@Column
	private boolean inboxRemoved;
	@Column
	private boolean outboxRemoved;

	@JsonSerialize(using = CustomDateTimeSerializer.class)
	@JsonDeserialize(using = CustomDateTimeDeSerializer.class)
	private Date sendDate;

	@ManyToOne
	@JoinColumn(name = "sender", nullable = false)
	private User sender;

	@ManyToOne
	@JoinColumn(name = "recipiant", nullable = false)
	private User recipient;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public User getSender() {
		return sender;
	}

	public void setSender(User sender) {
		this.sender = sender;

	}

	public Date getSendDate() {
		return sendDate;
	}

	public void setSendDate(Date sendDate) {
		this.sendDate = sendDate;
	}

	public User getRecipient() {
		return recipient;
	}

	public void setRecipient(User recipient) {
		this.recipient = recipient;
	}

	public boolean isInboxRemoved() {
		return inboxRemoved;
	}

	public void setInboxRemoved(boolean inboxRemoved) {
		this.inboxRemoved = inboxRemoved;
	}

	public boolean isOutboxRemoved() {
		return outboxRemoved;
	}

	public void setOutboxRemoved(boolean outboxRemoved) {
		this.outboxRemoved = outboxRemoved;
	}

}
