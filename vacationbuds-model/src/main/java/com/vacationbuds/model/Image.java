package com.vacationbuds.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.GenericGenerator;


@Entity
public class Image {

	public Image(){
		discriminator = 'P';
	}
	
	public Image(char discriminator){
		this.discriminator = discriminator;
	}
	
	
	@Id
	@GeneratedValue(generator="increment")
	@GenericGenerator(name="increment", strategy = "increment")
	
	private Long id;
	
	private char discriminator;

	@Column(columnDefinition = "text")
	
	private String description;
	
	
	@Column(columnDefinition = "text")
	private String image;

	@ManyToOne(optional=true)
	@JoinColumn(name = "ad")
	private Ad ad;
	

	@ManyToOne(optional=true)
	@JoinColumn(name = "user_id")
	private User user;
	

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	

	public char getDiscriminator() {
		return discriminator;
	}

	public void setDiscriminator(char discriminator) {
		this.discriminator = discriminator;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	

	
	
	public Ad getAd() {
		return ad;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public void setAd(Ad ad) {
		this.ad = ad;
	}

	
	
	
}
