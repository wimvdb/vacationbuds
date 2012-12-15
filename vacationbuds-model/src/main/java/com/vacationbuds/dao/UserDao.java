package com.vacationbuds.dao;


import com.vacationbuds.model.User;

public interface UserDao {
	

	boolean saveOrUpdate(User user);

	User getUserById(Long id);
}
