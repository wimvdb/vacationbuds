package com.vacationbuds.dao;

import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.transaction.annotation.Transactional;

import com.vacationbuds.model.Message;
import com.vacationbuds.model.Profile;
import com.vacationbuds.model.Review;

@Transactional
public class ReviewDaoImpl extends HibernateTemplate implements ReviewDao {

	@Autowired
	private SessionFactory sessionFactory;

	public Review getReviewById(Long id) {

		try {
			List<Review> reviews = sessionFactory.getCurrentSession()
					.createCriteria(Review.class).add(Restrictions.idEq(id))
					.list();
			if (reviews.size() > 0) {
				return reviews.get(0);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;

	}

	public boolean saveOrUpdate(Review review) {
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(review);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public boolean delete(Review review) {
		try {
			sessionFactory.getCurrentSession().delete(review);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public List<Review> getReviewsByWriterId(Long writerId) {
		return  (List<Review>)  sessionFactory.getCurrentSession()
				.createCriteria(Review.class,"review")
				.add(Restrictions.eq("review.writer.id",writerId)).list();
	}

	public List<Review> getReviewsByRecipiantId(Long recipiantId) {
		return  (List<Review>)  sessionFactory.getCurrentSession()
				.createCriteria(Review.class,"review")
				.add(Restrictions.eq("review.recipiant.id",recipiantId)).list();
	}


}
