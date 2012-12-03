package com.vacationbuds.test.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.testng.annotations.Test;

import com.vacationbuds.model.User;

@Test
@ContextConfiguration(locations = { "/applicationContext.xml" })
public class UserDaoTest {

	
	private SessionFactory sessionFactory;
	
	
	public void testCreateAndStoreUser() {
		Session session = sessionFactory.getCurrentSession();
		session.beginTransaction();
		User user = new User();
		user.setUsername("Wim");
		session.save(user);
		session.getTransaction().commit();
	}


	

	
	
	

}
