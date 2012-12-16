package com.vacationbuds.model;

import javax.persistence.Column;
import javax.persistence.Entity;

import org.codehaus.jackson.annotate.JsonProperty;

@Entity
public class HostingAd extends Ad {

	@Column(length=50)
	//@JsonProperty
	private String country;
	
	@Column(length=50)
	//@JsonProperty
	private String city;
	
	@Column(length=50)
	//@JsonProperty
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
