package com.vacationbuds.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.transaction.annotation.Transactional;

import com.vacationbuds.model.Ad;
import com.vacationbuds.model.Favorite;
import com.vacationbuds.model.User;

@Transactional
public class UserDaoImpl implements UserDao {

	@PersistenceContext
	private EntityManager entityManager;

	public User getUserById(Long id) {
		List<User> users = entityManager
				.createQuery(
						"select new User(id, username, active, age,  avatar,  country,  description, email,  gender) from User u where id=:id",
						User.class).setParameter("id", id).getResultList();
		if (users.size() > 0) {
			return users.get(0);
		} else {
			return null;
		}

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
						"select new User(id, username, active, age,  avatar,  country,  description, email,  gender) from User u where username=:username and password=:password",
						User.class).setParameter("username", username)
				.setParameter("password", password).getResultList();

		if (users.size() > 0) {
			return users.get(0).getId();
		} else {
			throw new Exception("Bad credentials");
		}
	}

	public User getUserByUsername(String username) throws Exception {
		List<User> users = entityManager.createQuery("select new User(id, username, active, age,  avatar,  country,  description, email,  gender) from User u where username=:username",User.class).setParameter("username", username).getResultList();
		if (users.size() > 0) {
			return users.get(0);
		} else {
			throw new Exception("User with username : " + username
					+ " not found!");
		}
	}

	public List<String> getUsernames(String prefix) {
		return entityManager
				.createQuery(
						"select username from User  where lower(username) like :prefix")
				.setParameter("prefix", prefix.toLowerCase() + "%")
				.setMaxResults(10).getResultList();
	}

	public boolean validateUsername(String username) {
		List<String> users =   entityManager.createQuery("select username from User  where lower(username) = :username",String.class).setParameter("username", username.toLowerCase()).getResultList();
		//List<User> users = entityManager.createQuery("select new User(id, username) from User u where u.username='wim321'",User.class).setParameter("username", username).getResultList();
		return users.size() != 0;

	}

}
