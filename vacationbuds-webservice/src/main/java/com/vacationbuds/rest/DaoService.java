package com.vacationbuds.rest;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.logging.FileHandler;
import java.util.logging.Handler;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.regex.Pattern;

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

import com.vacationbuds.dao.ReviewDao;
import com.vacationbuds.dao.UserDao;
import com.vacationbuds.model.Ad;
import com.vacationbuds.model.Image;
import com.vacationbuds.model.Message;
import com.vacationbuds.model.Review;
import com.vacationbuds.model.User;

@Path("/dao")
public class DaoService {

	private static final Pattern rfc2822 = Pattern
			.compile("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$");

	@Autowired
	private AdDao adDao;

	@Autowired
	private ImageDao imageDao;

	@Autowired
	private MessageDao messageDao;


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

	@GET
	@Path("getImageById/{id}")
	@Produces("application/json")
	public String getImageById(@PathParam("id") Long id) {
		// UserDao dao = new UserDaoImpl();
		// User user =dao.getUserById(id);
		Image image = imageDao.getImageById(id);
		// Hibernate.initialize(user);
		return image.getImage();
	}
	
	@POST
	@Path("getProfileImages")
	@Produces("application/json")
	public List<Image> getProfileImages(Long id) {
		// UserDao dao = new UserDaoImpl();
		// User user =dao.getUserById(id);
		return imageDao.getImagesByUserId(id);
		
		// Hibernate.initialize(user);
		
	}
	
	@POST
	@Path("getAdImages")
	@Produces("application/json")
	public List<Image> getAdImages(Long id) {
		// UserDao dao = new UserDaoImpl();
		// User user =dao.getUserById(id);
		return imageDao.getImagesByAdId(id);
		
		// Hibernate.initialize(user);
		
	}

	/*
	 * @GET
	 * 
	 * @Path("getImageById2/{id}")
	 * 
	 * @Produces("application/json") public Response
	 * getImageById2(@PathParam("id") Long id) throws FileNotFoundException { //
	 * UserDao dao = new UserDaoImpl(); // User user =dao.getUserById(id); //
	 * Hibernate.initialize(user); File f = new File(
	 * "C:\\Users\\Wim\\git\\vacationbuds\\vacationbuds-webservice\\src\\main\\resources\\avatar.jpg"
	 * ); //return f; //BufferedImage image = ...; //ByteArrayOutputStream baos
	 * = new ByteArrayOutputStream(); //ImageIO.write(image, "png", baos);
	 * //byte[] imageData = baos.toByteArray(); //return
	 * Response.ok(imageData).build(); return Response.ok(new
	 * FileInputStream(f)).build(); }
	 */

	@POST
	@Path("saveOrUpdateUser")
	@Consumes("application/json")
	public void saveOrUpdateUser(User user) throws Exception {
		if (user.getUsername() == null || !(user.getUsername().length() > 2)) {
			throw new Exception(
					"Invalid username. minimun 3 characters required.");
		}
		if (user.getPassword() == null || !(user.getPassword().length() > 2)) {
			throw new Exception(
					"Invalid password. minimun 3 characters required.");
		}
		if (user.getEmail() == null
				|| !rfc2822.matcher(user.getEmail()).matches()) {
			throw new Exception("Invalid email.");
		}
		if (user.getGender() == null || !(user.getGender().length() == 1)) {
			throw new Exception("Gender is a required field.");
		}
		user.setActive(true);
		/*Set<Image> images = user.getProfile().getImages();
		for (Image image : images) {
			imageDao.saveOrUpdate(image);
		}*/
		userDao.saveOrUpdate(user);
	}

	@POST
	@Path("saveOrUpdateAd")
	@Consumes("application/json")
	public void saveOrUpdateAd(Ad ad) throws Exception {
		ad.setActive(true);
		adDao.saveOrUpdate(ad);
	}

	@POST
	@Path("saveAdImage")
	@Consumes("application/json")
	@Produces("application/json")
	public String saveAdImage(Image image) throws Exception {
		long adId = -1;
		image.setDiscriminator('A');
		Ad ad = image.getAd();
		
		ad.setActive(false);
		//image.setAd(ad);
		adId = adDao.saveOrUpdate(ad);
		long imgId = imageDao.saveOrUpdate(image);
		return "{ \"adId\" : " + adId + " , \"imgId\" : " + imgId + " }";
	}
	
