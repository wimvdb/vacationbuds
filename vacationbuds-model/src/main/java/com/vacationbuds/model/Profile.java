package com.vacationbuds.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonBackReference;
import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.annotate.JsonManagedReference;
import org.codehaus.jackson.annotate.JsonProperty;

import org.hibernate.annotations.GenericGenerator;


@Entity
@Table(name="budprofile")
//@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.NONE, getterVisibility = JsonAutoDetect.Visibility.NONE)
public class Profile {

	
	@Id
	@GeneratedValue(generator="increment")
	@GenericGenerator(name="increment", strategy = "increment")
	//@JsonProperty
	private Long id;
	
	//@JsonProperty
	private String text;
	
	
	//@OneToOne
	//@PrimaryKeyJoinColumn
	//@JsonBackReference
	//private User user;

	
	//@OneToMany(fetch = FetchType.EAGER /*mappedBy = "profile"*/ )
	//@JsonManagedReference
	//private Set<Ad> ads = new HashSet<Ad>();
	
	@OneToMany(fetch = FetchType.EAGER/*mappedBy = "ad"*/)
	//@JsonManagedReference
	@JsonIgnore
	private Set<Image> images = new HashSet<Image>();
	
	
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

	public Set<Image> getImages() {
		return images;
	}

	public void setImages(Set<Image> images) {
		this.images = images;
	}

	/*public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}*/

	/*public Set<Ad> getAds() {
		return ads;
	}

	public void setAds(Set<Ad> ads) {
		this.ads = ads;
	}*/
	
	
	
	
	
}
