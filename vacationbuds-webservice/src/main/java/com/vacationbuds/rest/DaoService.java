package com.vacationbuds.rest;

import java.util.List;

import javax.annotation.PostConstruct;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;

import com.vacationbuds.dao.AdDao;
import com.vacationbuds.dao.ImageDao;
import com.vacationbuds.dao.MessageDao;
import com.vacationbuds.dao.ProfileDao;
import com.vacationbuds.dao.ReviewDao;
import com.vacationbuds.dao.UserDao;
import com.vacationbuds.model.Ad;
import com.vacationbuds.model.Message;
import com.vacationbuds.model.Review;
import com.vacationbuds.model.User;

@Path("/dao")
public class DaoService {

	@Autowired
	private AdDao adDao;

	@Autowired
	private ImageDao imageDao;

	@Autowired
	private MessageDao messageDao;

	@Autowired
	private ProfileDao profileDao;

	@Autowired
	private ReviewDao reviewDao;

	@Autowired
	private UserDao userDao;

	@GET
	@Path("getUserById/{id}")
	@Produces("application/json")
	public User getUserById(@PathParam("id") Long id) {
		// UserDao dao = new UserDaoImpl();
		// User user =dao.getUserById(id);
		User user = userDao.getUserById(id);
		// Hibernate.initialize(user);
		return user;
	}

	@POST
	@Path("saveOrUpdateUser")
	@Consumes("application/json")
	public void saveOrUpdateUser(User user) {

		userDao.saveOrUpdate(user);
	}

	
	public boolean validateUser(String username, String password) {
		return userDao.validateUser(username, password);
	}
	
	@GET
	@Path("getReviewsByWriterId/{writerId}")
	@Produces("application/json")
	public List<Review> getReviewsByWriterId(@PathParam("userId") Long writerId) {
		return reviewDao.getReviewsByWriterId(writerId);
	}
	
	@GET
	@Path("getReviewsByRecipiantId/{recipiantId}")
	@Produces("application/json")
	public List<Review> getReviewsByRecipiantId(@PathParam("userId") Long recipiantId) {
		return reviewDao.getReviewsByRecipiantId(recipiantId);
	}

	@POST
	@Path("saveOrUpdateReview")
	@Consumes("application/json")
	public boolean saveOrUpdateReview(Review review) {
		return reviewDao.saveOrUpdate(review);
	}

	@POST
	@Path("deleteReview")
	@Consumes("application/json")
	public boolean deleteReview(Review review) {
		return reviewDao.delete(review);
		
	}

	@GET
	@Path("getInboxMessagesByUserId/{userId}")
	@Produces("application/json")
	public List<Message> getInboxMessagesByUserId(@PathParam("userId") Long userId) {
		return messageDao.getInboxMessagesByUserId(userId);
	}

	@GET
	@Path("getOutboxMessagesByUserId/{userId}")
	@Produces("application/json")
	public List<Message> getOutboxMessagesByUserId(@PathParam("userId") Long userId) {
		return messageDao.getOutboxMessagesByUserId(userId);
	}

	@GET
	@Path("getMessageById/{id}")
	@Produces("application/json")
	public Message getMessageById(@PathParam("id") Long id) {
		return messageDao.getMessageById(id);
	}

	@POST
	@Path("saveOrUpdateMessage")
	@Consumes("application/json")
	public boolean saveOrUpdateMessage(Message message) {
		return messageDao.saveOrUpdate(message);
	}

	@POST
	@Path("deleteMessage")
	@Consumes("application/json")
	public boolean deleteMessage(Message message) {

		return messageDao.delete(message);
	}

	@GET
	@Path("getAdsByUserId/{userId}")
	@Produces("application/json")
	public List<Ad> getAdsByUserId(@PathParam("userId") Long userId) {
		return adDao.getAdsByUserId(userId);
	}

	@GET
	@Path("getAdById/{id}")
	@Produces("application/json")
	public Ad getAdById(@PathParam("id") Long id) {
		return adDao.getAdById(id);
	}
	
	
	@PostConstruct
	public void init() {
		SpringBeanAutowiringSupport.processInjectionBasedOnCurrentContext(this);
	}

	public AdDao getAdDao() {
		return adDao;
	}

	public void setAdDao(AdDao adDao) {
		this.adDao = adDao;
	}

	public ImageDao getImageDao() {
		return imageDao;
	}

	public void setImageDao(ImageDao imageDao) {
		this.imageDao = imageDao;
	}

	public MessageDao getMessageDao() {
		return messageDao;
	}

	public void setMessageDao(MessageDao messageDao) {
		this.messageDao = messageDao;
	}

	public ProfileDao getProfileDao() {
		return profileDao;
	}

	public void setProfileDao(ProfileDao profileDao) {
		this.profileDao = profileDao;
	}

	public ReviewDao getReviewDao() {
		return reviewDao;
	}

	public void setReviewDao(ReviewDao reviewDao) {
		this.reviewDao = reviewDao;
	}

	public UserDao getUserDao() {
		return userDao;
	}

	public void setUserDao(UserDao userDao) {
		this.userDao = userDao;
	}

	

	// String getAdsBySearchCriteria(String jsonSearchCriteria);

}