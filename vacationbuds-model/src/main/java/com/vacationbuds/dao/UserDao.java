package com.vacationbuds.dao;

import com.vacationbuds.model.User;

public interface UserDao {
	boolean create(String jsonUser);

	boolean update(String jsonUser);

	User getUserById(long id);
}
