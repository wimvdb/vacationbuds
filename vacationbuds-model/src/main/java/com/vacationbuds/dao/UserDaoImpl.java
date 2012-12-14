package com.vacationbuds.dao;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.vacationbuds.model.User;

@Transactional
public class UserDaoImpl implements UserDao {

	@Autowired
	private SessionFactory sessionFactory;
	
	public boolean create(String jsonUser) {
		// TODO Auto-generated method stub
		return false;
	}

	public boolean update(String jsonUser) {
		// TODO Auto-generated method stub
		return false;
	}

	public User getUserById(long id) {
		
		User user = new User();
		user.setUsername("WimVDB");
		return user;
	}

	/*boolean validateUser(String username, String password);

	boolean createUser(String jsonUser);

	boolean updateUser(String jsonUser);

	String getUserById(long id);

	boolean createReview(String jsonReview);

	boolean deleteReviewById(long id);

	boolean updateReview(String jsonReview);

	String getInboxMessagesByUserId(long id);

	String getOutboxMessagesByUserId(long id);

	String getMessageById(long id);

	boolean createMessage(String jsonMessage);

	boolean deleteMessageById(long id);

	String getAdsByUserId(long id);

	String getAdById(long id);

	String getAdsBySearchCriteria(String jsonSearchCriteria);*/
	
	
	

}