	@POST
	@Path("saveProfileImage")
	@Consumes("application/json")
	@Produces("application/json")
	public String saveProfileImage(Image image) throws Exception {
		long userId = -1;
		long imgId = -1;
		image.setDiscriminator('P');
		User user = image.getUser();
		if(user == null){
			user = new User();
			image.setUser(user);
			user.setActive(false);
			userId = userDao.saveOrUpdate(user);
		}
		else{
			userId = user.getId();
		}
		if(image.getImage() == null){
			imageDao.setImageDescription(image.getId(),image.getDescription());
			imgId = image.getId();
		}else{
			imgId = imageDao.saveOrUpdate(image);
		}
		 
		return "{ \"profileId\" : " + userId + " , \"imgId\" : " + imgId + " }";
	}


	@POST
	@Path("deleteAdImage")
	@Consumes("application/json")
	public void deleteAdImage(Image image) {
		imageDao.deleteAdImage(image.getId(),image.getAd().getUser().getId());
	}
	
	@POST
	@Path("deleteProfileImage")
	@Consumes("application/json")
	public void deleteProfileImage(Image image) {
		imageDao.deleteProfileImage(image.getId(),image.getUser().getId());
	}

	/*
	 * public String saveOrUpdateUser(User user) throws Exception {
	 * 
	 * if(user.getUsername() == null || ! (user.getUsername().length() > 2)){
	 * return "Invalid username. minimun 3 characters required."; }
	 * if(user.getPassword() == null || ! (user.getPassword().length() > 2)){
	 * return "Invalid password. minimun 3 characters required."; }
	 * if(user.getEmail() == null ||
	 * !rfc2822.matcher(user.getEmail()).matches()) { return "Invalid email."; }
	 * if(user.getGender() == null || ! (user.getGender().length() == 1)){
	 * return "Gender is a required field."; } Set<Image> images =
	 * user.getProfile().getImages(); for (Image image : images) {
	 * imageDao.saveOrUpdate(image); } userDao.saveOrUpdate(user); return "ok";
	 * }
	 */

	@POST
	@Path("login")
	@Consumes("application/json")
	@Produces("application/json")
	public long login(String credentials) throws Exception {
		// Response.temporaryRedirect(new URI("http://www.google.com"));
		String[] loginData = credentials.split("&");
		return userDao.validateUser(loginData[0].split("=")[1],
				loginData[1].split("=")[1]);

	}

	@GET
	@Path("getReviewsByWriterId/{writerId}")
	@Produces("application/json")
	public List<Review> getReviewsByWriterId(
			@PathParam("writerId") Long writerId) {
		return reviewDao.getReviewsByWriterId(writerId);
	}

	@GET
	@Path("getReviewsByRecipiantId/{recipiantId}")
	@Produces("application/json")
	public List<Review> getReviewsByRecipiantId(
			@PathParam("recipiantId") Long recipiantId) {
		return reviewDao.getReviewsByRecipiantId(recipiantId);
	}

	@POST
	@Path("saveOrUpdateReview")
	@Consumes("application/json")
	public long saveOrUpdateReview(Review review) {
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
	public List<Message> getInboxMessagesByUserId(
			@PathParam("userId") Long userId) {
		return messageDao.getInboxMessagesByUserId(userId);
	}

	@GET
	@Path("getOutboxMessagesByUserId/{userId}")
	@Produces("application/json")
	public List<Message> getOutboxMessagesByUserId(
			@PathParam("userId") Long userId) {
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
	public long saveOrUpdateMessage(Message message) {
		return messageDao.saveOrUpdate(message);
	}

	@POST
	@Path("deleteMessage")
	@Consumes("application/json")
	public boolean deleteMessage(Message message) {

		return messageDao.delete(message);
	}

	@POST
	@Path("getAdsByUserId")
	@Produces("application/json")
	public List<Ad> getAdsByUserId(Long userId) {
		return adDao.getAdsByUserId(userId);
	}
	
	/*@POST
	@Path("getProfileImages/{id}")
	@Produces("application/json")
	public List<Image> getProfileImages(@PathParam("id") Long id) {
		// UserDao dao = new UserDaoImpl();
		// User user =dao.getUserById(id);
		return imageDao.getImagesByUserId(id);
		
		// Hibernate.initialize(user);
		
	}*/

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