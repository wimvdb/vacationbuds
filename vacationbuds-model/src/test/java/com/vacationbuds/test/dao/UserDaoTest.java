package com.vacationbuds.test.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.testng.AbstractTransactionalTestNGSpringContextTests;
import org.springframework.transaction.annotation.Transactional;
import org.testng.annotations.Test;

import com.vacationbuds.dao.UserDao;
import com.vacationbuds.model.AdImage;
import com.vacationbuds.model.Message;
import com.vacationbuds.model.Profile;
import com.vacationbuds.model.User;
import com.vacationbuds.model.VacationAd;

@Test
@ContextConfiguration(locations = { "/applicationContext-vacationbuds-model.xml" })
public class UserDaoTest extends AbstractTransactionalTestNGSpringContextTests {

	@Autowired
	private UserDao userDao;

	public void testCreateAndStoreUser() {
		//Session session = sessionFactory.getCurrentSession();
		/*User user = new User();
		user.setUsername("Wim");
		userDao.saveOrUpdate(user);*/
		
		
		User sender = new User();
		sender.setUsername("sender");
		sender.setEmail("sender@vacationbuds.be");
		
		Profile senderProfile = new Profile();
		senderProfile.setText("senderprofile text...");
		sender.setProfile(senderProfile);
		//senderProfile.setUser(sender);
		
		VacationAd ad = new VacationAd();
		ad.setTitle("ad title");
		ad.setDestionationCountry("Egypt");
		senderProfile.getAds().add(ad);
		
		//ad.setProfile(senderProfile);
		
		
		
		
		AdImage adImage = new AdImage();
		adImage.setTitle("ad image title");
		//adImage.setAd(ad);
		
		
		
		ad.getImages().add(adImage);
		
		
		
		User recipiant = new User();
		recipiant.setUsername("recipiant");
		recipiant.setEmail("recipiant@vacationbuds.be");
		
		Profile recipiantProfile = new Profile();
		recipiantProfile.setText("recipiantprofile text...");
		recipiant.setProfile(recipiantProfile);
		//recipiantProfile.setUser(recipiant);
		
		
		
		Message message = new Message();
		message.setTitle("hello");
		message.setSender(sender);
		message.setRecipiant(recipiant);
		
		userDao.saveOrUpdate(sender);
		
	}
}
