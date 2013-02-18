package com.vacationbuds.dao;

import java.util.List;

import com.vacationbuds.model.Ad;
import com.vacationbuds.util.SearchCriteria;

public interface AdDao {

	long saveOrUpdate(Ad ad);

	Ad getAdById(Long id);
	
	 List<Ad> getAdsByUserId(Long id);

	void deletaAd(long adId, long userId);
	
	List<Ad> search(SearchCriteria searchCriteria);
	 
	
}
