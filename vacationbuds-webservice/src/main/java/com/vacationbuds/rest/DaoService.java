package com.vacationbuds.rest;

import java.io.File;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
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
import com.vacationbuds.dao.FavoriteDao;
import com.vacationbuds.dao.ImageDao;
import com.vacationbuds.dao.MessageDao;
import com.vacationbuds.dao.ReviewDao;
import com.vacationbuds.dao.UserDao;
import com.vacationbuds.model.Ad;
import com.vacationbuds.model.Image;
import com.vacationbuds.model.Message;
import com.vacationbuds.model.Review;
import com.vacationbuds.model.User;
import com.vacationbuds.util.SearchCriteria;
import com.vacationbuds.util.MailUtil;

@Path("/dao")
public class DaoService {

	private static final Pattern rfc2822 = Pattern
			.compile("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$");

	private static String OS = System.getProperty("os.name").toLowerCase();

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

	@Autowired
	private FavoriteDao favoriteDao;

	private MailUtil sendMail = new MailUtil();

	@POST
	@Path("getUserById")
	@Produces("application/json")
	public User getUserById(Long id) {
		User user = userDao.getUserById(id);
		return user;
	}

	@GET
	@Path("getImageById/{id}")
	@Produces("application/json")
	public String getImageById(@PathParam("id") Long id) {
		Image image = imageDao.getImageById(id);
		return image.getImage();
	}

	@POST
	@Path("getProfileImages")
	@Produces("application/json")
	public List<Image> getProfileImages(Long id) {
		return imageDao.getImagesByUserId(id);
	}

	@POST
	@Path("getAdImages")
	@Produces("application/json")
	public List<Image> getAdImages(Long id) {
		return imageDao.getImagesByAdId(id);
	}

