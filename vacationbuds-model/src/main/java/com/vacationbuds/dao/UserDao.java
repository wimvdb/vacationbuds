package com.vacationbuds.dao;


import java.util.List;

import com.vacationbuds.model.Ad;
import com.vacationbuds.model.Favorite;
import com.vacationbuds.model.User;

public interface UserDao {
	

	long saveOrUpdate(User user);

	User getUserById(Long id);
	User getUserByUsername(String username) throws Exception;
	
	long validateUser(String username,String password) throws Exception;
	
	 List<String> getUsernames(String prefix);

	boolean validateUsername(String username);
	 
	 
}
