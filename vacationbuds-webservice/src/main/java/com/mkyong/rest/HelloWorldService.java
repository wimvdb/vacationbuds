package com.mkyong.rest;
 
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import org.springframework.transaction.annotation.Transactional;

import com.vacationbuds.dao.UserDao;
import com.vacationbuds.dao.UserDaoImpl;
import com.vacationbuds.model.User;
 
@Path("/hello")
public class HelloWorldService {
 
	/*@GET
	@Path("/{param}")
	public Response getMsg(@PathParam("param") String msg) {
 
		String output = "Jersey say : " + msg;
		return Response.status(200).entity(output).build();
 
	}*/
	
	
	
	@POST
	@Path("getUserById/{id}")
	@Produces("application/json")
	@Transactional
	public User findPersonBySsn(@PathParam("id") Long id) {
		UserDao dao = new UserDaoImpl();
		User user =dao.getUserById(id);
		return user;
	}
 
 
}