package com.vacationbuds.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.transaction.annotation.Transactional;

import com.vacationbuds.model.User;

@Transactional
public class UserDaoImpl implements UserDao {


	@PersistenceContext
	private EntityManager entityManager;

	public User getUserById(Long id) {
		return entityManager.find(User.class, id);

	}

	public long saveOrUpdate(User user) {
		if (user.getId() == null) {
			entityManager.persist(user);
			return user.getId();
		} else {
			return entityManager.merge(user).getId();
		}
	}

	public long validateUser(String username, String password) throws Exception {
		List<User> users = entityManager
				.createQuery(
						"select u from User u where username=:username and password=:password",
						User.class).setParameter("username", username)
				.setParameter("password", password).getResultList();

		if (users.size() > 0) {
			return users.get(0).getId();
		} else {
			throw new Exception("Bad credentials");
		}
	}

	public User getUserByUsername(String username) throws Exception {
		List<User> users = entityManager
				.createQuery(
						"select u from User u where username=:username",
						User.class).setParameter("username", username)
				.getResultList();
		if (users.size() > 0) {
			return users.get(0);
		} else {
			throw new Exception("User with username : "+username +" not found!");
		}
	}
	
	public List<String> getUsernames(String prefix){
		return entityManager
		.createQuery(
				"select username from User  where lower(username) like :prefix").setParameter("prefix", prefix.toLowerCase() +"%").setMaxResults(10).getResultList();
	}
	

}
