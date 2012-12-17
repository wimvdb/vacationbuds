package com.vacationbuds.dao;

import java.util.List;

import com.vacationbuds.model.Message;
import com.vacationbuds.model.Review;

public interface ReviewDao {

	boolean saveOrUpdate(Review review);
	
	boolean delete(Review review);

	Review getReviewById(Long id);

	List<Review> getReviewsByWriterId(Long writerId);

	List<Review> getReviewsByRecipiantId(Long recipiantId);
}
