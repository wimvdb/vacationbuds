package com.vacationbuds.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonBackReference;
import org.codehaus.jackson.annotate.JsonProperty;
import org.hibernate.annotations.GenericGenerator;

@Entity
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.NONE, getterVisibility = JsonAutoDetect.Visibility.NONE)
public class Message {

	
	@Id
	@GeneratedValue(generator="increment")
	@GenericGenerator(name="increment", strategy = "increment")
	@JsonProperty
	private Long id;
	
	@Column(length=25)
	@JsonProperty
	private String title;
	@Column(columnDefinition="text")
	@JsonProperty
	private String text;
	
	@JsonProperty
	private Date sendDate;
	
	@ManyToOne
	@JoinColumn(name = "sender", nullable = false)
	@JsonBackReference(value="sender")
	private User sender;
	
	@ManyToOne
	@JoinColumn(name = "recipiant", nullable = false)
	@JsonBackReference(value="recipiant")
	private User recipiant;
	
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
	public User getRecipiant() {
		return recipiant;
	}
	public void setRecipiant(User recipiant) {
		this.recipiant = recipiant;
	}
	
	
	
	
}
