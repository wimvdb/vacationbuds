package com.vacationbuds.dao;

import java.util.List;

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
		try {
			List<User> users = sessionFactory.getCurrentSession()
					.createCriteria(User.class).add(Restrictions.idEq(id))
					.list();
			if (users.size() > 0) {
				return users.get(0);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;

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

	public long validateUser(String username, String password) throws Exception {
		List<User> users = sessionFactory.getCurrentSession()
				.createCriteria(User.class, "user")
				.add(Restrictions.eq("user.username", username))
				.add(Restrictions.eq("user.password", password)).list();
		if (users.size() > 0) {
			return users.get(0).getId();
		} else {
			throw new Exception("Bad credentials");
		}
	}

}
