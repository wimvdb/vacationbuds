package com.vacationbuds.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.annotate.JsonProperty;
import org.codehaus.jackson.map.annotate.JsonDeserialize;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.hibernate.annotations.GenericGenerator;

import com.vacationbuds.util.CustomDateDeSerializer;
import com.vacationbuds.util.CustomDateSerializer;

@Entity
@Table(name = "buduser")
public class User {

	public User() {

	}

	public User(Long id,String username) {
		this.id = id;
		this.username = username;
	}
	
	public User(Long id) {
		this.id = id;
	}

	public User(Long id, String username, /*String password,*/ boolean active,
			Date birthday, String avatar, String country, String description,
			String email, String gender) {
		this.id = id;
		this.username = username;
		//this.password = password;
		this.active = active;
		this.birthday=birthday;
		this.avatar = avatar;
		this.country = country;
		this.description = description;
		this.email = email;
		this.gender=gender;

	}

	@Id
	@GeneratedValue(generator = "increment")
	@GenericGenerator(name = "increment", strategy = "increment")
	private Long id;

	@Column(length = 25)
	private String username;
	@Column(length = 25)
	private String password;
	@Column(length = 50)
	private String email;

	private String country;

	@JsonSerialize(using = CustomDateSerializer.class)
	@JsonDeserialize(using = CustomDateDeSerializer.class)
	private Date birthday;

	@Column(columnDefinition = "text")
	private String avatar;

	@Column(columnDefinition = "text")
	private String description;

	@Column(length = 1)
	private String gender;

	private boolean active;

	/*@OneToMany
	@JsonIgnore
	private List<Favorite> favorites = new ArrayList<Favorite>();*/

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

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

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

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

	/*public List<Favorite> getFavorites() {
		return favorites;
	}

	public void setFavorites(List<Favorite> favorites) {
		this.favorites = favorites;
	}*/

	

}
