package com.vacationbuds.model;

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
public class Review {

	
	@Id
	@GeneratedValue(generator="increment")
	@GenericGenerator(name="increment", strategy = "increment")
	@JsonProperty
	private Long id;
	
	@Column(columnDefinition="text")
	@JsonProperty
	private String text;
	
	@Column(length=1)
	@JsonProperty
	private String type;
	
	@ManyToOne
	@JoinColumn(name = "writer", nullable = false)
	@JsonBackReference(value="writer")
	private User writer;
	
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

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public User getWriter() {
		return writer;
	}

	public void setWriter(User writer) {
		this.writer = writer;
	}

	public User getRecipiant() {
		return recipiant;
	}

	public void setRecipiant(User recipiant) {
		this.recipiant = recipiant;
	}
	
	
	
}
