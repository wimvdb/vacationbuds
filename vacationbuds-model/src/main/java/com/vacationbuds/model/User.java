package com.vacationbuds.model;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.annotate.JsonProperty;
import org.hibernate.annotations.GenericGenerator;


@Entity
@Table(name="buduser")
//@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.NONE, getterVisibility = JsonAutoDetect.Visibility.NONE)
public class User {

	@Id
	@GeneratedValue(generator="increment")
	@GenericGenerator(name="increment", strategy = "increment")
	//@JsonProperty
	private Long id;
	
	@Column(length=25)
	//@JsonProperty
	private String username;
	@Column(length=25)
	
	private String password;
	@Column(length=50)
	//@JsonProperty
	private String email;
	
	private String country;
	//@JsonProperty
	private int age;
	//@JsonIgnore
	//private byte[] avatar;
	@Column(columnDefinition = "text")
	private String avatar;
	
	@Column(columnDefinition="text")
	//@JsonProperty
	private String description;
	
	@Column(length=1)
	//@JsonProperty
	private String gender;
	

	@OneToOne(fetch = FetchType.EAGER/*, mappedBy = "user"*/, cascade = CascadeType.ALL)
	//@JsonManagedReference
	private Profile profile;
	
	/*@OneToMany(mappedBy = "sender")
	//@JsonManagedReference(value="sender")
	private Set<Message> messagesInbox = new HashSet<Message>();
	
	@OneToMany(mappedBy = "recipiant")
	//@JsonManagedReference(value="recipiant")
	private Set<Message> messagesOutbox = new HashSet<Message>();
	
	
	@OneToMany(mappedBy = "writer")
	//@JsonManagedReference(value="writer")
	private Set<Review> reviewsGiven = new HashSet<Review>();
	
	@OneToMany(mappedBy = "recipiant")
	//@JsonManagedReference(value="recipiant")
	private Set<Review> reviewsReceived = new HashSet<Review>();*/
	
	public Long getId() {
		return id;
	}
	
	private void setId(Long id) {
		this.id = id;
	}
	
	public String getUsername() {
		return username;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}

	@JsonIgnore
	public String getPassword() {
		return password;
	}
	@JsonProperty
	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	/*public byte[] getAvatar() {
		return avatar;
	}

	public void setAvatar(byte[] avatar) {
		this.avatar = avatar;
	}*/

	
	
	public String getDescription() {
		return description;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	/*public Set<Message> getMessagesInbox() {
		return messagesInbox;
	}

	public void setMessagesInbox(Set<Message> messagesInbox) {
		this.messagesInbox = messagesInbox;
	}

	public Set<Message> getMessagesOutbox() {
		return messagesOutbox;
	}

	public void setMessagesOutbox(Set<Message> messagesOutbox) {
		this.messagesOutbox = messagesOutbox;
	}*/

	public Profile getProfile() {
		return profile;
	}

	public void setProfile(Profile profile) {
		this.profile = profile;
	}

	/*public Set<Review> getReviewsGiven() {
		return reviewsGiven;
	}

	public void setReviewsGiven(Set<Review> reviewsGiven) {
		this.reviewsGiven = reviewsGiven;
	}

	public Set<Review> getReviewsReceived() {
		return reviewsReceived;
	}

	public void setReviewsReceived(Set<Review> reviewsReceived) {
		this.reviewsReceived = reviewsReceived;
	}*/

	

	
	
	
	
	
	
	
	
	
}
