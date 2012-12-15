package com.vacationbuds.test.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.testng.AbstractTransactionalTestNGSpringContextTests;
import org.testng.annotations.Test;

import com.vacationbuds.model.User;

@Test
@ContextConfiguration(locations = { "/applicationContext-vacationbuds-model.xml" })
public class UserDaoTest extends AbstractTransactionalTestNGSpringContextTests {

	@Autowired
	private SessionFactory sessionFactory;

	public void testCreateAndStoreUser() {
		Session session = sessionFactory.getCurrentSession();
		User user = new User();
		user.setUsername("Wim");
		session.saveOrUpdate(user);
		
	}
}
