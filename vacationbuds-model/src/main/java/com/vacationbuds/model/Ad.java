package com.vacationbuds.model;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.annotate.JsonTypeInfo;
import org.codehaus.jackson.map.annotate.JsonDeserialize;
import org.hibernate.annotations.GenericGenerator;

import com.vacationbuds.util.CustomDateDeSerializer;
import com.vacationbuds.util.UserDeSerializer;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@JsonTypeInfo(use = JsonTypeInfo.Id.CLASS, include = JsonTypeInfo.As.PROPERTY, property = "@type")
@DiscriminatorColumn(
	    name="adtype",
	    discriminatorType=DiscriminatorType.CHAR
	)
@DiscriminatorValue("H")
public class Ad {

	@Id
	@GeneratedValue(generator = "increment")
	@GenericGenerator(name = "increment", strategy = "increment")
	// @JsonProperty
	private Long id;

	@Column(length = 100)
	// @JsonProperty
	private String title;

	@Column(length = 50)
	// @JsonProperty
	private String country;

	@Column(length = 50)
	// @JsonProperty
	private String city;
	
	private int expenses;

	@Column(columnDefinition = "text")
	private String text;

	/*@JsonSerialize(using = CustomDateSerializer.class)*/
	@JsonDeserialize(using = CustomDateDeSerializer.class)
	private Date placeOn;
	
	/*@JsonSerialize(using = CustomDateSerializer.class)*/
	@JsonDeserialize(using = CustomDateDeSerializer.class)
	private Date expireOn;
	
	private boolean active;

	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	// @JsonBackReference
	private User user;

	@OneToMany(fetch = FetchType.EAGER)
	@JoinColumn(name = "ad")
	// @JsonManagedReference
	private Set<Image> images = new HashSet<Image>();

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

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}


	public Date getPlaceOn() {
		return placeOn;
	}

	public void setPlaceOn(Date placeOn) {
		this.placeOn = placeOn;
	}

	
	public Date getExpireOn() {
		return expireOn;
	}

	public void setExpireOn(Date expireOn) {
		this.expireOn = expireOn;
	}
	
	public int getExpenses() {
		return expenses;
	}

	public void setExpenses(int expenses) {
		this.expenses = expenses;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Set<Image> getImages() {
		return images;
	}

	@JsonIgnore
	public void setImages(Set<Image> images) {
		this.images = images;
	}

}
