package com.vacationbuds.rest;
 
import javax.annotation.PostConstruct;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.mrbean.MrBeanModule;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;

import com.vacationbuds.dao.UserDao;
import com.vacationbuds.dao.UserDaoImpl;
import com.vacationbuds.model.User;
 
@Path("/dao")
public class DaoService {
 
	
	
	public DaoService(){
		
		
	}
	
	@Autowired
	private UserDao userDao;
	
	
	@POST
	@Path("getUserById/{id}")
	@Produces("application/json")
	public User getUserById(@PathParam("id") Long id) {
		//UserDao dao = new UserDaoImpl();
		//User user =dao.getUserById(id);
		User user = userDao.getUserById(id);
		//Hibernate.initialize(user);
		return user;
	}
	
	@POST
	@Path("saveOrUpdate")
	@Consumes("application/json")
	public void saveOrUpdate( User user){
		
		
		userDao.saveOrUpdate(user);
	}


	public UserDao getUserDao() {
		return userDao;
	}


	public void setUserDao(UserDao userDao) {
		this.userDao = userDao;
	}
	
	@PostConstruct
	public void init() {
	    SpringBeanAutowiringSupport.processInjectionBasedOnCurrentContext(this);
	}
 
	
 
}