	@POST
	@Path("createUser")
	@Consumes("application/json")
	public void createUser(User user) throws Exception {
		if (user.getId() == null
				&& (user.getUsername() == null || user.getUsername().length() < 2)) {
			throw new Exception(
					"Invalid username. minimun 3 characters required.");
		}
		if (user.getId() == null
				&& (user.getPassword() == null || user.getPassword().length() < 2)) {
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
		userDao.saveOrUpdate(user);
		
			try {
				sendMail.sendMail(
						"noreply@vacationbuds.com",
						user.getEmail(),
						"Welcome to vacationbuds",
						"Hello "
								+ user.getUsername()
								+ ",\n\n"
								+ "You registered at vacationbuds.com with : \n\nUsername : "
								+ user.getUsername() + "\nPassword : "
								+ user.getPassword() + "\n");
			} catch (Exception e) {
				e.printStackTrace();
			}
		
	}
	
	@POST
	@Path("saveOrUpdateUser")
	@Consumes("application/json")
	public void saveOrUpdateUser(User user) throws Exception {
		if (user.getId() == null
				&& (user.getUsername() == null || user.getUsername().length() < 2)) {
			throw new Exception(
					"Invalid username. minimun 3 characters required.");
		}
		if (user.getId() == null
				&& (user.getPassword() == null || user.getPassword().length() < 2)) {
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
		userDao.saveOrUpdate(user);
	}
	

	@POST
	@Path("saveOrUpdateAd")
	@Consumes("application/json")
	public void saveOrUpdateAd(Ad ad) throws Exception {
		ad.setActive(true);
		if (ad.getPlaceOn() == null) {
			ad.setPlaceOn(new Date());
		}
		if (ad.getExpireOn() == null) {
			Calendar today_plus_year = Calendar.getInstance();
			today_plus_year.add(Calendar.YEAR, 1);
			ad.setExpireOn(today_plus_year.getTime());
		}
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
		adId = adDao.saveOrUpdate(ad);
		long imgId = imageDao.saveOrUpdate(image);
		String result = "{ \"adId\" : " + adId + " , \"imgId\" : " + imgId
				+ " }";
		return result;
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
		if (user == null) {
			user = new User();
			image.setUser(user);
			user.setActive(false);
			userId = userDao.saveOrUpdate(user);
		} else {
			userId = user.getId();
		}
		if (image.getImage() == null) {
			imageDao.setImageDescription(image.getId(), image.getDescription());
			imgId = image.getId();
		} else {
			imgId = imageDao.saveOrUpdate(image);
		}

		return "{ \"profileId\" : " + userId + " , \"imgId\" : " + imgId + " }";
	}

	@POST
	@Path("deleteAdImage")
	@Consumes("application/json")
	public void deleteAdImage(Image image) {
		imageDao.deleteAdImage(image.getId(), image.getAd().getUser().getId());
		deleteAdImageFile(image);
	}

	@POST
	@Path("deleteProfileImage")
	@Consumes("application/json")
	public void deleteProfileImage(Image image) {
		imageDao.deleteProfileImage(image.getId(), image.getUser().getId());
		deleteProfileImageFile(image);

	}

	private void deleteProfileImageFile(Image image) {
		try {
			String[] dirPieces = image.getImage().split("/");
			String imageFileLoc = "";
			if (isWindows()) {
				imageFileLoc = "C:\\Users\\Wim\\git\\vacationbuds\\vacationbuds-web\\WebContent\\images\\user-pics\\"
						+ dirPieces[3] + "\\" + dirPieces[4];
			} else {
				imageFileLoc = "/home/vacation/public_html/main/images/user-pics/"
						+ dirPieces[3] + "/" + dirPieces[4];
			}
			if (dirPieces[3].equals("default")
					|| dirPieces[3].equals(image.getUser().getId().toString())) {
				File imageFile = new File(imageFileLoc);
				imageFile.delete();
			} else {
				System.out.println("User " + image.getUser().getId()
						+ " is trying to delete  " + imageFileLoc);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private void deleteAdImageFile(Image image) {
		try {
			String[] dirPieces = image.getImage().split("/");
			String imageFileLoc = "";
			if (isWindows()) {
				imageFileLoc = "C:\\Users\\Wim\\git\\vacationbuds\\vacationbuds-web\\WebContent\\images\\user-pics\\"
						+ dirPieces[3] + "\\" + dirPieces[4];
			} else {
				imageFileLoc = "/home/vacation/public_html/main/images/user-pics/"
						+ dirPieces[3] + "/" + dirPieces[4];
			}
			if (dirPieces[3].equals("default")
					|| dirPieces[3].equals(image.getAd().getUser().getId()
							.toString())) {
				File imageFile = new File(imageFileLoc);
				imageFile.delete();
			} else {
				System.out.println("User " + image.getUser().getId()
						+ " is trying to delete  " + imageFileLoc);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	@POST
	@Path("deleteAd")
	@Consumes("application/json")
	public void deleteAd(Ad ad) {
		adDao.deletaAd(ad.getId(), ad.getUser().getId());
	}

	@POST
	@Path("removeAdFromFavorites")
	@Consumes("application/json")
	public void deleteAdFromFavorites(Ad ad) {
		favoriteDao.removeAdFromFavorites(ad, ad.getUser().getId());
	}

	@POST
	@Path("addToFavorites")
	@Consumes("application/json")
	public void addToFavorites(Ad ad) {
		favoriteDao.addToFavorites(ad, ad.getUser().getId());
	}

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

	@POST
	@Path("getInboxMessagesByUserId")
	@Produces("application/json")
	public List<Message> getInboxMessagesByUserId(Long userId) {
		return messageDao.getInboxMessagesByUserId(userId);
	}

	@POST
	@Path("getOutboxMessagesByUserId")
	@Produces("application/json")
	public List<Message> getOutboxMessagesByUserId(Long userId) {
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
	public String saveOrUpdateMessage(Message message) throws Exception {
		String result = "succes";
		try {
			String username = message.getRecipient().getUsername();
			message.setRecipient(userDao.getUserByUsername(username));
			message.setSendDate(new Date());
			messageDao.saveOrUpdate(message);
			try {
				sendMail.sendMail(
						"noreply@vacationbuds.com",
						message.getRecipient().getEmail(),
						"You received a message from "
								+ userDao.getUserById(message.getSender().getId()).getUsername(),
						"Hello "
								+ message.getRecipient().getUsername()
								+ ",\n\n"
								+ "You received a message on vacationbuds.com with title : "
								+ message.getTitle()
								+ "\n\n Read the full message at http://www.vacationbuds.com/main/messages/inbox.php");
			} catch (Exception e) {
				e.printStackTrace();
			}

		} catch (Exception e) {
			e.printStackTrace();
			result = e.getMessage();
		}
		return result;
	}

	@POST
	@Path("deleteInboxMessage")
	@Consumes("application/json")
	public void deleteInboxMessage(Message message) {
		messageDao.deleteInboxMessage(message);
	}

	@POST
	@Path("deleteOutboxMessage")
	@Consumes("application/json")
	public void deleteOutboxMessage(Message message) {
		messageDao.deleteOutboxMessage(message);
	}

	@POST
	@Path("getAdsByUserId")
	@Produces("application/json")
	public List<Ad> getAdsByUserId(Long userId) {
		return adDao.getAdsByUserId(userId);
	}

	@POST
	@Path("getFavAdsByUserId")
	@Produces("application/json")
	public List<Ad> getFavAdsByUserId(Long userId) {
		return favoriteDao.getFavAdsByUserId(userId);
	}

	@GET
	@Path("getAdById/{id}")
	@Produces("application/json")
	public Ad getAdById(@PathParam("id") Long id) {
		return adDao.getAdById(id);
	}

	@POST
	@Path("getUsernames")
	@Produces("application/json")
	public List<String> getUsernames(String prefix) {
		return userDao.getUsernames(prefix);
	}

	@POST
	@Path("validateUsername")
	@Produces("application/json")
	public boolean validateUsername(String username) {
		return userDao.validateUsername(username);
	}

	@POST
	@Path("search")
	@Consumes("application/json")
	@Produces("application/json")
	public List<Ad> search(SearchCriteria searchCriteria) {
		return adDao.search(searchCriteria);
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

	private boolean isWindows() {

		return (OS.indexOf("win") >= 0);

	}

}