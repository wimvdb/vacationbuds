package com.vacationbuds.model;

import java.util.Date;

import javax.persistence.Entity;

@Entity
public class VacationAd extends Ad {

	private String destionationCountry;
	private String destionationCity;
	private Date dateOfDeparture;
	private int duration;
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
