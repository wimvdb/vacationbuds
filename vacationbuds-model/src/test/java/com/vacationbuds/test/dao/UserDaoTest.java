package com.vacationbuds.test.dao;

import java.io.IOException;
import java.io.RandomAccessFile;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.testng.AbstractTransactionalTestNGSpringContextTests;
import org.testng.annotations.Test;

import com.vacationbuds.dao.AdDao;
import com.vacationbuds.dao.ImageDao;
import com.vacationbuds.dao.MessageDao;
import com.vacationbuds.dao.ProfileDao;
import com.vacationbuds.dao.ReviewDao;
import com.vacationbuds.dao.UserDao;
import com.vacationbuds.model.AdImage;
import com.vacationbuds.model.HostingAd;
import com.vacationbuds.model.Image;
import com.vacationbuds.model.Message;
import com.vacationbuds.model.Profile;
import com.vacationbuds.model.ProfileImage;
import com.vacationbuds.model.Review;
import com.vacationbuds.model.User;
import com.vacationbuds.model.VacationAd;

@Test
@ContextConfiguration(locations = { "/applicationContext-vacationbuds-model.xml" })
public class UserDaoTest extends AbstractTransactionalTestNGSpringContextTests {

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

	@Rollback(false)
	public void testCreateAndStoreUser() throws IOException {
		byte[] avatar = null;
		User sender = new User();
		sender.setPassword("secretpassword");
		sender.setAge(22);
		sender.setUsername("sender");
		sender.setDescription("Sender description");
		sender.setEmail("sender@vacationbuds.be");
		sender.setGender("M");
		RandomAccessFile f = null;
		try {
			f = new RandomAccessFile("src/test/resources/images/avatar.jpg",
					"r");
			avatar = new byte[(int) f.length()];
			f.read(avatar);

			sender.setAvatar(avatar);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (f != null) {
				f.close();
				
			}
		}

		
		
		Image profileImage = new ProfileImage();
		profileImage.setImage(avatar);
		profileImage.setText("Me in Thailand!");
		profileImage.setTitle("Picture of Me");

		Profile senderProfile = new Profile();
		senderProfile.setText("senderprofile text...");
		senderProfile.getImages().add(profileImage);
		sender.setProfile(senderProfile);

		
		
		
		VacationAd ad = new VacationAd();
		ad.setTitle("ad title");
		ad.setDestionationCountry("Egypt");
		ad.setDateOfDeparture(new Date(2013, 1, 1));
		ad.setDateOfExpiration(new Date(2014, 1, 1));
		ad.setDestionationCity("Hongkong");
		ad.setDuration(14);
		ad.setText("Looking for someone to travel through Egypt");
		ad.setProfile(senderProfile);

		Image adImage = new AdImage();
		adImage.setTitle("ad image title");
		adImage.setImage(avatar);
		ad.getImages().add(adImage);
		
		
		
		HostingAd hostingAd = new HostingAd();
		hostingAd.setTitle("ad title");
		hostingAd.setArea("Fun area");
		hostingAd.setCity("Washington");
		hostingAd.setCountry("USA");
		hostingAd.setText("Looking for someone to show around Washington");
		hostingAd.setProfile(senderProfile);
		
		

		User recipiant = new User();
		recipiant.setUsername("recipiant");
		recipiant.setEmail("recipiant@vacationbuds.be");

		Profile recipiantProfile = new Profile();
		recipiantProfile.setText("recipiantprofile text...");
		recipiant.setProfile(recipiantProfile);

		Message sendMessage = new Message();
		sendMessage.setTitle("hello");
		sendMessage.setSender(sender);
		sendMessage.setRecipiant(recipiant);
		
		
		
		Message receiveMessage = new Message();
		receiveMessage.setTitle("hello");
		receiveMessage.setSender(recipiant);
		receiveMessage.setRecipiant(sender);
		
		

		Review goodReview = new Review();
		goodReview.setRecipiant(recipiant);
		goodReview.setWriter(sender);
		goodReview.setType("P");
		goodReview.setText("Had a good time with this guy!");
		
		Review badReview = new Review();
		badReview.setRecipiant(sender);
		badReview.setWriter(recipiant);
		badReview.setType("N");
		badReview.setText("Had a Bad time with this guy!");
		
		
		imageDao.saveOrUpdate(adImage);
		imageDao.saveOrUpdate(profileImage);
		userDao.saveOrUpdate(sender);
		userDao.saveOrUpdate(recipiant);
		adDao.saveOrUpdate(ad);
		adDao.saveOrUpdate(hostingAd);
		messageDao.saveOrUpdate(sendMessage);
		messageDao.saveOrUpdate(receiveMessage);
		
		reviewDao.saveOrUpdate(goodReview);
		reviewDao.saveOrUpdate(badReview);
		

		

	}
}
