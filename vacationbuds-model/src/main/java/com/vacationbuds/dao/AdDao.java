package com.vacationbuds.dao;

import java.util.List;

import com.vacationbuds.model.Ad;

public interface AdDao {

	boolean saveOrUpdate(Ad ad);

	Ad getAdById(Long id);
	
	 List<Ad> getAdsByUserId(Long id);
	 
	 //List<Ad> getAdsBySearchCriteria(SearchCriteria searchCriteria);
}
