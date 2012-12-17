package com.vacationbuds.temp;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.omg.CORBA.portable.ApplicationException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.transaction.annotation.Transactional;

import com.vacationbuds.model.Ad;
import com.vacationbuds.model.AdImage;
import com.vacationbuds.model.Message;
import com.vacationbuds.model.Profile;
import com.vacationbuds.model.User;
import com.vacationbuds.model.VacationAd;
import com.vacationbuds.util.HibernateUtil;


public class Start {

	public static void main(String[] args) {

		
Start start = new Start();
		start.createAndStoreUser();

	}

	private void createAndStoreUser() {
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		session.beginTransaction();
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
		//senderProfile.getAds().add(ad);
		
		ad.setProfile(senderProfile);
		
		session.save(senderProfile);
		
		
		AdImage adImage = new AdImage();
		adImage.setTitle("ad image title");
		//adImage.setAd(ad);
		
		
		
		ad.getImages().add(adImage);
		
		session.save(ad);
		
		session.save(adImage);
		
		session.save(sender);
		
		User recipiant = new User();
		recipiant.setUsername("recipiant");
		recipiant.setEmail("recipiant@vacationbuds.be");
		
		Profile recipiantProfile = new Profile();
		recipiantProfile.setText("recipiantprofile text...");
		recipiant.setProfile(recipiantProfile);
		//recipiantProfile.setUser(recipiant);
		
		session.save(recipiantProfile);
		
		session.save(recipiant);
		
		Message message = new Message();
		message.setTitle("hello");
		message.setSender(sender);
		message.setRecipiant(recipiant);
		
		session.save(message);
		session.getTransaction().commit();
	}

}
