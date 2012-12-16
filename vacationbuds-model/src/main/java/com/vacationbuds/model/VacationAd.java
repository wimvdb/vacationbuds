package com.vacationbuds.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;

import org.codehaus.jackson.annotate.JsonProperty;

@Entity
public class VacationAd extends Ad {

	@Column(length=50)
	//@JsonProperty
	private String destionationCountry;
	
	@Column(length=50)
	//@JsonProperty
	private String destionationCity;
	
	//@JsonProperty
	private Date dateOfDeparture;
	
	//@JsonProperty
	private int duration;
	
	//@JsonProperty
	private Date dateOfExpiration;
	
	public String getDestionationCountry() {
		return destionationCountry;
	}
	public void setDestionationCountry(String destionationCountry) {
		this.destionationCountry = destionationCountry;
	}
	public String getDestionationCity() {
		return destionationCity;
	}
	public void setDestionationCity(String destionationCity) {
		this.destionationCity = destionationCity;
	}
	public Date getDateOfDeparture() {
		return dateOfDeparture;
	}
	public void setDateOfDeparture(Date dateOfDeparture) {
		this.dateOfDeparture = dateOfDeparture;
	}
	public int getDuration() {
		return duration;
	}
	public void setDuration(int duration) {
		this.duration = duration;
	}
	public Date getDateOfExpiration() {
		return dateOfExpiration;
	}
	public void setDateOfExpiration(Date dateOfExpiration) {
		this.dateOfExpiration = dateOfExpiration;
	}
	
	
	
	
}
