package com.vacationbuds.dao;

import com.vacationbuds.model.Review;

public interface ReviewDao {

	boolean saveOrUpdate(Review review);
	
	boolean delete(Review review);

	Review getReviewById(Long id);
}
