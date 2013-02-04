package com.vacationbuds.util;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.DeserializationContext;
import org.springframework.beans.factory.annotation.Autowired;

import com.vacationbuds.dao.UserDao;
import com.vacationbuds.dao.UserDaoImpl;
import com.vacationbuds.model.User;

public class UserDeSerializer extends
		org.codehaus.jackson.map.JsonDeserializer<User> {

	@Autowired
	private UserDao userDao;
	
	@Override
	public User deserialize(JsonParser parser, DeserializationContext context)
			throws IOException, JsonProcessingException {
		String text = parser.getText();
		return userDao.getUserById(Long.parseLong(text));
		
		
	}

	public UserDao getUserDao() {
		return userDao;
	}

	public void setUserDao(UserDao userDao) {
		this.userDao = userDao;
	}

	
	
	

}
