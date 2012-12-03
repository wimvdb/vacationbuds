package com.vacationbuds.model;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
public class HostingAd extends Ad {

	@Column(length=50)
	private String country;
	
	@Column(length=50)
	private String city;
	
	@Column(length=50)
	private String area;
	
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
	public String getArea() {
		return area;
	}
	public void setArea(String area) {
		this.area = area;
	}
	
	
}
