package com.vacationbuds.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.transaction.annotation.Transactional;

import com.vacationbuds.model.Review;

@Transactional
public class ReviewDaoImpl  implements ReviewDao {

	

	
	@PersistenceContext
	private EntityManager entityManager;

	public Review getReviewById(Long id) {

		return entityManager.find(Review.class, id);

	}

	public long saveOrUpdate(Review review) {
		if (review.getId() == null) {
			entityManager.persist(review);
			return review.getId();
		} else {
			return entityManager.merge(review).getId();
		}
	}

	public boolean delete(Review review) {
		try {
			entityManager.remove(review);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public List<Review> getReviewsByWriterId(Long writerId) {
		return entityManager.createQuery("select w from Message w where w.writer.id :=id").setParameter("id", writerId).getResultList();
	}

	public List<Review> getReviewsByRecipiantId(Long recipiantId) {
		return entityManager.createQuery("select w from Message w where w.recipiant.id :=id").setParameter("id", recipiantId).getResultList();	
	}
	

}
