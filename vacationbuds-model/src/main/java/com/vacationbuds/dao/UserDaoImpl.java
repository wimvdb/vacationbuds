package com.vacationbuds.dao;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.transaction.annotation.Transactional;

import com.vacationbuds.model.User;

@Transactional
public class UserDaoImpl extends HibernateTemplate implements UserDao {

	@Autowired
	private SessionFactory sessionFactory;

	public User getUserById(Long id) {

		return (User) sessionFactory.getCurrentSession()
				.createCriteria(User.class, "u")
				.add(Restrictions.idEq(id)).list().iterator().next();

	}

	public boolean saveOrUpdate(User user) {
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(user);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	/*
	 * boolean validateUser(String username, String password);
	 * 
	 * boolean createUser(String jsonUser);
	 * 
	 * boolean updateUser(String jsonUser);
	 * 
	 * String getUserById(long id);
	 * 
	 * boolean createReview(String jsonReview);
	 * 
	 * boolean deleteReviewById(long id);
	 * 
	 * boolean updateReview(String jsonReview);
	 * 
	 * String getInboxMessagesByUserId(long id);
	 * 
	 * String getOutboxMessagesByUserId(long id);
	 * 
	 * String getMessageById(long id);
	 * 
	 * boolean createMessage(String jsonMessage);
	 * 
	 * boolean deleteMessageById(long id);
	 * 
	 * String getAdsByUserId(long id);
	 * 
	 * String getAdById(long id);
	 * 
	 * String getAdsBySearchCriteria(String jsonSearchCriteria);
	 */

}
