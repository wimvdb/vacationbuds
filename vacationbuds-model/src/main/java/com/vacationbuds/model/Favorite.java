package com.vacationbuds.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.PrimaryKeyJoinColumn;

import org.hibernate.annotations.GenericGenerator;

@Entity

public class Favorite {

	@Id
	@GeneratedValue(generator = "increment")
	@GenericGenerator(name = "increment", strategy = "increment")
	private Long id;

	@ManyToOne
	@PrimaryKeyJoinColumn(referencedColumnName = "id")
	private User user;
	
	@ManyToOne
	@PrimaryKeyJoinColumn(referencedColumnName = "id")
	private Ad ad;
	
	public Favorite() {
		
	}
	
	public Favorite(Long id, Ad ad) {
		this.id = id;
		this.ad = ad;
	}
	
	public Favorite(User user, Ad ad) {
		this.user=user;
		this.ad = ad;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Ad getAd() {
		return ad;
	}

	public void setAd(Ad ad) {
		this.ad = ad;
	}

	@Override
	public boolean equals(Object o) {
		try {
			if (o instanceof Favorite) {
				Favorite fav = (Favorite) o;
				return fav.user.getId().equals(this.user.getId())
						&& this.ad.equals(fav.getAd());
			} else {
				return false;
			}
		} catch (Exception e) {
			e.printStackTrace();

		}
		return false;

	}
	
	

}
